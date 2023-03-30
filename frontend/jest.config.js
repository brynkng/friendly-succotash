module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
};
