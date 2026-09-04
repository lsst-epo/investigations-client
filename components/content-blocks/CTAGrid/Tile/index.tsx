"use client";
import { ReactNode, useId } from "react";
import clsx from "clsx";
import Image from "@rubin-epo/epo-react-lib/Image";
import type { ImageShape } from "@rubin-epo/epo-react-lib/Image";
import * as Styled from "./styles";

export interface TileLink {
  type?: string;
  url?: string;
  customText?: string;
  text?: string;
  target?: string;
  element?: { uri?: string };
}

interface TileProps {
  className?: string;
  footer?: { button?: ReactNode; sticker?: ReactNode };
  image?: ImageShape;
  link?: string | TileLink | null;
  pretitle?: ReactNode;
  subtitle?: ReactNode;
  title?: string | null;
  text?: string | null;
  titleTag?: "h2" | "h3" | "h4";
  type?: string;
}

export default function Tile({
  className,
  footer,
  image,
  link,
  pretitle,
  subtitle,
  title,
  text,
  titleTag: TitleTag = "h3",
  type = "cta",
}: TileProps) {
  const uid = useId();
  const linkProps = typeof link === "string" ? { url: link } : link;
  const url = linkProps?.url;

  const contents = (
    <>
      {image && (
        <div className="image">
          <Image image={image} />
        </div>
      )}
      {pretitle && <div className="pretitle">{pretitle}</div>}
      {title && (
        <TitleTag id={uid} className="title">
          {title}
        </TitleTag>
      )}
      {subtitle && <div className="subtitle">{subtitle}</div>}
      {text && (
        <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
      )}
      {footer && (
        <div className="footer">
          {footer.button && (
            <div className="c-buttonish c-buttonish--inert">
              {footer.button}
            </div>
          )}
          {footer.sticker && <div>{footer.sticker}</div>}
        </div>
      )}
    </>
  );

  const className_ = clsx(className, type);

  return (
    <Styled.ListItem>
      {url ? (
        <Styled.MixedLink
          type={linkProps?.type}
          url={url}
          text={linkProps?.text}
          customText={linkProps?.customText}
          target={linkProps?.target}
          element={
            linkProps?.element?.uri ? { uri: linkProps.element.uri } : undefined
          }
          aria-labelledby={uid}
          className={className_}
        >
          {contents}
        </Styled.MixedLink>
      ) : (
        <Styled.Tile className={className_}>{contents}</Styled.Tile>
      )}
    </Styled.ListItem>
  );
}
