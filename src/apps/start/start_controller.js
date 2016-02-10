momocloudStart.controller('StartController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService',
function($scope, NotificationCenter, DependenciesChecker, UrlService) {

	console.log('StartController');

	NotificationCenter.postNotification(UrlService.notifications.REDIRECT_SUCCESS, [{
		title: 'Start',
		application: 'Momocloud'
	}]);

	$scope.go = function(url) {
		UrlService.go(url);
	}

}]);
