// Custom material design
var momocloudMaterial = angular.module('momocloudMaterial', []);
momocloudMaterial.constant('DirectiveTemplatesFolderMaterial', 'directives/templates/');

// Modules definition
var momocloudHub = angular.module('momocloudHub', []);
momocloudHub.factory('NotificationCenter', NotificationCenter);
momocloudHub.factory('DependenciesChecker', DependenciesChecker);
momocloudHub.factory('UrlService', UrlService);
momocloudHub.factory('UtilityService', UtilityService);
momocloudHub.constant('DirectiveTemplatesFolderHub', 'directives/templates/');

// Login module
var momocloudLogin = angular.module('momocloudLogin', []);
momocloudLogin.constant('apiUrlLogin', 'api/api.php/auth/');
momocloudLogin.constant('DirectiveTemplatesFolderLogin', 'directives/templates/');

// Start module
var momocloudStart = angular.module('momocloudStart', []);
momocloudStart.constant('apiUrlStart', 'directives/templates/');
momocloudStart.constant('DirectiveTemplatesFolderStart', 'directives/templates/');

// WineDb module
var momocloudWineDb = angular.module('momocloudWineDb', []);
momocloudWineDb.constant('apiUrlWineDb', 'api/api.php/winedb/');
momocloudWineDb.constant('DirectiveTemplatesFolderWineDb', 'directives/templates/');

// Ricettatore module
var momocloudRicettatore = angular.module('momocloudRicettatore', []);
momocloudRicettatore.constant('apiUrlRicettatore', 'api/api.php/ricettatore/');
momocloudRicettatore.constant('DirectiveTemplatesFolderRicettatore', 'directives/templates/');

// Library module
var momocloudLibrary = angular.module('momocloudLibrary', []);
momocloudLibrary.constant('apiUrlLibrary', 'api/api.php/library/');
momocloudLibrary.constant('DirectiveTemplatesFolderLibrary', 'directives/templates/');

// Placeholder for template cache, created with grunt for distribution
var momocloudTemplateCache = angular.module('momocloudTemplateCache', []);

// Inject shared services

// Define constants

var momocloud = angular.module('momocloud', ['ngRoute', 'angular.filter',
'momocloudHub', 'momocloudLogin', 'momocloudStart', 'momocloudWineDb', 
'momocloudRicettatore', 'momocloudLibrary', 'momocloudTemplateCache',
'momocloudMaterial', 'ui.bootstrap', ],

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

momocloud.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.
		when('/login', {
			templateUrl: 'apps/login/login_view.html',
			controller: 'LoginController'
		}).
		when('/start', {
			templateUrl: 'apps/start/start_view.html',
			controller: 'StartController'
		}).
		// Wine DB
		when('/winedb', {
			templateUrl: 'apps/winedb/dashboard/dashboard_view.html',
			controller: 'WineDBDashboardController'
		}).
		when('/winedb/producers', {
			templateUrl: 'apps/winedb/producers/producers_list_view.html',
			controller: 'ProducersListController'
		}).
		when('/winedb/producers/new', {
			templateUrl: 'apps/winedb/producers/producers_new_view.html',
			controller: 'ProducersNewController'
		}).
		when('/winedb/producers/:producerId', {
			templateUrl: 'apps/winedb/producers/producers_details_view.html',
			controller: 'ProducersDetailsController'
		}).
		when('/winedb/producers/:producerId/edit', {
			templateUrl: 'apps/winedb/producers/producers_edit_view.html',
			controller: 'ProducersEditController'
		}).
		when('/winedb/wines', {
			templateUrl: 'apps/winedb/wines/wines_list_view.html',
			controller: 'WinesListController'
		}).
		when('/winedb/wines/new', {
			templateUrl: 'apps/winedb/wines/wines_new_view.html',
			controller: 'WinesNewController'
		}).
		when('/winedb/wines/:wineId', {
			templateUrl: 'apps/winedb/wines/wines_details_view.html',
			controller: 'WinesDetailsController'
		}).
		when('/winedb/wines/:wineId/edit', {
			templateUrl: 'apps/winedb/wines/wines_edit_view.html',
			controller: 'WinesEditController'
		}).
		when('/winedb/wines/:wineId/vintage/new', {
			templateUrl: 'apps/winedb/vintages/vintages_new_view.html',
			controller: 'VintagesNewController'
		}).
		when('/winedb/wines/:wineId/vintage/:vintageId/edit', {
			templateUrl: 'apps/winedb/vintages/vintages_edit_view.html',
			controller: 'VintagesEditController'
		}).
		when('/winedb/cellar', {
			templateUrl: 'apps/winedb/cellar/cellar_list_view.html',
			controller: 'CellarListController'
		}).
		when('/winedb/cellar/:storedWineId/bottles/add', {
			templateUrl: 'apps/winedb/cellar/cellar_add_bottles_view.html',
			controller: 'CellarAddBottlesController'
		}).
		// Ricettatore
		when('/recipies', {
			templateUrl: 'apps/ricettatore/dashboard/dashboard_view.html',
			controller: 'RecipeDashboardController'
		}).
		when('/recipies/menus', {
			templateUrl: 'apps/ricettatore/menus/menus_list_view.html',
			controller: 'RecipeMenusListController'
		}).
		when('/recipies/menus/:menuId', {
			templateUrl: 'apps/ricettatore/menus/menus_details_view.html',
			controller: 'RecipeMenusDetailsController'
		}).
		when('/recipies/categories', {
			templateUrl: 'apps/ricettatore/categories/categories_list_view.html',
			controller: 'RecipeCategoriesListController'
		}).
		when('/recipies/categories/new', {
			templateUrl: 'apps/ricettatore/categories/categories_new_view.html',
			controller: 'RecipeCategoriesNewController'
		}).
		when('/recipies/books', {
			templateUrl: 'apps/ricettatore/books/books_list_view.html',
			controller: 'RecipeBooksListController'
		}).
		when('/recipies/books/:id', {
			templateUrl: 'apps/ricettatore/books/books_details_view.html',
			controller: 'RecipeBooksDetailsController'
		}).
		when('/recipies/recipies', {
			templateUrl: 'apps/ricettatore/recipies/recipies_list_view.html',
			controller: 'RecipiesListController'
		}).
		when('/recipies/recipies/new', {
			templateUrl: 'apps/ricettatore/recipies/recipies_new_view.html',
			controller: 'RecipiesNewController'
		}).
		when('/recipies/recipies/:recipeId/edit', {
			templateUrl: 'apps/ricettatore/recipies/recipies_edit_view.html',
			controller: 'RecipiesEditController'
		}).
		// Ricettatore
		when('/library/search', {
			templateUrl: 'apps/library/books/search_book_view.html',
			controller: 'LibraryBookSearchController'
		}).
		when('/library/books', {
			templateUrl: 'apps/library/books/books_list_view.html',
			controller: 'LibraryBooksListController'
		}).
		when('/library/authors', {
			templateUrl: 'apps/library/authors/authors_list_view.html',
			controller: 'LibraryAuthorsListController'
		}).
		when('/library/authors/:authorDescr', {
			templateUrl: 'apps/library/authors/authors_details_view.html',
			controller: 'LibraryAuthorsDetailsController'
		}).
		otherwise({
			redirectTo: '/start'
		});

	//$locationProvider.html5Mode(true);

}]);


momocloud.run(function($rootScope, $location, AuthService) {
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
