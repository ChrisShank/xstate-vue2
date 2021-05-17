module.exports = {
  preset: 'ts-jest',
  setupFiles: [
    '<rootDir>/test/test.setup.js',
  ],
  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': require.resolve('vue-jest')
  }
};
