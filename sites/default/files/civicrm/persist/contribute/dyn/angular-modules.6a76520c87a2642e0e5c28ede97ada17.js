(function(angular, CRM) {



  var crmApp = angular.module('crmApp', CRM.angular.modules);
  crmApp.config(['$routeProvider',
    function($routeProvider) {

      if (CRM.crmApp.defaultRoute) {
        $routeProvider.when('/', {
          template: '<div></div>',
          controller: function($location) {
            $location.path(CRM.crmApp.defaultRoute);
          }
        });
      }

      $routeProvider.otherwise({
        template: ts('Unknown path')
      });
    }
  ]);
})(angular, CRM);

(function(angular, $, _) {
  angular.module('crmProfileUtils', []);

  angular.module('crmProfileUtils').factory('crmProfiles', function($q, crmApi){


    function loadNextScript(scripts, callback, fail) {
      var script = scripts.shift();
      var isAbsoluteUrl = /^(http|\/)/.test(script.url);
      script.url = isAbsoluteUrl ? script.url : CRM.config.resourceBase + script.url;

      CRM.$.getScript(script.url)
        .done(function(scriptData, status) {
          if(scripts.length) {
            loadNextScript(scripts, callback, fail);
          } else {
            callback();
          }
        }).fail(function(jqxhr, settings, exception) {
          fail(exception);
        });
    }

    function loadStyleFile(url) {
      CRM.$("#backbone_resources").append('<link type="text/css" rel="stylesheet" href="'+url+'" />');
    }

    function loadBackbone() {
      var deferred = $q.defer();
      var scripts = [
        {url: 'packages/jquery/plugins/jstree/jquery.jstree.js', weight: 0},
        {url: 'packages/backbone/json2.js', weight: 100},
        {url: 'packages/backbone/backbone.js', weight: 120},
        {url: 'packages/backbone/backbone.marionette.js', weight: 125},
        {url: 'packages/backbone/backbone.collectionsubset.js', weight: 125},
        {url: 'packages/backbone-forms/distribution/backbone-forms.js', weight: 130},
        {url: 'packages/backbone-forms/distribution/adapters/backbone.bootstrap-modal.min.js', weight: 140},
        {url: 'packages/backbone-forms/distribution/editors/list.min.js', weight: 140},
        {url: CRM.vars['org.civicrm.angularprofiles'].backboneInitUrl, weight: 145},
        {url: 'js/crm.backbone.js', weight: 150},
        {url: 'js/model/crm.schema-mapped.js', weight: 200},
        {url: 'js/model/crm.uf.js', weight: 200},
        {url: 'js/model/crm.designer.js', weight: 200},
        {url: 'js/model/crm.profile-selector.js', weight: 200},
        {url: 'js/view/crm.designer.js', weight: 200},
        {url: 'js/view/crm.profile-selector.js', weight: 200},
        {url: 'js/jquery/jquery.crmProfileSelector.js', weight: 250},
        {url: 'js/crm.designerapp.js', weight: 250}
      ];

      scripts.sort(function(a, b){
        return a.weight-b.weight;
      });

      CRM.origJQuery = window.jQuery;
      window.jQuery = CRM.$;

      window._ = CRM._;

      loadStyleFile(CRM.config.resourceBase + 'packages/jquery/plugins/jstree/themes/default/style.css');
      loadStyleFile(CRM.config.resourceBase + 'packages/backbone-forms/distribution/templates/default.css');
      loadStyleFile(CRM.config.resourceBase + 'css/crm.designer.css');




      loadNextScript(scripts, function () {
        window.jQuery = CRM.origJQuery;
        delete CRM.origJQuery;
        delete window._;
        deferred.resolve(true);
      }, function(status) {
        deferred.resolve(status);
      });

      return deferred.promise;
    }

    function loadSettings() {
      var deferred = $q.defer();

      crmApi('profile', 'getangularsettings').then(function(result) {
        if(result.hasOwnProperty('values')) {
          CRM.$.extend(true, CRM, result.values);
        }
        if (!verifyBackbone()) {
          loadBackbone().then(function() {
            deferred.resolve(true);
          });
        } else {
          deferred.resolve(true);
        }
      }, function(status) {
        deferred.reject(status);
      });
      return deferred.promise;
    }

    function loadTemplate() {
      var deferred = $q.defer();

      CRM.$("body").append("<div id='backbone_templates'></div>");
      CRM.$("#backbone_templates").load(CRM.url("civicrm/angularprofiles/template", {snippet: 5}), function(response) {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    function verifyBackbone() {
      return !!CRM.Backbone;
    }
    function verifyTemplate() {
      return (angular.element("#designer_template").length > 0);
    }
    function verifySettings() {
      return (!!CRM.PseudoConstant && !!CRM.initialProfileList && !!CRM.contactSubTypes && !!CRM.profilePreviewKey);
    }

    return {
      verify: function() {
        return (verifyBackbone() && verifyTemplate() && verifySettings());
      },
      load: function() {
        var deferred = $q.defer();
        var promises = [];

        if (CRM.$("#backbone_resources").length < 1) {
          CRM.$("body").append("<div id='backbone_resources'></div>");
        }




        if(!verifySettings()) {
          promises.push(loadSettings());
        } else if(!verifyBackbone()) {
          promises.push(loadBackbone());
        }

        if(!verifyTemplate()) {
          promises.push(loadTemplate());
        }

        $q.all(promises).then(
          function () {
            deferred.resolve(true);
          },
          function () {
            console.log("Failed to load all backbone resources");
            deferred.reject(ts("Failed to load all backbone resources"));
          }
        );

        return deferred.promise;
      }
    };
  })



    .directive('crmProfileSelector', function () {
      return {
        require: '?ngModel',
        scope: {
          crmProfileSelector: '='
        },
        link: function (scope, element, attrs, ngModel) {
          ngModel.$render = function () {
            if (!element.val() && !element.hasClass("rendered")) {
              element.val(ngModel.$modelValue);
              element.crmProfileSelector(scope.crmProfileSelector || {});
            }
          };
        }
      };
    });
})(angular, CRM.$, CRM._);


(function(angular, $, _) {
  angular.module('crmResource', []);

  angular.module('crmResource').factory('crmResource', function($q, $http) {
    var deferreds = {}; // null|object; deferreds[url][idx] = Deferred;
    var templates = null; // null|object; templates[url] = HTML;

    var notify = function notify() {
      var oldDfrds = deferreds;
      deferreds = null;

      angular.forEach(oldDfrds, function(dfrs, url) {
        if (templates[url]) {
          angular.forEach(dfrs, function(dfr) {
            dfr.resolve({
              status: 200,
              headers: function(name) {
                var headers = {'Content-type': 'text/html'};
                return name ? headers[name] : headers;
              },
              data: templates[url]
            });
          });
        }
        else {
          angular.forEach(dfrs, function(dfr) {
            dfr.reject({status: 500}); // FIXME
          });
        }
      });
    };

    var moduleUrl = CRM.angular.bundleUrl;
    $http.get(moduleUrl)
      .success(function httpSuccess(data) {
        templates = [];
        angular.forEach(data, function(module) {
          if (module.partials) {
            angular.extend(templates, module.partials);
          }
          if (module.strings) {
            CRM.addStrings(module.domain, module.strings);
          }
        });
        notify();
      })
      .error(function httpError() {
        templates = [];
        notify();
      });

    return {

      getUrl: function getUrl(url) {
        if (templates !== null) {
          return templates[url];
        }
        else {
          var deferred = $q.defer();
          if (!deferreds[url]) {
            deferreds[url] = [];
          }
          deferreds[url].push(deferred);
          return deferred.promise;
        }
      }
    };
  });

  angular.module('crmResource').config(function($provide) {
    $provide.decorator('$templateCache', function($delegate, $http, $q, crmResource) {
      var origGet = $delegate.get;
      var urlPat = /^~\//;
      $delegate.get = function(url) {
        if (urlPat.test(url)) {
          return crmResource.getUrl(url);
        }
        else {
          return origGet.call(this, url);
        }
      };
      return $delegate;
    });
  });

})(angular, CRM.$, CRM._);

(function (angular, $, _) {

  var uidCount = 0,
    pageTitle = 'CiviCRM',
    documentTitle = 'CiviCRM';

  angular.module('crmUi', CRM.angRequires('crmUi'))


    .directive('crmUiAccordion', function() {
      return {
        scope: {
          crmUiAccordion: '='
        },
        template: '<div ng-class="cssClasses"><div class="crm-accordion-header">{{crmUiAccordion.title}} <a crm-ui-help="help" ng-if="help"></a></div><div class="crm-accordion-body" ng-transclude></div></div>',
        transclude: true,
        link: function (scope, element, attrs) {
          scope.cssClasses = {
            'crm-accordion-wrapper': true,
            collapsed: scope.crmUiAccordion.collapsed
          };
          scope.help = null;
          scope.$watch('crmUiAccordion', function(crmUiAccordion) {
            if (crmUiAccordion && crmUiAccordion.help) {
              scope.help = crmUiAccordion.help.clone({}, {
                title: crmUiAccordion.title
              });
            }
          });
        }
      };
    })





    .service('crmUiAlert', function($compile, $rootScope, $templateRequest, $q) {
      var count = 0;
      return function crmUiAlert(params) {
        var id = 'crmUiAlert_' + (++count);
        var tpl = null;
        if (params.templateUrl) {
          tpl = $templateRequest(params.templateUrl);
        }
        else if (params.template) {
          tpl = params.template;
        }
        if (tpl) {
          params.text = '<div id="' + id + '"></div>'; // temporary stub
        }
        var result = CRM.alert(params.text, params.title, params.type, params.options);
        if (tpl) {
          $q.when(tpl, function(html) {
            var scope = params.scope || $rootScope.$new();
            var linker = $compile(html);
            $('#' + id).append($(linker(scope)));
          });
        }
        return result;
      };
    })



    .directive('crmUiDatepicker', function () {
      return {
        restrict: 'AE',
        require: 'ngModel',
        scope: {
          crmUiDatepicker: '='
        },
        link: function (scope, element, attrs, ngModel) {
          ngModel.$render = function () {
            element.val(ngModel.$viewValue).change();
          };

          element
            .crmDatepicker(scope.crmUiDatepicker)
            .on('change', function() {
              var requiredLength = 19;
              if (scope.crmUiDatepicker && scope.crmUiDatepicker.time === false) {
                requiredLength = 10;
              }
              if (scope.crmUiDatepicker && scope.crmUiDatepicker.date === false) {
                requiredLength = 8;
              }
              ngModel.$setValidity('incompleteDateTime', !($(this).val().length && $(this).val().length !== requiredLength));
            });
        }
      };
    })



    .directive('crmUiDebug', function ($location) {
      return {
        restrict: 'AE',
        scope: {
          crmUiDebug: '@'
        },
        template: function() {
          var args = $location.search();
          return (args && args.angularDebug) ? '<div crm-ui-accordion=\'{title: ts("Debug (%1)", {1: crmUiDebug}), collapsed: true}\'><pre>{{data|json}}</pre></div>' : '';
        },
        link: function(scope, element, attrs) {
          var args = $location.search();
          if (args && args.angularDebug) {
            scope.ts = CRM.ts(null);
            scope.$parent.$watch(attrs.crmUiDebug, function(data) {
              scope.data = data;
            });
          }
        }
      };
    })





    .directive('crmUiField', function() {

      var templateUrls = {
        default: '~/crmUi/field.html',
        checkbox: '~/crmUi/field-cb.html'
      };

      return {
        require: '^crmUiIdScope',
        restrict: 'EA',
        scope: {

          crmUiField: '='
        },
        templateUrl: function(tElement, tAttrs){
          var layout = tAttrs.crmLayout ? tAttrs.crmLayout : 'default';
          return templateUrls[layout];
        },
        transclude: true,
        link: function (scope, element, attrs, crmUiIdCtrl) {
          $(element).addClass('crm-section');
          scope.help = null;
          scope.$watch('crmUiField', function(crmUiField) {
            if (crmUiField && crmUiField.help) {
              scope.help = crmUiField.help.clone({}, {
                title: crmUiField.title
              });
            }
          });
        }
      };
    })

    .directive('crmUiId', function () {
      return {
        require: '^crmUiIdScope',
        restrict: 'EA',
        link: {
          pre: function (scope, element, attrs, crmUiIdCtrl) {
            var id = crmUiIdCtrl.get(attrs.crmUiId);
            element.attr('id', id);
          }
        }
      };
    })

    .service('crmUiHelp', function(){

      function FieldHelp(options) {
        this.options = options;
      }
      angular.extend(FieldHelp.prototype, {
        get: function(n) {
          return this.options[n];
        },
        open: function open() {
          CRM.help(this.options.title, {id: this.options.id, file: this.options.file});
        },
        clone: function clone(options, defaults) {
          return new FieldHelp(angular.extend({}, defaults, this.options, options));
        }
      });

      return function(defaults){


        return function(options) {
          if (_.isString(options)) {
            options = {id: options};
          }
          return new FieldHelp(angular.extend({}, defaults, options));
        };
      };
    })






    .directive('crmUiHelp', function() {
      return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
          setTimeout(function() {
            var crmUiHelp = scope.$eval(attrs.crmUiHelp);
            var title = crmUiHelp && crmUiHelp.get('title') ? ts('%1 Help', {1: crmUiHelp.get('title')}) : ts('Help');
            element.attr('title', title);
          }, 50);

          element
            .addClass('helpicon')
            .attr('href', '#')
            .on('click', function(e) {
              e.preventDefault();
              scope.$eval(attrs.crmUiHelp).open();
            });
        }
      };
    })

    .directive('crmUiFor', function ($parse, $timeout) {
      return {
        require: '^crmUiIdScope',
        restrict: 'EA',
        template: '<span ng-class="cssClasses"><span ng-transclude/><span crm-ui-visible="crmIsRequired" class="crm-marker" title="This field is required.">*</span></span>',
        transclude: true,
        link: function (scope, element, attrs, crmUiIdCtrl) {
          scope.crmIsRequired = false;
          scope.cssClasses = {};

          if (!attrs.crmUiFor) return;

          var id = crmUiIdCtrl.get(attrs.crmUiFor);
          element.attr('for', id);
          var ngModel = null;

          var updateCss = function () {
            scope.cssClasses['crm-error'] = !ngModel.$valid && !ngModel.$pristine;
          };


          var init = function (retries, retryDelay) {
            var input = $('#' + id);
            if (input.length === 0 && !attrs.crmUiForceRequired) {
              if (retries) {
                $timeout(function(){
                  init(retries-1, retryDelay);
                }, retryDelay);
              }
              return;
            }

            if (attrs.crmUiForceRequired) {
              scope.crmIsRequired = true;
              return;
            }

            var tgtScope = scope;//.$parent;
            if (attrs.crmDepth) {
              for (var i = attrs.crmDepth; i > 0; i--) {
                tgtScope = tgtScope.$parent;
              }
            }

            if (input.attr('ng-required')) {
              scope.crmIsRequired = scope.$parent.$eval(input.attr('ng-required'));
              scope.$parent.$watch(input.attr('ng-required'), function (isRequired) {
                scope.crmIsRequired = isRequired;
              });
            }
            else {
              scope.crmIsRequired = input.prop('required');
            }

            ngModel = $parse(attrs.crmUiFor)(tgtScope);
            if (ngModel) {
              ngModel.$viewChangeListeners.push(updateCss);
            }
          };

          $timeout(function(){
            init(3, 100);
          });
        }
      };
    })


    .directive('crmUiIdScope', function () {
      return {
        restrict: 'EA',
        scope: {},
        controllerAs: 'crmUiIdCtrl',
        controller: function($scope) {
          var ids = {};
          this.get = function(name) {
            if (!ids[name]) {
              ids[name] = "crmUiId_" + (++uidCount);
            }
            return ids[name];
          };
        },
        link: function (scope, element, attrs) {}
      };
    })



    .directive('crmUiIframe', function ($parse) {
      return {
        scope: {
          crmUiIframeSrc: '@', // expression which evaluates to a URL
          crmUiIframe: '@' // expression which evaluates to HTML content
        },
        link: function (scope, elm, attrs) {
          var iframe = $(elm)[0];
          iframe.setAttribute('width', '100%');
          iframe.setAttribute('height', '250px');
          iframe.setAttribute('frameborder', '0');

          var refresh = function () {
            if (attrs.crmUiIframeSrc) {
              iframe.setAttribute('src', scope.$parent.$eval(attrs.crmUiIframeSrc));
            }
            else {
              var iframeHtml = scope.$parent.$eval(attrs.crmUiIframe);

              var doc = iframe.document;
              if (iframe.contentDocument) {
                doc = iframe.contentDocument;
              }
              else if (iframe.contentWindow) {
                doc = iframe.contentWindow.document;
              }

              doc.open();
              doc.writeln(iframeHtml);
              doc.close();
            }
          };

          $(elm).parent().on('dialogresize dialogopen', function(e, ui) {
            $(this).css({padding: '0', margin: '0', overflow: 'hidden'});
            iframe.setAttribute('height', '' + $(this).innerHeight() + 'px');
          });

          $(elm).parent().on('dialogresize', function(e, ui) {
            iframe.setAttribute('class', 'resized');
          });

          scope.$parent.$watch(attrs.crmUiIframe, refresh);
        }
      };
    })



    .directive('crmUiInsertRx', function() {
      return {
        link: function(scope, element, attrs) {
          scope.$on(attrs.crmUiInsertRx, function(e, tokenName) {
            CRM.wysiwyg.insert(element, tokenName);
            $(element).select2('close').select2('val', '');
            CRM.wysiwyg.focus(element);
          });
        }
      };
    })


    .directive('crmUiRichtext', function ($timeout) {
      return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {

          var editor = CRM.wysiwyg.create(elm);
          if (!ngModel) {
            return;
          }

          if (attr.ngBlur) {
            $(elm).on('blur', function() {
              $timeout(function() {
                scope.$eval(attr.ngBlur);
              });
            });
          }

          ngModel.$render = function(value) {
            editor.done(function() {
              CRM.wysiwyg.setVal(elm, ngModel.$viewValue || '');
            });
          };
        }
      };
    })






    .directive('crmUiLock', function ($parse, $rootScope) {
      var defaultVal = function (defaultValue) {
        var f = function (scope) {
          return defaultValue;
        };
        f.assign = function (scope, value) {

        };
        return f;
      };

      var parse = function (expr, defaultValue) {
        return expr ? $parse(expr) : defaultVal(defaultValue);
      };

      return {
        template: '',
        link: function (scope, element, attrs) {
          var binding = parse(attrs.binding, true);
          var titleLocked = parse(attrs.titleLocked, ts('Locked'));
          var titleUnlocked = parse(attrs.titleUnlocked, ts('Unlocked'));

          $(element).addClass('crm-i lock-button');
          var refresh = function () {
            var locked = binding(scope);
            if (locked) {
              $(element)
                .removeClass('fa-unlock')
                .addClass('fa-lock')
                .prop('title', titleLocked(scope))
              ;
            }
            else {
              $(element)
                .removeClass('fa-lock')
                .addClass('fa-unlock')
                .prop('title', titleUnlocked(scope))
              ;
            }
          };

          $(element).click(function () {
            binding.assign(scope, !binding(scope));

            $rootScope.$digest();
          });

          scope.$watch(attrs.binding, refresh);
          scope.$watch(attrs.titleLocked, refresh);
          scope.$watch(attrs.titleUnlocked, refresh);

          refresh();
        }
      };
    })






    .service('CrmUiOrderCtrl', function(){
      //
      function CrmUiOrderCtrl(defaults){
        this.values = defaults;
      }
      angular.extend(CrmUiOrderCtrl.prototype, {
        get: function get() {
          return this.values;
        },
        getDir: function getDir(name) {
          if (this.values.indexOf(name) >= 0 || this.values.indexOf('+' + name) >= 0) {
            return '+';
          }
          if (this.values.indexOf('-' + name) >= 0) {
            return '-';
          }
          return '';
        },

        remove: function remove(name) {
          var idx = this.values.indexOf(name);
          if (idx >= 0) {
            this.values.splice(idx, 1);
            return true;
          }
          else {
            return false;
          }
        },
        setDir: function setDir(name, dir) {
          return this.toggle(name, dir);
        },


        toggle: function toggle(name, next) {
          if (!next && next !== '') {
            next = '+';
            if (this.remove(name) || this.remove('+' + name)) {
              next = '-';
            }
            if (this.remove('-' + name)) {
              next = '';
            }
          }

          if (next == '+') {
            this.values.unshift('+' + name);
          }
          else if (next == '-') {
            this.values.unshift('-' + name);
          }
        }
      });
      return CrmUiOrderCtrl;
    })







    .directive('crmUiOrder', function(CrmUiOrderCtrl) {
      return {
        link: function(scope, element, attrs){
          var options = angular.extend({var: 'crmUiOrderBy'}, scope.$eval(attrs.crmUiOrder));
          scope[options.var] = new CrmUiOrderCtrl(options.defaults);
        }
      };
    })

    .directive('crmUiOrderBy', function() {
      return {
        link: function(scope, element, attrs) {
          function updateClass(crmUiOrderCtrl, name) {
            var dir = crmUiOrderCtrl.getDir(name);
            element
              .toggleClass('sorting_asc', dir === '+')
              .toggleClass('sorting_desc', dir === '-')
              .toggleClass('sorting', dir === '');
          }

          element.on('click', function(e){
            var tgt = scope.$eval(attrs.crmUiOrderBy);
            tgt[0].toggle(tgt[1]);
            updateClass(tgt[0], tgt[1]);
            e.preventDefault();
            scope.$digest();
          });

          var tgt = scope.$eval(attrs.crmUiOrderBy);
          updateClass(tgt[0], tgt[1]);
        }
      };
    })


    .directive('crmUiSelect', function ($parse, $timeout) {
      return {
        require: '?ngModel',
        priority: 1,
        scope: {
          crmUiSelect: '='
        },
        link: function (scope, element, attrs, ngModel) {



          if (ngModel) {
            ngModel.$render = function () {
              $timeout(function () {


                var newVal = _.cloneDeep(ngModel.$modelValue);

                if (typeof newVal === 'string' && element.select2('container').hasClass('select2-container-multi')) {
                  newVal = newVal.length ? newVal.split(',') : [];
                }
                element.select2('val', newVal);
              });
            };
          }
          function refreshModel() {
            var oldValue = ngModel.$viewValue, newValue = element.select2('val');
            if (oldValue != newValue) {
              scope.$parent.$apply(function () {
                ngModel.$setViewValue(newValue);
              });
            }
          }

          function init() {

            element.crmSelect2(scope.crmUiSelect || {});
            if (ngModel) {
              element.on('change', refreshModel);
            }
          }

          init();
        }
      };
    })


    .directive('crmEntityref', function ($parse, $timeout) {
      return {
        require: '?ngModel',
        scope: {
          crmEntityref: '='
        },
        link: function (scope, element, attrs, ngModel) {



          ngModel.$render = function () {
            $timeout(function () {


              var newVal = _.cloneDeep(ngModel.$modelValue);

              if (typeof newVal === 'string' && element.select2('container').hasClass('select2-container-multi')) {
                newVal = newVal.length ? newVal.split(',') : [];
              }
              element.select2('val', newVal);
            });
          };
          function refreshModel() {
            var oldValue = ngModel.$viewValue, newValue = element.select2('val');
            if (oldValue != newValue) {
              scope.$parent.$apply(function () {
                ngModel.$setViewValue(newValue);
              });
            }
          }

          function init() {

            element.crmEntityRef(scope.crmEntityref || {});
            element.on('change', refreshModel);
            $timeout(ngModel.$render);
          }

          init();
        }
      };
    })


    .directive('crmMultipleEmail', function ($parse, $timeout) {
      return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
          ctrl.$parsers.unshift(function(viewValue) {

            if (_.isEmpty(viewValue)) {
              ctrl.$setValidity('crmMultipleEmail', true);
              return viewValue;
            }

            var emails = viewValue.split(',');

            var emailRegex = /\S+@\S+\.\S+/;

            var validityArr = emails.map(function(str){
              return emailRegex.test(str.trim());
            });

            if ($.inArray(false, validityArr) > -1) {
              ctrl.$setValidity('crmMultipleEmail', false);
            } else {
              ctrl.$setValidity('crmMultipleEmail', true);
            }
            return viewValue;
          });
        }
      };
    })


    .directive('crmUiTab', function($parse) {
      return {
        require: '^crmUiTabSet',
        restrict: 'EA',
        scope: {
          crmTitle: '@',
          crmIcon: '@',
          count: '@',
          id: '@'
        },
        template: '<div ng-transclude></div>',
        transclude: true,
        link: function (scope, element, attrs, crmUiTabSetCtrl) {
          crmUiTabSetCtrl.add(scope);
        }
      };
    })

    .directive('crmUiTabSet', function() {
      return {
        restrict: 'EA',
        scope: {
          crmUiTabSet: '@',
          tabSetOptions: '@'
        },
        templateUrl: '~/crmUi/tabset.html',
        transclude: true,
        controllerAs: 'crmUiTabSetCtrl',
        controller: function($scope, $parse) {
          var tabs = $scope.tabs = []; // array<$scope>
          this.add = function(tab) {
            if (!tab.id) throw "Tab is missing 'id'";
            tabs.push(tab);
          };
        },
        link: function (scope, element, attrs) {}
      };
    })



    .directive('crmUiValidate', function() {
      return {
        restrict: 'EA',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          var validationKey = attrs.crmUiValidateName ? attrs.crmUiValidateName : 'crmUiValidate';
          scope.$watch(attrs.crmUiValidate, function(newValue){
            ngModel.$setValidity(validationKey, !!newValue);
          });
        }
      };
    })


    .directive('crmUiVisible', function($parse) {
      return {
        restrict: 'EA',
        scope: {
          crmUiVisible: '@'
        },
        link: function (scope, element, attrs) {
          var model = $parse(attrs.crmUiVisible);
          function updatecChildren() {
            element.css('visibility', model(scope.$parent) ? 'inherit' : 'hidden');
          }
          updatecChildren();
          scope.$parent.$watch(attrs.crmUiVisible, updatecChildren);
        }
      };
    })





    .directive('crmUiWizard', function() {
      return {
        restrict: 'EA',
        scope: {
          crmUiWizard: '@',
          crmUiWizardNavClass: '@' // string, A list of classes that will be added to the nav items
        },
        templateUrl: '~/crmUi/wizard.html',
        transclude: true,
        controllerAs: 'crmUiWizardCtrl',
        controller: function($scope, $parse) {
          var steps = $scope.steps = []; // array<$scope>
          var crmUiWizardCtrl = this;
          var maxVisited = 0;
          var selectedIndex = null;

          var findIndex = function() {
            var found = null;
            angular.forEach(steps, function(step, stepKey) {
              if (step.selected) found = stepKey;
            });
            return found;
          };

          this.$index = function() { return selectedIndex; };

          this.$first = function() { return this.$index() === 0; };

          this.$last = function() { return this.$index() === steps.length -1; };
          this.$maxVisit = function() { return maxVisited; };
          this.$validStep = function() {
            return steps[selectedIndex] && steps[selectedIndex].isStepValid();
          };
          this.iconFor = function(index) {
            if (index < this.$index()) return '√';
            if (index === this.$index()) return '»';
            return ' ';
          };
          this.isSelectable = function(step) {
            if (step.selected) return false;
            return this.$validStep();
          };

          /*** @param Object step the $scope of the step */
          this.select = function(step) {
            angular.forEach(steps, function(otherStep, otherKey) {
              otherStep.selected = (otherStep === step);
              if (otherStep === step && maxVisited < otherKey) maxVisited = otherKey;
            });
            selectedIndex = findIndex();
          };
          /*** @param Object step the $scope of the step */
          this.add = function(step) {
            if (steps.length === 0) {
              step.selected = true;
              selectedIndex = 0;
            }
            steps.push(step);
            steps.sort(function(a,b){
              return a.crmUiWizardStep - b.crmUiWizardStep;
            });
            selectedIndex = findIndex();
          };
          this.remove = function(step) {
            var key = null;
            angular.forEach(steps, function(otherStep, otherKey) {
              if (otherStep === step) key = otherKey;
            });
            if (key !== null) {
              steps.splice(key, 1);
            }
          };
          this.goto = function(index) {
            if (index < 0) index = 0;
            if (index >= steps.length) index = steps.length-1;
            this.select(steps[index]);
          };
          this.previous = function() { this.goto(this.$index()-1); };
          this.next = function() { this.goto(this.$index()+1); };
          if ($scope.crmUiWizard) {
            $parse($scope.crmUiWizard).assign($scope.$parent, this);
          }
        },
        link: function (scope, element, attrs) {
          scope.ts = CRM.ts(null);

          element.find('.crm-wizard-buttons button').click(function () {



            var topOfWizard = element.offset().top;
            var heightOfMenu = $('#civicrm-menu').height() || 0;

            $('html')

              .stop()

              .animate({scrollTop: topOfWizard - heightOfMenu}, 1000);
          });
        }
      };
    })

    .directive('crmUiWizardButtons', function() {
      return {
        require: '^crmUiWizard',
        restrict: 'EA',
        scope: {},
        template: '<span ng-transclude></span>',
        transclude: true,
        link: function (scope, element, attrs, crmUiWizardCtrl) {
          var realButtonsEl = $(element).closest('.crm-wizard').find('.crm-wizard-buttons');
          $(element).appendTo(realButtonsEl);
        }
      };
    })


    .directive('crmIcon', function() {
      return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
          if (element.is('[crm-ui-tab]')) {

            return;
          }
          if (attrs.crmIcon.substring(0,3) == 'fa-') {
            $(element).prepend('<i class="crm-i ' + attrs.crmIcon + '"></i> ');
          }
          else {
            $(element).prepend('<span class="icon ui-icon-' + attrs.crmIcon + '"></span> ');
          }
          if ($(element).is('button')) {
            $(element).addClass('crm-button');
          }
        }
      };
    })




    .directive('crmUiWizardStep', function() {
      var nextWeight = 1;
      return {
        require: ['^crmUiWizard', 'form'],
        restrict: 'EA',
        scope: {
          crmTitle: '@', // expression, evaluates to a printable string
          crmUiWizardStep: '@', // int, a weight which determines the ordering of the steps
          crmUiWizardStepClass: '@' // string, A list of classes that will be added to the template
        },
        template: '<div class="crm-wizard-step {{crmUiWizardStepClass}}" ng-show="selected" ng-transclude/></div>',
        transclude: true,
        link: function (scope, element, attrs, ctrls) {
          var crmUiWizardCtrl = ctrls[0], form = ctrls[1];
          if (scope.crmUiWizardStep) {
            scope.crmUiWizardStep = parseInt(scope.crmUiWizardStep);
          } else {
            scope.crmUiWizardStep = nextWeight++;
          }
          scope.isStepValid = function() {
            return form.$valid;
          };
          crmUiWizardCtrl.add(scope);
          scope.$on('$destroy', function(){
            crmUiWizardCtrl.remove(scope);
          });
        }
      };
    })



    .directive('crmConfirm', function ($compile, $rootScope, $templateRequest, $q) {

      var defaultFuncs = {
        'disable': function (options) {
          return {
            message: ts('Are you sure you want to disable this?'),
            options: {no: ts('Cancel'), yes: ts('Disable')},
            width: 300,
            title: ts('Disable %1?', {
              1: options.obj.title || options.obj.label || options.obj.name || ts('the record')
            })
          };
        },
        'revert': function (options) {
          return {
            message: ts('Are you sure you want to revert this?'),
            options: {no: ts('Cancel'), yes: ts('Revert')},
            width: 300,
            title: ts('Revert %1?', {
              1: options.obj.title || options.obj.label || options.obj.name || ts('the record')
            })
          };
        },
        'delete': function (options) {
          return {
            message: ts('Are you sure you want to delete this?'),
            options: {no: ts('Cancel'), yes: ts('Delete')},
            width: 300,
            title: ts('Delete %1?', {
              1: options.obj.title || options.obj.label || options.obj.name || ts('the record')
            })
          };
        }
      };
      var confirmCount = 0;
      return {
        link: function (scope, element, attrs) {
          $(element).click(function () {
            var options = scope.$eval(attrs.crmConfirm);
            if (attrs.title && !options.title) {
              options.title = attrs.title;
            }
            var defaults = (options.type) ? defaultFuncs[options.type](options) : {};

            var tpl = null, stubId = null;
            if (!options.message) {
              if (options.templateUrl) {
                tpl = $templateRequest(options.templateUrl);
              }
              else if (options.template) {
                tpl = options.template;
              }
              if (tpl) {
                stubId = 'crmUiConfirm_' + (++confirmCount);
                options.message = '<div id="' + stubId + '"></div>';
              }
            }

            CRM.confirm(_.extend(defaults, options))
              .on('crmConfirm:yes', function() { scope.$apply(attrs.onYes); })
              .on('crmConfirm:no', function() { scope.$apply(attrs.onNo); });

            if (tpl && stubId) {
              $q.when(tpl, function(html) {
                var scope = options.scope || $rootScope.$new();
                if (options.export) {
                  angular.extend(scope, options.export);
                }
                var linker = $compile(html);
                $('#' + stubId).append($(linker(scope)));
              });
            }
          });
        }
      };
    })




    .directive('crmPageTitle', function($timeout) {
      return {
        scope: {
          crmDocumentTitle: '='
        },
        link: function(scope, $el, attrs) {
          function update() {
            $timeout(function() {
              var newPageTitle = _.trim($el.html()),
                newDocumentTitle = scope.crmDocumentTitle || $el.text();
              document.title = $('title').text().replace(documentTitle, newDocumentTitle);

              $('h1').not('.crm-container h1').each(function() {
                if (_.trim($(this).html()) === pageTitle) {
                  $(this).addClass('crm-page-title').html(newPageTitle);
                  $el.hide();
                }
              });
              pageTitle = newPageTitle;
              documentTitle = newDocumentTitle;
            });
          }

          scope.$watch(function() {return scope.crmDocumentTitle + $el.html();}, update);
        }
      };
    })

    .run(function($rootScope, $location) {

      $rootScope.goto = function(path) {
        $location.path(path);
      };

    })
  ;

})(angular, CRM.$, CRM._);

