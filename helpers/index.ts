/**
 * helpers module.
 * Follows the implementation described in Josh W. Comeau's blog
 * https://www.joshwcomeau.com/react/file-structure/#helpers-6
 *
 * All code in here should be specific to the project.
 */

import { RootPage } from "@/components/shapes";
import { fallbackLng } from "@/lib/i18n/settings";
import { Image, RawImage } from "@/types/image";
import { CantoVideo, Video } from "@/types/video";
import type { GlobalsQueryQuery } from "gql/public-schema/graphql";

type Categories = GlobalsQueryQuery["categories"];

export const getSite = (locale: string = fallbackLng) =>
  locale === fallbackLng ? "default" : locale;

// CATEGORY STUFF
export const getCategoryObject = (categories: Categories, id: number) => {
  if (!categories) return null;
  const result = categories.filter((c) => c.id === id.toString());
  return result[0];
};

export const getCategoryId = (categories: Categories, slug: string) => {
  if (!categories) return null;
  return categories.reduce((a, b) => (b.slug === slug ? a + b.id : a), "");
};
export const getCategoryGroup = (categories: Categories, group: string) => {
  if (!categories) return null;
  return categories.filter((c) => c.groupHandle === group);
};

// CONTENT MUNGERS
export const makeBreadcrumbs = (uri: string) => {
  return uri.split("/").map((crumb, i) => {
    const title = crumb
      .replace("-", " ")
      .replace(/(^|\s)\S/g, (t) => t.toUpperCase());
    return { id: `${i}`, uri: crumb, title };
  });
};

/** this is like useCustomBreadcrumbs but is not a hook because it doesn't useGlobalData() */
export const makeCustomBreadcrumbs = (
  rootPages: RootPage[],
  rootPageString: string
) => {
  const customBreadcrumbs = rootPages
    .filter((p) => p.header.includes(rootPageString))
    .map((p) => p.pageEntry);
  return customBreadcrumbs.flat(1);
};

export const captionShaper = ({
  caption,
  fallback = "",
  credit,
}: {
  caption?: string | null;
  fallback?: string | null;
  credit?: string;
}): string | undefined => {
  const template = `${caption || fallback}${credit}`;

  if (template === "") return undefined;

  return template;
};

const localeKeys = {
  default: "EN",
  es: "ES",
};

const getAssetMetadata = (
  metadata: Record<string, string>,
  site = "default"
): { altText?: string; caption?: string; credit?: string } | undefined => {
  if (!metadata) return undefined;

  const key = localeKeys[site];

  const altText = metadata[`AltText${key}`];
  const caption = metadata[`Caption${key}`];
  const credit = metadata.Credit;

  return {
    altText: altText === null ? undefined : altText,
    caption: caption === null ? undefined : caption,
    credit: credit === null ? undefined : credit,
  };
};

// IMAGES
export const imageShaper = (
  site = "default",
  data: RawImage,
  className?: string
): Image | undefined => {
  if (!data) return undefined;

  const { metadata, url, width, height } = data;
  const { directUrlPreview = "", directUrlOriginal = "", preview = "" } = url;

  const urlWithoutConstraint = directUrlPreview.slice(0, -3);
  const constraint = Math.max(Number(width), Number(height));

  return {
    url: `${urlWithoutConstraint}${Math.floor(constraint / 3)}`,
    url2x: `${urlWithoutConstraint}${Math.floor(constraint / 2)}`,
    url3x: directUrlOriginal,
    thumb: preview,
    width: Number(width),
    height: Number(height),
    className,
    ...getAssetMetadata(metadata, site),
  };
};

// VIDEO
export const videoShaper = (
  site = "default",
  data: CantoVideo
): Video | undefined => {
  if (!data) return undefined;

  const { metadata, url, width, height } = data;
  const { directUrlPreview = "", directUrlPreviewPlay = "" } = url;

  return {
    url: directUrlPreviewPlay,
    thumbnail: directUrlPreview,
    width: Number(width),
    height: Number(height),
    ...getAssetMetadata(metadata, site),
  };
};

// TESTERS
export const hasImage = (imageArray: Image[]) =>
  !!(imageArray && imageArray.length >= 1 && imageArray[0].url);

export function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

export function isInternalUrl(url: string) {
  if (!isAbsoluteUrl(url)) return true;
  return new URL(url).origin === process.env.NEXT_PUBLIC_BASE_URL;
}

export const isCraftPreview = (query) =>
  query["x-craft-preview"] || query["x-craft-live-preview"];

const CRAFT_HOMEPAGE_URI = "__home__";

export const isCraftHome = (uri: string) => uri === CRAFT_HOMEPAGE_URI;
