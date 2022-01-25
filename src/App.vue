<template>
  <div id="app"></div>
</template>

<script>
//import { setDiagnosticsOptions } from "monaco-yaml";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
const value = `
number: 0xfe
boolean: true
`;

export default {
  mounted() {
    monaco.languages.yaml.yamlDefaults.setDiagnosticsOptions({
      enableSchemaRequest: true,
      hover: true,
      completion: true,
      validate: true,
      format: true,
      schemas: [
      {
        fileMatch: ['*'],
        uri: 'my-schema.json',
        schema: {
          type: 'object',
          properties: {
            number: {
              description: 'number property',
              type: 'number',
            },
          },
        },
      },
    ],
    });
    monaco.editor.create(document.getElementById("app"), {
      value,
      language: "yaml",
      theme: "vs-dark",
      tabSize: 2,
    });
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 1000px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
