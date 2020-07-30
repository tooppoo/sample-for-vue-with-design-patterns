module.exports = {
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '@\\/(.+)': ['<rootDir>/src/$1']
  },
  testMatch: [
    '<rootDir>/spec/**/*.spec.ts'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  verbose: true
}
