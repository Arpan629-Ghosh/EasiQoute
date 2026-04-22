module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@assets': './src/assets',
          '@config': './src/config',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@appTypes': './src/types',
          '@constants': './src/constants'
        },
      },
    ],
  ],
};
