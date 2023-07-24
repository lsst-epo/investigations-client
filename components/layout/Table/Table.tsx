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
  const [scroll, setScroll] = useState(0);
  const [cellIndex, setCellIndex] = useState(0);
  const headerRef = useRef<HTMLTableRowElement>(null);
  const { overflow, ref } = useOverflowDetector({});

  const handleEvent = (forward = true) => {
    if (headerRef.current && ref.current) {
      const { offsetWidth: parentWidth, scrollLeft } = ref.current;
      const { children } = headerRef.current;

      const start = forward
        ? Math.min(cellIndex + 1, children.length - 1)
        : Math.max(cellIndex - 1, 0);

      for (let i = start; i < children.length; forward ? i++ : i--) {
        const th = children[i];
        const { offsetLeft, offsetWidth, cellIndex } =
          th as HTMLTableCellElement;
        const isHidden = forward
          ? offsetLeft + offsetWidth > parentWidth + scrollLeft
          : offsetLeft < scrollLeft;

        if (isHidden) {
          if (i <= 0 || i >= children.length - 1) {
            const left = forward ? offsetLeft : 0;
            ref.current.scrollTo({ left, behavior: "smooth" });
          } else {
            th.scrollIntoView({ behavior: "smooth" });
          }

          setCellIndex(cellIndex);

          return;
        }
      }
    }
  };
  return (
    <Styled.TableWrapper>
      {overflow && (
        <>
          <Styled.ScrollButton
            onClick={() => handleEvent(false)}
            disabled={cellIndex <= 0 && scroll <= 0}
            aria-hidden={true}
          >
            <IconComposer icon="ChevronLeftElongated" />
          </Styled.ScrollButton>
          <Styled.ScrollButton
            onClick={() => handleEvent()}
            disabled={cellIndex >= header.length - 1 && scroll > 0}
            aria-hidden={true}
          >
            <IconComposer icon="ChevronRightElongated" />
          </Styled.ScrollButton>
        </>
      )}

      <Styled.ScrollWrapper
        ref={ref as MutableRefObject<HTMLDivElement>}
        onScroll={(event) =>
          setScroll((event.target as HTMLDivElement).scrollLeft)
        }
      >
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
