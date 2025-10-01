import * as Styled from "./styles";
import Image from "next/image";
interface NavHeaderProps {
  url: { directUrlOriginal: string };
  width: number;
  height: number;
}

export default function NavHeader({
  url: { directUrlOriginal },
  width,
  height,
}: NavHeaderProps) {
  return (
    <Styled.NavHeader>
      <Image
        src={directUrlOriginal}
        alt="alt"
        width={width}
        height={height}
      ></Image>
    </Styled.NavHeader>
  );
}
