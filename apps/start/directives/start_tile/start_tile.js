function startTile () {
	
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			imageLink: '@img',
			iconClass: '@icon',
			tileTitle: '@title'
		},
		templateUrl: 'apps/start/directives/start_tile/start_tile.html',
		link: function(scope, element, attrs) {
			var iconSource = scope.iconClass.split(' ')[0];
			if (iconSource == 'glyphicon') {
				scope.glyphicon = true;
			} else if (iconSource == 'fa') {
				scope.glyphicon = false;				
			}
		}
	};
	
}