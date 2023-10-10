/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query StoredAnswers($userId: ID, $investigationId: ID) {\n    answers(userId: $userId, investigationId: $investigationId) {\n      data\n      questionId\n      id\n    }\n  }\n": types.StoredAnswersDocument,
    "\n  mutation SaveAnswersFromSet(\n    $userId: ID!\n    $investigationId: ID!\n    $answerSet: [AnswerInput]\n  ) {\n    saveAnswersFromSet(\n      userId: $userId\n      investigationId: $investigationId\n      answerSet: $answerSet\n    ) {\n      id\n    }\n  }\n": types.SaveAnswersFromSetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query StoredAnswers($userId: ID, $investigationId: ID) {\n    answers(userId: $userId, investigationId: $investigationId) {\n      data\n      questionId\n      id\n    }\n  }\n"): (typeof documents)["\n  query StoredAnswers($userId: ID, $investigationId: ID) {\n    answers(userId: $userId, investigationId: $investigationId) {\n      data\n      questionId\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SaveAnswersFromSet(\n    $userId: ID!\n    $investigationId: ID!\n    $answerSet: [AnswerInput]\n  ) {\n    saveAnswersFromSet(\n      userId: $userId\n      investigationId: $investigationId\n      answerSet: $answerSet\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation SaveAnswersFromSet(\n    $userId: ID!\n    $investigationId: ID!\n    $answerSet: [AnswerInput]\n  ) {\n    saveAnswersFromSet(\n      userId: $userId\n      investigationId: $investigationId\n      answerSet: $answerSet\n    ) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;