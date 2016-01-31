function UtilityService() {
	var UtilityService = {};

  UtilityService.tagsToString = function(tags) {
		return tags.join(',');
	};

	UtilityService.stringToTags = function(aString) {
		var tags = aString.split(',');
		return tags;
	};

	UtilityService.parseSQLDate = function(aDate) {
		var t = aDate.split(/[- :]/);
		var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
		return d;
	};
	
	return UtilityService;
}
