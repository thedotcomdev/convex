module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.(css|less|scss)$': 'identity-obj-proxy',
    '^test-utils$': '<rootDir>/src/testUtils/test-utils.tsx',
  },
};
