module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],

  // Coverage settings
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",      // Include all TypeScript files in src
    "!src/index.ts"           // Exclude index.ts
  ],
  coverageDirectory: 'coverage',  // Optional: specify where to output coverage files
  coverageReporters: ['text', 'lcov'],  // Customize the format of the coverage report
};
