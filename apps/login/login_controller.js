wineDBControllers.controller('LoginController', ['$scope', 'AuthService', 'NotificationCenter', function($scope, AuthService, NotificationCenter) {

	//console.log('loginController');
	$scope.loginPage = true;
	$scope.user = {
		email: 'admin@momoland.ch',
		password: ''
	};
	
	$scope.authenticate = function(user) {
		//console.log('Authenticate', $scope.user.password);	
		AuthService.login(user);
	};

	var loginHandler = function() {
		//console.log('Is logged in?', AuthService.isLoggedIn());			
	};

	var login = NotificationCenter.subscribe(AuthService.notifications.AUTH_STATUS_DID_CHANGE, loginHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(login);
	});
				
}]);