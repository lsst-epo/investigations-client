import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ColorTool from "@rubin-epo/epo-widget-lib/ColorTool";
import ColorSwatch from "@rubin-epo/epo-react-lib/ColorSwatch";
import { Option } from "@/components/shapes/option";

const Fragment = graphql(`
  fragment ColorFilterToolEntry on widgets_colorFilterTool_Entry {
    id
    title
    filterToolActions
    filterColorOptionsLabels: filterColorOptions(label: true)
    filterColorOptionsValues: filterColorOptions(label: true)
    colorFilterToolObjects {
      ... on colorFilterToolObjects_group_BlockType {
        groupName
        objects: children {
          ... on colorFilterToolObjects_object_BlockType {
            name: objectName
            caption: objectCaption
            filterImages: children {
              ... on colorFilterToolObjects_filterimage_BlockType {
                isEnabled
                isActive
                image {
                  url {
                    directUrlPreview
                  }
                  width
                  height
                }
                max: colorToolMax
                min: colorToolMin
                defaultValue: colorToolDefaultValue
                label: filter
                color: preSelectedColor
              }
            }
          }
        }
      }
    }
  }
`);

const formatColorOptions = (
  colorOptionLabels: string[],
  colorOptionValues: string[]
) => {
  return colorOptionLabels.map((colorOptionLabel, i) => {
    const colorOptionValue = colorOptionValues[i];
    return {
      value: colorOptionValue,
      label: colorOptionLabel,
      icon: <ColorSwatch color={colorOptionValue} size="small" />,
    };
  });
};

const formatFilterImage = (filterImage: any): any => {
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

const formatFilterImages = (filterImages: any[]) =>
  filterImages.map(formatFilterImage);

const formatObject = (object: any): { name: string; filters: any[] } => {
  const { name, filterImages } = object;

  return {
    name,
    filters: formatFilterImages(filterImages),
  };
};

const formatObjects = (objects: any): any[] =>
  objects.map((object: any) => formatObject(object));

const formatObjectGroups = (
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

const formatObjectOptions = (objectGroups: any[]) => {
  const options: Option[] = [];

  objectGroups.forEach((category) => {
    category.objects.forEach((object) => {
      options.push({
        label: `${category.type}: ${object.name}`,
        value: object.name,
      });
    });
  });

  return options;
};

interface ColorFilterToolContainerProps {
  data: FragmentType<typeof Fragment>;
  isDisplayOnly?: boolean;
  onChangeCallback: (value: any) => void;
  value?: any;
  className?: string;
}

const ColorFilterToolContainer: FunctionComponent<
  ColorFilterToolContainerProps
> = ({ data, onChangeCallback, value, className, isDisplayOnly }) => {
  const {
    filterColorOptionsLabels,
    filterColorOptionsValues,
    colorFilterToolObjects,
    filterToolActions: actions = [],
  } = useFragment(Fragment, data);

  const colorOptions = formatColorOptions(
    filterColorOptionsLabels,
    filterColorOptionsValues
  );
  const objectGroups = formatObjectGroups(colorFilterToolObjects);

  const config = { actions };
  const objectOptions = formatObjectOptions(objectGroups);

  return (
    <ColorTool
      data={objectGroups}
      selectedData={value || objectGroups[0].objects[0]}
      selectionCallback={(selectedData) =>
        onChangeCallback && onChangeCallback(selectedData)
      }
      {...{ config, colorOptions, objectOptions, className, isDisplayOnly }}
    />
  );
};

ColorFilterToolContainer.displayName = "Container.ColorFilterTool";

export default ColorFilterToolContainer;
