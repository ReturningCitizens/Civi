(function(angular, $, _) {

  angular.module('areas').controller('AreaDefinitionPostalCodeCtl', function ($scope, dialogService, crmApi, $q) {
    $scope.ts = CRM.ts('org.civicoop.areas');
    $scope.areaDefinition = angular.copy($scope.model.areaDefinition);
   
    
    $scope.save = function() {
    	var country_label = '';
    	var apiCalls = [];
    	
    	apiCalls.push(crmApi('Country', 'getvalue', {id: $scope.areaDefinition.country_id, 'return': 'name'}, true).
    	then(function (country){
    		country_label = country.result;
    	}));
    	
    	$q.all(apiCalls).then(function (data) {
    		$scope.areaDefinition.settings_label = $scope.areaDefinition.postal_code + ', ' + country_label;
    		$scope.model.areaDefinition = $scope.areaDefinition;
    		dialogService.close('AreaDefinition', $scope.model);	
    	});
    	
    };
		
		$scope.cancel = function() {			
    	dialogService.cancel('AreaDefinition');
    };
    
  });

})(angular, CRM.$, CRM._);
