momocloudStart.controller('StartController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'AuthService',
function($scope, NotificationCenter, DependenciesChecker, UrlService, AuthService) {

	console.log('StartController');

	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Start',
		application: 'Momocloud'
	}]);

	AuthService.increaseExpiration();

	$scope.go = function(url) {
		UrlService.go(url);
	}

}]);
