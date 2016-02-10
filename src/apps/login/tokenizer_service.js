function TokenizerService() {

  var TokenizerService = {};

  TokenizerService.notifications = {};


  TokenizerService.request = function(config) {
    if (! AuthService.isLoggedIn) {
      config.headers['x-session-token'] = AuthService.token;
    }
    console.log('Configuration object', config);
    return config;
  }

  return TokenizerService;

}

momocloudLogin.factory('TokenizerService', TokenizerService);
