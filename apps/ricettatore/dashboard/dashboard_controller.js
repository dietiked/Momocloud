momocloudControllers.controller('RecipyDashboardController', ['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, UrlService, AuthService) {
	console.log('RecipyDashboardController');	
		
	AuthService.increaseExpiration();

}]);