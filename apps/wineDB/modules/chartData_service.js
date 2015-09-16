function ChartDataService($http, NotificationCenter, MovementsService, CellarService) {
	
	ChartDataService.movementsForChart = [];
	ChartDataService.typesForChart = [];
	ChartDataService.countriesForChart = [];
	
	ChartDataService.notifications = {
		CHART_GET_MOVEMENTS_SUCCESS: 'chartGetMovementsForTimeSeriesSuccess',
		CHART_GET_MOVEMENTS_ERROR: 'chartGetMovementsForTimeSeriesError',
		CHART_GET_TYPES_SUCCESS: 'chartGetTypesInCellarSuccess',
		CHART_GET_TYPES_ERROR: 'chartGetTypesInCellarError',
		CHART_GET_COUNTRIES_SUCCESS: 'chartGetCountriesInCellarSuccess',
		CHART_GET_COUNTRIES_ERROR: 'chartGetCountriesInCellarError',
	};
	
	// ! Private APIs
	// ! - Movements time series
	var _extractMovementsForChart = function(array) {
		var data = [];
		var labels = [];
		var today = moment();
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
	var _extractTypesForChart = function(wines) {
		return _aggregateWinesByDescriptor(wines, {
			idColumn: 'winetype_id',
			labelColumn: 'winetype_description', 
			colorColumn: 'winetype_color', 
			highColorColumn: 'winetype_highlight_color', 
		});
	};

	// ! - Wine types in cellar
	var _extractCountriesForChart = function(wines) {
		return _aggregateWinesByDescriptor(wines, {
			idColumn: 'country_code',
			labelColumn: 'country_name_en',
			colorColumn: 'winetype_color', 
			highColorColumn: 'winetype_highlight_color', 
			 
		});
	};
	
	var _aggregateWinesByDescriptor = function(wines, descriptor) {
		var ids = [];
		var values = [];
		var labels = [];
		var colors = [];
		var highColors = [];
		var wine;
		for (var i=0; i<wines.length; i++) {
			wine = wines[i];
			if (ids.indexOf(wine[descriptor.idColumn]) > -1) {
				// Type is already in type list
				var index = ids.indexOf(wine[descriptor.idColumn]);
				values[index] = values[index] + wine.stored_quantity;
			} else {
				ids.push(wine[descriptor.idColumn]);
				labels.push(wine[descriptor.labelColumn]);
				values.push(wine.stored_quantity);
				//colors.push(wine[descriptor.colorColumn]);
				//highColors.push(wine[descriptor.highColorColumn]);
			}
		}
		var data = [];
		var r = 255/ids.length;
		for (var i=0; i<ids.length; i++) {
			//console.log('r*i', r*i);
			var segment = {
				'label': labels[i],
				'value': values[i],
				'color': 'rgba(' + Math.round(r*i) + ',50, 0, 1.0)',
				'highlight': 'rgba(' + Math.round(r*i) + ',50, 0, 0.8)',
			};
			data.push(segment);
		}
		return data;		
	}
	
	var _getTypesInCellarSuccessHandler = function() {
		ChartDataService.typesForChart = _extractTypesForChart(CellarService.storedWines);
		NotificationCenter.postNotification(ChartDataService.notifications.CHART_GET_TYPES_SUCCESS);
		ChartDataService.countriesForChart = _extractCountriesForChart(CellarService.storedWines);
		NotificationCenter.postNotification(ChartDataService.notifications.CHART_GET_COUNTRIES_SUCCESS);
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