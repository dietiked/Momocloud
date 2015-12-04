momocloudControllers.controller('IndexController', ['$scope', 'ProducersService', 'WinesService', 'ChartDataService', 'AuthService',
function($scope, ProducersService, WinesService, MovementsService, AuthService) {
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
		var data = {
		    labels: chartData.labels,
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.0)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: chartData.data
		        }
		    ]
		};
		/*
		// Get context with jQuery - using jQuery's .get() method.
		var ctx = $("#wine-movements").get(0).getContext("2d");
		// This will get the first returned node in the jQuery collection.
		var wineMovementsChart = new Chart(ctx);
		wineMovementsChart.Line(data, {bezierCurve: true});
		*/
	};
	
	getTypesForChartSuccess = function() {
		$scope.chartDataType = ChartDataService.typesForChart;		
	};

	getCountriesForChartSuccess = function() {
		$scope.chartDataCountry = ChartDataService.countriesForChart;		
	};
	
	// Notification handlers
	var getProducersSuccess = NotificationCenter.subscribe(ProducersService.notifications.PRODUCERS_GET_ALL_SUCCESS, activeProducers);
	var getWinesSuccess = NotificationCenter.subscribe(WinesService.notifications.WINES_COUNT_SUCCESS, getWines);
	var getMovementsForChartSuccessHandler = NotificationCenter.subscribe(ChartDataService.notifications.CHART_GET_MOVEMENTS_SUCCESS, getMovementsForChartSuccess);
	var getTypesForChartSuccessHandler = NotificationCenter.subscribe(ChartDataService.notifications.CHART_GET_TYPES_SUCCESS, getTypesForChartSuccess);
	var getCountriesForChartSuccessHandler = NotificationCenter.subscribe(ChartDataService.notifications.CHART_GET_COUNTRIES_SUCCESS, getCountriesForChartSuccess);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(getProducersSuccess);
		NotificationCenter.unsubscribe(getWinesSuccess);
		NotificationCenter.unsubscribe(getMovementsForChartSuccessHandler);
		NotificationCenter.unsubscribe(getTypesForChartSuccessHandler);
		NotificationCenter.unsubscribe(getCountriesForChartSuccessHandler);
	});

	
	ProducersService.getAll();
	WinesService.countWines();
	AuthService.increaseExpiration();
	
	// -----------
	ChartDataService.getMovementsForTimeSeries();
	ChartDataService.getTypesInCellar();
	
}]);