momocloudLogin.controller('LoginController', ['$scope', 'AuthService', 'NotificationCenter', function($scope, AuthService, NotificationCenter) {

	//console.log('loginController');
	$scope.loginPage = true;
	$scope.user = {
		email: 'admin@momoland.ch',
		password: ''
	};
	$scope.showError = false;
	
	$scope.authenticate = function(user) {
		//console.log('Authenticate', $scope.user.password);	
		AuthService.login(user);
	};

	var loginHandler = function() {
		//console.log('Is logged in?', AuthService.isLoggedIn());			
	};
	
	var showErrorMessage = function() {
		$scope.showError = true;
		setTimeout(function() {
			$scope.showError = false;
			$scope.$apply();
		}, 2000);
	}

	var login = NotificationCenter.subscribe(AuthService.notifications.AUTH_STATUS_DID_CHANGE, loginHandler);
	var loginError = NotificationCenter.subscribe(AuthService.notifications.AUTH_ERROR, showErrorMessage);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(login);
	});
				
}]);