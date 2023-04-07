/**
 * utils module.
 * Follows the implementation described in Josh W. Comeau's blog
 * https://www.joshwcomeau.com/react/file-structure/#utils-7
 *
 * All code in here should be portable between projects and contain
 * no project or business logic. When in doubt, ask:
 * "could this be in lodash?" and if no, it does not belong here.
 */

export const capitalize = (string: string) => {
  if (typeof string !== "string") return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function fileSize(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  const exts = ["B", "kB", "MB", "GB", "TB"];

  return `${(size / Math.pow(1024, i)).toFixed(2)} ${exts[i]}`;
}

export const makeDateString = (
  date: string | number | Date,
  locale = "en-US",
  isShort = false
) => {
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

export const makeDateObject = (
  date: string | number | Date,
  locale = "en-US",
  isShort = false
) => {
  const newDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    month: isShort ? "short" : "long",
  };
  const dateObject = {
    year: newDate.getFullYear(),
    month: new Intl.DateTimeFormat(locale, options).format(newDate),
    day: newDate.getDate(),
  };
  return dateObject;
};

/**
 * params should come in as an object, { key: "value" }
 * however, if there is a querystring in the pathname, we must split them
 * so they are ready to be like this in the calling component:
 * const href = {
 *   pathname: simplePathname,
 *   query: { ...pathParams, ...params },
 *  };
 */
export const normalizePathData = (pathnameInput: string) => {
  if (!pathnameInput) return { pathParams: {} };

  const pathnameArray = pathnameInput.split("?");
  const simplePathname = pathnameArray.shift();

  if (simplePathname) {
    const pathname =
      simplePathname.startsWith("/") || simplePathname.startsWith("mailto")
        ? simplePathname
        : "/" + simplePathname;
    const urlParams = new URLSearchParams(pathnameArray.shift());
    const pathParams = Object.fromEntries(urlParams);
    return { pathname, pathParams };
  }

  return { pathname: pathnameInput, pathParams: {} };
};

export const checkIfBetweenDates = (
  startDate: string | number | Date,
  endDate: string | number | Date
) => {
  if (!endDate) {
    return true;
  }

  const currentDate = new Date();
  const from = new Date(startDate);
  const to = new Date(endDate);

  return currentDate > from && currentDate < to;
};

export const createLocationString = (
  city: string,
  state: string,
  country: string,
  address = "",
  isFull = false
) => {
  // logic for displaying city/state in US, city/country outside
  let start;
  let end;
  if (isFull) {
    start = address ? address + ", " : "";
    end = state ? state + ", " + country : country;
  } else {
    end = country === "USA" || country === "United States" ? state : country;
  }
  const loc = `${start || ""}${city ? city + ", " : ""}${end || ""}`;
  return loc;
};

export function makeTruncatedString(str: string, max = 50) {
  if (!str) return "";

  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? "..." : "";

  return array.slice(0, max).join(" ") + ellipsis;
}

export function normalizeItemData(items: any[], whichEntry = "entry") {
  return items
    .filter((item) => item?.[whichEntry]?.length > 0)
    .map((item) => item[whichEntry]?.[0]);
}
