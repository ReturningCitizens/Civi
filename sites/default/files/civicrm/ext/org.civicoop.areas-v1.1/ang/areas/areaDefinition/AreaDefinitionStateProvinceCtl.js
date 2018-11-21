(function(angular, $, _) {

  angular.module('areas').controller('AreaDefinitionStateProvinceCtl', function ($scope, dialogService, crmApi, $q) {
    $scope.ts = CRM.ts('org.civicoop.areas');
    $scope.areaDefinition = angular.copy($scope.model.areaDefinition);
   
    
    $scope.save = function() {
    	var country_label = '';
    	var state_province_label = '';
    	var apiCalls = [];
    	
    	apiCalls.push(crmApi('Country', 'getvalue', {id: $scope.areaDefinition.country_id, 'return': 'name'}, true).
    	then(function (country){
    		country_label = country.result;
    	}));
    	
    	apiCalls.push(crmApi('StateProvince', 'getvalue', {id: $scope.areaDefinition.state_province_id, 'return': 'name'}, true).
    	then(function (state_province_id){
    		state_province_label = state_province_id.result;
    	}));
    	
    	$q.all(apiCalls).then(function (data) {
    		$scope.areaDefinition.settings_label = state_province_label + ', ' + country_label;
    		$scope.model.areaDefinition = $scope.areaDefinition;
    		dialogService.close('AreaDefinition', $scope.model);	
    	});
    	
    };
		
		$scope.cancel = function() {			
    	dialogService.cancel('AreaDefinition');
    };
    
  });

})(angular, CRM.$, CRM._);
