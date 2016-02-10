function TokenizerService(SessionService) {

  var TokenizerService = {}

  TokenizerService.notifications = {}


  TokenizerService.request = function(config) {
    if (SessionService.isSessionRunning()) {
      config.headers['x-session-token'] = SessionService.getToken();
    }
    return config;
  }

  return TokenizerService;

}

momocloudLogin.factory('TokenizerService', TokenizerService);
