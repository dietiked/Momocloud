function backButton (UrlService) {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			'url': '@backTo',
		},
		templateUrl: 'directives/back_button/back_button.html',
		link: function(scope, element, attrs) {
			scope.go = function(url) {
				//UrlService.go(url);
				UrlService.go('-1');
			}
		}
	};
	
}