import { RawImage } from "@/types/image";
import { getAssetMetadata } from ".";

type ValidCantoSize = 100 | 240 | 320 | 500 | 640 | 800 | 2050;

const ValidCantoSizes: Array<ValidCantoSize> = [
  100, 240, 320, 500, 640, 800, 2050,
];

export const isValidCantoSize = (size: any): size is ValidCantoSize => {
  return ValidCantoSizes.includes(size);
};

export const resizeCantoImage = (previewUrl: string, size: number) => {
  if (isValidCantoSize(size)) {
    const urlWithoutConstraint = previewUrl.slice(0, -3);

    return urlWithoutConstraint.concat(size.toString());
  }

  return previewUrl;
};

const responsiveCantoSrc = (
  previewUrl: string,
  originalUrl: string,
  width: number
) => {
  const eligibleSizes = ValidCantoSizes.filter((size) => size < width);
  const srcset = eligibleSizes.map(
    (size) => `${resizeCantoImage(previewUrl, size)} ${size}w`
  );

  srcset.push(`${originalUrl} ${width}w`);

  const sizes = eligibleSizes.map((size) => {
    return `(max-width: ${size}px): ${size}px`;
  }, "");

  sizes.push(`${width}px`);

  return {
    srcSet: srcset.join(", "),
    sizes: sizes.join(", "),
  };
};

export const damAssetToImage = (site = "default", data: RawImage) => {
  if (!data) return undefined;

  const { metadata, url, width, height } = data;
  const { directUrlPreview, directUrlOriginal } = url;
  const { altText: alt, ...assetMetadata } =
    getAssetMetadata(metadata, site) || {};

  return {
    src: directUrlPreview,
    ...responsiveCantoSrc(
      directUrlPreview,
      directUrlOriginal,
      parseFloat(width)
    ),
    width: parseFloat(width),
    height: parseFloat(height),
    alt,
    ...assetMetadata,
  };
};
