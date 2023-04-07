import { useEffect } from "react";

const useShareButtons = () => {
  useEffect(() => {
    if (window?.__sharethis__) {
      if (typeof window.__sharethis__.initialize === "function") {
        window.__sharethis__.initialize();
      }
    }
  }, []);
};

export default useShareButtons;
