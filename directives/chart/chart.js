function chart () {
	
	return {
		restrict: 'AE',
		templateUrl: '../../directives/chart/chart.html',
		replace: false,
		scope: true,
		link: function($scope, $element, $attrs) {
			//console.log('attrs', $attrs);
			//console.log('chart data', $attrs.chartData);
			
			$scope.canvasName = $attrs.canvasName;
			// Get context with jQuery - using jQuery's .get() method.
			var ctx = $element.children().get(0).getContext("2d");
			// This will get the first returned node in the jQuery collection.
			var myChart = new Chart(ctx);
			
			$attrs.$observe('chartData', function(val) {
				//console.log('Val', val);
				//console.log('chart data watch', $attrs.chartData);
				if (val) {
					//console.log('chart data full', $attrs);
					var chartData = JSON.parse($attrs.chartData);			
					if ($attrs.chartType == 'pie') {
						myChart.Pie(chartData);
					}					
				}
			});
			
		}
	};
	
}