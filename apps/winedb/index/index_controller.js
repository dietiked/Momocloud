momocloudControllers.controller('IndexController', ['$scope', 'ProducersService', 'WinesService', 'ChartDataService', 'AuthService',
function($scope, ProducersService, WinesService, ChartDataService, AuthService) {
	//console.log('IndexController');

	// Notification functions
	var activeProducers = function() {
		$scope.activeProducers = ProducersService.producers.length;
	};
	// Notification functions
	var getWines = function() {
		$scope.availableWines = WinesService.numberOfWines;
	};

	var getMovementsForChartSuccess = function() {
		var chartData = ChartDataService.movementsForChart;
	};
	
	getTypesForChartSuccess = function() {
		$scope.chartDataType = ChartDataService.typesForChart;		
	};

	getCountriesForChartSuccess = function() {
		$scope.chartDataCountry = ChartDataService.countriesForChart;		
	};

	getBottlesForChartSuccess = function() {
		$scope.chartDataBottles = ChartDataService.bottlesByWineForChart;		
	};
	
	// Notification handlers
	var getProducersSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_ALL_SUCCESS, activeProducers);
	var getWinesSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_COUNT_SUCCESS, getWines);
	var getTypesForChartSuccessHandler = NotificationCenter.subscribe(ChartDataService.notifications.CHART_GET_TYPES_SUCCESS, getTypesForChartSuccess);
	var getBottlesForChartSuccessHandler = NotificationCenter.subscribe(ChartDataService.notifications.CHART_GET_BOTTLES_SUCCESS, getBottlesForChartSuccess);
	var getCountriesForChartSuccessHandler = NotificationCenter.subscribe(ChartDataService.notifications.CHART_GET_COUNTRIES_SUCCESS, getCountriesForChartSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducersSuccess);
		NotificationCenter.unsubscribe(getWinesSuccess);
		NotificationCenter.unsubscribe(getTypesForChartSuccessHandler);
		NotificationCenter.unsubscribe(getCountriesForChartSuccessHandler);
		NotificationCenter.unsubscribe(getBottlesForChartSuccessHandler);
	});

	
	ProducersService.getAll();
	WinesService.countWines();
	AuthService.increaseExpiration();
	
	// -----------
	//ChartDataService.getMovementsForTimeSeries();
	ChartDataService.getTypesInCellar(200, 200, 150);
	
}]);