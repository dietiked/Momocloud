function recipiesRecipeCard () {
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			advanced: '@advanced', // default = false
			recipe: '=ngModel'
		},
		templateUrl: 'apps/ricettatore/directives/recipies_recipe_card/recipies_recipe_card.html',
		link: function(scope, element, attrs) {
			if (scope.advanced == undefined) {
				scope.isAdvanced = false;
			} else if (scope.advanced == 'false') {
				scope.isAdvanced = false;				
			} else if (scope.advanced == 'true') {
				scope.isAdvanced = true;
			}
		}
	};
	
}