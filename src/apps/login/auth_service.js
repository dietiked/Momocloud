function AuthService($http, $location, NotificationCenter, apiUrlLogin, SessionService) {

	//var serverInterface = 'app/modules/auth/auth.php';
	var serverInterface = apiUrlLogin;
	var AuthService = {}

	AuthService.notifications = {
			AUTH_STATUS_DID_CHANGE: 'loginOrLogout',
			AUTH_ERROR: "authenticationError"
	}

	AuthService.login = function(user) {
		var data = {
			'email': user.email,
			'password': user.password
		}
		//console.log(data.email, data.password);
		$http.post(
			serverInterface + 'login/',
			data
		)
		.success(function(response) {
			//console.log(response);
			if (response.success) {
				//console.log('token', response.token);
				SessionService.startSession(user, response.token)
				$location.path('/index');
			} else {
				NotificationCenter.postNotification(AuthService.notifications.AUTH_ERROR);
			}
		})
		.error(function(error) {
			NotificationCenter.postNotification(AuthService.notifications.AUTH_ERROR);
		});
	}

	AuthService.logout = function() {
		// If you have to perform server logout, do it here
		SessionService.stopSession();
		$location.path('/login');
	}

	AuthService.subscribe = function(user) {
		// Subscription for new users
		var data = {
			'email': user.email,
			'password': user.password
		}
		//console.log(data.email, data.password);
		$http.post(
			serverInterface + 'subscribe/',
			data
		)
		.success(function(response) {
			//console.log('Server success: ', response);
			if (response.success) {
				SessionService.startSession(user, response.token)
				$location.path('/index');
			}
		})
		.error(function(error) {
			//console.log('Server error: ', error);
		});
	}

	return AuthService;
}

momocloudLogin.factory('AuthService', AuthService);
