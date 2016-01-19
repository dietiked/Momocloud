function fabActions () {
	
	return {
		restrict: 'E',
		templateUrl: 'directives/fab_actions/fab_actions.html',
		//replace: false,
		transclude: true,
		scope: {
			'wine_id': '@wine',
			'vintage_id': '@vintage',
			'vintage_year': '@year',
			'vintage_rating': '@vintagerating',
		},
		link: function($scope, $element, $attrs) {
			$('.md-button-group-actions').hide();
			var closeIcon = 'bars';
			var openIcon = 'times';
			$scope.icon = closeIcon;
			$scope.toggle = function() {
				console.log('Hallo');
				$('.md-button-group-actions').slideToggle();
				if ($scope.icon == closeIcon) {
					$scope.icon = openIcon;
				} else {
					$scope.icon = closeIcon;					
				}
			}
		}
	};
	
}