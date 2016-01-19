function errorMessage () {
	
	return {
		restrict: 'AE',
		templateUrl: 'directives/error_message/error_message.html',
		replace: true,
		scope: {'message': '@errorText'},
		link: function($scope, $element, $attrs) {
			
		}
	};
	
}