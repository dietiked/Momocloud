var wineDBDirectives = angular.module('wineDBDirectives', []);
var wineDBServices = angular.module('wineDBServices', []);
var wineDBControllers = angular.module('wineDBControllers', []);
var wineDBConstants = angular.module('wineDBConstants', []);

// External services
wineDBServices.factory('NotificationCenter', NotificationCenter);
wineDBServices.factory('DependenciesChecker', DependenciesChecker);
wineDBServices.factory('AuthService', AuthService);
// External directives
wineDBServices.directive('errorMessage', errorMessage);
wineDBServices.directive('wineRating', wineRating);

var wineDB = angular.module('wineDB', ['ngRoute', 'wineDBControllers', 'wineDBServices', 'wineDBDirectives', 'angular.filter', 'ui.bootstrap'], 
	
	function($httpProvider) {
	  // Use x-www-form-urlencoded Content-Type
	  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	
	  /**
	   * The workhorse; converts an object to x-www-form-urlencoded serialization.
	   * @param {Object} obj
	   * @return {String}
	   */ 
	  var param = function(obj) {
	    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
	      
	    for(name in obj) {
	      value = obj[name];
	        
	      if(value instanceof Array) {
	        for(i=0; i<value.length; ++i) {
	          subValue = value[i];
	          fullSubName = name + '[' + i + ']';
	          innerObj = {};
	          innerObj[fullSubName] = subValue;
	          query += param(innerObj) + '&';
	        }
	      }
	      else if(value instanceof Object) {
	        for(subName in value) {
	          subValue = value[subName];
	          fullSubName = name + '[' + subName + ']';
	          innerObj = {};
	          innerObj[fullSubName] = subValue;
	          query += param(innerObj) + '&';
	        }
	      }
	      else if(value !== undefined && value !== null)
	        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	    }
	      
	    return query.length ? query.substr(0, query.length - 1) : query;
	  };
	
	  // Override $http service's default transformRequest
	  $httpProvider.defaults.transformRequest = [function(data) {
	    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
	  }];
});

wineDB.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'modules/login/login_view.html',
			controller: 'LoginController'
		}).
		when('/index', {
			templateUrl: 'modules/index/index_view.html',
			controller: 'IndexController'
		}).
		when('/producers', {
			templateUrl: 'modules/producers/producers_list_view.html',
			controller: 'ProducersListController'
		}).
		when('/producers/new', {
			templateUrl: 'modules/producers/producers_new_view.html',
			controller: 'ProducersNewController'
		}).
		when('/producers/:producerId', {
			templateUrl: 'modules/producers/producers_details_view.html',
			controller: 'ProducersDetailsController'
		}).
		when('/producers/:producerId/edit', {
			templateUrl: 'modules/producers/producers_edit_view.html',
			controller: 'ProducersEditController'
		}).
		when('/wines', {
			templateUrl: 'modules/wines/wines_list_view.html',
			controller: 'WinesListController'
		}).
		when('/wines/new', {
			templateUrl: 'modules/wines/wines_new_view.html',
			controller: 'WinesNewController'
		}).
		when('/wines/:wineId', {
			templateUrl: 'modules/wines/wines_details_view.html',
			controller: 'WinesDetailsController'
		}).
		when('/wines/:wineId/edit', {
			templateUrl: 'modules/wines/wines_edit_view.html',
			controller: 'WinesEditController'
		}).
		when('/wines/:wineId/vintage/new', {
			templateUrl: 'modules/vintages/vintages_new_view.html',
			controller: 'VintagesNewController'
		}).
		when('/wines/:wineId/vintage/:vintageId/edit', {
			templateUrl: 'modules/vintages/vintages_edit_view.html',
			controller: 'VintagesEditController'
		}).
		when('/cellar', {
			templateUrl: 'modules/cellar/cellar_list_view.html',
			controller: 'CellarListController'
		}).
		when('/cellar/:storedWineId/bottles/add', {
			templateUrl: 'modules/cellar/cellar_add_bottles_view.html',
			controller: 'CellarAddBottlesController'
		}).
		otherwise({
			redirectTo: '/index'
		});
		
	//$locationProvider.html5Mode(true);

}]);


wineDB.run(function($rootScope, $location, AuthService) {
	// enumerate routes that don't need authentication
	var routesThatDontRequireAuth = ['/login'];

	// check if current location matches route  
	var routeClean = function (route) {
		return _.find(routesThatDontRequireAuth,
    		function (noAuthRoute) {
				if (noAuthRoute.split('/')[1] === route.split('/')[1]) {
		    		return true;				
				}
	    	}
	    );
	};

	$rootScope.$on('$routeChangeStart', function (event, next, current) {
		// if route requires auth and user is not logged in
		if (!routeClean($location.url()) && !AuthService.isLoggedIn()) {
			// redirect back to login
			$location.path('/login');
		} else {
			AuthService.init();
		}
	});	
});

