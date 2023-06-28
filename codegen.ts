import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/api",
  documents: [
    "app/**/*.tsx",
    "components/**/*.{ts,tsx}",
    "contexts/**/*.tsx",
    "lib/api/**/*.graphql",
  ],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
