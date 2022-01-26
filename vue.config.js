const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin({
        languages: [],
        customLanguages: [
          {
            label: 'yaml',
            entry: ['monaco-yaml', 'vs/basic-languages/yaml/yaml.contribution'],
            worker: {
              id: 'monaco-yaml/yamlWorker',
              entry: 'monaco-yaml/lib/esm/yaml.worker',
            },
          },
        ],
      })
    ]
  }
}
