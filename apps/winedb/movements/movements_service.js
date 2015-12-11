function MovementsService($http, NotificationCenter, CellarService) {
	var MovementsService = {};
	var request = 'apps/winedb/movements/movements_request.php';
	
	MovementsService.movements = [];
	MovementsService.wine = {};
	
	MovementsService.notifications = {
		MOVEMENTS_GET_ALL_SUCCESS: 'movementsGetAllSuccess',
		MOVEMENTS_GET_ALL_ERROR: 'movementsGetAllError',
		MOVEMENTS_INSERT_SUCCESS: 'movementsInsertSuccess',
		MOVEMENTS_INSERT_ERROR: 'movementsInsertError'
	};
		
	MovementsService.getAll = function() {
		$http.post(
			request + '?f=get'
		)
		.success(function(data, status, headers, config) {
			//console.log('success while getting movements', data);
			MovementsService.movements = data;
			NotificationCenter.postNotification(MovementsService.notifications.MOVEMENTS_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			//console.log('error', data);			
			NotificationCenter.postNotification(MovementsService.notifications.MOVEMENTS_GET_ALL_ERROR);
		});		
		
	}

	MovementsService.insert = function(movement, storedWineId) {
		var added = function() {
			NotificationCenter.postNotification(MovementsService.notifications.MOVEMENTS_INSERT_SUCCESS);				
		};
		var notAdded = function() {
			NotificationCenter.postNotification(MovementsService.notifications.MOVEMENTS_INSERT_ERROR);							
		};
		
		var addedToCellarSuccess = NotificationCenter.subscribe(CellarService.notifications.CELLAR_ADDED_SUCCESS, added);
		var addedToCellarError= NotificationCenter.subscribe(CellarService.notifications.CELLAR_ADDED_SUCCESS, notAdded);
		
		movement.stored_wine_id = storedWineId;
		movement.movement_date = moment(movement.movement_date, 'D.M.YYYY').format('YYYY-MM-DD');

		$http.post(
			request + '?f=insert',
			movement
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				//console.log('success while inserting movement', data);
				movement.id = data.id;
				CellarService.updateQuantity(movement);
			} else {
				//console.log('error while inserting movement (201)', data);			
				NotificationCenter.postNotification(MovementsService.notifications.MOVEMENTS_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			//console.log('error while inserting movement (202)', data);			
			NotificationCenter.postNotification(MovementsService.notifications.MOVEMENTS_INSERT_ERROR);
		});				
		
	}
	
	return MovementsService;
}

momocloudServices.factory('MovementsService', MovementsService);