(function (angular, $, _) {
  angular.module('crmUtil', CRM.angRequires('crmUtil'));


  //





  angular.module('crmUtil').factory('crmApi', function($q) {
    var crmApi = function(entity, action, params, message) {

      var deferred = $q.defer();
      var p;
      var backend = crmApi.backend || CRM.api3;
      if (params && params.body_html) {


        params.body_html = params.body_html.replace(/([\u2028]|[\u2029])/g, '\n');
      }
      if (_.isObject(entity)) {

        /*jshint -W061 */
        p = backend(eval('('+angular.toJson(entity)+')'), action);
      } else {

        /*jshint -W061 */
        p = backend(entity, action, eval('('+angular.toJson(params)+')'), message);
      }


      p.then(
        function(result) {
          if (result.is_error) {
            deferred.reject(result);
          } else {
            deferred.resolve(result);
          }
        },
        function(error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };
    crmApi.backend = null;
    crmApi.val = function(value) {
      var d = $.Deferred();
      d.resolve(value);
      return d.promise();
    };
    return crmApi;
  });





  angular.module('crmUtil').factory('crmMetadata', function($q, crmApi) {

    function convertOptionsToMap(options) {
      var result = {};
      angular.forEach(options, function(o) {
        result[o.key] = o.value;
      });
      return result;
    }

    var cache = {}; // cache[entityName+'::'+action][fieldName].title
    var deferreds = {}; // deferreds[cacheKey].push($q.defer())
    var crmMetadata = {

      getField: function getField(entity, field) {
        return $q.when(crmMetadata.getFields(entity)).then(function(fields){
          return fields[field];
        });
      },


      getFields: function getFields(entity) {
        var action = '', cacheKey;
        if (_.isArray(entity)) {
          action = entity[1];
          entity = entity[0];
          cacheKey = entity + '::' + action;
        } else {
          cacheKey = entity;
        }

        if (_.isObject(cache[cacheKey])) {
          return cache[cacheKey];
        }

        var needFetch = _.isEmpty(deferreds[cacheKey]);
        deferreds[cacheKey] = deferreds[cacheKey] || [];
        var deferred = $q.defer();
        deferreds[cacheKey].push(deferred);

        if (needFetch) {
          crmApi(entity, 'getfields', {action: action, sequential: 1, options: {get_options: 'all'}})
            .then(

            function(fields) {
              cache[cacheKey] = _.indexBy(fields.values, 'name');
              angular.forEach(cache[cacheKey],function (field){
                if (field.options) {
                  field.optionsMap = convertOptionsToMap(field.options);
                }
              });
              angular.forEach(deferreds[cacheKey], function(dfr) {
                dfr.resolve(cache[cacheKey]);
              });
              delete deferreds[cacheKey];
            },

            function() {
              cache[cacheKey] = {}; // cache nack
              angular.forEach(deferreds[cacheKey], function(dfr) {
                dfr.reject();
              });
              delete deferreds[cacheKey];
            }
          );
        }

        return deferred.promise;
      }
    };

    return crmMetadata;
  });




  angular.module('crmUtil').factory('crmBlocker', function() {
    return function() {
      var blocks = 0;
      var result = function(promise) {
        blocks++;
        return promise.finally(function() {
          blocks--;
        });
      };
      result.check = function() {
        return blocks > 0;
      };
      return result;
    };
  });

  angular.module('crmUtil').factory('crmLegacy', function() {
    return CRM;
  });

  angular.module('crmUtil').factory('crmLog', function(){
    var level = 0;
    var write = console.log;
    function indent() {
      var s = '>';
      for (var i = 0; i < level; i++) s = s + '  ';
      return s;
    }
    var crmLog = {
      log: function(msg, vars) {
        write(indent() + msg, vars);
      },
      wrap: function(label, f) {
        return function(){
          level++;
          crmLog.log(label + ": start", arguments);
          var r;
          try {
            r = f.apply(this, arguments);
          } finally {
            crmLog.log(label + ": end");
            level--;
          }
          return r;
        };
      }
    };
    return crmLog;
  });

  angular.module('crmUtil').factory('crmNavigator', ['$window', function($window) {
    return {
      redirect: function(path) {
        $window.location.href = path;
      }
    };
  }]);



  angular.module('crmUtil').factory('crmQueue', function($q) {

    return function crmQueue(worker) {
      var queue = [];
      function next() {
        var task = queue[0];
        worker.apply(null, task.a).then(
          function onOk(data) {
            queue.shift();
            task.dfr.resolve(data);
            if (queue.length > 0) next();
          },
          function onErr(err) {
            queue.shift();
            task.dfr.reject(err);
            if (queue.length > 0) next();
          }
        );
      }
      function enqueue() {
        var dfr = $q.defer();
        queue.push({a: arguments, dfr: dfr});
        if (queue.length === 1) {
          next();
        }
        return dfr.promise;
      }
      return enqueue;
    };
  });


  angular.module('crmUtil').factory('crmStatus', function($q){
    return function(options, aPromise){
      if (aPromise) {
        return CRM.toAPromise($q, CRM.status(options, CRM.toJqPromise(aPromise)));
      } else {
        return CRM.toAPromise($q, CRM.status(options));
      }
    };
  });


  //
















  angular.module('crmUtil').factory('crmWatcher', function(){
    return function() {
      var unwatches = {}, watchFactories = {}, suspends = {};

      this.setup = function(name, newWatchFactory) {
        watchFactories[name] = newWatchFactory;
        unwatches[name] = watchFactories[name]();
        suspends[name] = 0;
        return this;
      };

      this.suspend = function(name, f) {
        suspends[name]++;
        this.teardown(name);
        var r;
        try {
          r = f.apply(this, []);
        } finally {
          if (suspends[name] === 1) {
            unwatches[name] = watchFactories[name]();
            if (!angular.isArray(unwatches[name])) {
              unwatches[name] = [unwatches[name]];
            }
          }
          suspends[name]--;
        }
        return r;
      };

      this.teardown = function(name) {
        if (!unwatches[name]) return;
        _.each(unwatches[name], function(unwatch){
          unwatch();
        });
        delete unwatches[name];
      };

      return this;
    };
  });




  angular.module('crmUtil').factory('crmThrottle', function($q) {
    var pending = [],
      executing = [];
    return function(func) {
      var deferred = $q.defer();

      function checkResult(result, success) {
        _.pull(executing, func);
        if (_.includes(pending, func)) {
          runNext();
        } else if (success) {
          deferred.resolve(result);
        } else {
          deferred.reject(result);
        }
      }

      function runNext() {
        executing.push(func);
        _.pull(pending, func);
        func().then(function(result) {
          checkResult(result, true);
        }, function(result) {
          checkResult(result, false);
        });
      }

      if (!_.includes(executing, func)) {
        runNext();
      } else if (!_.includes(pending, func)) {
        pending.push(func);
      }
      return deferred.promise;
    };
  });

})(angular, CRM.$, CRM._);

/*
 AngularJS v1.5.11
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(E,d){'use strict';function y(t,l,g){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(b,e,a,c,k){function p(){m&&(g.cancel(m),m=null);h&&(h.$destroy(),h=null);n&&(m=g.leave(n),m.done(function(b){!1!==b&&(m=null)}),n=null)}function B(){var a=t.current&&t.current.locals;if(d.isDefined(a&&a.$template)){var a=b.$new(),c=t.current;n=k(a,function(a){g.enter(a,null,n||e).done(function(a){!1===a||!d.isDefined(A)||A&&!b.$eval(A)||l()});p()});h=c.scope=a;h.$emit("$viewContentLoaded");
h.$eval(s)}else p()}var h,n,m,A=a.autoscroll,s=a.onload||"";b.$on("$routeChangeSuccess",B);B()}}}function w(d,l,g){return{restrict:"ECA",priority:-400,link:function(b,e){var a=g.current,c=a.locals;e.html(c.$template);var k=d(e.contents());if(a.controller){c.$scope=b;var p=l(a.controller,c);a.controllerAs&&(b[a.controllerAs]=p);e.data("$ngControllerController",p);e.children().data("$ngControllerController",p)}b[a.resolveAs||"$resolve"]=c;k(b)}}}var x,C,s=d.module("ngRoute",["ng"]).provider("$route",
function(){function t(b,e){return d.extend(Object.create(b),e)}function l(b,d){var a=d.caseInsensitiveMatch,c={originalPath:b,regexp:b},g=c.keys=[];b=b.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)(\*\?|[?*])?/g,function(b,a,d,c){b="?"===c||"*?"===c?"?":null;c="*"===c||"*?"===c?"*":null;g.push({name:d,optional:!!b});a=a||"";return""+(b?"":a)+"(?:"+(b?a:"")+(c&&"(.+?)"||"([^/]+)")+(b||"")+")"+(b||"")}).replace(/([/$*])/g,"\\$1");c.regexp=new RegExp("^"+b+"$",a?"i":"");return c}x=d.isArray;C=d.isObject;
var g={};this.when=function(b,e){var a;a=void 0;if(x(e)){a=a||[];for(var c=0,k=e.length;c<k;c++)a[c]=e[c]}else if(C(e))for(c in a=a||{},e)if("$"!==c.charAt(0)||"$"!==c.charAt(1))a[c]=e[c];a=a||e;d.isUndefined(a.reloadOnSearch)&&(a.reloadOnSearch=!0);d.isUndefined(a.caseInsensitiveMatch)&&(a.caseInsensitiveMatch=this.caseInsensitiveMatch);g[b]=d.extend(a,b&&l(b,a));b&&(c="/"===b[b.length-1]?b.substr(0,b.length-1):b+"/",g[c]=d.extend({redirectTo:b},l(c,a)));return this};this.caseInsensitiveMatch=!1;
this.otherwise=function(b){"string"===typeof b&&(b={redirectTo:b});this.when(null,b);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(b,e,a,c,k,p,l){function h(a){var f=v.current;(x=(r=y())&&f&&r.$$route===f.$$route&&d.equals(r.pathParams,f.pathParams)&&!r.reloadOnSearch&&!z)||!f&&!r||b.$broadcast("$routeChangeStart",r,f).defaultPrevented&&a&&a.preventDefault()}function n(){var u=v.current,f=r;if(x)u.params=f.params,d.copy(u.params,
a),b.$broadcast("$routeUpdate",u);else if(f||u)z=!1,(v.current=f)&&f.redirectTo&&(d.isString(f.redirectTo)?e.path(w(f.redirectTo,f.params)).search(f.params).replace():e.url(f.redirectTo(f.pathParams,e.path(),e.search())).replace()),c.when(f).then(m).then(function(c){f===v.current&&(f&&(f.locals=c,d.copy(f.params,a)),b.$broadcast("$routeChangeSuccess",f,u))},function(a){f===v.current&&b.$broadcast("$routeChangeError",f,u,a)})}function m(a){if(a){var b=d.extend({},a.resolve);d.forEach(b,function(a,
c){b[c]=d.isString(a)?k.get(a):k.invoke(a,null,null,c)});a=s(a);d.isDefined(a)&&(b.$template=a);return c.all(b)}}function s(a){var b,c;d.isDefined(b=a.template)?d.isFunction(b)&&(b=b(a.params)):d.isDefined(c=a.templateUrl)&&(d.isFunction(c)&&(c=c(a.params)),d.isDefined(c)&&(a.loadedTemplateUrl=l.valueOf(c),b=p(c)));return b}function y(){var a,b;d.forEach(g,function(c,g){var q;if(q=!b){var h=e.path();q=c.keys;var l={};if(c.regexp)if(h=c.regexp.exec(h)){for(var k=1,p=h.length;k<p;++k){var m=q[k-1],
n=h[k];m&&n&&(l[m.name]=n)}q=l}else q=null;else q=null;q=a=q}q&&(b=t(c,{params:d.extend({},e.search(),a),pathParams:a}),b.$$route=c)});return b||g[null]&&t(g[null],{params:{},pathParams:{}})}function w(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var e=a.match(/(\w+)(?:[?*])?(.*)/),g=e[1];c.push(b[g]);c.push(e[2]||"");delete b[g]}});return c.join("")}var z=!1,r,x,v={routes:g,reload:function(){z=!0;var a={defaultPrevented:!1,preventDefault:function(){this.defaultPrevented=
!0;z=!1}};b.$evalAsync(function(){h(a);a.defaultPrevented||n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),e.path(w(this.current.$$route.originalPath,a)),e.search(a);else throw D("norout");}};b.$on("$locationChangeStart",h);b.$on("$locationChangeSuccess",n);return v}]}),D=d.$$minErr("ngRoute");s.provider("$routeParams",function(){this.$get=function(){return{}}});s.directive("ngView",y);s.directive("ngView",w);y.$inject=["$route","$anchorScroll",
"$animate"];w.$inject=["$compile","$controller","$route"]})(window,window.angular);


/*
 AngularJS v1.5.11
 (c) 2010-2017 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(s,g){'use strict';function H(g){var l=[];t(l,A).chars(g);return l.join("")}var B=g.$$minErr("$sanitize"),C,l,D,E,q,A,F,t;g.module("ngSanitize",[]).provider("$sanitize",function(){function k(a,e){var b={},c=a.split(","),h;for(h=0;h<c.length;h++)b[e?q(c[h]):c[h]]=!0;return b}function I(a){for(var e={},b=0,c=a.length;b<c;b++){var h=a[b];e[h.name]=h.value}return e}function G(a){return a.replace(/&/g,"&amp;").replace(J,function(a){var b=a.charCodeAt(0);a=a.charCodeAt(1);return"&#"+(1024*(b-55296)+
(a-56320)+65536)+";"}).replace(K,function(a){return"&#"+a.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function x(a){for(;a;){if(a.nodeType===s.Node.ELEMENT_NODE)for(var e=a.attributes,b=0,c=e.length;b<c;b++){var h=e[b],d=h.name.toLowerCase();if("xmlns:ns1"===d||0===d.lastIndexOf("ns1:",0))a.removeAttributeNode(h),b--,c--}(e=a.firstChild)&&x(e);a=a.nextSibling}}var u=!1;this.$get=["$$sanitizeUri",function(a){u&&l(v,w);return function(e){var b=[];F(e,t(b,function(b,h){return!/^unsafe:/.test(a(b,
h))}));return b.join("")}}];this.enableSvg=function(a){return E(a)?(u=a,this):u};C=g.bind;l=g.extend;D=g.forEach;E=g.isDefined;q=g.lowercase;A=g.noop;F=function(a,e){null===a||void 0===a?a="":"string"!==typeof a&&(a=""+a);f.innerHTML=a;var b=5;do{if(0===b)throw B("uinput");b--;s.document.documentMode&&x(f);a=f.innerHTML;f.innerHTML=a}while(a!==f.innerHTML);for(b=f.firstChild;b;){switch(b.nodeType){case 1:e.start(b.nodeName.toLowerCase(),I(b.attributes));break;case 3:e.chars(b.textContent)}var c;if(!(c=
b.firstChild)&&(1===b.nodeType&&e.end(b.nodeName.toLowerCase()),c=b.nextSibling,!c))for(;null==c;){b=b.parentNode;if(b===f)break;c=b.nextSibling;1===b.nodeType&&e.end(b.nodeName.toLowerCase())}b=c}for(;b=f.firstChild;)f.removeChild(b)};t=function(a,e){var b=!1,c=C(a,a.push);return{start:function(a,d){a=q(a);!b&&z[a]&&(b=a);b||!0!==v[a]||(c("<"),c(a),D(d,function(b,d){var f=q(d),g="img"===a&&"src"===f||"background"===f;!0!==m[f]||!0===n[f]&&!e(b,g)||(c(" "),c(d),c('="'),c(G(b)),c('"'))}),c(">"))},
end:function(a){a=q(a);b||!0!==v[a]||!0===y[a]||(c("</"),c(a),c(">"));a==b&&(b=!1)},chars:function(a){b||c(G(a))}}};var J=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,K=/([^#-~ |!])/g,y=k("area,br,col,hr,img,wbr"),d=k("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),r=k("rp,rt"),p=l({},r,d),d=l({},d,k("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul")),r=l({},r,k("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),
w=k("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph,hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline,radialGradient,rect,stop,svg,switch,text,title,tspan"),z=k("script,style"),v=l({},y,d,r,p),n=k("background,cite,href,longdesc,src,xlink:href"),p=k("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,valign,value,vspace,width"),
r=k("accent-height,accumulate,additive,alphabetic,arabic-form,ascent,baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan",
!0),m=l({},n,r,p),f;(function(a){if(a.document&&a.document.implementation)a=a.document.implementation.createHTMLDocument("inert");else throw B("noinert");var e=(a.documentElement||a.getDocumentElement()).getElementsByTagName("body");1===e.length?f=e[0]:(e=a.createElement("html"),f=a.createElement("body"),e.appendChild(f),a.appendChild(e))})(s)});g.module("ngSanitize").filter("linky",["$sanitize",function(k){var l=/((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
q=/^mailto:/i,x=g.$$minErr("linky"),u=g.isDefined,s=g.isFunction,t=g.isObject,y=g.isString;return function(d,g,p){function w(a){a&&m.push(H(a))}function z(a,b){var c,d=v(a);m.push("<a ");for(c in d)m.push(c+'="'+d[c]+'" ');!u(g)||"target"in d||m.push('target="',g,'" ');m.push('href="',a.replace(/"/g,"&quot;"),'">');w(b);m.push("</a>")}if(null==d||""===d)return d;if(!y(d))throw x("notstring",d);for(var v=s(p)?p:t(p)?function(){return p}:function(){return{}},n=d,m=[],f,a;d=n.match(l);)f=d[0],d[2]||
d[4]||(f=(d[3]?"http://":"mailto:")+f),a=d.index,w(n.substr(0,a)),z(f,d[0].replace(q,"")),n=n.substring(a+d[0].length);w(n);return k(m.join(""))}}])})(window,window.angular);


(function(angular, $, _) {

  angular
    .module('volunteer', CRM.angRequires('volunteer'))

    .run(function($rootScope) {
      $rootScope._ = _;
    })

    .run(function($rootScope) {
      $rootScope.$on('$routeChangeStart', function() {
        CRM.$('#crm-main-content-wrapper').block();
      });

      $rootScope.$on('$routeChangeSuccess', function() {
        CRM.$('#crm-main-content-wrapper').unblock();
      });

      $rootScope.$on('$routeChangeError', function() {
        CRM.$('#crm-main-content-wrapper').unblock();
      });



      CRM.$('#crm-main-content-wrapper').block();
    })

    .factory('volOppSearch', ['crmApi', '$location', '$route', function(crmApi, $location, $route) {

      var volOppSearch = {};
      var result = {};

      /**
       * This translates the url params with nested key names
       * into a complex object format that Angular can assign to form objects
       * VOL-240
       *
       * @param params
       * @returns complex object
       */
      var parseQueryParams = function(params) {
        var returnParams = {};
        _.each(params, function(value, name) {

          var basename = name.replace(/([^\[]*)\[.*/g, "$1");

          if (basename.length < name.length) {
            var tmp = returnParams[basename] || {};

            var path = name.replace(basename + "[", "").slice(0, -1).split("][");
            var ptr = tmp;
            var last = path.length - 1;
            for(var i in path) {

              if (i == last) {
                ptr[path[i]] = value;
              } else {

                if(!ptr.hasOwnProperty(path[i])) {
                  ptr[path[i]] = {};
                }

                ptr = ptr[path[i]];
              }
            }

            returnParams[basename] = tmp;
          } else {
            returnParams[basename] = value;
          }
        });

        if (returnParams['proximity'] && returnParams['proximity']['radius']) {
          returnParams['proximity']['radius'] = parseFloat(returnParams['proximity']['radius']);
        }

        return returnParams;
      };

      volOppSearch.params = parseQueryParams($route.current.params);

      var clearResult = function() {
        result = {};
      };

      /**
       * Formats the search params for bookmarkable links.
       *
       * @return string
       */
      var buildQueryString = function () {

        if (volOppSearch.params.beneficiary && typeof volOppSearch.params.beneficiary !== "string") {
          volOppSearch.params.beneficiary = volOppSearch.params.beneficiary.join(',');
        }

        var cleanUpSearchParams = function (params) {
          return _.transform(params, function (result, value, key) {
            if (typeof value == 'object') {
              result[key] = cleanUpSearchParams(value);
            } else if (value) {
              result[key] = value;
            }
          });
        };
        var searchParams = cleanUpSearchParams(volOppSearch.params);


        return CRM.$.param(searchParams);
      }

      volOppSearch.search = function() {
        clearResult();

        $location.search(buildQueryString());

        if (volOppSearch.params.beneficiary && typeof volOppSearch.params.beneficiary === "string") {
          volOppSearch.params.beneficiary = volOppSearch.params.beneficiary.split(',');
        }

        return crmApi('VolunteerNeed', 'getsearchresult', volOppSearch.params).then(function(data) {
          result = data.values;
        });
      };



      volOppSearch.results = function results() { return result; };

      return volOppSearch;

    }])




    .directive('crmVolPermToClass', function(crmApi) {
      return {
        restrict: 'A',
        scope: {},
        link: function (scope, element, attrs) {
          var classes = [];
          crmApi('VolunteerUtil', 'getperms').then(function(perms) {
            angular.forEach(perms.values, function(value) {
              if (CRM.checkPerm(value.name) === true) {
                classes.push('crm-vol-perm-' + value.safe_name);
              }
            });

            $(element).addClass(classes.join(' '));
          });
        }
      };
    })


    /**
     * This is a service for loading the backbone-based volunteer UIs (and their
     * prerequisite scripts) into angular routes.
     */
    .factory('volBackbone', function(crmApi, crmProfiles, $q) {

      function loadNextScript(scripts, callback, fail) {
        var script = scripts.shift();
        CRM.$.getScript(script)
          .done(function(scriptData, status) {
            if(scripts.length > 0) {
              loadNextScript(scripts, callback, fail);
            } else {
              callback();
            }
          }).fail(function(jqxhr, settings, exception) {
            console.log(exception);
            fail(exception);
          });
      }

      function loadSettings(settings) {
        CRM.$.extend(true, CRM, settings);
      }

      function loadStyleFile(url) {
        CRM.$("#backbone_resources").append('<link rel="stylesheet" type="text/css" href="' + url + '" />');
      }

      /**
       * Fetches a URL and puts the fetched HTML into #volunteer_backbone_templates.
       *
       * The intended use is to fetch a Smarty-generated page which contains all
       * of the backbone templates (e.g., <script type="text/template">foo</script>).
       */
      function loadTemplate(index, url) {
        var deferred = $q.defer();
        var divId = 'volunteer_backbone_template_' + index;

        CRM.$("#volunteer_backbone_templates").append("<div id='" + divId + "'></div>");
        CRM.$("#" + divId).load(CRM.url(url, {snippet: 5}), function(response) {
          deferred.resolve(response);
        });

        return deferred.promise;
      }

      function loadScripts(scripts) {
        var deferred = $q.defer();

        //










        CRM.origJQuery = window.jQuery;
        window.jQuery = CRM.$;

        if(!window._) {
          window._ = CRM._;
        }

        loadNextScript(scripts, function () {
          window.jQuery = CRM.origJQuery;
          delete CRM.origJQuery;
          CRM.volunteerBackboneScripts = true;
          deferred.resolve(true);
        }, function(status) {
          deferred.resolve(status);
        });

        return deferred.promise;
      }


      function verifyScripts() {
        return !!CRM.volunteerBackboneScripts;
      }
      function verifyTemplates() {
        return (angular.element("#volunteer_backbone_templates div").length > 0);
      }
      function verifySettings() {
        return !!CRM.volunteerBackboneSettings;
      }

      return {
        verify: function() {
          return (!!window.Backbone && verifyScripts() && verifySettings() && verifyTemplates());
        },
        load: function() {
          var deferred = $q.defer();
          var promises = [];
          var preReqs = {};

          preReqs.volunteer = crmApi('VolunteerUtil', 'loadbackbone');

          if(!crmProfiles.verify()) {
            preReqs.profiles = crmProfiles.load();
          }

          $q.all(preReqs).then(function(resources) {

            if (CRM.$("#backbone_resources").length < 1) {
              CRM.$("body").append("<div id='backbone_resources'></div>");
            }

            if(CRM.$("#volunteer_backbone_templates").length < 1) {
              CRM.$("body").append("<div id='volunteer_backbone_templates'></div>");
            }


            if(!verifySettings()) {
              loadSettings(resources.volunteer.values.settings);
              CRM.volunteerBackboneSettings = true;
            }

            if(!verifyScripts()) {
              promises.push(loadScripts(resources.volunteer.values.scripts));
            }

            if(!verifyTemplates()) {
              CRM.$.each(resources.volunteer.values.templates, function(index, url) {
                promises.push(loadTemplate(index, url));
              });
            }

            CRM.$.each(resources.volunteer.values.css, function(index, url) {
              loadStyleFile(url);
            });

            $q.all(promises).then(
              function () {



                CRM.volunteerApp.trigger("initialize:before");

                deferred.resolve(true);
              },
              function () {
                console.log("Failed to load all backbone resources");
                deferred.reject(ts("Failed to load all backbone resources"));
              }
            );
          });
          return deferred.promise;
        }
      };
    });




  angular.module('volunteer').config(function($routeProvider) {
      $routeProvider.when('/volunteer/manage/:projectId', {
        controller: 'VolunteerProject',
        templateUrl: '~/volunteer/Project.html',
        resolve: {
          countries: function(crmApi) {
            return crmApi('VolunteerUtil', 'getcountries', {}).then(function(result) {
              return result.values;
            });
          },
          project: function(crmApi, $route) {
            if ($route.current.params.projectId == 0) {
              return {
                id: 0
              };
            } else {
              return crmApi('VolunteerProject', 'getsingle', {
                id: $route.current.params.projectId
              }).then(

                null,

                function () {
                  CRM.alert(
                    ts('No volunteer project exists with an ID of %1', {1: $route.current.params.projectId}),
                    ts('Not Found'),
                    'error'
                  );
                }
              );
            }
          },
          supporting_data: function(crmApi) {
            return crmApi('VolunteerUtil', 'getsupportingdata', {
              controller: 'VolunteerProject'
            });
          },
          campaigns: function(crmApi) {
            return crmApi('VolunteerUtil', 'getcampaigns').then(function(data) {
              return data.values;
            });
          },
          relationship_data: function(crmApi, $route) {
            var params = {
              "sequential": 1,
              "project_id": $route.current.params.projectId
            };
            return crmApi('VolunteerProjectContact', 'get', params).then(function(result) {
              var relationships = {};
              $(result.values).each(function (index, vpc) {
                if (!relationships.hasOwnProperty(vpc.relationship_type_id)) {
                  relationships[vpc.relationship_type_id] = [];
                }
                relationships[vpc.relationship_type_id].push(vpc.contact_id);
              });
              return relationships;
            });
          },
          location_blocks: function(crmApi) {
            return crmApi('VolunteerProject', 'locations', {});
          },
          profile_status: function(crmProfiles) {
            return crmProfiles.load();
          }
        }
      });
    }
  );


  angular.module('volunteer').controller('VolunteerProject', function($scope, $sce, $location, $q, $route, crmApi, crmUiAlert, crmUiHelp, countries, project, profile_status, campaigns, relationship_data, supporting_data, location_blocks, volBackbone) {

    /**
     * We use custom "dirty" logic rather than rely on Angular's native
     * functionality because we need to make a separate API call to
     * create/update the locBlock object (a distinct entity from the project)
     * if any of the locBlock fields have changed, regardless of whether other
     * form elements are dirty.
     */
    $scope.locBlockIsDirty = false;

    /**
     * This flag allows the code to distinguish between user- and
     * server-initiated changes to the locBlock fields. Without this flag, the
     * changes made to the locBlock fields when a location is fetched from the
     * server would cause the watch function to mark the locBlock dirty.
     */
    $scope.locBlockSkipDirtyCheck = false;

    var ts = $scope.ts = CRM.ts('org.civicrm.volunteer');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/Volunteer/Form/Volunteer'}); // See: templates/CRM/volunteer/Project.hlp

    var relationships = {};

    setFormDefaults = function() {
      if(project.id == 0) {

        project = _.extend(_.clone(supporting_data.values.defaults), project);
        relationships = _.clone(supporting_data.values.defaults.relationships);

        if (CRM.vars['org.civicrm.volunteer'].entityTable) {
          project.entity_table = CRM.vars['org.civicrm.volunteer'].entityTable;
          project.entity_id = CRM.vars['org.civicrm.volunteer'].entityId;
        }


        if (CRM.vars['org.civicrm.volunteer'].entityTitle) {
          project.title = CRM.vars['org.civicrm.volunteer'].entityTitle;
        }
      } else {
        relationships = relationship_data;
      }
    };

    setFormDefaults();


    if (CRM.checkPerm('edit volunteer project relationships')) {
      project.project_contacts = relationships;
    }

    if (CRM.vars['org.civicrm.volunteer'] && CRM.vars['org.civicrm.volunteer'].context) {
      $scope.formContext = CRM.vars['org.civicrm.volunteer'].context;
    } else {
      $scope.formContext = 'standAlone';
    }

    switch ($scope.formContext) {
      case 'eventTab':
        volBackbone.load();
        var cancelCallback = function (projectId) {
          CRM.$("body").trigger("volunteerProjectCancel");
        };
        var saveAndNextCallback = function (projectId) {
          CRM.$("body").trigger("volunteerProjectSaveComplete", projectId);
        };
        $scope.saveAndNextLabel = ts('Save');
        break;

      default:
        var cancelCallback = function (projectId) {
          $location.path("/volunteer/manage");
        };
        var saveAndNextCallback = function (projectId) {
          volBackbone.load().then(function () {
            CRM.volunteerPopup(ts('Define Volunteer Opportunities'), 'Define', projectId);
            $location.path("/volunteer/manage");
          });
        };
        $scope.saveAndNextLabel = ts('Continue');
    }

    $scope.countries = countries;
    $scope.locationBlocks = location_blocks.values;
    $scope.locationBlocks[0] = "Create a new Location";
    $scope.locBlock = {};


    if (!CRM.checkPerm('edit volunteer registration profiles')) {
      delete project.profiles;
    } else {
      $.each(project.profiles, function (key, data) {
        if(data.module_data && typeof(data.module_data) === "string") {
          data.module_data = JSON.parse(data.module_data);
        }
      });
    }

    $scope.campaigns = campaigns;
    $scope.relationship_types = supporting_data.values.relationship_types;
    $scope.phone_types = supporting_data.values.phone_types;
    $scope.supporting_data = supporting_data.values;
    $scope.profile_status = profile_status;
    project.is_active = (project.is_active == "1");
    $scope.project = project;
    $scope.profiles = $scope.project.profiles;
    $scope.relationships = $scope.project.project_contacts;
    $scope.showProfileBlock = CRM.checkPerm('edit volunteer registration profiles');
    $scope.showRelationshipBlock = CRM.checkPerm('edit volunteer project relationships');

    /**
     * Populates locBlock fields based on user selection of location.
     *
     * Makes an API request.
     *
     * @see $scope.locBlockIsDirty
     * @see $scope.locBlockSkipDirtyCheck
     */
    $scope.refreshLocBlock = function() {
      if (!!$scope.project.loc_block_id) {
        crmApi("VolunteerProject", "getlocblockdata", {
          "return": "all",
          "sequential": 1,
          "id": $scope.project.loc_block_id
        }).then(function(result) {
          if(!result.is_error) {
            $scope.locBlockSkipDirtyCheck = true;
            $scope.locBlock = result.values[0];
            $scope.locBlockIsDirty = false;
          } else {
            CRM.alert(result.error);
          }
        });
      }
    };

    $scope.refreshLocBlock();

    /**
     * If the user selects the option to create a new locBlock (id = 0), set
     * some defaults and display the necessary fields. Otherwise, fetch the
     * location data so we can display it for editing.
     */
    $scope.$watch('project.loc_block_id', function (newValue) {
      if (newValue == 0) {
        $scope.locBlock = {
          address: {
            country_id: _.findWhere(countries, {is_default: "1"}).id
          }
        };

        $("#crm-vol-location-block .crm-accordion-body").slideDown({complete: function() {
          $("#crm-vol-location-block .crm-accordion-wrapper").removeClass("collapsed");
        }});
      } else {

        $scope.refreshLocBlock();
      }
    });

    /**
     * @see $scope.locBlockIsDirty
     * @see $scope.locBlockSkipDirtyCheck
     */
    $scope.$watch('locBlock', function(newValue, oldValue) {
      if ($scope.locBlockSkipDirtyCheck) {
        $scope.locBlockSkipDirtyCheck = false;
      } else {
        $scope.locBlockIsDirty = true;
      }
    }, true);

    $scope.addProfile = function() {
      $scope.profiles.push({
        "entity_table": "civicrm_volunteer_project",
        "is_active": "1",
        "module": "CiviVolunteer",
        "module_data": {audience: "primary"},
        "weight": getMaxProfileWeight() + 1
      });
    };

    var getMaxProfileWeight = function() {
      var weights = [0];
      $.each($scope.profiles, function (index, data) {
        weights.push(parseInt(data.weight));
      });
      return _.max(weights);
    };

    $scope.removeProfile = function(index) {
      $scope.profiles.splice(index, 1);
    };

    $scope.validateProfileSelections = function() {
      var hasAdditionalProfileType = false;
      var hasPrimaryProfileType = false;
      var valid = true;

      if (!CRM.checkPerm('edit volunteer registration profiles')) {
        return valid;
      }

      if ($scope.profiles.length === 0) {
        CRM.alert(ts("You must select at least one Profile"), "Required");
        return false;
      }

      $.each($scope.profiles, function (index, data) {
        if(!data.uf_group_id) {
          CRM.alert(ts("Please select at least one profile, and remove empty selections"), "Required", 'error');
          valid = false;
        }

        if(data.module_data.audience == "additional" || data.module_data.audience == "both") {
          if(hasAdditionalProfileType) {
            CRM.alert(ts("You may only have one profile that is used for group registrations"), ts("Warning"), 'error');
            valid = false;
          } else {
            hasAdditionalProfileType = true;
          }
        }

        if (data.module_data.audience == "primary" || data.module_data.audience == "both") {
          hasPrimaryProfileType = true;
        }
      });

      if (!hasPrimaryProfileType) {
        CRM.alert(ts("Please select at least one profile that is used for individual registrations"), ts("Warning"), 'error');
        valid = false;
      }

      return valid;
    };

    $scope.validate = function() {
      var valid = true;
      var relationshipsValid = validateRelationships();

      if(!$scope.project.title) {
        CRM.alert(ts("Title is a required field"), "Required");
        valid = false;
      }

      valid = (valid && relationshipsValid && $scope.validateProfileSelections());

      return valid;
    };

  /**
   * Helper validation function.
   *
   * Ensures that a value is set for each required project relationship.
   *
   * @returns {Boolean}
   */
    validateRelationships = function() {
      var isValid = true;

      if (!CRM.checkPerm('edit volunteer project relationships')) {
        return isValid;
      }

      var requiredRelationshipTypes = ['volunteer_beneficiary', 'volunteer_manager', 'volunteer_owner'];

      _.each(requiredRelationshipTypes, function(value) {
        var thisRelType = _.find(supporting_data.values.relationship_types, function(relType) {
          return (relType.name === value);
        });

        if (_.isEmpty(relationships[thisRelType.value])) {
          CRM.alert(ts("The %1 relationship must not be blank.", {1: thisRelType.label}), ts("Required"));
          isValid = false;
        }
      });

      return isValid;
    };

    /**
     * Helper function which serves as a harness for the API calls which
     * constitute form submission.
     *
     * TODO: The value of loc_block_id is a little too magical. "" means the
     * location is empty. "0" means the location is new, i.e., about to be
     * created. Any other int-like string represents the ID of an existing
     * location. This magic could perhaps be encapsulated in a function whose
     * job it is to return an operation: "create" or "update."
     *
     * @returns {Mixed} Returns project ID on success, boolean FALSE on failure.
     */
    doSave = function() {
      if ($scope.validate()) {


        if ($scope.locBlockIsDirty && $scope.project.loc_block_id !== "") {

          $scope.locBlock.id = $scope.project.loc_block_id === "0" ? null : $scope.project.loc_block_id;
          return crmApi('VolunteerProject', 'savelocblock', $scope.locBlock).then(

            function (result) {
              $scope.project.loc_block_id = result.id;
              return _saveProject();
            },

            function(result) {
              crmUiAlert({text: ts('Failed to save location details. Project could not be saved.'), title: ts('Error'), type: 'error'});
              console.log('api.VolunteerProject.savelocblock failed with the following message: ' + result.error_message);
            }
          );
        } else {
          return _saveProject();
        }
      } else {
        return $q.reject(false);
      }
    };

    /**
     * Helper function which saves a volunteer project and creates a flexible
     * need if appropriate.
     *
     * @returns {Mixed} Returns project ID on success.
     */
    _saveProject = function() {


      if ($scope.project.loc_block_id === "0") {
        delete $scope.project.loc_block_id;
      }

      return crmApi('VolunteerProject', 'create', $scope.project).then(
        function(success) {
          return success.values.id;
        },
        function(fail) {
          var text = ts('Your submission was not saved. Resubmitting the form is unlikely to resolve this problem. Please contact a system administrator.');
          var title = ts('A technical problem has occurred');
          crmUiAlert({text: text, title: title, type: 'error'});
          console.log('api.VolunteerProject.create failed with the following message: ' + fail.error_message);
        }
      );
    };

    $scope.saveAndDone = function () {
      doSave().then(function (projectId) {
        if (projectId) {
          crmUiAlert({text: ts('Changes saved successfully'), title: ts('Saved'), type: 'success'});
          $location.path("/volunteer/manage");
        }
      });
    };

    $scope.saveAndNext = function() {
      doSave().then(function(projectId) {
        if (projectId) {
          crmUiAlert({text: ts('Changes saved successfully'), title: ts('Saved'), type: 'success'});
          saveAndNextCallback(projectId);
        }
      });
    };

    $scope.cancel = function() {
      cancelCallback();
    };

    $scope.previewDescription = function() {
      CRM.alert($scope.project.description, $scope.project.title, 'info', {expires: 0});
    };

    CRM.$("body").on("volunteerProjectRefresh", function() {
      $route.reload();
    });


  });




  angular.module('volunteer').config(function($routeProvider) {
      $routeProvider.when('/volunteer/manage', {
        controller: 'VolunteerProjects',
        templateUrl: '~/volunteer/Projects.html',


        resolve: {


          beneficiaries: function (crmApi) {
            return crmApi('VolunteerUtil', 'getbeneficiaries').then(function(data) {
              return data.values;
            }, function(error) {
              if (error.is_error) {
                CRM.alert(error.error_message, ts("Error"), "error");
              } else {
                return error;
              }
            });
          },
          projectData: function(crmApi) {
            return crmApi('VolunteerProject', 'get', {
              sequential: 1,
              context: 'edit',
              'api.VolunteerProjectContact.get': {
                relationship_type_id: "volunteer_beneficiary"
              },
              'api.VolunteerProject.getlocblockdata': {
                id: '$value.loc_block_id',
                options: {limit: 0},
                return: 'all',
                sequential: 1
              }
            }).then(function (data) {

              return _.each(data.values, function (element, index, list) {
                var beneficiaryIds = [];
                _.each(element['api.VolunteerProjectContact.get']['values'], function (el) {
                  beneficiaryIds.push(el.contact_id);
                });
                list[index].beneficiaries = beneficiaryIds;
              });
            });
          },
          campaigns: function(crmApi) {
            return crmApi('VolunteerUtil', 'getcampaigns').then(function(data) {
              return data.values;
            });
          },
          volunteerBackbone: function(volBackbone) {
            return volBackbone.load();
          }
        }
      });
    }
  );

  angular.module('volunteer').controller('VolunteerProjects', function ($scope, $filter, crmApi, crmStatus, crmUiHelp, projectData, $location, volunteerBackbone, beneficiaries, campaigns, $window) {

    var ts = $scope.ts = CRM.ts('org.civicrm.volunteer');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/volunteer/Projects'}); // See: templates/CRM/volunteer/Projects.hlp

    $scope.searchParams = {
      is_active: 1
    };
    $scope.projects = projectData;
    $scope.batchAction = "";
    $scope.allSelected = false;

    $scope.beneficiaries = beneficiaries;
    $scope.campaigns = campaigns;
    $scope.needBase = CRM.url("civicrm/volunteer/need");
    $scope.assignBase = CRM.url("civicrm/volunteer/assign");
    $scope.urlPublicVolOppSearch = CRM.url('civicrm/vol/', '', 'front') + '#/volunteer/opportunities';
    $scope.canAccessAllProjects = CRM.checkPerm('edit all volunteer projects') || CRM.checkPerm('delete all volunteer projects');

    $scope.associatedEntityTitle = function(project) {
      if (project.entity_attributes && project.entity_attributes.title) {
        return project.entity_attributes.title;
      } else {
        return '--';
      }
    };

    $scope.canLinkToAssociatedEntity = function(project) {


      return (project.entity_id && project.entity_table && project.entity_table !== 'null');
    };

    /**
     * Utility for stringifying locations which may have varying levels of detail.
     *
     * @param array project
     *   An item from the projectData provider.
     * @return string
     *   With HTML tags.
     */
    $scope.formatLocation = function (project) {
      var result = '';

      var locBlockData = project['api.VolunteerProject.getlocblockdata'].values;
      if (_.isEmpty(locBlockData)) {
        return result;
      }

      var address = locBlockData[0].address;
      if (_.isEmpty(address)) {
        return result;
      }

      if (address.street_address) {
        result += address.street_address;
      }

      if (address.street_address && (address.city || address.postal_code)) {
        result += '<br />';
      }

      if (address.city) {
        result += address.city;
      }

      if (address.city && address.postal_code) {
        result += ', ' + address.postal_code;
      } else if (address.postal_code) {
        result += address.postal_code;
      }

      return result;
    };



    $scope.formatBeneficiaries = function (project) {
      var displayNames = [];

      _.each(project.beneficiaries, function (item) {
        displayNames.push($scope.beneficiaries[item].display_name);
      });

      return displayNames.sort().join('<br />');
    };

    $scope.linkToAssociatedEntity = function(project) {
      if(project.entity_id && project.entity_table) {
        var url = false;
        switch(project.entity_table) {
          case 'civicrm_event':
            url = CRM.url("civicrm/event/manage/settings", "reset=1&action=update&id=" + project.entity_id);
            break;
          default:
            CRM.alert(ts("We couldn't find a link to this item"));
            break;
        }

        if(url) {
          $window.open(url, "_blank");
        }
      }
    };

    $scope.showLogHours = function() {
      var url = CRM.url("civicrm/volunteer/loghours", "reset=1&action=add&vid=" + this.project.id);
      var settings = {"dialog":{"width":"85%", "height":"80%"}};
      CRM.loadForm(url, settings);
    };

    $scope.showRoster = function() {
      var url = CRM.url("civicrm/volunteer/roster", "project_id=" + this.project.id);
      var settings = {"dialog":{"width":"85%", "height":"80%"}};
      CRM.loadPage(url, settings);
    };

    $scope.backbonePopup = function(title, tab, projectId) {
      CRM.volunteerPopup(title, tab, projectId);
    };

    $scope.clearCampaign = function() {
      if ($scope.searchParams.campaign_id == "") {
        delete $scope.searchParams.campaign_id;
      }
    };

    $scope.batchActions = {
      "enable": {
        label: ts("Enable"),
        run: function() {
          CRM.confirm({message: ts("Are you sure you want to Enable the selected Projects?")})
            .on('crmConfirm:yes', function() {
              $.each($scope.projects, function (index, project) {
                if (project.selected) {
                  project.is_active = 1;
                  crmApi("VolunteerProject", "create", {id: project.id, is_active: project.is_active}, true);
                }
              });
              $scope.$apply();
            });
        }
      },
      "disable": {
        label: ts("Disable"),
        run: function() {
          CRM.confirm({message: ts("Are you sure you want to Disable the selected Projects?")})
            .on('crmConfirm:yes', function() {
              $.each($scope.projects, function (index, project) {
                if (project.selected) {
                  project.is_active = 0;
                  crmApi("VolunteerProject", "create", {id: project.id, is_active: project.is_active}, true);
                }
              });
              $scope.$apply();
            });
        }
      },
      "delete": {
        label: ts("Delete"),
        run: function() {
          CRM.confirm({message: ts("Are you sure you want to Delete the selected Projects?")})
            .on('crmConfirm:yes', function() {
              $.each($scope.projects, function (index, project) {
                if (project.selected) {
                  crmApi("VolunteerProject", "delete", {id: project.id}, true).then(function() {
                    $scope.projects.splice(index, 1);
                  });
                }
              });
            });
        }
      }
    };
    $scope.runBatch = function() {
      if(!!$scope.batchAction) {
        $scope.batchActions[$scope.batchAction].run();
      }
    };

    /**
     * Keeps the "select all" checkbox synced with the project checkboxes.
     *
     * Additions to/subtractions from the selected set will cause the "select
     * all" checkbox to be checked or unchecked as appropriate.
     */
    $scope.watchSelected = function() {
      var all = true;
      var filter = $filter('filter');
      var projectsInView = filter($scope.projects, $scope.searchParams);

      $.each(projectsInView, function(index, project) {
        all = (all && project.selected);
      });
      $scope.allSelected = all;
    };

    /**
     * Handles clicks of the "select all" checkbox.
     *
     * When clicked, all visible projects are selected. When unclicked, they are
     * deselected.
     */
    $scope.selectAll = function() {
      var filter = $filter('filter');
      var projectsInView = filter($scope.projects, $scope.searchParams);
      var toggle = $scope.allSelected;

      $.each(projectsInView, function(index, project) {
        project.selected = toggle;
      });
    };

    /**
     * Reset the checkboxes whenever the search criteria are changed. Eliminates
     * the possibility of accidental deletions by ensuring that selections for
     * bulk operations are always visible.
     */
    $scope.$watch('searchParams', function() {
      $scope.allSelected = false;
      $.each($scope.projects, function(index, project) {
        project.selected = false;
      });
    }, true);
  });




  angular.module('volunteer').config(function ($routeProvider) {
    $routeProvider.when('/volunteer/opportunities', {
      controller: 'VolOppsCtrl',

      reloadOnSearch: false,
      templateUrl: '~/volunteer/VolOppsCtrl.html',
      resolve: {
        countries: function(crmApi) {
          return crmApi('VolunteerUtil', 'getcountries', {}).then(function(result) {
            return result.values;
          });
        },



        settings: function (crmApi) {
          return {
            volunteer_floating_cart_enabled: true,
            volunteer_show_cart_contents: false
          };
        },
        supporting_data: function(crmApi) {
          return crmApi('VolunteerUtil', 'getsupportingdata', {
            controller: 'VolOppsCtrl'
          });
        }
      }
    });
  });

  angular.module('volunteer').controller('VolOppsCtrl', function ($route, $scope, $window, $timeout, crmStatus, crmUiHelp, volOppSearch, countries, settings, supporting_data) {

    var ts = $scope.ts = CRM.ts('org.civicrm.volunteer');
    var hs = $scope.hs = crmUiHelp({file: 'ang/VolOppsCtrl'}); // See: templates/ang/VolOppsCtrl.hlp

    var volOppsInCart = {};
    $scope.shoppingCart = volOppsInCart;
    $scope.showCartContents = settings.volunteer_show_cart_contents;

    volOppSearch.search();

    $scope.hideSearch = false;
    $scope.allowShowSearch = false;
    if ($route.current.params.hasOwnProperty('hideSearch')) {
      if ($route.current.params.hideSearch === "always") {
        $scope.hideSearch = true;
        $scope.allowShowSearch = false;
      }
      if ($route.current.params.hideSearch === "1") {
        $scope.hideSearch = true;
        $scope.allowShowSearch = true;
      }
    }


    $scope.countries = countries;
    $scope.roles = supporting_data.values.roles;
    $scope.searchParams = volOppSearch.params;
    $scope.volOppData = volOppSearch.results;

    $scope.checkout = function () {
      if ($route.current.params.hasOwnProperty('dest') && $route.current.params.dest) {
        var dest = $route.current.params.dest;
      } else {
        var dest = 'list';
      }

      var path = 'civicrm/volunteer/signup';
      var query = {
        reset: 1,
        needs: _.keys(volOppsInCart),
        dest: dest
      };

      $window.location.href = CRM.url(path, query);
    };

    /**
     * Provides help text for the "shopping cart."
     *
     * @returns {String}
     */
    $scope.helpText = function () {
      var help = '';

      if (!$scope.hideSearch) {
        help += ts("Use this search form to find the volunteer opportunity near you that best matches with your personal skill set, interests, and time availability.");
      }

      help += ' ' + ts('Click the checkbox for each volunteer opportunity you wish to add to your schedule, then click the "Sign Up!" button to supply your contact information and complete your registration.');

      return help;
    };

    /**
     * Returns true if a proximity search has been started; else false.
     * This function ignores units because they shouldn't be used to calculate
     * if a proximity search is started. Because otherwise units is marked as required
     * and there is no way to stop seraching by proximity
     *
     * @returns {Boolean}
     */
    var checkIsProximitySearch = function() {

      return _.reduce($scope.searchParams.proximity, function(previous, value, key) {

        if ( key === "unit") {
          return previous;
        } else {
          return (previous || !!value);
        }

      }, false);
    };

    $scope.isProximitySearch = checkIsProximitySearch();




    $scope.$watch('searchParams.proximity', function(){
      $scope.isProximitySearch = checkIsProximitySearch();
    }, true);

    $scope.showSearch = function() {
      $scope.hideSearch = false;
      $scope.allowShowSearch = false;
    };

    $scope.search = function () {
      if (!$scope.isProximitySearch) {





        $scope.searchParams.proximity = {};
      }
      return crmStatus(
        {start: ts('Searching...'), success: ts('Search complete')},
        volOppSearch.search()
      );
    };

    $scope.showProjectDescription = function (project) {
      var description = project.description;
      var addressBlock = '';
      var campaignBlock = '';

      if (project.hasOwnProperty('campaign_title') && !_.isEmpty(project.campaign_title)) {
        campaignBlock = '<p><strong>' + ts('Campaign:') + '</strong><br />' + project.campaign_title + '</p>';
      }

      if (project.hasOwnProperty('location')) {
        if (!_.isEmpty(project.location.street_address)) {
          addressBlock += project.location.street_address + '<br />';
        }
        if (!_.isEmpty(project.location.city)) {
          addressBlock += project.location.city + '<br />';
        }
        if (!_.isEmpty(project.location.postal_code)) {
          addressBlock += project.location.postal_code;
        }
      }
      if (!_.isEmpty(addressBlock)) {
        addressBlock = '<p><strong>Location:</strong><br />' + addressBlock + '</p>';
      }
      CRM.alert(description + campaignBlock + addressBlock, project.title, 'info', {expires: 0});
    };

    $scope.showRoleDescription = function (need) {
      CRM.alert(need.role_description, need.role_label, 'info', {expires: 0});
    };

    $scope.toggleSelection = function (need) {
      need.inCart = !need.hasOwnProperty('inCart') ? true : !need.inCart;

      var delay = 500;
      var animSrc = (need.inCart) ? ".crm-vol-opp-need-" + need.id : ".crm-vol-opp-cart .ui-widget-content";
      var animTarget = (need.inCart) ? ".crm-vol-opp-cart .ui-widget-content" : ".crm-vol-opp-need-" + need.id;

      if ($scope.showCartContents) {
        animSrc = (need.inCart) ? ".crm-vol-opp-need-" + need.id : ".crm-vol-opp-cart-need-" + need.id;
        animTarget = (need.inCart) ? ".crm-vol-opp-cart-list tr:last" : ".crm-vol-opp-need-" + need.id;
      }
      $(animSrc).effect( "transfer", { className: 'crm-vol-opp-cart-transfer', to: $( animTarget ) }, delay);

      $timeout(function() {
      if (need.inCart) {
        volOppsInCart[need.id] = need;
      } else {
        delete volOppsInCart[need.id];
      }
      }, delay);
    };

    $scope.toggleCartList = function () {
      $scope.showCartContents = !$scope.showCartContents;
    };

    $scope.$watch('shoppingCart', function(oldValue, newValue) {
      $scope.itemCountInCart = _.size($scope.shoppingCart);
    }, true);

    $scope.proximityUnits = [
      {value: 'km', label: ts('km')},
      {value: 'miles', label: ts('miles')}
    ];

    $scope.cartIsFloating = false;

    if (settings.volunteer_floating_cart_enabled) {
      var cartDelay = 200;

      var cartTop = $("div.crm-vol-opp-cart").offset().top;
      $(window).on("scroll", function (e) {
        var cartShouldFloat = ($(window).scrollTop() > cartTop);
        if ($scope.cartIsFloating !== cartShouldFloat) {
          $(".crm-vol-opp-cart").fadeOut(cartDelay);
          $timeout(function () {
            $scope.cartIsFloating = cartShouldFloat;
            $(".crm-vol-opp-cart").fadeIn(cartDelay);
          }, cartDelay);
        }
      });
    }
  });

})(angular, CRM.$, CRM._);
