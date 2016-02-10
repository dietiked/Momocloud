momocloudWineDb.controller('WinesListController',
['$scope', 'WinesService', 'UrlService', 'NotificationCenter',
function($scope, WinesService, UrlService, NotificationCenter) {
	//console.log('WinesListController');

	$scope.loaded = false;

	// Notification functions
	var getWines = function() {
		$scope.wines = WinesService.wines;
		$scope.loaded = true;
	}
	$scope.go = function(url) {
		UrlService.go(url);
	}

	// Notification handlers
	var getWinesSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_GET_ALL_SUCCESS, getWines);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getWinesSuccess);
	});

	WinesService.getAll();

}]);
