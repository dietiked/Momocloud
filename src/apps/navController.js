momocloudHub.controller('NavController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'AuthService', '$mdSidenav',
function($scope, NotificationCenter, DependenciesChecker, UrlService, AuthService, $mdSidenav) {

  $scope.openSidenav = function(navId) {
    $mdSidenav.open(navId);
  }

  var loadNavbar = function(info) {
    $scope.title = info.title;
    $scope.application = info.application;
  }

  // Notification handlers
	var redirectSuccess = NotificationCenter.subscribe(UrlService.notifications.REDIRECT_SUCCESS, loadNavbar);
	$scope.$on('$destroy', function(){
		NotificationCenter.unsubscribe(redirectSuccess);
	});

}]);
