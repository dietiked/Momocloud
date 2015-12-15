function navmenu ($location) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'title': '@title',
			'backTitle': '@backTitle',
			'backHref': '@backHref',
			'newCallback': '&',
			'newHref': '@newHref',
			'btnType': '@btnType'
		},
		templateUrl: 'directives/navmenu/navmenu.html',
		link: function(scope, element, attrs) {
			scope.backToPrevious = function() {
				/*if (scope.backHref !== undefined) {
					$location.path(scope.backHref);
				} else {*/
					window.history.go(-2);
				//}
			};			
									
			if (scope.btnType == 'none') {
				scope.isHref = false;
				scope.isBtn = false;
			} else { // href defined
				if (scope.newHref !== undefined) {
					scope.isHref = true;
					scope.isBtn = false;
				} else {
					scope.isHref = false;
					scope.isBtn = true;					
				}
			}
			

		}
	};
	
}