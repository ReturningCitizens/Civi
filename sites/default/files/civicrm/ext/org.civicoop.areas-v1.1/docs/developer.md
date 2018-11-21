# Developer documenation

## How to create your own area definition type

In this tutorial we add an area deinition type for County. So that we can define areas based on the county.

Our extension is called *examplearea*.

### add the fields to the area definition table and dao

In the code below we will add the county_id to the table civicrm_area_definition. 

```php

	function examplearea_civicrm_install() {
  	CRM_Core_DAO::executeQuery("ALTER TABLE civicrm_area_definition ADD column county_id INTEGER UNSIGNED NULL");
	}
	
	function examplearea_civicrm_uninstall() {
  	CRM_Core_DAO::executeQuery("ALTER TABLE civicrm_area_definition DROP column county_id");
	}
	
	function examplearea_civicrm_area_definition_fields(&$fields) {
		$fields['county_id'] = array(
			'name' => 'county_id',
    	'title' => E::ts('County ID'),
    	'type' => CRM_Utils_Type::T_INT,
    	'required' => false
		);
	}

```

### create a definition class

The definition class holds the logic for filter to which area a contact belongs. The logic is done in two parts, 
first the relavant _area definitions_ are retrieved from the database, then an additional check is done whether the address
first the _area definition_.

Create a directory _Civi\Areas\DefinitionType and in that directory create a file **County.php**:

```php

<?php
/**
 * @author Jaap Jansma (CiviCooP) <jaap.jansma@civicoop.org>
 * @license http://www.gnu.org/licenses/agpl-3.0.html
 */

namespace Civi\Areas\DefinitionType;

use Civi\Areas\DefinitionType\AbstractDefinitionType;

use CRM_Areas_ExtensionUtil as E;

class County extends AbstractDefinitionType {
	
	/**
	 * Returns the where part of the query to fetch definition types from the civicrm_area_definition table.
	 * 
	 * For example if you want the fetch all definition for the city London your query will return
	 *   "LOWER(`city`) = 'london'"
	 * The constructed query will then look like:  
	 *   SELECT * FROM civicrm_area_definition WHERE ((LOWER(`city`) = 'london') AND `type` = 'city')
	 * 
	 * If there is no condition for the address data you should return false.
	 * 
	 * @param array $address
	 *    Address data
	 * @return string|false
	 *   The where part of the query or false when you cannot provide a where clause.
	 */
	public function getWhereClause($address) {
		if (isset($address['county_id']) && !empty($address['county_id'])) {
			$county_id = \CRM_Utils_Type::escape($address['county_id'], 'Integer');
			return "`county_id` = '$county_id'"; 
		}
		return false;
	}
	
	/**
	 * Returns whether the address is valid with the given definition data
	 * 
	 * @param array $address
	 *   Address data.
	 * @param array $definitionData
	 *   The data from the civicrm_area_definition table.
	 * @return bool
	 */
	public function isTypeValidForAddress($address, $definitionData) {
		if (!isset($definitionData['county_id']) || empty($definitionData['county_id'])) {
			return false;
		}
		if (!isset($address['county_id']) || empty($address['county_id'])) {
			return false;
		} 
		if ($address['county_id'] == $definitionData['county_id']) {
			return true;
		}
		return false;
	}
	
	/**
	 * Returns the title.
	 * 
	 * @return string
	 */
	public function getTitle() {
		return E::ts('County');
	}
	
	/**
	 * Returns a userfriendly representation of the definition settings.
	 * 
	 * Example County = Netherlands
	 * 
	 * @return string
	 */
	public function getUserfriendlyConfiguration($definitionData) {
		if (!isset($definitionData['county_id'])) {
			return '';
		}
		$county = \CRM_Core_PseudoConstant::county($definitionData['county_id']);
		return E::ts('%1', array(1=>$county));
	}
	
	/**
	 * Returns the name of the angular template for editing/adding a new definition to an area.
	 * 
	 * @return string
	 */
	public function getAngularTemplateUrl() {
		return '~/examplearea/CountyCtl.html';
	}
	
}


```

