import {
  FunctionComponent,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import IconComposer from "@rubin-epo/epo-react-lib/IconComposer";
import { useOverflowDetector } from "@/hooks/useOverflowDetector";
import * as Styled from "./styles";

interface TableCell {
  isHeader?: boolean;
}

interface TableHeaderCell {
  thProps?: any;
}

export type TableHeader = PropsWithChildren<TableHeaderCell>[];

export type TableRow = PropsWithChildren<TableCell>[][];

interface TableProps {
  header: TableHeader;
  rows: TableRow;
  caption?: string;
  id?: string;
  labelledById?: string;
}

const Table: FunctionComponent<TableProps> = ({
  header = [],
  rows = [],
  id,
  labelledById,
  caption,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const headerRef = useRef<HTMLTableRowElement>(null);
  const { overflow, ref } = useOverflowDetector({});

  const handleEvent = (event: MouseEvent, direction: "left" | "right") => {
    if (headerRef.current && ref.current) {
      const { offsetWidth: buttonWidth } = event.target as HTMLButtonElement;
      const { offsetWidth: parentWidth } = ref.current;
      const { children, offsetWidth: headerWidth } = headerRef.current;
      const buttonOffset = buttonWidth / 2;

      const headers =
        direction === "right"
          ? Array.from(children)
          : Array.from(children).reverse();

      for (const th of headers) {
        const { offsetLeft, offsetWidth } = th as HTMLTableCellElement;

        if (direction === "right") {
          const isHidden =
            offsetLeft + offsetWidth > parentWidth + scrollPosition;

          if (isHidden) {
            const newPosition =
              offsetLeft + offsetWidth - parentWidth + buttonOffset;

            setScrollPosition(Math.min(newPosition, headerWidth));
            break;
          }
        } else {
          const isHidden = offsetLeft < scrollPosition;
          if (isHidden) {
            const newPosition = offsetLeft - buttonOffset;

            setScrollPosition(Math.max(newPosition, 0));
            break;
          }
        }
      }
    }
  };

  if (ref.current) {
    ref.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }
  const isAtEnd = ref.current
    ? Math.ceil(ref.current?.scrollWidth - scrollPosition) <=
      ref.current?.clientWidth
    : false;

  return (
    <Styled.TableWrapper>
      {overflow && (
        <>
          <Styled.ScrollButton
            onClick={(event: any) => handleEvent(event, "left")}
            disabled={scrollPosition <= 0}
            aria-hidden={true}
          >
            <IconComposer icon="ChevronLeftElongated" />
          </Styled.ScrollButton>
          <Styled.ScrollButton
            onClick={(event: any) => handleEvent(event, "right")}
            disabled={isAtEnd}
            aria-hidden={true}
          >
            <IconComposer icon="ChevronRightElongated" />
          </Styled.ScrollButton>
        </>
      )}

      <Styled.ScrollWrapper ref={ref as MutableRefObject<HTMLDivElement>}>
        <Styled.Table id={id} aria-labelledby={labelledById}>
          {caption && <Styled.Caption>{caption}</Styled.Caption>}
          <thead>
            <tr ref={headerRef}>
              {header.map(({ children, thProps }, i) => (
                <Styled.Header key={i} scope="col" {...thProps}>
                  {children}
                </Styled.Header>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, i) => (
              <tr key={i}>
                {cells.map(({ isHeader, children }, i) => (
                  <Styled.Cell
                    key={i}
                    as={isHeader ? "th" : undefined}
                    scope={isHeader ? "row" : undefined}
                  >
                    {children}
                  </Styled.Cell>
                ))}
              </tr>
            ))}
          </tbody>
        </Styled.Table>
      </Styled.ScrollWrapper>
    </Styled.TableWrapper>
  );
};

Table.displayName = "Layout.Table";

export default Table;
