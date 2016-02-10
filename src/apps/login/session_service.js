function SessionService(NotificationCenter, UtilityService) {

 	var SessionService = {}
  SessionService.user = null;
	SessionService.identifier = 'Momocloud';

  SessionService.notifications = {
    START_SESSION: 'SessionServiceStartSession',
    STOP_SESSION: 'SessionServiceStopSession'
  }

  SessionService.startSession = function(user, token) {
		var expiration = moment().add(1, 'h');
		SessionService.user = {
			email: user.email,
			expire: expiration,
			token: token
		}
		localStorage.setItem(SessionService.identifier, JSON.stringify(SessionService.user));
		NotificationCenter.postNotification(SessionService.notifications.START_SESSION);
	}

  SessionService.stopSession = function() {
    SessionService.user = null;
		localStorage.removeItem(SessionService.identifier);
		NotificationCenter.postNotification(SessionService.notifications.STOP_SESSION);
  }

  SessionService.getToken = function() {
    return SessionService.user.token;
  }

  SessionService.increaseExpiration = function() {
		var expiration = moment().add(1, 'h');
		SessionService.user.expire = expiration;
		localStorage.setItem(SessionService.identifier, JSON.stringify(SessionService.user));
	}

	var _checkExpirationTime = function(time) {
		var now = moment();
		var expiration = moment(time);
		if (now.isBefore(expiration)) {
			return true;
		} else {
			return false;
		}
	}

	SessionService.isSessionRunning = function() {
		// Test if user is already logged in
		// Implement something better (e.g. token)
		var userdata = JSON.parse(localStorage.getItem(SessionService.identifier));
		if (userdata !== null) {
			// Check expiration date
      if (SessionService.user === null) {
        SessionService.loadRunningSession();
      }
			return _checkExpirationTime(userdata.expire);
		} else {
			return false;
		}
	}

	SessionService.loadRunningSession = function() {
		var userdata = JSON.parse(localStorage.getItem(SessionService.identifier));
		SessionService.user = userdata;
	}

 	return SessionService;

}

momocloudLogin.factory('SessionService', SessionService);
