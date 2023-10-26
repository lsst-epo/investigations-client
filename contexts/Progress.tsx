"use client";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";

interface ProgressSection {
  name: string;
  order: number;
  pages: number[];
}
interface Page {
  contentBlocks: any[];
  hasSavePoints: boolean;
  id: string;
  title: string;
  uri: string;
  __typename: string;
}

interface InvestigationProgress {
  sections: Array<ProgressSection>;
  pages: Array<Page>;
  currentSectionNumber: number;
  totalPages: number;
  questionsBySectionPage: Array<Array<Array<string>>>;
  [key: string]: any;
}

const buildProgressSections = (siblings: Array<any>): ProgressSection[] => {
  if (!siblings || !siblings?.length) return [];
  // create empty arrays to fill with sections based on save points
  const sectionBreaks = siblings.filter(
    (entry) =>
      entry.__typename === "investigations_investigationSectionBreakChild_Entry"
  );
  const sections: [number | undefined][] = Array.from(
    Array(sectionBreaks.length + 1),
    () => [undefined]
  );

  let currentIndex = 0;

  // go through siblings and push to section arrays;
  // advance to next array when a save point is reached
  // @returns e.g. [[undefined, 0, 1], [undefined, 0, 1, 2]]
  siblings.forEach((entry, index) => {
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
        name: `Section ${index + 1}`,
        order: index + 1,
        pages: section.filter((num): num is number => typeof num === "number"),
      };
    });
  return mapped;
};

const getQuestionEntryIds = (block: {
  questionEntries: { id: string }[];
}): Array<string | undefined> => {
  const { questionEntries } = block;

  if (!questionEntries) return undefined;

  return questionEntries.map((questionEntry) => {
    return questionEntry.id;
  });
};

const getTwoColQuestionEntryIds = (block: object) => {
  const { columns } = block;

  const colBlocks = [...columns].map((col) => {
    const { children = [] } = col;
    return [...children];
  });

  return colBlocks.map((colBlock) => {
    return getQuestionEntryIds(colBlock);
  });
};

const getPageQuestionEntryIds = (blocks: Array<any> = []): Array<any> => {
  return blocks.map((block) => {
    const { __typename } = block;

    switch (__typename) {
      case "contentBlocks_questionBlock_BlockType": {
        return getQuestionEntryIds(block);
      }
      case "contentBlocks_twoColumnContainer_BlockType": {
        return getTwoColQuestionEntryIds(block);
      }
      case "contentBlocks_group_BlockType": {
        const { group } = block;

        return getPageQuestionEntryIds(group).flat();
      }
      default: {
        break;
      }
    }
  });
};

const getQuestionsByPage = (page: Page): Array<string> => {
  const { contentBlocks } = page;

  return getPageQuestionEntryIds(contentBlocks)
    .flat()
    .filter((questionId) => !!questionId);
};

const getQuestionsBySectionPage = (
  sections: Array<ProgressSection>,
  pages: Array<Page>
) => {
  return sections.map(({ pages: pageNumbers }) => {
    return pageNumbers.map((pageNumber: number) => {
      return getQuestionsByPage(pages[pageNumber - 1]);
    });
  });
};

const getAnsweredBySectionPage = (
  questionsBySectionPage: Array<Array<Array<string>>>,
  answers: Record<string, any>
) => {
  return questionsBySectionPage.map((section) => {
    return section.map((questionIds) => {
      if (questionIds.length === 0) return true;

      return (
        questionIds.filter((questionId) => !answers[questionId]).length === 0
      );
    });
  });
};

const getDisabledByPage = (
  currentPageNumber,
  totalPages,
  questionsByPage,
  answeredByPage
) => {
  const disabledByPage = [];

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const isAnswered = answeredByPage[pageIndex];
    const hasQuestions = questionsByPage[pageIndex].length > 0;

    // First page should never be disabled
    if (pageIndex === 0) {
      // console.log(pageIndex + 1, "First page should never be disabled");
      disabledByPage.push(false);
      continue;
    }

    const indexOfFirstDisabledPage = disabledByPage.indexOf(true);
    const somePreviousPageIsDisabled =
      indexOfFirstDisabledPage !== -1
        ? indexOfFirstDisabledPage < pageIndex
        : false;
    const previousPageHasQuestions = questionsByPage[pageIndex - 1].length > 0;
    const previousPageisAnswered = answeredByPage[pageIndex - 1];

    // Enable if all questions are answered
    if (hasQuestions && isAnswered) {
      // console.log(pageIndex + 1, "Enable if all questions are answered");
      disabledByPage.push(false);
      continue;
    }

    // Disable if preceding page has unanswered questions
    if (previousPageHasQuestions && !previousPageisAnswered) {
      // console.log(
      //   pageIndex + 1,
      //   "Disable if preceding page has unanswered questions"
      // );
      disabledByPage.push(true);
      continue;
    }

    // Enable if is content-only page and previous page has unanswered questions
    if (!hasQuestions && previousPageHasQuestions && !previousPageisAnswered) {
      // console.log(
      //   pageIndex + 1,
      //   "Enable if is content-only page and previous page has unanswered questions"
      // );
      disabledByPage.push(true);
      continue;
    }

    // Enable if is content-only page and no previous page is disabled
    if (!hasQuestions && !somePreviousPageIsDisabled) {
      // console.log(
      //   pageIndex + 1,
      //   "Enable if is content-only page and no previous pages are disabled"
      // );
      disabledByPage.push(false);
      continue;
    }

    // Disable if previous page is disabled
    if (somePreviousPageIsDisabled) {
      // console.log(
      //   pageIndex + 1,
      //   "Disable if previous page is disabled"
      // );
      disabledByPage.push(true);
      continue;
    }
    // console.log(pageIndex + 1, "None of the above");
    disabledByPage.push(false);
  }

  return disabledByPage;
};

const ProgressContext = createContext<InvestigationProgress | null>(null);

const investigationPageTypes = [
  "investigations_default_Entry",
  "investigations_investigationSectionBreakChild_Entry",
];

interface ProgressProviderProps {
  pages: Array<Page>;
  currentPageId: string;
  children: ReactNode;
}

const ProgressProvider: FunctionComponent<ProgressProviderProps> = ({
  pages,
  currentPageId,
  children,
}) => {
  const { answers } = useContext(StoredAnswersContext);
  const siblings = pages.filter((page) =>
    investigationPageTypes.includes(page.__typename)
  );
  const sections = buildProgressSections(siblings);
  const currentPageNumber =
    siblings.findIndex((entry) => entry.id === currentPageId) + 1;
  const totalPages = siblings.length;
  const questionsBySectionPage = getQuestionsBySectionPage(sections, siblings);
  const answeredBySectionPage = getAnsweredBySectionPage(
    questionsBySectionPage,
    answers
  );
  const questionsByPage = [].concat(...questionsBySectionPage);
  const answeredByPage = [].concat(...answeredBySectionPage);
  const questions = [].concat(...questionsByPage);

  const progress: InvestigationProgress = {
    sections,
    pages: siblings,
    currentSectionNumber:
      sections.findIndex((section) => {
        return section.pages.includes(currentPageNumber);
      }) + 1,
    currentPageNumber,
    totalPages,
    questionsBySectionPage,
    questionsByPage,
    questions,
    answeredBySectionPage,
    answeredByPage,
    disabledByPage: getDisabledByPage(
      currentPageNumber,
      totalPages,
      questionsByPage,
      answeredByPage
    ),
  };

  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  );
};

ProgressProvider.displayName = "Progress.Provider";

export default ProgressContext;

export { ProgressProvider };
