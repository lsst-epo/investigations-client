import { loadEnvConfig } from "@next/env";
import type { CodegenConfig } from "@graphql-codegen/cli";

loadEnvConfig(process.cwd());

const config: CodegenConfig = {
  generates: {
    "./gql/public-schema/": {
      schema: "http://localhost:8080/api",
      documents: [
        "app/**/*.tsx",
        "components/**/*.{ts,tsx}",
        "!components/student-schema/**/*.{ts,tsx}",
        "!components/educator-schema/**/*.{ts,tsx}",
        "contexts/**/*.tsx",
        "lib/api/**/*.graphql",
      ],
      preset: "client",
      config: {
        useTypeImports: true,
      },
      plugins: [],
    },
    "./gql/student-schema/": {
      schema: [
        {
          "http://localhost:8080/api": {
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
          "http://localhost:8080/api": {
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
