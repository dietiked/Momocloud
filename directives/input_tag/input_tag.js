function inputTag () {
	
	return {
		restrict: 'E',
		replace: true,
		//scope: true,
		/*scope: {
			tags: '=tags'
		},*/
		templateUrl: 'directives/input_tag/input_tag.html',
		link: function(scope, element, attrs) {
			console.log('Input', scope);
			scope.addNewTag = function(event, aTag) {
				if (event.keyCode == 13) { // Enter
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