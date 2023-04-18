import { IconKey } from "@rubin-epo/epo-react-lib/dist/svg/icons";
import {
  FunctionComponent,
  PropsWithChildren,
  useRef,
  KeyboardEvent,
} from "react";
import * as Styled from "./styles";
import { useTranslation } from "react-i18next";
import { IconComposer } from "@rubin-epo/epo-react-lib";

interface Tab {
  icon: IconKey;
  title: string;
}

interface TabbedSelectorProps {
  tabs: Tab[];
  labelledById?: string;
  activeIndex?: number;
  showPagingButtons?: boolean;
  prevButtonLabel?: string;
  nextButtonLabel?: string;
  onChangeCallback: (index: number) => void;
}

const TabbedSelector: FunctionComponent<
  PropsWithChildren<TabbedSelectorProps>
> = ({
  tabs,
  labelledById,
  activeIndex = 0,
  showPagingButtons = true,
  prevButtonLabel,
  nextButtonLabel,
  onChangeCallback,
  children,
}) => {
  const { t } = useTranslation();
  const tabRefs = useRef<HTMLButtonElement[]>([]);

  const handleClick = (i: number) => {
    onChangeCallback && onChangeCallback(i);
  };
  const count = tabs.length;

  const nextTab = () => setIndex((activeIndex + 1) % count);
  const prevTab = () => setIndex((activeIndex - 1 + count) % count);
  const firstTab = () => setIndex(0);
  const lastTab = () => setIndex(count - 1);

  const setIndex = (i: number) => {
    const tab = tabRefs.current[i];
    tab && tab.focus();
  };

  // onKeyDown handler for tab elements
  const onKeyDown = (event: KeyboardEvent) => {
    const keyMap: { [key: string]: () => void } = {
      ArrowRight: nextTab,
      ArrowLeft: prevTab,
      Home: firstTab,
      End: lastTab,
    };

    const action = keyMap[event.key];
    if (action) {
      event.preventDefault();
      action();
    }
  };

  return (
    <Styled.TabbedSelectorContainer>
      <Styled.TabList role="tablist">
        {tabs.map(({ icon, title }, i) => (
          <Styled.Tab
            role="tab"
            key={title}
            aria-selected={activeIndex === i}
            onClick={() => handleClick(i)}
            ref={(element) => element && (tabRefs.current[i] = element)}
            onKeyDown={onKeyDown}
            onFocus={() => handleClick(i)}
            tabIndex={activeIndex === i ? 0 : -1}
            aria-label={title}
          >
            <IconComposer icon={icon} />
          </Styled.Tab>
        ))}
      </Styled.TabList>
      <Styled.TabPanel
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={labelledById}
      >
        {children}
        {showPagingButtons && (
          <Styled.ButtonRow>
            <Styled.TabButton
              disabled={activeIndex === 0}
              onClick={() => prevTab()}
            >
              {prevButtonLabel || t("pagination.previous")}
            </Styled.TabButton>
            <Styled.TabButton
              disabled={activeIndex === tabs.length - 1}
              onClick={() => nextTab()}
            >
              {nextButtonLabel || t("pagination.next")}
            </Styled.TabButton>
          </Styled.ButtonRow>
        )}
      </Styled.TabPanel>
    </Styled.TabbedSelectorContainer>
  );
};

TabbedSelector.displayName = "Layout.TabbedSelector";

export default TabbedSelector;
