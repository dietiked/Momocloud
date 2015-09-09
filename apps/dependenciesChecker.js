function DependenciesChecker () {
	
	var DependenciesChecker = {};
	DependenciesChecker.serviceReady = false;

	var dependencies = 0;
	var loadedDependencies = 0;
	
	DependenciesChecker.setDependencies = function(numberOfDependencies) {
		dependencies = numberOfDependencies;
	};
	
	DependenciesChecker.loaded = function() {
		loadedDependencies += 1;
		if (loadedDependencies == dependencies) {
			DependenciesChecker.serviceReady = true;
		}
	};

	return DependenciesChecker;
}