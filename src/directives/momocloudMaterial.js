momocloudMaterial
.directive('mdSidenav', ['UrlService', 'DirectiveTemplatesFolderMaterial', '$mdSidenav',
function(UrlService, DirectiveTemplatesFolderMaterial, $mdSidenav) {
	return {
		restrict: 'E',
		replace: true,
    transclude: true,
		scope: {
      navId: '@'
		},
		templateUrl: DirectiveTemplatesFolderMaterial + 'mdSidenav.html',
		link: function(scope, element, attrs) {
      scope.close = function() {
        $mdSidenav.close(scope.navId);
      }
		}
	};
}]);

momocloudMaterial
.factory('$mdSidenav', [function() {
  var $mdSidenav = {};

  $mdSidenav.close = function(navId) {
    var sidenavWidth = $('.md-sidenav-nav').width();
    $('#'+navId + ' .md-sidenav-nav').animate({
      left: '-'+sidenavWidth
    });
    $('#'+navId + ' .md-sidenav-shadow').fadeOut({
      complete: function() {
        $('#'+navId).hide();
      }
    });
  }

  $mdSidenav.open = function(navId) {
    $('#'+navId).show();
    $('#'+navId + ' .md-sidenav-shadow').fadeIn();
    $('#'+navId + ' .md-sidenav-nav').animate({
      left: '0'
    });
  }

  return $mdSidenav;

}]);
