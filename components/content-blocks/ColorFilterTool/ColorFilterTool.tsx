import { FunctionComponent } from "react";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import WidgetContainer from "@/components/layout/WidgetContainer";
import ColorTool from "@rubin-epo/epo-widget-lib/ColorTool";
import ColorSwatch from "@rubin-epo/epo-react-lib/ColorSwatch";
import { BaseContentBlockProps } from "@/components/shapes";
import withModal from "@/components/hoc/withModal/withModal";

const Fragment = graphql(`
  fragment ColorFilterToolBlock on widgets_colorFilterTool_Entry {
    title
    filterColorOptionsLabels: filterColorOptions(label: true)
    filterColorOptionsValues: filterColorOptions(label: true)
    colorFilterToolObjects {
      ... on colorFilterToolObjects_group_BlockType {
        groupName
        objects: children {
          ... on colorFilterToolObjects_object_BlockType {
            objectName
            objectCaption
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
                  additional {
                    AltTextEN
                    AltTextES
                  }
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

const formatColorOptions = (colorOptionLabels, colorOptionValues) => {
  return colorOptionLabels.map((colorOptionLabel, i) => {
    const colorOptionValue = colorOptionValues[i];
    return {
      value: colorOptionValue,
      label: colorOptionLabel,
      icon: <ColorSwatch color={colorOptionValue} size="small" />,
    };
  });
};

const formatFilterImage = (filterImage) => {
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

const formatFilterImages = (filterImages) =>
  filterImages.map((filterImage) => formatFilterImage(filterImage));

const formatObject = (object) => {
  const { objectName: name, objectCaption: caption, filterImages } = object;

  return {
    name,
    caption,
    filters: formatFilterImages(filterImages),
  };
};

const formatObjects = (objects) =>
  objects.map((object) => formatObject(object));

const formatObjectGroups = (objectGroups) => {
  return objectGroups.map((group) => {
    const { groupName: type, objects } = group;

    return {
      type,
      filters: formatObjects(objects),
    };
  });
};

interface ColorFilterToolBlockProps extends BaseContentBlockProps {
  data: FragmentType<typeof Fragment>;
  onChangeCallback: (value: any) => void;
  value?: any;
}

const ColorFilterToolBlock: FunctionComponent<ColorFilterToolBlockProps> = ({
  data,
  onChangeCallback,
  value,
  openModal,
  isOpen,
}) => {
  const {
    colorFilterTool: [
      {
        filterColorOptionsLabels,
        filterColorOptionsValues,
        colorFilterToolObjects,
        title,
      },
    ],
  } = useFragment(Fragment, data);

  const colorOptions = formatColorOptions(
    filterColorOptionsLabels,
    filterColorOptionsValues
  );
  const objectGroups = formatObjectGroups(colorFilterToolObjects);

  return (
    <WidgetContainer {...{ title, openModal, isOpen }}>
      <ColorTool
        data={objectGroups}
        selectedData={value || objectGroups[0].filters[0]}
        colorOptions={colorOptions}
        selectionCallback={(selectedData) =>
          onChangeCallback && onChangeCallback(selectedData)
        }
      />
    </WidgetContainer>
  );
};

ColorFilterToolBlock.displayName = "ContentBlock.ColorFilterTool";

export default withModal(ColorFilterToolBlock);
