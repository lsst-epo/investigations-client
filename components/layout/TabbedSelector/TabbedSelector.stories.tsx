import { Meta, StoryFn, StoryObj } from "@storybook/react";

import TabbedSelector from ".";
import { useState } from "react";
import { Container } from "@rubin-epo/epo-react-lib";
import { Text } from "@/components/content-blocks";

const meta: Meta<typeof TabbedSelector> = {
  component: TabbedSelector,
  argTypes: {},
};
export default meta;

const Template: StoryFn<typeof TabbedSelector> = (args) => {
  const [activeIndex, setActiveIndex] = useState(args.activeIndex || 0);
  const tabs = [
    {
      title: "Tab A",
      text: "<h1>Tab A</h1><p>Satellite ephemeris planetoid quarter moon inertia retrograde vernal equinox universe yellow dwarf full moon penumbra equinox culmination Kepler's laws scintillation perigee red dwarf escape velocity gamma ray ionosphere celestial coordinates Earthshine parallax geostationary orbit Venus black body solar wind meteoroid limb dark matter seeing ecliptic Hubble's law x-rays white dwarf gravity falling star total eclipse spectrum totality eccentricity rings cislunar shooting star Oort cloud azimuth nova</p>",
    },
    {
      title: "Tab B",
      text: "<h1>Tab B</h1><p>Spectroscope geosynchronous telescope full moon Oort cloud astronomy scintillation meteor globular cluster totality weightlessness heliocentric meteoroid radiant planet density gegenschein gravitational constant meteor shower deep space inner planets Alpha Centauri light-year orbital inclination parallax constellation conjunction inferior planets local group cosmology synodic visual magnitude event horizon ecliptic superior planets gravity waxing vernal equinox Venus yellow dwarf galaxy free fall black hole culmination nadir falling star plane of the ecliptic hypernova</p>",
    },
    {
      title: "Tab C",
      text: "<h1>Tab C</h1><p>Mars probe perturbation kiloparsec meteoroid lunar perigee singularity gegenschein red dwarf escape velocity gravitation gravitational constant red giant star muttnik spectrum parallax totality Bailey's beads meridian flare Kuiper belt Pluto plane of the ecliptic wormhole gravity event horizon transneptunians occultation albedo solar magnitude rocket opposition scintillation radiation wavelength nadir space station Earthshine Hubble telescope azimuth local group inclination translunar light-year vernal equinox space exploration</p>",
    },
    {
      title: "Tab D",
      text: "<h1>Tab D</h1><p>H-R diagram day scintillation Mercury equinox vacuum geostationary local group waning white giant azimuth conjunction gegenschein black hole Mars background radiation planet apastron muttnik eccentricity double star gas giant local arm totality density astronomy Neptune perturbation cosmology meteor x-rays singularity Bailey's beads moon scientific notation Messier object bolometer Deneb Kepler's laws shooting star transneptunians hyperbolic orbit new moon galaxy solar wind syzygy Alpha Centauri gibbous moon</p>",
    },
  ];

  const { title, text } = tabs[activeIndex];

  return (
    <Container>
      <TabbedSelector
        {...args}
        tabs={tabs.map(({ title }) => ({
          icon: "Cloud",
          title,
        }))}
        activeIndex={activeIndex}
        onChangeCallback={(i) => setActiveIndex(i)}
      >
        <Text text={text} pageId={title} />
      </TabbedSelector>
    </Container>
  );
};

export const Primary: StoryObj<typeof TabbedSelector> = Template.bind({});
