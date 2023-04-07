import { useGlobalData } from "@/hooks";

const useGlobalLanguage = () => {
  const { language } = useGlobalData("localeInfo");
  return language;
};

export default useGlobalLanguage;
