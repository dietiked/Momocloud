function NotificationCenter () {

	var NotificationCenter = {};
	var cache = {};

	NotificationCenter.subscribe = function(topic, callback) {
		if (!cache[topic]) {
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback];
	};

	NotificationCenter.postNotification = function(topic, args) {
		cache[topic] && angular.forEach(cache[topic], function(callback) {
				callback.apply(null, args || []);
			}
		);
	};

	NotificationCenter.unsubscribe = function(handle) {
		var t = handle[0];
		if (cache[t]) {
			for (var i=0; i<cache[t].length; i++) {
				if (cache[t][i] === handle[1]) {
					cache[t].splice(i, 1);
				}
			}
		}
	}

	return NotificationCenter;
}
