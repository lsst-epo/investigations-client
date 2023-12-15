"use client";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from "react";
import { useTranslation } from "react-i18next";

export interface Page {
  contentBlocks: Array<any>;
  hasSavePoint?: boolean;
  id: string;
  title: string;
  uri: string;
  __typename: string;
}

export interface Section {
  name: string;
  order: number;
  pages: number[];
}

const PagesContext = createContext<
  | {
      pages: Array<Page>;
      sections: Array<Section>;
      totalPages: number;
      acknowledgements: string;
    }
  | undefined
>(undefined);

function usePages() {
  const context = useContext(PagesContext);
  if (context === undefined) {
    throw new Error("usePages must be used within a PagesProvider");
  }
  return context;
}

const VALID_PAGE_TYPES = [
  "investigations_default_Entry",
  "investigations_investigationSectionBreakChild_Entry",
];

const useSections = (pages: Array<Page>): Array<Section> => {
  const { t } = useTranslation();

  if (!pages || !pages?.length) return [];
  // create empty arrays to fill with sections based on save points
  const sectionBreaks = pages.filter(
    (entry) =>
      entry.__typename === "investigations_investigationSectionBreakChild_Entry"
  );
  const sections: Array<Array<number | undefined>> = Array.from(
    Array(sectionBreaks.length + 1),
    () => [undefined]
  );

  let currentIndex = 0;

  // go through siblings and push to section arrays;
  // advance to next array when a save point is reached
  // @returns e.g. [[undefined, 0, 1], [undefined, 0, 1, 2]]
  pages.forEach((entry, index) => {
    if (!entry?.title) return;

    sections[currentIndex].push(index + 1);

    if (
      entry.__typename === "investigations_investigationSectionBreakChild_Entry"
    ) {
      currentIndex++;
    }
  });

  const mapped = sections
    // filter out `undefined` from arrays
    .filter((section) => section.some((el) => typeof el === "number"))
    // create final section object
    .map((section, index) => {
      return {
        name: t("table_of_contents.sections", { number: index + 1 }),
        order: index + 1,
        pages: section.filter(
          (num?: number): num is number => typeof num === "number"
        ),
      };
    });
  return mapped;
};

const PagesProvider: FunctionComponent<
  PropsWithChildren<{ pages: Array<Page>; acknowledgements: string }>
> = ({ pages = [], acknowledgements, children }) => {
  const validPages = pages.filter((page) =>
    VALID_PAGE_TYPES.includes(page.__typename)
  );
  const sections = useSections(validPages);

  return (
    <PagesContext.Provider
      value={{
        pages: validPages,
        sections,
        totalPages: validPages.length,
        acknowledgements,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

PagesProvider.displayName = "Pages.Provider";

export default usePages;

export { PagesProvider };
