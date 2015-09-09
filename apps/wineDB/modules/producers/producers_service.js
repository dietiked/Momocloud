function ProducersService($http, NotificationCenter) {
	var ProducersService = {};
	var request = 'modules/producers/producers_request.php';
	
	ProducersService.producers = [];
	ProducersService.producer = {};
	ProducersService.winesOfProducer = [];
	
	ProducersService.notifications = {
		PRODUCERS_GET_ALL_SUCCESS: 'producersGetAllSuccess',
		PRODUCERS_GET_ALL_ERROR: 'producersGetAllError',
		PRODUCERS_GET_SUCCESS: 'producersGetSuccess',
		PRODUCERS_GET_ERROR: 'producersGetError',
		PRODUCERS_UPDATE_SUCCESS: 'producersUpdateSuccess',
		PRODUCERS_UPDATE_ERROR: 'producersUpdateError',
		PRODUCERS_DELETE_SUCCESS: 'producersDeleteSuccess',
		PRODUCERS_DELETE_ERROR: 'producersDeleteError',
		PRODUCERS_INSERT_SUCCESS: 'producersInsertSuccess',
		PRODUCERS_INSERT_ERROR: 'producersInsertError'
	};
	
	ProducersService.getAll = function() {
		var results = null;
		$http.post(
			request + '?f=get'
		)
		.success(function(data, status, headers, config) {
			console.log('success', data);
			ProducersService.producers = data;
			NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_GET_ALL_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			console.log('error', data);			
			NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_GET_ALL_ERROR);
		});		
	};
	
	ProducersService.getProducer = function(id, wines) {
		wines = wines == undefined ? false : wines;
		console.log('wines', wines);
		$http.post(
			request + '?f=get&id=' + id + '&wines=' + wines
		)
		.success(function(data, status, headers, config) {
			console.log('success', data);
			ProducersService.producer = data[0];
			NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_GET_SUCCESS);
		})
		.error(function(data, status, headers, config) {
			console.log('error', data);			
			NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_GET_ERROR);
		});		
	}
	
	ProducersService.update = function(producer) {
		$http.post(
			request + '?f=update',
			producer
		)
		.success(function(data, status, headers, config) {
			console.log('success while updating', data);
			if (data.success) {
				NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_UPDATE_SUCCESS);			
			} else {
				NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_UPDATE_ERROR);			
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error while updating', data);			
			NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_UPDATE_ERROR);
		});				
	}
	
	ProducersService.insert = function(producer) {
		$http.post(
			request + '?f=insert',
			producer
		)
		.success(function(data, status, headers, config) {
			if (data.success) {
				console.log('success while inserting', data);
				NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_INSERT_SUCCESS);				
			} else {
				console.log('error while inserting', data);			
				NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_INSERT_ERROR);				
			}
		})
		.error(function(data, status, headers, config) {
			console.log('error while inserting', data);			
			NotificationCenter.postNotification(ProducersService.notifications.PRODUCERS_INSERT_ERROR);
		});				
		
	}
	
	return ProducersService;
}

wineDBServices.factory('ProducersService', ProducersService);