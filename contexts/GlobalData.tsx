"use client";
import { createContext, FunctionComponent, ReactNode } from "react";
import type { GlobalsQueryQuery } from "gql/public-schema/graphql";

export type GlobalData = GlobalsQueryQuery & {
  rootPage: object[];
  localeInfo: {
    locale: string;
    language: string;
    localized: [];
  };
};

interface GlobalDataProviderProps {
  data: GlobalData;
  children: ReactNode;
}

const GlobalDataContext = createContext<GlobalData | null>(null);

const GlobalDataProvider: FunctionComponent<GlobalDataProviderProps> = ({
  data,
  children,
}) => {
  return (
    <GlobalDataContext.Provider value={data}>
      {children}
    </GlobalDataContext.Provider>
  );
};

GlobalDataProvider.displayName = "GlobalData.Provider";

export default GlobalDataContext;

export { GlobalDataProvider };
