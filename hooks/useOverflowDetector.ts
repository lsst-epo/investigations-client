import {
  useCallback,
  useState,
  useRef,
  useEffect,
  MutableRefObject,
} from "react";
import useResizeObserver from "use-resize-observer";

export interface useOverflowDetectorProps {
  onChange?: (overflow: boolean) => void;
}

export function useOverflowDetector(props: useOverflowDetectorProps) {
  const [overflow, setOverflow] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);
  const { onChange } = props;
  const updateState = useCallback(() => {
    if (ref.current === undefined) {
      return;
    }
    const newState = ref.current
      ? ref.current.offsetWidth < ref.current.scrollWidth ||
        ref.current.offsetHeight < ref.current.scrollHeight
      : overflow;
    if (newState === overflow) {
      return;
    }
    setOverflow(newState);
    if (onChange) {
      onChange(newState);
    }
  }, [onChange, setOverflow, overflow]);

  useResizeObserver({
    ref: ref as MutableRefObject<HTMLElement>,
    onResize: updateState,
  });

  useEffect(() => {
    updateState();
  });

  return {
    overflow,
    ref,
  };
}
