module.exports = {
    setupFiles: ["<rootDir>/jest.setup.js"],
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      '^@state/(.*)$': '<rootDir>/src/state/$1',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };
  