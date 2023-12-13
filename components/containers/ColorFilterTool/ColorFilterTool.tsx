import { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ColorSwatch from "@rubin-epo/epo-react-lib/ColorSwatch";
import { Option } from "@/components/shapes/option";
import { formatObjectGroups } from "../helpers";

const ColorTool = dynamic(
  () =>
    import("@rubin-epo/epo-widget-lib/ColorTool").then(
      (module) => module.default
    ),
  {
    ssr: false,
  }
);

export const Fragment = graphql(`
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
  onChangeCallback: (value: any) => void;
  value?: any;
  className?: string;
}

const ColorFilterToolContainer: FunctionComponent<
  ColorFilterToolContainerProps
> = ({ data, onChangeCallback, value, className }) => {
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
      {...{ config, colorOptions, objectOptions, className }}
    />
  );
};

ColorFilterToolContainer.displayName = "Container.ColorFilterTool";

export default ColorFilterToolContainer;
