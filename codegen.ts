import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  generates: {
    "./gql/public-schema/": {
      schema: process.env.NEXT_PUBLIC_API_URL,
      documents: [
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
        "!components/student-schema/**/*.{ts,tsx}",
        "!components/educator-schema/**/*.{ts,tsx}",
        "contexts/**/*.{ts,tsx}",
        "lib/api/**/*.graphql",
      ],
      preset: "client",
      config: {
        useTypeImports: true,
        avoidOptionals: true,
      },
      plugins: [],
    },
    "./gql/student-schema/": {
      schema: [
        {
          [process.env.NEXT_PUBLIC_API_URL]: {
            headers: {
              Authorization: `Bearer ${process.env.CRAFT_STUDENT_SCHEMA_SECRET_TOKEN}`,
            },
          },
        },
      ],
      documents: ["components/student-schema/**/*.{ts,tsx}"],
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
    "./gql/educator-schema/": {
      schema: [
        {
          [process.env.NEXT_PUBLIC_API_URL]: {
            headers: {
              Authorization: `Bearer ${process.env.CRAFT_EDUCATOR_SCHEMA_SECRET_TOKEN}`,
            },
          },
        },
      ],
      documents: ["components/educator-schema/**/*.{ts,tsx}"],
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
  },
  ignoreNoDocuments: true, // for better experience with the watcher
};

export default config;
