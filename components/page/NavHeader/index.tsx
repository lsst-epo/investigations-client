import * as Styled from "./styles";
import Image from "next/image";
interface NavHeaderProps {
  url: { directUrlOriginal: string } | undefined;
  width: number;
  height: number;
}

export default function NavHeader({ url, width, height }: NavHeaderProps) {
  return (
    <Styled.NavHeader>
      {url && (
        <Image
          src={url.directUrlOriginal}
          alt="alt"
          width={width}
          height={height}
        ></Image>
      )}
    </Styled.NavHeader>
  );
}
