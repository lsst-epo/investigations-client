/* eslint-disable no-use-before-define */
"use client";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import usePages, { Page, Section } from "./Pages";
import { Question, getPageQuestionEntries } from "@/helpers/questions";

export interface Questions {
  bySection: Array<Array<Array<Question>>>;
  byPage: Array<Array<Question>>;
  byAll: Array<Question>;
}

const QuestionsContext = createContext<Questions | undefined>(undefined);

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
}

const getQuestionsByPage = (page: Page): Array<Question> => {
  const { contentBlocks } = page;

  return getPageQuestionEntries(contentBlocks);
};

const getQuestionsBySection = (
  sections: Array<Section>,
  pages: Array<Page>
) => {
  return sections.map(({ pages: pageNumbers }) => {
    return pageNumbers.map((pageNumber: number) => {
      return getQuestionsByPage(pages[pageNumber - 1]);
    });
  });
};

const QuestionsProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { pages, sections } = usePages();

  const questions = {
    questionsBySection: getQuestionsBySection(sections, pages),
    get bySection() {
      return this.questionsBySection;
    },
    get byPage() {
      return this.questionsBySection.flat();
    },
    get byAll() {
      return this.questionsBySection.flat(2);
    },
  };

  return (
    <QuestionsContext.Provider value={questions}>
      {children}
    </QuestionsContext.Provider>
  );
};

QuestionsProvider.displayName = "Questions.Provider";

export default useQuestions;

export { QuestionsProvider };
