module.exports = {
  collectCoverageFrom: ['src/**/*.{js,jsx,mjs}'],
  testEnvironment: 'jsdom',
  setupFiles: [
    '<rootDir>/config/polyfills.js'
  ],
  setupTestFrameworkScriptFile: '<rootDir>/enzyme.config.js',
  testMatch:
    [
      '<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}',
      '<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}'
    ],
  testURL:
    'http://localhost',
  transform:
    {
      '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
      '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
      '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
    },
  transformIgnorePatterns:
    [
      '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$'
    ],
  moduleNameMapper:
    {
      '^react-native$': 'react-native-web',
      '^@Library(.*)$': '<rootDir>/src/library$1',
      '^@Scenes(.*)$': '<rootDir>/src/scenes$1',
      '^@Containers(.*)$': '<rootDir>/src/containers$1',
      '^@Assets(.*)$': '<rootDir>/src/assets$1'
    },
  modulePaths: ['<rootDir>/src/'],
  moduleFileExtensions:
    [
      'web.js',
      'mjs',
      'js',
      'json',
      'web.jsx',
      'jsx',
      'node'
    ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/registerServiceWorker.js',
    '<rootDir>/src/index.js'
  ]
}
