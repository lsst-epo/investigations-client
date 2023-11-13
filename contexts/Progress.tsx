"use client";
import { createContext, FunctionComponent, ReactNode, useContext } from "react";
import StoredAnswersContext from "@/contexts/StoredAnswersContext";
import usePages from "./Pages";
import useQuestions, { StoredQuestion } from "./Questions";

interface InvestigationProgress {
  currentSectionNumber: number;
  currentPageNumber: number;
  answeredBySection: Array<Array<boolean>>;
  answeredByPage: Array<boolean>;
  disabledByPage: Array<boolean>;
}

const getAnsweredBySection = (
  questionsBySectionPage: Array<Array<Array<StoredQuestion>>>,
  answers: Record<string, any>
) => {
  return questionsBySectionPage.map((section) => {
    return section.map((questions) => {
      if (questions.length === 0) return true;

      return questions.filter(({ id }) => !answers[id]).length === 0;
    });
  });
};

const getDisabledByPage = (
  totalPages: number,
  questionsByPage: Array<Array<StoredQuestion>>,
  answeredByPage: Array<boolean>
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

const ProgressContext = createContext<InvestigationProgress | undefined>(
  undefined
);

function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("usePrgress must be used within a ProgressPRovider");
  }
  return context;
}

interface ProgressProviderProps {
  currentPageId: string;
  children: ReactNode;
}

const ProgressProvider: FunctionComponent<ProgressProviderProps> = ({
  currentPageId,
  children,
}) => {
  const { pages, sections, totalPages } = usePages();
  const questions = useQuestions();
  const { answers } = useContext(StoredAnswersContext);

  const currentPageNumber =
    pages.findIndex((entry) => entry.id === currentPageId) + 1;

  const answeredBySection = getAnsweredBySection(questions.bySection, answers);
  const answeredByPage = answeredBySection.flat();

  const progress: InvestigationProgress = {
    currentSectionNumber:
      sections.findIndex((section) => {
        return section.pages.includes(currentPageNumber);
      }) + 1,
    currentPageNumber,
    answeredBySection,
    answeredByPage,
    disabledByPage: getDisabledByPage(
      totalPages,
      questions.byPage,
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

export default useProgress;

export { ProgressProvider };
