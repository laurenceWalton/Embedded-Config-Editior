<template>
  <div id="app"></div>
</template>

<script>
import { setDiagnosticsOptions } from "monaco-yaml";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api.js";
import { editor, Uri } from "monaco-editor";
import schemaDefault from './schema.json';
const value = `
# Property descriptions are displayed when hovering over properties using your cursor
property: This property has a JSON schema description


# Titles work too!
titledProperty: Titles work too!


# Even markdown descriptions work
markdown: hover me to get a markdown based description 😮


# Enums can be autocompleted by placing the cursor after the colon and pressing Ctrl+Space
enum:


# Of course numbers are supported!
number: 12


# As well as booleans!
boolean: true


# And strings
string: I am a string


# This property is using the JSON schema recursively
reference:
  boolean: Not a boolean


# Also works in arrays
array:
  - string: 12
    enum: Mewtwo
    reference:
      reference:
        boolean: true


# JSON referenses can be clicked for navigation
pointer:
  $ref: '#/array'


# This anchor can be referenced
anchorRef: &anchor can be clicked as well


# Press control while hovering over the anchor
anchorPointer: *anchor


formatting:       Formatting is supported too! Under the hood this is powered by Prettier. Just press Ctrl+Shift+I or right click and press Format to format this document.


`.replace(/:$/m, ": ");
export default {
  mounted() {
    const modelUri = Uri.parse("file://./schema.json");

    setDiagnosticsOptions({
      enableSchemaRequest: true,
      hover: true,
      completion: true,
      validate: true,
      format: true,
      schemas: [
        {
          uri: "file://./schema.json",
          fileMatch: [String(modelUri)],
          schema: schemaDefault
        },
      ],
    });
    monaco.editor.create(document.getElementById("app"), {
      theme: "vs-dark",
      tabSize: 2,
      model: editor.createModel(value, "yaml", modelUri),
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
