import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";

interface UnvalidatedEntry {
  __typename?: string;
}

type ValidatedEntry<P extends string, T> = T & {
  __typename: P;
};

export const isEntryValid = <P extends string, T extends UnvalidatedEntry>(
  entry: T | undefined | null,
  __typename: P
): entry is ValidatedEntry<P, T> => {
  if (isNull(entry)) return false;
  if (isUndefined(entry)) return false;
  if (entry.__typename !== __typename) return false;

  return true;
};
