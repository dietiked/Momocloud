function AuthService($http, $location, NotificationCenter, apiUrlLogin) {

	//var serverInterface = 'app/modules/auth/auth.php';
	var serverInterface = apiUrlLogin;
	var AuthService = {};
	AuthService.user;
	AuthService.identifier = 'Momocloud';

	AuthService.notifications = {
			AUTH_STATUS_DID_CHANGE: 'loginOrLogout',
			AUTH_ERROR: "authenticationError"
	}

	function activateUser(user, token) {
		var expiration = moment().add(1, 'h');
		AuthService.user = {
			email: user.email,
			expire: expiration,
			token: token
		};
		localStorage.setItem(AuthService.identifier, JSON.stringify(AuthService.user));
		NotificationCenter.postNotification(AuthService.notifications.AUTH_STATUS_DID_CHANGE);
	}

	AuthService.getUser = function() {
		//console.log(AuthService.user);
		return AuthService.user;
	};

	AuthService.login = function(user) {
		var data = {
			'email': user.email,
			'password': user.password
		};
		//console.log(data.email, data.password);
		$http.post(
			serverInterface + 'login/',
			data
		)
		.success(function(response) {
			//console.log(response);
			if (response.success) {
				//console.log('token', response.token);
				activateUser(user, response.token)
				$location.path('/index');
			} else {
				NotificationCenter.postNotification(AuthService.notifications.AUTH_ERROR);
			}
		})
		.error(function(error) {
			NotificationCenter.postNotification(AuthService.notifications.AUTH_ERROR);
		});
	};

	AuthService.logout = function() {
		AuthService.user = null;
		localStorage.removeItem(AuthService.identifier);
		NotificationCenter.postNotification(AuthService.notifications.AUTH_STATUS_DID_CHANGE);
		$location.path('/login');
	};

	AuthService.subscribe = function(user) {
		// Subscription for new users
		var data = {
			'email': user.email,
			'password': user.password
		};
		//console.log(data.email, data.password);
		$http.post(
			serverInterface + 'subscribe/',
			data
		)
		.success(function(response) {
			//console.log('Server success: ', response);
			if (response.success) {
				activateUser(user)
				$location.path('/index');
			}
		})
		.error(function(error) {
			//console.log('Server error: ', error);
		});
	};

	AuthService.increaseExpiration = function() {
		var expiration = moment().add(1, 'h');
		AuthService.user.expire = expiration;
		localStorage.setItem(AuthService.identifier, JSON.stringify(AuthService.user));
	};

	var _checkExpirationTime = function(time) {
		var now = moment();
		var expiration = moment(time);
		if (now.isBefore(expiration)) {
			return true;
		} else {
			return false;
		}
	};

	AuthService.isLoggedIn = function() {
		// Test if user is already logged in
		// Implement something better (e.g. token)
		var userdata = JSON.parse(localStorage.getItem(AuthService.identifier));
		if (userdata !== null) {
			// Check expiration date
			return _checkExpirationTime(userdata.expire);
		} else {
			return false;
		}
	};

	AuthService.init = function() {
		if (AuthService.isLoggedIn()) {
			var userdata = JSON.parse(localStorage.getItem(AuthService.identifier));
			AuthService.user = userdata;
			console.log(AuthService.user);
		}
	}

	return AuthService;
}

momocloudLogin.factory('AuthService', AuthService);
