(function(angular, $, _) {

  angular.module('areas').config(function($routeProvider) {
      $routeProvider.when('/areas', {
        controller: 'AreasListCtrl',
        templateUrl: '~/areas/AreasListCtrl.html',

        // If you need to look up data when opening the page, list it out
        // under "resolve".
        resolve: {
          areas: function($route, crmApi) {
            return crmApi('Area', 'get', {options: {limit: 0}});
          }
        }
      });
    }
  );
  
  angular.module('areas').controller('AreasListCtrl', function($scope, crmApi, areas) {
    var ts = $scope.ts = CRM.ts('org.civicoop.areas');

    $scope.areas = areas.values;
    $scope.deleteArea = function (area) {
      crmApi('Area', 'delete', {id: area.id}, {
        error: function (data) {
          CRM.alert(data.error_message, ts('Error'), 'error');
        }
      })
      .then(function (data) {
        delete $scope.areas[area.id];
      });
    };
  });

})(angular, CRM.$, CRM._);