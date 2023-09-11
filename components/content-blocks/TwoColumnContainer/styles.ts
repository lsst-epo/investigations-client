import styled from "styled-components";
import { Container } from "@rubin-epo/epo-react-lib";
import { BREAK_TABLET } from "@/styles/globalStyles";

export const TwoColContainer = styled(Container)`
	display: block;

	@media (min-width: ${BREAK_TABLET}) {
		display: flex;
		justify-content: space-between;
	}

	> section {
		padding-block-start: 0;
		@media (min-width: ${BREAK_TABLET}) {
			padding: 0;
			width: calc(50% - 20px);
		}
	}

	> section > div {
		padding: 0;
	}
`;
