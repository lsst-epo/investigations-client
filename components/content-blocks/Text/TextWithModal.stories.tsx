import { Meta, StoryObj } from "@storybook/react";

import TextWithModal from "./TextWithModal";

const meta: Meta<typeof TextWithModal> = {
  component: TextWithModal,
  argTypes: {
    text: {
      description:
        "Plaintext or HTML to be displayed within the content block.",
      table: {
        type: {
          summary: "string",
        },
      },
    },
    title: {
      control: "text",
    },
  },
};
export default meta;

export const Primary: StoryObj<typeof TextWithModal> = {
  args: {
    text: "<p>Cosmic ipsum solar wind muttnik celestial equator Lunar mare bolometer white giant magnitude cosmic rays supernova spectrum cislunar culmination planetary nebula ice giant space exploration flare nova waxing waning inertia globular cluster exoplanet totality Pluto inferior planets transit kiloparsec equinox axial tilt crater double star wormhole gibbous moon Milky Way black body meridian perigee starlight lunar cosmos telemetry dust Kuiper belt Earth cluster star astronomer zenith</p><p>Inertia probe mass space station terminator galaxy nova black hole Lagrange points asteroid comet revolve flyby orbital eccentricity translunar waning superior planets celestial coordinates Drake equation vernal equinox magnitude cislunar local group Messier object total eclipse muttnik supernova big bang theory density variable star north star Neptune yellow dwarf wavelength x-rays synodic red dwarf orbital inclination perihelion Milky Way circumpolar crescent moon libration astronomical unit transit dust observatory corona</p>",
    title: "TextContentBlock",
  },
};
