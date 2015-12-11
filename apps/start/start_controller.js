momocloudControllers.controller('StartController', 
['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, UrlService, AuthService) {

	console.log('StartController');	
	AuthService.increaseExpiration();

}]);