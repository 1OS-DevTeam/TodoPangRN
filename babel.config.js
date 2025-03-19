module.exports = function(api) {
  api.cache(true);
  process.env.EXPO_ROUTER_APP_ROOT = "../../app";
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      
    ],
    
  };
}; 