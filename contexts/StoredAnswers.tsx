"use client";

import { createContext } from "react";
import { Query } from "@/gql/graphql";

const StoredAnswersContext = createContext<{
  answers: NonNullable<Query["answers"]> | [];
}>({ answers: [] });

function StoredAnswersProvider(props: {
  answers: Query["answers"];
  children: React.ReactNode;
}) {
  return (
    <StoredAnswersContext.Provider value={{ answers: props.answers ?? [] }}>
      {props.children}
    </StoredAnswersContext.Provider>
  );
}

StoredAnswersProvider.displayName = "StoredAnswers.Provider";

export default StoredAnswersContext;

export { StoredAnswersProvider };
