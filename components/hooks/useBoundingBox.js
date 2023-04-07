import { useState, useRef, useEffect } from "react";
import debounce from "lodash/debounce";

export default function useBbox() {
  const ref = useRef();
  const [box, setBoundingBox] = useState({});

  const set = () => {
    const box = ref && ref.current ? ref.current.getBoundingClientRect() : {};
    setBoundingBox(box);
  };

  useEffect(() => {
    set();

    const debounced = debounce(set, 200);

    window.addEventListener("resize", debounced);
    return () => window.removeEventListener("resize", debounced);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [box, ref];
}
