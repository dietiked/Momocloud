function wineRating () {
	
	return {
		restrict: 'E',
		templateUrl: '../../directives/wine_rating/wine_rating.html',
		replace: false,
		scope: {
			'wine_id': '@wine',
			'vintage_id': '@vintage',
			'vintage_year': '@year',
			'vintage_rating': '@vintagerating',
		},
		link: function($scope, $element, $attrs) {
			
		}
	};
	
}