import styled from "styled-components";

export const OrbitalSimWidgetContainer = styled.div`
    min-height: 500px;
    width: 100%;
`;

export const SelectionListWrapper = styled.div`
    max-width: 40%;
    margin-top: var(--PADDING_SMALL);
    margin-bottom: var(--PADDING_SMALL);
    button {
        padding: 0px;
    }

    @container (width < 800px) {
        max-width: 100%;
    }
`;