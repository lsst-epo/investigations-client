import { useEffect } from "react";
import debounce from "lodash/debounce";
const useNavHider = (
  prevScrollPos: number,
  setPrevScrollPos: (scroll: number) => void,
  visible: boolean,
  setVisible: (visible: boolean) => void
) => {
  const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
      setVisible(true);
      return;
    }

    if (currentScroll > prevScrollPos && visible === true) {
      // down
      setVisible(false);
    } else if (currentScroll < prevScrollPos && visible === false) {
      // up
      setVisible(true);
    }
    setPrevScrollPos(currentScroll);
  }, 30);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);
};

export default useNavHider;
