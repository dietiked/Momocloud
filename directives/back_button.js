function backButton () {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		template: '<a href="#" ng-click="backToPrevious()" class="back-button"><span class="glyphicon glyphicon-arrow-left"></span></a>',
		link: function(scope, element, attrs) {
			scope.backToPrevious = function() {
				window.history.go(-2);
				console.log(window.history);
			}
		}
	};
	
}