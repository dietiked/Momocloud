angular.module('mc.start', [])

.directive('startTile', function(LibraryBooksService) {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			imageLink: '@img',
			iconClass: '@icon',
			tileTitle: '@title'
		},
		templateUrl: 'apps/start/directives/mc.start.tile.html',
		link: function(scope, element, attrs) {
			var iconSource = scope.iconClass.split(' ')[0];
			if (iconSource == 'glyphicon') {
				scope.glyphicon = true;
			} else if (iconSource == 'fa') {
				scope.glyphicon = false;				
			}
		}
	};	
});
