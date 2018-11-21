(function(angular, $, _) {

  angular.module('areas').controller('AreaDefinitionCountryCtl', function AreaDefinitionCountryCtl($scope, dialogService, crmApi) {
    $scope.ts = CRM.ts('org.civicoop.areas');
    $scope.areaDefinition = angular.copy($scope.model.areaDefinition);
   
    
    $scope.save = function() {
    	crmApi('Country', 'getvalue', {id: $scope.areaDefinition.country_id, 'return': 'name'}, true).
    	then(function (country){
    		$scope.areaDefinition.settings_label = ts('Country = %1', {1: country.result});
    		$scope.model.areaDefinition = $scope.areaDefinition;
    		dialogService.close('AreaDefinition', $scope.model);
    	});
    };
		
		$scope.cancel = function() {			
    	dialogService.cancel('AreaDefinition');
    };
    
  });

})(angular, CRM.$, CRM._);
