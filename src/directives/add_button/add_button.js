function addButton (UrlService) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'url': '@goTo',
		},
		templateUrl: 'directives/add_button/add_button.html',
		link: function(scope, element, attrs) {
			scope.go = function(url) {
				UrlService.go(url);
			}
		}
	};
	
}