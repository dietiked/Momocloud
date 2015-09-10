function AuthService($http, $location, NotificationCenter) {
	
	//var serverInterface = 'app/modules/auth/auth.php';
	var serverInterface = 'modules/login/auth_request.php';
	var AuthService = {};
	AuthService.user;
	AuthService.identifier = 'Momocloud';
	
	AuthService.notifications = {
			AUTH_STATUS_DID_CHANGE: 'loginOrLogout'
	}
		
	function activateUser(user) {
		var expiration = moment().add(1, 'h');		
		console.log('Expiration', expiration);
		AuthService.user = {
			email: user.email,
			expire: expiration
		};
		localStorage.setItem(AuthService.identifier, JSON.stringify(AuthService.user));
		NotificationCenter.postNotification(AuthService.notifications.AUTH_STATUS_DID_CHANGE);
	}
	
	AuthService.getUser = function() {
		console.log(AuthService.user);
		return AuthService.user;
	};
	
	AuthService.login = function(user) {
		var data = {
			'email': user.email,
			'password': user.password
		};
		console.log(data.email, data.password);
		$http.post(
			serverInterface + '?f=login',
			data
		)
		.success(function(response) {
			if (response.isValid) {
				activateUser(user)
				$location.path('/index');
			}
		})
		.error(function(error) {
			console.log('Server error: ', error);			
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
		console.log(data.email, data.password);
		$http.post(
			serverInterface + '?f=subscribe',
			data
		)
		.success(function(response) {
			console.log('Server success: ', response);			
			if (response.isValid) {
				activateUser(user)
				$location.path('/index');
			}
		})
		.error(function(error) {
			console.log('Server error: ', error);			
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
			console.log('OKKKKK');
			return true;			
		} else {
			console.log('BUUUU');
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
		}
	}
		
	return AuthService;
}
