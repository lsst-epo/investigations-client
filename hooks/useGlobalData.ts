import GlobalDataContext from "@/contexts/GlobalData";
import { useContext } from "react";
import type { GlobalData } from "@/contexts/GlobalData";

type GlobalDataKey = keyof GlobalData;

function useGlobalData(): GlobalData;
function useGlobalData<T extends GlobalDataKey>(which: T): GlobalData[T];
function useGlobalData(which?: GlobalDataKey) {
  const globalData = useContext(GlobalDataContext);

  if (!globalData) {
    throw new Error("useGlobalData must be inside a Provider with a value");
  }

  return which ? globalData[which] : globalData;
}

export default useGlobalData;
