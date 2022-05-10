import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import GlobalDataContext from "@/contexts/GlobalData";
import { useDataList } from "@/api/entries";
import debounce from "lodash/debounce";

// DATA HOOKS
export const useList = ({
  excludeId = null,
  isSitewideSearch = false,
  limit = 10,
  listTypeId = null,
  section,
}) => {
  const router = useRouter();
  const { asPath, query } = router;
  const site = getSiteString(asPath);
  const offset = query.page * limit - limit || null;
  const inReverse = query.sort === "descending";
  const search = query.search ? `"${query.search}"` : null;
  const categories = useGlobalData("categories");
  // if the search is sitewide (like '/search' is), our list will filter by section instead of listTypeId
  if (isSitewideSearch && query.filter) {
    const curr = getCategoryObject(categories, query.filter);
    section = curr.slug.replace(/-([a-z])/g, (x, up) => up.toUpperCase()); // make camelCase
  } else if (!isSitewideSearch) {
    listTypeId = parseInt(query.filter) || listTypeId;
  }

  const results = useDataList({
    excludeId,
    inReverse,
    limit,
    offset,
    search,
    site,
    listTypeId,
    section,
  });
  // let's just keep all the data numbers together!
  if (results?.data) {
    results.data.currentCategory = listTypeId;
    results.data.offset = offset;
    results.data.limit = limit;
    results.data.page = parseInt(query.page) || 1;
  }

  return results;
};

// This version does not use the query string for filtering
export const useListForBlock = ({
  excludeId = null,
  limit = 5,
  listTypeId = null,
  section,
}) => {
  const router = useRouter();
  const { asPath, query } = router;
  const site = getSiteString(asPath);

  const results = useDataList({
    excludeId,
    limit,
    listTypeId,
    site,
    section,
  });

  return results;
};

export const useGlobalData = (which) => {
  const globalData = useContext(GlobalDataContext);
  if (which && globalData[which]) {
    return globalData[which];
  } else {
    return globalData;
  }
};

export const useGlobalLanguage = () => {
  const { localeInfo } = useContext(GlobalDataContext);
  return localeInfo.language;
};

export const useCustomBreadcrumbs = (rootPageString) => {
  const rootPages = useGlobalData("rootPages");
  const customBreadcrumbs = rootPages
    .filter((p) => p.header.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

export const usePathData = () => {
  // this returns the post-domain url goodies from the router

  const router = useRouter();
  const { asPath, pathname, query } = router;
  return { asPath, pathname, query };
};

export const useDateString = (date, isShort = false) => {
  const localeInfo = useGlobalData("localeInfo");
  const locale = localeInfo.language || "en-US";
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: `${isShort ? "short" : "long"}`,
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, options);
  isShort && (dateString = dateString.replace(",", ""));
  return dateString;
};

export const useShareButtons = () => {
  useEffect(() => {
    if (window?.__sharethis__) {
      if (typeof window.__sharethis__.initialize === "function") {
        window.__sharethis__.initialize();
      }
    }
  }, []);
};

export const useNavHider = (
  prevScrollPos,
  setPrevScrollPos,
  visible,
  setVisible
) => {
  const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      setVisible(true);
      return;
    }

    if (currentScroll > prevScrollPos && visible === true) {
      // down
      setVisible(false);
    } else if (currentScroll < prevScrollPos && visible === false) {
      // up
      setVisible(true);
    }
    setPrevScrollPos(currentScroll);
  }, 30);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
};

// CONTENT MUNGERS
export const makeBreadcrumbs = (uri) => {
  return uri.split("/").map((crumb, i) => {
    const title = crumb
      .replace("-", " ")
      .replace(/(^|\s)\S/g, (t) => t.toUpperCase());
    return { id: `${i}`, uri: crumb, title: title };
  });
};

// this is like useCustomBreadcrumbs but is not a hook because it doesn't useGlobalData()
export const makeCustomBreadcrumbs = (rootPages, rootPageString) => {
  const customBreadcrumbs = rootPages
    .filter((p) => p.header.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

export const makeDateString = (date, locale = "en-US", isShort = false) => {
  const newDate = new Date(date);
  const options = {
    year: "numeric",
    month: `${isShort ? "short" : "long"}`,
    day: "numeric",
  };
  let dateString = newDate.toLocaleString(locale, options);
  isShort && (dateString = dateString.replace(",", ""));
  return dateString;
};

export const makeDateObject = (date, locale = "en-US", isShort = false) => {
  const newDate = new Date(date);
  const options = {
    month: `${isShort ? "short" : "long"}`,
  };
  const dateObject = {
    year: newDate.getFullYear(),
    month: new Intl.DateTimeFormat(locale, options).format(newDate),
    day: newDate.getDate(),
  };
  return dateObject;
};

export const normalizePathData = (pathnameInput) => {
  // params should come in as an object, { key: "value" }
  // however, if there is a querystring in the pathname, we must split them
  // so they are ready to be like this in the calling component:
  // const href = {
  //   pathname: simplePathname,
  //   query: { ...pathParams, ...params },
  // };
  if (!pathnameInput) return { pathParams: {} };

  const pathnameArray = pathnameInput.split("?");
  const simplePathname = pathnameArray.shift();
  const pathname =
    simplePathname.startsWith("/") || simplePathname.startsWith("mailto")
      ? simplePathname
      : "/" + simplePathname;
  const urlParams = new URLSearchParams(pathnameArray.shift());
  const pathParams = Object.fromEntries(urlParams);

  return { pathname, pathParams };
};

export const checkIfBetweenDates = (startDate, endDate) => {
  if (!endDate) {
    return true;
  }

  const currentDate = new Date();
  const from = new Date(startDate);
  const to = new Date(endDate);

  return currentDate > from && currentDate < to;
};

export const createLocationString = (
  city,
  state,
  country,
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

export function makeTruncatedString(str, max = 50) {
  if (!str) return "";

  const array = str.trim().split(" ");
  const ellipsis = array.length > max ? "..." : "";

  return array.slice(0, max).join(" ") + ellipsis;
}

export function normalizeItemData(items, whichEntry = "entry") {
  return items
    .filter((item) => item?.[whichEntry]?.length > 0)
    .map((item) => item[whichEntry]?.[0]);
}

// CATEGORY STUFF
export const getCategoryId = (categories, slug) => {
  return categories.reduce((a, b) => (b.slug === slug ? a + b.id : a), "");
};

export const getCategoryObject = (categories, id) => {
  const result = categories.filter((c) => c.id === id.toString());
  return result[0];
};
export const getCategoryGroup = (categories, group) => {
  return categories.filter((c) => c.groupHandle === group);
};

// LANGUAGE STUFF
export function getSiteString(langData = "") {
  if (Array.isArray(langData)) {
    return langData[0] === "es" ? "es" : "default";
  } else {
    return langData.includes("/es/") || langData === "es" ? "es" : "default";
  }
}
export function getLangString(langData = "") {
  if (Array.isArray(langData)) {
    return langData[0] === "es" ? "es" : "en-US";
  } else {
    return langData.includes("/es/") || langData === "es" ? "es" : "en-US";
  }
}
