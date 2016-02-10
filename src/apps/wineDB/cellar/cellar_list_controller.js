momocloudWineDb.controller('CellarListController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'VintagesService', 'CellarService', 'UrlService',
function($scope, NotificationCenter, DependenciesChecker, VintagesService, CellarService, UrlService) {
	//console.log('WinesDetailsController');

	$scope.loaded = false;
	DependenciesChecker.setDependencies(2);

	$scope.storedWines = [];
	$scope.orderColumn = 'wine_name';
	$scope.selectedWine = null;
	$scope.date = new Date();
	$scope.quantity = 1;

	$scope.recalculateQuantity = function(storedWineId) {
		CellarService.recalculateQuantity(storedWineId);
	}

	$scope.go = function(url) {
		UrlService.go(url);
	}

	$scope.setSelectedWine = function(wine) {
		$scope.selectedWine = wine;
	}

	$scope.drink = function(aWine, aDate) {
		CellarService.drink(aWine.stored_wine_id, aDate);
	}

	$scope.buy = function(aWine, aDate, quantity) {
		CellarService.buy(aWine.stored_wine_id, aDate, quantity);
	}

	// Notification functions
	var getStoredWines = function() {
		$scope.storedWines = CellarService.storedWines;
		$scope.loaded = true;
	}

	var recalculateQuantitySuccessHandler = function() {
		CellarService.getAll();
	}

	var drinkSuccessHandler = function() {
		$('.modal').modal('hide');
	}
	var buySuccessHandler = function() {
		$('.modal').modal('hide');
	}

	var drinkBuyErrorHandler = function() {
		console.log("Drink error");
	}


	// Notification handlers
	var getStoredWinesSuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_GET_ALL_SUCCESS, getStoredWines);
	var recalculateQuantitySuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_RECALCULATE_SUCCESS, recalculateQuantitySuccessHandler);
	var drinkSuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_DRINK_SUCCESS, drinkSuccessHandler);
	var drinkError = NotificationCenter.subscribe(CellarService.notifications.CELLAR_DRINK_ERROR, drinkBuyErrorHandler);
	var buySuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_DRINK_SUCCESS, buySuccessHandler);
	var buyError = NotificationCenter.subscribe(CellarService.notifications.CELLAR_DRINK_ERROR, drinkBuyErrorHandler);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getStoredWinesSuccess);
		NotificationCenter.unsubscribe(recalculateQuantitySuccess);
		NotificationCenter.unsubscribe(drinkSuccess);
		NotificationCenter.unsubscribe(drinkError);
		NotificationCenter.unsubscribe(buySuccess);
		NotificationCenter.unsubscribe(buyError);
	});

	CellarService.getAll()

}]);
