module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Regex pattern to find test files in the integration folder
  testRegex: '(/test/integration/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