### Create an angular template and controller

In your extension directory create your angular module with civix

```bash

   cd org.civicoop.examplearea
   civix generate:angular-module

```

Add the angular view _ang/exmaplearea/CountyCtl.html_:

```html

	<div ng-controller="AreaDefinitionCountyCtl">
		<div class="crm-group crm-block crm-form-block" ng-form="AreaDefinitionCountyForm" crm-ui-id-scope>
			<div crm-ui-field="{name: 'AreaDefinitionCountyForm.county', title: ts('County'), required: true}">
				<input crm-entityref="{entity: 'County', select: {allowClear:true}}" ng-required="true" ng-model="areaDefinition.county_id" />
		  </div>
		</div>
		
		<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
			<div class="ui-dialog-buttonset">
				<button crm-icon="fa-check" ng-click="save()" ng-disabled="AreaDefinitionCountyForm.$invalid">{{ts('Save and Close')}}</button>
				<button crm-icon="fa-times" ng-click="cancel()">{{ts('Cancel')}}</button>
			</div>
		</div>
	</div>
	
```

Add the angular controller for this view _ang/examplearea/CountyCtrl.js_:

```javascript

	(function(angular, $, _) {
	
	  angular.module('areas').controller('AreaDefinitionCountyCtl', function ($scope, dialogService, crmApi) {
	    $scope.ts = CRM.ts(null);
	    $scope.areaDefinition = angular.copy($scope.model.areaDefinition);
	   
	    
	    $scope.save = function() {
	    	crmApi('County', 'getvalue', {id: $scope.areaDefinition.county_id, 'return': 'name'}, true).
	    	then(function (county){
	    		$scope.areaDefinition.settings_label = ts('%1', {1: county.result});
	    		$scope.model.areaDefinition = $scope.areaDefinition;
	    		dialogService.close('AreaDefinition', $scope.model);
	    	});
	    };
			
			$scope.cancel = function() {			
	    	dialogService.cancel('AreaDefinition');
	    };
	    
	  });
	
	})(angular, CRM.$, CRM._);


```

Add your module to the manage areas page:

```php

function examplearea_civicrm_areas_angularModules(&$modules) {
	$modules[] = 'examplearea';
}

```

### add the definition class to the civicrm container

Register our new area definition type in _hook_civicrm_container_:

```php

	/**
	 * Implements hook_civicrm_container()
	 *
	 * @link https://docs.civicrm.org/dev/en/latest/hooks/hook_civicrm_container/
	 */
	function examplearea_civicrm_container(\Symfony\Component\DependencyInjection\ContainerBuilder $container) {
		$container->getDefinition('areas_definition_factory')
		->addMethodCall('addDefinitionType', array(new \Symfony\Component\DependencyInjection\Definition('Civi\Areas\DefinitionType\County')));
	}

```

### Make sure your extension has the Civi namespace enabled

Check whether your info.xml has the following class loader:

```xml
	<extension>
	....
		<classloader>
	    <psr4 prefix="Civi\" path="Civi" />
		</classloader>
	...
	</extension>
```

## hooks

### hook_civicrm_areas_angularModules

This hook is called to determine which angular modules should be included on the
manage areas screen.

**Paramaters**

`&$modules`: The array with the name of the angular modules

Example:

```php

	function examplearea_civicrm_areas_angularModules(&$modules) {
		$modules[] = 'testarea';
	}

```

### hook_civicrm_area_definition_fields

This hook is called to define the fields for the DAO class for the area definition.
If you have custom area definition types you can define this hook to add the neccessary fields to the dao object.
You have also add them to the table in the database.

**Paramaters**

`&$fields`: The array with the fields for the DAO object.

Example:

```php

	/**
	 * Implements hook_civicrm_area_definition_fields()
	 * 
	 * Add the fields for the AreaDefinitionTypes
	 */
	function areas_civicrm_area_definition_fields(&$fields) {
		$fields['country_id'] = array(
			'name' => 'country_id',
	    'title' => E::ts('Country ID'),
	    'type' => CRM_Utils_Type::T_INT,
	    'required' => false
		);
	}

```