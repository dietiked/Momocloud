function backButton () {
	
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		template: '<a href="#" ng-click="backToPrevious()" class="back-button"><i class="fa fa-chevron-left"></i></a>',
		link: function(scope, element, attrs) {
			scope.backToPrevious = function() {
				window.history.go(-2);
				console.log(window.history);
			}
		}
	};
	
}