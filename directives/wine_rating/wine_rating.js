function wineRating () {
	
	return {
		restrict: 'AE',
		templateUrl: '../../directives/wine_rating/wine_rating.html',
		replace: false,
		scope: {
			'wine_id': '@wine',
			'vintage_id': '@vintage',
			'vintage_year': '@year',
			'vintage_rating': '@rating',
		},
		link: function($scope, $element, $attrs) {
			
		}
	};
	
}