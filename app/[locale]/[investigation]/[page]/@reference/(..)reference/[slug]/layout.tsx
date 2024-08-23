import { FunctionComponent, PropsWithChildren } from "react";
import RoutedModal from "@/components/layout/Modal/Routed";

const ReferenceModalLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <RoutedModal>{children}</RoutedModal>;
};

export default ReferenceModalLayout;
