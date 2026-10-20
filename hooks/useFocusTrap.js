// adapted from https://github.com/bmcmahen/sancho/blob/master/src/Hooks/use-focus-trap.ts

import { useEffect } from "react";
// eslint-disable-next-line import/named -- export is inside a `declare module` block the resolver can't see
import { createFocusTrap } from "focus-trap";

export default function useFocusTrap(elementRef, active, ...options) {
  useEffect(() => {
    let trap = null;

    function focusElement() {
      if (!elementRef.current) return;

      trap = createFocusTrap(elementRef.current, {
        escapeDeactivates: true,
        clickOutsideDeactivates: true,
        fallbackFocus: '[tabindex="-1"]',
        ...options,
      });

      trap.activate();
    }

    function focusTrigger() {
      if (!trap) return;
      trap.deactivate();
    }

    if (active) {
      focusElement();
      return () => {
        focusTrigger();
      };
    }
  }, [elementRef, active, options]);
}
