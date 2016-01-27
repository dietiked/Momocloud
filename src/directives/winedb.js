momocloudWineDb
.directive('vintageRatingForm', ['DirectiveTemplatesFolderWineDb', 'GeneralDataService', 
function(DirectiveTemplatesFolderWineDb, GeneralDataService) {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			vintage: '=ngModel',
			id: '@modalId',			
		},
		templateUrl: DirectiveTemplatesFolderWineDb + 'winedbVintageRatingForm.html',
		link: function(scope, element, attrs) {
			
			scope.$watch('vintage', function() {
				console.log(scope.vintage);
			});

			scope.ratings = [1,2,3,4,5,6,7,8,9,10];
			scope.years = [];
			for (var i=2000; i<moment().year(); i++) {
				scope.years.push(i);
			}

		}
	};	
}])

.directive('wineRating', ['DirectiveTemplatesFolderWineDb', function(DirectiveTemplatesFolderWineDb) {
	return {
		restrict: 'E',
		templateUrl: DirectiveTemplatesFolderWineDb + 'winedbWineRating.html',
		replace: false,
		scope: {
			'vintage': '=ngModel'
		},
		link: function($scope, $element, $attrs) {
			
		}
	};
}]);
