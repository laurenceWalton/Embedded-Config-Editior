<template>
  <div id="app">
    <text-reader v-on:load="loadText($event)"></text-reader>
    <schema-reader v-on:load="loadSchema($event)"></schema-reader>
    <p>Upload a file and JSON schema to change defaults</p>
  </div>
</template>

<script>
import { setDiagnosticsOptions } from "monaco-yaml";
import { editor, Uri } from "monaco-editor";
import schemaDefault from "./schema.json";
import TextReader from "./TextReader";
import SchemaReader from "./SchemaReader";

const def_value = `
# OLDProperty descriptions are displayed when hovering over properties using your cursor
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
    TextReader,
    SchemaReader,
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
            schema: inputSchema
          },
        ],
      });
      // Model with new schema created and swapped in for old model on the same editor instance
      const oldModel = this.ed.getModel();
      const newModel = editor.createModel(
        oldModel.getValue(),
        "yaml",
        this.modelUri
      );
      this.ed.setModel(newModel);
      oldModel.dispose();
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  width: 1000px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.text-reader {
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.text-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
.schema-reader {
  border: 2px solid black;
  border-radius: 5px;
  padding: 8px 12px;
  cursor: pointer;
}
.schema-reader input {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0;
}
</style>