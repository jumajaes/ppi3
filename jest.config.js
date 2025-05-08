module.exports = {
    testMatch: ["**/testreact/**/*.spec.js"],
    transform: {
      "^.+\\.jsx?$": "babel-jest"
    },
    moduleDirectories: ["node_modules", "src"]
  };
  