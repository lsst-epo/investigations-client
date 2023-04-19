import { Meta, StoryFn, StoryObj } from "@storybook/react";

import WidgetContainer from ".";
import TabbedSelector from "@/layout/TabbedSelector";
import { FilterTool } from "@rubin-epo/epo-widget-lib";
import { useState } from "react";
import { Container } from "@rubin-epo/epo-react-lib";

const meta: Meta<typeof WidgetContainer> = {
  component: WidgetContainer,
  argTypes: {
    children: {
      control: "none",
    },
    bgColor: {
      control: "select",
      options: ["white", "gray"],
    },
    paddingSize: {
      control: "select",
      options: ["small", "medium", "large", "none"],
    },
  },
};

export default meta;

// const Template: StoryFn<typeof TabbedSelector> = (args) => {
//   const [activeIndex, setActiveIndex] = useState(args.activeIndex || 0);
//   const tabs = [
//     {
//       label: "Tab A",
//       text: "<h1>Tab A</h1><p>Satellite ephemeris planetoid quarter moon inertia retrograde vernal equinox universe yellow dwarf full moon penumbra equinox culmination Kepler's laws scintillation perigee red dwarf escape velocity gamma ray ionosphere celestial coordinates Earthshine parallax geostationary orbit Venus black body solar wind meteoroid limb dark matter seeing ecliptic Hubble's law x-rays white dwarf gravity falling star total eclipse spectrum totality eccentricity rings cislunar shooting star Oort cloud azimuth nova</p>",
//     },
//     {
//       label: "Tab B",
//       text: "<h1>Tab B</h1><p>Spectroscope geosynchronous telescope full moon Oort cloud astronomy scintillation meteor globular cluster totality weightlessness heliocentric meteoroid radiant planet density gegenschein gravitational constant meteor shower deep space inner planets Alpha Centauri light-year orbital inclination parallax constellation conjunction inferior planets local group cosmology synodic visual magnitude event horizon ecliptic superior planets gravity waxing vernal equinox Venus yellow dwarf galaxy free fall black hole culmination nadir falling star plane of the ecliptic hypernova</p>",
//     },
//     {
//       label: "Tab C",
//       text: "<h1>Tab C</h1><p>Mars probe perturbation kiloparsec meteoroid lunar perigee singularity gegenschein red dwarf escape velocity gravitation gravitational constant red giant star muttnik spectrum parallax totality Bailey's beads meridian flare Kuiper belt Pluto plane of the ecliptic wormhole gravity event horizon transneptunians occultation albedo solar magnitude rocket opposition scintillation radiation wavelength nadir space station Earthshine Hubble telescope azimuth local group inclination translunar light-year vernal equinox space exploration</p>",
//     },
//     {
//       label: "Tab D",
//       text: "<h1>Tab D</h1><p>H-R diagram day scintillation Mercury equinox vacuum geostationary local group waning white giant azimuth conjunction gegenschein black hole Mars background radiation planet apastron muttnik eccentricity double star gas giant local arm totality density astronomy Neptune perturbation cosmology meteor x-rays singularity Bailey's beads moon scientific notation Messier object bolometer Deneb Kepler's laws shooting star transneptunians hyperbolic orbit new moon galaxy solar wind syzygy Alpha Centauri gibbous moon</p>",
//     },
//   ];

// const { label, text } = tabs[activeIndex];

//   return (
//     <Container>
//       <TabbedSelector
//         {...args}
//         tabs={tabs.map(({ label }) => ({
//           icon: "Cloud",
//           label,
//         }))}
//         activeIndex={activeIndex}
//         onChangeCallback={(i) => setActiveIndex(i)}
//       >
//         <Text text={text} pageId={label} />
//       </TabbedSelector>
//     </Container>
//   );
// };

const TabbedExample: StoryFn<typeof WidgetContainer> = (args) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const colors = ["violet", "blue", "green", "yellow", "orange", "red", "none"];
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

  const selectedColor = colors[activeIndex];

  return (
    <Container>
      <WidgetContainer bgColor="gray">
        <TabbedSelector
          {...args}
          tabs={colors.map((color) => ({
            icon: "Cloud",
            label: color,
          }))}
          activeIndex={activeIndex}
          onChangeCallback={(i) => setActiveIndex(i)}
        >
          <FilterTool selectedColor={selectedColor as any} />
        </TabbedSelector>
      </WidgetContainer>
    </Container>
  );
};

export const Primary: StoryObj<typeof WidgetContainer> = {
  args: {
    title: "Filter Tool",
    caption: "Captions for this widget go here.",
    children: <FilterTool />,
    hasModal: true,
    isOpen: false,
  },
};

export const CompleteExample: StoryObj<typeof WidgetContainer> =
  TabbedExample.bind({});
