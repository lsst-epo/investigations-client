import { Container } from "@rubin-epo/epo-react-lib";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import ColorTool from "@rubin-epo/epo-widget-lib/ColorTool";
import ColorSwatch from "@rubin-epo/epo-react-lib/ColorSwatch";

const Fragment = graphql(`
  fragment ColorFilterToolBlock on contentBlocks_colorFilterToolBlock_BlockType {
    __typename
    colorFilterTool {
      ... on widgets_colorFilterTool_Entry {
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

export default function ColorFilterToolBlock(props: {
  site: string;
  data: FragmentType<typeof Fragment>;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    colorFilterTool: [
      {
        filterColorOptionsLabels,
        filterColorOptionsValues,
        colorFilterToolObjects,
      },
    ],
  } = useFragment(Fragment, props.data);

  const colorOptions = formatColorOptions(
    filterColorOptionsLabels,
    filterColorOptionsValues
  );
  const objectGroups = formatObjectGroups(colorFilterToolObjects);

  return (
    <Container>
      <ColorTool
        data={objectGroups}
        selectedData={objectGroups[0].filters[0]}
        colorOptions={colorOptions}
      />
    </Container>
  );
}

ColorFilterToolBlock.displayName = "ContentBlock.ColorFilterTool";
