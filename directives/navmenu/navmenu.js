function navmenu () {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'title': '@title',
			'backTitle': '@backTitle',
			'newCallback': '&',
			'newHref': '@newHref',
			'showBtn': '@showBtn'
		},
		templateUrl: 'directives/navmenu/navmenu.html',
		link: function(scope, element, attrs) {
			scope.backToPrevious = function() {
				window.history.go(-2);
				console.log(window.history);
			};			
						
			console.log(scope.showBtn);
			
			if (scope.showBtn == 'false') {
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