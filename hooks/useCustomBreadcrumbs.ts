import { useGlobalData } from "@/hooks";

const useCustomBreadcrumbs = (rootPageString: string) => {
  const rootPages = useGlobalData("rootPages");
  const customBreadcrumbs = rootPages
    .filter((p) => p.header.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

export default useCustomBreadcrumbs;
