function ChartDataService($http, NotificationCenter, MovementsService, CellarService) {
	
	ChartDataService.movementsForChart = [];
	ChartDataService.typesForChart = [];
	
	ChartDataService.notifications = {
		CHART_GET_MOVEMENTS_SUCCESS: 'chartGetMovementsForTimeSeriesSuccess',
		CHART_GET_MOVEMENTS_ERROR: 'chartGetMovementsForTimeSeriesError',
		CHART_GET_TYPES_SUCCESS: 'chartGetTypesInCellarSuccess',
		CHART_GET_TYPES_ERROR: 'chartGetTypesInCellarError',
	};
	
	// ! Private APIs
	// ! - Movements time series
	var _extractMovementsForChart = function(array) {
		var data = [];
		var labels = [];
		var today = moment();
		var doys = [];
		var dates = [];
		var quantities = [];
		var date, quantity;
		for (var i=20; i>=0; i--) {
			date = moment(today).subtract(i, 'days').format('YYYY-MM-DD');
			dates.push(date);
			dateMovements = 0;
			for (var j=0; j<array.length; j++) {
				if (array[j].movement_date == date) {
					dateMovements += Number(array[j].movement_quantity);
				}
			}
			quantities.push(dateMovements);
		}
		return {
			'data': quantities,
			'labels': dates
		};
	};
	
	var _getMovementsSuccessHandler = function() {
		ChartDataService.movementsForChart = _extractMovementsForChart(MovementsService.movements);
		NotificationCenter.postNotification(ChartDataService.notifications.CHART_GET_MOVEMENTS_SUCCESS);
	};
	
	var _getMovementsSuccess = NotificationCenter.subscribe(MovementsService.notifications.MOVEMENTS_GET_ALL_SUCCESS, _getMovementsSuccessHandler);

	// ! - Wine types in cellar
	var _extractTypesForChart = function(array) {
		var types = [];
		var typesQuantities = [];
		var typesDescription = [];
		var typesColors = [];
		for (var i=0; i<array.length; i++) {
			var wine = array[i];
			if (types.indexOf(wine.winetype_id) > -1) {
				// Type is already in type list
				var index = types.indexOf(wine.winetype_id);
				typesQuantities[index] = typesQuantities[index] + wine.stored_quantity;
			} else {
				types.push(wine.winetype_id);
				typesDescription.push(wine.winetype_description);
				typesQuantities.push( wine.stored_quantity);
				typesColors.push(wine.winetype_color);
			}
		}
		var data = [];
		for (var i=0; i<types.length; i++) {
			var segment = {
				'value': typesQuantities[i],
				'color': typesColors[i],
				'label': typesDescription[i]
			};
			data.push(segment);
		}
		return data;		
	}
	
	var _getTypesInCellarSuccessHandler = function() {
		ChartDataService.typesForChart = _extractTypesForChart(CellarService.storedWines);
		NotificationCenter.postNotification(ChartDataService.notifications.CHART_GET_TYPES_SUCCESS);
	};
	
	var _getTypesInCellarSuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_GET_ALL_SUCCESS, _getTypesInCellarSuccessHandler);
				
	
	// ! Public APIs
	ChartDataService.getMovementsForTimeSeries = function() {
		MovementsService.getAll();
	};

	ChartDataService.getTypesInCellar = function() {
		CellarService.getAll();
	};

}

wineDBServices.factory('ChartDataService', ChartDataService);