function loader () {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {
			visible: '='
		},
		templateUrl: 'directives/loader/loader.html',
		link: function(scope, element, attrs) {									
		}
	};
	
}