<template>
  <div id="app">
    <text-reader v-on:load="loadText($event)" name="Upload File"></text-reader>
    <text-reader v-on:load="loadSchema($event)" name="Upload Schema"></text-reader>
  </div>
</template>

<script>
import { setDiagnosticsOptions } from "monaco-yaml";
import { editor, Uri } from "monaco-editor";
import schemaDefault from "./schema.json";
import TextReader from "./TextReader";

const def_value = `
# Property descriptions are displayed when hovering over properties
property: This property has a JSON schema description

# Markdown descriptions work
markdown: Hover to get a markdown based description 

# Enums can be autocompleted by placing the cursor after the colon and pressing Ctrl+Space
enum:

# Numbers
number: 12

# Booleans
boolean: true

# And strings
string: I am a string

formatting:       Formatting is supported too. Just press Ctrl+Shift+I or right click and press Format.

`.replace(/:$/m, ": ");

export default {
  // Create the default editor with def_value and included schema.json file
  mounted() {
    this.modelUri = Uri.parse("file://./schema.json");

    setDiagnosticsOptions({
      enableSchemaRequest: true,
      hover: true,
      completion: true,
      validate: true,
      format: true,
      schemas: [
        {
          uri: "file://./schema.json",
          fileMatch: [String(this.modelUri)],
          schema: schemaDefault,
        },
      ],
    });

    this.ed = editor.create(document.getElementById("app"), {
      theme: "vs-dark",
      tabSize: 2,
      model: editor.createModel(def_value, "yaml", this.modelUri),
    });
  },
  components: {
    TextReader
  },
  data: function () {
    return {
      // Editor must be accessible by all methods
      ed: null,
      // URI of the default schema
      modelUri: null,
    };
  },

  methods: {
    // Called on upload schema button
    loadSchema(e) {
      // Converts input string (parsed from input file, see SchemaReader component) to JSON object
      const inputSchema = JSON.parse(e);
      setDiagnosticsOptions({
        enableSchemaRequest: true,
        hover: true,
        completion: true,
        validate: true,
        format: true,
        schemas: [
          {
            uri: "file://./schema.json",
            fileMatch: [String(this.modelUri)],
            // Schema is changed here. (creating and swapping out model was unnecessary, thanks @Michael)
            schema: inputSchema
          },
        ],
      });
    },
    // Called on upload file button
    loadText(e) {
      // Stores input string (parsed from input file, see TextReader component)
      const inputFile = e;
      const newModel = this.ed.getModel();
      // The method setValue simply swaps out an existing model's text value which is cleaner than swapping the whole model
      newModel.setValue(inputFile);
    },
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
  background-color: rgb(39, 34, 34);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
