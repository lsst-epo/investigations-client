import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
export default {
  async generateBuildId() {
    return "investigations-client-next-build-id";
  },
  experimental: {
    // forceSwcTransforms: true,
    optimizePackageImports: ["@rubin-epo/epo-react-lib"],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  sassOptions: {
    includePaths: [
      join(__dirname, "theme/styles"),
      join(__dirname, "components"),
    ],
  },
  webpack(config) {
    config.externals.push({ "skia-canvas": "skia-canvas" });

    return config;
  },
  logging: {
    level: "verbose",
    fetches: {
      fullUrl: true,
    },
  },
};
