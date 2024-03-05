/* eslint-disable no-use-before-define */
"use client";
import {
  FunctionComponent,
  PropsWithChildren,
  createContext,
  useContext,
} from "react";
import usePages, { Page, Section } from "./Pages";
import { StoredQuestion, getPageQuestionEntries } from "@/helpers/questions";

// type QuestionEntry = BaseQuestion &
//   WidgetQuestion &
//   MultipartQuestion &
//   SelectQuestion &
//   TabularQuestion;

// interface BaseBlock {
//   __typename: string;
// }

// interface QuestionBlock extends BaseBlock {
//   questionEntries: Array<QuestionEntry>;
// }

// interface GroupBlock extends BaseBlock {
//   group: Array<ContentBlock>;
// }

// interface Column extends BaseBlock {
//   children: Array<ContentBlock>;
// }

// interface ColumnBlock extends BaseBlock {
//   columns: [Column, Column];
// }

// type ContentBlock = QuestionBlock | GroupBlock | ColumnBlock | BaseBlock;

// interface BaseQuestion {
//   answerType: string;
//   id: string;
//   questionText: string;
// }

// interface TabularQuestion extends BaseQuestion {
//   rows: Array<any>;
// }

// interface SelectQuestion extends BaseQuestion {
//   options: Array<Option>;
// }

// interface WidgetQuestion extends Omit<BaseQuestion, "questionText"> {
//   questionWidgetsBlock: Array<any>;
//   widgetInstructions: string;
// }

// interface MultipartQuestion extends Omit<BaseQuestion, "questionText"> {
//   parts: Array<any>;
// }

// export type StoredQuestion =
//   | BaseQuestion
//   | WidgetQuestion
//   | MultipartQuestion
//   | SelectQuestion
//   | TabularQuestion;

export interface Questions {
  bySection: Array<Array<Array<StoredQuestion>>>;
  byPage: Array<Array<StoredQuestion>>;
  byAll: Array<StoredQuestion>;
}

const QuestionsContext = createContext<Questions | undefined>(undefined);

function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
}

// function buildQuestion(question: QuestionEntry): StoredQuestion | undefined {
//   const {
//     answerType,
//     id,
//     parts,
//     options,
//     questionText,
//     questionWidgetsBlock,
//     widgetInstructions,
//     rows,
//   } = question;

//   switch (answerType) {
//     case "text":
//       return { answerType, id, questionText };
//     case "textarea":
//       return { answerType, id, questionText };
//     case "select":
//       return { answerType, id, questionText, options };
//     case "multiPart":
//       return { answerType, id, parts };
//     case "widget":
//       return { answerType, id, widgetInstructions, questionWidgetsBlock };
//     case "tabular":
//       return { answerType, id, questionText, rows };
//     default:
//       break;
//   }
// }

// function getQuestionEntries(
//   block: QuestionBlock
// ): Array<StoredQuestion | undefined> | undefined {
//   const { questionEntries } = block;

//   if (!questionEntries) {
//     return undefined;
//   }

//   return questionEntries.map(buildQuestion);
// }

// const getTwoColQuestionEntries = (
//   block: ColumnBlock
// ): Array<StoredQuestion | undefined> => {
//   const { columns = [] } = block;

//   const colBlocks = columns.map((col) => {
//     const { children = [] } = col;
//     return children;
//   });

//   return colBlocks
//     .flat()
//     .map((colBlock) => {
//       const { __typename } = colBlock;

//       if (__typename === "contentBlocks_questionBlock_BlockType") {
//         return getQuestionEntries(colBlock as QuestionBlock);
//       }

//       return undefined;
//     })
//     .flat();
// };

// const getPageQuestionEntries = (
//   blocks: Array<ContentBlock> = []
// ): Array<Array<StoredQuestion | undefined> | undefined> => {
//   return blocks.map((block) => {
//     const { __typename } = block;

//     switch (__typename) {
//       case "contentBlocks_questionBlock_BlockType": {
//         return getQuestionEntries(block as QuestionBlock);
//       }
//       case "contentBlocks_twoColumnContainer_BlockType": {
//         return getTwoColQuestionEntries(block as ColumnBlock);
//       }
//       case "contentBlocks_group_BlockType": {
//         const { group } = block as GroupBlock;

//         return getPageQuestionEntries(group).flat();
//       }
//       default: {
//         break;
//       }
//     }
//   });
// };

const getQuestionsByPage = (page: Page): Array<StoredQuestion> => {
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
