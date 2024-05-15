type ValidCantoSize = 100 | 240 | 320 | 500 | 640 | 800 | 2050;

const ValidCantoSizes: Array<ValidCantoSize> = [
  100, 240, 320, 500, 640, 800, 2050,
];

export const resizeCantoImage = (previewUrl: string, size: ValidCantoSize) => {
  if (ValidCantoSizes.includes(size)) {
    const urlWithoutConstraint = previewUrl.slice(0, -3);

    return urlWithoutConstraint.concat(size.toString());
  }

  return previewUrl;
};
