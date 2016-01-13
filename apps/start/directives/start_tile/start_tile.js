function startTile () {
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			imageLink: '@img',
			tileTitle: '@title'
		},
		templateUrl: 'apps/start/directives/start_tile/start_tile.html',
		link: function(scope, element, attrs) {
		}
	};
	
}