"use server";

import { ComputeEngine } from "@cortex-js/compute-engine";
import { graphql } from "@/gql/public-schema";
import { getSite } from "@/helpers";
import { queryAPI } from "@/lib/fetch";
import { fallbackLng } from "@/lib/i18n/settings";
import { isEntryValid } from "@/helpers/gql";
import { notNull } from "@/lib/utils";

const Query = graphql(`
  query QuestionValidation($site: [String], $id: [QueryArgument]) {
    entry(site: $site, id: $id) {
      ... on questions_default_Entry {
        validation {
          ... on validation_numberValidator_BlockType {
            comparison
            operator
            message
          }
        }
        multiPartBlocks {
          ... on multiPartBlocks_number_BlockType {
            id
            validation {
              ... on validation_numberValidator_BlockType {
                comparison
                operator
                message
              }
            }
          }
        }
      }
    }
  }
`);

const operators: Record<string, string> = {
  greaterThan: ">",
  greaterThanOrEqual: "\\geq",
  lessThan: "<",
  lessThanOrEqual: "\\leq",
  equals: "=",
  notEqual: "\\neq",
};

const validateQuestion = async ({
  id,
  partId,
  value,
  locale = fallbackLng,
}: {
  id: string;
  partId?: string;
  value?: number;
  locale?: string;
}): Promise<string | undefined> => {
  if (!value) return;

  const site = getSite(locale);

  const { data } = await queryAPI({
    query: Query,
    variables: {
      site: [site],
      id: [id],
    },
  });

  if (!data) return;

  const { entry } = data;

  if (!isEntryValid(entry, "questions_default_Entry")) return;
  const { validation, multiPartBlocks } = entry;

  const parsedBlocks =
    multiPartBlocks
      ?.filter((part) => isEntryValid(part, "multiPartBlocks_number_BlockType"))
      .filter(notNull) || [];

  const validations = partId
    ? parsedBlocks.find(({ id }) => id === partId)?.validation
    : validation.filter(notNull);

  if (!validations || validations.length === 0) return;

  const ce = new ComputeEngine();
  ce.pushScope();
  ce.assign("n", value);

  for (const { comparison, operator, message } of validations) {
    if (!comparison || !operator) continue;

    const tex = `n ${operators[operator]} ${comparison}`;
    const { value: result } = ce.parse(tex);

    if (result) return message || undefined;
  }
};

export default validateQuestion;
