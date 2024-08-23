"use client";

import { FunctionComponent } from "react";
import { useRouter } from "next/navigation";
import ExpandContract from "@/components/atomic/ExpandContract";

const CloseWindow: FunctionComponent = () => {
  const router = useRouter();

  const handleClick = () => {
    if (window.name && window.name !== "") {
      window.close();
    } else {
      router.push("/");
    }
  };

  return <ExpandContract onToggle={handleClick} isOpen />;
};

CloseWindow.displayName = "Molecule.Button.CloseWindow";

export default CloseWindow;
