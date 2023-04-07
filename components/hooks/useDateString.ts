import { useGlobalData } from "@/hooks";

const useDateString = (date: string | number | Date, isShort = false) => {
  const localeInfo = useGlobalData("localeInfo");
  const { language: locale = "en-US" } = localeInfo;
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: isShort ? "short" : "long",
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, options);
  isShort && (dateString = dateString.replace(",", ""));
  return dateString;
};

export default useDateString;
