"use client";
import { createContext, FunctionComponent, ReactNode } from "react";
import { InternalLinkWithChildren } from "@/shapes/link";
import SiteInfo from "@/shapes/siteInfo";
import RootPage from "@/shapes/rootPages";
import { Localized } from "@/components/shapes/locale";
import Category from "@/components/shapes/category";

export interface GlobalData {
  categories: Category[];
  headerNavItems: InternalLinkWithChildren[];
  localeInfo: { language: string; locale: string; localized: Localized[] };
  rootPages: RootPage[];
  siteInfo: SiteInfo;
}
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
