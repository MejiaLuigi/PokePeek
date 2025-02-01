module.exports = {
  preset: "react-native",
  testEnvironment: "jsdom",  // Cambiado de "node" a "jsdom" para React Native
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'], // Agregado para extender los matchers de jest-native
  setupFiles: [        '<rootDir>/__mocks__/expo.js', 
        '<rootDir>/__mocks__/expo-modules-core.js',
        '<rootDir>/__mocks__/@expo/vector-icons.js',],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest", // Usa babel-jest para transformar archivos JS/TSX
  
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  moduleNameMapper: {
    '^@expo/vector-icons$': '<rootDir>/__mocks__/@expo/vector-icons.js',
    '^expo-modules-core$': '<rootDir>/__mocks__/expo-modules-core.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageProvider: "babel",  // Especificado para usar Babel para cobertura
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],  // Archivos que se incluirán en la cobertura
};
