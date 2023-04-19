import { Meta, StoryFn, StoryObj } from "@storybook/react";

import TabbedSelector from ".";
import { useState } from "react";
import { Container } from "@rubin-epo/epo-react-lib";
import { Text } from "@/components/content-blocks";

const meta: Meta<typeof TabbedSelector> = {
  component: TabbedSelector,
  argTypes: {
    tabs: {
      type: {
        name: "other",
        value: "Tab[]",
        required: true,
      },
      description:
        "Tabs to display, should include an icon and a label for accessibility.",
      table: {
        type: {
          summary: "Tab[]",
        },
        category: "Model",
      },
    },
    labelledById: {
      control: "text",
      description: "ID of element that labels the tab panel.",
      table: {
        type: {
          summary: "string",
        },
        category: "Accessibility",
      },
    },
    activeIndex: {
      control: { type: "number", min: 0 },
      description:
        "The currently active index of the array of tabs. Is managed by parent component.",
      table: {
        type: {
          summary: "number",
        },
        category: "Model",
      },
    },
    showPagingButtons: {
      control: "boolean",
      description: "Shows the paging buttons at the bottom of the tabpanel",
      table: {
        type: {
          summary: "boolean",
        },
        category: "Display",
      },
    },
    prevButtonLabel: {
      control: "text",
      description: "Optional text to label the 'previous' button",
      table: { type: { summary: "string" }, category: "Display" },
    },
    nextButtonLabel: {
      control: "text",
      description: "Optional text to label the 'Next' button",
      table: { type: { summary: "string" }, category: "Display" },
    },
    onChangeCallback: {
      type: {
        name: "function",
        required: true,
      },
      description: "Callback containing the new active index",
      table: {
        type: { summary: "(index: number) => void" },
        category: "Function",
      },
    },
  },
};

export default meta;

const Template: StoryFn<typeof TabbedSelector> = (args) => {
  const [activeIndex, setActiveIndex] = useState(args.activeIndex || 0);
  const tabs = [
    {
      label: "Tab A",
      text: "<h1>Tab A</h1><p>Satellite ephemeris planetoid quarter moon inertia retrograde vernal equinox universe yellow dwarf full moon penumbra equinox culmination Kepler's laws scintillation perigee red dwarf escape velocity gamma ray ionosphere celestial coordinates Earthshine parallax geostationary orbit Venus black body solar wind meteoroid limb dark matter seeing ecliptic Hubble's law x-rays white dwarf gravity falling star total eclipse spectrum totality eccentricity rings cislunar shooting star Oort cloud azimuth nova</p>",
    },
    {
      label: "Tab B",
      text: "<h1>Tab B</h1><p>Spectroscope geosynchronous telescope full moon Oort cloud astronomy scintillation meteor globular cluster totality weightlessness heliocentric meteoroid radiant planet density gegenschein gravitational constant meteor shower deep space inner planets Alpha Centauri light-year orbital inclination parallax constellation conjunction inferior planets local group cosmology synodic visual magnitude event horizon ecliptic superior planets gravity waxing vernal equinox Venus yellow dwarf galaxy free fall black hole culmination nadir falling star plane of the ecliptic hypernova</p>",
    },
    {
      label: "Tab C",
      text: "<h1>Tab C</h1><p>Mars probe perturbation kiloparsec meteoroid lunar perigee singularity gegenschein red dwarf escape velocity gravitation gravitational constant red giant star muttnik spectrum parallax totality Bailey's beads meridian flare Kuiper belt Pluto plane of the ecliptic wormhole gravity event horizon transneptunians occultation albedo solar magnitude rocket opposition scintillation radiation wavelength nadir space station Earthshine Hubble telescope azimuth local group inclination translunar light-year vernal equinox space exploration</p>",
    },
    {
      label: "Tab D",
      text: "<h1>Tab D</h1><p>H-R diagram day scintillation Mercury equinox vacuum geostationary local group waning white giant azimuth conjunction gegenschein black hole Mars background radiation planet apastron muttnik eccentricity double star gas giant local arm totality density astronomy Neptune perturbation cosmology meteor x-rays singularity Bailey's beads moon scientific notation Messier object bolometer Deneb Kepler's laws shooting star transneptunians hyperbolic orbit new moon galaxy solar wind syzygy Alpha Centauri gibbous moon</p>",
    },
  ];

  const { label, text } = tabs[activeIndex];

  return (
    <Container>
      <TabbedSelector
        {...args}
        tabs={tabs.map(({ label }) => ({
          icon: "Cloud",
          label,
        }))}
        activeIndex={activeIndex}
        onChangeCallback={(i) => setActiveIndex(i)}
      >
        <Text text={text} pageId={label} />
      </TabbedSelector>
    </Container>
  );
};

export const Primary: StoryObj<typeof TabbedSelector> = Template.bind({});
