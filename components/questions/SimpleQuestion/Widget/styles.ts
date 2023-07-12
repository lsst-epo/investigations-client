import styled from "styled-components";
import WidgetContainer from "@/components/layout/WidgetContainer/WidgetContainer";
import withModal from "@/components/hoc/withModal/withModal";

export const Container = styled(withModal(WidgetContainer))`
  margin-block-start: var(--PADDING_SMALL, 20px);
`;
