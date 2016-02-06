momocloudHub.controller('NavController',
['$scope', 'NotificationCenter', 'DependenciesChecker', 'UrlService', 'AuthService', '$mdSidenav',
function($scope, NotificationCenter, DependenciesChecker, UrlService, AuthService, $mdSidenav) {

  $scope.openSidenav = function(navId) {
    $mdSidenav.open(navId);
  }

}]);
