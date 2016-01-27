momocloudHub
.directive('addButton', ['UrlService', 'DirectiveTemplatesFolderHub', function(UrlService, DirectiveTemplatesFolderHub) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'url': '@goTo',
		},
		templateUrl: DirectiveTemplatesFolderHub + 'hubAddButton.html',
		link: function(scope, element, attrs) {
			scope.go = function(url) {
				UrlService.go(url);
			}
		}
	};
}])

.directive('backButton', ['UrlService', 'DirectiveTemplatesFolderHub', function(UrlService, DirectiveTemplatesFolderHub) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'url': '@backTo',
		},
		templateUrl: DirectiveTemplatesFolderHub + 'hubBackButton.html',
		link: function(scope, element, attrs) {
			scope.go = function(url) {
				//UrlService.go(url);
				UrlService.go('-1');
			}
		}
	};
}])

.directive('chart', ['DirectiveTemplatesFolderHub', function(DirectiveTemplatesFolderHub) {
	return {
		restrict: 'AE',
		template: '<canvas id="{{canvasName}}" class="chart"></canvas>',
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
						var chartIdentity;		
						if ($attrs.chartType == 'pie') {
							chartIdentity = myChart.Pie(chartData, {
								responsive: true 
							});
						} else if ($attrs.chartType == 'bar') {
							chartIdentity = myChart.Bar(chartData, {
								responsive: true 
							});
						}	
						if ($attrs.legend=='true') {
							var legend = chartIdentity.generateLegend();
							$element.after(legend);
						}	
					}
				});
				
			}
		}
	};
}])

.directive('errorMessage', ['DirectiveTemplatesFolderHub', function(DirectiveTemplatesFolderHub) {
	return {
		restrict: 'AE',
		templateUrl: DirectiveTemplatesFolderHub + 'hubErrorMessage.html',
		replace: true,
		scope: {'message': '@errorText'},
		link: function($scope, $element, $attrs) {
			
		}
	};
}])

.directive('fabActions', ['DirectiveTemplatesFolderHub', function(DirectiveTemplatesFolderHub) {
	return {
		restrict: 'E',
		templateUrl: DirectiveTemplatesFolderHub + 'hubFabActions.html',
		//replace: false,
		transclude: true,
		scope: {
			'wine_id': '@wine',
			'vintage_id': '@vintage',
			'vintage_year': '@year',
			'vintage_rating': '@vintagerating',
		},
		link: function($scope, $element, $attrs) {
			$('.md-button-group-actions').hide();
			var closeIcon = 'bars';
			var openIcon = 'times';
			$scope.icon = closeIcon;
			$scope.toggle = function() {
				console.log('Hallo');
				$('.md-button-group-actions').slideToggle();
				if ($scope.icon == closeIcon) {
					$scope.icon = openIcon;
				} else {
					$scope.icon = closeIcon;					
				}
			}
		}
	};
}])

.directive('inputTag', ['DirectiveTemplatesFolderHub', function(DirectiveTemplatesFolderHub) {
	return {
		restrict: 'E',
		replace: true,
		//scope: true,
		scope: {
			tags: '='
		},
		templateUrl: DirectiveTemplatesFolderHub + 'hubInputTag.html',
		link: function(scope, element, attrs) {									
			scope.addNewTag = function(event, aTag) {
				if (event.keyCode == 13 && aTag != undefined && aTag != '') { // Enter
					scope.tags.push(aTag);
					scope.newTag = '';						
				}
			}
			
			scope.removeTag = function(index) {
				scope.tags.splice(index, 1);
			}
		}
	};
}])

.directive('loader', ['DirectiveTemplatesFolderHub', function(DirectiveTemplatesFolderHub) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			visible: '='
		},
		templateUrl: DirectiveTemplatesFolderHub + 'hubLoader.html',
		link: function(scope, element, attrs) {									
		}
	};
}])

