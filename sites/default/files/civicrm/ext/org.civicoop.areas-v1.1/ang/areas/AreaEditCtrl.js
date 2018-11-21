(function(angular, $, _) {

  angular.module('areas').config(function($routeProvider) {
      $routeProvider.when('/areas/new', {
        templateUrl: '~/areas/AreaEditCtrl.html',
        controller: 'AreaEditCtrl',
        resolve: {
        	apiCalls: function($route, crmApi) {
        		reqs = {};
        		reqs.area = {
          		title: ''
        		};
        		reqs.areaDefinitions = {
        			values: []
        		};
          	return reqs;
          }
        }
      });
      $routeProvider.when('/areas/:id', {
        templateUrl: '~/areas/AreaEditCtrl.html',
        controller: 'AreaEditCtrl',
        resolve: {
        	apiCalls: function($route, crmApi) {
        		var reqs = {};
            if ($route.current.params.id !== 'new') {
              reqs.area = ['Area', 'getsingle', {
                id: $route.current.params.id
              }];
              reqs.areaDefinitions = ['AreaDefinition', 'get', {
              	area_id: $route.current.params.id,
              	sequential: 1,
              }];
            }
            return crmApi(reqs);
         	}
        }
      });
    }
  );
  
  angular.module('areas').controller('AreaEditCtrl', function($scope, crmApi, apiCalls, $location, dialogService, $q) {
  	var ts = $scope.ts = CRM.ts('org.civicoop.areas');

    $scope.area = apiCalls.area;
    $scope.areaDefinitions = apiCalls.areaDefinitions.values;
    $scope.deletedAreaDefinitions = [];
    $scope.areaDefinitionTypeTemplates = CRM.areas.areaDefinitionTypeTemplates;
    $scope.areaDefinitionTypes = CRM.areas.areaDefinitionTypes;
    
    $scope.save = function(goBack) {    	
      var result = crmApi('Area', 'create', $scope.area, true);
      result.then(function(data) {
        $scope.area.id = data.id;
        
        var savedAreaDefinitions = [];
        angular.forEach($scope.deletedAreaDefinitions, function(deletedAreaDefinition, key) {
	      	if (deletedAreaDefinition.id) {
	      		savedAreaDefinitions.push(crmApi('AreaDefinition', 'delete', {'id': deletedAreaDefinition.id}, true));
	      	}
      	});
      	angular.forEach($scope.areaDefinitions, function(areaDefinition, key) {
      		areaDefinition.area_id = $scope.area.id;
      		savedAreaDefinitions.push(crmApi('AreaDefinition', 'create', areaDefinition, true).then(function (data) {
      			if (!areaDefinition.id) {
      				areaDefinition.id = data.id;
      			}
      		}));
      	});
      	
        $q.all(savedAreaDefinitions).then(function (data) {
	        if (goBack) {
	        	$scope.goback();
	        }
        });
      });
    };
    
    $scope.removeAreaDefinition = function(areaDefinition) {
    	var index = $scope.areaDefinitions.indexOf(areaDefinition);
    	if (index >= 0) {
    		$scope.areaDefinitions.splice(index, 1);
    		$scope.deletedAreaDefinitions.push(areaDefinition);
    	}
    	$scope.editAreaForm.$setDirty();
    };
    
    $scope.addAreaDefinition = function(areaDefinitionType) {
    	var areaDefinition = {
    		'id': null,
    		'type': angular.copy(areaDefinitionType),
    		'type_label': angular.copy($scope.areaDefinitionTypes[areaDefinitionType])
    	};
    	$scope.editAreaDefinition(areaDefinition);
    };
    
    $scope.editAreaDefinition = function(areaDefinition) {
    	var options = CRM.utils.adjustDialogDefaults({
        autoOpen: false,
        width: '40%',
        height: 'auto',
        title: ts('Edit area definition')
      });
      var index = $scope.areaDefinitions.indexOf(areaDefinition);
      var template = $scope.areaDefinitionTypeTemplates[areaDefinition.type];
      var model = {
      	areaDefinition: areaDefinition,
      };
      dialogService.open('AreaDefinition', template, model, options)
      .then(function(data) {
      	$scope.editAreaForm.$setDirty();
      	if (index >= 0) {
      		$scope.areaDefinitions[index] = data.areaDefinition;
      	} else {
					$scope.areaDefinitions.push(data.areaDefinition);
				}
			});
    };
    
    $scope.goback = function () {
    	$location.path('/areas');
    };
  });

})(angular, CRM.$, CRM._);
