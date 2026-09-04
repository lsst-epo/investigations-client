"use client";
import { graphql, useFragment, FragmentType } from "@/gql/public-schema";
import Container from "@rubin-epo/epo-react-lib/Container";
import * as Styled from "./styles";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";

const Fragment = graphql(`
  fragment DownloadListBlock on contentBlocks_downloadList_BlockType {
    id
    assetsList {
      ... on assetsList_item_BlockType {
        __typename
        id
        linkText
        assetSingle {
          url
          filename
          kind
          size
        }
      }
    }
  }
`);

function fileSize(size: number) {
  const i = Math.floor(Math.log(size) / Math.log(1024));

  return `${(size / Math.pow(1024, i)).toFixed(2)} ${
    ["B", "kB", "MB", "GB", "TB"][i]
  }`;
}

interface Props {
  data: FragmentType<typeof Fragment>;
}

export default function DownloadList(props: Props) {
  const { assetsList } = useFragment(Fragment, props.data);

  function getIcon(kind: string) {
    switch (kind) {
      case "pdf":
        return "pdf";

      case "doc":
      case "docm":
      case "docx":
      case "dot":
      case "dotx":
        return "word";

      default:
        return "doc";
    }
  }

  return assetsList.length > 0 ? (
    <Container>
      <Styled.ButtonWrapper>
        {assetsList.map((asset) => {
          if (!asset || !asset.assetSingle[0]?.url) return null;

          const size = Number(asset.assetSingle[0].size);

          return (
            <Buttonish
              key={asset.id}
              url={asset.assetSingle[0].url}
              download={asset.assetSingle[0].filename}
              icon={getIcon(asset.assetSingle[0].kind)}
              iconSize={32}
              styleAs="tertiary"
              isBlock
            >
              <>
                {asset.linkText}{" "}
                {!isNaN(size) && <span>({fileSize(size)})</span>}
              </>
            </Buttonish>
          );
        })}
      </Styled.ButtonWrapper>
    </Container>
  ) : null;
}

DownloadList.displayName = "ContentBlock.DownloadList";
