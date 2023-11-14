export const formatFilterImage = (filterImage: any): any => {
  const {
    color,
    label,
    defaultValue,
    max,
    min,
    image: [
      {
        url: { directUrlPreview },
      },
    ],
    isActive,
    isEnabled,
  } = filterImage;

  return {
    label,
    color,
    active: isActive,
    image: directUrlPreview,
    isDisabled: !isEnabled,
    defaultValue,
    value: defaultValue,
    min,
    max,
  };
};

export const formatFilterImages = (filterImages: any[]) =>
  filterImages.map(formatFilterImage);

export const formatObject = (object: any): { name: string; filters: any[] } => {
  const { name, filterImages } = object;

  return {
    name,
    filters: formatFilterImages(filterImages),
  };
};

export const formatObjects = (objects: any): any[] =>
  objects.map((object: any) => formatObject(object));

export const formatObjectGroups = (
  objectGroups: any[]
): { type: string; objects: any[] }[] => {
  return objectGroups.map((group) => {
    const { groupName: type, objects } = group;

    return {
      type,
      objects: formatObjects(objects),
    };
  });
};
