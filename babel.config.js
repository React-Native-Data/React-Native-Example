module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [ require.resolve('babel-plugin-module-resolver'), {
      'root': [ './' ],
      'alias': {
         '@assets': './src/assets'
      },
      'extensions': [ '.js', '.ios.js', '.android.js', '.style.js' ]
    }]
  ]
};

