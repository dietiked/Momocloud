function inputTag () {
	
	return {
		restrict: 'E',
		replace: true,
		//scope: true,
		scope: {
			tags: '='
		},
		templateUrl: 'directives/input_tag/input_tag.html',
		link: function(scope, element, attrs) {									
			scope.addNewTag = function(event, aTag) {
				if (event.keyCode == 13 && aTag != undefined && aTag != '') { // Enter
					scope.tags.push(aTag);
					scope.newTag = '';						
				}
			}
			
			scope.removeTag = function(index) {
				scope.tags.splice(index, 1);
			}
		}
	};
	
}