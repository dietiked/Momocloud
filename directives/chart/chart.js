function chart () {
	
	return {
		restrict: 'AE',
		//templateUrl: '../../directives/chart/chart.html',
		template: '<canvas id="{{canvasName}}"><div id="{{canvasName}}-legend"></div></canvas>',
		replace: true,
		scope: true,
		compile: function(tElement, tAttrs, transclude) {
			
			
			return function($scope, $element, $attrs) {
				$scope.canvasName = $attrs.chartName;
				$attrs.$observe('chartData', function(val) {
					if (val) {
						// Get context with jQuery - using jQuery's .get() method.
						var ctx = $element.get(0).getContext("2d");
						// This will get the first returned node in the jQuery collection.
						var myChart = new Chart(ctx);
						var chartData = JSON.parse($attrs.chartData);			
						if ($attrs.chartType == 'pie') {
							myChart.Pie(chartData, {
								responsive: true 
							});
						}		
					}
				});
				
			}
		}
	};
	
}