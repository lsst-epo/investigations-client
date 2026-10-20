import styled from "styled-components";

export const OrbitalSimWidgetContainer = styled.div`
    width: 100%;
    min-height: 500px;
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