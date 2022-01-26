<template>
  <div id="app"></div>
</template>

<script>
import { setDiagnosticsOptions } from "monaco-yaml";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
const value = `
# Correct yaml
name: John Appleseed
# Incorrect yaml
foo: somebody said I should put a colon here: so I did
`;

export default {
  mounted() {
    setDiagnosticsOptions({
      hover: true,
      completion: true,
      validate: true,
      format: true,      
      schemas: [],
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
