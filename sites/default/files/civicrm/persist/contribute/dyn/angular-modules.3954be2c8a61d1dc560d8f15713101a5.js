/*
 angular-file-upload v1.1.6
 https://github.com/nervgh/angular-file-upload
*/

!function(a,b){return"function"==typeof define&&define.amd?void define("angular-file-upload",["angular"],function(a){return b(a)}):b(a)}("undefined"==typeof angular?null:angular,function(a){var b=a.module("angularFileUpload",[]);return b.value("fileUploaderOptions",{url:"/",alias:"file",headers:{},queue:[],progress:0,autoUpload:!1,removeAfterUpload:!1,method:"POST",filters:[],formData:[],queueLimit:Number.MAX_VALUE,withCredentials:!1}).factory("FileUploader",["fileUploaderOptions","$rootScope","$http","$window","$compile",function(b,c,d,e,f){function g(c){var d=a.copy(b);a.extend(this,d,c,{isUploading:!1,_nextIndex:0,_failFilterIndex:-1,_directives:{select:[],drop:[],over:[]}}),this.filters.unshift({name:"queueLimit",fn:this._queueLimitFilter}),this.filters.unshift({name:"folder",fn:this._folderFilter})}function h(b){var c=a.isElement(b),d=c?b.value:b,e=a.isString(d)?"FakePath":"Object",f="_createFrom"+e;this[f](d)}function i(b,c,d){var e=a.isElement(c),f=e?a.element(c):null,h=e?null:c;a.extend(this,{url:b.url,alias:b.alias,headers:a.copy(b.headers),formData:a.copy(b.formData),removeAfterUpload:b.removeAfterUpload,withCredentials:b.withCredentials,method:b.method},d,{uploader:b,file:new g.FileLikeObject(c),isReady:!1,isUploading:!1,isUploaded:!1,isSuccess:!1,isCancel:!1,isError:!1,progress:0,index:null,_file:h,_input:f}),f&&this._replaceNode(f)}function j(b){a.extend(this,b),this.uploader._directives[this.prop].push(this),this._saveLinks(),this.bind()}function k(a){k.super_.apply(this,arguments),this.uploader.isHTML5||this.element.removeAttr("multiple"),this.element.prop("value",null)}function l(a){l.super_.apply(this,arguments)}function m(a){m.super_.apply(this,arguments)}return g.prototype.isHTML5=!(!e.File||!e.FormData),g.prototype.addToQueue=function(b,c,d){var e=this.isArrayLikeObject(b)?b:[b],f=this._getFilters(d),h=this.queue.length,i=[];a.forEach(e,function(a){var b=new g.FileLikeObject(a);if(this._isValidFile(b,f,c)){var d=new g.FileItem(this,a,c);i.push(d),this.queue.push(d),this._onAfterAddingFile(d)}else{var e=f[this._failFilterIndex];this._onWhenAddingFileFailed(b,e,c)}},this),this.queue.length!==h&&(this._onAfterAddingAll(i),this.progress=this._getTotalProgress()),this._render(),this.autoUpload&&this.uploadAll()},g.prototype.removeFromQueue=function(a){var b=this.getIndexOfItem(a),c=this.queue[b];c.isUploading&&c.cancel(),this.queue.splice(b,1),c._destroy(),this.progress=this._getTotalProgress()},g.prototype.clearQueue=function(){for(;this.queue.length;)this.queue[0].remove();this.progress=0},g.prototype.uploadItem=function(a){var b=this.getIndexOfItem(a),c=this.queue[b],d=this.isHTML5?"_xhrTransport":"_iframeTransport";c._prepareToUploading(),this.isUploading||(this.isUploading=!0,this[d](c))},g.prototype.cancelItem=function(a){var b=this.getIndexOfItem(a),c=this.queue[b],d=this.isHTML5?"_xhr":"_form";c&&c.isUploading&&c[d].abort()},g.prototype.uploadAll=function(){var b=this.getNotUploadedItems().filter(function(a){return!a.isUploading});b.length&&(a.forEach(b,function(a){a._prepareToUploading()}),b[0].upload())},g.prototype.cancelAll=function(){var b=this.getNotUploadedItems();a.forEach(b,function(a){a.cancel()})},g.prototype.isFile=function(a){var b=e.File;return b&&a instanceof b},g.prototype.isFileLikeObject=function(a){return a instanceof g.FileLikeObject},g.prototype.isArrayLikeObject=function(b){return a.isObject(b)&&"length"in b},g.prototype.getIndexOfItem=function(b){return a.isNumber(b)?b:this.queue.indexOf(b)},g.prototype.getNotUploadedItems=function(){return this.queue.filter(function(a){return!a.isUploaded})},g.prototype.getReadyItems=function(){return this.queue.filter(function(a){return a.isReady&&!a.isUploading}).sort(function(a,b){return a.index-b.index})},g.prototype.destroy=function(){a.forEach(this._directives,function(b){a.forEach(this._directives[b],function(a){a.destroy()},this)},this)},g.prototype.onAfterAddingAll=function(a){},g.prototype.onAfterAddingFile=function(a){},g.prototype.onWhenAddingFileFailed=function(a,b,c){},g.prototype.onBeforeUploadItem=function(a){},g.prototype.onProgressItem=function(a,b){},g.prototype.onProgressAll=function(a){},g.prototype.onSuccessItem=function(a,b,c,d){},g.prototype.onErrorItem=function(a,b,c,d){},g.prototype.onCancelItem=function(a,b,c,d){},g.prototype.onCompleteItem=function(a,b,c,d){},g.prototype.onCompleteAll=function(){},g.prototype._getTotalProgress=function(a){if(this.removeAfterUpload)return a||0;var b=this.getNotUploadedItems().length,c=b?this.queue.length-b:this.queue.length,d=100/this.queue.length,e=(a||0)*d/100;return Math.round(c*d+e)},g.prototype._getFilters=function(b){if(a.isUndefined(b))return this.filters;if(a.isArray(b))return b;var c=b.match(/[^\s,]+/g);return this.filters.filter(function(a){return-1!==c.indexOf(a.name)},this)},g.prototype._render=function(){c.$$phase||c.$apply()},g.prototype._folderFilter=function(a){return!(!a.size&&!a.type)},g.prototype._queueLimitFilter=function(){return this.queue.length<this.queueLimit},g.prototype._isValidFile=function(a,b,c){return this._failFilterIndex=-1,b.length?b.every(function(b){return this._failFilterIndex++,b.fn.call(this,a,c)},this):!0},g.prototype._isSuccessCode=function(a){return a>=200&&300>a||304===a},g.prototype._transformResponse=function(b,c){var e=this._headersGetter(c);return a.forEach(d.defaults.transformResponse,function(a){b=a(b,e)}),b},g.prototype._parseHeaders=function(b){var c,d,e,f={};return b?(a.forEach(b.split("\n"),function(a){e=a.indexOf(":"),c=a.slice(0,e).trim().toLowerCase(),d=a.slice(e+1).trim(),c&&(f[c]=f[c]?f[c]+", "+d:d)}),f):f},g.prototype._headersGetter=function(a){return function(b){return b?a[b.toLowerCase()]||null:a}},g.prototype._xhrTransport=function(b){var c=b._xhr=new XMLHttpRequest,d=new FormData,e=this;if(e._onBeforeUploadItem(b),a.forEach(b.formData,function(b){a.forEach(b,function(a,b){d.append(b,a)})}),"number"!=typeof b._file.size)throw new TypeError("The file specified is no longer valid");d.append(b.alias,b._file,b.file.name),c.upload.onprogress=function(a){var c=Math.round(a.lengthComputable?100*a.loaded/a.total:0);e._onProgressItem(b,c)},c.onload=function(){var a=e._parseHeaders(c.getAllResponseHeaders()),d=e._transformResponse(c.response,a),f=e._isSuccessCode(c.status)?"Success":"Error",g="_on"+f+"Item";e[g](b,d,c.status,a),e._onCompleteItem(b,d,c.status,a)},c.onerror=function(){var a=e._parseHeaders(c.getAllResponseHeaders()),d=e._transformResponse(c.response,a);e._onErrorItem(b,d,c.status,a),e._onCompleteItem(b,d,c.status,a)},c.onabort=function(){var a=e._parseHeaders(c.getAllResponseHeaders()),d=e._transformResponse(c.response,a);e._onCancelItem(b,d,c.status,a),e._onCompleteItem(b,d,c.status,a)},c.open(b.method,b.url,!0),c.withCredentials=b.withCredentials,a.forEach(b.headers,function(a,b){c.setRequestHeader(b,a)}),c.send(d),this._render()},g.prototype._iframeTransport=function(b){var c=a.element('<form style="display: none;" />'),d=a.element('<iframe name="iframeTransport'+Date.now()+'">'),e=b._input,f=this;b._form&&b._form.replaceWith(e),b._form=c,f._onBeforeUploadItem(b),e.prop("name",b.alias),a.forEach(b.formData,function(b){a.forEach(b,function(b,d){var e=a.element('<input type="hidden" name="'+d+'" />');e.val(b),c.append(e)})}),c.prop({action:b.url,method:"POST",target:d.prop("name"),enctype:"multipart/form-data",encoding:"multipart/form-data"}),d.bind("load",function(){try{var a=d[0].contentDocument.body.innerHTML}catch(c){}var e={response:a,status:200,dummy:!0},g={},h=f._transformResponse(e.response,g);f._onSuccessItem(b,h,e.status,g),f._onCompleteItem(b,h,e.status,g)}),c.abort=function(){var a,g={status:0,dummy:!0},h={};d.unbind("load").prop("src","javascript:false;"),c.replaceWith(e),f._onCancelItem(b,a,g.status,h),f._onCompleteItem(b,a,g.status,h)},e.after(c),c.append(e).append(d),c[0].submit(),this._render()},g.prototype._onWhenAddingFileFailed=function(a,b,c){this.onWhenAddingFileFailed(a,b,c)},g.prototype._onAfterAddingFile=function(a){this.onAfterAddingFile(a)},g.prototype._onAfterAddingAll=function(a){this.onAfterAddingAll(a)},g.prototype._onBeforeUploadItem=function(a){a._onBeforeUpload(),this.onBeforeUploadItem(a)},g.prototype._onProgressItem=function(a,b){var c=this._getTotalProgress(b);this.progress=c,a._onProgress(b),this.onProgressItem(a,b),this.onProgressAll(c),this._render()},g.prototype._onSuccessItem=function(a,b,c,d){a._onSuccess(b,c,d),this.onSuccessItem(a,b,c,d)},g.prototype._onErrorItem=function(a,b,c,d){a._onError(b,c,d),this.onErrorItem(a,b,c,d)},g.prototype._onCancelItem=function(a,b,c,d){a._onCancel(b,c,d),this.onCancelItem(a,b,c,d)},g.prototype._onCompleteItem=function(b,c,d,e){b._onComplete(c,d,e),this.onCompleteItem(b,c,d,e);var f=this.getReadyItems()[0];return this.isUploading=!1,a.isDefined(f)?void f.upload():(this.onCompleteAll(),this.progress=this._getTotalProgress(),void this._render())},g.isFile=g.prototype.isFile,g.isFileLikeObject=g.prototype.isFileLikeObject,g.isArrayLikeObject=g.prototype.isArrayLikeObject,g.isHTML5=g.prototype.isHTML5,g.inherit=function(a,b){a.prototype=Object.create(b.prototype),a.prototype.constructor=a,a.super_=b},g.FileLikeObject=h,g.FileItem=i,g.FileDirective=j,g.FileSelect=k,g.FileDrop=l,g.FileOver=m,h.prototype._createFromFakePath=function(a){this.lastModifiedDate=null,this.size=null,this.type="like/"+a.slice(a.lastIndexOf(".")+1).toLowerCase(),this.name=a.slice(a.lastIndexOf("/")+a.lastIndexOf("\\")+2)},h.prototype._createFromObject=function(b){this.lastModifiedDate=a.copy(b.lastModifiedDate),this.size=b.size,this.type=b.type,this.name=b.name},i.prototype.upload=function(){try{this.uploader.uploadItem(this)}catch(a){this.uploader._onCompleteItem(this,"",0,[]),this.uploader._onErrorItem(this,"",0,[])}},i.prototype.cancel=function(){this.uploader.cancelItem(this)},i.prototype.remove=function(){this.uploader.removeFromQueue(this)},i.prototype.onBeforeUpload=function(){},i.prototype.onProgress=function(a){},i.prototype.onSuccess=function(a,b,c){},i.prototype.onError=function(a,b,c){},i.prototype.onCancel=function(a,b,c){},i.prototype.onComplete=function(a,b,c){},i.prototype._onBeforeUpload=function(){this.isReady=!0,this.isUploading=!0,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!1,this.isError=!1,this.progress=0,this.onBeforeUpload()},i.prototype._onProgress=function(a){this.progress=a,this.onProgress(a)},i.prototype._onSuccess=function(a,b,c){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!0,this.isCancel=!1,this.isError=!1,this.progress=100,this.index=null,this.onSuccess(a,b,c)},i.prototype._onError=function(a,b,c){this.isReady=!1,this.isUploading=!1,this.isUploaded=!0,this.isSuccess=!1,this.isCancel=!1,this.isError=!0,this.progress=0,this.index=null,this.onError(a,b,c)},i.prototype._onCancel=function(a,b,c){this.isReady=!1,this.isUploading=!1,this.isUploaded=!1,this.isSuccess=!1,this.isCancel=!0,this.isError=!1,this.progress=0,this.index=null,this.onCancel(a,b,c)},i.prototype._onComplete=function(a,b,c){this.onComplete(a,b,c),this.removeAfterUpload&&this.remove()},i.prototype._destroy=function(){this._input&&this._input.remove(),this._form&&this._form.remove(),delete this._form,delete this._input},i.prototype._prepareToUploading=function(){this.index=this.index||++this.uploader._nextIndex,this.isReady=!0},i.prototype._replaceNode=function(a){var b=f(a.clone())(a.scope());b.prop("value",null),a.css("display","none"),a.after(b)},j.prototype.events={},j.prototype.bind=function(){for(var a in this.events){var b=this.events[a];this.element.bind(a,this[b])}},j.prototype.unbind=function(){for(var a in this.events)this.element.unbind(a,this.events[a])},j.prototype.destroy=function(){var a=this.uploader._directives[this.prop].indexOf(this);this.uploader._directives[this.prop].splice(a,1),this.unbind()},j.prototype._saveLinks=function(){for(var a in this.events){var b=this.events[a];this[b]=this[b].bind(this)}},g.inherit(k,j),k.prototype.events={$destroy:"destroy",change:"onChange"},k.prototype.prop="select",k.prototype.getOptions=function(){},k.prototype.getFilters=function(){},k.prototype.isEmptyAfterSelection=function(){return!!this.element.attr("multiple")},k.prototype.onChange=function(){var a=this.uploader.isHTML5?this.element[0].files:this.element[0],b=this.getOptions(),c=this.getFilters();this.uploader.isHTML5||this.destroy(),this.uploader.addToQueue(a,b,c),this.isEmptyAfterSelection()&&this.element.prop("value",null)},g.inherit(l,j),l.prototype.events={$destroy:"destroy",drop:"onDrop",dragover:"onDragOver",dragleave:"onDragLeave"},l.prototype.prop="drop",l.prototype.getOptions=function(){},l.prototype.getFilters=function(){},l.prototype.onDrop=function(b){var c=this._getTransfer(b);if(c){var d=this.getOptions(),e=this.getFilters();this._preventAndStop(b),a.forEach(this.uploader._directives.over,this._removeOverClass,this),this.uploader.addToQueue(c.files,d,e)}},l.prototype.onDragOver=function(b){var c=this._getTransfer(b);this._haveFiles(c.types)&&(c.dropEffect="copy",this._preventAndStop(b),a.forEach(this.uploader._directives.over,this._addOverClass,this))},l.prototype.onDragLeave=function(b){b.currentTarget===this.element[0]&&(this._preventAndStop(b),a.forEach(this.uploader._directives.over,this._removeOverClass,this))},l.prototype._getTransfer=function(a){return a.dataTransfer?a.dataTransfer:a.originalEvent.dataTransfer},l.prototype._preventAndStop=function(a){a.preventDefault(),a.stopPropagation()},l.prototype._haveFiles=function(a){return a?a.indexOf?-1!==a.indexOf("Files"):a.contains?a.contains("Files"):!1:!1},l.prototype._addOverClass=function(a){a.addOverClass()},l.prototype._removeOverClass=function(a){a.removeOverClass()},g.inherit(m,j),m.prototype.events={$destroy:"destroy"},m.prototype.prop="over",m.prototype.overClass="nv-file-over",m.prototype.addOverClass=function(){this.element.addClass(this.getOverClass())},m.prototype.removeOverClass=function(){this.element.removeClass(this.getOverClass())},m.prototype.getOverClass=function(){return this.overClass},g}]).directive("nvFileSelect",["$parse","FileUploader",function(a,b){return{link:function(c,d,e){var f=c.$eval(e.uploader);if(!(f instanceof b))throw new TypeError('"Uploader" must be an instance of FileUploader');var g=new b.FileSelect({uploader:f,element:d});g.getOptions=a(e.options).bind(g,c),g.getFilters=function(){return e.filters}}}}]).directive("nvFileDrop",["$parse","FileUploader",function(a,b){return{link:function(c,d,e){var f=c.$eval(e.uploader);if(!(f instanceof b))throw new TypeError('"Uploader" must be an instance of FileUploader');if(f.isHTML5){var g=new b.FileDrop({uploader:f,element:d});g.getOptions=a(e.options).bind(g,c),g.getFilters=function(){return e.filters}}}}}]).directive("nvFileOver",["FileUploader",function(a){return{link:function(b,c,d){var e=b.$eval(d.uploader);if(!(e instanceof a))throw new TypeError('"Uploader" must be an instance of FileUploader');var f=new a.FileOver({uploader:e,element:c});f.getOverClass=function(){return d.overClass||this.overClass}}}}]),b});

/*! 
* angular-paging v2.2.2 by Brant Wills - MIT licensed 
* https://github.com/brantwills/Angular-Paging.git 
*/
angular.module("bw.paging",[]).directive("paging",function(){function a(a,b,c){a.$watchCollection("[page,pageSize,total,disabled]",function(){l(a,c)})}function b(a,b){return'<ul data-ng-hide="Hide" data-ng-class="ulClass"> <li title="{{Item.title}}" data-ng-class="Item.liClass" data-ng-repeat="Item in List"> <a '+(b.pgHref?'data-ng-href="{{Item.pgHref}}" ':"href ")+'data-ng-class="Item.aClass" data-ng-click="Item.action()" data-ng-bind="Item.value"></a> </li></ul>'}function c(a,b){a.List=[],a.Hide=!1,a.page=parseInt(a.page)||1,a.total=parseInt(a.total)||0,a.adjacent=parseInt(a.adjacent)||2,a.pgHref=a.pgHref||"",a.dots=a.dots||"...",a.ulClass=a.ulClass||"pagination",a.activeClass=a.activeClass||"active",a.disabledClass=a.disabledClass||"disabled",a.textFirst=a.textFirst||"<<",a.textLast=a.textLast||">>",a.textNext=a.textNext||">",a.textPrev=a.textPrev||"<",a.textFirstClass=a.textFirstClass||"",a.textLastClass=a.textLastClass||"",a.textNextClass=a.textNextClass||"",a.textPrevClass=a.textPrevClass||"",a.textTitlePage=a.textTitlePage||"Page {page}",a.textTitleFirst=a.textTitleFirst||"First Page",a.textTitleLast=a.textTitleLast||"Last Page",a.textTitleNext=a.textTitleNext||"Next Page",a.textTitlePrev=a.textTitlePrev||"Previous Page",a.hideIfEmpty=d(a,b.hideIfEmpty),a.showPrevNext=d(a,b.showPrevNext),a.showFirstLast=d(a,b.showFirstLast),a.scrollTop=d(a,b.scrollTop),a.isDisabled=d(a,b.disabled)}function d(a,b){return angular.isDefined(b)?!!a.$parent.$eval(b):!1}function e(a,b){a.page>b&&(a.page=b),a.page<=0&&(a.page=1),a.adjacent<=0&&(a.adjacent=2),1>=b&&(a.Hide=a.hideIfEmpty)}function f(a,b){a.page!=b&&(a.isDisabled||(a.page=b,a.pagingAction({page:a.page,pageSize:a.pageSize,total:a.total}),a.scrollTop&&scrollTo(0,0)))}function g(a,b,c){if(!(!a.showPrevNext&&!a.showFirstLast||1>b)){var d,e,g;if("prev"===c){d=a.page-1<=0;var h=a.page-1<=0?1:a.page-1;a.showFirstLast&&(e={value:a.textFirst,title:a.textTitleFirst,aClass:a.textFirstClass,page:1}),a.showPrevNext&&(g={value:a.textPrev,title:a.textTitlePrev,aClass:a.textPrevClass,page:h})}else{d=a.page+1>b;var i=a.page+1>=b?b:a.page+1;a.showPrevNext&&(e={value:a.textNext,title:a.textTitleNext,aClass:a.textNextClass,page:i}),a.showFirstLast&&(g={value:a.textLast,title:a.textTitleLast,aClass:a.textLastClass,page:b})}var j=function(b,c){return{title:b.title,aClass:b.aClass,value:b.aClass?"":b.value,liClass:c?a.disabledClass:"",pgHref:c?"":a.pgHref.replace(m,b.page),action:function(){c||f(a,b.page)}}};if(a.isDisabled&&(d=!0),e){var k=j(e,d);a.List.push(k)}if(g){var l=j(g,d);a.List.push(l)}}}function h(a,b,c){var d=0;for(d=a;b>=d;d++){var e=c.pgHref.replace(m,d),g=c.page==d?c.activeClass:"";c.isDisabled&&(e="",g=c.disabledClass),c.List.push({value:d,title:c.textTitlePage.replace(m,d),liClass:g,pgHref:e,action:function(){f(c,this.value)}})}}function i(a){a.List.push({value:a.dots,liClass:a.disabledClass})}function j(a,b){h(1,2,a),3!=b&&i(a)}function k(a,b,c){c!=a-2&&i(b),h(a-1,a,b)}function l(a,b){(!a.pageSize||a.pageSize<=0)&&(a.pageSize=1);var d=Math.ceil(a.total/a.pageSize);c(a,b),e(a,d);var f,i,l=2*a.adjacent+2;g(a,d,"prev"),l+2>=d?(f=1,h(f,d,a)):a.page-a.adjacent<=2?(f=1,i=1+l,h(f,i,a),k(d,a,i)):a.page<d-(a.adjacent+2)?(f=a.page-a.adjacent,i=a.page+a.adjacent,j(a,f),h(f,i,a),k(d,a,i)):(f=d-l,i=d,j(a,f),h(f,i,a)),g(a,d,"next")}var m=/\{page\}/g;return{restrict:"EA",link:a,template:b,scope:{page:"=",pageSize:"=",total:"=",disabled:"@",dots:"@",ulClass:"@",activeClass:"@",disabledClass:"@",adjacent:"@",pagingAction:"&",pgHref:"@",textFirst:"@",textLast:"@",textNext:"@",textPrev:"@",textFirstClass:"@",textLastClass:"@",textNextClass:"@",textPrevClass:"@",textTitlePage:"@",textTitleFirst:"@",textTitleLast:"@",textTitleNext:"@",textTitlePrev:"@"}}});
(function(angular, $, _) {
  angular.module('civicase', CRM.angRequires('civicase'));


  angular.module('civicase').directive('civicaseActions', function(dialogService) {
    return {
      restrict: 'A',
      template:
      '<li ng-class="{disabled: !isActionEnabled(action)}" ng-if="isActionAllowed(action)" ng-repeat="action in caseActions">' +
      '  <a href ng-click="doAction(action)"><i class="fa {{action.icon}}"></i> {{ action.title }}</a>' +
      '</li>',
      scope: {
        cases: '=civicaseActions',
        refresh: '=refreshCallback',
        popupParams: '='
      },
      link: function($scope, element, attributes) {
        var ts = CRM.ts('civicase');
        var multi = $scope.multi = attributes.multiple;

        $scope.isActionEnabled = function(action) {
          return (!action.number || $scope.cases.length == action.number);
        };

        $scope.isActionAllowed = function(action) {
          return (!action.number || ((multi && action.number > 1) || (!multi && action.number === 1)));
        };

        $scope.doAction = function(action) {
          if (!$scope.isActionEnabled(action)) {
            return;
          }

          var result = $scope.$eval(action.action, {

            editTags: function(item) {
              var model = {
                tags: []
              },
                keys = ['tags'];
              _.each(CRM.civicase.tagsets, function(tagset) {
                model[tagset.id] = [];
                keys.push(tagset.id);
              });

              _.each(item.tag_id, function(tag, id) {
                if (!tag['tag_id.parent_id'] || !model[tag['tag_id.parent_id']]) {
                  model.tags.push(id);
                } else {
                  model[tag['tag_id.parent_id']].push(id);
                }
              });
              model.tagsets = CRM.civicase.tagsets;
              model.colorTags = CRM.civicase.tags;
              model.ts = ts;
              dialogService.open('EditTags', '~/civicase/EditTags.html', model, {
                autoOpen: false,
                height: 'auto',
                width: '40%',
                title: action.title,
                buttons: [{
                  text: ts('Save'),
                  icons: {primary: 'fa-check'},
                  click: function() {
                    function tagParams(tagIds) {
                      var params = {entity_id: item.id, entity_table: 'civicrm_case'};
                      _.each(tagIds, function(id, i) {
                        params['tag_id_' + i] = id;
                      });
                      return params;
                    }
                    var values = [],
                      calls = [];
                    _.each(keys, function(key) {
                      _.each(model[key], function(id) {
                        values.push(id);
                      });
                    });
                    var toRemove = _.difference(_.keys(item.tag_id), values);
                    var toAdd = _.difference(values, _.keys(item.tag_id));
                    if (toRemove.length) {
                      calls.push(['EntityTag', 'delete', tagParams(toRemove)]);
                    }
                    if (toAdd.length) {
                      calls.push(['EntityTag', 'create', tagParams(toAdd)]);
                    }
                    if (calls.length) {
                      calls.push(['Activity', 'create', {case_id: item.id, status_id: 'Completed', activity_type_id: 'Change Case Tags'}]);
                      $scope.refresh(calls);
                    }
                    $(this).dialog('close');
                  }
                }]
              });
            },

            deleteCases: function(cases, mode) {
              var msg, trash = 1;
              switch (mode) {
                case 'delete':
                  trash = 0;
                  msg = cases.length === 1 ? ts('Permanently delete selected case? This cannot be undone.') : ts('Permanently delete %1 cases? This cannot be undone.', {'1': cases.length});
                  break;

                case 'restore':
                  msg = cases.length === 1 ? ts('Undelete selected case?') : ts('Undelete %1 cases?', {'1': cases.length});
                  break;

                default:
                  msg = cases.length === 1 ? ts('This case and all associated activities will be moved to the trash.') : ts('%1 cases and all associated activities will be moved to the trash.', {'1': cases.length});
                  mode = 'delete';
              }
              CRM.confirm({title: action.title, message: msg})
                .on('crmConfirm:yes', function() {
                  var calls = [];
                  _.each(cases, function(item) {
                    calls.push(['Case', mode, {id: item.id, move_to_trash: trash}]);
                  });
                  $scope.refresh(calls);
                });
            },

            mergeCases: function(cases) {
              var msg = ts('Merge all activitiy records into a single case?');
              if (cases[0].case_type_id !== cases[1].case_type_id) {
                msg += '<br />' + ts('Warning: selected cases are of different types.');
              }
              if (!angular.equals(cases[0].client, cases[1].client)) {
                msg += '<br />' + ts('Warning: selected cases belong to different clients.');
              }
              CRM.confirm({title: action.title, message: msg})
                .on('crmConfirm:yes', function() {
                  $scope.refresh([['Case', 'merge', {case_id_1: cases[0].id, case_id_2: cases[1].id}]]);
                });
            },

            changeStatus: function(cases) {
              var types = _.uniq(_.map(cases, 'case_type_id')),
                currentStatuses = _.uniq(_.collect(cases, 'status_id')),
                currentStatus = currentStatuses.length === 1 ? currentStatuses[0] : null,
                msg = '<form>' +
                  '<div><input name="change_case_status" placeholder="' + ts('Select New Status') + '" /></div>' +
                  '<label for="change_case_status_details">' + ts('Notes') + '</label>' +
                  '<textarea id="change_case_status_details"></textarea>' +
                  '</form>',
                statuses = _.map(CRM.civicase.caseStatuses, function(item, status_id) {return {id: item.name, text: item.label, disabled: status_id === currentStatus};});
              _.each(types, function(caseTypeId) {
                var allowedStatuses = CRM.civicase.caseTypes[caseTypeId].definition.statuses || [];
                if (allowedStatuses.length) {
                  _.remove(statuses, function(status) {
                    return allowedStatuses.indexOf(status.id) < 0;
                  });
                }
              });
              CRM.confirm({
                  title: action.title,
                  message: msg,
                  open: function() {
                    $('input[name=change_case_status]', this).crmSelect2({data: statuses});
                    CRM.wysiwyg.create('#change_case_status_details');
                  }
                })
                .on('crmConfirm:yes', function() {
                  var status = $('input[name=change_case_status]', this).val(),
                    details = $('#change_case_status_details').val(),
                    calls = [];
                  if (status) {
                    _.each(cases, function(item) {
                      var subject = ts('Case status changed from %1 to %2', {
                        1: item.status,
                        2: _.result(_.find(statuses, {id: status}), 'text')
                      });
                      calls.push(['Case', 'create', {id: item.id, status_id: status}]);
                      calls.push(['Activity', 'create', {case_id: item.id, status_id: 'Completed', activity_type_id: 'Change Case Status', subject: subject, details: details}]);
                    });
                    $scope.refresh(calls);
                  }
                });
            },

            emailManagers: function(cases) {
              var managers = [],
                activityTypes = CRM.civicase.activityTypes;
              _.each(cases, function(item) {
                if (item.manager) {
                  managers.push(item.manager.contact_id);
                }
              });
              var popupPath = {
                path: 'civicrm/activity/email/add',
                query: {
                  action: 'add',
                  reset: 1,
                  cid: _.uniq(managers).join(',')
                }
              };
              if (cases.length === 1) {
                popupPath.query.caseid = cases[0].id;
              }
              return popupPath;
            },

            printMerge: function(cases) {
              var contactIds = [],
                caseIds = [];
              _.each(cases, function(item) {
                caseIds.push(item.id);
                contactIds.push(item.client[0].contact_id);
              });
              var popupPath = {
                path: 'civicrm/activity/pdf/add',
                query: {
                  action: 'add',
                  reset: 1,
                  context: 'standalone',
                  cid: contactIds.join(),
                  caseid: caseIds.join()
                }
              };
              return popupPath;
            },

            exportCases: function(cases) {
              var caseIds = _.collect(cases, 'id');
              var popupPath = {
                path: 'civicrm/export/standalone',
                query: {
                  reset: 1,
                  entity: 'Case',
                  id: caseIds.join()
                }
              };
              return popupPath;
            },

            linkCases: function(case1, case2) {
              var activityTypes = CRM.civicase.activityTypes,
                link = {
                  path: 'civicrm/case/activity',
                  query: {
                    action: 'add',
                    reset: 1,
                    cid: case1.client[0].contact_id,
                    atype: _.findKey(activityTypes, {name: 'Link Cases'}),
                    caseid: case1.id
                  }
                };
              if (case2) {
                link.query.link_to_case_id = case2.id;
              }
              return link;
            },

            print: function(selectedCase) {
              var url = CRM.url('civicrm/case/report/print', {
                all: 1,
                redact: 0,
                cid: selectedCase.client[0].contact_id,
                asn: 'standard_timeline',
                caseID: selectedCase.id
              });
              var win = window.open(url, '_blank');
              win.focus();
            }
          });

          if (result) {

            if ($scope.popupParams) {
              result.query.civicase_reload = $scope.popupParams();
            }

            var formData = false,
              dialog = CRM.loadForm(CRM.url(result.path, result.query))

              .on('crmFormSuccess crmPopupFormSuccess', function(e, data) {
                formData = data;
              })
              .on('dialogclose.crmPopup', function(e, data) {
                if (formData) {
                  element.trigger('crmPopupFormSuccess', [dialog, formData]);
                }
                element.trigger('crmPopupClose', [dialog, data]);
              });
          }
        };

        $scope.$watchCollection('cases', function(cases) {

          if (cases.length && cases[0].is_deleted) {
            $scope.caseActions = [
              {action: 'deleteCases(cases, "delete")', title: ts('Delete Permanently')},
              {action: 'deleteCases(cases, "restore")', title: ts('Restore from Trash')}
            ];
          } else {
            $scope.caseActions = _.cloneDeep(CRM.civicase.caseActions);
            if (!$scope.multi) {
              _.remove($scope.caseActions, {action: 'changeStatus(cases)'});
            }
          }
        });
      }
    };
  });



  function activityCard($scope, getActivityFeedUrl, dialogService, templateExists) {
    var ts = $scope.ts = CRM.ts('civicase');
    $scope.CRM = CRM;
    $scope.activityFeedUrl = getActivityFeedUrl;
    $scope.templateExists = templateExists;

    $scope.isActivityEditable = function(activity) {
      var type = CRM.civicase.activityTypes[activity.activity_type_id].name;
      return (type !== 'Email' && type !== 'Print PDF Letter') && $scope.editActivityUrl;
    };

    $scope.markCompleted = function(act) {
      $scope.refresh([['Activity', 'create', {id: act.id, status_id: act.is_completed ? 'Scheduled' : 'Completed'}]]);
    };

    $scope.star = function(act) {
      act.is_star = act.is_star === '1' ? '0' : '1';

      $scope.refresh([['Activity', 'setvalue', {id: act.id, field: 'is_star', value: act.is_star}]]);
    };

    $scope.deleteActivity = function(activity, dialog) {
      CRM.confirm({
          title: ts('Delete Activity'),
          message: ts('Permanently delete this %1 activity?', {1: activity.type})
        })
        .on('crmConfirm:yes', function() {
          $scope.refresh([['Activity', 'delete', {id: activity.id}]]);
          if (dialog && $(dialog).data('uiDialog')) {
            $(dialog).dialog('close');
          }
        });
    };

    $scope.viewInPopup = function($event, activity) {
      if (!$event || !$($event.target).is('a, a *, input, button, button *')) {
        var context = activity.case_id ? 'case' : 'activity';
        var form = CRM.loadForm(CRM.url('civicrm/activity', {action: 'view', id: activity.id, reset: 1, context: context}))
          .on('crmFormSuccess', function() {
            $scope.refresh();
          })
          .on('crmLoad', function() {
            $('a.delete.button').click(function() {
              $scope.deleteActivity(activity, form);
              return false;
            });
          });
      }
    };

    $scope.moveCopyActivity = function(act, op) {
      var model = {
        ts: ts,
        activity: _.cloneDeep(act)
      };
      dialogService.open('MoveCopyActCard', '~/civicase/ActivityMoveCopy.html', model, {
        autoOpen: false,
        height: 'auto',
        width: '40%',
        title: op === 'move' ? ts('Move %1 Activity', {1: act.type}) : ts('Copy %1 Activity', {1: act.type}),
        buttons: [{
          text: ts('Save'),
          icons: {primary: 'fa-check'},
          click: function() {
            if (op === 'copy') {
              delete model.activity.id;
            }
            if (model.activity.case_id && model.activity.case_id != act.case_id) {
              $scope.refresh([['Activity', 'create', model.activity]]);
            }
            $(this).dialog('close');
          }
        }]
      });
    };

    $scope.getAttachments = function(activity) {
      if (!activity.attachments) {
        activity.attachments = [];
        CRM.api3('Attachment', 'get', {
          entity_table: 'civicrm_activity',
          entity_id: activity.id,
          sequential: 1
        }).done(function(data) {
          activity.attachments = data.values;
          $scope.$digest();
        });
      }
    };
  }

  angular.module('civicase').directive('caseActivityCard', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/ActivityCard.html',
      controller: activityCard,
      scope: {
        activity: '=caseActivityCard',
        refresh: '=refreshCallback',
        editActivityUrl: '=?editActivityUrl'
      }
    };
  });


  angular.module('civicase').directive('civicaseActivityContactFilters', function() {
    return {
      restrict: 'AE',
      replace: true,
      templateUrl: '~/civicase/ActivityContactFilters.html',
      scope: {
        filters: '=civicaseActivityContactFilters'
      },
      link: function($scope, $el, $attr) {
        var ts = $scope.ts = CRM.ts('civicase');

        $scope.$watch('filters', function(){

          if ($scope.filters['@involvingContact'] === undefined) {
            $scope.filters['@involvingContact'] = '';
          }
        });

        $scope.$on('civicaseActivityFeed.query', function(event, filters, params) {
          switch (filters['@involvingContact']) {
            case 'myActivities':
              params.contact_id = 'user_contact_id';
              break;

            case 'delegated':
              if (_.isEmpty(params.assignee_contact_id)) {
                params.assignee_contact_id = {'!=': 'user_contact_id'};
              }
              if (_.isEmpty(params.source_contact_id)) {
                params.source_contact_id = 'user_contact_id';
              }
              break;

            default:
              break;
          }
        });
      }
    };
  });



  angular.module('civicase').directive('civicaseActivityDot', function () {
    return {
      restrict: 'A',
      template:
        '<div class="cb-dot" title="{{ activity.type }} ({{ activity.status }})" style="background-color: {{ activity.color }};">' +
          '<i ng-if="direction" class="fa act-direction-icon fa-long-arrow-{{ direction }}" style="color: {{ activity.color }};"></i>' +
          '<i ng-if="activity.icon" class="fa {{ activity.icon }}"></i>' +
          '<strong ng-if="!activity.icon">{{ activity.type[0] }}</strong>' +
        '</div>',
      scope: {
        activity: '=civicaseActivityDot'
      },
      link: function(scope) {
        var actTypes = CRM.civicase.activityTypes,
          actType = actTypes[scope.activity.activity_type_id];

        scope.direction = null;
        if (actType.name == 'Email') {
          scope.direction = 'left';
        }
        if (actType.name == 'Inbound Email') {
          scope.direction = 'right';
        }
      }
    };
  });




  angular.module('civicase').config(function($routeProvider) {
    $routeProvider.when('/activity/feed', {
      reloadOnSearch: false,
      template: '<div id="bootstrap-theme" class="civicase-main" civicase-activity-feed="{}"></div>'
    });
  });

  function activityFeedController($scope, crmApi, crmUiHelp, crmThrottle, formatActivity, $rootScope, dialogService, templateExists) {

    var ts = $scope.ts = CRM.ts('civicase');
    var ITEMS_PER_PAGE = 25,
      caseId = $scope.params ? $scope.params.case_id : null,
      pageNum = 0;
    $scope.CRM = CRM;
    $scope.isLoading = true;

    var activityTypes = $scope.activityTypes = CRM.civicase.activityTypes;
    var activityStatuses = $scope.activityStatuses = CRM.civicase.activityStatuses;
    $scope.activityCategories = CRM.civicase.activityCategories;
    $scope.templateExists = templateExists;
    $scope.activities = {};
    $scope.activityGroups = [];
    $scope.remaining = true;
    $scope.viewingActivity = {};
    $scope.$bindToRoute({
      param: 'aid',
      expr: 'aid',
      format: 'raw',
      default: 0
    });
    $scope.$bindToRoute({
      expr: 'displayOptions',
      param: 'ado',
      default: angular.extend({}, {
        followup_nested: true,
        overdue_first: true,
        include_case: true
      }, $scope.params.displayOptions || {})
    });
    $scope.$bindToRoute({
      expr: 'filters',
      param: 'af',
      default: {}
    });

    if (CRM.checkPerm('basic case information') &&
      !CRM.checkPerm('administer CiviCase') &&
      !CRM.checkPerm('access my cases and activities') &&
      !CRM.checkPerm('access all cases and activities')
    ) {
      $scope.bulkAllowed = false;
    } else {
      $scope.bulkAllowed = true;
    }

    $scope.refreshCase = $scope.refreshCase || _.noop;
    $scope.refreshAll = function() {
      $('.act-feed-panel .panel-body').block();
      getActivities(false, $scope.refreshCase);
    };

    $scope.star = function(act) {
      act.is_star = act.is_star === '1' ? '0' : '1';

      crmApi('Activity', 'setvalue', {id: act.id, field: 'is_star', value: act.is_star}, {}).then($scope.refreshCase);
    };

    $scope.markCompleted = function(act) {
      $('.act-feed-panel .panel-body').block();
      crmApi('Activity', 'create', {id: act.id, status_id: act.is_completed ? 'Scheduled' : 'Completed'}, {}).then($scope.refreshAll);
    };

    $scope.isSameDate = function(d1, d2) {
      return d1 && d2 && (d1.slice(0, 10) === d2.slice(0, 10));
    };

    $scope.nextPage = function() {
      ++pageNum;
      getActivities(true);
    };

    $scope.getAttachments = function(activity) {
      if (!activity.attachments) {
        activity.attachments = [];
        CRM.api3('Attachment', 'get', {
          entity_table: 'civicrm_activity',
          entity_id: activity.id,
          sequential: 1
        }).done(function(data) {
          activity.attachments = data.values;
          $scope.$digest();
        });
      }
    };

    $scope.deleteActivity = function(activity) {
      CRM.confirm({
          title: ts('Delete Activity'),
          message: ts('Permanently delete this %1 activity?', {1: activity.type})
        })
        .on('crmConfirm:yes', function() {
          if ($scope.viewingActivity && $scope.viewingActivity.id == activity.id) {
            $scope.viewingActivity = {};
            $scope.aid = 0;
          }
          crmApi('Activity', 'delete', {id: activity.id}).then($scope.refreshAll);
        });
    };

    $scope.moveCopyActivity = function(act, op) {
      var model = {
        ts: ts,
        activity: _.cloneDeep(act)
      };
      dialogService.open('MoveCopyActFeed', '~/civicase/ActivityMoveCopy.html', model, {
        autoOpen: false,
        height: 'auto',
        width: '40%',
        title: op === 'move' ? ts('Move %1 Activity', {1: act.type}) : ts('Copy %1 Activity', {1: act.type}),
        buttons: [{
          text: ts('Save'),
          icons: {primary: 'fa-check'},
          click: function() {
            if (op === 'copy') {
              delete model.activity.id;
            }
            if (model.activity.case_id && model.activity.case_id != $scope.item.id) {
              crmApi('Activity', 'create', model.activity).then($scope.refreshAll);
            }
            $(this).dialog('close');
          }
        }]
      });
    };

    $scope.viewActivity = function(id, e) {
      if (e && $(e.target).closest('a, button').length) {
        return;
      }
      var act = _.find($scope.activities, {id: id});

      if (($scope.viewingActivity && $scope.viewingActivity.id == id) || !act) {
        $scope.viewingActivity = {};
        $scope.aid = 0;
      } else {  

        if (act.status === 'Unread') {
          var statusId = _.findKey(CRM.civicase.activityStatuses, {name: 'Completed'});
          crmApi('Activity', 'setvalue', {id: act.id, field: 'status_id', value: statusId}).then(function() {
            act.status_id = statusId;
            formatActivity(act);
          });
        }
        $scope.viewingActivity = _.cloneDeep(act);
        $scope.aid = act.id;
      }
    };

    function groupActivities(activities) {
      var groups = [], group, subgroup,
        date = new Date(),
        now = CRM.utils.formatDate(date, 'yy-mm-dd') + ' ' + date.toTimeString().slice(0, 8),
        overdue, upcoming, past;
      if ($scope.displayOptions.overdue_first) {
        groups.push(overdue = {key: 'overdue', title: ts('Overdue Activities'), activities: []});
      }
      groups.push(upcoming = {key: 'upcoming', title: ts('Upcoming Activities'), activities: []});
      groups.push(past = {key: 'past', title: ts('Past Activities'), activities: []});
      _.each(activities, function(act) {
        var activityDate = act.activity_date_time.slice(0, 10);
        if (act.activity_date_time > now) {
          group = upcoming;
        } else if (overdue && act.is_overdue) {
          group = overdue;
        } else {
          group = past;
        }
        subgroup = _.findWhere(group.activities, {date: activityDate});
        if (!subgroup) {
          group.activities.push(subgroup = {date: activityDate, activities: []});
        }
        subgroup.activities.push(act);
      });
      return groups;
    }

    function getActivities(nextPage, callback) {
      if (nextPage !== true) {
        pageNum = 0;
      }
      crmThrottle(_loadActivities).then(function(result) {
        if (_.isFunction(callback)) {
          callback();
        }
        var newActivities = _.each(result.acts.values, formatActivity);
        if (pageNum) {
          $scope.activities = $scope.activities.concat(newActivities);
        } else {
          $scope.activities = newActivities;
        }
        $scope.activityGroups = groupActivities($scope.activities);
        var remaining = result.count - (ITEMS_PER_PAGE * (pageNum + 1));
        $scope.totalCount = result.count;
        $scope.remaining = remaining > 0 ? remaining : 0;
        if (!result.count && !pageNum) {
          $scope.remaining = false;
        }
        $('.act-feed-panel .panel-body').unblock();
        if ($scope.aid && $scope.aid !== $scope.viewingActivity.id) {
          $scope.viewActivity($scope.aid);
        }
        $scope.isLoading = false;
      });
    }

    function _loadActivities() {
      var returnParams = {
        sequential: 1,
        return: ['subject', 'details', 'activity_type_id', 'status_id', 'source_contact_name', 'target_contact_name', 'assignee_contact_name', 'activity_date_time', 'is_star', 'original_id', 'tag_id.name', 'tag_id.description', 'tag_id.color', 'file_id', 'is_overdue', 'case_id'],
        options: {
          sort: ($scope.displayOptions.overdue_first ? 'is_overdue DESC, ' : '') + 'activity_date_time DESC',
          limit: ITEMS_PER_PAGE,
          offset: ITEMS_PER_PAGE * pageNum
        }
      };
      var params = {
        is_current_revision: 1,
        is_deleted: 0,
        is_test: 0,
        options: {}
      };
      if (caseId) {
        params.case_id = caseId;
      } else if (!$scope.displayOptions.include_case) {
        params.case_id = {'IS NULL': 1};
      } else {
        returnParams.return = returnParams.return.concat(['case_id.case_type_id', 'case_id.status_id', 'case_id.contacts']);
      }
      _.each($scope.filters, function(val, key) {
        if (key[0] === '@') return; // Virtual params.
        if (val) {
          if (key === 'text') {
            params.subject = {LIKE: '%' + val + '%'};
            params.details = {LIKE: '%' + val + '%'};
            params.options.or = [['subject', 'details']];
          } else if (_.isString(val)) {
            params[key] = {LIKE: '%' + val + '%'};
          } else if (_.isArray(val) && val.length) {
            params[key] = val.length === 1 ? val[0] : {IN: val};
          } else if (!_.isArray(val)) {
            params[key] = val;
          }
        }
      });
      $rootScope.$broadcast('civicaseActivityFeed.query', $scope.filters, params);
      if ($scope.params && $scope.params.filters) {
        angular.extend(params, $scope.params.filters);
      }
      return crmApi({
        acts: ['Activity', 'get', $.extend(true, returnParams, params)],
        count: ['Activity', 'getcount', params]
      });
    }

    $scope.$watchCollection('filters', getActivities);
    $scope.$watchCollection('params.filters', getActivities);
    $scope.$watchCollection('displayOptions', getActivities);
    $scope.$on('updateCaseData', getActivities);
  }

  angular.module('civicase').directive('civicaseActivityFeed', function() {
    return {
      restrict: 'A',
      template:
        '<div class="panel panel-default act-feed-panel">' +
          '<div class="panel-header" civicase-activity-filters="filters"></div>' +
          '<div class="panel-body clearfix" ng-include="\'~/civicase/ActivityList.html\'"></div>' +
        '</div>',
      controller: activityFeedController,
      scope: {
        params: '=civicaseActivityFeed',
        refreshCase: '=?refreshCallback'
      }
    };
  });




  angular.module('civicase').directive('civicaseActivityFilters', function($timeout, crmUiHelp) {

    function activityFilters($scope, element, attrs) {
      var ts = $scope.ts = CRM.ts('civicase');

      function mapSelectOptions(opt, id) {
        return {
          id: id,
          text: opt.label,
          color: opt.color,
          icon: opt.icon
        };
      }

      $timeout(function() {

        var $actHeader = $('.act-feed-panel .panel-header'),
          $actControls = $('.act-feed-panel .act-list-controls'),
          $civicrmMenu = $('#civicrm-menu'),
          $feedActivity = $('.act-feed-view-activity'),
          $casePanelBody = $('.civicase-view-panel > .panel-body'),
          $casePanel = $('.civicase-view-panel');


        if($casePanel.length < 1) {
          $casePanel = $('.dashboard-activites');
          $casePanelBody = $('.dashboard-activites');
        }

        $feedActivity.affix({
          offset: {
            top: $casePanelBody.offset().top - 73,
            bottom: $(document).height() - ($casePanel.offset().top + $casePanel.height()) + 18
          }
        })
        .on('affixed.bs.affix', function() {
          $feedActivity.css('top',$civicrmMenu.height() + $actHeader.height() + $actControls.height() + 59);
        })
        .on('affixed-top.bs.affix', function() {
          $feedActivity.css('top','auto');
        });

        $actHeader.affix({offset: {top: $casePanelBody.offset().top - 73} })
          .css('top', $civicrmMenu.height() + 53)
          .css('width',$('.act-feed-panel').css('width'))
          .on('affixed.bs.affix', function() {
            $actHeader.css('width',$('.act-feed-panel').css('width'));
            $actHeader.css('top', $civicrmMenu.height() + 53);
          })
          .on('affixed-top.bs.affix', function() {
            $actHeader.css('width','auto');
          });
        
        $actControls.affix({offset: {top: $casePanelBody.offset().top - 73} })
          .css('width',$actHeader.css('width'))
          .on('affixed.bs.affix', function() {
            $actControls.css('width',$actHeader.css('width'));
            $actControls.css('top',$civicrmMenu.height() + $actHeader.height() + 53);
          })
          .on('affixed-top.bs.affix', function() {
            $actControls.css('width','auto');
            $actControls.css('top', 'auto');
          });

        $scope.$watchCollection('[filters, exposedFilters]', function(){
          $timeout(function() {
            $actControls.css('top',$civicrmMenu.height() + $actHeader.height() + 53);
            $feedActivity.not('.cc-zero-w')
              .height($(window).height() - ($civicrmMenu.height() + $actHeader.height() + $actControls.height()))
              .css('top',$civicrmMenu.height() + $actHeader.height() + $actControls.height() + 53);
          });
        });
      });

      $scope.availableFilters = [
        {
          name: 'activity_type_id',
          label: ts('Activity type'),
          html_type: 'Select',
          options: _.map(CRM.civicase.activityTypes, mapSelectOptions)
        },
        {
          name: 'status_id',
          label: ts('Status'),
          html_type: 'Select',
          options: _.map(CRM.civicase.activityStatuses, mapSelectOptions)
        },
        {
          name: 'target_contact_id',
          label: ts('With'),
          html_type: 'Autocomplete-Select',
          entity: 'Contact'
        },
        {
          name: 'assignee_contact_id',
          label: ts('Assigned to'),
          html_type: 'Autocomplete-Select',
          entity: 'Contact'
        },
        {
          name: 'tag_id',
          label: ts('Tagged'),
          html_type: 'Autocomplete-Select',
          entity: 'Tag',
          api_params: {used_for: {LIKE: '%civicrm_activity%'}}
        },
        {
          name: 'text',
          label: ts('Contains text'),
          html_type: 'Text'
        }
      ];
      if (_.includes(CRM.config.enableComponents, 'CiviCampaign')) {
        $scope.availableFilters.push({
          name: 'campaign_id',
          label: ts('Campaign'),
          html_type: 'Autocomplete-Select',
          entity: 'Campaign'
        });
      }
      if (CRM.checkPerm('administer CiviCRM')) {
        $scope.availableFilters.push({
          name: 'is_deleted',
          label: ts('Deleted Activities'),
          html_type: 'Select',
          options: [{id: 1, text: ts('Deleted')}, {id: 0, text: ts('Normal')}]
        },
        {
          name: 'is_test',
          label: ts('Test Activities'),
          html_type: 'Select',
          options: [{id: 1, text: ts('Test')}, {id: 0, text: ts('Normal')}]
        });
      }
      $scope.availableFilters = $scope.availableFilters.concat(CRM.civicase.customActivityFields);

      $scope.exposedFilters = {
        activity_type_id: true,
        status_id: true,
        assignee_contact_id: true,
        tag_id: true,
        text: true
      };

      _.each($scope.filters, function(filter, key) {
        $scope.exposedFilters[key] = true;
      });

      $scope.exposeFilter = function(field, $event) {
        var shown = !$scope.exposedFilters[field.name];
        if (shown) {

          $timeout(function () {
            var $span = $('[data-activity-filter=' + field.name + ']', element);
            if ($('[crm-entityref], [crm-ui-select]', $span).length) {
              $('[crm-entityref], [crm-ui-select]', $span).select2('open');
            } else {
              $('input:first', $span).focus();
            }
          }, 50);
        } else {

          $event.stopPropagation();
          delete $scope.filters[field.name];
        }
      };

      $scope.hasFilters = function hasFilters() {
        var result = false;
        _.each($scope.filters, function(value){
          if (!_.isEmpty(value)) result = true;
        });
        return result;
      };

      $scope.clearFilters = function clearFilters() {
        _.each(_.keys($scope.filters), function(key){
          delete $scope.filters[key];
        });
      };
    }

    return {
      restrict: 'A',
      scope: {
        filters: '=civicaseActivityFilters'
      },
      templateUrl: '~/civicase/ActivityFilters.html',
      link: activityFilters,
      transclude: true
    };
  });




  function activityView(scope, element, attrs) {
    function loadActivity() {
      if (scope.activity.id) {
        var context = scope.activity.case_id ? 'case' : 'activity';
        CRM.loadForm(CRM.url('civicrm/activity', {action: 'view', id: scope.activity.id, reset: 1, context: context}), {target: $(element).children('div.act-view-container')});
      }
    }
    scope.close = function() {
      delete(scope.activity.id);
    };
    scope.$watch('activity.id', loadActivity);

    element
      .on('crmFormSuccess', scope.refresh)
      .on('crmLoad', function() {

        $('a.crm-clear-link', this).removeAttr('href');
        $('a.delete.button', this).click(function(e) {
          CRM.confirm({
              title: ts('Delete Activity'),
              message: ts('Permanently delete this %1 activity?', {1: scope.activity.type})
            })
            .on('crmConfirm:yes', function() {
              $(element).children('div.act-view-container').block();
              CRM.api3('Activity', 'delete', {id: scope.activity.id})
                .done(scope.close)
                .done(scope.refresh);
            });
          return false;
        });

        if (CRM.checkPerm('basic case information') &&
          !CRM.checkPerm('administer CiviCase') &&
          !CRM.checkPerm('access my cases and activities') &&
          !CRM.checkPerm('access all cases and activities')
        ) {
          $('div.crm-submit-buttons').remove();
        }
      });
  }

  angular.module('civicase').directive('civicaseActivityView', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/ActivityView.html',
      link: activityView,
      scope: {
        activity: '=civicaseActivityView',
        refresh: '=refreshCallback'
      }
    };
  });




  angular.module('civicase').directive('civicaseApi3Ctrl', function() {
    return {
      restrict: 'EA',
      scope: {
        civicaseApi3Ctrl: '=',
        civicaseApi3: '@',
        civicaseApi3Refresh: '@',
        onRefresh: '@'
      },
      controllerAs: 'civicaseApi3Ctrl',
      controller: function($scope, $parse, crmThrottle, crmApi) {
        var ctrl = this;

        var parts = $parse($scope.civicaseApi3)($scope.$parent);
        ctrl.entity = parts[0];
        ctrl.action = parts[1];
        ctrl.params = parts[2];
        ctrl.result = {};
        ctrl.loading = ctrl.firstLoad = true;

        ctrl.refresh = function refresh() {
          ctrl.loading = true;
          crmThrottle(function () {
            return crmApi(ctrl.entity, ctrl.action, ctrl.params)
              .then(function (response) {
                ctrl.result = response;
                ctrl.loading = ctrl.firstLoad = false;
                if ($scope.onRefresh) {
                  $scope.$parent.$eval($scope.onRefresh, ctrl);
                }
              });
          });
        };

        $scope.civicaseApi3Ctrl = this;

        var mode = $scope.civicaseApi3Refresh ? $scope.civicaseApi3Refresh : 'auto';
        switch (mode) {
          case 'auto': $scope.$watchCollection('civicaseApi3Ctrl.params', ctrl.refresh); break;
          case 'init': ctrl.refresh(); break;
          case 'manual': break;
          default: throw 'Unrecognized refresh mode: '+ mode;
        }
      }
    };
  });




  angular.module('civicase').config(function($routeProvider) {
    $routeProvider.when('/case/list', {
      reloadOnSearch: false,
      resolve: {
        hiddenFilters: function() {}
      },
      controller: 'CivicaseCaseList',
      templateUrl: '~/civicase/CaseList.html'
    });
  });

  function loadCaseApiParams(filters, sort, page) {
    var returnParams = {
      sequential: 1,
      return: ['subject', 'case_type_id', 'status_id', 'is_deleted', 'start_date', 'modified_date', 'contacts', 'activity_summary', 'category_count', 'tag_id.name', 'tag_id.color', 'tag_id.description'],
      options: {
        sort: sort.field + ' ' + sort.dir,
        limit: page.size,
        offset: page.size * (page.num - 1)
      }
    };

    if (sort.field !== 'id' && sort.field !== 'contact_id.sort_name') {
      returnParams.options.sort += ', contact_id.sort_name';
    }
    if (sort.field !== 'id') {
      returnParams.options.sort += ', id';
    }
    var params = {"case_type_id.is_active": 1};
    _.each(filters, function(val, filter) {
      if (val || typeof val === 'boolean') {
        if (typeof val === 'number' || typeof val === 'boolean') {
          params[filter] = val;
        }
        else if (typeof val === 'object' && !$.isArray(val)) {
          params[filter] = val;
        }
        else if (val.length) {
          params[filter] = $.isArray(val) ? {IN: val} : {LIKE: '%' + val + '%'};
        }
      }
    });

    if (!params.contact_id) {
      params.contact_is_deleted = 0;
    }

    if (!params.status_id && !params.id) {
      params['status_id.grouping'] = 'Opened';
    }

    if (!params.is_deleted && !params.id) {
      params.is_deleted = 0;
    }
    return [
      ['Case', 'getcaselist', $.extend(true, returnParams, params)],
      ['Case', 'getcount', params]
    ];
  }

  angular.module('civicase').controller('CivicaseCaseList', function($scope, crmApi, crmStatus, crmUiHelp, crmThrottle, $timeout, hiddenFilters, getActivityFeedUrl, formatCase) {

    var ts = $scope.ts = CRM.ts('civicase'),
      firstLoad = true,
      caseTypes = CRM.civicase.caseTypes,
      caseStatuses = $scope.caseStatuses = CRM.civicase.caseStatuses;
    $scope.activityTypes = CRM.civicase.activityTypes;
    $scope.activityCategories = CRM.civicase.activityCategories;
    $scope.cases = [];
    $scope.CRM = CRM;
    $scope.pageTitle = '';
    $scope.viewingCaseDetails = null;
    $scope.selectedCases = [];
    $scope.activityFeedUrl = getActivityFeedUrl;
    $scope.hiddenFilters = hiddenFilters;
    $scope.sort = {sortable: true};
    $scope.page = {total: 0};
    $scope.isLoading = true;

    if (CRM.checkPerm('basic case information') &&
      !CRM.checkPerm('administer CiviCase') &&
      !CRM.checkPerm('access my cases and activities') &&
      !CRM.checkPerm('access all cases and activities')
    ) {
      $scope.bulkAllowed = false;
    } else {
      $scope.bulkAllowed = true;
    }

    $scope.$bindToRoute({expr:'searchIsOpen', param: 'sx', format: 'bool', default: false});
    $scope.$bindToRoute({expr:'sort.field', param:'sf', format: 'raw', default: 'contact_id.sort_name'});
    $scope.$bindToRoute({expr:'sort.dir', param:'sd', format: 'raw', default: 'ASC'});
    $scope.$bindToRoute({expr:'caseIsFocused', param:'focus', format: 'bool', default: false});
    $scope.$bindToRoute({expr:'filters', param:'cf', default: {}});
    $scope.$bindToRoute({expr:'viewingCase', param:'caseId', format: 'raw'});
    $scope.$bindToRoute({expr:'viewingCaseTab', param:'tab', format: 'raw', default:'summary'});
    $scope.$bindToRoute({expr:'page.size', param:'cps', format: 'int', default: 15});
    $scope.$bindToRoute({expr:'page.num', param:'cpn', format: 'int', default: 1});
    $scope.casePlaceholders = $scope.filters.id ? [0] : _.range($scope.page.size);

    $scope.viewCase = function(id, $event) {
      if (!$scope.bulkAllowed) {
        return;
      }

      if (!$event || !$($event.target).is('a, a *, input, button')) {
        unfocusCase();
        if ($scope.viewingCase === id) {
          $scope.viewingCase = null;
          $scope.viewingCaseDetails = null;
        } else {
          $scope.viewingCaseDetails = _.findWhere($scope.cases, {id: id});
          $scope.viewingCase = id;
          $scope.viewingCaseTab = 'summary';
        }
      }
      setPageTitle();
    };

    
    $scope.$watch('caseIsFocused', function() {
      $timeout(function() {
        var $actHeader = $('.act-feed-panel .panel-header'),
        $actControls = $('.act-feed-panel .act-list-controls');

        if($actHeader.hasClass('affix')) {
            $actHeader.css('width',$('.act-feed-panel').css('width'));
        }
        else {
          $actHeader.css('width', 'auto');
        }

        if($actControls.hasClass('affix')) {
            $actControls.css('width',$actHeader.css('width'));
        }
        else {
          $actControls.css('width', 'auto');
        }
      },1500);
    });

    var unfocusCase = $scope.unfocusCase = function() {
      $scope.caseIsFocused = false;
    };

    $scope.selectAll = function(e) {
      var checked = e.target.checked;
      _.each($scope.cases, function(item) {
        item.selected = checked;
      });
    };

    $scope.isSelection = function(condition) {
      if (!$scope.cases) {
        return false;
      }
      var count = $scope.selectedCases.length;
      if (condition === 'all') {
        return count === $scope.cases.length;
      } else if (condition === 'any') {
        return !!count;
      }
      return count === condition;
    };

    function setPageTitle() {
      var viewingCase = $scope.viewingCase,
        cases = $scope.cases,
        filters = $scope.filters;

      $('h1.crm-page-title').toggle(!viewingCase);
      if (viewingCase) {
        var item = _.findWhere(cases, {id: viewingCase});
        if (item) {
          $scope.pageTitle = item.client[0].display_name + ' - ' + item.case_type;
        }
        return;
      }
      if (_.size(_.omit(filters, ['status_id', 'case_type_id']))) {
        $scope.pageTitle = ts('Case Search Results');
      } else {
        var status = [];
        if (filters.status_id && filters.status_id.length) {
          _.each(filters.status_id, function(s) {
            status.push(_.findWhere(caseStatuses, {name: s}).label);
          });
        } else {
          status = [ts('All Open')];
        }
        var type = [];
        if (filters.case_type_id && filters.case_type_id.length) {
          _.each(filters.case_type_id, function(t) {
            type.push(_.findWhere(caseTypes, {name: t}).title);
          });
        }
        $scope.pageTitle = status.join(' & ') + ' ' + type.join(' & ') + ' ' + ts('Cases');
      }
      if (typeof $scope.totalCount === 'number') {
        $scope.pageTitle += ' (' + $scope.totalCount + ')';
      }
    }

    var getCases = $scope.getCases = function() {
      $scope.isLoading = true;
      setPageTitle();
      crmThrottle(_loadCases).then(function(result) {
        var viewingCaseDetails;
        var cases = _.each(result[0].values, formatCase);
        if ($scope.viewingCase) {
          if ($scope.viewingCaseDetails) {
            var currentCase = _.findWhere(cases, {id: $scope.viewingCase});
            if (currentCase) {
              _.assign(currentCase, $scope.viewingCaseDetails);
            }
          } else {
            $scope.viewingCaseDetails = _.findWhere(cases, {id: $scope.viewingCase});
          }
        }

        if (typeof result[2] !== 'undefined') {
          $scope.headers = result[2].values;
        }

        $scope.cases = cases;
        $scope.page.num = result[0].page || $scope.page.num;
        $scope.totalCount = result[1];
        $scope.page.total = Math.ceil(result[1] / $scope.page.size);
        setPageTitle();
        firstLoad = $scope.isLoading = false;
      });
    };

    $scope.refresh = function(apiCalls) {
      $scope.isLoading = true;
      if (!apiCalls) apiCalls = [];
      apiCalls = apiCalls.concat(loadCaseApiParams(angular.extend({}, $scope.filters, $scope.hiddenFilters), $scope.sort, $scope.page));
      crmApi(apiCalls, true).then(function(result) {
        $scope.cases = _.each(result[apiCalls.length - 2].values, formatCase);
        $scope.totalCount = result[apiCalls.length - 1];
        $scope.isLoading = false;
      });
    };

    function _loadCases() {
      var params = loadCaseApiParams(angular.extend({}, $scope.filters, $scope.hiddenFilters), $scope.sort, $scope.page);

      if (firstLoad && $scope.viewingCase) {
        params[0][2].options.page_of_record = $scope.viewingCase;
      } else if (firstLoad) {
        params.push(['Case', 'getcaselistheaders']);
      }

      return crmApi(params);
    }

    function getCasesFromWatcher(newValue, oldValue) {
      if (newValue !== oldValue) {
        getCases();
      }
    }

    $scope.$watchCollection('sort', getCasesFromWatcher);
    $scope.$watchCollection('page', getCasesFromWatcher);
    $scope.$watch('cases', function(cases) {
      $scope.selectedCases = _.filter(cases, 'selected');
    }, true);

    $scope.applyAdvSearch = function(newFilters) {
      $scope.filters = newFilters;
      getCases();
    };

    $timeout(getCases);

    $timeout(function() {

      var $listTable = $('.case-list-panel .inner'),
        $customScroll = $('.case-list-panel .custom-scroll-wrapper'),
        $tableHeader = $('.case-list-panel .inner table thead');

      $($listTable).scroll(function(){
        $customScroll.scrollLeft($listTable.scrollLeft());
        $('thead.affix').scrollLeft($customScroll.scrollLeft());
      });

      $customScroll.scroll(function(){
        $listTable.scrollLeft($customScroll.scrollLeft());
        $('thead.affix').scrollLeft($customScroll.scrollLeft());
      });

      $([$tableHeader, $customScroll]).affix({
        offset: {
           top: $('.case-list-panel').offset().top - 50
        }
      })
      .on('affixed.bs.affix', function() {
        $('thead.affix').scrollLeft($customScroll.scrollLeft());
      });
    });
  });

  function caseListTableController($scope, $location, crmApi, formatCase, crmThrottle, $timeout, getActivityFeedUrl) {
    var ts = $scope.ts = CRM.ts('civicase');
    var firstLoad = true;

    $scope.cases = [];
    $scope.CRM = CRM;
    $scope.activityCategories = CRM.civicase.activityCategories;
    $scope.activityFeedUrl = getActivityFeedUrl;
    $scope.casePlaceholders = _.range($scope.page.size);
    $scope.isLoading = true;

    if (CRM.checkPerm('basic case information') &&
      !CRM.checkPerm('administer CiviCase') &&
      !CRM.checkPerm('access my cases and activities') &&
      !CRM.checkPerm('access all cases and activities')
    ) {
      $scope.bulkAllowed = false;
    } else {
      $scope.bulkAllowed = true;
    }

    function _loadCases() {
      var params = loadCaseApiParams($scope.filters, $scope.sort, $scope.page);

      if (firstLoad) {
        params.push(['Case', 'getcaselistheaders']);
      }

      return crmApi(params);
    }

    function getCases() {
      $scope.isLoading = true;
      crmThrottle(_loadCases)
        .then(function(result) {
          $scope.cases = _.each(result[0].values, formatCase);

          if (firstLoad) {
            $scope.headers = result[2].values;
            firstLoad = false;
          }

          $scope.totalCount = result[1];
          $scope.isLoading = false;

          $timeout(function() {

            var $listTable = $('.case-list-panel .inner'),
              $customScroll = $('.case-list-panel .custom-scroll-wrapper'),
              $tableHeader = $('.case-list-panel .inner table thead');

            $($listTable).scroll(function(){
              $customScroll.scrollLeft($listTable.scrollLeft());
              $('thead.affix').scrollLeft($customScroll.scrollLeft());
            });

            $customScroll.scroll(function(){
              $listTable.scrollLeft($customScroll.scrollLeft());
              $('thead.affix').scrollLeft($customScroll.scrollLeft());
            });

            $([$tableHeader, $customScroll]).affix({
              offset: {
                 top: $('.case-list-panel').offset().top - 50
              }
            })
            .on('affixed.bs.affix', function() {
              $('thead.affix').scrollLeft($customScroll.scrollLeft());
            });
          });
        });
    }

    $scope.viewCase = function(id, $event) {
      if (!$scope.bulkAllowed) {
        return;
      }

      if (!$event || !$($event.target).is('a, a *, input, button, button *')) {
        var p = {
          caseId: id,
          focus: 1,
          sf: $scope.sort.field,
          sd: $scope.sort.dir
        };
        $location.path('/case/list');
        $location.search(p);
      }
    };

    $scope.$on('caseRefresh', getCases);
    getCases();
  }

  angular.module('civicase').directive('caseListTable', function() {
    return {
      restrict: 'A',
      controller: caseListTableController,
      templateUrl: '~/civicase/CaseListTable.html',
      scope: {
        sort: '=caseListTableSort',
        page: '=caseListTablePage',
        filters: '=caseListTableFilters',
        refresh: '=refreshCallback'
      }
    };
  });




  angular.module('civicase').config(function($routeProvider) {
      $routeProvider.when('/case', {
        reloadOnSearch: false,
        controller: 'CivicaseDashboardCtrl',
        templateUrl: '~/civicase/DashboardCtrl.html'
      });
    }
  );

  angular.module('civicase').controller('CivicaseDashboardCtrl', function($scope, crmApi, formatActivity, $timeout) {
    var ts = $scope.ts = CRM.ts('civicase'),
      activitiesToShow = 10;
    $scope.caseStatuses = CRM.civicase.caseStatuses;
    $scope.caseTypes = CRM.civicase.caseTypes;
    $scope.caseTypesLength = _.size(CRM.civicase.caseTypes);
    $scope.checkPerm = CRM.checkPerm;
    $scope.url = CRM.url;
    $scope.activityPlaceholders = _.range(activitiesToShow);

    $scope.$bindToRoute({
      param: 'dtab',
      expr: 'activeTab',
      format: 'int',
      default: 0
    });

    if (CRM.checkPerm('access all cases and activities')) {
      $scope.$bindToRoute({
        param: 'dme',
        expr: 'myCasesOnly',
        format: 'bool',
        default: false
      });
    } else {
      $scope.myCasesOnly = true;
    }

    $scope.$bindToRoute({
      param: 'dbd',
      expr: 'showBreakdown',
      format: 'bool',
      default: false
    });

    if ($scope.caseTypesLength < 2) {
      $scope.showBreakdown = false;
    }

    $scope.summaryData = [];

    $scope.dashboardActivities = {};

    $scope.showHideBreakdown = function() {
      $scope.showBreakdown = !$scope.showBreakdown;
    };

    $scope.seeAllLink = function(category, statusFilter) {
      var params = {
        dtab: 1,
        dme: $scope.myCasesOnly ? 1 : 0,
        dbd: 0,
        af: JSON.stringify({
          'activity_type_id.grouping': category,
          status_id: CRM.civicase.activityStatusTypes[statusFilter]
        })
      };
      return '#/case?' + $.param(params);
    };

    $scope.caseListLink = function(type, status) {
      var cf = {};
      if (type) {
        cf.case_type_id = [type];
      }
      if (status) {
        cf.status_id = [status];
      }
      if ($scope.myCasesOnly) {
        cf.case_manager = [CRM.config.user_contact_id];
      }
      return '#/case/list?' + $.param({cf: JSON.stringify(cf)});
    };

    $scope.refresh = function(apiCalls) {
      apiCalls = apiCalls || [];
      apiCalls.push(['Case', 'getstats', {my_cases: $scope.myCasesOnly}]);
      var params = _.extend({
        sequential: 1,
        is_current_revision: 1,
        is_test: 0,
        return: ['case_id', 'activity_type_id', 'subject', 'activity_date_time', 'status_id', 'target_contact_name', 'assignee_contact_name', 'is_overdue', 'is_star', 'file_id', 'case_id.case_type_id', 'case_id.status_id', 'case_id.contacts']
      }, $scope.activityFilters);

      apiCalls.push(['Activity', 'get', _.extend({
        "activity_type_id.grouping": {LIKE: "%communication%"},
        'status_id.filter': 1,
        options: {limit: activitiesToShow, sort: 'activity_date_time DESC'}
      }, params)]);
      apiCalls.push(['Activity', 'getcount', _.extend({
        "activity_type_id.grouping": {LIKE: "%communication%"},
        'status_id.filter': 1,
        is_current_revision: 1,
        is_test: 0
      }, $scope.activityFilters)]);

      apiCalls.push(['Activity', 'get', _.extend({
        "activity_type_id.grouping": {LIKE: "%milestone%"},
        'status_id.filter': 0,
        options: {limit: activitiesToShow, sort: 'activity_date_time ASC'}
      }, params)]);
      apiCalls.push(['Activity', 'getcount', _.extend({
        "activity_type_id.grouping": {LIKE: "%milestone%"},
        'status_id.filter': 0,
        is_current_revision: 1,
        is_test: 0
      }, $scope.activityFilters)]);
      crmApi(apiCalls).then(function(data) {
        $scope.$broadcast('caseRefresh');
        $scope.summaryData = data[apiCalls.length - 5].values;
        $scope.dashboardActivities.recentCommunication = _.each(data[apiCalls.length - 4].values, formatActivity);
        $scope.dashboardActivities.recentCommunicationCount = data[apiCalls.length - 3];
        $scope.dashboardActivities.nextMilestones = _.each(data[apiCalls.length - 2].values, formatActivity);
        $scope.dashboardActivities.nextMilestonesCount = data[apiCalls.length - 1];
      });
    };


    $scope.$watch('myCasesOnly', function (myCasesOnly) {
      $scope.activityFilters = {
        case_filter: {"case_type_id.is_active": 1, contact_is_deleted: 0}
      };
      var recentCaseFilter = {
        'status_id.grouping': 'Opened'
      };
      if (myCasesOnly) {
        $scope.activityFilters.case_filter.case_manager = CRM.config.user_contact_id;
        recentCaseFilter.case_manager = [CRM.config.user_contact_id];
      }
      $scope.recentCaseFilter = recentCaseFilter;
      $scope.recentCaseLink = '#/case/list?sf=modified_date&sd=DESC' + (myCasesOnly ? ('&cf=' + JSON.stringify({case_manager: [CRM.config.user_contact_id]})) : '');
      $scope.refresh();
    });
  });

  angular.module('civicase').directive('uibTabsetAffix', function ($timeout) {
    return {
      link: function(scope, $el, attrs) {
        $timeout(function() {

          var $tabNavigation = $('ul.nav'),
          $civicrmMenu = $('#civicrm-menu'),
          $tabContainer = $('.dashboard-tab-container');

          $tabNavigation.affix({
            offset: {
              top: $tabContainer.offset().top - 128
            }
          })
          .on('affixed.bs.affix', function() {
            $tabNavigation.css('top', $civicrmMenu.height());
          })
          .on('affixed-top.bs.affix', function() {
            $tabNavigation.css('top','auto');
          });
        });
    }
  };
});




  function FileFilterCtrl($scope) {
    var ts = $scope.ts = CRM.ts('civicase');
    $scope.fileCategoriesIT = CRM.civicase.fileCategories;
    $scope.activityCategories = CRM.civicase.activityCategories;
    $scope.customFilters = {
      grouping: ''
    };
    $scope.$watchCollection('customFilters', function() {
      if (!_.isEmpty($scope.customFilters.grouping)) {
        $scope.apiCtrl.params['activity_type_id.grouping'] = {'LIKE': '%' + $scope.customFilters.grouping + '%'};
      }
      else {
        delete $scope.apiCtrl.params['activity_type_id.grouping'];
      }
    });
  }

  angular.module('civicase').directive('civicaseFileFilter', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/FileFilter.html',
      controller: FileFilterCtrl,
      scope: {
        apiCtrl: '=civicaseFileFilter'
      }
    };
  });




  function FileListCtrl($scope, crmApi, crmBlocker, crmStatus) {
    var ts = $scope.ts = CRM.ts('civicase'),
      block = $scope.block = crmBlocker();
    $scope.CRM = CRM;

    $scope.$watchCollection('apiCtrl.result', function(r){

      $scope.values = r.values;
      $scope.xref = r.xref;

      $scope.activities = r.xref ? _.sortBy(r.xref.activity, 'activity_date_time').reverse() : [];

      $scope.filesByAct = {};
      _.each(r.values, function(match){
        if (!$scope.filesByAct[match.activity_id]) {
          $scope.filesByAct[match.activity_id] = [];
        }
        $scope.filesByAct[match.activity_id].push(r.xref.file[match.id]);
      });

      $scope.delete = function(activity, file) {
        var p = crmApi('Attachment', 'delete', {id: file.id})
          .then(function(){
            $scope.apiCtrl.refresh();
          });
        return block(crmStatus({start: ts('Deleting...'), success: ts('Deleted')}, p));
      }
    });
  }

  angular.module('civicase').directive('civicaseFileList', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/FileList.html',
      controller: FileListCtrl,
      scope: {
        apiCtrl: '=civicaseFileList'
      }
    };
  });




  function filesize(size) {
    size = parseInt(size); // paranoid
    if (size === 0) return '0 B';

    var i = Math.floor(Math.log(size) / Math.log(1024));
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
  }


  angular.module('civicase').directive('civicaseFilesize', function() {
    return {
      restrict: 'AE',
      scope: {
        civicaseFilesize: '='
      },
      link: function($scope, $el, $attr) {
        $scope.$watch('civicaseFilesize', function(newValue) {
          $el.text(filesize(newValue));
        });
      }
    };
  });

  function searchController($scope, $location, $timeout) {

    var ts = $scope.ts = CRM.ts('civicase');

    function mapSelectOptions(opt) {
      return {
        id: opt.value || opt.name,
        text: opt.label || opt.title,
        color: opt.color,
        icon: opt.icon
      };
    }

    var caseTypes = CRM.civicase.caseTypes,
      caseStatuses = CRM.civicase.caseStatuses;

    $scope.caseTypeOptions = _.map(caseTypes, mapSelectOptions);
    $scope.caseStatusOptions = _.map(caseStatuses, mapSelectOptions);
    $scope.customGroups = CRM.civicase.customSearchFields;
    $scope._ = _;
    $scope.checkPerm = CRM.checkPerm;

    $scope.filters = angular.extend({}, $scope.defaults);
    $scope.$watchCollection('filters', function(){
      if (!$scope.expanded) {
        $scope.doSearch();
      }
    });

    var $customScroll = $('.case-list-panel .custom-scroll-wrapper'),
      $tableHeader = $('.case-list-panel .inner table thead');

    $scope.$watch('expanded',function(){
      $timeout(function(){
        $($customScroll,$tableHeader).data('bs.affix').options.offset.top =  $('.case-list-panel').offset().top - 50;
      });
    });

    $scope.showMore = function() {
      $scope.expanded = true;
    };

    $scope.isEnabled = function(field) {
      return !$scope.hiddenFilters || !$scope.hiddenFilters[field];
    };

    $scope.setCaseManager = function() {
      $scope.filters.case_manager = $scope.caseManagerIsMe() ? null : [CRM.config.user_contact_id];
    };

    $scope.caseManagerIsMe = function() {
      return $scope.filters.case_manager && $scope.filters.case_manager.length === 1 && parseInt($scope.filters.case_manager[0], 10) === CRM.config.user_contact_id;
    };

    function formatSearchFilters(inp) {
      var search = {};
      _.each(inp, function(val, key) {
        if (!_.isEmpty(val) || (typeof val === 'number' && val) || typeof val === 'boolean' && val) {
          search[key] = val;
        }
      });
      return search;
    }
    $scope.doSearch = function() {
      $scope.filterDescription = buildDescription();
      $scope.expanded = false;
      $scope.$parent.$eval($scope.onSearch, {
        selectedFilters: formatSearchFilters($scope.filters)
      });
    };

    $scope.clearSearch = function() {
      $scope.filters = {};
      $scope.doSearch();
    };

    var allSearchFields = {
      id: {
        label: ts('Case ID'),
        html_type: 'Number'
      },
      contact_id: {
        label: ts('Case Client')
      },
      case_manager: {
        label: ts('Case Manager')
      },
      start_date: {
        label: ts('Start Date')
      },
      end_date: {
        label: ts('End Date')
      },
      is_deleted: {
        label: ts('Deleted Cases')
      },
      tag_id: {
        label: ts('Tags')
      }
    };
    _.each(CRM.civicase.customSearchFields, function(group) {
      _.each(group.fields, function(field) {
        allSearchFields['custom_' + field.id] = field;
      });
    });
    function buildDescription() {
      var des = [];
      _.each($scope.filters, function(val, key) {
        var field = allSearchFields[key];
        if (field) {
          var d = {label: field.label};
          if (field.options) {
            var text = [];
            _.each(val, function(o) {
              text.push(_.findWhere(field.options, {key: o}).value);
            });
            d.text = text.join(', ');
          } else if (key === 'case_manager' && $scope.caseManagerIsMe()) {
            d.text = ts('Me');
          } else if ($.isArray(val)) {
            d.text = ts('%1 selected', {'1': val.length});
          } else if ($.isPlainObject(val)) {
            if (val.BETWEEN) {
              d.text = val.BETWEEN[0] + ' - ' + val.BETWEEN[1];
            } else if (val['<=']) {
              d.text = '≤ ' + val['<='];
            } else if (val['>=']) {
              d.text = '≥ ' + val['>='];
            } else {
              var k = _.findKey(val, function() {return true;});
              d.text = k + ' ' + val[k];
            }
          } else if (typeof val === 'boolean') {
            d.text = val ? ts('Yes') : ts('No');
          } else {
            d.text = val;
          }
          des.push(d);
        }
      });
      return des;
    }
    $scope.filterDescription = buildDescription();
  }

  angular.module('civicase').directive('civicaseSearch', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/Search.html',
      controller: searchController,
      scope: {
        defaults: '=civicaseSearch',
        hiddenFilters: '=',
        onSearch: '@',
        expanded: '='
      }
    };
  });




  angular.module('civicase').config(function($routeProvider) {
    $routeProvider.when('/case/search', {
      reloadOnSearch: false,
      template: '<h1 crm-page-title>{{ ts(\'Find Cases\') }}</h1>' +
      '<div id="bootstrap-theme" class="civicase-main">' +
      '<div class="panel" civicase-search="selections" expanded="true" on-search="show(selectedFilters)">' +
      '</div>' +
      '<pre>{{selections|json}}</pre>'+
      '</div>',
      controller: searchPageController
    });
  });

  function searchPageController($scope) {
    var ts = $scope.ts = CRM.ts('civicase');
    $scope.selections = {};
    $scope.show = function(selectedFilters) {
      $scope.selections = selectedFilters;
    };
    $scope.$bindToRoute({
      expr: 'selections',
      param: 's',
      default: {status_id:['Urgent']}
    });
  }



  angular.module('civicase').directive('civicaseTypeDonutChart', function(doNutty, crmApi, civicaseInteger) {
    return {
      restrict: 'AE',
      scope: {
        civicaseTypeDonutChart: '='
      },
      link: function($scope, $el, $attr) {
        var dc = CRM.visual.dc, d3 = CRM.visual.d3, crossfilter = CRM.visual.crossfilter;
        var ts = $scope.ts = CRM.ts('civicase');

        function fullDraw(data) {
          $el.find('svg').remove();

          var ndx = crossfilter(data);
          var caseTypeDimension = ndx.dimension(function(d) { return d['case_type_id.title']; });
          var caseTypeCountGroup = caseTypeDimension.group().reduceSum(function(d){return d.count;});
          var caseTypeSum = ndx.groupAll().reduceSum(function(d){return d.count;});

          var chart = dc.pieChart($el[0]);
          chart
              .slicesCap(5)
              .dimension(caseTypeDimension)
              .group(caseTypeCountGroup)
              .colors(d3.scale.category20())
              .label(function(d) {return "";});

          doNutty(chart, 250, function(){
            var v = caseTypeSum.value();
            return {
              number: civicaseInteger(v),
              text: (v === 1) ? ts('case') : ts('cases')
            };
          });

          chart.render();
          chart.svg().classed('civicase-type-donut-chart', true);
        }

        $scope.$watchCollection('civicaseTypeDonutChart', function(params){
          crmApi('Case', 'gettypestats', params).then(function(response){
            var data = response.values;
            data.forEach(function(x) {
              x.count = +x.count;
            });
            fullDraw(data);
          });
        });
      }
    };
  });


  angular.module('civicase').directive('civicaseTypeDurationChart', function(crmApi) {
    return {
      restrict: 'AE',
      scope: {
        civicaseTypeDurationChart: '='
      },
      link: function($scope, $el, $attr) {
        var dc = CRM.visual.dc, d3 = CRM.visual.d3, crossfilter = CRM.visual.crossfilter;
        var ts = $scope.ts = CRM.ts('civicase');

        function fullDraw(data) {
          $el.find('svg').remove();

          var chart = dc.rowChart($el[0]),
            ndx                 = crossfilter(data),
            caseTypeDimension   = ndx.dimension(function(d) {return d['case_type_id.title'];}),
            countGroup          = caseTypeDimension.group().reduce(
              function onAdd(p,v) { p.count += v.count; p.total += (v.count * v.average_duration); return p;},
              function onRemove(p,v) { p.count -= v.count; p.total -= (v.count * v.average_duration); return p; },
              function onInit() {return {count: 0, total: 0}; }
            );

          var format = d3.format('.2f');
          function avg(p) { return (p.count) ? format(p.total / p.count) : 0; }

          chart
            .width(300)
            .height(125)
            .elasticX(true)
            .colors(d3.scale.category20())
            .dimension(caseTypeDimension)
            .group(countGroup)
            .valueAccessor(function(d) { return avg(d.value); } )
            .title(function(d){return ts('%1 days', {1: avg(d.value)});})
            .render();

          chart.onClick = function(){};
          chart.svg().classed('civicase-type-duration-chart', true);

          chart.svg().selectAll('rect').attr('rx', 5).attr('ry', 5);
        }

        $scope.$watchCollection('civicaseTypeDurationChart', function(params){
          crmApi('Case', 'gettypestats', params).then(function(response){
            response.values.forEach(function(x) {
              x.count = +x.count;
              x.average_duration = +x.average_duration;
            });
            fullDraw(response.values);
          });
        });
      }
    };
  });



  function caseFilesController($scope, crmApi, crmBlocker, crmStatus, FileUploader, $q, $timeout) {
    var ts = $scope.ts = CRM.ts('civicase'),
      ctx = $scope.ctx,
      block = $scope.block = crmBlocker();

    function initActivity() {
      $scope.activity = {
        case_id: ctx.id,
        activity_type_id: 'File Upload',
        subject: ''
      };
    }
    initActivity();
    $scope.$watchCollection('ctx.id', initActivity);

    $scope.isUploadActive = function() {
      return ($scope.uploader.queue.length > 0);
    };

    $scope.uploader = new FileUploader({
      url: CRM.url('civicrm/ajax/attachment'),
      onAfterAddingFile: function onAfterAddingFile(item) {
        item.crmData = {description: ''};
      },
      onSuccessItem: function onSuccessItem(item, response, status, headers) {
        var ok = status == 200 && _.isObject(response) && response.file && (response.file.is_error === 0);
        if (!ok) {
          this.onErrorItem(item, response, status, headers);
        }
      },
      onErrorItem: function onErrorItem(item, response, status, headers) {
        var msg = (response && response.file && response.file.error_message) ? response.file.error_message : ts('Unknown error');
        CRM.alert(item.file.name + ' - ' + msg, ts('Attachment failed'), 'error');
      },
      /** Like uploadAll(), but it returns a promise. */
      uploadAllWithPromise: function() {
        var dfr = $q.defer(), self = this;
        self.onCompleteAll = function() {
          dfr.resolve();
          self.onCompleteAll = null;
        };
        self.uploadAll();
        return dfr.promise;
      }
    });

    $scope.deleteActivity = function deleteActivity() {
      $scope.uploader.clearQueue();
      $scope.activity = null;
    };

    $scope.saveActivity = function saveActivity() {
      var promise = crmApi('Activity', 'create', $scope.activity)
        .then(function (r) {
          var target = {entity_table: 'civicrm_activity', entity_id: r.id};
          _.each($scope.uploader.getNotUploadedItems(), function (item) {
            item.formData = [_.extend({crm_attachment_token: CRM.crmAttachment.token}, target, item.crmData)];
          });
          return $scope.uploader.uploadAllWithPromise();
        }).then(function(){
          return pwait(1000); // Let the user absorb what happened.
        }).then(function(){
          $scope.uploader.clearQueue();
          initActivity();
          if ($scope.onUpload) {
            $scope.$parent.$eval($scope.onUpload);
          }
        });
      return block(crmStatus({start: ts('Uploading...'), success: ts('Uploaded')}, promise));
    };


    function pwait(delay) {
      var dfr = $q.defer();
      $timeout(function(){ dfr.resolve(); }, delay);
      return dfr.promise;
    }
  }

  angular.module('civicase').directive('civicaseUploader', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/Uploader.html',
      controller: caseFilesController,
      scope: {
        ctx: '=civicaseUploader',
        onUpload: '@'
      }
    };
  });

})(angular, CRM.$, CRM._);

(function(angular, $, _, CRM) {

  function getStatusType(status_id) {
    var statusType;
    _.each(CRM.civicase.activityStatusTypes, function(statuses, type) {
      if (statuses.indexOf(parseInt(status_id)) >= 0) {
        statusType = type;
      }
    });
    return statusType;
  }

  angular.module('civicase').directive('civicaseSortheader', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        function change() {
          element.toggleClass('sorting', attrs.civicaseSortheader === scope.sort.field);
          element.find('i.cc-sort-icon').remove();
          if (attrs.civicaseSortheader === scope.sort.field) {
            element.append('<i class="cc-sort-icon fa fa-arrow-circle-' + (scope.sort.dir === 'ASC' ? 'up' : 'down') + '"></i>');
          }
        }

        scope.changeSortDir = function() {
          scope.sort.dir = (scope.sort.dir === 'ASC' ? 'DESC' : 'ASC');
        };

        if (scope.sort.sortable && attrs.civicaseSortheader != '') {
          element
            .addClass('civicase-sortable')
            .on('click', function (e) {
              scope.$apply(function () {
                if ($(e.target).is('th, .cc-sort-icon')) {
                  if (scope.sort.field === attrs.civicaseSortheader) {
                    scope.changeSortDir();
                  } else {
                    scope.sort.field = attrs.civicaseSortheader;
                    scope.sort.dir = 'ASC';
                  }
                }
              });
            });
        }

        scope.$watchCollection('sort', change);
      }
    };
  });

  angular.module('civicase').factory('civicaseInteger', function() {
    var myFormat = CRM.visual.d3.format(".3s");
    return function(v) {
      return (v > -1000 & v < 1000) ? Math.round(v) : myFormat(v);
    };
  });

  /** doNutty converts a dc.pieChart() to a stylized donut chart. */
  angular.module('civicase').factory('doNutty', function() {
    return function doNutty(chart, totalWidth, statCallback) {
      var legendWidth = Math.floor(totalWidth / 2), radius = Math.floor(totalWidth / 4);
      var padding = 10, thickness = 0.3;
      var legend;

      chart
          .width(legendWidth + (radius * 2))
          .height(radius * 2)
          .innerRadius(Math.floor(radius * (1-thickness)))
          .cx(radius);

      function moveLegend() {
        var size  = chart.group().size();
        legend.gap(padding);
        var legendHeight = (size * legend.itemHeight()) + ((size-1) * legend.gap());
        legend
            .x(padding+(radius * 2))
            .y((chart.height() - legendHeight)/2);
        legend.render();
      }

      var g;
      chart
        .on('postRender', function(){
          legend = CRM.visual.dc.legend();
          chart.legend(legend);
          moveLegend();
          var stat = statCallback();
          g = chart.svg()
              .append("g")
              .classed('dc-donutty-label', 'true')
              .attr("transform", "translate(" + radius + "," + radius + ")");
          g.append("text")
              .attr("dy", "0em")
              .attr("text-anchor", "middle")
              .classed("dc-donutty-label-main", "true")
              .text(stat.number);
          g.append("text")
              .attr("dy", "1em")
              .attr("text-anchor", "middle")
              .classed("dc-donutty-label-sub", "true")
              .text(stat.text);
        })
        .on('postRedraw', function(){
          moveLegend();
          if (g) {
            var stat = statCallback();
            g.selectAll('.dc-donutty-label-main').text(stat.number);
            g.selectAll('.dc-donutty-label-sub').text(stat.text);
          }
        });

    };
  });

  angular.module('civicase').factory('formatActivity', function() {
    var activityTypes = CRM.civicase.activityTypes,
      activityStatuses = CRM.civicase.activityStatuses,
      caseTypes = CRM.civicase.caseTypes,
      caseStatuses = CRM.civicase.caseStatuses;
    return function (act, caseId) {
      act.category = (activityTypes[act.activity_type_id].grouping ? activityTypes[act.activity_type_id].grouping.split(',') : []);
      act.icon = activityTypes[act.activity_type_id].icon;
      act.type = activityTypes[act.activity_type_id].label;
      act.status = activityStatuses[act.status_id].label;
      act.status_name = activityStatuses[act.status_id].name;
      act.status_type = getStatusType(act.status_id);
      act.is_completed = act.status_type !== 'incomplete'; // FIXME doesn't distinguish cancelled from completed
      act.is_overdue = (typeof act.is_overdue === 'string') ? (act.is_overdue === '1') : act.is_overdue;
      act.color = activityStatuses[act.status_id].color || '#42afcb';
      act.status_css = 'status-type-' + act.status_type + ' activity-status-' + act.status_name.toLowerCase().replace(' ', '-');
      if (act.category.indexOf('alert') > -1) {
        act.color = ''; // controlled by css
      }
      if (caseId && (!act.case_id || act.case_id === caseId || _.contains(act.case_id, caseId))) {
        act.case_id = caseId;
      } else if (act.case_id) {
        act.case_id = act.case_id[0];
      } else {
        act.case_id = null;
      }
      if (act['case_id.case_type_id']) {
        act.case = {};
        _.each(act, function(val, key) {
          if (key.indexOf('case_id.') === 0) {
            act.case[key.replace('case_id.', '')] = val;
            delete act[key];
          }
        });
        act.case.client = [];
        act.case.status = caseStatuses[act.case.status_id];
        act.case.type = caseTypes[act.case.case_type_id];
        _.each(act.case.contacts, function(contact) {
          if (!contact.relationship_type_id) {
            act.case.client.push(contact);
          }
          if (contact.manager) {
            act.case.manager = contact;
          }
        });
        delete act.case.contacts;
      }
    };
  });

  angular.module('civicase').factory('formatCase', function(formatActivity) {
    var caseTypes = CRM.civicase.caseTypes,
      caseStatuses = CRM.civicase.caseStatuses;
    return function(item) {
      item.myRole = [];
      item.client = [];
      item.subject = (typeof item.subject === 'undefined') ? '' : item.subject;
      item.status = caseStatuses[item.status_id].label;
      item.color = caseStatuses[item.status_id].color;
      item.case_type = caseTypes[item.case_type_id].title;
      item.selected = false;
      item.is_deleted = item.is_deleted === '1';
      _.each(item.activity_summary, function(activities) {
        _.each(activities, function(act) {
          formatActivity(act, item.id);
        });
      });

      _.each(item, function(field) {
        if (field && typeof field.activity_date_time != 'undefined') {
          formatActivity(field, item.id);
        }
      });

      _.each(item.contacts, function(contact) {
        if (!contact.relationship_type_id) {
          item.client.push(contact);
        }
        if (contact.contact_id == CRM.config.user_contact_id) {
          item.myRole.push(contact.role);
        }
        if (contact.manager) {
          item.manager = contact;
        }
      });
      return item;
    };
  });

  angular.module('civicase').factory('getActivityFeedUrl', function($route, $location) {
    return function(caseId, category, status, id) {
      caseId = parseInt(caseId, 10);
      var af = {},
        currentPath = $location.path();
      if (category) {
        af["activity_type_id.grouping"] = category;
      }
      if (status) {
        af.status_id = CRM.civicase.activityStatusTypes[status];
      }
      var p = {
        caseId: caseId,
        tab: 'activities',
        aid: id || 0,
        focus: 1,
        sx: 0,
        ai: '{"myActivities":false,"delegated":false}',
        af: JSON.stringify(af)
      };

      if (currentPath !== '/case/list') {
        p.cf = JSON.stringify({id: caseId});
      } else {
        p = angular.extend({}, $route.current.params, p);
      }
      return '/case/list?' + $.param(p);
    };
  });

  angular.module('civicase').factory('templateExists', function($templateCache) {
    return function(templateName) {
      return !!$templateCache.get(templateName);
    };
  });


  angular.module('civicase').directive('civicaseUtil', function(){
    return {
      restrict: 'EA',
      scope: {
        civicaseUtil: '='
      },
      controller: function ($scope, formatActivity) {
        var util = this;
        util.formatActivity = function(a) {formatActivity(a);return a;};
        util.formatActivities = function(rows) {_.each(rows, formatActivity);return rows;};
        util.isSameDate = function(d1, d2) {
          return d1 && d2 && (d1.slice(0, 10) === d2.slice(0, 10));
        };

        $scope.civicaseUtil = this;
      }
    };
  });

  angular.module('civicase').directive('crmPopupFormSuccess', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element.addClass('crm-popup')
          .on('crmPopupFormSuccess', function(event, element, data) {
            scope.$apply(function() {
              scope.$eval(attrs.crmPopupFormSuccess, {"$event": event, "$data": data});
            });
          });
      }
    };
  });

  angular.module('civicase').directive('crmFormSuccess', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element
          .on('crmFormSuccess', function(event, data) {
            scope.$apply(function() {
              scope.$eval(attrs.crmFormSuccess, {"$event": event, "$data": data});
            });
          });
      }
    };
  });

  angular.module('civicase').directive('crmUiDateRange', function($timeout) {
    var ts = CRM.ts('civicase');
    return {
      restrict: 'AE',
      scope: {
        data: '=crmUiDateRange'
      },
      template: '<span><input class="form-control" crm-ui-datepicker="{time: false}" ng-model="input.from" placeholder="' + ts('From') + '" /></span>' +
        '<span><input class="form-control" crm-ui-datepicker="{time: false}" ng-model="input.to" placeholder="' + ts('To') + '" /></span>',
      link: function (scope, element, attrs) {
        scope.input = {};

        element.addClass('crm-ui-range');

        element.on('change', function(e, context) {
          if (context === 'userInput' || context === 'crmClear') {
            $timeout(function () {
              if (scope.input.from && scope.input.to) {
                scope.data = {BETWEEN: [scope.input.from, scope.input.to]};
              } else if (scope.input.from) {
                scope.data = {'>=': scope.input.from};
              } else if (scope.input.to) {
                scope.data = {'<=': scope.input.to};
              } else {
                scope.data = null;
              }
            });
          }
        });

        scope.$watchCollection('data', function() {
          if (!scope.data) {
            scope.input = {};
          } else if (scope.data.BETWEEN) {
            scope.input.from = scope.data.BETWEEN[0];
            scope.input.to = scope.data.BETWEEN[1];
          } else if (scope.data['>=']) {
            scope.input = {from: scope.data['>=']};
          } else if (scope.data['<=']) {
            scope.input = {to: scope.data['<=']};
          }
        });
      }
    };
  });

  angular.module('civicase').directive('crmUiNumberRange', function($timeout) {
    var ts = CRM.ts('civicase');
    return {
      restrict: 'AE',
      scope: {
        data: '=crmUiNumberRange'
      },
      template: '<span><input class="form-control" type="number" ng-model="input.from" placeholder="' + ts('From') + '" /></span>' +
        '<span><input class="form-control" type="number" ng-model="input.to" placeholder="' + ts('To') + '" /></span>',
      link: function (scope, element, attrs) {
        scope.input = {};

        element.addClass('crm-ui-range');

        element.on('change', function() {
          $timeout(function () {
            if (scope.input.from && scope.input.to) {
              scope.data = {BETWEEN: [scope.input.from, scope.input.to]};
            } else if (scope.input.from) {
              scope.data = {'>=': scope.input.from};
            } else if (scope.input.to) {
              scope.data = {'<=': scope.input.to};
            } else {
              scope.data = null;
            }
          });
        });

        scope.$watchCollection('data', function() {
          if (!scope.data) {
            scope.input = {};
          } else if (scope.data.BETWEEN) {
            scope.input.from = scope.data.BETWEEN[0];
            scope.input.to = scope.data.BETWEEN[1];
          } else if (scope.data['>=']) {
            scope.input = {from: scope.data['>=']};
          } else if (scope.data['<=']) {
            scope.input = {to: scope.data['<=']};
          }
        });
      }
    };
  });

  angular.module('civicase').directive('crmUiConditional', function() {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        scope.$on('$destroy', function () {
          var modelAttr = attrs.ngModel || attrs.crmUiDateRange;
          var val = scope.$eval(modelAttr);
          if (typeof val !== 'undefined') {
            scope.$eval(modelAttr + ' = null');
          }
        });
      }
    };
  });

  angular.module('civicase').directive('crmEditable', function($timeout) {
    function nl2br(str) {
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    }
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        CRM.loadScript(CRM.config.resourceBase + 'js/jquery/jquery.crmEditable.js').done(function () {
          var textarea = elem.data('type') === 'textarea',
            field = elem.data('field');
          elem
            .html(textarea ? nl2br(scope.model[field]) : _.escape(scope.model[field]))
            .on('crmFormSuccess', function(e, value) {
              $timeout(function() {
                scope.$apply(function() {
                  scope.model[field] = value;
                });
              });
            })
            .crmEditable();
          scope.$watchCollection('model', function(model) {
            elem.html(textarea ? nl2br(model[field]) : _.escape(model[field]));
          });
        });
      },
      scope: {
        model: '=crmEditable'
      }
    };
  });










  angular.module('civicase').directive('searchableDropdown', function($timeout) {
    return {
      restrict: 'C',
      link: function(scope, elem, attrs) {
        $('input', elem)
          .attr('placeholder', "\uF002")
          .click(function(e) {
            e.stopPropagation();
          })
          .keyup(function(e) {

            if (e.which == 40) {
              $(this).closest('.searchable-dropdown').next().find('a').first().focus();
            }
          });
        elem.on('click', function() {
          var $input = $('input', this).val('').change();
          $timeout(function() {
            $input.focus();
          }, 100);
        });
      }
    };
  });

  angular.module('civicase').directive('civicaseActivityContacts', function() {
    return {
      restrict: 'A',
      scope: {
        data: '=civicaseActivityContacts'
      },
      link: function (scope, elem, attrs) {
        scope.url = CRM.url;
        scope.ts = CRM.ts('civicase');
        function refresh() {
          if (_.isPlainObject(scope.data)) {
            scope.contacts = [];
            _.each(scope.data, function (name, cid) {
              scope.contacts.push({display_name: name, contact_id: cid});
            });
          } else {
            scope.contacts = _.cloneDeep(scope.data);
          }
        }
        scope.$watch('data', refresh);
      },
      template:
        '<a ng-if="contacts.length" title="{{ ts(\'View Contact\') }}" href="{{ url(\'civicrm/contact/view\', {cid: contacts[0].contact_id}) }}">{{ contacts[0].display_name }}</a> ' +
        '<span ng-if="contacts.length === 2">&amp; <a title="{{ ts(\'View Contact\') }}" href="{{ url(\'civicrm/contact/view\', {cid: contacts[1].contact_id}) }}">{{ contacts[1].display_name }}</a></span>' +

        '<div class="btn-group btn-group-xs" ng-if="contacts.length > 2" ng-click="$event.preventDefault();">' +
        '  <button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="{{ ts(\'Additional Contacts\') }}">' +
        '    + {{ contacts.length - 1 }}' +
        '  </button>' +
        '  <ul class="dropdown-menu" >' +
        '    <li ng-repeat="(index, contact) in contacts" ng-if="index">' +
        '      <a title="{{ ts(\'View Contact\') }}" href="{{ url(\'civicrm/contact/view\', {cid: contact.contact_id}) }}">{{ contact.display_name }}</a>' +
        '    </li>' +
        '  </ul>' +
        '</div>'
    };
  });

  angular.module('civicase').directive('civicaseEditCustomData', function($timeout) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        var form;

        function close() {
          form.remove();
          elem.show();
          form = null;
        }

        elem
          .addClass('crm-editable-enabled')
          .on('click', function(e) {
            if (!form) {
              var url = CRM.url('civicrm/case/cd/edit', {
                cgcount: 1,
                action: 'update',
                reset: 1,
                type: 'Case',
                entityID: scope.item.id,
                groupID: scope.customGroup.id,
                cid: scope.item.client[0].contact_id,
                subType: scope.item.case_type_id,
                civicase_reload: scope.caseGetParams()
              });
              form = $('<div></div>').html(elem.hide().html());
              form.insertAfter(elem)
                .on('click', '.cancel', close)
                .on('crmLoad', function() {

                  $('a.crm-clear-link', form).removeAttr('href');
                })
                .on('crmFormSuccess', function(e, data) {
                  scope.$apply(function() {
                    scope.pushCaseData(data.civicase_reload[0]);
                    close();
                  });
                });
              CRM.loadForm(url, {target: form});
            }
          });
      }
    };
  });

  angular.module('civicase').directive('dropdownToggle', function($timeout) {
    return {
      restrict: 'C',
      link: function(scope, $el, attrs) {
        function dropDownFixPosition(button,dropdown){
          var dropDownTop = - $(window).scrollTop() + button.offset().top + button.outerHeight();
          dropdown.css('top', dropDownTop + "px");
          if(dropdown.hasClass('dropdown-menu-right')) {
            dropdown.css('left', button.offset().left - dropdown.outerWidth() + button.outerWidth() + "px");
          }
          else {
            dropdown.css('left', button.offset().left + "px");
          }
        }

        $timeout(function() {
          $($el).click(function(){
            dropDownFixPosition($(this),$(this).next('.dropdown-menu'));
          });

          document.addEventListener('scroll', function(e){
            dropDownFixPosition($($el),$($el).next('.dropdown-menu'));
          }, true);
        });
      }
    };
  });

  angular.module('civicase').directive('calculateScrollWidth', function() {
    return {
      restrict: 'A',
      link: function(scope, $el, attrs) {
        scope.$watch(
          function () {
            return $('.case-list-table thead.affix-top').css('width');
          },
          function(width) {
            $('.custom-scroll').css('width', width);
          }
        );
      }
    };
  });

})(angular, CRM.$, CRM._, CRM);

(function(angular, $, _) {

  function caseViewController($scope, crmApi, formatActivity, formatCase, getActivityFeedUrl, $route, $timeout) {

    var ts = $scope.ts = CRM.ts('civicase');
    var caseTypes = CRM.civicase.caseTypes;
    var caseStatuses = $scope.caseStatuses = CRM.civicase.caseStatuses;
    var activityTypes = $scope.activityTypes = CRM.civicase.activityTypes;
    var panelLimit = 5;
    $scope.activityFeedUrl = getActivityFeedUrl;
    $scope.caseTypesLength = _.size(caseTypes);
    $scope.CRM = CRM;
    $scope.item = null;
    $scope.caseGetParams = function() {
      return JSON.stringify(caseGetParams());
    };

    $scope.upNextCategories = _.cloneDeep(CRM.civicase.activityCategories);
    delete $scope.upNextCategories.alert;
    delete $scope.upNextCategories.system;

    function caseGetParams() {
      return {
        id: $scope.item.id,
        return: ['subject', 'contact_id', 'case_type_id', 'status_id', 'contacts', 'start_date', 'end_date', 'is_deleted', 'activity_summary', 'activity_count', 'category_count', 'tag_id.name', 'tag_id.color', 'tag_id.description', 'tag_id.parent_id', 'related_case_ids'],

        'api.Case.get.1': {
          contact_id: {IN: "$value.contact_id"},
          id: {"!=": "$value.id"},
          is_deleted: 0,
          return: ['case_type_id', 'start_date', 'end_date', 'status_id', 'contacts', 'subject']
        },

        'api.Case.get.2': {
          id: {IN: "$value.related_case_ids"},
          is_deleted: 0,
          return: ['case_type_id', 'start_date', 'end_date', 'status_id', 'contacts', 'subject']
        },

        'api.Activity.get.1': {
          case_id: "$value.id",
          is_current_revision: 1,
          is_test: 0,
          "activity_type_id.grouping": {LIKE: "%communication%"},
          'status_id.filter': 1,
          options: {limit: panelLimit, sort: 'activity_date_time DESC'},
          return: ['activity_type_id', 'subject', 'activity_date_time', 'status_id', 'target_contact_name', 'assignee_contact_name', 'is_overdue', 'is_star', 'file_id']
        },

        'api.Activity.get.3': {
          case_id: "$value.id",
          is_current_revision: 1,
          is_test: 0,
          "activity_type_id.grouping": {LIKE: "%task%"},
          'status_id.filter': 0,
          options: {limit: panelLimit, sort: 'activity_date_time ASC'},
          return: ['activity_type_id', 'subject', 'activity_date_time', 'status_id', 'target_contact_name', 'assignee_contact_name', 'is_overdue', 'is_star', 'file_id']
        },

        'api.CustomValue.gettree': {
          entity_id: "$value.id",
          entity_type: 'Case',
          return: ['custom_group.id', 'custom_group.name', 'custom_group.title', 'custom_group.collapse_display', 'custom_field.name', 'custom_field.label', 'custom_value.display']
        },

        'api.Relationship.get': {
          case_id:  "$value.id",
          is_active: 1,
          return: ['id', 'relationship_type_id', 'contact_id_a', 'contact_id_b', 'description'],
        },
        sequential: 1
      };
    }

    function getAllowedCaseStatuses(definition) {
      var ret = _.cloneDeep(caseStatuses);
      if (definition.statuses && definition.statuses.length) {
        _.each(_.cloneDeep(ret), function(status, id) {
          if (definition.statuses.indexOf(status.name) < 0) {
            delete(ret[id]);
          }
        });
      }
      return ret;
    }

    function getAvailableActivityTypes(activityCount, definition) {
      var ret = [],
        exclude = ['Change Case Status', 'Change Case Type'];
      _.each(definition.activityTypes, function(actSpec) {
        if (exclude.indexOf(actSpec.name) < 0) {
          var actTypeId = _.findKey(activityTypes, {name: actSpec.name});
          if (!actSpec.max_instances || !activityCount[actTypeId] || (actSpec.max_instances < activityCount[actTypeId])) {
            ret.push($.extend({id: actTypeId}, activityTypes[actTypeId]));
          }
        }
      });
      return _.sortBy(ret, 'label');
    }

    $scope.tabs = [
      {name: 'summary', label: ts('Summary')},
      {name: 'activities', label: ts('Activities')},
      {name: 'people', label: ts('People')},
      {name: 'files', label: ts('Files')}
    ];

    $scope.selectTab = function(tab) {
      $scope.activeTab = tab;
      if (typeof $scope.isFocused === 'boolean') {
        $scope.isFocused = true;
      }
    };

    $scope.$watch('isFocused', function() {
      $timeout(function() {
        var $actHeader = $('.act-feed-panel .panel-header'),
        $actControls = $('.act-feed-panel .act-list-controls');

        if($actHeader.hasClass('affix')) {
            $actHeader.css('width',$('.act-feed-panel').css('width'));
        }
        else {
          $actHeader.css('width', 'auto');
        }

        if($actControls.hasClass('affix')) {
            $actControls.css('width',$actHeader.css('width'));
        }
        else {
          $actControls.css('width', 'auto');
        }
      },1500);
      
    });

    function formatAct(act) {
      return formatActivity(act, $scope.item.id);
    }

    function formatCaseDetails(item) {
      formatCase(item);
      item.definition = caseTypes[item.case_type_id].definition;
      item.relatedCases = _.each(_.cloneDeep(item['api.Case.get.1'].values), formatCase);

      _.each(_.cloneDeep(item['api.Case.get.2'].values), function(linkedCase) {
        var existing = _.find(item.relatedCases, {id: linkedCase.id});
        if (existing) {
          existing.is_linked = true;
        } else {
          linkedCase.is_linked = true;
          item.relatedCases.push(formatCase(linkedCase));
        }
      });
      delete(item['api.Case.get.1']);
      delete(item['api.Case.get.2']);

      item.recentCommunication = _.each(_.cloneDeep(item['api.Activity.get.1'].values), formatAct);
      delete(item['api.Activity.get.1']);

      item.tasks = _.each(_.cloneDeep(item['api.Activity.get.3'].values), formatAct);
      delete(item['api.Activity.get.3']);

      item.customData = item['api.CustomValue.gettree'].values || [];
      _.each(item.customData, function(customGroup, index) {
        customGroup.collapse_display = customGroup.collapse_display === '1';

        if ($scope.item && $scope.item.customData) {
          customGroup.collapse_display = $scope.item.customData[index].collapse_display;
        }
      });
      delete(item['api.CustomValue.gettree']);
      return item;
    }

    $scope.gotoCase = function(item, $event) {
      if ($event && $($event.target).is('a, a *, input, button, button *')) {
        return;
      }
      var cf = {
        case_type_id: [caseTypes[item.case_type_id].name],
        status_id: [caseStatuses[item.status_id].name]
      };
      var p = angular.extend({}, $route.current.params, {caseId: item.id, cf: JSON.stringify(cf)});
      $route.updateParams(p);
    };

    $scope.pushCaseData = function(data) {

      if ($scope.item && data.id === $scope.item.id) {

        delete($scope.item.tag_id);
        _.assign($scope.item, formatCaseDetails(data));
        $scope.allowedCaseStatuses = getAllowedCaseStatuses($scope.item.definition);
        $scope.availableActivityTypes = getAvailableActivityTypes($scope.item.activity_count, $scope.item.definition);
        $scope.$broadcast('updateCaseData');
      }
    };

    $scope.refresh = function(apiCalls) {
      if (!_.isArray(apiCalls)) apiCalls = [];
      apiCalls.push(['Case', 'getdetails', caseGetParams()]);
      crmApi(apiCalls, true).then(function(result) {
        $scope.pushCaseData(result[apiCalls.length - 1].values[0]);
      });
    };

    $scope.onChangeSubject = function(newSubject) {
      CRM.api3('Activity', 'create', {
        case_id: $scope.item.id,
        activity_type_id: 'Change Case Subject',
        subject: newSubject,
        status_id: 'Completed'
      });
    };

    $scope.markCompleted = function(act) {
      $scope.refresh([['Activity', 'create', {id: act.id, status_id: act.is_completed ? 'Scheduled' : 'Completed'}]]);
    };

    $scope.getActivityType = function(name) {
      return _.findKey(activityTypes, {name: name});
    };

    $scope.newActivityUrl = function(actType) {
      var path = 'civicrm/case/activity',
        args = {
          action: 'add',
          reset: 1,
          cid: $scope.item.client[0].contact_id,
          caseid: $scope.item.id,
          atype: actType.id,
          civicase_reload: $scope.caseGetParams()
        };

      if (actType.name === 'Email') {
        path = 'civicrm/activity/email/add';
        args.context = 'standalone';
        delete args.cid;
      }
      if (actType.name === 'Print PDF Letter') {
        path = 'civicrm/activity/pdf/add';
        args.context = 'standalone';
      }
      return CRM.url(path, args);
    };

    $scope.editActivityUrl = function(id) {
      return CRM.url('civicrm/case/activity', {
        action: 'update',
        reset: 1,
        cid: $scope.item.client[0].contact_id,
        caseid: $scope.item.id,
        id: id,
        civicase_reload: $scope.caseGetParams()
      });
    };

    $scope.viewActivityUrl = function(id) {
      return CRM.url('civicrm/case/activity', {
        action: 'update',
        reset: 1,
        cid: $scope.item.client[0].contact_id,
        caseid: $scope.item.id,
        id: id,
        civicase_reload: $scope.caseGetParams()
      });
    };

    $scope.addTimeline = function(name) {
      $scope.refresh([['Case', 'addtimeline', {case_id: $scope.item.id, 'timeline': name}]]);
    };

    $scope.isSameDate = function(d1, d2) {
      return d1 && d2 && (d1.slice(0, 10) === d2.slice(0, 10));
    };

    $scope.panelPlaceholders = function(num) {
      return _.range(num > panelLimit ? panelLimit : num);
    };

    $scope.$watch('item', function() {

      if ($scope.item && $scope.item.id && !$scope.item.definition) {
        crmApi('Case', 'getdetails', caseGetParams()).then(function (info) {
          $scope.pushCaseData(info.values[0]);
        });
      }
    });
  }

  angular.module('civicase').directive('civicaseView', function() {
    return {
      restrict: 'A',
      template:
        '<div class="panel panel-default civicase-view-panel">' +
          '<div class="panel-header" ng-if="item" ng-include="\'~/civicase/CaseViewHeader.html\'"></div>' +
          '<div class="panel-body case-view-body" ng-if="item" ng-include="\'~/civicase/CaseTabs.html\'"></div>' +
          '<div ng-if="!item" class="case-view-placeholder-panel" ng-include="\'~/civicase/CaseViewPlaceholder.html\'"></div>' +
        '</div>' +
        '<div class="panel panel-primary civicase-view-other-cases-panel" ng-if="item && item.relatedCases.length && activeTab === \'summary\'" ng-include="\'~/civicase/CaseViewOtherCases.html\'"></div>',
      controller: caseViewController,
      scope: {
        activeTab: '=civicaseTab',
        isFocused: '=civicaseFocused',
        item: '=civicaseView'
      }
    };
  })
  .directive('caseTabAffix', function($timeout) {
    return {
      scope: {},
      link: function(scope, $el, attrs) {

        $timeout(function() {
          $caseNavigation = $('.civicase-view-tab-bar'),
          $civicrmMenu = $('#civicrm-menu'),
          $casePanelBody = $('.civicase-view-panel > .panel-body');

          $caseNavigation.affix({
            offset: {
              top: $casePanelBody.offset().top - 87
            }
          })
          .on('affixed.bs.affix', function() {
            $caseNavigation.css('top', $civicrmMenu.height());
          })
          .on('affixed-top.bs.affix', function() {
            $caseNavigation.css('top','auto');
          });
        });
      }
    };
  });


  angular.module('civicase').directive('civicaseViewFiles', function() {
    return {
      restrict: 'AE',
      templateUrl: '~/civicase/ViewFiles.html',
      scope: {
        item: '=civicaseViewFiles'
      },
      link: function($scope, $el, $attr) {
        var ts = $scope.ts = CRM.ts('civicase');
        $scope.$watch('item', function(newValue){
          
        });
      }
    };
  });

  function casePeopleController($scope, crmApi) {

    var ts = $scope.ts = CRM.ts('civicase'),
      item = $scope.item,
      clientIds = _.map(item.client, 'contact_id'),
      clients = _.indexBy(item.client, 'contact_id'),
      relTypes = CRM.civicase.relationshipTypes,
      relTypesByName = _.indexBy(relTypes, 'name_b_a');

    $scope.CRM = CRM;
    $scope.allowMultipleCaseClients = CRM.civicase.allowMultipleCaseClients;
    $scope.roles = [];
    $scope.rolesFilter = '';
    $scope.rolesPage = 1;
    $scope.rolesAlphaFilter = '';
    $scope.rolesSelectionMode = '';
    $scope.rolesSelectedTask = '';
    $scope.relations = [];
    $scope.relationsPage = 1;
    $scope.relationsAlphaFilter = '';
    $scope.relationsSelectionMode = '';
    $scope.relationsSelectedTask = '';
    $scope.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    $scope.contactTasks = CRM.civicase.contactTasks;
    $scope.ceil = Math.ceil;

    function formatRole (role) {
      var relType = relTypesByName[role.name];
      role.role = relType.label_b_a;
      role.contact_type = relType.contact_type_b;
      role.contact_sub_type = relType.contact_sub_type_b;
      role.description = (role.manager ? (ts('Case Manager.') + ' ') : '') + (relType.description || '');
      role.relationship_type_id = relType.id;
    }
    $scope.allRoles = [];

    var getSelectedContacts = $scope.getSelectedContacts = function(tab, onlyChecked) {
      var idField = (tab === 'roles' ? 'contact_id' : 'id');
      if (onlyChecked || $scope[tab + 'SelectionMode'] === 'checked') {
        return _.collect(_.filter($scope[tab], {checked: true}), idField);
      }
      else if ($scope[tab + 'SelectionMode'] === 'all') {
        return _.collect($scope[tab], idField);
      }
      return [];
    };

    var getCaseRoles = $scope.getCaseRoles = function() {
      if ($scope.item && $scope.item.definition && $scope.item.definition.caseRoles) {
        $scope.allRoles = _.each(_.cloneDeep($scope.item.definition.caseRoles), formatRole);
      }
      var caseRoles = $scope.rolesAlphaFilter ? [] : _.cloneDeep($scope.allRoles),
        allRoles = _.cloneDeep($scope.allRoles),
        selected = getSelectedContacts('roles', true);
      if ($scope.rolesFilter) {
        caseRoles = $scope.rolesFilter === 'client' ? [] : [_.findWhere(caseRoles, {name: $scope.rolesFilter})];
      }
      var relDesc = [];

      if(item["api.Relationship.get"]) {
        _.each(item["api.Relationship.get"].values, function (relationship) {
          relDesc[relationship.contact_id_b + '_' + relationship.relationship_type_id] = relationship.description || '';
        });
      }
      _.each(item.contacts, function (contact) {
        var role = contact.relationship_type_id ? _.findWhere(caseRoles, {relationship_type_id: contact.relationship_type_id}) : null;
        if ((!role || role.contact_id) && contact.relationship_type_id) {
          role = _.cloneDeep(_.findWhere(allRoles, {relationship_type_id: contact.relationship_type_id}));
          if (!$scope.rolesFilter || role.name === $scope.rolesFilter) {
            caseRoles.push(role);
          }
        }

        if ($scope.rolesAlphaFilter && contact.display_name.toUpperCase().indexOf($scope.rolesAlphaFilter) < 0) {
          if (role) _.pull(caseRoles, role);
        } else if (role) {
          if (!$scope.rolesFilter || role.name === $scope.rolesFilter) {
            $.extend(role, {checked: selected.indexOf(contact.contact_id) >= 0}, contact);
          }
        } else if (!$scope.rolesFilter || $scope.rolesFilter == 'client') {
          caseRoles.push($.extend({role: ts('Client'), checked: selected.indexOf(contact.contact_id) >= 0}, contact));
        }
      });
      _.each(caseRoles, function (role, index) {
        if(role && role.role != 'Client' && (role.contact_id + '_' + role.relationship_type_id in relDesc)) {
          caseRoles[index].desc = relDesc[role.contact_id + '_' + role.relationship_type_id];
        }
      });
      $scope.rolesCount = caseRoles.length;

      if ($scope.rolesCount <= (25 * ($scope.rolesPage - 1))) {

        $scope.rolesPage = 1;
      }
      $scope.roles = _.slice(caseRoles, (25 * ($scope.rolesPage - 1)), 25 * $scope.rolesPage);
    };

    $scope.setSelectionMode = function(mode, tab) {
      $scope[tab + 'SelectionMode'] = mode;
    };

    $scope.doContactTask = function(tab) {
      var task = $scope.contactTasks[$scope[tab + 'SelectedTask']];
      $scope[tab + 'SelectedTask'] = '';
      CRM.loadForm(CRM.url(task.url, {cids: getSelectedContacts(tab).join(',')}))
        .on('crmFormSuccess', $scope.refresh)
        .on('crmFormSuccess', function() {
          $scope.refresh();
          if (tab === 'relations') {
            getRelations();
          }
        });
    };

    $scope.assignRole = function(role, replace) {
      var message = '<input name="caseRoleSelector" placeholder="' + ts('Select Contact') + '" />';
      if(role.role != 'Client') {
        message = message + '<br/><textarea rows="3" cols="35" name="description" class="crm-form-textarea" style="margin-top: 10px;padding-left: 10px;border-color: #C2CFDE;color: #9494A4;" placeholder="Description"></textarea>';
      }
      CRM.confirm({
        title: replace ? ts('Replace %1', {1: role.role}) : ts('Add %1', {1: role.role}),
        message: message,
        open: function() {
          $('[name=caseRoleSelector]', this).crmEntityRef({create: true, api: {params: {contact_type: role.contact_type, contact_sub_type: role.contact_sub_type}, extra: ['display_name']}});
        }
      }).on('crmConfirm:yes', function() {
        var apiCalls = [],
          val = $('[name=caseRoleSelector]', this).val(),
          desc = $('[name=description]', this).val();
        if (replace) {
          apiCalls.push(unassignRoleCall(role));
        }
        if (val) {
          var newContact = $('[name=caseRoleSelector]', this).select2('data').extra.display_name;

          if (role.relationship_type_id) {
            var params = {
              relationship_type_id: role.relationship_type_id,
              start_date: 'now',
              contact_id_b: val,
              case_id: item.id,
              description: desc
            };
            _.each(item.client, function (client) {
              params.contact_id_a = client.contact_id;
              apiCalls.push(['Relationship', 'create', params]);
            });
          }

          else {
            apiCalls.push(['CaseContact', 'create', {case_id: item.id, contact_id: val}]);
          }
          apiCalls.push(['Activity', 'create', {
            case_id: item.id,
            target_contact_id: replace ? [val, role.contact_id] : val,
            status_id: 'Completed',
            activity_type_id: role.relationship_type_id ? 'Assign Case Role' : (replace ? 'Reassigned Case' : 'Add Client To Case'),
            subject: replace ? ts('%1 replaced %2 as %3', {1: newContact, 2: role.display_name, 3: role.role}) : ts('%1 added as %2', {1: newContact, 2: role.role})
          }]);
          $scope.refresh(apiCalls);
        }
      });
    };

    $scope.unassignRole = function(role) {
      CRM.confirm({
        title: ts('Remove %1', {1: role.role}),
        message: ts('Remove %1 as %2?', {1: role.display_name, 2: role.role})
      }).on('crmConfirm:yes', function() {
        var apiCalls = [unassignRoleCall(role)];
        apiCalls.push(['Activity', 'create', {
          case_id: item.id,
          target_contact_id: role.contact_id,
          status_id: 'Completed',
          activity_type_id: role.relationship_type_id ? 'Remove Case Role' : 'Remove Client From Case',
          subject: ts('%1 removed as %2', {1: role.display_name, 2: role.role})
        }]);
        $scope.refresh(apiCalls);
      });
    };

    function unassignRoleCall(role) {

      if (role.relationship_type_id) {
        return ['Relationship', 'get', {
          relationship_type_id: role.relationship_type_id,
          contact_id_b: role.contact_id,
          case_id: item.id,
          is_active: 1,
          'api.Relationship.create': {is_active: 0, end_date: 'now'}
        }];
      }

      else {
        return ['CaseContact', 'get', {
          case_id: item.id,
          contact_id: role.contact_id,
          'api.CaseContact.delete': {}
        }];
      }
    }

    $scope.$watch('item', getCaseRoles, true);
    $scope.$watch('rolesFilter', getCaseRoles);

    $scope.$bindToRoute({expr:'tab', param:'peopleTab', format: 'raw', default: 'roles'});
    $scope.setTab = function(tab) {
      $scope.tab = tab;
    };

    $scope.setLetterFilter = function(letter, tab) {
      if ($scope[tab + 'AlphaFilter'] === letter) {
        $scope[tab + 'AlphaFilter'] = '';
      } else {
        $scope[tab + 'AlphaFilter'] = letter;
      }
      if (tab === 'roles') {
        getCaseRoles();
      } else {
        getRelations();
      }
    };

    var getRelations = $scope.getRelations = function() {
      var params = {
        options: {limit: 25, offset: $scope.relationsPage - 1},
        case_id: item.id,
        sequential: 1,
        return: ['display_name', 'phone', 'email']
      };
      if ($scope.relationsAlphaFilter) {
        params.display_name = $scope.relationsAlphaFilter;
      }
      crmApi('Case', 'getrelations', params).then(function (contacts) {
        $scope.relations = _.each(contacts.values, function(rel) {
          var relType = relTypes[rel.relationship_type_id];
          rel.relation = relType['label_' + rel.relationship_direction];
          rel.client = clients[rel.client_contact_id].display_name;
        });
        $scope.relationsCount = contacts.count;
      });
    };
    $scope.$watch('tab', function(tab) {
      if (tab === 'relations' && !$scope.relations.length) {
        getRelations();
      }
    });
  }

  angular.module('civicase').directive('civicaseViewPeople', function() {
    return {
      restrict: 'A',
      templateUrl: '~/civicase/ViewPeople.html',
      controller: casePeopleController,
      scope: {
        item: '=civicaseViewPeople',
        refresh: '=refreshCallback'
      }
    };
  });

})(angular, CRM.$, CRM._);

(function(){
var backups = {d3: window.d3, crossfilter: window.crossfilter, dc: window.dc}
window.CRM = window.CRM || {};
CRM.visual = CRM.visual || {};

!function(r){function n(r){return r}function t(r,n){for(var t=0,e=n.length,u=Array(e);e>t;++t)u[t]=r[n[t]];return u}function e(r){function n(n,t,e,u){for(;u>e;){var f=e+u>>>1;r(n[f])<t?e=f+1:u=f}return e}function t(n,t,e,u){for(;u>e;){var f=e+u>>>1;t<r(n[f])?u=f:e=f+1}return e}return t.right=t,t.left=n,t}function u(r){function n(r,n,t){for(var u=t-n,f=(u>>>1)+1;--f>0;)e(r,f,u,n);return r}function t(r,n,t){for(var u,f=t-n;--f>0;)u=r[n],r[n]=r[n+f],r[n+f]=u,e(r,1,f,n);return r}function e(n,t,e,u){for(var f,o=n[--u+t],i=r(o);(f=t<<1)<=e&&(e>f&&r(n[u+f])>r(n[u+f+1])&&f++,!(i<=r(n[u+f])));)n[u+t]=n[u+f],t=f;n[u+t]=o}return n.sort=t,n}function f(r){function n(n,e,u,f){var o,i,a,c,l=Array(f=Math.min(u-e,f));for(i=0;f>i;++i)l[i]=n[e++];if(t(l,0,f),u>e){o=r(l[0]);do(a=r(c=n[e])>o)&&(l[0]=c,o=r(t(l,0,f)[0]));while(++e<u)}return l}var t=u(r);return n}function o(r){function n(n,t,e){for(var u=t+1;e>u;++u){for(var f=u,o=n[u],i=r(o);f>t&&r(n[f-1])>i;--f)n[f]=n[f-1];n[f]=o}return n}return n}function i(r){function n(r,n,u){return(N>u-n?e:t)(r,n,u)}function t(t,e,u){var f,o=0|(u-e)/6,i=e+o,a=u-1-o,c=e+u-1>>1,l=c-o,v=c+o,s=t[i],h=r(s),d=t[l],p=r(d),g=t[c],y=r(g),m=t[v],x=r(m),b=t[a],A=r(b);h>p&&(f=s,s=d,d=f,f=h,h=p,p=f),x>A&&(f=m,m=b,b=f,f=x,x=A,A=f),h>y&&(f=s,s=g,g=f,f=h,h=y,y=f),p>y&&(f=d,d=g,g=f,f=p,p=y,y=f),h>x&&(f=s,s=m,m=f,f=h,h=x,x=f),y>x&&(f=g,g=m,m=f,f=y,y=x,x=f),p>A&&(f=d,d=b,b=f,f=p,p=A,A=f),p>y&&(f=d,d=g,g=f,f=p,p=y,y=f),x>A&&(f=m,m=b,b=f,f=x,x=A,A=f);var k=d,O=p,w=m,E=x;t[i]=s,t[l]=t[e],t[c]=g,t[v]=t[u-1],t[a]=b;var M=e+1,U=u-2,z=E>=O&&O>=E;if(z)for(var N=M;U>=N;++N){var C=t[N],S=r(C);if(O>S)N!==M&&(t[N]=t[M],t[M]=C),++M;else if(S>O)for(;;){var q=r(t[U]);{if(!(q>O)){if(O>q){t[N]=t[M],t[M++]=t[U],t[U--]=C;break}t[N]=t[U],t[U--]=C;break}U--}}}else for(var N=M;U>=N;N++){var C=t[N],S=r(C);if(O>S)N!==M&&(t[N]=t[M],t[M]=C),++M;else if(S>E)for(;;){var q=r(t[U]);{if(!(q>E)){O>q?(t[N]=t[M],t[M++]=t[U],t[U--]=C):(t[N]=t[U],t[U--]=C);break}if(U--,N>U)break}}}if(t[e]=t[M-1],t[M-1]=k,t[u-1]=t[U+1],t[U+1]=w,n(t,e,M-1),n(t,U+2,u),z)return t;if(i>M&&U>a){for(var F,q;(F=r(t[M]))<=O&&F>=O;)++M;for(;(q=r(t[U]))<=E&&q>=E;)--U;for(var N=M;U>=N;N++){var C=t[N],S=r(C);if(O>=S&&S>=O)N!==M&&(t[N]=t[M],t[M]=C),M++;else if(E>=S&&S>=E)for(;;){var q=r(t[U]);{if(!(E>=q&&q>=E)){O>q?(t[N]=t[M],t[M++]=t[U],t[U--]=C):(t[N]=t[U],t[U--]=C);break}if(U--,N>U)break}}}}return n(t,M,U+1)}var e=o(r);return n}function a(r){for(var n=Array(r),t=-1;++t<r;)n[t]=0;return n}function c(r,n){for(var t=r.length;n>t;)r[t++]=0;return r}function l(r,n){if(n>32)throw Error("invalid array width!");return r}function v(r,n){return function(t){var e=t.length;return[r.left(t,n,0,e),r.right(t,n,0,e)]}}function s(r,n){var t=n[0],e=n[1];return function(n){var u=n.length;return[r.left(n,t,0,u),r.left(n,e,0,u)]}}function h(r){return[0,r.length]}function d(){return null}function p(){return 0}function g(r){return r+1}function y(r){return r-1}function m(r){return function(n,t){return n+ +r(t)}}function x(r){return function(n,t){return n-r(t)}}function b(){function r(r){var n=E,t=r.length;return t&&(b=b.concat(r),z=F(z,E+=t),S.forEach(function(e){e(r,n,t)})),l}function e(){for(var r=A(E,E),n=[],t=0,e=0;E>t;++t)z[t]?r[t]=e++:n.push(t);N.forEach(function(r){r(0,[],n)}),q.forEach(function(n){n(r)});for(var u,t=0,e=0;E>t;++t)(u=z[t])&&(t!==e&&(z[e]=u,b[e]=b[t]),++e);for(b.length=e;E>e;)z[--E]=0}function o(r){function e(n,e,u){T=n.map(r),V=$(k(u),0,u),T=t(T,V);var f,o=_(T),i=o[0],a=o[1];if(W)for(f=0;u>f;++f)W(T[f],f)||(z[V[f]+e]|=Y);else{for(f=0;i>f;++f)z[V[f]+e]|=Y;for(f=a;u>f;++f)z[V[f]+e]|=Y}if(!e)return P=T,Q=V,tn=i,en=a,void 0;var c=P,l=Q,v=0,s=0;for(P=Array(E),Q=A(E,E),f=0;e>v&&u>s;++f)c[v]<T[s]?(P[f]=c[v],Q[f]=l[v++]):(P[f]=T[s],Q[f]=V[s++]+e);for(;e>v;++v,++f)P[f]=c[v],Q[f]=l[v];for(;u>s;++s,++f)P[f]=T[s],Q[f]=V[s]+e;o=_(P),tn=o[0],en=o[1]}function o(r,n,t){rn.forEach(function(r){r(T,V,n,t)}),T=V=null}function a(r){for(var n,t=0,e=0;E>t;++t)z[n=Q[t]]&&(t!==e&&(P[e]=P[t]),Q[e]=r[n],++e);for(P.length=e;E>e;)Q[e++]=0;var u=_(P);tn=u[0],en=u[1]}function c(r){var n=r[0],t=r[1];if(W)return W=null,G(function(r,e){return e>=n&&t>e}),tn=n,en=t,X;var e,u,f,o=[],i=[];if(tn>n)for(e=n,u=Math.min(tn,t);u>e;++e)z[f=Q[e]]^=Y,o.push(f);else if(n>tn)for(e=tn,u=Math.min(n,en);u>e;++e)z[f=Q[e]]^=Y,i.push(f);if(t>en)for(e=Math.max(n,en),u=t;u>e;++e)z[f=Q[e]]^=Y,o.push(f);else if(en>t)for(e=Math.max(tn,t),u=en;u>e;++e)z[f=Q[e]]^=Y,i.push(f);return tn=n,en=t,N.forEach(function(r){r(Y,o,i)}),X}function l(r){return null==r?B():Array.isArray(r)?j(r):"function"==typeof r?D(r):C(r)}function C(r){return c((_=v(w,r))(P))}function j(r){return c((_=s(w,r))(P))}function B(){return c((_=h)(P))}function D(r){return _=h,G(W=r),tn=0,en=E,X}function G(r){var n,t,e,u=[],f=[];for(n=0;E>n;++n)!(z[t=Q[n]]&Y)^!!(e=r(P[n],n))&&(e?(z[t]&=Z,u.push(t)):(z[t]|=Y,f.push(t)));N.forEach(function(r){r(Y,u,f)})}function H(r){for(var n,t=[],e=en;--e>=tn&&r>0;)z[n=Q[e]]||(t.push(b[n]),--r);return t}function I(r){for(var n,t=[],e=tn;en>e&&r>0;)z[n=Q[e]]||(t.push(b[n]),--r),e++;return t}function J(r){function t(n,t,e,u){function f(){++T===L&&(m=R(m,K<<=1),B=R(B,K),L=O(K))}var l,v,s,h,p,g,y=j,m=A(T,L),x=H,k=J,w=T,M=0,U=0;for(X&&(x=k=d),j=Array(T),T=0,B=w>1?F(B,E):A(E,L),w&&(s=(v=y[0]).key);u>U&&!((h=r(n[U]))>=h);)++U;for(;u>U;){for(v&&h>=s?(p=v,g=s,m[M]=T,(v=y[++M])&&(s=v.key)):(p={key:h,value:k()},g=h),j[T]=p;!(h>g||(B[l=t[U]+e]=T,z[l]&Z||(p.value=x(p.value,b[l])),++U>=u));)h=r(n[U]);f()}for(;w>M;)j[m[M]=T]=y[M++],f();if(T>M)for(M=0;e>M;++M)B[M]=m[B[M]];l=N.indexOf(V),T>1?(V=o,W=a):(!T&&$&&(T=1,j=[{key:null,value:k()}]),1===T?(V=i,W=c):(V=d,W=d),B=null),N[l]=V}function e(){if(T>1){for(var r=T,n=j,t=A(r,r),e=0,u=0;E>e;++e)z[e]&&(t[B[u]=B[e]]=1,++u);for(j=[],T=0,e=0;r>e;++e)t[e]&&(t[e]=T++,j.push(n[e]));if(T>1)for(var e=0;u>e;++e)B[e]=t[B[e]];else B=null;N[N.indexOf(V)]=T>1?(W=a,V=o):1===T?(W=c,V=i):W=V=d}else if(1===T){if($)return;for(var e=0;E>e;++e)if(z[e])return;j=[],T=0,N[N.indexOf(V)]=V=W=d}}function o(r,n,t){if(r!==Y&&!X){var e,u,f,o;for(e=0,f=n.length;f>e;++e)z[u=n[e]]&Z||(o=j[B[u]],o.value=H(o.value,b[u]));for(e=0,f=t.length;f>e;++e)(z[u=t[e]]&Z)===r&&(o=j[B[u]],o.value=I(o.value,b[u]))}}function i(r,n,t){if(r!==Y&&!X){var e,u,f,o=j[0];for(e=0,f=n.length;f>e;++e)z[u=n[e]]&Z||(o.value=H(o.value,b[u]));for(e=0,f=t.length;f>e;++e)(z[u=t[e]]&Z)===r&&(o.value=I(o.value,b[u]))}}function a(){var r,n;for(r=0;T>r;++r)j[r].value=J();for(r=0;E>r;++r)z[r]&Z||(n=j[B[r]],n.value=H(n.value,b[r]))}function c(){var r,n=j[0];for(n.value=J(),r=0;E>r;++r)z[r]&Z||(n.value=H(n.value,b[r]))}function l(){return X&&(W(),X=!1),j}function v(r){var n=D(l(),0,j.length,r);return G.sort(n,0,n.length)}function s(r,n,t){return H=r,I=n,J=t,X=!0,S}function h(){return s(g,y,p)}function k(r){return s(m(r),x(r),p)}function w(r){function n(n){return r(n.value)}return D=f(n),G=u(n),S}function M(){return w(n)}function U(){return T}function C(){var r=N.indexOf(V);return r>=0&&N.splice(r,1),r=rn.indexOf(t),r>=0&&rn.splice(r,1),r=q.indexOf(e),r>=0&&q.splice(r,1),S}var S={top:v,all:l,reduce:s,reduceCount:h,reduceSum:k,order:w,orderNatural:M,size:U,dispose:C,remove:C};nn.push(S);var j,B,D,G,H,I,J,K=8,L=O(K),T=0,V=d,W=d,X=!0,$=r===d;return arguments.length<1&&(r=n),N.push(V),rn.push(t),q.push(e),t(P,Q,0,E),h().orderNatural()}function K(){var r=J(d),n=r.all;return delete r.all,delete r.top,delete r.order,delete r.orderNatural,delete r.size,r.value=function(){return n()[0].value},r}function L(){nn.forEach(function(r){r.dispose()});var r=S.indexOf(e);return r>=0&&S.splice(r,1),r=S.indexOf(o),r>=0&&S.splice(r,1),r=q.indexOf(a),r>=0&&q.splice(r,1),M&=Z,B()}var P,Q,T,V,W,X={filter:l,filterExact:C,filterRange:j,filterFunction:D,filterAll:B,top:H,bottom:I,group:J,groupAll:K,dispose:L,remove:L},Y=~M&-~M,Z=~Y,$=i(function(r){return T[r]}),_=h,rn=[],nn=[],tn=0,en=0;return S.unshift(e),S.push(o),q.push(a),M|=Y,(U>=32?!Y:M&-(1<<U))&&(z=R(z,U<<=1)),e(b,0,E),o(b,0,E),X}function a(){function r(r,n){var t;if(!h)for(t=n;E>t;++t)z[t]||(a=c(a,b[t]))}function n(r,n,t){var e,u,f;if(!h){for(e=0,f=n.length;f>e;++e)z[u=n[e]]||(a=c(a,b[u]));for(e=0,f=t.length;f>e;++e)z[u=t[e]]===r&&(a=l(a,b[u]))}}function t(){var r;for(a=v(),r=0;E>r;++r)z[r]||(a=c(a,b[r]))}function e(r,n,t){return c=r,l=n,v=t,h=!0,s}function u(){return e(g,y,p)}function f(r){return e(m(r),x(r),p)}function o(){return h&&(t(),h=!1),a}function i(){var t=N.indexOf(n);return t>=0&&N.splice(t),t=S.indexOf(r),t>=0&&S.splice(t),s}var a,c,l,v,s={reduce:e,reduceCount:u,reduceSum:f,value:o,dispose:i,remove:i},h=!0;return N.push(n),S.push(r),r(b,0,E),u()}function c(){return E}var l={add:r,remove:e,dimension:o,groupAll:a,size:c},b=[],E=0,M=0,U=8,z=C(0),N=[],S=[],q=[];return arguments.length?r(arguments[0]):l}function A(r,n){return(257>n?C:65537>n?S:q)(r)}function k(r){for(var n=A(r,r),t=-1;++t<r;)n[t]=t;return n}function O(r){return 8===r?256:16===r?65536:4294967296}b.version="1.3.14",b.permute=t;var w=b.bisect=e(n);w.by=e;var E=b.heap=u(n);E.by=u;var M=b.heapselect=f(n);M.by=f;var U=b.insertionsort=o(n);U.by=o;var z=b.quicksort=i(n);z.by=i;var N=32,C=a,S=a,q=a,F=c,R=l;"undefined"!=typeof Uint8Array&&(C=function(r){return new Uint8Array(r)},S=function(r){return new Uint16Array(r)},q=function(r){return new Uint32Array(r)},F=function(r,n){if(r.length>=n)return r;var t=new r.constructor(n);return t.set(r),t},R=function(r,n){var t;switch(n){case 16:t=S(r.length);break;case 32:t=q(r.length);break;default:throw Error("invalid array width!")}return t.set(r),t}),r.crossfilter=b}("undefined"!=typeof exports&&exports||this);

!function(){function n(n){return n&&(n.ownerDocument||n.document||n).documentElement}function t(n){return n&&(n.ownerDocument&&n.ownerDocument.defaultView||n.document&&n||n.defaultView)}function e(n,t){return t>n?-1:n>t?1:n>=t?0:NaN}function r(n){return null===n?NaN:+n}function i(n){return!isNaN(n)}function u(n){return{left:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)<0?r=u+1:i=u}return r},right:function(t,e,r,i){for(arguments.length<3&&(r=0),arguments.length<4&&(i=t.length);i>r;){var u=r+i>>>1;n(t[u],e)>0?i=u:r=u+1}return r}}}function o(n){return n.length}function a(n){for(var t=1;n*t%1;)t*=10;return t}function l(n,t){for(var e in t)Object.defineProperty(n.prototype,e,{value:t[e],enumerable:!1})}function c(){this._=Object.create(null)}function f(n){return(n+="")===bo||n[0]===_o?_o+n:n}function s(n){return(n+="")[0]===_o?n.slice(1):n}function h(n){return f(n)in this._}function p(n){return(n=f(n))in this._&&delete this._[n]}function g(){var n=[];for(var t in this._)n.push(s(t));return n}function v(){var n=0;for(var t in this._)++n;return n}function d(){for(var n in this._)return!1;return!0}function y(){this._=Object.create(null)}function m(n){return n}function M(n,t,e){return function(){var r=e.apply(t,arguments);return r===t?n:r}}function x(n,t){if(t in n)return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e=0,r=wo.length;r>e;++e){var i=wo[e]+t;if(i in n)return i}}function b(){}function _(){}function w(n){function t(){for(var t,r=e,i=-1,u=r.length;++i<u;)(t=r[i].on)&&t.apply(this,arguments);return n}var e=[],r=new c;return t.on=function(t,i){var u,o=r.get(t);return arguments.length<2?o&&o.on:(o&&(o.on=null,e=e.slice(0,u=e.indexOf(o)).concat(e.slice(u+1)),r.remove(t)),i&&e.push(r.set(t,{on:i})),n)},t}function S(){ao.event.preventDefault()}function k(){for(var n,t=ao.event;n=t.sourceEvent;)t=n;return t}function N(n){for(var t=new _,e=0,r=arguments.length;++e<r;)t[arguments[e]]=w(t);return t.of=function(e,r){return function(i){try{var u=i.sourceEvent=ao.event;i.target=n,ao.event=i,t[i.type].apply(e,r)}finally{ao.event=u}}},t}function E(n){return ko(n,Co),n}function A(n){return"function"==typeof n?n:function(){return No(n,this)}}function C(n){return"function"==typeof n?n:function(){return Eo(n,this)}}function z(n,t){function e(){this.removeAttribute(n)}function r(){this.removeAttributeNS(n.space,n.local)}function i(){this.setAttribute(n,t)}function u(){this.setAttributeNS(n.space,n.local,t)}function o(){var e=t.apply(this,arguments);null==e?this.removeAttribute(n):this.setAttribute(n,e)}function a(){var e=t.apply(this,arguments);null==e?this.removeAttributeNS(n.space,n.local):this.setAttributeNS(n.space,n.local,e)}return n=ao.ns.qualify(n),null==t?n.local?r:e:"function"==typeof t?n.local?a:o:n.local?u:i}function L(n){return n.trim().replace(/\s+/g," ")}function q(n){return new RegExp("(?:^|\\s+)"+ao.requote(n)+"(?:\\s+|$)","g")}function T(n){return(n+"").trim().split(/^|\s+/)}function R(n,t){function e(){for(var e=-1;++e<i;)n[e](this,t)}function r(){for(var e=-1,r=t.apply(this,arguments);++e<i;)n[e](this,r)}n=T(n).map(D);var i=n.length;return"function"==typeof t?r:e}function D(n){var t=q(n);return function(e,r){if(i=e.classList)return r?i.add(n):i.remove(n);var i=e.getAttribute("class")||"";r?(t.lastIndex=0,t.test(i)||e.setAttribute("class",L(i+" "+n))):e.setAttribute("class",L(i.replace(t," ")))}}function P(n,t,e){function r(){this.style.removeProperty(n)}function i(){this.style.setProperty(n,t,e)}function u(){var r=t.apply(this,arguments);null==r?this.style.removeProperty(n):this.style.setProperty(n,r,e)}return null==t?r:"function"==typeof t?u:i}function U(n,t){function e(){delete this[n]}function r(){this[n]=t}function i(){var e=t.apply(this,arguments);null==e?delete this[n]:this[n]=e}return null==t?e:"function"==typeof t?i:r}function j(n){function t(){var t=this.ownerDocument,e=this.namespaceURI;return e===zo&&t.documentElement.namespaceURI===zo?t.createElement(n):t.createElementNS(e,n)}function e(){return this.ownerDocument.createElementNS(n.space,n.local)}return"function"==typeof n?n:(n=ao.ns.qualify(n)).local?e:t}function F(){var n=this.parentNode;n&&n.removeChild(this)}function H(n){return{__data__:n}}function O(n){return function(){return Ao(this,n)}}function I(n){return arguments.length||(n=e),function(t,e){return t&&e?n(t.__data__,e.__data__):!t-!e}}function Y(n,t){for(var e=0,r=n.length;r>e;e++)for(var i,u=n[e],o=0,a=u.length;a>o;o++)(i=u[o])&&t(i,o,e);return n}function Z(n){return ko(n,qo),n}function V(n){var t,e;return function(r,i,u){var o,a=n[u].update,l=a.length;for(u!=e&&(e=u,t=0),i>=t&&(t=i+1);!(o=a[t])&&++t<l;);return o}}function X(n,t,e){function r(){var t=this[o];t&&(this.removeEventListener(n,t,t.$),delete this[o])}function i(){var i=l(t,co(arguments));r.call(this),this.addEventListener(n,this[o]=i,i.$=e),i._=t}function u(){var t,e=new RegExp("^__on([^.]+)"+ao.requote(n)+"$");for(var r in this)if(t=r.match(e)){var i=this[r];this.removeEventListener(t[1],i,i.$),delete this[r]}}var o="__on"+n,a=n.indexOf("."),l=$;a>0&&(n=n.slice(0,a));var c=To.get(n);return c&&(n=c,l=B),a?t?i:r:t?b:u}function $(n,t){return function(e){var r=ao.event;ao.event=e,t[0]=this.__data__;try{n.apply(this,t)}finally{ao.event=r}}}function B(n,t){var e=$(n,t);return function(n){var t=this,r=n.relatedTarget;r&&(r===t||8&r.compareDocumentPosition(t))||e.call(t,n)}}function W(e){var r=".dragsuppress-"+ ++Do,i="click"+r,u=ao.select(t(e)).on("touchmove"+r,S).on("dragstart"+r,S).on("selectstart"+r,S);if(null==Ro&&(Ro="onselectstart"in e?!1:x(e.style,"userSelect")),Ro){var o=n(e).style,a=o[Ro];o[Ro]="none"}return function(n){if(u.on(r,null),Ro&&(o[Ro]=a),n){var t=function(){u.on(i,null)};u.on(i,function(){S(),t()},!0),setTimeout(t,0)}}}function J(n,e){e.changedTouches&&(e=e.changedTouches[0]);var r=n.ownerSVGElement||n;if(r.createSVGPoint){var i=r.createSVGPoint();if(0>Po){var u=t(n);if(u.scrollX||u.scrollY){r=ao.select("body").append("svg").style({position:"absolute",top:0,left:0,margin:0,padding:0,border:"none"},"important");var o=r[0][0].getScreenCTM();Po=!(o.f||o.e),r.remove()}}return Po?(i.x=e.pageX,i.y=e.pageY):(i.x=e.clientX,i.y=e.clientY),i=i.matrixTransform(n.getScreenCTM().inverse()),[i.x,i.y]}var a=n.getBoundingClientRect();return[e.clientX-a.left-n.clientLeft,e.clientY-a.top-n.clientTop]}function G(){return ao.event.changedTouches[0].identifier}function K(n){return n>0?1:0>n?-1:0}function Q(n,t,e){return(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0])}function nn(n){return n>1?0:-1>n?Fo:Math.acos(n)}function tn(n){return n>1?Io:-1>n?-Io:Math.asin(n)}function en(n){return((n=Math.exp(n))-1/n)/2}function rn(n){return((n=Math.exp(n))+1/n)/2}function un(n){return((n=Math.exp(2*n))-1)/(n+1)}function on(n){return(n=Math.sin(n/2))*n}function an(){}function ln(n,t,e){return this instanceof ln?(this.h=+n,this.s=+t,void(this.l=+e)):arguments.length<2?n instanceof ln?new ln(n.h,n.s,n.l):_n(""+n,wn,ln):new ln(n,t,e)}function cn(n,t,e){function r(n){return n>360?n-=360:0>n&&(n+=360),60>n?u+(o-u)*n/60:180>n?o:240>n?u+(o-u)*(240-n)/60:u}function i(n){return Math.round(255*r(n))}var u,o;return n=isNaN(n)?0:(n%=360)<0?n+360:n,t=isNaN(t)?0:0>t?0:t>1?1:t,e=0>e?0:e>1?1:e,o=.5>=e?e*(1+t):e+t-e*t,u=2*e-o,new mn(i(n+120),i(n),i(n-120))}function fn(n,t,e){return this instanceof fn?(this.h=+n,this.c=+t,void(this.l=+e)):arguments.length<2?n instanceof fn?new fn(n.h,n.c,n.l):n instanceof hn?gn(n.l,n.a,n.b):gn((n=Sn((n=ao.rgb(n)).r,n.g,n.b)).l,n.a,n.b):new fn(n,t,e)}function sn(n,t,e){return isNaN(n)&&(n=0),isNaN(t)&&(t=0),new hn(e,Math.cos(n*=Yo)*t,Math.sin(n)*t)}function hn(n,t,e){return this instanceof hn?(this.l=+n,this.a=+t,void(this.b=+e)):arguments.length<2?n instanceof hn?new hn(n.l,n.a,n.b):n instanceof fn?sn(n.h,n.c,n.l):Sn((n=mn(n)).r,n.g,n.b):new hn(n,t,e)}function pn(n,t,e){var r=(n+16)/116,i=r+t/500,u=r-e/200;return i=vn(i)*na,r=vn(r)*ta,u=vn(u)*ea,new mn(yn(3.2404542*i-1.5371385*r-.4985314*u),yn(-.969266*i+1.8760108*r+.041556*u),yn(.0556434*i-.2040259*r+1.0572252*u))}function gn(n,t,e){return n>0?new fn(Math.atan2(e,t)*Zo,Math.sqrt(t*t+e*e),n):new fn(NaN,NaN,n)}function vn(n){return n>.206893034?n*n*n:(n-4/29)/7.787037}function dn(n){return n>.008856?Math.pow(n,1/3):7.787037*n+4/29}function yn(n){return Math.round(255*(.00304>=n?12.92*n:1.055*Math.pow(n,1/2.4)-.055))}function mn(n,t,e){return this instanceof mn?(this.r=~~n,this.g=~~t,void(this.b=~~e)):arguments.length<2?n instanceof mn?new mn(n.r,n.g,n.b):_n(""+n,mn,cn):new mn(n,t,e)}function Mn(n){return new mn(n>>16,n>>8&255,255&n)}function xn(n){return Mn(n)+""}function bn(n){return 16>n?"0"+Math.max(0,n).toString(16):Math.min(255,n).toString(16)}function _n(n,t,e){var r,i,u,o=0,a=0,l=0;if(r=/([a-z]+)\((.*)\)/.exec(n=n.toLowerCase()))switch(i=r[2].split(","),r[1]){case"hsl":return e(parseFloat(i[0]),parseFloat(i[1])/100,parseFloat(i[2])/100);case"rgb":return t(Nn(i[0]),Nn(i[1]),Nn(i[2]))}return(u=ua.get(n))?t(u.r,u.g,u.b):(null==n||"#"!==n.charAt(0)||isNaN(u=parseInt(n.slice(1),16))||(4===n.length?(o=(3840&u)>>4,o=o>>4|o,a=240&u,a=a>>4|a,l=15&u,l=l<<4|l):7===n.length&&(o=(16711680&u)>>16,a=(65280&u)>>8,l=255&u)),t(o,a,l))}function wn(n,t,e){var r,i,u=Math.min(n/=255,t/=255,e/=255),o=Math.max(n,t,e),a=o-u,l=(o+u)/2;return a?(i=.5>l?a/(o+u):a/(2-o-u),r=n==o?(t-e)/a+(e>t?6:0):t==o?(e-n)/a+2:(n-t)/a+4,r*=60):(r=NaN,i=l>0&&1>l?0:r),new ln(r,i,l)}function Sn(n,t,e){n=kn(n),t=kn(t),e=kn(e);var r=dn((.4124564*n+.3575761*t+.1804375*e)/na),i=dn((.2126729*n+.7151522*t+.072175*e)/ta),u=dn((.0193339*n+.119192*t+.9503041*e)/ea);return hn(116*i-16,500*(r-i),200*(i-u))}function kn(n){return(n/=255)<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4)}function Nn(n){var t=parseFloat(n);return"%"===n.charAt(n.length-1)?Math.round(2.55*t):t}function En(n){return"function"==typeof n?n:function(){return n}}function An(n){return function(t,e,r){return 2===arguments.length&&"function"==typeof e&&(r=e,e=null),Cn(t,e,n,r)}}function Cn(n,t,e,r){function i(){var n,t=l.status;if(!t&&Ln(l)||t>=200&&300>t||304===t){try{n=e.call(u,l)}catch(r){return void o.error.call(u,r)}o.load.call(u,n)}else o.error.call(u,l)}var u={},o=ao.dispatch("beforesend","progress","load","error"),a={},l=new XMLHttpRequest,c=null;return!this.XDomainRequest||"withCredentials"in l||!/^(http(s)?:)?\/\//.test(n)||(l=new XDomainRequest),"onload"in l?l.onload=l.onerror=i:l.onreadystatechange=function(){l.readyState>3&&i()},l.onprogress=function(n){var t=ao.event;ao.event=n;try{o.progress.call(u,l)}finally{ao.event=t}},u.header=function(n,t){return n=(n+"").toLowerCase(),arguments.length<2?a[n]:(null==t?delete a[n]:a[n]=t+"",u)},u.mimeType=function(n){return arguments.length?(t=null==n?null:n+"",u):t},u.responseType=function(n){return arguments.length?(c=n,u):c},u.response=function(n){return e=n,u},["get","post"].forEach(function(n){u[n]=function(){return u.send.apply(u,[n].concat(co(arguments)))}}),u.send=function(e,r,i){if(2===arguments.length&&"function"==typeof r&&(i=r,r=null),l.open(e,n,!0),null==t||"accept"in a||(a.accept=t+",*/*"),l.setRequestHeader)for(var f in a)l.setRequestHeader(f,a[f]);return null!=t&&l.overrideMimeType&&l.overrideMimeType(t),null!=c&&(l.responseType=c),null!=i&&u.on("error",i).on("load",function(n){i(null,n)}),o.beforesend.call(u,l),l.send(null==r?null:r),u},u.abort=function(){return l.abort(),u},ao.rebind(u,o,"on"),null==r?u:u.get(zn(r))}function zn(n){return 1===n.length?function(t,e){n(null==t?e:null)}:n}function Ln(n){var t=n.responseType;return t&&"text"!==t?n.response:n.responseText}function qn(n,t,e){var r=arguments.length;2>r&&(t=0),3>r&&(e=Date.now());var i=e+t,u={c:n,t:i,n:null};return aa?aa.n=u:oa=u,aa=u,la||(ca=clearTimeout(ca),la=1,fa(Tn)),u}function Tn(){var n=Rn(),t=Dn()-n;t>24?(isFinite(t)&&(clearTimeout(ca),ca=setTimeout(Tn,t)),la=0):(la=1,fa(Tn))}function Rn(){for(var n=Date.now(),t=oa;t;)n>=t.t&&t.c(n-t.t)&&(t.c=null),t=t.n;return n}function Dn(){for(var n,t=oa,e=1/0;t;)t.c?(t.t<e&&(e=t.t),t=(n=t).n):t=n?n.n=t.n:oa=t.n;return aa=n,e}function Pn(n,t){return t-(n?Math.ceil(Math.log(n)/Math.LN10):1)}function Un(n,t){var e=Math.pow(10,3*xo(8-t));return{scale:t>8?function(n){return n/e}:function(n){return n*e},symbol:n}}function jn(n){var t=n.decimal,e=n.thousands,r=n.grouping,i=n.currency,u=r&&e?function(n,t){for(var i=n.length,u=[],o=0,a=r[0],l=0;i>0&&a>0&&(l+a+1>t&&(a=Math.max(1,t-l)),u.push(n.substring(i-=a,i+a)),!((l+=a+1)>t));)a=r[o=(o+1)%r.length];return u.reverse().join(e)}:m;return function(n){var e=ha.exec(n),r=e[1]||" ",o=e[2]||">",a=e[3]||"-",l=e[4]||"",c=e[5],f=+e[6],s=e[7],h=e[8],p=e[9],g=1,v="",d="",y=!1,m=!0;switch(h&&(h=+h.substring(1)),(c||"0"===r&&"="===o)&&(c=r="0",o="="),p){case"n":s=!0,p="g";break;case"%":g=100,d="%",p="f";break;case"p":g=100,d="%",p="r";break;case"b":case"o":case"x":case"X":"#"===l&&(v="0"+p.toLowerCase());case"c":m=!1;case"d":y=!0,h=0;break;case"s":g=-1,p="r"}"$"===l&&(v=i[0],d=i[1]),"r"!=p||h||(p="g"),null!=h&&("g"==p?h=Math.max(1,Math.min(21,h)):"e"!=p&&"f"!=p||(h=Math.max(0,Math.min(20,h)))),p=pa.get(p)||Fn;var M=c&&s;return function(n){var e=d;if(y&&n%1)return"";var i=0>n||0===n&&0>1/n?(n=-n,"-"):"-"===a?"":a;if(0>g){var l=ao.formatPrefix(n,h);n=l.scale(n),e=l.symbol+d}else n*=g;n=p(n,h);var x,b,_=n.lastIndexOf(".");if(0>_){var w=m?n.lastIndexOf("e"):-1;0>w?(x=n,b=""):(x=n.substring(0,w),b=n.substring(w))}else x=n.substring(0,_),b=t+n.substring(_+1);!c&&s&&(x=u(x,1/0));var S=v.length+x.length+b.length+(M?0:i.length),k=f>S?new Array(S=f-S+1).join(r):"";return M&&(x=u(k+x,k.length?f-b.length:1/0)),i+=v,n=x+b,("<"===o?i+n+k:">"===o?k+i+n:"^"===o?k.substring(0,S>>=1)+i+n+k.substring(S):i+(M?n:k+n))+e}}}function Fn(n){return n+""}function Hn(){this._=new Date(arguments.length>1?Date.UTC.apply(this,arguments):arguments[0])}function On(n,t,e){function r(t){var e=n(t),r=u(e,1);return r-t>t-e?e:r}function i(e){return t(e=n(new va(e-1)),1),e}function u(n,e){return t(n=new va(+n),e),n}function o(n,r,u){var o=i(n),a=[];if(u>1)for(;r>o;)e(o)%u||a.push(new Date(+o)),t(o,1);else for(;r>o;)a.push(new Date(+o)),t(o,1);return a}function a(n,t,e){try{va=Hn;var r=new Hn;return r._=n,o(r,t,e)}finally{va=Date}}n.floor=n,n.round=r,n.ceil=i,n.offset=u,n.range=o;var l=n.utc=In(n);return l.floor=l,l.round=In(r),l.ceil=In(i),l.offset=In(u),l.range=a,n}function In(n){return function(t,e){try{va=Hn;var r=new Hn;return r._=t,n(r,e)._}finally{va=Date}}}function Yn(n){function t(n){function t(t){for(var e,i,u,o=[],a=-1,l=0;++a<r;)37===n.charCodeAt(a)&&(o.push(n.slice(l,a)),null!=(i=ya[e=n.charAt(++a)])&&(e=n.charAt(++a)),(u=A[e])&&(e=u(t,null==i?"e"===e?" ":"0":i)),o.push(e),l=a+1);return o.push(n.slice(l,a)),o.join("")}var r=n.length;return t.parse=function(t){var r={y:1900,m:0,d:1,H:0,M:0,S:0,L:0,Z:null},i=e(r,n,t,0);if(i!=t.length)return null;"p"in r&&(r.H=r.H%12+12*r.p);var u=null!=r.Z&&va!==Hn,o=new(u?Hn:va);return"j"in r?o.setFullYear(r.y,0,r.j):"W"in r||"U"in r?("w"in r||(r.w="W"in r?1:0),o.setFullYear(r.y,0,1),o.setFullYear(r.y,0,"W"in r?(r.w+6)%7+7*r.W-(o.getDay()+5)%7:r.w+7*r.U-(o.getDay()+6)%7)):o.setFullYear(r.y,r.m,r.d),o.setHours(r.H+(r.Z/100|0),r.M+r.Z%100,r.S,r.L),u?o._:o},t.toString=function(){return n},t}function e(n,t,e,r){for(var i,u,o,a=0,l=t.length,c=e.length;l>a;){if(r>=c)return-1;if(i=t.charCodeAt(a++),37===i){if(o=t.charAt(a++),u=C[o in ya?t.charAt(a++):o],!u||(r=u(n,e,r))<0)return-1}else if(i!=e.charCodeAt(r++))return-1}return r}function r(n,t,e){_.lastIndex=0;var r=_.exec(t.slice(e));return r?(n.w=w.get(r[0].toLowerCase()),e+r[0].length):-1}function i(n,t,e){x.lastIndex=0;var r=x.exec(t.slice(e));return r?(n.w=b.get(r[0].toLowerCase()),e+r[0].length):-1}function u(n,t,e){N.lastIndex=0;var r=N.exec(t.slice(e));return r?(n.m=E.get(r[0].toLowerCase()),e+r[0].length):-1}function o(n,t,e){S.lastIndex=0;var r=S.exec(t.slice(e));return r?(n.m=k.get(r[0].toLowerCase()),e+r[0].length):-1}function a(n,t,r){return e(n,A.c.toString(),t,r)}function l(n,t,r){return e(n,A.x.toString(),t,r)}function c(n,t,r){return e(n,A.X.toString(),t,r)}function f(n,t,e){var r=M.get(t.slice(e,e+=2).toLowerCase());return null==r?-1:(n.p=r,e)}var s=n.dateTime,h=n.date,p=n.time,g=n.periods,v=n.days,d=n.shortDays,y=n.months,m=n.shortMonths;t.utc=function(n){function e(n){try{va=Hn;var t=new va;return t._=n,r(t)}finally{va=Date}}var r=t(n);return e.parse=function(n){try{va=Hn;var t=r.parse(n);return t&&t._}finally{va=Date}},e.toString=r.toString,e},t.multi=t.utc.multi=ct;var M=ao.map(),x=Vn(v),b=Xn(v),_=Vn(d),w=Xn(d),S=Vn(y),k=Xn(y),N=Vn(m),E=Xn(m);g.forEach(function(n,t){M.set(n.toLowerCase(),t)});var A={a:function(n){return d[n.getDay()]},A:function(n){return v[n.getDay()]},b:function(n){return m[n.getMonth()]},B:function(n){return y[n.getMonth()]},c:t(s),d:function(n,t){return Zn(n.getDate(),t,2)},e:function(n,t){return Zn(n.getDate(),t,2)},H:function(n,t){return Zn(n.getHours(),t,2)},I:function(n,t){return Zn(n.getHours()%12||12,t,2)},j:function(n,t){return Zn(1+ga.dayOfYear(n),t,3)},L:function(n,t){return Zn(n.getMilliseconds(),t,3)},m:function(n,t){return Zn(n.getMonth()+1,t,2)},M:function(n,t){return Zn(n.getMinutes(),t,2)},p:function(n){return g[+(n.getHours()>=12)]},S:function(n,t){return Zn(n.getSeconds(),t,2)},U:function(n,t){return Zn(ga.sundayOfYear(n),t,2)},w:function(n){return n.getDay()},W:function(n,t){return Zn(ga.mondayOfYear(n),t,2)},x:t(h),X:t(p),y:function(n,t){return Zn(n.getFullYear()%100,t,2)},Y:function(n,t){return Zn(n.getFullYear()%1e4,t,4)},Z:at,"%":function(){return"%"}},C={a:r,A:i,b:u,B:o,c:a,d:tt,e:tt,H:rt,I:rt,j:et,L:ot,m:nt,M:it,p:f,S:ut,U:Bn,w:$n,W:Wn,x:l,X:c,y:Gn,Y:Jn,Z:Kn,"%":lt};return t}function Zn(n,t,e){var r=0>n?"-":"",i=(r?-n:n)+"",u=i.length;return r+(e>u?new Array(e-u+1).join(t)+i:i)}function Vn(n){return new RegExp("^(?:"+n.map(ao.requote).join("|")+")","i")}function Xn(n){for(var t=new c,e=-1,r=n.length;++e<r;)t.set(n[e].toLowerCase(),e);return t}function $n(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+1));return r?(n.w=+r[0],e+r[0].length):-1}function Bn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.U=+r[0],e+r[0].length):-1}function Wn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e));return r?(n.W=+r[0],e+r[0].length):-1}function Jn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+4));return r?(n.y=+r[0],e+r[0].length):-1}function Gn(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.y=Qn(+r[0]),e+r[0].length):-1}function Kn(n,t,e){return/^[+-]\d{4}$/.test(t=t.slice(e,e+5))?(n.Z=-t,e+5):-1}function Qn(n){return n+(n>68?1900:2e3)}function nt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.m=r[0]-1,e+r[0].length):-1}function tt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.d=+r[0],e+r[0].length):-1}function et(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.j=+r[0],e+r[0].length):-1}function rt(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.H=+r[0],e+r[0].length):-1}function it(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.M=+r[0],e+r[0].length):-1}function ut(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+2));return r?(n.S=+r[0],e+r[0].length):-1}function ot(n,t,e){ma.lastIndex=0;var r=ma.exec(t.slice(e,e+3));return r?(n.L=+r[0],e+r[0].length):-1}function at(n){var t=n.getTimezoneOffset(),e=t>0?"-":"+",r=xo(t)/60|0,i=xo(t)%60;return e+Zn(r,"0",2)+Zn(i,"0",2)}function lt(n,t,e){Ma.lastIndex=0;var r=Ma.exec(t.slice(e,e+1));return r?e+r[0].length:-1}function ct(n){for(var t=n.length,e=-1;++e<t;)n[e][0]=this(n[e][0]);return function(t){for(var e=0,r=n[e];!r[1](t);)r=n[++e];return r[0](t)}}function ft(){}function st(n,t,e){var r=e.s=n+t,i=r-n,u=r-i;e.t=n-u+(t-i)}function ht(n,t){n&&wa.hasOwnProperty(n.type)&&wa[n.type](n,t)}function pt(n,t,e){var r,i=-1,u=n.length-e;for(t.lineStart();++i<u;)r=n[i],t.point(r[0],r[1],r[2]);t.lineEnd()}function gt(n,t){var e=-1,r=n.length;for(t.polygonStart();++e<r;)pt(n[e],t,1);t.polygonEnd()}function vt(){function n(n,t){n*=Yo,t=t*Yo/2+Fo/4;var e=n-r,o=e>=0?1:-1,a=o*e,l=Math.cos(t),c=Math.sin(t),f=u*c,s=i*l+f*Math.cos(a),h=f*o*Math.sin(a);ka.add(Math.atan2(h,s)),r=n,i=l,u=c}var t,e,r,i,u;Na.point=function(o,a){Na.point=n,r=(t=o)*Yo,i=Math.cos(a=(e=a)*Yo/2+Fo/4),u=Math.sin(a)},Na.lineEnd=function(){n(t,e)}}function dt(n){var t=n[0],e=n[1],r=Math.cos(e);return[r*Math.cos(t),r*Math.sin(t),Math.sin(e)]}function yt(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function mt(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Mt(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function xt(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function bt(n){var t=Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function _t(n){return[Math.atan2(n[1],n[0]),tn(n[2])]}function wt(n,t){return xo(n[0]-t[0])<Uo&&xo(n[1]-t[1])<Uo}function St(n,t){n*=Yo;var e=Math.cos(t*=Yo);kt(e*Math.cos(n),e*Math.sin(n),Math.sin(t))}function kt(n,t,e){++Ea,Ca+=(n-Ca)/Ea,za+=(t-za)/Ea,La+=(e-La)/Ea}function Nt(){function n(n,i){n*=Yo;var u=Math.cos(i*=Yo),o=u*Math.cos(n),a=u*Math.sin(n),l=Math.sin(i),c=Math.atan2(Math.sqrt((c=e*l-r*a)*c+(c=r*o-t*l)*c+(c=t*a-e*o)*c),t*o+e*a+r*l);Aa+=c,qa+=c*(t+(t=o)),Ta+=c*(e+(e=a)),Ra+=c*(r+(r=l)),kt(t,e,r)}var t,e,r;ja.point=function(i,u){i*=Yo;var o=Math.cos(u*=Yo);t=o*Math.cos(i),e=o*Math.sin(i),r=Math.sin(u),ja.point=n,kt(t,e,r)}}function Et(){ja.point=St}function At(){function n(n,t){n*=Yo;var e=Math.cos(t*=Yo),o=e*Math.cos(n),a=e*Math.sin(n),l=Math.sin(t),c=i*l-u*a,f=u*o-r*l,s=r*a-i*o,h=Math.sqrt(c*c+f*f+s*s),p=r*o+i*a+u*l,g=h&&-nn(p)/h,v=Math.atan2(h,p);Da+=g*c,Pa+=g*f,Ua+=g*s,Aa+=v,qa+=v*(r+(r=o)),Ta+=v*(i+(i=a)),Ra+=v*(u+(u=l)),kt(r,i,u)}var t,e,r,i,u;ja.point=function(o,a){t=o,e=a,ja.point=n,o*=Yo;var l=Math.cos(a*=Yo);r=l*Math.cos(o),i=l*Math.sin(o),u=Math.sin(a),kt(r,i,u)},ja.lineEnd=function(){n(t,e),ja.lineEnd=Et,ja.point=St}}function Ct(n,t){function e(e,r){return e=n(e,r),t(e[0],e[1])}return n.invert&&t.invert&&(e.invert=function(e,r){return e=t.invert(e,r),e&&n.invert(e[0],e[1])}),e}function zt(){return!0}function Lt(n,t,e,r,i){var u=[],o=[];if(n.forEach(function(n){if(!((t=n.length-1)<=0)){var t,e=n[0],r=n[t];if(wt(e,r)){i.lineStart();for(var a=0;t>a;++a)i.point((e=n[a])[0],e[1]);return void i.lineEnd()}var l=new Tt(e,n,null,!0),c=new Tt(e,null,l,!1);l.o=c,u.push(l),o.push(c),l=new Tt(r,n,null,!1),c=new Tt(r,null,l,!0),l.o=c,u.push(l),o.push(c)}}),o.sort(t),qt(u),qt(o),u.length){for(var a=0,l=e,c=o.length;c>a;++a)o[a].e=l=!l;for(var f,s,h=u[0];;){for(var p=h,g=!0;p.v;)if((p=p.n)===h)return;f=p.z,i.lineStart();do{if(p.v=p.o.v=!0,p.e){if(g)for(var a=0,c=f.length;c>a;++a)i.point((s=f[a])[0],s[1]);else r(p.x,p.n.x,1,i);p=p.n}else{if(g){f=p.p.z;for(var a=f.length-1;a>=0;--a)i.point((s=f[a])[0],s[1])}else r(p.x,p.p.x,-1,i);p=p.p}p=p.o,f=p.z,g=!g}while(!p.v);i.lineEnd()}}}function qt(n){if(t=n.length){for(var t,e,r=0,i=n[0];++r<t;)i.n=e=n[r],e.p=i,i=e;i.n=e=n[0],e.p=i}}function Tt(n,t,e,r){this.x=n,this.z=t,this.o=e,this.e=r,this.v=!1,this.n=this.p=null}function Rt(n,t,e,r){return function(i,u){function o(t,e){var r=i(t,e);n(t=r[0],e=r[1])&&u.point(t,e)}function a(n,t){var e=i(n,t);d.point(e[0],e[1])}function l(){m.point=a,d.lineStart()}function c(){m.point=o,d.lineEnd()}function f(n,t){v.push([n,t]);var e=i(n,t);x.point(e[0],e[1])}function s(){x.lineStart(),v=[]}function h(){f(v[0][0],v[0][1]),x.lineEnd();var n,t=x.clean(),e=M.buffer(),r=e.length;if(v.pop(),g.push(v),v=null,r)if(1&t){n=e[0];var i,r=n.length-1,o=-1;if(r>0){for(b||(u.polygonStart(),b=!0),u.lineStart();++o<r;)u.point((i=n[o])[0],i[1]);u.lineEnd()}}else r>1&&2&t&&e.push(e.pop().concat(e.shift())),p.push(e.filter(Dt))}var p,g,v,d=t(u),y=i.invert(r[0],r[1]),m={point:o,lineStart:l,lineEnd:c,polygonStart:function(){m.point=f,m.lineStart=s,m.lineEnd=h,p=[],g=[]},polygonEnd:function(){m.point=o,m.lineStart=l,m.lineEnd=c,p=ao.merge(p);var n=Ot(y,g);p.length?(b||(u.polygonStart(),b=!0),Lt(p,Ut,n,e,u)):n&&(b||(u.polygonStart(),b=!0),u.lineStart(),e(null,null,1,u),u.lineEnd()),b&&(u.polygonEnd(),b=!1),p=g=null},sphere:function(){u.polygonStart(),u.lineStart(),e(null,null,1,u),u.lineEnd(),u.polygonEnd()}},M=Pt(),x=t(M),b=!1;return m}}function Dt(n){return n.length>1}function Pt(){var n,t=[];return{lineStart:function(){t.push(n=[])},point:function(t,e){n.push([t,e])},lineEnd:b,buffer:function(){var e=t;return t=[],n=null,e},rejoin:function(){t.length>1&&t.push(t.pop().concat(t.shift()))}}}function Ut(n,t){return((n=n.x)[0]<0?n[1]-Io-Uo:Io-n[1])-((t=t.x)[0]<0?t[1]-Io-Uo:Io-t[1])}function jt(n){var t,e=NaN,r=NaN,i=NaN;return{lineStart:function(){n.lineStart(),t=1},point:function(u,o){var a=u>0?Fo:-Fo,l=xo(u-e);xo(l-Fo)<Uo?(n.point(e,r=(r+o)/2>0?Io:-Io),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),n.point(u,r),t=0):i!==a&&l>=Fo&&(xo(e-i)<Uo&&(e-=i*Uo),xo(u-a)<Uo&&(u-=a*Uo),r=Ft(e,r,u,o),n.point(i,r),n.lineEnd(),n.lineStart(),n.point(a,r),t=0),n.point(e=u,r=o),i=a},lineEnd:function(){n.lineEnd(),e=r=NaN},clean:function(){return 2-t}}}function Ft(n,t,e,r){var i,u,o=Math.sin(n-e);return xo(o)>Uo?Math.atan((Math.sin(t)*(u=Math.cos(r))*Math.sin(e)-Math.sin(r)*(i=Math.cos(t))*Math.sin(n))/(i*u*o)):(t+r)/2}function Ht(n,t,e,r){var i;if(null==n)i=e*Io,r.point(-Fo,i),r.point(0,i),r.point(Fo,i),r.point(Fo,0),r.point(Fo,-i),r.point(0,-i),r.point(-Fo,-i),r.point(-Fo,0),r.point(-Fo,i);else if(xo(n[0]-t[0])>Uo){var u=n[0]<t[0]?Fo:-Fo;i=e*u/2,r.point(-u,i),r.point(0,i),r.point(u,i)}else r.point(t[0],t[1])}function Ot(n,t){var e=n[0],r=n[1],i=[Math.sin(e),-Math.cos(e),0],u=0,o=0;ka.reset();for(var a=0,l=t.length;l>a;++a){var c=t[a],f=c.length;if(f)for(var s=c[0],h=s[0],p=s[1]/2+Fo/4,g=Math.sin(p),v=Math.cos(p),d=1;;){d===f&&(d=0),n=c[d];var y=n[0],m=n[1]/2+Fo/4,M=Math.sin(m),x=Math.cos(m),b=y-h,_=b>=0?1:-1,w=_*b,S=w>Fo,k=g*M;if(ka.add(Math.atan2(k*_*Math.sin(w),v*x+k*Math.cos(w))),u+=S?b+_*Ho:b,S^h>=e^y>=e){var N=mt(dt(s),dt(n));bt(N);var E=mt(i,N);bt(E);var A=(S^b>=0?-1:1)*tn(E[2]);(r>A||r===A&&(N[0]||N[1]))&&(o+=S^b>=0?1:-1)}if(!d++)break;h=y,g=M,v=x,s=n}}return(-Uo>u||Uo>u&&-Uo>ka)^1&o}function It(n){function t(n,t){return Math.cos(n)*Math.cos(t)>u}function e(n){var e,u,l,c,f;return{lineStart:function(){c=l=!1,f=1},point:function(s,h){var p,g=[s,h],v=t(s,h),d=o?v?0:i(s,h):v?i(s+(0>s?Fo:-Fo),h):0;if(!e&&(c=l=v)&&n.lineStart(),v!==l&&(p=r(e,g),(wt(e,p)||wt(g,p))&&(g[0]+=Uo,g[1]+=Uo,v=t(g[0],g[1]))),v!==l)f=0,v?(n.lineStart(),p=r(g,e),n.point(p[0],p[1])):(p=r(e,g),n.point(p[0],p[1]),n.lineEnd()),e=p;else if(a&&e&&o^v){var y;d&u||!(y=r(g,e,!0))||(f=0,o?(n.lineStart(),n.point(y[0][0],y[0][1]),n.point(y[1][0],y[1][1]),n.lineEnd()):(n.point(y[1][0],y[1][1]),n.lineEnd(),n.lineStart(),n.point(y[0][0],y[0][1])))}!v||e&&wt(e,g)||n.point(g[0],g[1]),e=g,l=v,u=d},lineEnd:function(){l&&n.lineEnd(),e=null},clean:function(){return f|(c&&l)<<1}}}function r(n,t,e){var r=dt(n),i=dt(t),o=[1,0,0],a=mt(r,i),l=yt(a,a),c=a[0],f=l-c*c;if(!f)return!e&&n;var s=u*l/f,h=-u*c/f,p=mt(o,a),g=xt(o,s),v=xt(a,h);Mt(g,v);var d=p,y=yt(g,d),m=yt(d,d),M=y*y-m*(yt(g,g)-1);if(!(0>M)){var x=Math.sqrt(M),b=xt(d,(-y-x)/m);if(Mt(b,g),b=_t(b),!e)return b;var _,w=n[0],S=t[0],k=n[1],N=t[1];w>S&&(_=w,w=S,S=_);var E=S-w,A=xo(E-Fo)<Uo,C=A||Uo>E;if(!A&&k>N&&(_=k,k=N,N=_),C?A?k+N>0^b[1]<(xo(b[0]-w)<Uo?k:N):k<=b[1]&&b[1]<=N:E>Fo^(w<=b[0]&&b[0]<=S)){var z=xt(d,(-y+x)/m);return Mt(z,g),[b,_t(z)]}}}function i(t,e){var r=o?n:Fo-n,i=0;return-r>t?i|=1:t>r&&(i|=2),-r>e?i|=4:e>r&&(i|=8),i}var u=Math.cos(n),o=u>0,a=xo(u)>Uo,l=ve(n,6*Yo);return Rt(t,e,l,o?[0,-n]:[-Fo,n-Fo])}function Yt(n,t,e,r){return function(i){var u,o=i.a,a=i.b,l=o.x,c=o.y,f=a.x,s=a.y,h=0,p=1,g=f-l,v=s-c;if(u=n-l,g||!(u>0)){if(u/=g,0>g){if(h>u)return;p>u&&(p=u)}else if(g>0){if(u>p)return;u>h&&(h=u)}if(u=e-l,g||!(0>u)){if(u/=g,0>g){if(u>p)return;u>h&&(h=u)}else if(g>0){if(h>u)return;p>u&&(p=u)}if(u=t-c,v||!(u>0)){if(u/=v,0>v){if(h>u)return;p>u&&(p=u)}else if(v>0){if(u>p)return;u>h&&(h=u)}if(u=r-c,v||!(0>u)){if(u/=v,0>v){if(u>p)return;u>h&&(h=u)}else if(v>0){if(h>u)return;p>u&&(p=u)}return h>0&&(i.a={x:l+h*g,y:c+h*v}),1>p&&(i.b={x:l+p*g,y:c+p*v}),i}}}}}}function Zt(n,t,e,r){function i(r,i){return xo(r[0]-n)<Uo?i>0?0:3:xo(r[0]-e)<Uo?i>0?2:1:xo(r[1]-t)<Uo?i>0?1:0:i>0?3:2}function u(n,t){return o(n.x,t.x)}function o(n,t){var e=i(n,1),r=i(t,1);return e!==r?e-r:0===e?t[1]-n[1]:1===e?n[0]-t[0]:2===e?n[1]-t[1]:t[0]-n[0]}return function(a){function l(n){for(var t=0,e=d.length,r=n[1],i=0;e>i;++i)for(var u,o=1,a=d[i],l=a.length,c=a[0];l>o;++o)u=a[o],c[1]<=r?u[1]>r&&Q(c,u,n)>0&&++t:u[1]<=r&&Q(c,u,n)<0&&--t,c=u;return 0!==t}function c(u,a,l,c){var f=0,s=0;if(null==u||(f=i(u,l))!==(s=i(a,l))||o(u,a)<0^l>0){do c.point(0===f||3===f?n:e,f>1?r:t);while((f=(f+l+4)%4)!==s)}else c.point(a[0],a[1])}function f(i,u){return i>=n&&e>=i&&u>=t&&r>=u}function s(n,t){f(n,t)&&a.point(n,t)}function h(){C.point=g,d&&d.push(y=[]),S=!0,w=!1,b=_=NaN}function p(){v&&(g(m,M),x&&w&&E.rejoin(),v.push(E.buffer())),C.point=s,w&&a.lineEnd()}function g(n,t){n=Math.max(-Ha,Math.min(Ha,n)),t=Math.max(-Ha,Math.min(Ha,t));var e=f(n,t);if(d&&y.push([n,t]),S)m=n,M=t,x=e,S=!1,e&&(a.lineStart(),a.point(n,t));else if(e&&w)a.point(n,t);else{var r={a:{x:b,y:_},b:{x:n,y:t}};A(r)?(w||(a.lineStart(),a.point(r.a.x,r.a.y)),a.point(r.b.x,r.b.y),e||a.lineEnd(),k=!1):e&&(a.lineStart(),a.point(n,t),k=!1)}b=n,_=t,w=e}var v,d,y,m,M,x,b,_,w,S,k,N=a,E=Pt(),A=Yt(n,t,e,r),C={point:s,lineStart:h,lineEnd:p,polygonStart:function(){a=E,v=[],d=[],k=!0},polygonEnd:function(){a=N,v=ao.merge(v);var t=l([n,r]),e=k&&t,i=v.length;(e||i)&&(a.polygonStart(),e&&(a.lineStart(),c(null,null,1,a),a.lineEnd()),i&&Lt(v,u,t,c,a),a.polygonEnd()),v=d=y=null}};return C}}function Vt(n){var t=0,e=Fo/3,r=ae(n),i=r(t,e);return i.parallels=function(n){return arguments.length?r(t=n[0]*Fo/180,e=n[1]*Fo/180):[t/Fo*180,e/Fo*180]},i}function Xt(n,t){function e(n,t){var e=Math.sqrt(u-2*i*Math.sin(t))/i;return[e*Math.sin(n*=i),o-e*Math.cos(n)]}var r=Math.sin(n),i=(r+Math.sin(t))/2,u=1+r*(2*i-r),o=Math.sqrt(u)/i;return e.invert=function(n,t){var e=o-t;return[Math.atan2(n,e)/i,tn((u-(n*n+e*e)*i*i)/(2*i))]},e}function $t(){function n(n,t){Ia+=i*n-r*t,r=n,i=t}var t,e,r,i;$a.point=function(u,o){$a.point=n,t=r=u,e=i=o},$a.lineEnd=function(){n(t,e)}}function Bt(n,t){Ya>n&&(Ya=n),n>Va&&(Va=n),Za>t&&(Za=t),t>Xa&&(Xa=t)}function Wt(){function n(n,t){o.push("M",n,",",t,u)}function t(n,t){o.push("M",n,",",t),a.point=e}function e(n,t){o.push("L",n,",",t)}function r(){a.point=n}function i(){o.push("Z")}var u=Jt(4.5),o=[],a={point:n,lineStart:function(){a.point=t},lineEnd:r,polygonStart:function(){a.lineEnd=i},polygonEnd:function(){a.lineEnd=r,a.point=n},pointRadius:function(n){return u=Jt(n),a},result:function(){if(o.length){var n=o.join("");return o=[],n}}};return a}function Jt(n){return"m0,"+n+"a"+n+","+n+" 0 1,1 0,"+-2*n+"a"+n+","+n+" 0 1,1 0,"+2*n+"z"}function Gt(n,t){Ca+=n,za+=t,++La}function Kt(){function n(n,r){var i=n-t,u=r-e,o=Math.sqrt(i*i+u*u);qa+=o*(t+n)/2,Ta+=o*(e+r)/2,Ra+=o,Gt(t=n,e=r)}var t,e;Wa.point=function(r,i){Wa.point=n,Gt(t=r,e=i)}}function Qt(){Wa.point=Gt}function ne(){function n(n,t){var e=n-r,u=t-i,o=Math.sqrt(e*e+u*u);qa+=o*(r+n)/2,Ta+=o*(i+t)/2,Ra+=o,o=i*n-r*t,Da+=o*(r+n),Pa+=o*(i+t),Ua+=3*o,Gt(r=n,i=t)}var t,e,r,i;Wa.point=function(u,o){Wa.point=n,Gt(t=r=u,e=i=o)},Wa.lineEnd=function(){n(t,e)}}function te(n){function t(t,e){n.moveTo(t+o,e),n.arc(t,e,o,0,Ho)}function e(t,e){n.moveTo(t,e),a.point=r}function r(t,e){n.lineTo(t,e)}function i(){a.point=t}function u(){n.closePath()}var o=4.5,a={point:t,lineStart:function(){a.point=e},lineEnd:i,polygonStart:function(){a.lineEnd=u},polygonEnd:function(){a.lineEnd=i,a.point=t},pointRadius:function(n){return o=n,a},result:b};return a}function ee(n){function t(n){return(a?r:e)(n)}function e(t){return ue(t,function(e,r){e=n(e,r),t.point(e[0],e[1])})}function r(t){function e(e,r){e=n(e,r),t.point(e[0],e[1])}function r(){M=NaN,S.point=u,t.lineStart()}function u(e,r){var u=dt([e,r]),o=n(e,r);i(M,x,m,b,_,w,M=o[0],x=o[1],m=e,b=u[0],_=u[1],w=u[2],a,t),t.point(M,x)}function o(){S.point=e,t.lineEnd()}function l(){
r(),S.point=c,S.lineEnd=f}function c(n,t){u(s=n,h=t),p=M,g=x,v=b,d=_,y=w,S.point=u}function f(){i(M,x,m,b,_,w,p,g,s,v,d,y,a,t),S.lineEnd=o,o()}var s,h,p,g,v,d,y,m,M,x,b,_,w,S={point:e,lineStart:r,lineEnd:o,polygonStart:function(){t.polygonStart(),S.lineStart=l},polygonEnd:function(){t.polygonEnd(),S.lineStart=r}};return S}function i(t,e,r,a,l,c,f,s,h,p,g,v,d,y){var m=f-t,M=s-e,x=m*m+M*M;if(x>4*u&&d--){var b=a+p,_=l+g,w=c+v,S=Math.sqrt(b*b+_*_+w*w),k=Math.asin(w/=S),N=xo(xo(w)-1)<Uo||xo(r-h)<Uo?(r+h)/2:Math.atan2(_,b),E=n(N,k),A=E[0],C=E[1],z=A-t,L=C-e,q=M*z-m*L;(q*q/x>u||xo((m*z+M*L)/x-.5)>.3||o>a*p+l*g+c*v)&&(i(t,e,r,a,l,c,A,C,N,b/=S,_/=S,w,d,y),y.point(A,C),i(A,C,N,b,_,w,f,s,h,p,g,v,d,y))}}var u=.5,o=Math.cos(30*Yo),a=16;return t.precision=function(n){return arguments.length?(a=(u=n*n)>0&&16,t):Math.sqrt(u)},t}function re(n){var t=ee(function(t,e){return n([t*Zo,e*Zo])});return function(n){return le(t(n))}}function ie(n){this.stream=n}function ue(n,t){return{point:t,sphere:function(){n.sphere()},lineStart:function(){n.lineStart()},lineEnd:function(){n.lineEnd()},polygonStart:function(){n.polygonStart()},polygonEnd:function(){n.polygonEnd()}}}function oe(n){return ae(function(){return n})()}function ae(n){function t(n){return n=a(n[0]*Yo,n[1]*Yo),[n[0]*h+l,c-n[1]*h]}function e(n){return n=a.invert((n[0]-l)/h,(c-n[1])/h),n&&[n[0]*Zo,n[1]*Zo]}function r(){a=Ct(o=se(y,M,x),u);var n=u(v,d);return l=p-n[0]*h,c=g+n[1]*h,i()}function i(){return f&&(f.valid=!1,f=null),t}var u,o,a,l,c,f,s=ee(function(n,t){return n=u(n,t),[n[0]*h+l,c-n[1]*h]}),h=150,p=480,g=250,v=0,d=0,y=0,M=0,x=0,b=Fa,_=m,w=null,S=null;return t.stream=function(n){return f&&(f.valid=!1),f=le(b(o,s(_(n)))),f.valid=!0,f},t.clipAngle=function(n){return arguments.length?(b=null==n?(w=n,Fa):It((w=+n)*Yo),i()):w},t.clipExtent=function(n){return arguments.length?(S=n,_=n?Zt(n[0][0],n[0][1],n[1][0],n[1][1]):m,i()):S},t.scale=function(n){return arguments.length?(h=+n,r()):h},t.translate=function(n){return arguments.length?(p=+n[0],g=+n[1],r()):[p,g]},t.center=function(n){return arguments.length?(v=n[0]%360*Yo,d=n[1]%360*Yo,r()):[v*Zo,d*Zo]},t.rotate=function(n){return arguments.length?(y=n[0]%360*Yo,M=n[1]%360*Yo,x=n.length>2?n[2]%360*Yo:0,r()):[y*Zo,M*Zo,x*Zo]},ao.rebind(t,s,"precision"),function(){return u=n.apply(this,arguments),t.invert=u.invert&&e,r()}}function le(n){return ue(n,function(t,e){n.point(t*Yo,e*Yo)})}function ce(n,t){return[n,t]}function fe(n,t){return[n>Fo?n-Ho:-Fo>n?n+Ho:n,t]}function se(n,t,e){return n?t||e?Ct(pe(n),ge(t,e)):pe(n):t||e?ge(t,e):fe}function he(n){return function(t,e){return t+=n,[t>Fo?t-Ho:-Fo>t?t+Ho:t,e]}}function pe(n){var t=he(n);return t.invert=he(-n),t}function ge(n,t){function e(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*r+a*i;return[Math.atan2(l*u-f*o,a*r-c*i),tn(f*u+l*o)]}var r=Math.cos(n),i=Math.sin(n),u=Math.cos(t),o=Math.sin(t);return e.invert=function(n,t){var e=Math.cos(t),a=Math.cos(n)*e,l=Math.sin(n)*e,c=Math.sin(t),f=c*u-l*o;return[Math.atan2(l*u+c*o,a*r+f*i),tn(f*r-a*i)]},e}function ve(n,t){var e=Math.cos(n),r=Math.sin(n);return function(i,u,o,a){var l=o*t;null!=i?(i=de(e,i),u=de(e,u),(o>0?u>i:i>u)&&(i+=o*Ho)):(i=n+o*Ho,u=n-.5*l);for(var c,f=i;o>0?f>u:u>f;f-=l)a.point((c=_t([e,-r*Math.cos(f),-r*Math.sin(f)]))[0],c[1])}}function de(n,t){var e=dt(t);e[0]-=n,bt(e);var r=nn(-e[1]);return((-e[2]<0?-r:r)+2*Math.PI-Uo)%(2*Math.PI)}function ye(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[n,t]})}}function me(n,t,e){var r=ao.range(n,t-Uo,e).concat(t);return function(n){return r.map(function(t){return[t,n]})}}function Me(n){return n.source}function xe(n){return n.target}function be(n,t,e,r){var i=Math.cos(t),u=Math.sin(t),o=Math.cos(r),a=Math.sin(r),l=i*Math.cos(n),c=i*Math.sin(n),f=o*Math.cos(e),s=o*Math.sin(e),h=2*Math.asin(Math.sqrt(on(r-t)+i*o*on(e-n))),p=1/Math.sin(h),g=h?function(n){var t=Math.sin(n*=h)*p,e=Math.sin(h-n)*p,r=e*l+t*f,i=e*c+t*s,o=e*u+t*a;return[Math.atan2(i,r)*Zo,Math.atan2(o,Math.sqrt(r*r+i*i))*Zo]}:function(){return[n*Zo,t*Zo]};return g.distance=h,g}function _e(){function n(n,i){var u=Math.sin(i*=Yo),o=Math.cos(i),a=xo((n*=Yo)-t),l=Math.cos(a);Ja+=Math.atan2(Math.sqrt((a=o*Math.sin(a))*a+(a=r*u-e*o*l)*a),e*u+r*o*l),t=n,e=u,r=o}var t,e,r;Ga.point=function(i,u){t=i*Yo,e=Math.sin(u*=Yo),r=Math.cos(u),Ga.point=n},Ga.lineEnd=function(){Ga.point=Ga.lineEnd=b}}function we(n,t){function e(t,e){var r=Math.cos(t),i=Math.cos(e),u=n(r*i);return[u*i*Math.sin(t),u*Math.sin(e)]}return e.invert=function(n,e){var r=Math.sqrt(n*n+e*e),i=t(r),u=Math.sin(i),o=Math.cos(i);return[Math.atan2(n*u,r*o),Math.asin(r&&e*u/r)]},e}function Se(n,t){function e(n,t){o>0?-Io+Uo>t&&(t=-Io+Uo):t>Io-Uo&&(t=Io-Uo);var e=o/Math.pow(i(t),u);return[e*Math.sin(u*n),o-e*Math.cos(u*n)]}var r=Math.cos(n),i=function(n){return Math.tan(Fo/4+n/2)},u=n===t?Math.sin(n):Math.log(r/Math.cos(t))/Math.log(i(t)/i(n)),o=r*Math.pow(i(n),u)/u;return u?(e.invert=function(n,t){var e=o-t,r=K(u)*Math.sqrt(n*n+e*e);return[Math.atan2(n,e)/u,2*Math.atan(Math.pow(o/r,1/u))-Io]},e):Ne}function ke(n,t){function e(n,t){var e=u-t;return[e*Math.sin(i*n),u-e*Math.cos(i*n)]}var r=Math.cos(n),i=n===t?Math.sin(n):(r-Math.cos(t))/(t-n),u=r/i+n;return xo(i)<Uo?ce:(e.invert=function(n,t){var e=u-t;return[Math.atan2(n,e)/i,u-K(i)*Math.sqrt(n*n+e*e)]},e)}function Ne(n,t){return[n,Math.log(Math.tan(Fo/4+t/2))]}function Ee(n){var t,e=oe(n),r=e.scale,i=e.translate,u=e.clipExtent;return e.scale=function(){var n=r.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.translate=function(){var n=i.apply(e,arguments);return n===e?t?e.clipExtent(null):e:n},e.clipExtent=function(n){var o=u.apply(e,arguments);if(o===e){if(t=null==n){var a=Fo*r(),l=i();u([[l[0]-a,l[1]-a],[l[0]+a,l[1]+a]])}}else t&&(o=null);return o},e.clipExtent(null)}function Ae(n,t){return[Math.log(Math.tan(Fo/4+t/2)),-n]}function Ce(n){return n[0]}function ze(n){return n[1]}function Le(n){for(var t=n.length,e=[0,1],r=2,i=2;t>i;i++){for(;r>1&&Q(n[e[r-2]],n[e[r-1]],n[i])<=0;)--r;e[r++]=i}return e.slice(0,r)}function qe(n,t){return n[0]-t[0]||n[1]-t[1]}function Te(n,t,e){return(e[0]-t[0])*(n[1]-t[1])<(e[1]-t[1])*(n[0]-t[0])}function Re(n,t,e,r){var i=n[0],u=e[0],o=t[0]-i,a=r[0]-u,l=n[1],c=e[1],f=t[1]-l,s=r[1]-c,h=(a*(l-c)-s*(i-u))/(s*o-a*f);return[i+h*o,l+h*f]}function De(n){var t=n[0],e=n[n.length-1];return!(t[0]-e[0]||t[1]-e[1])}function Pe(){rr(this),this.edge=this.site=this.circle=null}function Ue(n){var t=cl.pop()||new Pe;return t.site=n,t}function je(n){Be(n),ol.remove(n),cl.push(n),rr(n)}function Fe(n){var t=n.circle,e=t.x,r=t.cy,i={x:e,y:r},u=n.P,o=n.N,a=[n];je(n);for(var l=u;l.circle&&xo(e-l.circle.x)<Uo&&xo(r-l.circle.cy)<Uo;)u=l.P,a.unshift(l),je(l),l=u;a.unshift(l),Be(l);for(var c=o;c.circle&&xo(e-c.circle.x)<Uo&&xo(r-c.circle.cy)<Uo;)o=c.N,a.push(c),je(c),c=o;a.push(c),Be(c);var f,s=a.length;for(f=1;s>f;++f)c=a[f],l=a[f-1],nr(c.edge,l.site,c.site,i);l=a[0],c=a[s-1],c.edge=Ke(l.site,c.site,null,i),$e(l),$e(c)}function He(n){for(var t,e,r,i,u=n.x,o=n.y,a=ol._;a;)if(r=Oe(a,o)-u,r>Uo)a=a.L;else{if(i=u-Ie(a,o),!(i>Uo)){r>-Uo?(t=a.P,e=a):i>-Uo?(t=a,e=a.N):t=e=a;break}if(!a.R){t=a;break}a=a.R}var l=Ue(n);if(ol.insert(t,l),t||e){if(t===e)return Be(t),e=Ue(t.site),ol.insert(l,e),l.edge=e.edge=Ke(t.site,l.site),$e(t),void $e(e);if(!e)return void(l.edge=Ke(t.site,l.site));Be(t),Be(e);var c=t.site,f=c.x,s=c.y,h=n.x-f,p=n.y-s,g=e.site,v=g.x-f,d=g.y-s,y=2*(h*d-p*v),m=h*h+p*p,M=v*v+d*d,x={x:(d*m-p*M)/y+f,y:(h*M-v*m)/y+s};nr(e.edge,c,g,x),l.edge=Ke(c,n,null,x),e.edge=Ke(n,g,null,x),$e(t),$e(e)}}function Oe(n,t){var e=n.site,r=e.x,i=e.y,u=i-t;if(!u)return r;var o=n.P;if(!o)return-(1/0);e=o.site;var a=e.x,l=e.y,c=l-t;if(!c)return a;var f=a-r,s=1/u-1/c,h=f/c;return s?(-h+Math.sqrt(h*h-2*s*(f*f/(-2*c)-l+c/2+i-u/2)))/s+r:(r+a)/2}function Ie(n,t){var e=n.N;if(e)return Oe(e,t);var r=n.site;return r.y===t?r.x:1/0}function Ye(n){this.site=n,this.edges=[]}function Ze(n){for(var t,e,r,i,u,o,a,l,c,f,s=n[0][0],h=n[1][0],p=n[0][1],g=n[1][1],v=ul,d=v.length;d--;)if(u=v[d],u&&u.prepare())for(a=u.edges,l=a.length,o=0;l>o;)f=a[o].end(),r=f.x,i=f.y,c=a[++o%l].start(),t=c.x,e=c.y,(xo(r-t)>Uo||xo(i-e)>Uo)&&(a.splice(o,0,new tr(Qe(u.site,f,xo(r-s)<Uo&&g-i>Uo?{x:s,y:xo(t-s)<Uo?e:g}:xo(i-g)<Uo&&h-r>Uo?{x:xo(e-g)<Uo?t:h,y:g}:xo(r-h)<Uo&&i-p>Uo?{x:h,y:xo(t-h)<Uo?e:p}:xo(i-p)<Uo&&r-s>Uo?{x:xo(e-p)<Uo?t:s,y:p}:null),u.site,null)),++l)}function Ve(n,t){return t.angle-n.angle}function Xe(){rr(this),this.x=this.y=this.arc=this.site=this.cy=null}function $e(n){var t=n.P,e=n.N;if(t&&e){var r=t.site,i=n.site,u=e.site;if(r!==u){var o=i.x,a=i.y,l=r.x-o,c=r.y-a,f=u.x-o,s=u.y-a,h=2*(l*s-c*f);if(!(h>=-jo)){var p=l*l+c*c,g=f*f+s*s,v=(s*p-c*g)/h,d=(l*g-f*p)/h,s=d+a,y=fl.pop()||new Xe;y.arc=n,y.site=i,y.x=v+o,y.y=s+Math.sqrt(v*v+d*d),y.cy=s,n.circle=y;for(var m=null,M=ll._;M;)if(y.y<M.y||y.y===M.y&&y.x<=M.x){if(!M.L){m=M.P;break}M=M.L}else{if(!M.R){m=M;break}M=M.R}ll.insert(m,y),m||(al=y)}}}}function Be(n){var t=n.circle;t&&(t.P||(al=t.N),ll.remove(t),fl.push(t),rr(t),n.circle=null)}function We(n){for(var t,e=il,r=Yt(n[0][0],n[0][1],n[1][0],n[1][1]),i=e.length;i--;)t=e[i],(!Je(t,n)||!r(t)||xo(t.a.x-t.b.x)<Uo&&xo(t.a.y-t.b.y)<Uo)&&(t.a=t.b=null,e.splice(i,1))}function Je(n,t){var e=n.b;if(e)return!0;var r,i,u=n.a,o=t[0][0],a=t[1][0],l=t[0][1],c=t[1][1],f=n.l,s=n.r,h=f.x,p=f.y,g=s.x,v=s.y,d=(h+g)/2,y=(p+v)/2;if(v===p){if(o>d||d>=a)return;if(h>g){if(u){if(u.y>=c)return}else u={x:d,y:l};e={x:d,y:c}}else{if(u){if(u.y<l)return}else u={x:d,y:c};e={x:d,y:l}}}else if(r=(h-g)/(v-p),i=y-r*d,-1>r||r>1)if(h>g){if(u){if(u.y>=c)return}else u={x:(l-i)/r,y:l};e={x:(c-i)/r,y:c}}else{if(u){if(u.y<l)return}else u={x:(c-i)/r,y:c};e={x:(l-i)/r,y:l}}else if(v>p){if(u){if(u.x>=a)return}else u={x:o,y:r*o+i};e={x:a,y:r*a+i}}else{if(u){if(u.x<o)return}else u={x:a,y:r*a+i};e={x:o,y:r*o+i}}return n.a=u,n.b=e,!0}function Ge(n,t){this.l=n,this.r=t,this.a=this.b=null}function Ke(n,t,e,r){var i=new Ge(n,t);return il.push(i),e&&nr(i,n,t,e),r&&nr(i,t,n,r),ul[n.i].edges.push(new tr(i,n,t)),ul[t.i].edges.push(new tr(i,t,n)),i}function Qe(n,t,e){var r=new Ge(n,null);return r.a=t,r.b=e,il.push(r),r}function nr(n,t,e,r){n.a||n.b?n.l===e?n.b=r:n.a=r:(n.a=r,n.l=t,n.r=e)}function tr(n,t,e){var r=n.a,i=n.b;this.edge=n,this.site=t,this.angle=e?Math.atan2(e.y-t.y,e.x-t.x):n.l===t?Math.atan2(i.x-r.x,r.y-i.y):Math.atan2(r.x-i.x,i.y-r.y)}function er(){this._=null}function rr(n){n.U=n.C=n.L=n.R=n.P=n.N=null}function ir(n,t){var e=t,r=t.R,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.R=r.L,e.R&&(e.R.U=e),r.L=e}function ur(n,t){var e=t,r=t.L,i=e.U;i?i.L===e?i.L=r:i.R=r:n._=r,r.U=i,e.U=r,e.L=r.R,e.L&&(e.L.U=e),r.R=e}function or(n){for(;n.L;)n=n.L;return n}function ar(n,t){var e,r,i,u=n.sort(lr).pop();for(il=[],ul=new Array(n.length),ol=new er,ll=new er;;)if(i=al,u&&(!i||u.y<i.y||u.y===i.y&&u.x<i.x))u.x===e&&u.y===r||(ul[u.i]=new Ye(u),He(u),e=u.x,r=u.y),u=n.pop();else{if(!i)break;Fe(i.arc)}t&&(We(t),Ze(t));var o={cells:ul,edges:il};return ol=ll=il=ul=null,o}function lr(n,t){return t.y-n.y||t.x-n.x}function cr(n,t,e){return(n.x-e.x)*(t.y-n.y)-(n.x-t.x)*(e.y-n.y)}function fr(n){return n.x}function sr(n){return n.y}function hr(){return{leaf:!0,nodes:[],point:null,x:null,y:null}}function pr(n,t,e,r,i,u){if(!n(t,e,r,i,u)){var o=.5*(e+i),a=.5*(r+u),l=t.nodes;l[0]&&pr(n,l[0],e,r,o,a),l[1]&&pr(n,l[1],o,r,i,a),l[2]&&pr(n,l[2],e,a,o,u),l[3]&&pr(n,l[3],o,a,i,u)}}function gr(n,t,e,r,i,u,o){var a,l=1/0;return function c(n,f,s,h,p){if(!(f>u||s>o||r>h||i>p)){if(g=n.point){var g,v=t-n.x,d=e-n.y,y=v*v+d*d;if(l>y){var m=Math.sqrt(l=y);r=t-m,i=e-m,u=t+m,o=e+m,a=g}}for(var M=n.nodes,x=.5*(f+h),b=.5*(s+p),_=t>=x,w=e>=b,S=w<<1|_,k=S+4;k>S;++S)if(n=M[3&S])switch(3&S){case 0:c(n,f,s,x,b);break;case 1:c(n,x,s,h,b);break;case 2:c(n,f,b,x,p);break;case 3:c(n,x,b,h,p)}}}(n,r,i,u,o),a}function vr(n,t){n=ao.rgb(n),t=ao.rgb(t);var e=n.r,r=n.g,i=n.b,u=t.r-e,o=t.g-r,a=t.b-i;return function(n){return"#"+bn(Math.round(e+u*n))+bn(Math.round(r+o*n))+bn(Math.round(i+a*n))}}function dr(n,t){var e,r={},i={};for(e in n)e in t?r[e]=Mr(n[e],t[e]):i[e]=n[e];for(e in t)e in n||(i[e]=t[e]);return function(n){for(e in r)i[e]=r[e](n);return i}}function yr(n,t){return n=+n,t=+t,function(e){return n*(1-e)+t*e}}function mr(n,t){var e,r,i,u=hl.lastIndex=pl.lastIndex=0,o=-1,a=[],l=[];for(n+="",t+="";(e=hl.exec(n))&&(r=pl.exec(t));)(i=r.index)>u&&(i=t.slice(u,i),a[o]?a[o]+=i:a[++o]=i),(e=e[0])===(r=r[0])?a[o]?a[o]+=r:a[++o]=r:(a[++o]=null,l.push({i:o,x:yr(e,r)})),u=pl.lastIndex;return u<t.length&&(i=t.slice(u),a[o]?a[o]+=i:a[++o]=i),a.length<2?l[0]?(t=l[0].x,function(n){return t(n)+""}):function(){return t}:(t=l.length,function(n){for(var e,r=0;t>r;++r)a[(e=l[r]).i]=e.x(n);return a.join("")})}function Mr(n,t){for(var e,r=ao.interpolators.length;--r>=0&&!(e=ao.interpolators[r](n,t)););return e}function xr(n,t){var e,r=[],i=[],u=n.length,o=t.length,a=Math.min(n.length,t.length);for(e=0;a>e;++e)r.push(Mr(n[e],t[e]));for(;u>e;++e)i[e]=n[e];for(;o>e;++e)i[e]=t[e];return function(n){for(e=0;a>e;++e)i[e]=r[e](n);return i}}function br(n){return function(t){return 0>=t?0:t>=1?1:n(t)}}function _r(n){return function(t){return 1-n(1-t)}}function wr(n){return function(t){return.5*(.5>t?n(2*t):2-n(2-2*t))}}function Sr(n){return n*n}function kr(n){return n*n*n}function Nr(n){if(0>=n)return 0;if(n>=1)return 1;var t=n*n,e=t*n;return 4*(.5>n?e:3*(n-t)+e-.75)}function Er(n){return function(t){return Math.pow(t,n)}}function Ar(n){return 1-Math.cos(n*Io)}function Cr(n){return Math.pow(2,10*(n-1))}function zr(n){return 1-Math.sqrt(1-n*n)}function Lr(n,t){var e;return arguments.length<2&&(t=.45),arguments.length?e=t/Ho*Math.asin(1/n):(n=1,e=t/4),function(r){return 1+n*Math.pow(2,-10*r)*Math.sin((r-e)*Ho/t)}}function qr(n){return n||(n=1.70158),function(t){return t*t*((n+1)*t-n)}}function Tr(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}function Rr(n,t){n=ao.hcl(n),t=ao.hcl(t);var e=n.h,r=n.c,i=n.l,u=t.h-e,o=t.c-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.c:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return sn(e+u*n,r+o*n,i+a*n)+""}}function Dr(n,t){n=ao.hsl(n),t=ao.hsl(t);var e=n.h,r=n.s,i=n.l,u=t.h-e,o=t.s-r,a=t.l-i;return isNaN(o)&&(o=0,r=isNaN(r)?t.s:r),isNaN(u)?(u=0,e=isNaN(e)?t.h:e):u>180?u-=360:-180>u&&(u+=360),function(n){return cn(e+u*n,r+o*n,i+a*n)+""}}function Pr(n,t){n=ao.lab(n),t=ao.lab(t);var e=n.l,r=n.a,i=n.b,u=t.l-e,o=t.a-r,a=t.b-i;return function(n){return pn(e+u*n,r+o*n,i+a*n)+""}}function Ur(n,t){return t-=n,function(e){return Math.round(n+t*e)}}function jr(n){var t=[n.a,n.b],e=[n.c,n.d],r=Hr(t),i=Fr(t,e),u=Hr(Or(e,t,-i))||0;t[0]*e[1]<e[0]*t[1]&&(t[0]*=-1,t[1]*=-1,r*=-1,i*=-1),this.rotate=(r?Math.atan2(t[1],t[0]):Math.atan2(-e[0],e[1]))*Zo,this.translate=[n.e,n.f],this.scale=[r,u],this.skew=u?Math.atan2(i,u)*Zo:0}function Fr(n,t){return n[0]*t[0]+n[1]*t[1]}function Hr(n){var t=Math.sqrt(Fr(n,n));return t&&(n[0]/=t,n[1]/=t),t}function Or(n,t,e){return n[0]+=e*t[0],n[1]+=e*t[1],n}function Ir(n){return n.length?n.pop()+",":""}function Yr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push("translate(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else(t[0]||t[1])&&e.push("translate("+t+")")}function Zr(n,t,e,r){n!==t?(n-t>180?t+=360:t-n>180&&(n+=360),r.push({i:e.push(Ir(e)+"rotate(",null,")")-2,x:yr(n,t)})):t&&e.push(Ir(e)+"rotate("+t+")")}function Vr(n,t,e,r){n!==t?r.push({i:e.push(Ir(e)+"skewX(",null,")")-2,x:yr(n,t)}):t&&e.push(Ir(e)+"skewX("+t+")")}function Xr(n,t,e,r){if(n[0]!==t[0]||n[1]!==t[1]){var i=e.push(Ir(e)+"scale(",null,",",null,")");r.push({i:i-4,x:yr(n[0],t[0])},{i:i-2,x:yr(n[1],t[1])})}else 1===t[0]&&1===t[1]||e.push(Ir(e)+"scale("+t+")")}function $r(n,t){var e=[],r=[];return n=ao.transform(n),t=ao.transform(t),Yr(n.translate,t.translate,e,r),Zr(n.rotate,t.rotate,e,r),Vr(n.skew,t.skew,e,r),Xr(n.scale,t.scale,e,r),n=t=null,function(n){for(var t,i=-1,u=r.length;++i<u;)e[(t=r[i]).i]=t.x(n);return e.join("")}}function Br(n,t){return t=(t-=n=+n)||1/t,function(e){return(e-n)/t}}function Wr(n,t){return t=(t-=n=+n)||1/t,function(e){return Math.max(0,Math.min(1,(e-n)/t))}}function Jr(n){for(var t=n.source,e=n.target,r=Kr(t,e),i=[t];t!==r;)t=t.parent,i.push(t);for(var u=i.length;e!==r;)i.splice(u,0,e),e=e.parent;return i}function Gr(n){for(var t=[],e=n.parent;null!=e;)t.push(n),n=e,e=e.parent;return t.push(n),t}function Kr(n,t){if(n===t)return n;for(var e=Gr(n),r=Gr(t),i=e.pop(),u=r.pop(),o=null;i===u;)o=i,i=e.pop(),u=r.pop();return o}function Qr(n){n.fixed|=2}function ni(n){n.fixed&=-7}function ti(n){n.fixed|=4,n.px=n.x,n.py=n.y}function ei(n){n.fixed&=-5}function ri(n,t,e){var r=0,i=0;if(n.charge=0,!n.leaf)for(var u,o=n.nodes,a=o.length,l=-1;++l<a;)u=o[l],null!=u&&(ri(u,t,e),n.charge+=u.charge,r+=u.charge*u.cx,i+=u.charge*u.cy);if(n.point){n.leaf||(n.point.x+=Math.random()-.5,n.point.y+=Math.random()-.5);var c=t*e[n.point.index];n.charge+=n.pointCharge=c,r+=c*n.point.x,i+=c*n.point.y}n.cx=r/n.charge,n.cy=i/n.charge}function ii(n,t){return ao.rebind(n,t,"sort","children","value"),n.nodes=n,n.links=fi,n}function ui(n,t){for(var e=[n];null!=(n=e.pop());)if(t(n),(i=n.children)&&(r=i.length))for(var r,i;--r>=0;)e.push(i[r])}function oi(n,t){for(var e=[n],r=[];null!=(n=e.pop());)if(r.push(n),(u=n.children)&&(i=u.length))for(var i,u,o=-1;++o<i;)e.push(u[o]);for(;null!=(n=r.pop());)t(n)}function ai(n){return n.children}function li(n){return n.value}function ci(n,t){return t.value-n.value}function fi(n){return ao.merge(n.map(function(n){return(n.children||[]).map(function(t){return{source:n,target:t}})}))}function si(n){return n.x}function hi(n){return n.y}function pi(n,t,e){n.y0=t,n.y=e}function gi(n){return ao.range(n.length)}function vi(n){for(var t=-1,e=n[0].length,r=[];++t<e;)r[t]=0;return r}function di(n){for(var t,e=1,r=0,i=n[0][1],u=n.length;u>e;++e)(t=n[e][1])>i&&(r=e,i=t);return r}function yi(n){return n.reduce(mi,0)}function mi(n,t){return n+t[1]}function Mi(n,t){return xi(n,Math.ceil(Math.log(t.length)/Math.LN2+1))}function xi(n,t){for(var e=-1,r=+n[0],i=(n[1]-r)/t,u=[];++e<=t;)u[e]=i*e+r;return u}function bi(n){return[ao.min(n),ao.max(n)]}function _i(n,t){return n.value-t.value}function wi(n,t){var e=n._pack_next;n._pack_next=t,t._pack_prev=n,t._pack_next=e,e._pack_prev=t}function Si(n,t){n._pack_next=t,t._pack_prev=n}function ki(n,t){var e=t.x-n.x,r=t.y-n.y,i=n.r+t.r;return.999*i*i>e*e+r*r}function Ni(n){function t(n){f=Math.min(n.x-n.r,f),s=Math.max(n.x+n.r,s),h=Math.min(n.y-n.r,h),p=Math.max(n.y+n.r,p)}if((e=n.children)&&(c=e.length)){var e,r,i,u,o,a,l,c,f=1/0,s=-(1/0),h=1/0,p=-(1/0);if(e.forEach(Ei),r=e[0],r.x=-r.r,r.y=0,t(r),c>1&&(i=e[1],i.x=i.r,i.y=0,t(i),c>2))for(u=e[2],zi(r,i,u),t(u),wi(r,u),r._pack_prev=u,wi(u,i),i=r._pack_next,o=3;c>o;o++){zi(r,i,u=e[o]);var g=0,v=1,d=1;for(a=i._pack_next;a!==i;a=a._pack_next,v++)if(ki(a,u)){g=1;break}if(1==g)for(l=r._pack_prev;l!==a._pack_prev&&!ki(l,u);l=l._pack_prev,d++);g?(d>v||v==d&&i.r<r.r?Si(r,i=a):Si(r=l,i),o--):(wi(r,u),i=u,t(u))}var y=(f+s)/2,m=(h+p)/2,M=0;for(o=0;c>o;o++)u=e[o],u.x-=y,u.y-=m,M=Math.max(M,u.r+Math.sqrt(u.x*u.x+u.y*u.y));n.r=M,e.forEach(Ai)}}function Ei(n){n._pack_next=n._pack_prev=n}function Ai(n){delete n._pack_next,delete n._pack_prev}function Ci(n,t,e,r){var i=n.children;if(n.x=t+=r*n.x,n.y=e+=r*n.y,n.r*=r,i)for(var u=-1,o=i.length;++u<o;)Ci(i[u],t,e,r)}function zi(n,t,e){var r=n.r+e.r,i=t.x-n.x,u=t.y-n.y;if(r&&(i||u)){var o=t.r+e.r,a=i*i+u*u;o*=o,r*=r;var l=.5+(r-o)/(2*a),c=Math.sqrt(Math.max(0,2*o*(r+a)-(r-=a)*r-o*o))/(2*a);e.x=n.x+l*i+c*u,e.y=n.y+l*u-c*i}else e.x=n.x+r,e.y=n.y}function Li(n,t){return n.parent==t.parent?1:2}function qi(n){var t=n.children;return t.length?t[0]:n.t}function Ti(n){var t,e=n.children;return(t=e.length)?e[t-1]:n.t}function Ri(n,t,e){var r=e/(t.i-n.i);t.c-=r,t.s+=e,n.c+=r,t.z+=e,t.m+=e}function Di(n){for(var t,e=0,r=0,i=n.children,u=i.length;--u>=0;)t=i[u],t.z+=e,t.m+=e,e+=t.s+(r+=t.c)}function Pi(n,t,e){return n.a.parent===t.parent?n.a:e}function Ui(n){return 1+ao.max(n,function(n){return n.y})}function ji(n){return n.reduce(function(n,t){return n+t.x},0)/n.length}function Fi(n){var t=n.children;return t&&t.length?Fi(t[0]):n}function Hi(n){var t,e=n.children;return e&&(t=e.length)?Hi(e[t-1]):n}function Oi(n){return{x:n.x,y:n.y,dx:n.dx,dy:n.dy}}function Ii(n,t){var e=n.x+t[3],r=n.y+t[0],i=n.dx-t[1]-t[3],u=n.dy-t[0]-t[2];return 0>i&&(e+=i/2,i=0),0>u&&(r+=u/2,u=0),{x:e,y:r,dx:i,dy:u}}function Yi(n){var t=n[0],e=n[n.length-1];return e>t?[t,e]:[e,t]}function Zi(n){return n.rangeExtent?n.rangeExtent():Yi(n.range())}function Vi(n,t,e,r){var i=e(n[0],n[1]),u=r(t[0],t[1]);return function(n){return u(i(n))}}function Xi(n,t){var e,r=0,i=n.length-1,u=n[r],o=n[i];return u>o&&(e=r,r=i,i=e,e=u,u=o,o=e),n[r]=t.floor(u),n[i]=t.ceil(o),n}function $i(n){return n?{floor:function(t){return Math.floor(t/n)*n},ceil:function(t){return Math.ceil(t/n)*n}}:Sl}function Bi(n,t,e,r){var i=[],u=[],o=0,a=Math.min(n.length,t.length)-1;for(n[a]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<=a;)i.push(e(n[o-1],n[o])),u.push(r(t[o-1],t[o]));return function(t){var e=ao.bisect(n,t,1,a)-1;return u[e](i[e](t))}}function Wi(n,t,e,r){function i(){var i=Math.min(n.length,t.length)>2?Bi:Vi,l=r?Wr:Br;return o=i(n,t,l,e),a=i(t,n,l,Mr),u}function u(n){return o(n)}var o,a;return u.invert=function(n){return a(n)},u.domain=function(t){return arguments.length?(n=t.map(Number),i()):n},u.range=function(n){return arguments.length?(t=n,i()):t},u.rangeRound=function(n){return u.range(n).interpolate(Ur)},u.clamp=function(n){return arguments.length?(r=n,i()):r},u.interpolate=function(n){return arguments.length?(e=n,i()):e},u.ticks=function(t){return Qi(n,t)},u.tickFormat=function(t,e){return nu(n,t,e)},u.nice=function(t){return Gi(n,t),i()},u.copy=function(){return Wi(n,t,e,r)},i()}function Ji(n,t){return ao.rebind(n,t,"range","rangeRound","interpolate","clamp")}function Gi(n,t){return Xi(n,$i(Ki(n,t)[2])),Xi(n,$i(Ki(n,t)[2])),n}function Ki(n,t){null==t&&(t=10);var e=Yi(n),r=e[1]-e[0],i=Math.pow(10,Math.floor(Math.log(r/t)/Math.LN10)),u=t/r*i;return.15>=u?i*=10:.35>=u?i*=5:.75>=u&&(i*=2),e[0]=Math.ceil(e[0]/i)*i,e[1]=Math.floor(e[1]/i)*i+.5*i,e[2]=i,e}function Qi(n,t){return ao.range.apply(ao,Ki(n,t))}function nu(n,t,e){var r=Ki(n,t);if(e){var i=ha.exec(e);if(i.shift(),"s"===i[8]){var u=ao.formatPrefix(Math.max(xo(r[0]),xo(r[1])));return i[7]||(i[7]="."+tu(u.scale(r[2]))),i[8]="f",e=ao.format(i.join("")),function(n){return e(u.scale(n))+u.symbol}}i[7]||(i[7]="."+eu(i[8],r)),e=i.join("")}else e=",."+tu(r[2])+"f";return ao.format(e)}function tu(n){return-Math.floor(Math.log(n)/Math.LN10+.01)}function eu(n,t){var e=tu(t[2]);return n in kl?Math.abs(e-tu(Math.max(xo(t[0]),xo(t[1]))))+ +("e"!==n):e-2*("%"===n)}function ru(n,t,e,r){function i(n){return(e?Math.log(0>n?0:n):-Math.log(n>0?0:-n))/Math.log(t)}function u(n){return e?Math.pow(t,n):-Math.pow(t,-n)}function o(t){return n(i(t))}return o.invert=function(t){return u(n.invert(t))},o.domain=function(t){return arguments.length?(e=t[0]>=0,n.domain((r=t.map(Number)).map(i)),o):r},o.base=function(e){return arguments.length?(t=+e,n.domain(r.map(i)),o):t},o.nice=function(){var t=Xi(r.map(i),e?Math:El);return n.domain(t),r=t.map(u),o},o.ticks=function(){var n=Yi(r),o=[],a=n[0],l=n[1],c=Math.floor(i(a)),f=Math.ceil(i(l)),s=t%1?2:t;if(isFinite(f-c)){if(e){for(;f>c;c++)for(var h=1;s>h;h++)o.push(u(c)*h);o.push(u(c))}else for(o.push(u(c));c++<f;)for(var h=s-1;h>0;h--)o.push(u(c)*h);for(c=0;o[c]<a;c++);for(f=o.length;o[f-1]>l;f--);o=o.slice(c,f)}return o},o.tickFormat=function(n,e){if(!arguments.length)return Nl;arguments.length<2?e=Nl:"function"!=typeof e&&(e=ao.format(e));var r=Math.max(1,t*n/o.ticks().length);return function(n){var o=n/u(Math.round(i(n)));return t-.5>o*t&&(o*=t),r>=o?e(n):""}},o.copy=function(){return ru(n.copy(),t,e,r)},Ji(o,n)}function iu(n,t,e){function r(t){return n(i(t))}var i=uu(t),u=uu(1/t);return r.invert=function(t){return u(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain((e=t.map(Number)).map(i)),r):e},r.ticks=function(n){return Qi(e,n)},r.tickFormat=function(n,t){return nu(e,n,t)},r.nice=function(n){return r.domain(Gi(e,n))},r.exponent=function(o){return arguments.length?(i=uu(t=o),u=uu(1/t),n.domain(e.map(i)),r):t},r.copy=function(){return iu(n.copy(),t,e)},Ji(r,n)}function uu(n){return function(t){return 0>t?-Math.pow(-t,n):Math.pow(t,n)}}function ou(n,t){function e(e){return u[((i.get(e)||("range"===t.t?i.set(e,n.push(e)):NaN))-1)%u.length]}function r(t,e){return ao.range(n.length).map(function(n){return t+e*n})}var i,u,o;return e.domain=function(r){if(!arguments.length)return n;n=[],i=new c;for(var u,o=-1,a=r.length;++o<a;)i.has(u=r[o])||i.set(u,n.push(u));return e[t.t].apply(e,t.a)},e.range=function(n){return arguments.length?(u=n,o=0,t={t:"range",a:arguments},e):u},e.rangePoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=(l+c)/2,0):(c-l)/(n.length-1+a);return u=r(l+f*a/2,f),o=0,t={t:"rangePoints",a:arguments},e},e.rangeRoundPoints=function(i,a){arguments.length<2&&(a=0);var l=i[0],c=i[1],f=n.length<2?(l=c=Math.round((l+c)/2),0):(c-l)/(n.length-1+a)|0;return u=r(l+Math.round(f*a/2+(c-l-(n.length-1+a)*f)/2),f),o=0,t={t:"rangeRoundPoints",a:arguments},e},e.rangeBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=(s-f)/(n.length-a+2*l);return u=r(f+h*l,h),c&&u.reverse(),o=h*(1-a),t={t:"rangeBands",a:arguments},e},e.rangeRoundBands=function(i,a,l){arguments.length<2&&(a=0),arguments.length<3&&(l=a);var c=i[1]<i[0],f=i[c-0],s=i[1-c],h=Math.floor((s-f)/(n.length-a+2*l));return u=r(f+Math.round((s-f-(n.length-a)*h)/2),h),c&&u.reverse(),o=Math.round(h*(1-a)),t={t:"rangeRoundBands",a:arguments},e},e.rangeBand=function(){return o},e.rangeExtent=function(){return Yi(t.a[0])},e.copy=function(){return ou(n,t)},e.domain(n)}function au(n,t){function u(){var e=0,r=t.length;for(a=[];++e<r;)a[e-1]=ao.quantile(n,e/r);return o}function o(n){return isNaN(n=+n)?void 0:t[ao.bisect(a,n)]}var a;return o.domain=function(t){return arguments.length?(n=t.map(r).filter(i).sort(e),u()):n},o.range=function(n){return arguments.length?(t=n,u()):t},o.quantiles=function(){return a},o.invertExtent=function(e){return e=t.indexOf(e),0>e?[NaN,NaN]:[e>0?a[e-1]:n[0],e<a.length?a[e]:n[n.length-1]]},o.copy=function(){return au(n,t)},u()}function lu(n,t,e){function r(t){return e[Math.max(0,Math.min(o,Math.floor(u*(t-n))))]}function i(){return u=e.length/(t-n),o=e.length-1,r}var u,o;return r.domain=function(e){return arguments.length?(n=+e[0],t=+e[e.length-1],i()):[n,t]},r.range=function(n){return arguments.length?(e=n,i()):e},r.invertExtent=function(t){return t=e.indexOf(t),t=0>t?NaN:t/u+n,[t,t+1/u]},r.copy=function(){return lu(n,t,e)},i()}function cu(n,t){function e(e){return e>=e?t[ao.bisect(n,e)]:void 0}return e.domain=function(t){return arguments.length?(n=t,e):n},e.range=function(n){return arguments.length?(t=n,e):t},e.invertExtent=function(e){return e=t.indexOf(e),[n[e-1],n[e]]},e.copy=function(){return cu(n,t)},e}function fu(n){function t(n){return+n}return t.invert=t,t.domain=t.range=function(e){return arguments.length?(n=e.map(t),t):n},t.ticks=function(t){return Qi(n,t)},t.tickFormat=function(t,e){return nu(n,t,e)},t.copy=function(){return fu(n)},t}function su(){return 0}function hu(n){return n.innerRadius}function pu(n){return n.outerRadius}function gu(n){return n.startAngle}function vu(n){return n.endAngle}function du(n){return n&&n.padAngle}function yu(n,t,e,r){return(n-e)*t-(t-r)*n>0?0:1}function mu(n,t,e,r,i){var u=n[0]-t[0],o=n[1]-t[1],a=(i?r:-r)/Math.sqrt(u*u+o*o),l=a*o,c=-a*u,f=n[0]+l,s=n[1]+c,h=t[0]+l,p=t[1]+c,g=(f+h)/2,v=(s+p)/2,d=h-f,y=p-s,m=d*d+y*y,M=e-r,x=f*p-h*s,b=(0>y?-1:1)*Math.sqrt(Math.max(0,M*M*m-x*x)),_=(x*y-d*b)/m,w=(-x*d-y*b)/m,S=(x*y+d*b)/m,k=(-x*d+y*b)/m,N=_-g,E=w-v,A=S-g,C=k-v;return N*N+E*E>A*A+C*C&&(_=S,w=k),[[_-l,w-c],[_*e/M,w*e/M]]}function Mu(n){function t(t){function o(){c.push("M",u(n(f),a))}for(var l,c=[],f=[],s=-1,h=t.length,p=En(e),g=En(r);++s<h;)i.call(this,l=t[s],s)?f.push([+p.call(this,l,s),+g.call(this,l,s)]):f.length&&(o(),f=[]);return f.length&&o(),c.length?c.join(""):null}var e=Ce,r=ze,i=zt,u=xu,o=u.key,a=.7;return t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t.defined=function(n){return arguments.length?(i=n,t):i},t.interpolate=function(n){return arguments.length?(o="function"==typeof n?u=n:(u=Tl.get(n)||xu).key,t):o},t.tension=function(n){return arguments.length?(a=n,t):a},t}function xu(n){return n.length>1?n.join("L"):n+"Z"}function bu(n){return n.join("L")+"Z"}function _u(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r[0]+(r=n[t])[0])/2,"V",r[1]);return e>1&&i.push("H",r[0]),i.join("")}function wu(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("V",(r=n[t])[1],"H",r[0]);return i.join("")}function Su(n){for(var t=0,e=n.length,r=n[0],i=[r[0],",",r[1]];++t<e;)i.push("H",(r=n[t])[0],"V",r[1]);return i.join("")}function ku(n,t){return n.length<4?xu(n):n[1]+Au(n.slice(1,-1),Cu(n,t))}function Nu(n,t){return n.length<3?bu(n):n[0]+Au((n.push(n[0]),n),Cu([n[n.length-2]].concat(n,[n[1]]),t))}function Eu(n,t){return n.length<3?xu(n):n[0]+Au(n,Cu(n,t))}function Au(n,t){if(t.length<1||n.length!=t.length&&n.length!=t.length+2)return xu(n);var e=n.length!=t.length,r="",i=n[0],u=n[1],o=t[0],a=o,l=1;if(e&&(r+="Q"+(u[0]-2*o[0]/3)+","+(u[1]-2*o[1]/3)+","+u[0]+","+u[1],i=n[1],l=2),t.length>1){a=t[1],u=n[l],l++,r+="C"+(i[0]+o[0])+","+(i[1]+o[1])+","+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1];for(var c=2;c<t.length;c++,l++)u=n[l],a=t[c],r+="S"+(u[0]-a[0])+","+(u[1]-a[1])+","+u[0]+","+u[1]}if(e){var f=n[l];r+="Q"+(u[0]+2*a[0]/3)+","+(u[1]+2*a[1]/3)+","+f[0]+","+f[1]}return r}function Cu(n,t){for(var e,r=[],i=(1-t)/2,u=n[0],o=n[1],a=1,l=n.length;++a<l;)e=u,u=o,o=n[a],r.push([i*(o[0]-e[0]),i*(o[1]-e[1])]);return r}function zu(n){if(n.length<3)return xu(n);var t=1,e=n.length,r=n[0],i=r[0],u=r[1],o=[i,i,i,(r=n[1])[0]],a=[u,u,u,r[1]],l=[i,",",u,"L",Ru(Pl,o),",",Ru(Pl,a)];for(n.push(n[e-1]);++t<=e;)r=n[t],o.shift(),o.push(r[0]),a.shift(),a.push(r[1]),Du(l,o,a);return n.pop(),l.push("L",r),l.join("")}function Lu(n){if(n.length<4)return xu(n);for(var t,e=[],r=-1,i=n.length,u=[0],o=[0];++r<3;)t=n[r],u.push(t[0]),o.push(t[1]);for(e.push(Ru(Pl,u)+","+Ru(Pl,o)),--r;++r<i;)t=n[r],u.shift(),u.push(t[0]),o.shift(),o.push(t[1]),Du(e,u,o);return e.join("")}function qu(n){for(var t,e,r=-1,i=n.length,u=i+4,o=[],a=[];++r<4;)e=n[r%i],o.push(e[0]),a.push(e[1]);for(t=[Ru(Pl,o),",",Ru(Pl,a)],--r;++r<u;)e=n[r%i],o.shift(),o.push(e[0]),a.shift(),a.push(e[1]),Du(t,o,a);return t.join("")}function Tu(n,t){var e=n.length-1;if(e)for(var r,i,u=n[0][0],o=n[0][1],a=n[e][0]-u,l=n[e][1]-o,c=-1;++c<=e;)r=n[c],i=c/e,r[0]=t*r[0]+(1-t)*(u+i*a),r[1]=t*r[1]+(1-t)*(o+i*l);return zu(n)}function Ru(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]+n[3]*t[3]}function Du(n,t,e){n.push("C",Ru(Rl,t),",",Ru(Rl,e),",",Ru(Dl,t),",",Ru(Dl,e),",",Ru(Pl,t),",",Ru(Pl,e))}function Pu(n,t){return(t[1]-n[1])/(t[0]-n[0])}function Uu(n){for(var t=0,e=n.length-1,r=[],i=n[0],u=n[1],o=r[0]=Pu(i,u);++t<e;)r[t]=(o+(o=Pu(i=u,u=n[t+1])))/2;return r[t]=o,r}function ju(n){for(var t,e,r,i,u=[],o=Uu(n),a=-1,l=n.length-1;++a<l;)t=Pu(n[a],n[a+1]),xo(t)<Uo?o[a]=o[a+1]=0:(e=o[a]/t,r=o[a+1]/t,i=e*e+r*r,i>9&&(i=3*t/Math.sqrt(i),o[a]=i*e,o[a+1]=i*r));for(a=-1;++a<=l;)i=(n[Math.min(l,a+1)][0]-n[Math.max(0,a-1)][0])/(6*(1+o[a]*o[a])),u.push([i||0,o[a]*i||0]);return u}function Fu(n){return n.length<3?xu(n):n[0]+Au(n,ju(n))}function Hu(n){for(var t,e,r,i=-1,u=n.length;++i<u;)t=n[i],e=t[0],r=t[1]-Io,t[0]=e*Math.cos(r),t[1]=e*Math.sin(r);return n}function Ou(n){function t(t){function l(){v.push("M",a(n(y),s),f,c(n(d.reverse()),s),"Z")}for(var h,p,g,v=[],d=[],y=[],m=-1,M=t.length,x=En(e),b=En(i),_=e===r?function(){
return p}:En(r),w=i===u?function(){return g}:En(u);++m<M;)o.call(this,h=t[m],m)?(d.push([p=+x.call(this,h,m),g=+b.call(this,h,m)]),y.push([+_.call(this,h,m),+w.call(this,h,m)])):d.length&&(l(),d=[],y=[]);return d.length&&l(),v.length?v.join(""):null}var e=Ce,r=Ce,i=0,u=ze,o=zt,a=xu,l=a.key,c=a,f="L",s=.7;return t.x=function(n){return arguments.length?(e=r=n,t):r},t.x0=function(n){return arguments.length?(e=n,t):e},t.x1=function(n){return arguments.length?(r=n,t):r},t.y=function(n){return arguments.length?(i=u=n,t):u},t.y0=function(n){return arguments.length?(i=n,t):i},t.y1=function(n){return arguments.length?(u=n,t):u},t.defined=function(n){return arguments.length?(o=n,t):o},t.interpolate=function(n){return arguments.length?(l="function"==typeof n?a=n:(a=Tl.get(n)||xu).key,c=a.reverse||a,f=a.closed?"M":"L",t):l},t.tension=function(n){return arguments.length?(s=n,t):s},t}function Iu(n){return n.radius}function Yu(n){return[n.x,n.y]}function Zu(n){return function(){var t=n.apply(this,arguments),e=t[0],r=t[1]-Io;return[e*Math.cos(r),e*Math.sin(r)]}}function Vu(){return 64}function Xu(){return"circle"}function $u(n){var t=Math.sqrt(n/Fo);return"M0,"+t+"A"+t+","+t+" 0 1,1 0,"+-t+"A"+t+","+t+" 0 1,1 0,"+t+"Z"}function Bu(n){return function(){var t,e,r;(t=this[n])&&(r=t[e=t.active])&&(r.timer.c=null,r.timer.t=NaN,--t.count?delete t[e]:delete this[n],t.active+=.5,r.event&&r.event.interrupt.call(this,this.__data__,r.index))}}function Wu(n,t,e){return ko(n,Yl),n.namespace=t,n.id=e,n}function Ju(n,t,e,r){var i=n.id,u=n.namespace;return Y(n,"function"==typeof e?function(n,o,a){n[u][i].tween.set(t,r(e.call(n,n.__data__,o,a)))}:(e=r(e),function(n){n[u][i].tween.set(t,e)}))}function Gu(n){return null==n&&(n=""),function(){this.textContent=n}}function Ku(n){return null==n?"__transition__":"__transition_"+n+"__"}function Qu(n,t,e,r,i){function u(n){var t=v.delay;return f.t=t+l,n>=t?o(n-t):void(f.c=o)}function o(e){var i=g.active,u=g[i];u&&(u.timer.c=null,u.timer.t=NaN,--g.count,delete g[i],u.event&&u.event.interrupt.call(n,n.__data__,u.index));for(var o in g)if(r>+o){var c=g[o];c.timer.c=null,c.timer.t=NaN,--g.count,delete g[o]}f.c=a,qn(function(){return f.c&&a(e||1)&&(f.c=null,f.t=NaN),1},0,l),g.active=r,v.event&&v.event.start.call(n,n.__data__,t),p=[],v.tween.forEach(function(e,r){(r=r.call(n,n.__data__,t))&&p.push(r)}),h=v.ease,s=v.duration}function a(i){for(var u=i/s,o=h(u),a=p.length;a>0;)p[--a].call(n,o);return u>=1?(v.event&&v.event.end.call(n,n.__data__,t),--g.count?delete g[r]:delete n[e],1):void 0}var l,f,s,h,p,g=n[e]||(n[e]={active:0,count:0}),v=g[r];v||(l=i.time,f=qn(u,0,l),v=g[r]={tween:new c,time:l,timer:f,delay:i.delay,duration:i.duration,ease:i.ease,index:t},i=null,++g.count)}function no(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate("+(isFinite(r)?r:e(n))+",0)"})}function to(n,t,e){n.attr("transform",function(n){var r=t(n);return"translate(0,"+(isFinite(r)?r:e(n))+")"})}function eo(n){return n.toISOString()}function ro(n,t,e){function r(t){return n(t)}function i(n,e){var r=n[1]-n[0],i=r/e,u=ao.bisect(Kl,i);return u==Kl.length?[t.year,Ki(n.map(function(n){return n/31536e6}),e)[2]]:u?t[i/Kl[u-1]<Kl[u]/i?u-1:u]:[tc,Ki(n,e)[2]]}return r.invert=function(t){return io(n.invert(t))},r.domain=function(t){return arguments.length?(n.domain(t),r):n.domain().map(io)},r.nice=function(n,t){function e(e){return!isNaN(e)&&!n.range(e,io(+e+1),t).length}var u=r.domain(),o=Yi(u),a=null==n?i(o,10):"number"==typeof n&&i(o,n);return a&&(n=a[0],t=a[1]),r.domain(Xi(u,t>1?{floor:function(t){for(;e(t=n.floor(t));)t=io(t-1);return t},ceil:function(t){for(;e(t=n.ceil(t));)t=io(+t+1);return t}}:n))},r.ticks=function(n,t){var e=Yi(r.domain()),u=null==n?i(e,10):"number"==typeof n?i(e,n):!n.range&&[{range:n},t];return u&&(n=u[0],t=u[1]),n.range(e[0],io(+e[1]+1),1>t?1:t)},r.tickFormat=function(){return e},r.copy=function(){return ro(n.copy(),t,e)},Ji(r,n)}function io(n){return new Date(n)}function uo(n){return JSON.parse(n.responseText)}function oo(n){var t=fo.createRange();return t.selectNode(fo.body),t.createContextualFragment(n.responseText)}var ao={version:"3.5.17"},lo=[].slice,co=function(n){return lo.call(n)},fo=this.document;if(fo)try{co(fo.documentElement.childNodes)[0].nodeType}catch(so){co=function(n){for(var t=n.length,e=new Array(t);t--;)e[t]=n[t];return e}}if(Date.now||(Date.now=function(){return+new Date}),fo)try{fo.createElement("DIV").style.setProperty("opacity",0,"")}catch(ho){var po=this.Element.prototype,go=po.setAttribute,vo=po.setAttributeNS,yo=this.CSSStyleDeclaration.prototype,mo=yo.setProperty;po.setAttribute=function(n,t){go.call(this,n,t+"")},po.setAttributeNS=function(n,t,e){vo.call(this,n,t,e+"")},yo.setProperty=function(n,t,e){mo.call(this,n,t+"",e)}}ao.ascending=e,ao.descending=function(n,t){return n>t?-1:t>n?1:t>=n?0:NaN},ao.min=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&e>r&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&e>r&&(e=r)}return e},ao.max=function(n,t){var e,r,i=-1,u=n.length;if(1===arguments.length){for(;++i<u;)if(null!=(r=n[i])&&r>=r){e=r;break}for(;++i<u;)null!=(r=n[i])&&r>e&&(e=r)}else{for(;++i<u;)if(null!=(r=t.call(n,n[i],i))&&r>=r){e=r;break}for(;++i<u;)null!=(r=t.call(n,n[i],i))&&r>e&&(e=r)}return e},ao.extent=function(n,t){var e,r,i,u=-1,o=n.length;if(1===arguments.length){for(;++u<o;)if(null!=(r=n[u])&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=n[u])&&(e>r&&(e=r),r>i&&(i=r))}else{for(;++u<o;)if(null!=(r=t.call(n,n[u],u))&&r>=r){e=i=r;break}for(;++u<o;)null!=(r=t.call(n,n[u],u))&&(e>r&&(e=r),r>i&&(i=r))}return[e,i]},ao.sum=function(n,t){var e,r=0,u=n.length,o=-1;if(1===arguments.length)for(;++o<u;)i(e=+n[o])&&(r+=e);else for(;++o<u;)i(e=+t.call(n,n[o],o))&&(r+=e);return r},ao.mean=function(n,t){var e,u=0,o=n.length,a=-1,l=o;if(1===arguments.length)for(;++a<o;)i(e=r(n[a]))?u+=e:--l;else for(;++a<o;)i(e=r(t.call(n,n[a],a)))?u+=e:--l;return l?u/l:void 0},ao.quantile=function(n,t){var e=(n.length-1)*t+1,r=Math.floor(e),i=+n[r-1],u=e-r;return u?i+u*(n[r]-i):i},ao.median=function(n,t){var u,o=[],a=n.length,l=-1;if(1===arguments.length)for(;++l<a;)i(u=r(n[l]))&&o.push(u);else for(;++l<a;)i(u=r(t.call(n,n[l],l)))&&o.push(u);return o.length?ao.quantile(o.sort(e),.5):void 0},ao.variance=function(n,t){var e,u,o=n.length,a=0,l=0,c=-1,f=0;if(1===arguments.length)for(;++c<o;)i(e=r(n[c]))&&(u=e-a,a+=u/++f,l+=u*(e-a));else for(;++c<o;)i(e=r(t.call(n,n[c],c)))&&(u=e-a,a+=u/++f,l+=u*(e-a));return f>1?l/(f-1):void 0},ao.deviation=function(){var n=ao.variance.apply(this,arguments);return n?Math.sqrt(n):n};var Mo=u(e);ao.bisectLeft=Mo.left,ao.bisect=ao.bisectRight=Mo.right,ao.bisector=function(n){return u(1===n.length?function(t,r){return e(n(t),r)}:n)},ao.shuffle=function(n,t,e){(u=arguments.length)<3&&(e=n.length,2>u&&(t=0));for(var r,i,u=e-t;u;)i=Math.random()*u--|0,r=n[u+t],n[u+t]=n[i+t],n[i+t]=r;return n},ao.permute=function(n,t){for(var e=t.length,r=new Array(e);e--;)r[e]=n[t[e]];return r},ao.pairs=function(n){for(var t,e=0,r=n.length-1,i=n[0],u=new Array(0>r?0:r);r>e;)u[e]=[t=i,i=n[++e]];return u},ao.transpose=function(n){if(!(i=n.length))return[];for(var t=-1,e=ao.min(n,o),r=new Array(e);++t<e;)for(var i,u=-1,a=r[t]=new Array(i);++u<i;)a[u]=n[u][t];return r},ao.zip=function(){return ao.transpose(arguments)},ao.keys=function(n){var t=[];for(var e in n)t.push(e);return t},ao.values=function(n){var t=[];for(var e in n)t.push(n[e]);return t},ao.entries=function(n){var t=[];for(var e in n)t.push({key:e,value:n[e]});return t},ao.merge=function(n){for(var t,e,r,i=n.length,u=-1,o=0;++u<i;)o+=n[u].length;for(e=new Array(o);--i>=0;)for(r=n[i],t=r.length;--t>=0;)e[--o]=r[t];return e};var xo=Math.abs;ao.range=function(n,t,e){if(arguments.length<3&&(e=1,arguments.length<2&&(t=n,n=0)),(t-n)/e===1/0)throw new Error("infinite range");var r,i=[],u=a(xo(e)),o=-1;if(n*=u,t*=u,e*=u,0>e)for(;(r=n+e*++o)>t;)i.push(r/u);else for(;(r=n+e*++o)<t;)i.push(r/u);return i},ao.map=function(n,t){var e=new c;if(n instanceof c)n.forEach(function(n,t){e.set(n,t)});else if(Array.isArray(n)){var r,i=-1,u=n.length;if(1===arguments.length)for(;++i<u;)e.set(i,n[i]);else for(;++i<u;)e.set(t.call(n,r=n[i],i),r)}else for(var o in n)e.set(o,n[o]);return e};var bo="__proto__",_o="\x00";l(c,{has:h,get:function(n){return this._[f(n)]},set:function(n,t){return this._[f(n)]=t},remove:p,keys:g,values:function(){var n=[];for(var t in this._)n.push(this._[t]);return n},entries:function(){var n=[];for(var t in this._)n.push({key:s(t),value:this._[t]});return n},size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t),this._[t])}}),ao.nest=function(){function n(t,o,a){if(a>=u.length)return r?r.call(i,o):e?o.sort(e):o;for(var l,f,s,h,p=-1,g=o.length,v=u[a++],d=new c;++p<g;)(h=d.get(l=v(f=o[p])))?h.push(f):d.set(l,[f]);return t?(f=t(),s=function(e,r){f.set(e,n(t,r,a))}):(f={},s=function(e,r){f[e]=n(t,r,a)}),d.forEach(s),f}function t(n,e){if(e>=u.length)return n;var r=[],i=o[e++];return n.forEach(function(n,i){r.push({key:n,values:t(i,e)})}),i?r.sort(function(n,t){return i(n.key,t.key)}):r}var e,r,i={},u=[],o=[];return i.map=function(t,e){return n(e,t,0)},i.entries=function(e){return t(n(ao.map,e,0),0)},i.key=function(n){return u.push(n),i},i.sortKeys=function(n){return o[u.length-1]=n,i},i.sortValues=function(n){return e=n,i},i.rollup=function(n){return r=n,i},i},ao.set=function(n){var t=new y;if(n)for(var e=0,r=n.length;r>e;++e)t.add(n[e]);return t},l(y,{has:h,add:function(n){return this._[f(n+="")]=!0,n},remove:p,values:g,size:v,empty:d,forEach:function(n){for(var t in this._)n.call(this,s(t))}}),ao.behavior={},ao.rebind=function(n,t){for(var e,r=1,i=arguments.length;++r<i;)n[e=arguments[r]]=M(n,t,t[e]);return n};var wo=["webkit","ms","moz","Moz","o","O"];ao.dispatch=function(){for(var n=new _,t=-1,e=arguments.length;++t<e;)n[arguments[t]]=w(n);return n},_.prototype.on=function(n,t){var e=n.indexOf("."),r="";if(e>=0&&(r=n.slice(e+1),n=n.slice(0,e)),n)return arguments.length<2?this[n].on(r):this[n].on(r,t);if(2===arguments.length){if(null==t)for(n in this)this.hasOwnProperty(n)&&this[n].on(r,null);return this}},ao.event=null,ao.requote=function(n){return n.replace(So,"\\$&")};var So=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,ko={}.__proto__?function(n,t){n.__proto__=t}:function(n,t){for(var e in t)n[e]=t[e]},No=function(n,t){return t.querySelector(n)},Eo=function(n,t){return t.querySelectorAll(n)},Ao=function(n,t){var e=n.matches||n[x(n,"matchesSelector")];return(Ao=function(n,t){return e.call(n,t)})(n,t)};"function"==typeof Sizzle&&(No=function(n,t){return Sizzle(n,t)[0]||null},Eo=Sizzle,Ao=Sizzle.matchesSelector),ao.selection=function(){return ao.select(fo.documentElement)};var Co=ao.selection.prototype=[];Co.select=function(n){var t,e,r,i,u=[];n=A(n);for(var o=-1,a=this.length;++o<a;){u.push(t=[]),t.parentNode=(r=this[o]).parentNode;for(var l=-1,c=r.length;++l<c;)(i=r[l])?(t.push(e=n.call(i,i.__data__,l,o)),e&&"__data__"in i&&(e.__data__=i.__data__)):t.push(null)}return E(u)},Co.selectAll=function(n){var t,e,r=[];n=C(n);for(var i=-1,u=this.length;++i<u;)for(var o=this[i],a=-1,l=o.length;++a<l;)(e=o[a])&&(r.push(t=co(n.call(e,e.__data__,a,i))),t.parentNode=e);return E(r)};var zo="http://www.w3.org/1999/xhtml",Lo={svg:"http://www.w3.org/2000/svg",xhtml:zo,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};ao.ns={prefix:Lo,qualify:function(n){var t=n.indexOf(":"),e=n;return t>=0&&"xmlns"!==(e=n.slice(0,t))&&(n=n.slice(t+1)),Lo.hasOwnProperty(e)?{space:Lo[e],local:n}:n}},Co.attr=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node();return n=ao.ns.qualify(n),n.local?e.getAttributeNS(n.space,n.local):e.getAttribute(n)}for(t in n)this.each(z(t,n[t]));return this}return this.each(z(n,t))},Co.classed=function(n,t){if(arguments.length<2){if("string"==typeof n){var e=this.node(),r=(n=T(n)).length,i=-1;if(t=e.classList){for(;++i<r;)if(!t.contains(n[i]))return!1}else for(t=e.getAttribute("class");++i<r;)if(!q(n[i]).test(t))return!1;return!0}for(t in n)this.each(R(t,n[t]));return this}return this.each(R(n,t))},Co.style=function(n,e,r){var i=arguments.length;if(3>i){if("string"!=typeof n){2>i&&(e="");for(r in n)this.each(P(r,n[r],e));return this}if(2>i){var u=this.node();return t(u).getComputedStyle(u,null).getPropertyValue(n)}r=""}return this.each(P(n,e,r))},Co.property=function(n,t){if(arguments.length<2){if("string"==typeof n)return this.node()[n];for(t in n)this.each(U(t,n[t]));return this}return this.each(U(n,t))},Co.text=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.textContent=null==t?"":t}:null==n?function(){this.textContent=""}:function(){this.textContent=n}):this.node().textContent},Co.html=function(n){return arguments.length?this.each("function"==typeof n?function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}:null==n?function(){this.innerHTML=""}:function(){this.innerHTML=n}):this.node().innerHTML},Co.append=function(n){return n=j(n),this.select(function(){return this.appendChild(n.apply(this,arguments))})},Co.insert=function(n,t){return n=j(n),t=A(t),this.select(function(){return this.insertBefore(n.apply(this,arguments),t.apply(this,arguments)||null)})},Co.remove=function(){return this.each(F)},Co.data=function(n,t){function e(n,e){var r,i,u,o=n.length,s=e.length,h=Math.min(o,s),p=new Array(s),g=new Array(s),v=new Array(o);if(t){var d,y=new c,m=new Array(o);for(r=-1;++r<o;)(i=n[r])&&(y.has(d=t.call(i,i.__data__,r))?v[r]=i:y.set(d,i),m[r]=d);for(r=-1;++r<s;)(i=y.get(d=t.call(e,u=e[r],r)))?i!==!0&&(p[r]=i,i.__data__=u):g[r]=H(u),y.set(d,!0);for(r=-1;++r<o;)r in m&&y.get(m[r])!==!0&&(v[r]=n[r])}else{for(r=-1;++r<h;)i=n[r],u=e[r],i?(i.__data__=u,p[r]=i):g[r]=H(u);for(;s>r;++r)g[r]=H(e[r]);for(;o>r;++r)v[r]=n[r]}g.update=p,g.parentNode=p.parentNode=v.parentNode=n.parentNode,a.push(g),l.push(p),f.push(v)}var r,i,u=-1,o=this.length;if(!arguments.length){for(n=new Array(o=(r=this[0]).length);++u<o;)(i=r[u])&&(n[u]=i.__data__);return n}var a=Z([]),l=E([]),f=E([]);if("function"==typeof n)for(;++u<o;)e(r=this[u],n.call(r,r.parentNode.__data__,u));else for(;++u<o;)e(r=this[u],n);return l.enter=function(){return a},l.exit=function(){return f},l},Co.datum=function(n){return arguments.length?this.property("__data__",n):this.property("__data__")},Co.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]),t.parentNode=(e=this[u]).parentNode;for(var a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return E(i)},Co.order=function(){for(var n=-1,t=this.length;++n<t;)for(var e,r=this[n],i=r.length-1,u=r[i];--i>=0;)(e=r[i])&&(u&&u!==e.nextSibling&&u.parentNode.insertBefore(e,u),u=e);return this},Co.sort=function(n){n=I.apply(this,arguments);for(var t=-1,e=this.length;++t<e;)this[t].sort(n);return this.order()},Co.each=function(n){return Y(this,function(t,e,r){n.call(t,t.__data__,e,r)})},Co.call=function(n){var t=co(arguments);return n.apply(t[0]=this,t),this},Co.empty=function(){return!this.node()},Co.node=function(){for(var n=0,t=this.length;t>n;n++)for(var e=this[n],r=0,i=e.length;i>r;r++){var u=e[r];if(u)return u}return null},Co.size=function(){var n=0;return Y(this,function(){++n}),n};var qo=[];ao.selection.enter=Z,ao.selection.enter.prototype=qo,qo.append=Co.append,qo.empty=Co.empty,qo.node=Co.node,qo.call=Co.call,qo.size=Co.size,qo.select=function(n){for(var t,e,r,i,u,o=[],a=-1,l=this.length;++a<l;){r=(i=this[a]).update,o.push(t=[]),t.parentNode=i.parentNode;for(var c=-1,f=i.length;++c<f;)(u=i[c])?(t.push(r[c]=e=n.call(i.parentNode,u.__data__,c,a)),e.__data__=u.__data__):t.push(null)}return E(o)},qo.insert=function(n,t){return arguments.length<2&&(t=V(this)),Co.insert.call(this,n,t)},ao.select=function(t){var e;return"string"==typeof t?(e=[No(t,fo)],e.parentNode=fo.documentElement):(e=[t],e.parentNode=n(t)),E([e])},ao.selectAll=function(n){var t;return"string"==typeof n?(t=co(Eo(n,fo)),t.parentNode=fo.documentElement):(t=co(n),t.parentNode=null),E([t])},Co.on=function(n,t,e){var r=arguments.length;if(3>r){if("string"!=typeof n){2>r&&(t=!1);for(e in n)this.each(X(e,n[e],t));return this}if(2>r)return(r=this.node()["__on"+n])&&r._;e=!1}return this.each(X(n,t,e))};var To=ao.map({mouseenter:"mouseover",mouseleave:"mouseout"});fo&&To.forEach(function(n){"on"+n in fo&&To.remove(n)});var Ro,Do=0;ao.mouse=function(n){return J(n,k())};var Po=this.navigator&&/WebKit/.test(this.navigator.userAgent)?-1:0;ao.touch=function(n,t,e){if(arguments.length<3&&(e=t,t=k().changedTouches),t)for(var r,i=0,u=t.length;u>i;++i)if((r=t[i]).identifier===e)return J(n,r)},ao.behavior.drag=function(){function n(){this.on("mousedown.drag",u).on("touchstart.drag",o)}function e(n,t,e,u,o){return function(){function a(){var n,e,r=t(h,v);r&&(n=r[0]-M[0],e=r[1]-M[1],g|=n|e,M=r,p({type:"drag",x:r[0]+c[0],y:r[1]+c[1],dx:n,dy:e}))}function l(){t(h,v)&&(y.on(u+d,null).on(o+d,null),m(g),p({type:"dragend"}))}var c,f=this,s=ao.event.target.correspondingElement||ao.event.target,h=f.parentNode,p=r.of(f,arguments),g=0,v=n(),d=".drag"+(null==v?"":"-"+v),y=ao.select(e(s)).on(u+d,a).on(o+d,l),m=W(s),M=t(h,v);i?(c=i.apply(f,arguments),c=[c.x-M[0],c.y-M[1]]):c=[0,0],p({type:"dragstart"})}}var r=N(n,"drag","dragstart","dragend"),i=null,u=e(b,ao.mouse,t,"mousemove","mouseup"),o=e(G,ao.touch,m,"touchmove","touchend");return n.origin=function(t){return arguments.length?(i=t,n):i},ao.rebind(n,r,"on")},ao.touches=function(n,t){return arguments.length<2&&(t=k().touches),t?co(t).map(function(t){var e=J(n,t);return e.identifier=t.identifier,e}):[]};var Uo=1e-6,jo=Uo*Uo,Fo=Math.PI,Ho=2*Fo,Oo=Ho-Uo,Io=Fo/2,Yo=Fo/180,Zo=180/Fo,Vo=Math.SQRT2,Xo=2,$o=4;ao.interpolateZoom=function(n,t){var e,r,i=n[0],u=n[1],o=n[2],a=t[0],l=t[1],c=t[2],f=a-i,s=l-u,h=f*f+s*s;if(jo>h)r=Math.log(c/o)/Vo,e=function(n){return[i+n*f,u+n*s,o*Math.exp(Vo*n*r)]};else{var p=Math.sqrt(h),g=(c*c-o*o+$o*h)/(2*o*Xo*p),v=(c*c-o*o-$o*h)/(2*c*Xo*p),d=Math.log(Math.sqrt(g*g+1)-g),y=Math.log(Math.sqrt(v*v+1)-v);r=(y-d)/Vo,e=function(n){var t=n*r,e=rn(d),a=o/(Xo*p)*(e*un(Vo*t+d)-en(d));return[i+a*f,u+a*s,o*e/rn(Vo*t+d)]}}return e.duration=1e3*r,e},ao.behavior.zoom=function(){function n(n){n.on(L,s).on(Wo+".zoom",p).on("dblclick.zoom",g).on(R,h)}function e(n){return[(n[0]-k.x)/k.k,(n[1]-k.y)/k.k]}function r(n){return[n[0]*k.k+k.x,n[1]*k.k+k.y]}function i(n){k.k=Math.max(A[0],Math.min(A[1],n))}function u(n,t){t=r(t),k.x+=n[0]-t[0],k.y+=n[1]-t[1]}function o(t,e,r,o){t.__chart__={x:k.x,y:k.y,k:k.k},i(Math.pow(2,o)),u(d=e,r),t=ao.select(t),C>0&&(t=t.transition().duration(C)),t.call(n.event)}function a(){b&&b.domain(x.range().map(function(n){return(n-k.x)/k.k}).map(x.invert)),w&&w.domain(_.range().map(function(n){return(n-k.y)/k.k}).map(_.invert))}function l(n){z++||n({type:"zoomstart"})}function c(n){a(),n({type:"zoom",scale:k.k,translate:[k.x,k.y]})}function f(n){--z||(n({type:"zoomend"}),d=null)}function s(){function n(){a=1,u(ao.mouse(i),h),c(o)}function r(){s.on(q,null).on(T,null),p(a),f(o)}var i=this,o=D.of(i,arguments),a=0,s=ao.select(t(i)).on(q,n).on(T,r),h=e(ao.mouse(i)),p=W(i);Il.call(i),l(o)}function h(){function n(){var n=ao.touches(g);return p=k.k,n.forEach(function(n){n.identifier in d&&(d[n.identifier]=e(n))}),n}function t(){var t=ao.event.target;ao.select(t).on(x,r).on(b,a),_.push(t);for(var e=ao.event.changedTouches,i=0,u=e.length;u>i;++i)d[e[i].identifier]=null;var l=n(),c=Date.now();if(1===l.length){if(500>c-M){var f=l[0];o(g,f,d[f.identifier],Math.floor(Math.log(k.k)/Math.LN2)+1),S()}M=c}else if(l.length>1){var f=l[0],s=l[1],h=f[0]-s[0],p=f[1]-s[1];y=h*h+p*p}}function r(){var n,t,e,r,o=ao.touches(g);Il.call(g);for(var a=0,l=o.length;l>a;++a,r=null)if(e=o[a],r=d[e.identifier]){if(t)break;n=e,t=r}if(r){var f=(f=e[0]-n[0])*f+(f=e[1]-n[1])*f,s=y&&Math.sqrt(f/y);n=[(n[0]+e[0])/2,(n[1]+e[1])/2],t=[(t[0]+r[0])/2,(t[1]+r[1])/2],i(s*p)}M=null,u(n,t),c(v)}function a(){if(ao.event.touches.length){for(var t=ao.event.changedTouches,e=0,r=t.length;r>e;++e)delete d[t[e].identifier];for(var i in d)return void n()}ao.selectAll(_).on(m,null),w.on(L,s).on(R,h),N(),f(v)}var p,g=this,v=D.of(g,arguments),d={},y=0,m=".zoom-"+ao.event.changedTouches[0].identifier,x="touchmove"+m,b="touchend"+m,_=[],w=ao.select(g),N=W(g);t(),l(v),w.on(L,null).on(R,t)}function p(){var n=D.of(this,arguments);m?clearTimeout(m):(Il.call(this),v=e(d=y||ao.mouse(this)),l(n)),m=setTimeout(function(){m=null,f(n)},50),S(),i(Math.pow(2,.002*Bo())*k.k),u(d,v),c(n)}function g(){var n=ao.mouse(this),t=Math.log(k.k)/Math.LN2;o(this,n,e(n),ao.event.shiftKey?Math.ceil(t)-1:Math.floor(t)+1)}var v,d,y,m,M,x,b,_,w,k={x:0,y:0,k:1},E=[960,500],A=Jo,C=250,z=0,L="mousedown.zoom",q="mousemove.zoom",T="mouseup.zoom",R="touchstart.zoom",D=N(n,"zoomstart","zoom","zoomend");return Wo||(Wo="onwheel"in fo?(Bo=function(){return-ao.event.deltaY*(ao.event.deltaMode?120:1)},"wheel"):"onmousewheel"in fo?(Bo=function(){return ao.event.wheelDelta},"mousewheel"):(Bo=function(){return-ao.event.detail},"MozMousePixelScroll")),n.event=function(n){n.each(function(){var n=D.of(this,arguments),t=k;Hl?ao.select(this).transition().each("start.zoom",function(){k=this.__chart__||{x:0,y:0,k:1},l(n)}).tween("zoom:zoom",function(){var e=E[0],r=E[1],i=d?d[0]:e/2,u=d?d[1]:r/2,o=ao.interpolateZoom([(i-k.x)/k.k,(u-k.y)/k.k,e/k.k],[(i-t.x)/t.k,(u-t.y)/t.k,e/t.k]);return function(t){var r=o(t),a=e/r[2];this.__chart__=k={x:i-r[0]*a,y:u-r[1]*a,k:a},c(n)}}).each("interrupt.zoom",function(){f(n)}).each("end.zoom",function(){f(n)}):(this.__chart__=k,l(n),c(n),f(n))})},n.translate=function(t){return arguments.length?(k={x:+t[0],y:+t[1],k:k.k},a(),n):[k.x,k.y]},n.scale=function(t){return arguments.length?(k={x:k.x,y:k.y,k:null},i(+t),a(),n):k.k},n.scaleExtent=function(t){return arguments.length?(A=null==t?Jo:[+t[0],+t[1]],n):A},n.center=function(t){return arguments.length?(y=t&&[+t[0],+t[1]],n):y},n.size=function(t){return arguments.length?(E=t&&[+t[0],+t[1]],n):E},n.duration=function(t){return arguments.length?(C=+t,n):C},n.x=function(t){return arguments.length?(b=t,x=t.copy(),k={x:0,y:0,k:1},n):b},n.y=function(t){return arguments.length?(w=t,_=t.copy(),k={x:0,y:0,k:1},n):w},ao.rebind(n,D,"on")};var Bo,Wo,Jo=[0,1/0];ao.color=an,an.prototype.toString=function(){return this.rgb()+""},ao.hsl=ln;var Go=ln.prototype=new an;Go.brighter=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,this.l/n)},Go.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new ln(this.h,this.s,n*this.l)},Go.rgb=function(){return cn(this.h,this.s,this.l)},ao.hcl=fn;var Ko=fn.prototype=new an;Ko.brighter=function(n){return new fn(this.h,this.c,Math.min(100,this.l+Qo*(arguments.length?n:1)))},Ko.darker=function(n){return new fn(this.h,this.c,Math.max(0,this.l-Qo*(arguments.length?n:1)))},Ko.rgb=function(){return sn(this.h,this.c,this.l).rgb()},ao.lab=hn;var Qo=18,na=.95047,ta=1,ea=1.08883,ra=hn.prototype=new an;ra.brighter=function(n){return new hn(Math.min(100,this.l+Qo*(arguments.length?n:1)),this.a,this.b)},ra.darker=function(n){return new hn(Math.max(0,this.l-Qo*(arguments.length?n:1)),this.a,this.b)},ra.rgb=function(){return pn(this.l,this.a,this.b)},ao.rgb=mn;var ia=mn.prototype=new an;ia.brighter=function(n){n=Math.pow(.7,arguments.length?n:1);var t=this.r,e=this.g,r=this.b,i=30;return t||e||r?(t&&i>t&&(t=i),e&&i>e&&(e=i),r&&i>r&&(r=i),new mn(Math.min(255,t/n),Math.min(255,e/n),Math.min(255,r/n))):new mn(i,i,i)},ia.darker=function(n){return n=Math.pow(.7,arguments.length?n:1),new mn(n*this.r,n*this.g,n*this.b)},ia.hsl=function(){return wn(this.r,this.g,this.b)},ia.toString=function(){return"#"+bn(this.r)+bn(this.g)+bn(this.b)};var ua=ao.map({aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074});ua.forEach(function(n,t){ua.set(n,Mn(t))}),ao.functor=En,ao.xhr=An(m),ao.dsv=function(n,t){function e(n,e,u){arguments.length<3&&(u=e,e=null);var o=Cn(n,t,null==e?r:i(e),u);return o.row=function(n){return arguments.length?o.response(null==(e=n)?r:i(n)):e},o}function r(n){return e.parse(n.responseText)}function i(n){return function(t){return e.parse(t.responseText,n)}}function u(t){return t.map(o).join(n)}function o(n){return a.test(n)?'"'+n.replace(/\"/g,'""')+'"':n}var a=new RegExp('["'+n+"\n]"),l=n.charCodeAt(0);return e.parse=function(n,t){var r;return e.parseRows(n,function(n,e){if(r)return r(n,e-1);var i=new Function("d","return {"+n.map(function(n,t){return JSON.stringify(n)+": d["+t+"]"}).join(",")+"}");r=t?function(n,e){return t(i(n),e)}:i})},e.parseRows=function(n,t){function e(){if(f>=c)return o;if(i)return i=!1,u;var t=f;if(34===n.charCodeAt(t)){for(var e=t;e++<c;)if(34===n.charCodeAt(e)){if(34!==n.charCodeAt(e+1))break;++e}f=e+2;var r=n.charCodeAt(e+1);return 13===r?(i=!0,10===n.charCodeAt(e+2)&&++f):10===r&&(i=!0),n.slice(t+1,e).replace(/""/g,'"')}for(;c>f;){var r=n.charCodeAt(f++),a=1;if(10===r)i=!0;else if(13===r)i=!0,10===n.charCodeAt(f)&&(++f,++a);else if(r!==l)continue;return n.slice(t,f-a)}return n.slice(t)}for(var r,i,u={},o={},a=[],c=n.length,f=0,s=0;(r=e())!==o;){for(var h=[];r!==u&&r!==o;)h.push(r),r=e();t&&null==(h=t(h,s++))||a.push(h)}return a},e.format=function(t){if(Array.isArray(t[0]))return e.formatRows(t);var r=new y,i=[];return t.forEach(function(n){for(var t in n)r.has(t)||i.push(r.add(t))}),[i.map(o).join(n)].concat(t.map(function(t){return i.map(function(n){return o(t[n])}).join(n)})).join("\n")},e.formatRows=function(n){return n.map(u).join("\n")},e},ao.csv=ao.dsv(",","text/csv"),ao.tsv=ao.dsv("	","text/tab-separated-values");var oa,aa,la,ca,fa=this[x(this,"requestAnimationFrame")]||function(n){setTimeout(n,17)};ao.timer=function(){qn.apply(this,arguments)},ao.timer.flush=function(){Rn(),Dn()},ao.round=function(n,t){return t?Math.round(n*(t=Math.pow(10,t)))/t:Math.round(n)};var sa=["y","z","a","f","p","n","\xb5","m","","k","M","G","T","P","E","Z","Y"].map(Un);ao.formatPrefix=function(n,t){var e=0;return(n=+n)&&(0>n&&(n*=-1),t&&(n=ao.round(n,Pn(n,t))),e=1+Math.floor(1e-12+Math.log(n)/Math.LN10),e=Math.max(-24,Math.min(24,3*Math.floor((e-1)/3)))),sa[8+e/3]};var ha=/(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,pa=ao.map({b:function(n){return n.toString(2)},c:function(n){return String.fromCharCode(n)},o:function(n){return n.toString(8)},x:function(n){return n.toString(16)},X:function(n){return n.toString(16).toUpperCase()},g:function(n,t){return n.toPrecision(t)},e:function(n,t){return n.toExponential(t)},f:function(n,t){return n.toFixed(t)},r:function(n,t){return(n=ao.round(n,Pn(n,t))).toFixed(Math.max(0,Math.min(20,Pn(n*(1+1e-15),t))))}}),ga=ao.time={},va=Date;Hn.prototype={getDate:function(){return this._.getUTCDate()},getDay:function(){return this._.getUTCDay()},getFullYear:function(){return this._.getUTCFullYear()},getHours:function(){return this._.getUTCHours()},getMilliseconds:function(){return this._.getUTCMilliseconds()},getMinutes:function(){return this._.getUTCMinutes()},getMonth:function(){return this._.getUTCMonth()},getSeconds:function(){return this._.getUTCSeconds()},getTime:function(){return this._.getTime()},getTimezoneOffset:function(){return 0},valueOf:function(){return this._.valueOf()},setDate:function(){da.setUTCDate.apply(this._,arguments)},setDay:function(){da.setUTCDay.apply(this._,arguments)},setFullYear:function(){da.setUTCFullYear.apply(this._,arguments)},setHours:function(){da.setUTCHours.apply(this._,arguments)},setMilliseconds:function(){da.setUTCMilliseconds.apply(this._,arguments)},setMinutes:function(){da.setUTCMinutes.apply(this._,arguments)},setMonth:function(){da.setUTCMonth.apply(this._,arguments)},setSeconds:function(){da.setUTCSeconds.apply(this._,arguments)},setTime:function(){da.setTime.apply(this._,arguments)}};var da=Date.prototype;ga.year=On(function(n){return n=ga.day(n),n.setMonth(0,1),n},function(n,t){n.setFullYear(n.getFullYear()+t)},function(n){return n.getFullYear()}),ga.years=ga.year.range,ga.years.utc=ga.year.utc.range,ga.day=On(function(n){var t=new va(2e3,0);return t.setFullYear(n.getFullYear(),n.getMonth(),n.getDate()),t},function(n,t){n.setDate(n.getDate()+t)},function(n){return n.getDate()-1}),ga.days=ga.day.range,ga.days.utc=ga.day.utc.range,ga.dayOfYear=function(n){var t=ga.year(n);return Math.floor((n-t-6e4*(n.getTimezoneOffset()-t.getTimezoneOffset()))/864e5)},["sunday","monday","tuesday","wednesday","thursday","friday","saturday"].forEach(function(n,t){t=7-t;var e=ga[n]=On(function(n){return(n=ga.day(n)).setDate(n.getDate()-(n.getDay()+t)%7),n},function(n,t){n.setDate(n.getDate()+7*Math.floor(t))},function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)-(e!==t)});ga[n+"s"]=e.range,ga[n+"s"].utc=e.utc.range,ga[n+"OfYear"]=function(n){var e=ga.year(n).getDay();return Math.floor((ga.dayOfYear(n)+(e+t)%7)/7)}}),ga.week=ga.sunday,ga.weeks=ga.sunday.range,ga.weeks.utc=ga.sunday.utc.range,ga.weekOfYear=ga.sundayOfYear;var ya={"-":"",_:" ",0:"0"},ma=/^\s*\d+/,Ma=/^%/;ao.locale=function(n){return{numberFormat:jn(n),timeFormat:Yn(n)}};var xa=ao.locale({decimal:".",thousands:",",grouping:[3],currency:["$",""],dateTime:"%a %b %e %X %Y",date:"%m/%d/%Y",time:"%H:%M:%S",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});ao.format=xa.numberFormat,ao.geo={},ft.prototype={s:0,t:0,add:function(n){st(n,this.t,ba),st(ba.s,this.s,this),this.s?this.t+=ba.t:this.s=ba.t},reset:function(){this.s=this.t=0},valueOf:function(){return this.s}};var ba=new ft;ao.geo.stream=function(n,t){n&&_a.hasOwnProperty(n.type)?_a[n.type](n,t):ht(n,t)};var _a={Feature:function(n,t){ht(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,r=-1,i=e.length;++r<i;)ht(e[r].geometry,t)}},wa={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)n=e[r],t.point(n[0],n[1],n[2])},LineString:function(n,t){pt(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)pt(e[r],t,0)},Polygon:function(n,t){gt(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,r=-1,i=e.length;++r<i;)gt(e[r],t)},GeometryCollection:function(n,t){for(var e=n.geometries,r=-1,i=e.length;++r<i;)ht(e[r],t)}};ao.geo.area=function(n){return Sa=0,ao.geo.stream(n,Na),Sa};var Sa,ka=new ft,Na={sphere:function(){Sa+=4*Fo},point:b,lineStart:b,lineEnd:b,polygonStart:function(){ka.reset(),Na.lineStart=vt},polygonEnd:function(){var n=2*ka;Sa+=0>n?4*Fo+n:n,Na.lineStart=Na.lineEnd=Na.point=b}};ao.geo.bounds=function(){function n(n,t){M.push(x=[f=n,h=n]),s>t&&(s=t),t>p&&(p=t)}function t(t,e){var r=dt([t*Yo,e*Yo]);if(y){var i=mt(y,r),u=[i[1],-i[0],0],o=mt(u,i);bt(o),o=_t(o);var l=t-g,c=l>0?1:-1,v=o[0]*Zo*c,d=xo(l)>180;if(d^(v>c*g&&c*t>v)){var m=o[1]*Zo;m>p&&(p=m)}else if(v=(v+360)%360-180,d^(v>c*g&&c*t>v)){var m=-o[1]*Zo;s>m&&(s=m)}else s>e&&(s=e),e>p&&(p=e);d?g>t?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t):h>=f?(f>t&&(f=t),t>h&&(h=t)):t>g?a(f,t)>a(f,h)&&(h=t):a(t,h)>a(f,h)&&(f=t)}else n(t,e);y=r,g=t}function e(){b.point=t}function r(){x[0]=f,x[1]=h,b.point=n,y=null}function i(n,e){if(y){var r=n-g;m+=xo(r)>180?r+(r>0?360:-360):r}else v=n,d=e;Na.point(n,e),t(n,e)}function u(){Na.lineStart()}function o(){i(v,d),Na.lineEnd(),xo(m)>Uo&&(f=-(h=180)),x[0]=f,x[1]=h,y=null}function a(n,t){return(t-=n)<0?t+360:t}function l(n,t){return n[0]-t[0]}function c(n,t){return t[0]<=t[1]?t[0]<=n&&n<=t[1]:n<t[0]||t[1]<n}var f,s,h,p,g,v,d,y,m,M,x,b={point:n,lineStart:e,lineEnd:r,polygonStart:function(){b.point=i,b.lineStart=u,b.lineEnd=o,m=0,Na.polygonStart()},polygonEnd:function(){Na.polygonEnd(),b.point=n,b.lineStart=e,b.lineEnd=r,0>ka?(f=-(h=180),s=-(p=90)):m>Uo?p=90:-Uo>m&&(s=-90),x[0]=f,x[1]=h}};return function(n){p=h=-(f=s=1/0),M=[],ao.geo.stream(n,b);var t=M.length;if(t){M.sort(l);for(var e,r=1,i=M[0],u=[i];t>r;++r)e=M[r],c(e[0],i)||c(e[1],i)?(a(i[0],e[1])>a(i[0],i[1])&&(i[1]=e[1]),a(e[0],i[1])>a(i[0],i[1])&&(i[0]=e[0])):u.push(i=e);for(var o,e,g=-(1/0),t=u.length-1,r=0,i=u[t];t>=r;i=e,++r)e=u[r],(o=a(i[1],e[0]))>g&&(g=o,f=e[0],h=i[1])}return M=x=null,f===1/0||s===1/0?[[NaN,NaN],[NaN,NaN]]:[[f,s],[h,p]]}}(),ao.geo.centroid=function(n){Ea=Aa=Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,ja);var t=Da,e=Pa,r=Ua,i=t*t+e*e+r*r;return jo>i&&(t=qa,e=Ta,r=Ra,Uo>Aa&&(t=Ca,e=za,r=La),i=t*t+e*e+r*r,jo>i)?[NaN,NaN]:[Math.atan2(e,t)*Zo,tn(r/Math.sqrt(i))*Zo]};var Ea,Aa,Ca,za,La,qa,Ta,Ra,Da,Pa,Ua,ja={sphere:b,point:St,lineStart:Nt,lineEnd:Et,polygonStart:function(){ja.lineStart=At},polygonEnd:function(){ja.lineStart=Nt}},Fa=Rt(zt,jt,Ht,[-Fo,-Fo/2]),Ha=1e9;ao.geo.clipExtent=function(){var n,t,e,r,i,u,o={stream:function(n){return i&&(i.valid=!1),i=u(n),i.valid=!0,i},extent:function(a){return arguments.length?(u=Zt(n=+a[0][0],t=+a[0][1],e=+a[1][0],r=+a[1][1]),i&&(i.valid=!1,i=null),o):[[n,t],[e,r]]}};return o.extent([[0,0],[960,500]])},(ao.geo.conicEqualArea=function(){return Vt(Xt)}).raw=Xt,ao.geo.albers=function(){return ao.geo.conicEqualArea().rotate([96,0]).center([-.6,38.7]).parallels([29.5,45.5]).scale(1070)},ao.geo.albersUsa=function(){function n(n){var u=n[0],o=n[1];return t=null,e(u,o),t||(r(u,o),t)||i(u,o),t}var t,e,r,i,u=ao.geo.albers(),o=ao.geo.conicEqualArea().rotate([154,0]).center([-2,58.5]).parallels([55,65]),a=ao.geo.conicEqualArea().rotate([157,0]).center([-3,19.9]).parallels([8,18]),l={point:function(n,e){t=[n,e]}};return n.invert=function(n){var t=u.scale(),e=u.translate(),r=(n[0]-e[0])/t,i=(n[1]-e[1])/t;return(i>=.12&&.234>i&&r>=-.425&&-.214>r?o:i>=.166&&.234>i&&r>=-.214&&-.115>r?a:u).invert(n)},n.stream=function(n){var t=u.stream(n),e=o.stream(n),r=a.stream(n);return{point:function(n,i){t.point(n,i),e.point(n,i),r.point(n,i)},sphere:function(){t.sphere(),e.sphere(),r.sphere()},lineStart:function(){t.lineStart(),e.lineStart(),r.lineStart()},lineEnd:function(){t.lineEnd(),e.lineEnd(),r.lineEnd()},polygonStart:function(){t.polygonStart(),e.polygonStart(),r.polygonStart()},polygonEnd:function(){t.polygonEnd(),e.polygonEnd(),r.polygonEnd()}}},n.precision=function(t){return arguments.length?(u.precision(t),o.precision(t),a.precision(t),n):u.precision()},n.scale=function(t){return arguments.length?(u.scale(t),o.scale(.35*t),a.scale(t),n.translate(u.translate())):u.scale()},n.translate=function(t){if(!arguments.length)return u.translate();var c=u.scale(),f=+t[0],s=+t[1];return e=u.translate(t).clipExtent([[f-.455*c,s-.238*c],[f+.455*c,s+.238*c]]).stream(l).point,r=o.translate([f-.307*c,s+.201*c]).clipExtent([[f-.425*c+Uo,s+.12*c+Uo],[f-.214*c-Uo,s+.234*c-Uo]]).stream(l).point,i=a.translate([f-.205*c,s+.212*c]).clipExtent([[f-.214*c+Uo,s+.166*c+Uo],[f-.115*c-Uo,s+.234*c-Uo]]).stream(l).point,n},n.scale(1070)};var Oa,Ia,Ya,Za,Va,Xa,$a={point:b,lineStart:b,lineEnd:b,polygonStart:function(){Ia=0,$a.lineStart=$t},polygonEnd:function(){$a.lineStart=$a.lineEnd=$a.point=b,Oa+=xo(Ia/2)}},Ba={point:Bt,lineStart:b,lineEnd:b,polygonStart:b,polygonEnd:b},Wa={point:Gt,lineStart:Kt,lineEnd:Qt,polygonStart:function(){Wa.lineStart=ne},polygonEnd:function(){Wa.point=Gt,Wa.lineStart=Kt,Wa.lineEnd=Qt}};ao.geo.path=function(){function n(n){return n&&("function"==typeof a&&u.pointRadius(+a.apply(this,arguments)),o&&o.valid||(o=i(u)),ao.geo.stream(n,o)),u.result()}function t(){return o=null,n}var e,r,i,u,o,a=4.5;return n.area=function(n){return Oa=0,ao.geo.stream(n,i($a)),Oa},n.centroid=function(n){return Ca=za=La=qa=Ta=Ra=Da=Pa=Ua=0,ao.geo.stream(n,i(Wa)),Ua?[Da/Ua,Pa/Ua]:Ra?[qa/Ra,Ta/Ra]:La?[Ca/La,za/La]:[NaN,NaN]},n.bounds=function(n){return Va=Xa=-(Ya=Za=1/0),ao.geo.stream(n,i(Ba)),[[Ya,Za],[Va,Xa]]},n.projection=function(n){return arguments.length?(i=(e=n)?n.stream||re(n):m,t()):e},n.context=function(n){return arguments.length?(u=null==(r=n)?new Wt:new te(n),"function"!=typeof a&&u.pointRadius(a),t()):r},n.pointRadius=function(t){return arguments.length?(a="function"==typeof t?t:(u.pointRadius(+t),+t),n):a},n.projection(ao.geo.albersUsa()).context(null)},ao.geo.transform=function(n){return{stream:function(t){var e=new ie(t);for(var r in n)e[r]=n[r];return e}}},ie.prototype={point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}},ao.geo.projection=oe,ao.geo.projectionMutator=ae,(ao.geo.equirectangular=function(){return oe(ce)}).raw=ce.invert=ce,ao.geo.rotation=function(n){function t(t){return t=n(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t}return n=se(n[0]%360*Yo,n[1]*Yo,n.length>2?n[2]*Yo:0),t.invert=function(t){return t=n.invert(t[0]*Yo,t[1]*Yo),t[0]*=Zo,t[1]*=Zo,t},t},fe.invert=ce,ao.geo.circle=function(){function n(){var n="function"==typeof r?r.apply(this,arguments):r,t=se(-n[0]*Yo,-n[1]*Yo,0).invert,i=[];return e(null,null,1,{point:function(n,e){i.push(n=t(n,e)),n[0]*=Zo,n[1]*=Zo}}),{type:"Polygon",coordinates:[i]}}var t,e,r=[0,0],i=6;return n.origin=function(t){return arguments.length?(r=t,n):r},n.angle=function(r){return arguments.length?(e=ve((t=+r)*Yo,i*Yo),n):t},n.precision=function(r){return arguments.length?(e=ve(t*Yo,(i=+r)*Yo),n):i},n.angle(90)},ao.geo.distance=function(n,t){var e,r=(t[0]-n[0])*Yo,i=n[1]*Yo,u=t[1]*Yo,o=Math.sin(r),a=Math.cos(r),l=Math.sin(i),c=Math.cos(i),f=Math.sin(u),s=Math.cos(u);return Math.atan2(Math.sqrt((e=s*o)*e+(e=c*f-l*s*a)*e),l*f+c*s*a)},ao.geo.graticule=function(){function n(){return{type:"MultiLineString",coordinates:t()}}function t(){return ao.range(Math.ceil(u/d)*d,i,d).map(h).concat(ao.range(Math.ceil(c/y)*y,l,y).map(p)).concat(ao.range(Math.ceil(r/g)*g,e,g).filter(function(n){return xo(n%d)>Uo}).map(f)).concat(ao.range(Math.ceil(a/v)*v,o,v).filter(function(n){return xo(n%y)>Uo}).map(s))}var e,r,i,u,o,a,l,c,f,s,h,p,g=10,v=g,d=90,y=360,m=2.5;return n.lines=function(){return t().map(function(n){return{type:"LineString",coordinates:n}})},n.outline=function(){return{type:"Polygon",coordinates:[h(u).concat(p(l).slice(1),h(i).reverse().slice(1),p(c).reverse().slice(1))]}},n.extent=function(t){return arguments.length?n.majorExtent(t).minorExtent(t):n.minorExtent()},n.majorExtent=function(t){return arguments.length?(u=+t[0][0],i=+t[1][0],c=+t[0][1],l=+t[1][1],u>i&&(t=u,u=i,i=t),c>l&&(t=c,c=l,l=t),n.precision(m)):[[u,c],[i,l]]},n.minorExtent=function(t){return arguments.length?(r=+t[0][0],e=+t[1][0],a=+t[0][1],o=+t[1][1],r>e&&(t=r,r=e,e=t),a>o&&(t=a,a=o,o=t),n.precision(m)):[[r,a],[e,o]]},n.step=function(t){return arguments.length?n.majorStep(t).minorStep(t):n.minorStep()},n.majorStep=function(t){return arguments.length?(d=+t[0],y=+t[1],n):[d,y]},n.minorStep=function(t){return arguments.length?(g=+t[0],v=+t[1],n):[g,v]},n.precision=function(t){return arguments.length?(m=+t,f=ye(a,o,90),s=me(r,e,m),h=ye(c,l,90),p=me(u,i,m),n):m},n.majorExtent([[-180,-90+Uo],[180,90-Uo]]).minorExtent([[-180,-80-Uo],[180,80+Uo]])},ao.geo.greatArc=function(){function n(){return{type:"LineString",coordinates:[t||r.apply(this,arguments),e||i.apply(this,arguments)]}}var t,e,r=Me,i=xe;return n.distance=function(){return ao.geo.distance(t||r.apply(this,arguments),e||i.apply(this,arguments))},n.source=function(e){return arguments.length?(r=e,t="function"==typeof e?null:e,n):r},n.target=function(t){return arguments.length?(i=t,e="function"==typeof t?null:t,n):i},n.precision=function(){return arguments.length?n:0},n},ao.geo.interpolate=function(n,t){return be(n[0]*Yo,n[1]*Yo,t[0]*Yo,t[1]*Yo)},ao.geo.length=function(n){return Ja=0,ao.geo.stream(n,Ga),Ja};var Ja,Ga={sphere:b,point:b,lineStart:_e,lineEnd:b,polygonStart:b,polygonEnd:b},Ka=we(function(n){return Math.sqrt(2/(1+n))},function(n){return 2*Math.asin(n/2)});(ao.geo.azimuthalEqualArea=function(){return oe(Ka)}).raw=Ka;var Qa=we(function(n){var t=Math.acos(n);return t&&t/Math.sin(t)},m);(ao.geo.azimuthalEquidistant=function(){return oe(Qa)}).raw=Qa,(ao.geo.conicConformal=function(){return Vt(Se)}).raw=Se,(ao.geo.conicEquidistant=function(){return Vt(ke)}).raw=ke;var nl=we(function(n){return 1/n},Math.atan);(ao.geo.gnomonic=function(){return oe(nl)}).raw=nl,Ne.invert=function(n,t){return[n,2*Math.atan(Math.exp(t))-Io]},(ao.geo.mercator=function(){return Ee(Ne)}).raw=Ne;var tl=we(function(){return 1},Math.asin);(ao.geo.orthographic=function(){return oe(tl)}).raw=tl;var el=we(function(n){return 1/(1+n)},function(n){return 2*Math.atan(n)});(ao.geo.stereographic=function(){return oe(el)}).raw=el,Ae.invert=function(n,t){return[-t,2*Math.atan(Math.exp(n))-Io]},(ao.geo.transverseMercator=function(){var n=Ee(Ae),t=n.center,e=n.rotate;return n.center=function(n){return n?t([-n[1],n[0]]):(n=t(),[n[1],-n[0]])},n.rotate=function(n){return n?e([n[0],n[1],n.length>2?n[2]+90:90]):(n=e(),[n[0],n[1],n[2]-90])},e([0,0,90])}).raw=Ae,ao.geom={},ao.geom.hull=function(n){function t(n){if(n.length<3)return[];var t,i=En(e),u=En(r),o=n.length,a=[],l=[];for(t=0;o>t;t++)a.push([+i.call(this,n[t],t),+u.call(this,n[t],t),t]);for(a.sort(qe),t=0;o>t;t++)l.push([a[t][0],-a[t][1]]);var c=Le(a),f=Le(l),s=f[0]===c[0],h=f[f.length-1]===c[c.length-1],p=[];for(t=c.length-1;t>=0;--t)p.push(n[a[c[t]][2]]);for(t=+s;t<f.length-h;++t)p.push(n[a[f[t]][2]]);return p}var e=Ce,r=ze;return arguments.length?t(n):(t.x=function(n){return arguments.length?(e=n,t):e},t.y=function(n){return arguments.length?(r=n,t):r},t)},ao.geom.polygon=function(n){return ko(n,rl),n};var rl=ao.geom.polygon.prototype=[];rl.area=function(){for(var n,t=-1,e=this.length,r=this[e-1],i=0;++t<e;)n=r,r=this[t],i+=n[1]*r[0]-n[0]*r[1];return.5*i},rl.centroid=function(n){var t,e,r=-1,i=this.length,u=0,o=0,a=this[i-1];for(arguments.length||(n=-1/(6*this.area()));++r<i;)t=a,a=this[r],e=t[0]*a[1]-a[0]*t[1],u+=(t[0]+a[0])*e,o+=(t[1]+a[1])*e;return[u*n,o*n]},rl.clip=function(n){for(var t,e,r,i,u,o,a=De(n),l=-1,c=this.length-De(this),f=this[c-1];++l<c;){for(t=n.slice(),n.length=0,i=this[l],u=t[(r=t.length-a)-1],e=-1;++e<r;)o=t[e],Te(o,f,i)?(Te(u,f,i)||n.push(Re(u,o,f,i)),n.push(o)):Te(u,f,i)&&n.push(Re(u,o,f,i)),u=o;a&&n.push(n[0]),f=i}return n};var il,ul,ol,al,ll,cl=[],fl=[];Ye.prototype.prepare=function(){for(var n,t=this.edges,e=t.length;e--;)n=t[e].edge,n.b&&n.a||t.splice(e,1);return t.sort(Ve),t.length},tr.prototype={start:function(){return this.edge.l===this.site?this.edge.a:this.edge.b},end:function(){return this.edge.l===this.site?this.edge.b:this.edge.a}},er.prototype={insert:function(n,t){var e,r,i;if(n){if(t.P=n,t.N=n.N,n.N&&(n.N.P=t),n.N=t,n.R){for(n=n.R;n.L;)n=n.L;n.L=t}else n.R=t;e=n}else this._?(n=or(this._),t.P=null,t.N=n,n.P=n.L=t,e=n):(t.P=t.N=null,this._=t,e=null);for(t.L=t.R=null,t.U=e,t.C=!0,n=t;e&&e.C;)r=e.U,e===r.L?(i=r.R,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.R&&(ir(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ur(this,r))):(i=r.L,i&&i.C?(e.C=i.C=!1,r.C=!0,n=r):(n===e.L&&(ur(this,e),n=e,e=n.U),e.C=!1,r.C=!0,ir(this,r))),e=n.U;this._.C=!1},remove:function(n){n.N&&(n.N.P=n.P),n.P&&(n.P.N=n.N),n.N=n.P=null;var t,e,r,i=n.U,u=n.L,o=n.R;if(e=u?o?or(o):u:o,i?i.L===n?i.L=e:i.R=e:this._=e,u&&o?(r=e.C,e.C=n.C,e.L=u,u.U=e,e!==o?(i=e.U,e.U=n.U,n=e.R,i.L=n,e.R=o,o.U=e):(e.U=i,i=e,n=e.R)):(r=n.C,n=e),n&&(n.U=i),!r){if(n&&n.C)return void(n.C=!1);do{if(n===this._)break;if(n===i.L){if(t=i.R,t.C&&(t.C=!1,i.C=!0,ir(this,i),t=i.R),t.L&&t.L.C||t.R&&t.R.C){t.R&&t.R.C||(t.L.C=!1,t.C=!0,ur(this,t),t=i.R),t.C=i.C,i.C=t.R.C=!1,ir(this,i),n=this._;break}}else if(t=i.L,t.C&&(t.C=!1,i.C=!0,ur(this,i),t=i.L),t.L&&t.L.C||t.R&&t.R.C){t.L&&t.L.C||(t.R.C=!1,t.C=!0,ir(this,t),t=i.L),t.C=i.C,i.C=t.L.C=!1,ur(this,i),n=this._;break}t.C=!0,n=i,i=i.U}while(!n.C);n&&(n.C=!1)}}},ao.geom.voronoi=function(n){function t(n){var t=new Array(n.length),r=a[0][0],i=a[0][1],u=a[1][0],o=a[1][1];return ar(e(n),a).cells.forEach(function(e,a){var l=e.edges,c=e.site,f=t[a]=l.length?l.map(function(n){var t=n.start();return[t.x,t.y]}):c.x>=r&&c.x<=u&&c.y>=i&&c.y<=o?[[r,o],[u,o],[u,i],[r,i]]:[];f.point=n[a]}),t}function e(n){return n.map(function(n,t){return{x:Math.round(u(n,t)/Uo)*Uo,y:Math.round(o(n,t)/Uo)*Uo,i:t}})}var r=Ce,i=ze,u=r,o=i,a=sl;return n?t(n):(t.links=function(n){return ar(e(n)).edges.filter(function(n){return n.l&&n.r}).map(function(t){return{source:n[t.l.i],target:n[t.r.i]}})},t.triangles=function(n){var t=[];return ar(e(n)).cells.forEach(function(e,r){for(var i,u,o=e.site,a=e.edges.sort(Ve),l=-1,c=a.length,f=a[c-1].edge,s=f.l===o?f.r:f.l;++l<c;)i=f,u=s,f=a[l].edge,s=f.l===o?f.r:f.l,r<u.i&&r<s.i&&cr(o,u,s)<0&&t.push([n[r],n[u.i],n[s.i]])}),t},t.x=function(n){return arguments.length?(u=En(r=n),t):r},t.y=function(n){return arguments.length?(o=En(i=n),t):i},t.clipExtent=function(n){return arguments.length?(a=null==n?sl:n,t):a===sl?null:a},t.size=function(n){return arguments.length?t.clipExtent(n&&[[0,0],n]):a===sl?null:a&&a[1]},t)};var sl=[[-1e6,-1e6],[1e6,1e6]];ao.geom.delaunay=function(n){return ao.geom.voronoi().triangles(n)},ao.geom.quadtree=function(n,t,e,r,i){function u(n){function u(n,t,e,r,i,u,o,a){if(!isNaN(e)&&!isNaN(r))if(n.leaf){var l=n.x,f=n.y;if(null!=l)if(xo(l-e)+xo(f-r)<.01)c(n,t,e,r,i,u,o,a);else{var s=n.point;n.x=n.y=n.point=null,c(n,s,l,f,i,u,o,a),c(n,t,e,r,i,u,o,a)}else n.x=e,n.y=r,n.point=t}else c(n,t,e,r,i,u,o,a)}function c(n,t,e,r,i,o,a,l){var c=.5*(i+a),f=.5*(o+l),s=e>=c,h=r>=f,p=h<<1|s;n.leaf=!1,n=n.nodes[p]||(n.nodes[p]=hr()),s?i=c:a=c,h?o=f:l=f,u(n,t,e,r,i,o,a,l)}var f,s,h,p,g,v,d,y,m,M=En(a),x=En(l);if(null!=t)v=t,d=e,y=r,m=i;else if(y=m=-(v=d=1/0),s=[],h=[],g=n.length,o)for(p=0;g>p;++p)f=n[p],f.x<v&&(v=f.x),f.y<d&&(d=f.y),f.x>y&&(y=f.x),f.y>m&&(m=f.y),s.push(f.x),h.push(f.y);else for(p=0;g>p;++p){var b=+M(f=n[p],p),_=+x(f,p);v>b&&(v=b),d>_&&(d=_),b>y&&(y=b),_>m&&(m=_),s.push(b),h.push(_)}var w=y-v,S=m-d;w>S?m=d+w:y=v+S;var k=hr();if(k.add=function(n){u(k,n,+M(n,++p),+x(n,p),v,d,y,m)},k.visit=function(n){pr(n,k,v,d,y,m)},k.find=function(n){return gr(k,n[0],n[1],v,d,y,m)},p=-1,null==t){for(;++p<g;)u(k,n[p],s[p],h[p],v,d,y,m);--p}else n.forEach(k.add);return s=h=n=f=null,k}var o,a=Ce,l=ze;return(o=arguments.length)?(a=fr,l=sr,3===o&&(i=e,r=t,e=t=0),u(n)):(u.x=function(n){return arguments.length?(a=n,u):a},u.y=function(n){return arguments.length?(l=n,u):l},u.extent=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=+n[0][0],e=+n[0][1],r=+n[1][0],i=+n[1][1]),u):null==t?null:[[t,e],[r,i]]},u.size=function(n){return arguments.length?(null==n?t=e=r=i=null:(t=e=0,r=+n[0],i=+n[1]),u):null==t?null:[r-t,i-e]},u)},ao.interpolateRgb=vr,ao.interpolateObject=dr,ao.interpolateNumber=yr,ao.interpolateString=mr;var hl=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pl=new RegExp(hl.source,"g");ao.interpolate=Mr,ao.interpolators=[function(n,t){var e=typeof t;return("string"===e?ua.has(t.toLowerCase())||/^(#|rgb\(|hsl\()/i.test(t)?vr:mr:t instanceof an?vr:Array.isArray(t)?xr:"object"===e&&isNaN(t)?dr:yr)(n,t)}],ao.interpolateArray=xr;var gl=function(){return m},vl=ao.map({linear:gl,poly:Er,quad:function(){return Sr},cubic:function(){return kr},sin:function(){return Ar},exp:function(){return Cr},circle:function(){return zr},elastic:Lr,back:qr,bounce:function(){return Tr}}),dl=ao.map({"in":m,out:_r,"in-out":wr,"out-in":function(n){return wr(_r(n))}});ao.ease=function(n){var t=n.indexOf("-"),e=t>=0?n.slice(0,t):n,r=t>=0?n.slice(t+1):"in";return e=vl.get(e)||gl,r=dl.get(r)||m,br(r(e.apply(null,lo.call(arguments,1))))},ao.interpolateHcl=Rr,ao.interpolateHsl=Dr,ao.interpolateLab=Pr,ao.interpolateRound=Ur,ao.transform=function(n){var t=fo.createElementNS(ao.ns.prefix.svg,"g");return(ao.transform=function(n){if(null!=n){t.setAttribute("transform",n);var e=t.transform.baseVal.consolidate()}return new jr(e?e.matrix:yl)})(n)},jr.prototype.toString=function(){return"translate("+this.translate+")rotate("+this.rotate+")skewX("+this.skew+")scale("+this.scale+")"};var yl={a:1,b:0,c:0,d:1,e:0,f:0};ao.interpolateTransform=$r,ao.layout={},ao.layout.bundle=function(){return function(n){for(var t=[],e=-1,r=n.length;++e<r;)t.push(Jr(n[e]));return t}},ao.layout.chord=function(){function n(){var n,c,s,h,p,g={},v=[],d=ao.range(u),y=[];for(e=[],r=[],n=0,h=-1;++h<u;){for(c=0,p=-1;++p<u;)c+=i[h][p];v.push(c),y.push(ao.range(u)),n+=c}for(o&&d.sort(function(n,t){return o(v[n],v[t])}),a&&y.forEach(function(n,t){n.sort(function(n,e){return a(i[t][n],i[t][e])})}),n=(Ho-f*u)/n,c=0,h=-1;++h<u;){for(s=c,p=-1;++p<u;){var m=d[h],M=y[m][p],x=i[m][M],b=c,_=c+=x*n;g[m+"-"+M]={index:m,subindex:M,startAngle:b,endAngle:_,value:x}}r[m]={index:m,startAngle:s,endAngle:c,value:v[m]},c+=f}for(h=-1;++h<u;)for(p=h-1;++p<u;){var w=g[h+"-"+p],S=g[p+"-"+h];(w.value||S.value)&&e.push(w.value<S.value?{source:S,target:w}:{source:w,target:S})}l&&t()}function t(){e.sort(function(n,t){return l((n.source.value+n.target.value)/2,(t.source.value+t.target.value)/2)})}var e,r,i,u,o,a,l,c={},f=0;return c.matrix=function(n){return arguments.length?(u=(i=n)&&i.length,e=r=null,c):i},c.padding=function(n){return arguments.length?(f=n,e=r=null,c):f},c.sortGroups=function(n){return arguments.length?(o=n,e=r=null,c):o},c.sortSubgroups=function(n){return arguments.length?(a=n,e=null,c):a},c.sortChords=function(n){return arguments.length?(l=n,e&&t(),c):l},c.chords=function(){return e||n(),e},c.groups=function(){return r||n(),r},c},ao.layout.force=function(){function n(n){return function(t,e,r,i){if(t.point!==n){var u=t.cx-n.x,o=t.cy-n.y,a=i-e,l=u*u+o*o;if(l>a*a/y){if(v>l){var c=t.charge/l;n.px-=u*c,n.py-=o*c}return!0}if(t.point&&l&&v>l){var c=t.pointCharge/l;n.px-=u*c,n.py-=o*c}}return!t.charge}}function t(n){n.px=ao.event.x,n.py=ao.event.y,l.resume()}var e,r,i,u,o,a,l={},c=ao.dispatch("start","tick","end"),f=[1,1],s=.9,h=ml,p=Ml,g=-30,v=xl,d=.1,y=.64,M=[],x=[];return l.tick=function(){if((i*=.99)<.005)return e=null,c.end({type:"end",alpha:i=0}),!0;var t,r,l,h,p,v,y,m,b,_=M.length,w=x.length;for(r=0;w>r;++r)l=x[r],h=l.source,p=l.target,m=p.x-h.x,b=p.y-h.y,(v=m*m+b*b)&&(v=i*o[r]*((v=Math.sqrt(v))-u[r])/v,m*=v,b*=v,p.x-=m*(y=h.weight+p.weight?h.weight/(h.weight+p.weight):.5),p.y-=b*y,h.x+=m*(y=1-y),h.y+=b*y);if((y=i*d)&&(m=f[0]/2,b=f[1]/2,r=-1,y))for(;++r<_;)l=M[r],l.x+=(m-l.x)*y,l.y+=(b-l.y)*y;if(g)for(ri(t=ao.geom.quadtree(M),i,a),r=-1;++r<_;)(l=M[r]).fixed||t.visit(n(l));for(r=-1;++r<_;)l=M[r],l.fixed?(l.x=l.px,l.y=l.py):(l.x-=(l.px-(l.px=l.x))*s,l.y-=(l.py-(l.py=l.y))*s);c.tick({type:"tick",alpha:i})},l.nodes=function(n){return arguments.length?(M=n,l):M},l.links=function(n){return arguments.length?(x=n,l):x},l.size=function(n){return arguments.length?(f=n,l):f},l.linkDistance=function(n){return arguments.length?(h="function"==typeof n?n:+n,l):h},l.distance=l.linkDistance,l.linkStrength=function(n){return arguments.length?(p="function"==typeof n?n:+n,l):p},l.friction=function(n){return arguments.length?(s=+n,l):s},l.charge=function(n){return arguments.length?(g="function"==typeof n?n:+n,l):g},l.chargeDistance=function(n){return arguments.length?(v=n*n,l):Math.sqrt(v)},l.gravity=function(n){return arguments.length?(d=+n,l):d},l.theta=function(n){return arguments.length?(y=n*n,l):Math.sqrt(y)},l.alpha=function(n){return arguments.length?(n=+n,i?n>0?i=n:(e.c=null,e.t=NaN,e=null,c.end({type:"end",alpha:i=0})):n>0&&(c.start({type:"start",alpha:i=n}),e=qn(l.tick)),l):i},l.start=function(){function n(n,r){if(!e){for(e=new Array(i),l=0;i>l;++l)e[l]=[];for(l=0;c>l;++l){var u=x[l];e[u.source.index].push(u.target),e[u.target.index].push(u.source)}}for(var o,a=e[t],l=-1,f=a.length;++l<f;)if(!isNaN(o=a[l][n]))return o;return Math.random()*r}var t,e,r,i=M.length,c=x.length,s=f[0],v=f[1];for(t=0;i>t;++t)(r=M[t]).index=t,r.weight=0;for(t=0;c>t;++t)r=x[t],"number"==typeof r.source&&(r.source=M[r.source]),"number"==typeof r.target&&(r.target=M[r.target]),++r.source.weight,++r.target.weight;for(t=0;i>t;++t)r=M[t],isNaN(r.x)&&(r.x=n("x",s)),isNaN(r.y)&&(r.y=n("y",v)),isNaN(r.px)&&(r.px=r.x),isNaN(r.py)&&(r.py=r.y);if(u=[],"function"==typeof h)for(t=0;c>t;++t)u[t]=+h.call(this,x[t],t);else for(t=0;c>t;++t)u[t]=h;if(o=[],"function"==typeof p)for(t=0;c>t;++t)o[t]=+p.call(this,x[t],t);else for(t=0;c>t;++t)o[t]=p;if(a=[],"function"==typeof g)for(t=0;i>t;++t)a[t]=+g.call(this,M[t],t);else for(t=0;i>t;++t)a[t]=g;return l.resume()},l.resume=function(){return l.alpha(.1)},l.stop=function(){return l.alpha(0)},l.drag=function(){return r||(r=ao.behavior.drag().origin(m).on("dragstart.force",Qr).on("drag.force",t).on("dragend.force",ni)),arguments.length?void this.on("mouseover.force",ti).on("mouseout.force",ei).call(r):r},ao.rebind(l,c,"on")};var ml=20,Ml=1,xl=1/0;ao.layout.hierarchy=function(){function n(i){var u,o=[i],a=[];for(i.depth=0;null!=(u=o.pop());)if(a.push(u),(c=e.call(n,u,u.depth))&&(l=c.length)){for(var l,c,f;--l>=0;)o.push(f=c[l]),f.parent=u,f.depth=u.depth+1;r&&(u.value=0),u.children=c}else r&&(u.value=+r.call(n,u,u.depth)||0),delete u.children;return oi(i,function(n){var e,i;t&&(e=n.children)&&e.sort(t),r&&(i=n.parent)&&(i.value+=n.value)}),a}var t=ci,e=ai,r=li;return n.sort=function(e){return arguments.length?(t=e,n):t},n.children=function(t){return arguments.length?(e=t,n):e},n.value=function(t){return arguments.length?(r=t,n):r},n.revalue=function(t){return r&&(ui(t,function(n){n.children&&(n.value=0)}),oi(t,function(t){var e;t.children||(t.value=+r.call(n,t,t.depth)||0),(e=t.parent)&&(e.value+=t.value)})),t},n},ao.layout.partition=function(){function n(t,e,r,i){var u=t.children;if(t.x=e,t.y=t.depth*i,t.dx=r,t.dy=i,u&&(o=u.length)){var o,a,l,c=-1;for(r=t.value?r/t.value:0;++c<o;)n(a=u[c],e,l=a.value*r,i),e+=l}}function t(n){var e=n.children,r=0;if(e&&(i=e.length))for(var i,u=-1;++u<i;)r=Math.max(r,t(e[u]));return 1+r}function e(e,u){var o=r.call(this,e,u);return n(o[0],0,i[0],i[1]/t(o[0])),o}var r=ao.layout.hierarchy(),i=[1,1];return e.size=function(n){return arguments.length?(i=n,e):i},ii(e,r)},ao.layout.pie=function(){function n(o){var a,l=o.length,c=o.map(function(e,r){return+t.call(n,e,r)}),f=+("function"==typeof r?r.apply(this,arguments):r),s=("function"==typeof i?i.apply(this,arguments):i)-f,h=Math.min(Math.abs(s)/l,+("function"==typeof u?u.apply(this,arguments):u)),p=h*(0>s?-1:1),g=ao.sum(c),v=g?(s-l*p)/g:0,d=ao.range(l),y=[];return null!=e&&d.sort(e===bl?function(n,t){return c[t]-c[n]}:function(n,t){return e(o[n],o[t])}),d.forEach(function(n){y[n]={data:o[n],value:a=c[n],startAngle:f,endAngle:f+=a*v+p,padAngle:h}}),y}var t=Number,e=bl,r=0,i=Ho,u=0;return n.value=function(e){return arguments.length?(t=e,n):t},n.sort=function(t){return arguments.length?(e=t,n):e},n.startAngle=function(t){return arguments.length?(r=t,n):r},n.endAngle=function(t){return arguments.length?(i=t,n):i},n.padAngle=function(t){return arguments.length?(u=t,n):u},n};var bl={};ao.layout.stack=function(){function n(a,l){if(!(h=a.length))return a;var c=a.map(function(e,r){return t.call(n,e,r)}),f=c.map(function(t){return t.map(function(t,e){return[u.call(n,t,e),o.call(n,t,e)]})}),s=e.call(n,f,l);c=ao.permute(c,s),f=ao.permute(f,s);var h,p,g,v,d=r.call(n,f,l),y=c[0].length;for(g=0;y>g;++g)for(i.call(n,c[0][g],v=d[g],f[0][g][1]),p=1;h>p;++p)i.call(n,c[p][g],v+=f[p-1][g][1],f[p][g][1]);return a}var t=m,e=gi,r=vi,i=pi,u=si,o=hi;return n.values=function(e){return arguments.length?(t=e,n):t},n.order=function(t){return arguments.length?(e="function"==typeof t?t:_l.get(t)||gi,n):e},n.offset=function(t){return arguments.length?(r="function"==typeof t?t:wl.get(t)||vi,n):r},n.x=function(t){return arguments.length?(u=t,n):u},n.y=function(t){return arguments.length?(o=t,n):o},n.out=function(t){return arguments.length?(i=t,n):i},n};var _l=ao.map({"inside-out":function(n){var t,e,r=n.length,i=n.map(di),u=n.map(yi),o=ao.range(r).sort(function(n,t){return i[n]-i[t]}),a=0,l=0,c=[],f=[];for(t=0;r>t;++t)e=o[t],l>a?(a+=u[e],c.push(e)):(l+=u[e],f.push(e));return f.reverse().concat(c)},reverse:function(n){return ao.range(n.length).reverse()},"default":gi}),wl=ao.map({silhouette:function(n){var t,e,r,i=n.length,u=n[0].length,o=[],a=0,l=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];r>a&&(a=r),o.push(r)}for(e=0;u>e;++e)l[e]=(a-o[e])/2;return l},wiggle:function(n){var t,e,r,i,u,o,a,l,c,f=n.length,s=n[0],h=s.length,p=[];for(p[0]=l=c=0,e=1;h>e;++e){for(t=0,i=0;f>t;++t)i+=n[t][e][1];for(t=0,u=0,a=s[e][0]-s[e-1][0];f>t;++t){for(r=0,o=(n[t][e][1]-n[t][e-1][1])/(2*a);t>r;++r)o+=(n[r][e][1]-n[r][e-1][1])/a;u+=o*n[t][e][1]}p[e]=l-=i?u/i*a:0,c>l&&(c=l)}for(e=0;h>e;++e)p[e]-=c;return p},expand:function(n){var t,e,r,i=n.length,u=n[0].length,o=1/i,a=[];for(e=0;u>e;++e){for(t=0,r=0;i>t;t++)r+=n[t][e][1];if(r)for(t=0;i>t;t++)n[t][e][1]/=r;else for(t=0;i>t;t++)n[t][e][1]=o}for(e=0;u>e;++e)a[e]=0;return a},zero:vi});ao.layout.histogram=function(){function n(n,u){for(var o,a,l=[],c=n.map(e,this),f=r.call(this,c,u),s=i.call(this,f,c,u),u=-1,h=c.length,p=s.length-1,g=t?1:1/h;++u<p;)o=l[u]=[],o.dx=s[u+1]-(o.x=s[u]),o.y=0;if(p>0)for(u=-1;++u<h;)a=c[u],a>=f[0]&&a<=f[1]&&(o=l[ao.bisect(s,a,1,p)-1],o.y+=g,o.push(n[u]));return l}var t=!0,e=Number,r=bi,i=Mi;return n.value=function(t){return arguments.length?(e=t,n):e},n.range=function(t){return arguments.length?(r=En(t),n):r},n.bins=function(t){return arguments.length?(i="number"==typeof t?function(n){return xi(n,t)}:En(t),n):i},n.frequency=function(e){return arguments.length?(t=!!e,n):t},n},ao.layout.pack=function(){function n(n,u){var o=e.call(this,n,u),a=o[0],l=i[0],c=i[1],f=null==t?Math.sqrt:"function"==typeof t?t:function(){return t};if(a.x=a.y=0,oi(a,function(n){n.r=+f(n.value)}),oi(a,Ni),r){var s=r*(t?1:Math.max(2*a.r/l,2*a.r/c))/2;oi(a,function(n){n.r+=s}),oi(a,Ni),oi(a,function(n){n.r-=s})}return Ci(a,l/2,c/2,t?1:1/Math.max(2*a.r/l,2*a.r/c)),o}var t,e=ao.layout.hierarchy().sort(_i),r=0,i=[1,1];return n.size=function(t){return arguments.length?(i=t,n):i},n.radius=function(e){return arguments.length?(t=null==e||"function"==typeof e?e:+e,n):t},n.padding=function(t){return arguments.length?(r=+t,n):r},ii(n,e)},ao.layout.tree=function(){function n(n,i){var f=o.call(this,n,i),s=f[0],h=t(s);if(oi(h,e),h.parent.m=-h.z,ui(h,r),c)ui(s,u);else{var p=s,g=s,v=s;ui(s,function(n){n.x<p.x&&(p=n),n.x>g.x&&(g=n),n.depth>v.depth&&(v=n)});var d=a(p,g)/2-p.x,y=l[0]/(g.x+a(g,p)/2+d),m=l[1]/(v.depth||1);ui(s,function(n){n.x=(n.x+d)*y,n.y=n.depth*m})}return f}function t(n){for(var t,e={A:null,children:[n]},r=[e];null!=(t=r.pop());)for(var i,u=t.children,o=0,a=u.length;a>o;++o)r.push((u[o]=i={_:u[o],parent:t,children:(i=u[o].children)&&i.slice()||[],A:null,a:null,z:0,m:0,c:0,s:0,t:null,i:o}).a=i);return e.children[0]}function e(n){var t=n.children,e=n.parent.children,r=n.i?e[n.i-1]:null;if(t.length){Di(n);var u=(t[0].z+t[t.length-1].z)/2;r?(n.z=r.z+a(n._,r._),n.m=n.z-u):n.z=u}else r&&(n.z=r.z+a(n._,r._));n.parent.A=i(n,r,n.parent.A||e[0])}function r(n){n._.x=n.z+n.parent.m,n.m+=n.parent.m}function i(n,t,e){if(t){for(var r,i=n,u=n,o=t,l=i.parent.children[0],c=i.m,f=u.m,s=o.m,h=l.m;o=Ti(o),i=qi(i),o&&i;)l=qi(l),u=Ti(u),u.a=n,r=o.z+s-i.z-c+a(o._,i._),r>0&&(Ri(Pi(o,n,e),n,r),c+=r,f+=r),s+=o.m,c+=i.m,h+=l.m,f+=u.m;o&&!Ti(u)&&(u.t=o,u.m+=s-f),i&&!qi(l)&&(l.t=i,l.m+=c-h,e=n)}return e}function u(n){n.x*=l[0],n.y=n.depth*l[1]}var o=ao.layout.hierarchy().sort(null).value(null),a=Li,l=[1,1],c=null;return n.separation=function(t){return arguments.length?(a=t,n):a},n.size=function(t){return arguments.length?(c=null==(l=t)?u:null,n):c?null:l},n.nodeSize=function(t){return arguments.length?(c=null==(l=t)?null:u,n):c?l:null},ii(n,o)},ao.layout.cluster=function(){function n(n,u){var o,a=t.call(this,n,u),l=a[0],c=0;oi(l,function(n){var t=n.children;t&&t.length?(n.x=ji(t),n.y=Ui(t)):(n.x=o?c+=e(n,o):0,n.y=0,o=n)});var f=Fi(l),s=Hi(l),h=f.x-e(f,s)/2,p=s.x+e(s,f)/2;return oi(l,i?function(n){n.x=(n.x-l.x)*r[0],n.y=(l.y-n.y)*r[1]}:function(n){n.x=(n.x-h)/(p-h)*r[0],n.y=(1-(l.y?n.y/l.y:1))*r[1]}),a}var t=ao.layout.hierarchy().sort(null).value(null),e=Li,r=[1,1],i=!1;return n.separation=function(t){return arguments.length?(e=t,n):e},n.size=function(t){return arguments.length?(i=null==(r=t),n):i?null:r},n.nodeSize=function(t){return arguments.length?(i=null!=(r=t),n):i?r:null},ii(n,t)},ao.layout.treemap=function(){function n(n,t){for(var e,r,i=-1,u=n.length;++i<u;)r=(e=n[i]).value*(0>t?0:t),e.area=isNaN(r)||0>=r?0:r}function t(e){var u=e.children;if(u&&u.length){var o,a,l,c=s(e),f=[],h=u.slice(),g=1/0,v="slice"===p?c.dx:"dice"===p?c.dy:"slice-dice"===p?1&e.depth?c.dy:c.dx:Math.min(c.dx,c.dy);for(n(h,c.dx*c.dy/e.value),f.area=0;(l=h.length)>0;)f.push(o=h[l-1]),f.area+=o.area,"squarify"!==p||(a=r(f,v))<=g?(h.pop(),g=a):(f.area-=f.pop().area,i(f,v,c,!1),v=Math.min(c.dx,c.dy),f.length=f.area=0,g=1/0);f.length&&(i(f,v,c,!0),f.length=f.area=0),u.forEach(t)}}function e(t){var r=t.children;if(r&&r.length){var u,o=s(t),a=r.slice(),l=[];for(n(a,o.dx*o.dy/t.value),l.area=0;u=a.pop();)l.push(u),l.area+=u.area,null!=u.z&&(i(l,u.z?o.dx:o.dy,o,!a.length),l.length=l.area=0);r.forEach(e)}}function r(n,t){for(var e,r=n.area,i=0,u=1/0,o=-1,a=n.length;++o<a;)(e=n[o].area)&&(u>e&&(u=e),e>i&&(i=e));return r*=r,t*=t,r?Math.max(t*i*g/r,r/(t*u*g)):1/0}function i(n,t,e,r){var i,u=-1,o=n.length,a=e.x,c=e.y,f=t?l(n.area/t):0;
if(t==e.dx){for((r||f>e.dy)&&(f=e.dy);++u<o;)i=n[u],i.x=a,i.y=c,i.dy=f,a+=i.dx=Math.min(e.x+e.dx-a,f?l(i.area/f):0);i.z=!0,i.dx+=e.x+e.dx-a,e.y+=f,e.dy-=f}else{for((r||f>e.dx)&&(f=e.dx);++u<o;)i=n[u],i.x=a,i.y=c,i.dx=f,c+=i.dy=Math.min(e.y+e.dy-c,f?l(i.area/f):0);i.z=!1,i.dy+=e.y+e.dy-c,e.x+=f,e.dx-=f}}function u(r){var i=o||a(r),u=i[0];return u.x=u.y=0,u.value?(u.dx=c[0],u.dy=c[1]):u.dx=u.dy=0,o&&a.revalue(u),n([u],u.dx*u.dy/u.value),(o?e:t)(u),h&&(o=i),i}var o,a=ao.layout.hierarchy(),l=Math.round,c=[1,1],f=null,s=Oi,h=!1,p="squarify",g=.5*(1+Math.sqrt(5));return u.size=function(n){return arguments.length?(c=n,u):c},u.padding=function(n){function t(t){var e=n.call(u,t,t.depth);return null==e?Oi(t):Ii(t,"number"==typeof e?[e,e,e,e]:e)}function e(t){return Ii(t,n)}if(!arguments.length)return f;var r;return s=null==(f=n)?Oi:"function"==(r=typeof n)?t:"number"===r?(n=[n,n,n,n],e):e,u},u.round=function(n){return arguments.length?(l=n?Math.round:Number,u):l!=Number},u.sticky=function(n){return arguments.length?(h=n,o=null,u):h},u.ratio=function(n){return arguments.length?(g=n,u):g},u.mode=function(n){return arguments.length?(p=n+"",u):p},ii(u,a)},ao.random={normal:function(n,t){var e=arguments.length;return 2>e&&(t=1),1>e&&(n=0),function(){var e,r,i;do e=2*Math.random()-1,r=2*Math.random()-1,i=e*e+r*r;while(!i||i>1);return n+t*e*Math.sqrt(-2*Math.log(i)/i)}},logNormal:function(){var n=ao.random.normal.apply(ao,arguments);return function(){return Math.exp(n())}},bates:function(n){var t=ao.random.irwinHall(n);return function(){return t()/n}},irwinHall:function(n){return function(){for(var t=0,e=0;n>e;e++)t+=Math.random();return t}}},ao.scale={};var Sl={floor:m,ceil:m};ao.scale.linear=function(){return Wi([0,1],[0,1],Mr,!1)};var kl={s:1,g:1,p:1,r:1,e:1};ao.scale.log=function(){return ru(ao.scale.linear().domain([0,1]),10,!0,[1,10])};var Nl=ao.format(".0e"),El={floor:function(n){return-Math.ceil(-n)},ceil:function(n){return-Math.floor(-n)}};ao.scale.pow=function(){return iu(ao.scale.linear(),1,[0,1])},ao.scale.sqrt=function(){return ao.scale.pow().exponent(.5)},ao.scale.ordinal=function(){return ou([],{t:"range",a:[[]]})},ao.scale.category10=function(){return ao.scale.ordinal().range(Al)},ao.scale.category20=function(){return ao.scale.ordinal().range(Cl)},ao.scale.category20b=function(){return ao.scale.ordinal().range(zl)},ao.scale.category20c=function(){return ao.scale.ordinal().range(Ll)};var Al=[2062260,16744206,2924588,14034728,9725885,9197131,14907330,8355711,12369186,1556175].map(xn),Cl=[2062260,11454440,16744206,16759672,2924588,10018698,14034728,16750742,9725885,12955861,9197131,12885140,14907330,16234194,8355711,13092807,12369186,14408589,1556175,10410725].map(xn),zl=[3750777,5395619,7040719,10264286,6519097,9216594,11915115,13556636,9202993,12426809,15186514,15190932,8666169,11356490,14049643,15177372,8077683,10834324,13528509,14589654].map(xn),Ll=[3244733,7057110,10406625,13032431,15095053,16616764,16625259,16634018,3253076,7652470,10607003,13101504,7695281,10394312,12369372,14342891,6513507,9868950,12434877,14277081].map(xn);ao.scale.quantile=function(){return au([],[])},ao.scale.quantize=function(){return lu(0,1,[0,1])},ao.scale.threshold=function(){return cu([.5],[0,1])},ao.scale.identity=function(){return fu([0,1])},ao.svg={},ao.svg.arc=function(){function n(){var n=Math.max(0,+e.apply(this,arguments)),c=Math.max(0,+r.apply(this,arguments)),f=o.apply(this,arguments)-Io,s=a.apply(this,arguments)-Io,h=Math.abs(s-f),p=f>s?0:1;if(n>c&&(g=c,c=n,n=g),h>=Oo)return t(c,p)+(n?t(n,1-p):"")+"Z";var g,v,d,y,m,M,x,b,_,w,S,k,N=0,E=0,A=[];if((y=(+l.apply(this,arguments)||0)/2)&&(d=u===ql?Math.sqrt(n*n+c*c):+u.apply(this,arguments),p||(E*=-1),c&&(E=tn(d/c*Math.sin(y))),n&&(N=tn(d/n*Math.sin(y)))),c){m=c*Math.cos(f+E),M=c*Math.sin(f+E),x=c*Math.cos(s-E),b=c*Math.sin(s-E);var C=Math.abs(s-f-2*E)<=Fo?0:1;if(E&&yu(m,M,x,b)===p^C){var z=(f+s)/2;m=c*Math.cos(z),M=c*Math.sin(z),x=b=null}}else m=M=0;if(n){_=n*Math.cos(s-N),w=n*Math.sin(s-N),S=n*Math.cos(f+N),k=n*Math.sin(f+N);var L=Math.abs(f-s+2*N)<=Fo?0:1;if(N&&yu(_,w,S,k)===1-p^L){var q=(f+s)/2;_=n*Math.cos(q),w=n*Math.sin(q),S=k=null}}else _=w=0;if(h>Uo&&(g=Math.min(Math.abs(c-n)/2,+i.apply(this,arguments)))>.001){v=c>n^p?0:1;var T=g,R=g;if(Fo>h){var D=null==S?[_,w]:null==x?[m,M]:Re([m,M],[S,k],[x,b],[_,w]),P=m-D[0],U=M-D[1],j=x-D[0],F=b-D[1],H=1/Math.sin(Math.acos((P*j+U*F)/(Math.sqrt(P*P+U*U)*Math.sqrt(j*j+F*F)))/2),O=Math.sqrt(D[0]*D[0]+D[1]*D[1]);R=Math.min(g,(n-O)/(H-1)),T=Math.min(g,(c-O)/(H+1))}if(null!=x){var I=mu(null==S?[_,w]:[S,k],[m,M],c,T,p),Y=mu([x,b],[_,w],c,T,p);g===T?A.push("M",I[0],"A",T,",",T," 0 0,",v," ",I[1],"A",c,",",c," 0 ",1-p^yu(I[1][0],I[1][1],Y[1][0],Y[1][1]),",",p," ",Y[1],"A",T,",",T," 0 0,",v," ",Y[0]):A.push("M",I[0],"A",T,",",T," 0 1,",v," ",Y[0])}else A.push("M",m,",",M);if(null!=S){var Z=mu([m,M],[S,k],n,-R,p),V=mu([_,w],null==x?[m,M]:[x,b],n,-R,p);g===R?A.push("L",V[0],"A",R,",",R," 0 0,",v," ",V[1],"A",n,",",n," 0 ",p^yu(V[1][0],V[1][1],Z[1][0],Z[1][1]),",",1-p," ",Z[1],"A",R,",",R," 0 0,",v," ",Z[0]):A.push("L",V[0],"A",R,",",R," 0 0,",v," ",Z[0])}else A.push("L",_,",",w)}else A.push("M",m,",",M),null!=x&&A.push("A",c,",",c," 0 ",C,",",p," ",x,",",b),A.push("L",_,",",w),null!=S&&A.push("A",n,",",n," 0 ",L,",",1-p," ",S,",",k);return A.push("Z"),A.join("")}function t(n,t){return"M0,"+n+"A"+n+","+n+" 0 1,"+t+" 0,"+-n+"A"+n+","+n+" 0 1,"+t+" 0,"+n}var e=hu,r=pu,i=su,u=ql,o=gu,a=vu,l=du;return n.innerRadius=function(t){return arguments.length?(e=En(t),n):e},n.outerRadius=function(t){return arguments.length?(r=En(t),n):r},n.cornerRadius=function(t){return arguments.length?(i=En(t),n):i},n.padRadius=function(t){return arguments.length?(u=t==ql?ql:En(t),n):u},n.startAngle=function(t){return arguments.length?(o=En(t),n):o},n.endAngle=function(t){return arguments.length?(a=En(t),n):a},n.padAngle=function(t){return arguments.length?(l=En(t),n):l},n.centroid=function(){var n=(+e.apply(this,arguments)+ +r.apply(this,arguments))/2,t=(+o.apply(this,arguments)+ +a.apply(this,arguments))/2-Io;return[Math.cos(t)*n,Math.sin(t)*n]},n};var ql="auto";ao.svg.line=function(){return Mu(m)};var Tl=ao.map({linear:xu,"linear-closed":bu,step:_u,"step-before":wu,"step-after":Su,basis:zu,"basis-open":Lu,"basis-closed":qu,bundle:Tu,cardinal:Eu,"cardinal-open":ku,"cardinal-closed":Nu,monotone:Fu});Tl.forEach(function(n,t){t.key=n,t.closed=/-closed$/.test(n)});var Rl=[0,2/3,1/3,0],Dl=[0,1/3,2/3,0],Pl=[0,1/6,2/3,1/6];ao.svg.line.radial=function(){var n=Mu(Hu);return n.radius=n.x,delete n.x,n.angle=n.y,delete n.y,n},wu.reverse=Su,Su.reverse=wu,ao.svg.area=function(){return Ou(m)},ao.svg.area.radial=function(){var n=Ou(Hu);return n.radius=n.x,delete n.x,n.innerRadius=n.x0,delete n.x0,n.outerRadius=n.x1,delete n.x1,n.angle=n.y,delete n.y,n.startAngle=n.y0,delete n.y0,n.endAngle=n.y1,delete n.y1,n},ao.svg.chord=function(){function n(n,a){var l=t(this,u,n,a),c=t(this,o,n,a);return"M"+l.p0+r(l.r,l.p1,l.a1-l.a0)+(e(l,c)?i(l.r,l.p1,l.r,l.p0):i(l.r,l.p1,c.r,c.p0)+r(c.r,c.p1,c.a1-c.a0)+i(c.r,c.p1,l.r,l.p0))+"Z"}function t(n,t,e,r){var i=t.call(n,e,r),u=a.call(n,i,r),o=l.call(n,i,r)-Io,f=c.call(n,i,r)-Io;return{r:u,a0:o,a1:f,p0:[u*Math.cos(o),u*Math.sin(o)],p1:[u*Math.cos(f),u*Math.sin(f)]}}function e(n,t){return n.a0==t.a0&&n.a1==t.a1}function r(n,t,e){return"A"+n+","+n+" 0 "+ +(e>Fo)+",1 "+t}function i(n,t,e,r){return"Q 0,0 "+r}var u=Me,o=xe,a=Iu,l=gu,c=vu;return n.radius=function(t){return arguments.length?(a=En(t),n):a},n.source=function(t){return arguments.length?(u=En(t),n):u},n.target=function(t){return arguments.length?(o=En(t),n):o},n.startAngle=function(t){return arguments.length?(l=En(t),n):l},n.endAngle=function(t){return arguments.length?(c=En(t),n):c},n},ao.svg.diagonal=function(){function n(n,i){var u=t.call(this,n,i),o=e.call(this,n,i),a=(u.y+o.y)/2,l=[u,{x:u.x,y:a},{x:o.x,y:a},o];return l=l.map(r),"M"+l[0]+"C"+l[1]+" "+l[2]+" "+l[3]}var t=Me,e=xe,r=Yu;return n.source=function(e){return arguments.length?(t=En(e),n):t},n.target=function(t){return arguments.length?(e=En(t),n):e},n.projection=function(t){return arguments.length?(r=t,n):r},n},ao.svg.diagonal.radial=function(){var n=ao.svg.diagonal(),t=Yu,e=n.projection;return n.projection=function(n){return arguments.length?e(Zu(t=n)):t},n},ao.svg.symbol=function(){function n(n,r){return(Ul.get(t.call(this,n,r))||$u)(e.call(this,n,r))}var t=Xu,e=Vu;return n.type=function(e){return arguments.length?(t=En(e),n):t},n.size=function(t){return arguments.length?(e=En(t),n):e},n};var Ul=ao.map({circle:$u,cross:function(n){var t=Math.sqrt(n/5)/2;return"M"+-3*t+","+-t+"H"+-t+"V"+-3*t+"H"+t+"V"+-t+"H"+3*t+"V"+t+"H"+t+"V"+3*t+"H"+-t+"V"+t+"H"+-3*t+"Z"},diamond:function(n){var t=Math.sqrt(n/(2*Fl)),e=t*Fl;return"M0,"+-t+"L"+e+",0 0,"+t+" "+-e+",0Z"},square:function(n){var t=Math.sqrt(n)/2;return"M"+-t+","+-t+"L"+t+","+-t+" "+t+","+t+" "+-t+","+t+"Z"},"triangle-down":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+e+"L"+t+","+-e+" "+-t+","+-e+"Z"},"triangle-up":function(n){var t=Math.sqrt(n/jl),e=t*jl/2;return"M0,"+-e+"L"+t+","+e+" "+-t+","+e+"Z"}});ao.svg.symbolTypes=Ul.keys();var jl=Math.sqrt(3),Fl=Math.tan(30*Yo);Co.transition=function(n){for(var t,e,r=Hl||++Zl,i=Ku(n),u=[],o=Ol||{time:Date.now(),ease:Nr,delay:0,duration:250},a=-1,l=this.length;++a<l;){u.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(e=c[f])&&Qu(e,f,i,r,o),t.push(e)}return Wu(u,i,r)},Co.interrupt=function(n){return this.each(null==n?Il:Bu(Ku(n)))};var Hl,Ol,Il=Bu(Ku()),Yl=[],Zl=0;Yl.call=Co.call,Yl.empty=Co.empty,Yl.node=Co.node,Yl.size=Co.size,ao.transition=function(n,t){return n&&n.transition?Hl?n.transition(t):n:ao.selection().transition(n)},ao.transition.prototype=Yl,Yl.select=function(n){var t,e,r,i=this.id,u=this.namespace,o=[];n=A(n);for(var a=-1,l=this.length;++a<l;){o.push(t=[]);for(var c=this[a],f=-1,s=c.length;++f<s;)(r=c[f])&&(e=n.call(r,r.__data__,f,a))?("__data__"in r&&(e.__data__=r.__data__),Qu(e,f,u,i,r[u][i]),t.push(e)):t.push(null)}return Wu(o,u,i)},Yl.selectAll=function(n){var t,e,r,i,u,o=this.id,a=this.namespace,l=[];n=C(n);for(var c=-1,f=this.length;++c<f;)for(var s=this[c],h=-1,p=s.length;++h<p;)if(r=s[h]){u=r[a][o],e=n.call(r,r.__data__,h,c),l.push(t=[]);for(var g=-1,v=e.length;++g<v;)(i=e[g])&&Qu(i,g,a,o,u),t.push(i)}return Wu(l,a,o)},Yl.filter=function(n){var t,e,r,i=[];"function"!=typeof n&&(n=O(n));for(var u=0,o=this.length;o>u;u++){i.push(t=[]);for(var e=this[u],a=0,l=e.length;l>a;a++)(r=e[a])&&n.call(r,r.__data__,a,u)&&t.push(r)}return Wu(i,this.namespace,this.id)},Yl.tween=function(n,t){var e=this.id,r=this.namespace;return arguments.length<2?this.node()[r][e].tween.get(n):Y(this,null==t?function(t){t[r][e].tween.remove(n)}:function(i){i[r][e].tween.set(n,t)})},Yl.attr=function(n,t){function e(){this.removeAttribute(a)}function r(){this.removeAttributeNS(a.space,a.local)}function i(n){return null==n?e:(n+="",function(){var t,e=this.getAttribute(a);return e!==n&&(t=o(e,n),function(n){this.setAttribute(a,t(n))})})}function u(n){return null==n?r:(n+="",function(){var t,e=this.getAttributeNS(a.space,a.local);return e!==n&&(t=o(e,n),function(n){this.setAttributeNS(a.space,a.local,t(n))})})}if(arguments.length<2){for(t in n)this.attr(t,n[t]);return this}var o="transform"==n?$r:Mr,a=ao.ns.qualify(n);return Ju(this,"attr."+n,t,a.local?u:i)},Yl.attrTween=function(n,t){function e(n,e){var r=t.call(this,n,e,this.getAttribute(i));return r&&function(n){this.setAttribute(i,r(n))}}function r(n,e){var r=t.call(this,n,e,this.getAttributeNS(i.space,i.local));return r&&function(n){this.setAttributeNS(i.space,i.local,r(n))}}var i=ao.ns.qualify(n);return this.tween("attr."+n,i.local?r:e)},Yl.style=function(n,e,r){function i(){this.style.removeProperty(n)}function u(e){return null==e?i:(e+="",function(){var i,u=t(this).getComputedStyle(this,null).getPropertyValue(n);return u!==e&&(i=Mr(u,e),function(t){this.style.setProperty(n,i(t),r)})})}var o=arguments.length;if(3>o){if("string"!=typeof n){2>o&&(e="");for(r in n)this.style(r,n[r],e);return this}r=""}return Ju(this,"style."+n,e,u)},Yl.styleTween=function(n,e,r){function i(i,u){var o=e.call(this,i,u,t(this).getComputedStyle(this,null).getPropertyValue(n));return o&&function(t){this.style.setProperty(n,o(t),r)}}return arguments.length<3&&(r=""),this.tween("style."+n,i)},Yl.text=function(n){return Ju(this,"text",n,Gu)},Yl.remove=function(){var n=this.namespace;return this.each("end.transition",function(){var t;this[n].count<2&&(t=this.parentNode)&&t.removeChild(this)})},Yl.ease=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].ease:("function"!=typeof n&&(n=ao.ease.apply(ao,arguments)),Y(this,function(r){r[e][t].ease=n}))},Yl.delay=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].delay:Y(this,"function"==typeof n?function(r,i,u){r[e][t].delay=+n.call(r,r.__data__,i,u)}:(n=+n,function(r){r[e][t].delay=n}))},Yl.duration=function(n){var t=this.id,e=this.namespace;return arguments.length<1?this.node()[e][t].duration:Y(this,"function"==typeof n?function(r,i,u){r[e][t].duration=Math.max(1,n.call(r,r.__data__,i,u))}:(n=Math.max(1,n),function(r){r[e][t].duration=n}))},Yl.each=function(n,t){var e=this.id,r=this.namespace;if(arguments.length<2){var i=Ol,u=Hl;try{Hl=e,Y(this,function(t,i,u){Ol=t[r][e],n.call(t,t.__data__,i,u)})}finally{Ol=i,Hl=u}}else Y(this,function(i){var u=i[r][e];(u.event||(u.event=ao.dispatch("start","end","interrupt"))).on(n,t)});return this},Yl.transition=function(){for(var n,t,e,r,i=this.id,u=++Zl,o=this.namespace,a=[],l=0,c=this.length;c>l;l++){a.push(n=[]);for(var t=this[l],f=0,s=t.length;s>f;f++)(e=t[f])&&(r=e[o][i],Qu(e,f,o,u,{time:r.time,ease:r.ease,delay:r.delay+r.duration,duration:r.duration})),n.push(e)}return Wu(a,o,u)},ao.svg.axis=function(){function n(n){n.each(function(){var n,c=ao.select(this),f=this.__chart__||e,s=this.__chart__=e.copy(),h=null==l?s.ticks?s.ticks.apply(s,a):s.domain():l,p=null==t?s.tickFormat?s.tickFormat.apply(s,a):m:t,g=c.selectAll(".tick").data(h,s),v=g.enter().insert("g",".domain").attr("class","tick").style("opacity",Uo),d=ao.transition(g.exit()).style("opacity",Uo).remove(),y=ao.transition(g.order()).style("opacity",1),M=Math.max(i,0)+o,x=Zi(s),b=c.selectAll(".domain").data([0]),_=(b.enter().append("path").attr("class","domain"),ao.transition(b));v.append("line"),v.append("text");var w,S,k,N,E=v.select("line"),A=y.select("line"),C=g.select("text").text(p),z=v.select("text"),L=y.select("text"),q="top"===r||"left"===r?-1:1;if("bottom"===r||"top"===r?(n=no,w="x",k="y",S="x2",N="y2",C.attr("dy",0>q?"0em":".71em").style("text-anchor","middle"),_.attr("d","M"+x[0]+","+q*u+"V0H"+x[1]+"V"+q*u)):(n=to,w="y",k="x",S="y2",N="x2",C.attr("dy",".32em").style("text-anchor",0>q?"end":"start"),_.attr("d","M"+q*u+","+x[0]+"H0V"+x[1]+"H"+q*u)),E.attr(N,q*i),z.attr(k,q*M),A.attr(S,0).attr(N,q*i),L.attr(w,0).attr(k,q*M),s.rangeBand){var T=s,R=T.rangeBand()/2;f=s=function(n){return T(n)+R}}else f.rangeBand?f=s:d.call(n,s,f);v.call(n,f,s),y.call(n,s,s)})}var t,e=ao.scale.linear(),r=Vl,i=6,u=6,o=3,a=[10],l=null;return n.scale=function(t){return arguments.length?(e=t,n):e},n.orient=function(t){return arguments.length?(r=t in Xl?t+"":Vl,n):r},n.ticks=function(){return arguments.length?(a=co(arguments),n):a},n.tickValues=function(t){return arguments.length?(l=t,n):l},n.tickFormat=function(e){return arguments.length?(t=e,n):t},n.tickSize=function(t){var e=arguments.length;return e?(i=+t,u=+arguments[e-1],n):i},n.innerTickSize=function(t){return arguments.length?(i=+t,n):i},n.outerTickSize=function(t){return arguments.length?(u=+t,n):u},n.tickPadding=function(t){return arguments.length?(o=+t,n):o},n.tickSubdivide=function(){return arguments.length&&n},n};var Vl="bottom",Xl={top:1,right:1,bottom:1,left:1};ao.svg.brush=function(){function n(t){t.each(function(){var t=ao.select(this).style("pointer-events","all").style("-webkit-tap-highlight-color","rgba(0,0,0,0)").on("mousedown.brush",u).on("touchstart.brush",u),o=t.selectAll(".background").data([0]);o.enter().append("rect").attr("class","background").style("visibility","hidden").style("cursor","crosshair"),t.selectAll(".extent").data([0]).enter().append("rect").attr("class","extent").style("cursor","move");var a=t.selectAll(".resize").data(v,m);a.exit().remove(),a.enter().append("g").attr("class",function(n){return"resize "+n}).style("cursor",function(n){return $l[n]}).append("rect").attr("x",function(n){return/[ew]$/.test(n)?-3:null}).attr("y",function(n){return/^[ns]/.test(n)?-3:null}).attr("width",6).attr("height",6).style("visibility","hidden"),a.style("display",n.empty()?"none":null);var l,s=ao.transition(t),h=ao.transition(o);c&&(l=Zi(c),h.attr("x",l[0]).attr("width",l[1]-l[0]),r(s)),f&&(l=Zi(f),h.attr("y",l[0]).attr("height",l[1]-l[0]),i(s)),e(s)})}function e(n){n.selectAll(".resize").attr("transform",function(n){return"translate("+s[+/e$/.test(n)]+","+h[+/^s/.test(n)]+")"})}function r(n){n.select(".extent").attr("x",s[0]),n.selectAll(".extent,.n>rect,.s>rect").attr("width",s[1]-s[0])}function i(n){n.select(".extent").attr("y",h[0]),n.selectAll(".extent,.e>rect,.w>rect").attr("height",h[1]-h[0])}function u(){function u(){32==ao.event.keyCode&&(C||(M=null,L[0]-=s[1],L[1]-=h[1],C=2),S())}function v(){32==ao.event.keyCode&&2==C&&(L[0]+=s[1],L[1]+=h[1],C=0,S())}function d(){var n=ao.mouse(b),t=!1;x&&(n[0]+=x[0],n[1]+=x[1]),C||(ao.event.altKey?(M||(M=[(s[0]+s[1])/2,(h[0]+h[1])/2]),L[0]=s[+(n[0]<M[0])],L[1]=h[+(n[1]<M[1])]):M=null),E&&y(n,c,0)&&(r(k),t=!0),A&&y(n,f,1)&&(i(k),t=!0),t&&(e(k),w({type:"brush",mode:C?"move":"resize"}))}function y(n,t,e){var r,i,u=Zi(t),l=u[0],c=u[1],f=L[e],v=e?h:s,d=v[1]-v[0];return C&&(l-=f,c-=d+f),r=(e?g:p)?Math.max(l,Math.min(c,n[e])):n[e],C?i=(r+=f)+d:(M&&(f=Math.max(l,Math.min(c,2*M[e]-r))),r>f?(i=r,r=f):i=f),v[0]!=r||v[1]!=i?(e?a=null:o=null,v[0]=r,v[1]=i,!0):void 0}function m(){d(),k.style("pointer-events","all").selectAll(".resize").style("display",n.empty()?"none":null),ao.select("body").style("cursor",null),q.on("mousemove.brush",null).on("mouseup.brush",null).on("touchmove.brush",null).on("touchend.brush",null).on("keydown.brush",null).on("keyup.brush",null),z(),w({type:"brushend"})}var M,x,b=this,_=ao.select(ao.event.target),w=l.of(b,arguments),k=ao.select(b),N=_.datum(),E=!/^(n|s)$/.test(N)&&c,A=!/^(e|w)$/.test(N)&&f,C=_.classed("extent"),z=W(b),L=ao.mouse(b),q=ao.select(t(b)).on("keydown.brush",u).on("keyup.brush",v);if(ao.event.changedTouches?q.on("touchmove.brush",d).on("touchend.brush",m):q.on("mousemove.brush",d).on("mouseup.brush",m),k.interrupt().selectAll("*").interrupt(),C)L[0]=s[0]-L[0],L[1]=h[0]-L[1];else if(N){var T=+/w$/.test(N),R=+/^n/.test(N);x=[s[1-T]-L[0],h[1-R]-L[1]],L[0]=s[T],L[1]=h[R]}else ao.event.altKey&&(M=L.slice());k.style("pointer-events","none").selectAll(".resize").style("display",null),ao.select("body").style("cursor",_.style("cursor")),w({type:"brushstart"}),d()}var o,a,l=N(n,"brushstart","brush","brushend"),c=null,f=null,s=[0,0],h=[0,0],p=!0,g=!0,v=Bl[0];return n.event=function(n){n.each(function(){var n=l.of(this,arguments),t={x:s,y:h,i:o,j:a},e=this.__chart__||t;this.__chart__=t,Hl?ao.select(this).transition().each("start.brush",function(){o=e.i,a=e.j,s=e.x,h=e.y,n({type:"brushstart"})}).tween("brush:brush",function(){var e=xr(s,t.x),r=xr(h,t.y);return o=a=null,function(i){s=t.x=e(i),h=t.y=r(i),n({type:"brush",mode:"resize"})}}).each("end.brush",function(){o=t.i,a=t.j,n({type:"brush",mode:"resize"}),n({type:"brushend"})}):(n({type:"brushstart"}),n({type:"brush",mode:"resize"}),n({type:"brushend"}))})},n.x=function(t){return arguments.length?(c=t,v=Bl[!c<<1|!f],n):c},n.y=function(t){return arguments.length?(f=t,v=Bl[!c<<1|!f],n):f},n.clamp=function(t){return arguments.length?(c&&f?(p=!!t[0],g=!!t[1]):c?p=!!t:f&&(g=!!t),n):c&&f?[p,g]:c?p:f?g:null},n.extent=function(t){var e,r,i,u,l;return arguments.length?(c&&(e=t[0],r=t[1],f&&(e=e[0],r=r[0]),o=[e,r],c.invert&&(e=c(e),r=c(r)),e>r&&(l=e,e=r,r=l),e==s[0]&&r==s[1]||(s=[e,r])),f&&(i=t[0],u=t[1],c&&(i=i[1],u=u[1]),a=[i,u],f.invert&&(i=f(i),u=f(u)),i>u&&(l=i,i=u,u=l),i==h[0]&&u==h[1]||(h=[i,u])),n):(c&&(o?(e=o[0],r=o[1]):(e=s[0],r=s[1],c.invert&&(e=c.invert(e),r=c.invert(r)),e>r&&(l=e,e=r,r=l))),f&&(a?(i=a[0],u=a[1]):(i=h[0],u=h[1],f.invert&&(i=f.invert(i),u=f.invert(u)),i>u&&(l=i,i=u,u=l))),c&&f?[[e,i],[r,u]]:c?[e,r]:f&&[i,u])},n.clear=function(){return n.empty()||(s=[0,0],h=[0,0],o=a=null),n},n.empty=function(){return!!c&&s[0]==s[1]||!!f&&h[0]==h[1]},ao.rebind(n,l,"on")};var $l={n:"ns-resize",e:"ew-resize",s:"ns-resize",w:"ew-resize",nw:"nwse-resize",ne:"nesw-resize",se:"nwse-resize",sw:"nesw-resize"},Bl=[["n","e","s","w","nw","ne","se","sw"],["e","w"],["n","s"],[]],Wl=ga.format=xa.timeFormat,Jl=Wl.utc,Gl=Jl("%Y-%m-%dT%H:%M:%S.%LZ");Wl.iso=Date.prototype.toISOString&&+new Date("2000-01-01T00:00:00.000Z")?eo:Gl,eo.parse=function(n){var t=new Date(n);return isNaN(t)?null:t},eo.toString=Gl.toString,ga.second=On(function(n){return new va(1e3*Math.floor(n/1e3))},function(n,t){n.setTime(n.getTime()+1e3*Math.floor(t))},function(n){return n.getSeconds()}),ga.seconds=ga.second.range,ga.seconds.utc=ga.second.utc.range,ga.minute=On(function(n){return new va(6e4*Math.floor(n/6e4))},function(n,t){n.setTime(n.getTime()+6e4*Math.floor(t))},function(n){return n.getMinutes()}),ga.minutes=ga.minute.range,ga.minutes.utc=ga.minute.utc.range,ga.hour=On(function(n){var t=n.getTimezoneOffset()/60;return new va(36e5*(Math.floor(n/36e5-t)+t))},function(n,t){n.setTime(n.getTime()+36e5*Math.floor(t))},function(n){return n.getHours()}),ga.hours=ga.hour.range,ga.hours.utc=ga.hour.utc.range,ga.month=On(function(n){return n=ga.day(n),n.setDate(1),n},function(n,t){n.setMonth(n.getMonth()+t)},function(n){return n.getMonth()}),ga.months=ga.month.range,ga.months.utc=ga.month.utc.range;var Kl=[1e3,5e3,15e3,3e4,6e4,3e5,9e5,18e5,36e5,108e5,216e5,432e5,864e5,1728e5,6048e5,2592e6,7776e6,31536e6],Ql=[[ga.second,1],[ga.second,5],[ga.second,15],[ga.second,30],[ga.minute,1],[ga.minute,5],[ga.minute,15],[ga.minute,30],[ga.hour,1],[ga.hour,3],[ga.hour,6],[ga.hour,12],[ga.day,1],[ga.day,2],[ga.week,1],[ga.month,1],[ga.month,3],[ga.year,1]],nc=Wl.multi([[".%L",function(n){return n.getMilliseconds()}],[":%S",function(n){return n.getSeconds()}],["%I:%M",function(n){return n.getMinutes()}],["%I %p",function(n){return n.getHours()}],["%a %d",function(n){return n.getDay()&&1!=n.getDate()}],["%b %d",function(n){return 1!=n.getDate()}],["%B",function(n){return n.getMonth()}],["%Y",zt]]),tc={range:function(n,t,e){return ao.range(Math.ceil(n/e)*e,+t,e).map(io)},floor:m,ceil:m};Ql.year=ga.year,ga.scale=function(){return ro(ao.scale.linear(),Ql,nc)};var ec=Ql.map(function(n){return[n[0].utc,n[1]]}),rc=Jl.multi([[".%L",function(n){return n.getUTCMilliseconds()}],[":%S",function(n){return n.getUTCSeconds()}],["%I:%M",function(n){return n.getUTCMinutes()}],["%I %p",function(n){return n.getUTCHours()}],["%a %d",function(n){return n.getUTCDay()&&1!=n.getUTCDate()}],["%b %d",function(n){return 1!=n.getUTCDate()}],["%B",function(n){return n.getUTCMonth()}],["%Y",zt]]);ec.year=ga.year.utc,ga.scale.utc=function(){return ro(ao.scale.linear(),ec,rc)},ao.text=An(function(n){return n.responseText}),ao.json=function(n,t){return Cn(n,"application/json",uo,t)},ao.html=function(n,t){return Cn(n,"text/html",oo,t)},ao.xml=An(function(n){return n.responseXML}),"function"==typeof define&&define.amd?(this.d3=ao,define(ao)):"object"==typeof module&&module.exports?module.exports=ao:this.d3=ao}();

/*!
 *  dc 2.1.10
 *  http://dc-js.github.io/dc.js/
 *  Copyright 2012-2016 Nick Zhu & the dc.js Developers
 *  https://github.com/dc-js/dc.js/blob/master/AUTHORS
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

!function(){function a(a,b){"use strict";var c={version:"2.1.10",constants:{CHART_CLASS:"dc-chart",DEBUG_GROUP_CLASS:"debug",STACK_CLASS:"stack",DESELECTED_CLASS:"deselected",SELECTED_CLASS:"selected",NODE_INDEX_NAME:"__index__",GROUP_INDEX_NAME:"__group_index__",DEFAULT_CHART_GROUP:"__default_chart_group__",EVENT_DELAY:40,NEGLIGIBLE_NUMBER:1e-10},_renderlet:null};c.chartRegistry=function(){function a(a){return a||(a=c.constants.DEFAULT_CHART_GROUP),b[a]||(b[a]=[]),a}var b={};return{has:function(a){for(var c in b)if(b[c].indexOf(a)>=0)return!0;return!1},register:function(c,d){d=a(d),b[d].push(c)},deregister:function(c,d){d=a(d);for(var e=0;e<b[d].length;e++)if(b[d][e].anchorName()===c.anchorName()){b[d].splice(e,1);break}},clear:function(a){a?delete b[a]:b={}},list:function(c){return c=a(c),b[c]}}}(),c.registerChart=function(a,b){c.chartRegistry.register(a,b)},c.deregisterChart=function(a,b){c.chartRegistry.deregister(a,b)},c.hasChart=function(a){return c.chartRegistry.has(a)},c.deregisterAllCharts=function(a){c.chartRegistry.clear(a)},c.filterAll=function(a){for(var b=c.chartRegistry.list(a),d=0;d<b.length;++d)b[d].filterAll()},c.refocusAll=function(a){for(var b=c.chartRegistry.list(a),d=0;d<b.length;++d)b[d].focus&&b[d].focus()},c.renderAll=function(a){for(var b=c.chartRegistry.list(a),d=0;d<b.length;++d)b[d].render();null!==c._renderlet&&c._renderlet(a)},c.redrawAll=function(a){for(var b=c.chartRegistry.list(a),d=0;d<b.length;++d)b[d].redraw();null!==c._renderlet&&c._renderlet(a)},c.disableTransitions=!1,c.transition=function(a,b,d,e){if(c.disableTransitions||b<=0)return a;var f=a.transition(e);return(b>=0||void 0!==b)&&(f=f.duration(b)),(d>=0||void 0!==d)&&(f=f.delay(d)),f},c.optionalTransition=function(a,b,d,e){return a?function(a){return c.transition(a,b,d,e)}:function(a){return a}},c.afterTransition=function(a,b){if(a.empty()||!a.duration)b.call(a);else{var c=0;a.each(function(){++c}).each("end",function(){--c||b.call(a)})}},c.units={},c.units.integers=function(a,b){return Math.abs(b-a)},c.units.ordinal=function(a,b,c){return c},c.units.fp={},c.units.fp.precision=function(a){var b=function(a,d){var e=Math.abs((d-a)/b.resolution);return c.utils.isNegligible(e-Math.floor(e))?Math.floor(e):Math.ceil(e)};return b.resolution=a,b},c.round={},c.round.floor=function(a){return Math.floor(a)},c.round.ceil=function(a){return Math.ceil(a)},c.round.round=function(a){return Math.round(a)},c.override=function(a,b,c){var d=a[b];a["_"+b]=d,a[b]=c},c.renderlet=function(a){return arguments.length?(c._renderlet=a,c):c._renderlet},c.instanceOfChart=function(a){return a instanceof Object&&a.__dcFlag__&&!0},c.errors={},c.errors.Exception=function(a){var b=a||"Unexpected internal error";this.message=b,this.toString=function(){return b},this.stack=(new Error).stack},c.errors.Exception.prototype=Object.create(Error.prototype),c.errors.Exception.prototype.constructor=c.errors.Exception,c.errors.InvalidStateException=function(){c.errors.Exception.apply(this,arguments)},c.errors.InvalidStateException.prototype=Object.create(c.errors.Exception.prototype),c.errors.InvalidStateException.prototype.constructor=c.errors.InvalidStateException,c.errors.BadArgumentException=function(){c.errors.Exception.apply(this,arguments)},c.errors.BadArgumentException.prototype=Object.create(c.errors.Exception.prototype),c.errors.BadArgumentException.prototype.constructor=c.errors.BadArgumentException,c.dateFormat=a.time.format("%m/%d/%Y"),c.printers={},c.printers.filters=function(a){for(var b="",d=0;d<a.length;++d)d>0&&(b+=", "),b+=c.printers.filter(a[d]);return b},c.printers.filter=function(a){var b="";return"undefined"!=typeof a&&null!==a&&(a instanceof Array?a.length>=2?b="["+c.utils.printSingleValue(a[0])+" -> "+c.utils.printSingleValue(a[1])+"]":a.length>=1&&(b=c.utils.printSingleValue(a[0])):b=c.utils.printSingleValue(a)),b},c.pluck=function(a,b){return b?function(c,d){return b.call(c,c[a],d)}:function(b){return b[a]}},c.utils={},c.utils.printSingleValue=function(a){var b=""+a;return a instanceof Date?b=c.dateFormat(a):"string"==typeof a?b=a:c.utils.isFloat(a)?b=c.utils.printSingleValue.fformat(a):c.utils.isInteger(a)&&(b=Math.round(a)),b},c.utils.printSingleValue.fformat=a.format(".2f"),c.utils.add=function(b,c,d){if("string"==typeof c&&(c=c.replace("%","")),b instanceof Date)return"string"==typeof c&&(c=+c),"millis"===d?new Date(b.getTime()+c):(d=d||"day",a.time[d].offset(b,c));if("string"==typeof c){var e=+c/100;return b>0?b*(1+e):b*(1-e)}return b+c},c.utils.subtract=function(b,c,d){if("string"==typeof c&&(c=c.replace("%","")),b instanceof Date)return"string"==typeof c&&(c=+c),"millis"===d?new Date(b.getTime()-c):(d=d||"day",a.time[d].offset(b,-c));if("string"==typeof c){var e=+c/100;return b<0?b*(1+e):b*(1-e)}return b-c},c.utils.isNumber=function(a){return a===+a},c.utils.isFloat=function(a){return a===+a&&a!==(0|a)},c.utils.isInteger=function(a){return a===+a&&a===(0|a)},c.utils.isNegligible=function(a){return!c.utils.isNumber(a)||a<c.constants.NEGLIGIBLE_NUMBER&&a>-c.constants.NEGLIGIBLE_NUMBER},c.utils.clamp=function(a,b,c){return a<b?b:a>c?c:a};var d=0;return c.utils.uniqueId=function(){return++d},c.utils.nameToId=function(a){return a.toLowerCase().replace(/[\s]/g,"_").replace(/[\.']/g,"")},c.utils.appendOrSelect=function(a,b,c){c=c||b;var d=a.select(b);return d.empty()&&(d=a.append(c)),d},c.utils.safeNumber=function(a){return c.utils.isNumber(+a)?+a:0},c.logger={},c.logger.enableDebugLog=!1,c.logger.warn=function(a){return console&&(console.warn?console.warn(a):console.log&&console.log(a)),c.logger},c.logger.debug=function(a){return c.logger.enableDebugLog&&console&&(console.debug?console.debug(a):console.log&&console.log(a)),c.logger},c.logger.deprecate=function(a,b){function d(){return e||(c.logger.warn(b),e=!0),a.apply(this,arguments)}var e=!1;return d},c.events={current:null},c.events.trigger=function(a,b){return b?(c.events.current=a,void setTimeout(function(){a===c.events.current&&a()},b)):void a()},c.filters={},c.filters.RangedFilter=function(a,b){var c=new Array(a,b);return c.isFiltered=function(a){return a>=this[0]&&a<this[1]},c.filterType="RangedFilter",c},c.filters.TwoDimensionalFilter=function(a){if(null===a)return null;var b=a;return b.isFiltered=function(a){return a.length&&a.length===b.length&&a[0]===b[0]&&a[1]===b[1]},b.filterType="TwoDimensionalFilter",b},c.filters.RangedTwoDimensionalFilter=function(a){if(null===a)return null;var b,c=a;return b=c[0]instanceof Array?[[Math.min(a[0][0],a[1][0]),Math.min(a[0][1],a[1][1])],[Math.max(a[0][0],a[1][0]),Math.max(a[0][1],a[1][1])]]:[[a[0],-(1/0)],[a[1],1/0]],c.isFiltered=function(a){var c,d;return a instanceof Array?(c=a[0],d=a[1]):(c=a,d=b[0][1]),c>=b[0][0]&&c<b[1][0]&&d>=b[0][1]&&d<b[1][1]},c.filterType="RangedTwoDimensionalFilter",c},c.baseMixin=function(d){function e(){m&&(z?m.attr("viewBox")||m.attr("viewBox","0 0 "+d.width()+" "+d.height()):m.attr("width",d.width()).attr("height",d.height()))}function f(){return m=d.root().append("svg"),e(),m}function g(a){if(!d[a]||!d[a]())throw new c.errors.InvalidStateException("Mandatory attribute chart."+a+" is missing on chart[#"+d.anchorName()+"]")}function h(a){if(d.dimension()&&d.dimension().filter){var b=P(d.dimension(),a);b&&(a=b)}return a}d.__dcFlag__=c.utils.uniqueId();var i,j,k,l,m,n,o,p,q,r,s,t=200,u=function(a){var b=a&&a.getBoundingClientRect&&a.getBoundingClientRect().width;return b&&b>t?b:t},v=u,w=200,x=function(a){var b=a&&a.getBoundingClientRect&&a.getBoundingClientRect().height;return b&&b>w?b:w},y=x,z=!1,A=c.pluck("key"),B=c.pluck("value"),C=c.pluck("key"),D=c.pluck("key"),E=!1,F=function(a){return d.keyAccessor()(a)+": "+d.valueAccessor()(a)},G=!0,H=!1,I=750,J=0,K=c.printers.filters,L=["dimension","group"],M=c.constants.DEFAULT_CHART_GROUP,N=a.dispatch("preRender","postRender","preRedraw","postRedraw","filtered","zoomed","renderlet","pretransition"),O=[],P=function(a,b){return 0===b.length?a.filter(null):1!==b.length||b[0].isFiltered?1===b.length&&"RangedFilter"===b[0].filterType?a.filterRange(b[0]):a.filterFunction(function(a){for(var c=0;c<b.length;c++){var d=b[c];if(d.isFiltered&&d.isFiltered(a))return!0;if(d<=a&&d>=a)return!0}return!1}):a.filterExact(b[0]),b},Q=function(a){return a.all()};d.height=function(b){return arguments.length?(y=a.functor(b||x),p=void 0,d):(c.utils.isNumber(p)||(p=y(l.node())),p)},d.width=function(b){return arguments.length?(v=a.functor(b||u),o=void 0,d):(c.utils.isNumber(o)||(o=v(l.node())),o)},d.minWidth=function(a){return arguments.length?(t=a,d):t},d.minHeight=function(a){return arguments.length?(w=a,d):w},d.useViewBoxResizing=function(a){return arguments.length?(z=a,d):z},d.dimension=function(a){return arguments.length?(i=a,d.expireCache(),d):i},d.data=function(b){return arguments.length?(Q=a.functor(b),d.expireCache(),d):Q.call(d,j)},d.group=function(a,b){return arguments.length?(j=a,d._groupName=b,d.expireCache(),d):j},d.ordering=function(a){return arguments.length?(D=a,q=b.quicksort.by(D),d.expireCache(),d):D},d._computeOrderedGroups=function(a){var c=a.slice(0);return c.length<=1?c:(q||(q=b.quicksort.by(D)),q(c,0,c.length))},d.filterAll=function(){return d.filter(null)},d.select=function(a){return l.select(a)},d.selectAll=function(a){return l?l.selectAll(a):null},d.anchor=function(b,e){if(!arguments.length)return k;if(c.instanceOfChart(b))k=b.anchor(),l=b.root(),n=!0;else{if(!b)throw new c.errors.BadArgumentException("parent must be defined");k=b.select&&b.classed?b.node():b,l=a.select(k),l.classed(c.constants.CHART_CLASS,!0),c.registerChart(d,e),n=!1}return M=e,d},d.anchorName=function(){var a=d.anchor();return a&&a.id?a.id:a&&a.replace?a.replace("#",""):"dc-chart"+d.chartID()},d.root=function(a){return arguments.length?(l=a,d):l},d.svg=function(a){return arguments.length?(m=a,d):m},d.resetSvg=function(){return d.select("svg").remove(),f()},d.filterPrinter=function(a){return arguments.length?(K=a,d):K},d.controlsUseVisibility=function(a){return arguments.length?(H=a,d):H},d.turnOnControls=function(){if(l){var a=d.controlsUseVisibility()?"visibility":"display";d.selectAll(".reset").style(a,null),d.selectAll(".filter").text(K(d.filters())).style(a,null)}return d},d.turnOffControls=function(){if(l){var a=d.controlsUseVisibility()?"visibility":"display",b=d.controlsUseVisibility()?"hidden":"none";d.selectAll(".reset").style(a,b),d.selectAll(".filter").style(a,b).text(d.filter())}return d},d.transitionDuration=function(a){return arguments.length?(I=a,d):I},d.transitionDelay=function(a){return arguments.length?(J=a,d):J},d._mandatoryAttributes=function(a){return arguments.length?(L=a,d):L},d.render=function(){p=o=void 0,N.preRender(d),L&&L.forEach(g);var a=d._doRender();return r&&r.render(),d._activateRenderlets("postRender"),a},d._activateRenderlets=function(a){N.pretransition(d),d.transitionDuration()>0&&m?m.transition().duration(d.transitionDuration()).delay(d.transitionDelay()).each("end",function(){N.renderlet(d),a&&N[a](d)}):(N.renderlet(d),a&&N[a](d))},d.redraw=function(){e(),N.preRedraw(d);var a=d._doRedraw();return r&&r.render(),d._activateRenderlets("postRedraw"),a},d.commitHandler=function(a){return arguments.length?(s=a,d):s},d.redrawGroup=function(){return s?s(!1,function(a,b){a?console.log(a):c.redrawAll(d.chartGroup())}):c.redrawAll(d.chartGroup()),d},d.renderGroup=function(){return s?s(!1,function(a,b){a?console.log(a):c.renderAll(d.chartGroup())}):c.renderAll(d.chartGroup()),d},d._invokeFilteredListener=function(a){void 0!==a&&N.filtered(d,a)},d._invokeZoomedListener=function(){N.zoomed(d)};var R=function(a,b){return null===b||"undefined"==typeof b?a.length>0:a.some(function(a){return b<=a&&b>=a})};d.hasFilterHandler=function(a){return arguments.length?(R=a,d):R},d.hasFilter=function(a){return R(O,a)};var S=function(a,b){for(var c=0;c<a.length;c++)if(a[c]<=b&&a[c]>=b){a.splice(c,1);break}return a};d.removeFilterHandler=function(a){return arguments.length?(S=a,d):S};var T=function(a,b){return a.push(b),a};d.addFilterHandler=function(a){return arguments.length?(T=a,d):T};var U=function(a){return[]};return d.resetFilterHandler=function(a){return arguments.length?(U=a,d):U},d.replaceFilter=function(a){return O=U(O),d.filter(a),d},d.filter=function(a){if(!arguments.length)return O.length>0?O[0]:null;var b=O;return a instanceof Array&&a[0]instanceof Array&&!a.isFiltered?a[0].forEach(function(a){b=R(b,a)?S(b,a):T(b,a)}):b=null===a?U(b):R(b,a)?S(b,a):T(b,a),O=h(b),d._invokeFilteredListener(a),null!==l&&d.hasFilter()?d.turnOnControls():d.turnOffControls(),d},d.filters=function(){return O},d.highlightSelected=function(b){a.select(b).classed(c.constants.SELECTED_CLASS,!0),a.select(b).classed(c.constants.DESELECTED_CLASS,!1)},d.fadeDeselected=function(b){a.select(b).classed(c.constants.SELECTED_CLASS,!1),a.select(b).classed(c.constants.DESELECTED_CLASS,!0)},d.resetHighlight=function(b){a.select(b).classed(c.constants.SELECTED_CLASS,!1),a.select(b).classed(c.constants.DESELECTED_CLASS,!1)},d.onClick=function(a){var b=d.keyAccessor()(a);c.events.trigger(function(){d.filter(b),d.redrawGroup()})},d.filterHandler=function(a){return arguments.length?(P=a,d):P},d._doRender=function(){return d},d._doRedraw=function(){return d},d.legendables=function(){return[]},d.legendHighlight=function(){},d.legendReset=function(){},d.legendToggle=function(){},d.isLegendableHidden=function(){return!1},d.keyAccessor=function(a){return arguments.length?(A=a,d):A},d.valueAccessor=function(a){return arguments.length?(B=a,d):B},d.label=function(a,b){return arguments.length?(C=a,(void 0===b||b)&&(E=!0),d):C},d.renderLabel=function(a){return arguments.length?(E=a,d):E},d.title=function(a){return arguments.length?(F=a,d):F},d.renderTitle=function(a){return arguments.length?(G=a,d):G},d.renderlet=c.logger.deprecate(function(a){return d.on("renderlet."+c.utils.uniqueId(),a),d},'chart.renderlet has been deprecated.  Please use chart.on("renderlet.<renderletKey>", renderletFunction)'),d.chartGroup=function(a){return arguments.length?(n||c.deregisterChart(d,M),M=a,n||c.registerChart(d,M),d):M},d.expireCache=function(){return d},d.legend=function(a){return arguments.length?(r=a,r.parent(d),d):r},d.chartID=function(){return d.__dcFlag__},d.options=function(a){var b=["anchor","group","xAxisLabel","yAxisLabel","stack","title","point","getColor","overlayGeoJson"];for(var e in a)"function"==typeof d[e]?a[e]instanceof Array&&b.indexOf(e)!==-1?d[e].apply(d,a[e]):d[e].call(d,a[e]):c.logger.debug("Not a valid option setter name: "+e);return d},d.on=function(a,b){return N.on(a,b),d},d},c.marginMixin=function(a){var b={top:10,right:50,bottom:30,left:30};return a.margins=function(c){return arguments.length?(b=c,a):b},a.effectiveWidth=function(){return a.width()-a.margins().left-a.margins().right},a.effectiveHeight=function(){return a.height()-a.margins().top-a.margins().bottom},a},c.colorMixin=function(b){var d=a.scale.category20c(),e=!0,f=function(a){return b.keyAccessor()(a)};return b.colors=function(c){return arguments.length?(d=c instanceof Array?a.scale.quantize().range(c):a.functor(c),b):d},b.ordinalColors=function(c){return b.colors(a.scale.ordinal().range(c))},b.linearColors=function(c){return b.colors(a.scale.linear().range(c).interpolate(a.interpolateHcl))},b.colorAccessor=function(a){return arguments.length?(f=a,e=!1,b):f},b.defaultColorAccessor=function(){return e},b.colorDomain=function(a){return arguments.length?(d.domain(a),b):d.domain()},b.calculateColorDomain=function(){var c=[a.min(b.data(),b.colorAccessor()),a.max(b.data(),b.colorAccessor())];return d.domain(c),b},b.getColor=function(a,b){return d(f.call(this,a,b))},b.colorCalculator=c.logger.deprecate(function(a){return arguments.length?(b.getColor=a,b):b.getColor},"colorMixin.colorCalculator has been deprecated. Please colorMixin.colors and colorMixin.colorAccessor instead"),b},c.coordinateGridMixin=function(b){function d(a,b){return!a||!b||a.length!==b.length||a.some(function(a,c){return a&&b[c]?a.toString()!==b[c].toString():a===b[c]})}function e(a,c){b.isOrdinal()?(b.elasticX()||0===z.domain().length)&&z.domain(b._ordinalXDomain()):b.elasticX()&&z.domain([b.xAxisMin(),b.xAxisMax()]);var e=z.domain();(c||d(C,e))&&b.rescale(),C=e,b.isOrdinal()?z.rangeBands([0,b.xAxisLength()],fa,b._useOuterPadding()?ea:0):z.range([0,b.xAxisLength()]),J=J.scale(b.x()),f(a)}function f(a){var d=a.select("g."+s);if(W){d.empty()&&(d=a.insert("g",":first-child").attr("class",q+" "+s).attr("transform","translate("+b.margins().left+","+b.margins().top+")"));var e=J.tickValues()?J.tickValues():"function"==typeof z.ticks?z.ticks(J.ticks()[0]):z.domain(),f=d.selectAll("line").data(e),g=f.enter().append("line").attr("x1",function(a){return z(a)}).attr("y1",b._xAxisY()-b.margins().top).attr("x2",function(a){return z(a)}).attr("y2",0).attr("opacity",0);c.transition(g,b.transitionDuration(),b.transitionDelay()).attr("opacity",1),c.transition(f,b.transitionDuration(),b.transitionDelay()).attr("x1",function(a){return z(a)}).attr("y1",b._xAxisY()-b.margins().top).attr("x2",function(a){return z(a)}).attr("y2",0),f.exit().remove()}else d.selectAll("line").remove()}function g(){return b._xAxisY()-b.margins().top}function h(){return b.anchorName().replace(/[ .#=\[\]"]/g,"-")+"-clip"}function i(){var a=c.utils.appendOrSelect(w,"defs"),d=h(),e=c.utils.appendOrSelect(a,"#"+d,"clipPath").attr("id",d),f=2*da;c.utils.appendOrSelect(e,"rect").attr("width",b.xAxisLength()+f).attr("height",b.yAxisHeight()+f).attr("transform","translate(-"+da+", -"+da+")")}function j(a){b.isOrdinal()&&(U=!1),e(b.g(),a),b._prepareYAxis(b.g()),b.plotData(),(b.elasticX()||Y||a)&&b.renderXAxis(b.g()),(b.elasticY()||Y||a)&&b.renderYAxis(b.g()),a?b.renderBrush(b.g(),!1):b.redrawBrush(b.g(),Y),b.fadeDeselectedArea(),Y=!1}function k(){ca?b._enableMouseZoom():ba&&b._disableMouseZoom()}function l(){if(X=!0,$){var a=A;H&&(a=m(a,H.x().domain()));var d=n(b.x().domain(),a);d&&b.x().domain(d)}var e=b.x().domain(),f=c.filters.RangedFilter(e[0],e[1]);b.replaceFilter(f),b.rescale(),b.redraw(),H&&!o(b.filter(),H.filter())&&c.events.trigger(function(){H.replaceFilter(f),H.redraw()}),b._invokeZoomedListener(),c.events.trigger(function(){b.redrawGroup()},c.constants.EVENT_DELAY),X=!o(e,A)}function m(a,b){return(a[0]>b[1]||a[1]<b[0])&&console.warn("could not intersect extents"),[Math.max(a[0],b[0]),Math.min(a[1],b[1])]}function n(a,b){var d=a[1]-a[0];return a[0]<b[0]?[b[0],Math.min(b[1],c.utils.add(b[0],d,"millis"))]:a[1]>b[1]?[Math.max(b[0],c.utils.subtract(b[1],d,"millis")),b[1]]:null}function o(a,b){return!a&&!b||!(!a||!b)&&(0===a.length&&0===b.length||a[0].valueOf()===b[0].valueOf()&&a[1].valueOf()===b[1].valueOf())}function p(a){return a instanceof Array&&a.length>1}var q="grid-line",r="horizontal",s="vertical",t="y-axis-label",u="x-axis-label",v=12;b=c.colorMixin(c.marginMixin(c.baseMixin(b))),b.colors(a.scale.category10()),b._mandatoryAttributes().push("x");var w,x,y,z,A,B,C,D,E,F,G,H,I,J=a.svg.axis().orient("bottom"),K=c.units.integers,L=0,M="day",N=!1,O=0,P=a.svg.axis().orient("left"),Q=0,R=!1,S=0,T=a.svg.brush(),U=!0,V=!1,W=!1,X=!1,Y=!1,Z=[1,1/0],$=!0,_=a.behavior.zoom().on("zoom",l),aa=a.behavior.zoom().on("zoom",null),ba=!1,ca=!1,da=0,ea=.5,fa=0,ga=!1;return b.rescale=function(){return G=void 0,Y=!0,b},b.resizing=function(){return Y},b.rangeChart=function(a){return arguments.length?(H=a,H.focusChart(b),b):H},b.zoomScale=function(a){return arguments.length?(Z=a,b):Z},b.zoomOutRestrict=function(a){return arguments.length?(Z[0]=a?1:0,$=a,b):$},b._generateG=function(a){w=void 0===a?b.svg():a;var c=window.location.href.split("#")[0];return x=w.append("g"),y=x.append("g").attr("class","chart-body").attr("transform","translate("+b.margins().left+", "+b.margins().top+")").attr("clip-path","url("+c+"#"+h()+")"),x},b.g=function(a){return arguments.length?(x=a,b):x},b.mouseZoomable=function(a){return arguments.length?(ca=a,b):ca},b.chartBodyG=function(a){return arguments.length?(y=a,b):y},b.x=function(a){return arguments.length?(z=a,A=z.domain(),b.rescale(),b):z},b.xOriginalDomain=function(){return A},b.xUnits=function(a){return arguments.length?(K=a,b):K},b.xAxis=function(a){return arguments.length?(J=a,b):J},b.elasticX=function(a){return arguments.length?(N=a,b):N},b.xAxisPadding=function(a){return arguments.length?(L=a,b):L},b.xAxisPaddingUnit=function(a){return arguments.length?(M=a,b):M},b.xUnitCount=function(){if(void 0===G){var a=b.xUnits()(b.x().domain()[0],b.x().domain()[1],b.x().domain());G=a instanceof Array?a.length:a}return G},b.useRightYAxis=function(a){return arguments.length?(ga=a,b):ga},b.isOrdinal=function(){return b.xUnits()===c.units.ordinal},b._useOuterPadding=function(){return!0},b._ordinalXDomain=function(){var a=b._computeOrderedGroups(b.data());return a.map(b.keyAccessor())},b.renderXAxis=function(a){var d=a.select("g.x");d.empty()&&(d=a.append("g").attr("class","axis x").attr("transform","translate("+b.margins().left+","+b._xAxisY()+")"));var e=a.select("text."+u);e.empty()&&b.xAxisLabel()&&(e=a.append("text").attr("class",u).attr("transform","translate("+(b.margins().left+b.xAxisLength()/2)+","+(b.height()-O)+")").attr("text-anchor","middle")),b.xAxisLabel()&&e.text()!==b.xAxisLabel()&&e.text(b.xAxisLabel()),c.transition(d,b.transitionDuration(),b.transitionDelay()).attr("transform","translate("+b.margins().left+","+b._xAxisY()+")").call(J),c.transition(e,b.transitionDuration(),b.transitionDelay()).attr("transform","translate("+(b.margins().left+b.xAxisLength()/2)+","+(b.height()-O)+")")},b._xAxisY=function(){return b.height()-b.margins().bottom},b.xAxisLength=function(){return b.effectiveWidth()},b.xAxisLabel=function(a,c){return arguments.length?(B=a,b.margins().bottom-=O,O=void 0===c?v:c,b.margins().bottom+=O,b):B},b._prepareYAxis=function(c){if(void 0===D||b.elasticY()){void 0===D&&(D=a.scale.linear());var d=b.yAxisMin()||0,e=b.yAxisMax()||0;D.domain([d,e]).rangeRound([b.yAxisHeight(),0])}D.range([b.yAxisHeight(),0]),P=P.scale(D),ga&&P.orient("right"),b._renderHorizontalGridLinesForAxis(c,D,P)},b.renderYAxisLabel=function(a,d,e,f){f=f||S;var g=b.g().select("text."+t+"."+a+"-label"),h=b.margins().top+b.yAxisHeight()/2;g.empty()&&d&&(g=b.g().append("text").attr("transform","translate("+f+","+h+"),rotate("+e+")").attr("class",t+" "+a+"-label").attr("text-anchor","middle").text(d)),d&&g.text()!==d&&g.text(d),c.transition(g,b.transitionDuration(),b.transitionDelay()).attr("transform","translate("+f+","+h+"),rotate("+e+")")},b.renderYAxisAt=function(a,d,e){var f=b.g().select("g."+a);f.empty()&&(f=b.g().append("g").attr("class","axis "+a).attr("transform","translate("+e+","+b.margins().top+")")),c.transition(f,b.transitionDuration(),b.transitionDelay()).attr("transform","translate("+e+","+b.margins().top+")").call(d)},b.renderYAxis=function(){var a=ga?b.width()-b.margins().right:b._yAxisX();b.renderYAxisAt("y",P,a);var c=ga?b.width()-S:S,d=ga?90:-90;b.renderYAxisLabel("y",b.yAxisLabel(),d,c)},b._renderHorizontalGridLinesForAxis=function(a,d,e){var f=a.select("g."+r);if(V){var g=e.tickValues()?e.tickValues():d.ticks(e.ticks()[0]);f.empty()&&(f=a.insert("g",":first-child").attr("class",q+" "+r).attr("transform","translate("+b.margins().left+","+b.margins().top+")"));var h=f.selectAll("line").data(g),i=h.enter().append("line").attr("x1",1).attr("y1",function(a){return d(a)}).attr("x2",b.xAxisLength()).attr("y2",function(a){return d(a)}).attr("opacity",0);c.transition(i,b.transitionDuration(),b.transitionDelay()).attr("opacity",1),c.transition(h,b.transitionDuration(),b.transitionDelay()).attr("x1",1).attr("y1",function(a){return d(a)}).attr("x2",b.xAxisLength()).attr("y2",function(a){return d(a)}),h.exit().remove()}else f.selectAll("line").remove()},b._yAxisX=function(){return b.useRightYAxis()?b.width()-b.margins().right:b.margins().left},b.yAxisLabel=function(a,c){return arguments.length?(E=a,b.margins().left-=S,S=void 0===c?v:c,b.margins().left+=S,b):E},b.y=function(a){return arguments.length?(D=a,b.rescale(),b):D},b.yAxis=function(a){return arguments.length?(P=a,b):P},b.elasticY=function(a){return arguments.length?(R=a,b):R},b.renderHorizontalGridLines=function(a){return arguments.length?(V=a,b):V},b.renderVerticalGridLines=function(a){return arguments.length?(W=a,b):W},b.xAxisMin=function(){var d=a.min(b.data(),function(a){return b.keyAccessor()(a)});return c.utils.subtract(d,L,M)},b.xAxisMax=function(){var d=a.max(b.data(),function(a){return b.keyAccessor()(a)});return c.utils.add(d,L,M)},b.yAxisMin=function(){var d=a.min(b.data(),function(a){return b.valueAccessor()(a)});return c.utils.subtract(d,Q)},b.yAxisMax=function(){var d=a.max(b.data(),function(a){return b.valueAccessor()(a)});return c.utils.add(d,Q)},b.yAxisPadding=function(a){return arguments.length?(Q=a,b):Q},b.yAxisHeight=function(){return b.effectiveHeight()},b.round=function(a){return arguments.length?(F=a,b):F},b._rangeBandPadding=function(a){return arguments.length?(fa=a,b):fa},b._outerRangeBandPadding=function(a){return arguments.length?(ea=a,b):ea},c.override(b,"filter",function(a){return arguments.length?(b._filter(a),a?b.brush().extent(a):b.brush().clear(),b):b._filter()}),b.brush=function(a){return arguments.length?(T=a,b):T},b.renderBrush=function(a){if(U){T.on("brush",b._brushing),T.on("brushstart",b._disableMouseZoom),T.on("brushend",k);var c=a.append("g").attr("class","brush").attr("transform","translate("+b.margins().left+","+b.margins().top+")").call(T.x(b.x()));b.setBrushY(c,!1),b.setHandlePaths(c),b.hasFilter()&&b.redrawBrush(a,!1)}},b.setHandlePaths=function(a){a.selectAll(".resize").append("path").attr("d",b.resizeHandlePath)},b.setBrushY=function(a){a.selectAll("rect").attr("height",g()),a.selectAll(".resize path").attr("d",b.resizeHandlePath)},b.extendBrush=function(){var a=T.extent();return b.round()&&(a[0]=a.map(b.round())[0],a[1]=a.map(b.round())[1],x.select(".brush").call(T.extent(a))),a},b.brushIsEmpty=function(a){return T.empty()||!a||a[1]<=a[0]},b._brushing=function(){var a=b.extendBrush();if(b.redrawBrush(x,!1),b.brushIsEmpty(a))c.events.trigger(function(){b.filter(null),b.redrawGroup()},c.constants.EVENT_DELAY);else{var d=c.filters.RangedFilter(a[0],a[1]);c.events.trigger(function(){b.replaceFilter(d),b.redrawGroup()},c.constants.EVENT_DELAY)}},b.redrawBrush=function(a,d){if(U){b.filter()&&b.brush().empty()&&b.brush().extent(b.filter());var e=c.optionalTransition(d,b.transitionDuration(),b.transitionDelay())(a.select("g.brush"));b.setBrushY(e),e.call(b.brush().x(b.x()).extent(b.brush().extent()))}b.fadeDeselectedArea()},b.fadeDeselectedArea=function(){},b.resizeHandlePath=function(a){var b=+("e"===a),c=b?1:-1,d=g()/3;return"M"+.5*c+","+d+"A6,6 0 0 "+b+" "+6.5*c+","+(d+6)+"V"+(2*d-6)+"A6,6 0 0 "+b+" "+.5*c+","+2*d+"ZM"+2.5*c+","+(d+8)+"V"+(2*d-8)+"M"+4.5*c+","+(d+8)+"V"+(2*d-8)},b.clipPadding=function(a){return arguments.length?(da=a,b):da},b._preprocessData=function(){},b._doRender=function(){return b.resetSvg(),b._preprocessData(),b._generateG(),i(),j(!0),k(),b},b._doRedraw=function(){return b._preprocessData(),j(!1),i(),b},b._enableMouseZoom=function(){ba=!0,_.x(b.x()).scaleExtent(Z).size([b.width(),b.height()]).duration(b.transitionDuration()),b.root().call(_)},b._disableMouseZoom=function(){b.root().call(aa)},b.focus=function(a){p(a)?b.x().domain(a):b.x().domain(A),_.x(b.x()),l()},b.refocused=function(){return X},b.focusChart=function(a){return arguments.length?(I=a,b.on("filtered",function(a){a.filter()?o(a.filter(),I.filter())||c.events.trigger(function(){I.focus(a.filter())}):c.events.trigger(function(){I.x().domain(I.xOriginalDomain())})}),b):I},b.brushOn=function(a){return arguments.length?(U=a,b):U},b},c.stackMixin=function(b){function d(a,c){var d=a.accessor||b.valueAccessor();return a.name=String(a.name||c),a.values=a.group.all().map(function(c,e){return{x:b.keyAccessor()(c,e),y:a.hidden?null:d(c,e),data:c,layer:a.name,hidden:a.hidden}}),a.values=a.values.filter(e()),a.values}function e(){if(!b.x()||m)return a.functor(!0);var c=b.x().domain();return b.isOrdinal()?function(){return!0}:b.elasticX()?function(){return!0}:function(a){return a.x>=c[0]&&a.x<=c[c.length-1]}}function f(a){var b=j.map(c.pluck("name")).indexOf(a);return j[b]}function g(){var a=b.data().map(function(a){return a.values});return Array.prototype.concat.apply([],a)}function h(a){return!a.hidden}var i=a.layout.stack().values(d),j=[],k={},l=!1,m=!1;return b.stack=function(a,c,d){if(!arguments.length)return j;arguments.length<=2&&(d=c);var e={group:a};return"string"==typeof c&&(e.name=c),"function"==typeof d&&(e.accessor=d),j.push(e),b},c.override(b,"group",function(a,c,d){return arguments.length?(j=[],k={},b.stack(a,c),d&&b.valueAccessor(d),b._group(a,c)):b._group()}),b.hidableStacks=function(a){return arguments.length?(l=a,b):l},b.hideStack=function(a){var c=f(a);return c&&(c.hidden=!0),b},b.showStack=function(a){var c=f(a);return c&&(c.hidden=!1),b},b.getValueAccessorByIndex=function(a){return j[a].accessor||b.valueAccessor()},b.yAxisMin=function(){var d=a.min(g(),function(a){return a.y<0?a.y+a.y0:a.y0});return c.utils.subtract(d,b.yAxisPadding())},b.yAxisMax=function(){var d=a.max(g(),function(a){return a.y>0?a.y+a.y0:a.y0});return c.utils.add(d,b.yAxisPadding())},b.xAxisMin=function(){var d=a.min(g(),c.pluck("x"));return c.utils.subtract(d,b.xAxisPadding(),b.xAxisPaddingUnit())},b.xAxisMax=function(){var d=a.max(g(),c.pluck("x"));return c.utils.add(d,b.xAxisPadding(),b.xAxisPaddingUnit())},c.override(b,"title",function(a,c){return a?"function"==typeof a?b._title(a):a===b._groupName&&"function"==typeof c?b._title(c):"function"!=typeof c?k[a]||b._title():(k[a]=c,b):b._title()}),b.stackLayout=function(c){return arguments.length?(i=c,i.values()===a.layout.stack().values()&&i.values(d),b):i},b.evadeDomainFilter=function(a){return arguments.length?(m=a,b):m},b.data(function(){var a=j.filter(h);return a.length?b.stackLayout()(a):[]}),b._ordinalXDomain=function(){var a=g().map(c.pluck("data")),d=b._computeOrderedGroups(a);return d.map(b.keyAccessor())},b.colorAccessor(function(a){var b=this.layer||this.name||a.name||a.layer;return b}),b.legendables=function(){return j.map(function(a,c){return{chart:b,name:a.name,hidden:a.hidden||!1,color:b.getColor.call(a,a.values,c)}})},b.isLegendableHidden=function(a){var b=f(a.name);return!!b&&b.hidden},b.legendToggle=function(a){l&&(b.isLegendableHidden(a)?b.showStack(a.name):b.hideStack(a.name),b.renderGroup())},b},c.capMixin=function(b){var d=1/0,e=!0,f="Others";b.ordering(function(a){return-a.value});var g=function(c,d){var e=a.sum(d,b.valueAccessor()),f=d.map(b.keyAccessor());return e>0?c.concat([{others:f,key:b.othersLabel(),value:e}]):c};return b.cappedKeyAccessor=function(a,c){return a.others?a.key:b.keyAccessor()(a,c)},b.cappedValueAccessor=function(a,c){return a.others?a.value:b.valueAccessor()(a,c)},b.data(function(a){if(d===1/0)return b._computeOrderedGroups(a.all());var c,f=a.all();if(f=b._computeOrderedGroups(f),d)if(e)c=f.slice(d),f=f.slice(0,d);else{var h=Math.max(0,f.length-d);c=f.slice(0,h),f=f.slice(h)}return g?g(f,c):f}),b.cap=function(a){return arguments.length?(d=a,b):d},b.takeFront=function(a){return arguments.length?(e=a,b):e},b.othersLabel=function(a){return arguments.length?(f=a,b):f},b.othersGrouper=function(a){return arguments.length?(g=a,b):g},c.override(b,"onClick",function(a){a.others&&b.filter([a.others]),b._onClick(a)}),b},c.bubbleMixin=function(b){var d=.3,e=10,f=!1,g=!1;b.BUBBLE_NODE_CLASS="node",b.BUBBLE_CLASS="bubble",b.MIN_RADIUS=10,b=c.colorMixin(b),b.renderLabel(!0),b.data(function(c){var d=c.all();if(f){var e=b.radiusValueAccessor();d.sort(function(b,c){return a.descending(e(b),e(c))})}return d});var h=a.scale.linear().domain([0,100]),i=function(a){return a.r};b.r=function(a){return arguments.length?(h=a,b):h},b.elasticRadius=function(a){return arguments.length?(g=a,b):g},b.calculateRadiusDomain=function(){g&&b.r().domain([b.rMin(),b.rMax()])},b.radiusValueAccessor=function(a){return arguments.length?(i=a,b):i},b.rMin=function(){var c=a.min(b.data(),function(a){
return b.radiusValueAccessor()(a)});return c},b.rMax=function(){var c=a.max(b.data(),function(a){return b.radiusValueAccessor()(a)});return c},b.bubbleR=function(a){var c=b.radiusValueAccessor()(a),d=b.r()(c);return(isNaN(d)||c<=0)&&(d=0),d};var j=function(a){return b.label()(a)},k=function(a){return b.bubbleR(a)>e},l=function(a){return k(a)?1:0},m=function(a){return k(a)?"all":"none"};b._doRenderLabel=function(a){if(b.renderLabel()){var d=a.select("text");d.empty()&&(d=a.append("text").attr("text-anchor","middle").attr("dy",".3em").on("click",b.onClick)),d.attr("opacity",0).attr("pointer-events",m).text(j),c.transition(d,b.transitionDuration(),b.transitionDelay()).attr("opacity",l)}},b.doUpdateLabels=function(a){if(b.renderLabel()){var d=a.select("text").attr("pointer-events",m).text(j);c.transition(d,b.transitionDuration(),b.transitionDelay()).attr("opacity",l)}};var n=function(a){return b.title()(a)};return b._doRenderTitles=function(a){if(b.renderTitle()){var c=a.select("title");c.empty()&&a.append("title").text(n)}},b.doUpdateTitles=function(a){b.renderTitle()&&a.select("title").text(n)},b.sortBubbleSize=function(a){return arguments.length?(f=a,b):f},b.minRadius=function(a){return arguments.length?(b.MIN_RADIUS=a,b):b.MIN_RADIUS},b.minRadiusWithLabel=function(a){return arguments.length?(e=a,b):e},b.maxBubbleRelativeSize=function(a){return arguments.length?(d=a,b):d},b.fadeDeselectedArea=function(){b.hasFilter()?b.selectAll("g."+b.BUBBLE_NODE_CLASS).each(function(a){b.isSelectedNode(a)?b.highlightSelected(this):b.fadeDeselected(this)}):b.selectAll("g."+b.BUBBLE_NODE_CLASS).each(function(){b.resetHighlight(this)})},b.isSelectedNode=function(a){return b.hasFilter(a.key)},b.onClick=function(a){var d=a.key;c.events.trigger(function(){b.filter(d),b.redrawGroup()})},b},c.pieChart=function(b,d){function e(){var b=a.min([W.width(),W.height()])/2;F=G&&G<b?G:b;var d,e=t(),g=v();if(a.sum(W.data(),W.valueAccessor())?(d=g(W.data()),H.classed(Q,!1)):(d=g([{key:R,value:1,others:[R]}]),H.classed(Q,!0)),H){var h=H.select("g."+O).selectAll("g."+M).data(d),i=H.select("g."+P).selectAll("text."+N).data(d);f(h,i,e,d),n(d,e),r(h,i),s(),c.transition(H,W.transitionDuration(),W.transitionDelay()).attr("transform","translate("+W.cx()+","+W.cy()+")")}}function f(a,b,c,d){var e=g(a);h(e,c),i(e),l(b,d,c)}function g(a){var b=a.enter().append("g").attr("class",function(a,b){return M+" _"+b});return b}function h(a,b){var d=a.append("path").attr("fill",A).on("click",B).attr("d",function(a,c){return C(a,c,b)}),e=c.transition(d,W.transitionDuration(),W.transitionDelay());e.attrTween&&e.attrTween("d",y)}function i(a){W.renderTitle()&&a.append("title").text(function(a){return W.title()(a.data)})}function j(a,b){W._applyLabelText(a),c.transition(a,W.transitionDuration(),W.transitionDelay()).attr("transform",function(a){return D(a,b)}).attr("text-anchor","middle")}function k(a,b){W.select("g.pie-slice._"+a).classed("highlight",b)}function l(a,b,c){if(W.renderLabel()){var d=a.enter().append("text").attr("class",function(a,b){var c=M+" "+N+" _"+b;return K&&(c+=" external"),c}).on("click",B).on("mouseover",function(a,b){k(b,!0)}).on("mouseout",function(a,b){k(b,!1)});j(d,c),K&&V&&m(b,c)}}function m(b,d){var e=H.selectAll("polyline."+M).data(b);e.enter().append("polyline").attr("class",function(a,b){return"pie-path _"+b+" "+M}).on("click",B).on("mouseover",function(a,b){k(b,!0)}).on("mouseout",function(a,b){k(b,!1)}),e.exit().remove();var f=a.svg.arc().outerRadius(F-T+K).innerRadius(F-T),g=c.transition(e,W.transitionDuration(),W.transitionDelay());g.attrTween?g.attrTween("points",function(b){var c=this._current||b;c={startAngle:c.startAngle,endAngle:c.endAngle};var e=a.interpolate(c,b);return this._current=e(0),function(a){var b=e(a);return[d.centroid(b),f.centroid(b)]}}):g.attr("points",function(a){return[d.centroid(a),f.centroid(a)]}),g.style("visibility",function(a){return a.endAngle-a.startAngle<1e-4?"hidden":"visible"})}function n(a,b){o(a,b),p(a,b),q(a)}function o(a,b){var d=H.selectAll("g."+M).data(a).select("path").attr("d",function(a,c){return C(a,c,b)}),e=c.transition(d,W.transitionDuration(),W.transitionDelay());e.attrTween&&e.attrTween("d",y),e.attr("fill",A)}function p(a,b){if(W.renderLabel()){var c=H.selectAll("text."+N).data(a);j(c,b),K&&V&&m(a,b)}}function q(a){W.renderTitle()&&H.selectAll("g."+M).data(a).select("title").text(function(a){return W.title()(a.data)})}function r(a,b){a.exit().remove(),b.exit().remove()}function s(){W.hasFilter()?W.selectAll("g."+M).each(function(a){u(a)?W.highlightSelected(this):W.fadeDeselected(this)}):W.selectAll("g."+M).each(function(){W.resetHighlight(this)})}function t(){return a.svg.arc().outerRadius(F-T).innerRadius(S)}function u(a){return W.hasFilter(W.cappedKeyAccessor(a.data))}function v(){return a.layout.pie().sort(null).value(W.cappedValueAccessor)}function w(a){var b=a.endAngle-a.startAngle;return isNaN(b)||b<U}function x(a){return 0===W.cappedValueAccessor(a)}function y(b){b.innerRadius=S;var c=this._current;c=z(c)?{startAngle:0,endAngle:0}:{startAngle:c.startAngle,endAngle:c.endAngle};var d=a.interpolate(c,b);return this._current=d(0),function(a){return C(d(a),0,t())}}function z(a){return!a||isNaN(a.startAngle)||isNaN(a.endAngle)}function A(a,b){return W.getColor(a.data,b)}function B(a,b){H.attr("class")!==Q&&W.onClick(a.data,b)}function C(a,b,c){var d=c(a,b);return d.indexOf("NaN")>=0&&(d="M0,0"),d}function D(b,c){var d;return d=K?a.svg.arc().outerRadius(F-T+K).innerRadius(F-T+K).centroid(b):c.centroid(b),isNaN(d[0])||isNaN(d[1])?"translate(0,0)":"translate("+d+")"}function E(b,c){W.selectAll("g.pie-slice").each(function(d){b.name===d.data.key&&a.select(this).classed("highlight",c)})}var F,G,H,I,J,K,L=.5,M="pie-slice",N="pie-label",O="pie-slice-group",P="pie-label-group",Q="empty-chart",R="empty",S=0,T=0,U=L,V=!1,W=c.capMixin(c.colorMixin(c.baseMixin({})));return W.colorAccessor(W.cappedKeyAccessor),W.title(function(a){return W.cappedKeyAccessor(a)+": "+W.cappedValueAccessor(a)}),W.slicesCap=W.cap,W.label(W.cappedKeyAccessor),W.renderLabel(!0),W.transitionDuration(350),W.transitionDelay(0),W._doRender=function(){return W.resetSvg(),H=W.svg().append("g").attr("transform","translate("+W.cx()+","+W.cy()+")"),H.append("g").attr("class",O),H.append("g").attr("class",P),e(),W},W._applyLabelText=function(a){a.text(function(a){var b=a.data;return!x(b)&&!w(a)||u(a)?W.label()(a.data):""})},W.externalRadiusPadding=function(a){return arguments.length?(T=a,W):T},W.innerRadius=function(a){return arguments.length?(S=a,W):S},W.radius=function(a){return arguments.length?(G=a,W):G},W.cx=function(a){return arguments.length?(I=a,W):I||W.width()/2},W.cy=function(a){return arguments.length?(J=a,W):J||W.height()/2},W._doRedraw=function(){return e(),W},W.minAngleForLabel=function(a){return arguments.length?(U=a,W):U},W.emptyTitle=function(a){return 0===arguments.length?R:(R=a,W)},W.externalLabels=function(a){return 0===arguments.length?K:(K=a?a:void 0,W)},W.drawPaths=function(a){return 0===arguments.length?V:(V=a,W)},W.legendables=function(){return W.data().map(function(a,b){var c={name:a.key,data:a.value,others:a.others,chart:W};return c.color=W.getColor(a,b),c})},W.legendHighlight=function(a){E(a,!0)},W.legendReset=function(a){E(a,!1)},W.legendToggle=function(a){W.onClick({key:a.name,others:a.others})},W.anchor(b,d)},c.barChart=function(b,d){function e(a){return c.utils.safeNumber(Math.abs(n.y()(a.y+a.y0)-n.y()(a.y0)))}function f(a,b,d){var f=a.selectAll("text.barLabel").data(d.values,c.pluck("x"));f.enter().append("text").attr("class","barLabel").attr("text-anchor","middle"),n.isOrdinal()&&(f.on("click",n.onClick),f.attr("cursor","pointer")),c.transition(f,n.transitionDuration(),n.transitionDelay()).attr("x",function(a){var b=n.x()(a.x);return p||(b+=j/2),c.utils.safeNumber(b)}).attr("y",function(a){var b=n.y()(a.y+a.y0);return a.y<0&&(b-=e(a)),c.utils.safeNumber(b-m)}).text(function(a){return n.label()(a)}),c.transition(f.exit(),n.transitionDuration(),n.transitionDelay()).attr("height",0).remove()}function g(a,b,d){var f=a.selectAll("rect.bar").data(d.values,c.pluck("x")),g=f.enter().append("rect").attr("class","bar").attr("fill",c.pluck("data",n.getColor)).attr("y",n.yAxisHeight()).attr("height",0);n.renderTitle()&&g.append("title").text(c.pluck("data",n.title(d.name))),n.isOrdinal()&&f.on("click",n.onClick),c.transition(f,n.transitionDuration(),n.transitionDelay()).attr("x",function(a){var b=n.x()(a.x);return p&&(b-=j/2),n.isOrdinal()&&void 0!==o&&(b+=o/2),c.utils.safeNumber(b)}).attr("y",function(a){var b=n.y()(a.y+a.y0);return a.y<0&&(b-=e(a)),c.utils.safeNumber(b)}).attr("width",j).attr("height",function(a){return e(a)}).attr("fill",c.pluck("data",n.getColor)).select("title").text(c.pluck("data",n.title(d.name))),c.transition(f.exit(),n.transitionDuration(),n.transitionDelay()).attr("x",function(a){return n.x()(a.x)}).attr("width",.9*j).remove()}function h(){if(void 0===j){var a=n.xUnitCount();j=n.isOrdinal()&&void 0===o?Math.floor(n.x().rangeBand()):o?Math.floor((n.xAxisLength()-(a-1)*o)/a):Math.floor(n.xAxisLength()/(1+n.barPadding())/a),(j===1/0||isNaN(j)||j<k)&&(j=k)}}function i(b,c){return function(){var d=a.select(this),e=d.attr("fill")===b;return c?!e:e}}var j,k=1,l=2,m=3,n=c.stackMixin(c.coordinateGridMixin({})),o=l,p=!1,q=!1;return c.override(n,"rescale",function(){return n._rescale(),j=void 0,n}),c.override(n,"render",function(){return n.round()&&p&&!q&&c.logger.warn("By default, brush rounding is disabled if bars are centered. See dc.js bar chart API documentation for details."),n._render()}),n.label(function(a){return c.utils.printSingleValue(a.y0+a.y)},!1),n.plotData=function(){var b=n.chartBodyG().selectAll("g.stack").data(n.data());h(),b.enter().append("g").attr("class",function(a,b){return"stack _"+b});var c=b.size()-1;b.each(function(b,d){var e=a.select(this);g(e,d,b),n.renderLabel()&&c===d&&f(e,d,b)})},n.fadeDeselectedArea=function(){var a=n.chartBodyG().selectAll("rect.bar"),b=n.brush().extent();if(n.isOrdinal())n.hasFilter()?(a.classed(c.constants.SELECTED_CLASS,function(a){return n.hasFilter(a.x)}),a.classed(c.constants.DESELECTED_CLASS,function(a){return!n.hasFilter(a.x)})):(a.classed(c.constants.SELECTED_CLASS,!1),a.classed(c.constants.DESELECTED_CLASS,!1));else if(n.brushIsEmpty(b))a.classed(c.constants.DESELECTED_CLASS,!1);else{var d=b[0],e=b[1];a.classed(c.constants.DESELECTED_CLASS,function(a){return a.x<d||a.x>=e})}},n.centerBar=function(a){return arguments.length?(p=a,n):p},c.override(n,"onClick",function(a){n._onClick(a.data)}),n.barPadding=function(a){return arguments.length?(n._rangeBandPadding(a),o=void 0,n):n._rangeBandPadding()},n._useOuterPadding=function(){return void 0===o},n.outerPadding=n._outerRangeBandPadding,n.gap=function(a){return arguments.length?(o=a,n):o},n.extendBrush=function(){var a=n.brush().extent();return!n.round()||p&&!q||(a[0]=a.map(n.round())[0],a[1]=a.map(n.round())[1],n.chartBodyG().select(".brush").call(n.brush().extent(a))),a},n.alwaysUseRounding=function(a){return arguments.length?(q=a,n):q},n.legendHighlight=function(a){n.isLegendableHidden(a)||n.g().selectAll("rect.bar").classed("highlight",i(a.color)).classed("fadeout",i(a.color,!0))},n.legendReset=function(){n.g().selectAll("rect.bar").classed("highlight",!1).classed("fadeout",!1)},c.override(n,"xAxisMax",function(){var a=this._xAxisMax();if("resolution"in n.xUnits()){var b=n.xUnits().resolution;a+=b}return a}),n.anchor(b,d)},c.lineChart=function(b,d){function e(a,b){return B.getColor.call(a,a.values,b)}function f(b,d){var f=a.svg.line().x(function(a){return B.x()(a.x)}).y(function(a){return B.y()(a.y+a.y0)}).interpolate(H).tension(I);s&&f.defined(s);var g=b.append("path").attr("class","line").attr("stroke",e);t&&g.attr("stroke-dasharray",t),c.transition(d.select("path.line"),B.transitionDuration(),B.transitionDelay()).attr("stroke",e).attr("d",function(a){return h(f(a.values))})}function g(b,d){if(C){var f=a.svg.area().x(function(a){return B.x()(a.x)}).y(function(a){return B.y()(a.y+a.y0)}).y0(function(a){return B.y()(a.y0)}).interpolate(H).tension(I);s&&f.defined(s),b.append("path").attr("class","area").attr("fill",e).attr("d",function(a){return h(f(a.values))}),c.transition(d.select("path.area"),B.transitionDuration(),B.transitionDelay()).attr("fill",e).attr("d",function(a){return h(f(a.values))})}}function h(a){return!a||a.indexOf("NaN")>=0?"M0,0":a}function i(b,d){if("always"===B.xyTipsOn()||!B.brushOn()&&B.xyTipsOn()){var e=v+"-list",f=b.select("g."+e);f.empty()&&(f=b.append("g").attr("class",e)),d.each(function(b,d){var e=b.values;s&&(e=e.filter(s));var g=f.select("g."+v+"._"+d);g.empty()&&(g=f.append("g").attr("class",v+" _"+d)),k(g);var h=g.selectAll("circle."+w).data(e,c.pluck("x"));h.enter().append("circle").attr("class",w).attr("r",n()).style("fill-opacity",F).style("stroke-opacity",G).attr("fill",B.getColor).on("mousemove",function(){var b=a.select(this);l(b),m(b,g)}).on("mouseout",function(){var b=a.select(this);o(b),p(g)}),h.call(q,b),c.transition(h,B.transitionDuration()).attr("cx",function(a){return c.utils.safeNumber(B.x()(a.x))}).attr("cy",function(a){return c.utils.safeNumber(B.y()(a.y+a.y0))}).attr("fill",B.getColor),h.exit().remove()})}}function j(b){b.each(function(b,d){var e=a.select(this),f=e.selectAll("text.lineLabel").data(b.values,c.pluck("x"));f.enter().append("text").attr("class","lineLabel").attr("text-anchor","middle"),c.transition(f,B.transitionDuration()).attr("x",function(a){return c.utils.safeNumber(B.x()(a.x))}).attr("y",function(a){var b=B.y()(a.y+a.y0)-A;return c.utils.safeNumber(b)}).text(function(a){return B.label()(a)}),c.transition(f.exit(),B.transitionDuration()).attr("height",0).remove()})}function k(a){var b=a.select("path."+x).empty()?a.append("path").attr("class",x):a.select("path."+x);b.style("display","none").attr("stroke-dasharray","5,5");var c=a.select("path."+y).empty()?a.append("path").attr("class",y):a.select("path."+y);c.style("display","none").attr("stroke-dasharray","5,5")}function l(a){return a.style("fill-opacity",.8),a.style("stroke-opacity",.8),a.attr("r",D),a}function m(a,b){var c=a.attr("cx"),d=a.attr("cy"),e=B._yAxisX()-B.margins().left,f="M"+e+" "+d+"L"+c+" "+d,g="M"+c+" "+B.yAxisHeight()+"L"+c+" "+d;b.select("path."+x).style("display","").attr("d",f),b.select("path."+y).style("display","").attr("d",g)}function n(){return E||D}function o(a){a.style("fill-opacity",F).style("stroke-opacity",G).attr("r",n())}function p(a){a.select("path."+x).style("display","none"),a.select("path."+y).style("display","none")}function q(a,b){B.renderTitle()&&(a.select("title").remove(),a.append("title").text(c.pluck("data",B.title(b.name))))}function r(b,c,d){return function(){var e=a.select(this),f=e.attr("stroke")===b&&e.attr("stroke-dasharray")===(c instanceof Array?c.join(","):null)||e.attr("fill")===b;return d?!f:f}}var s,t,u=5,v="dc-tooltip",w="dot",x="yRef",y="xRef",z=1e-6,A=3,B=c.stackMixin(c.coordinateGridMixin({})),C=!1,D=u,E=null,F=z,G=z,H="linear",I=.7,J=!0;return B.transitionDuration(500),B.transitionDelay(0),B._rangeBandPadding(1),B.plotData=function(){var a=B.chartBodyG(),b=a.select("g.stack-list");b.empty()&&(b=a.append("g").attr("class","stack-list"));var c=b.selectAll("g.stack").data(B.data()),d=c.enter().append("g").attr("class",function(a,b){return"stack _"+b});f(d,c),g(d,c),i(a,c),B.renderLabel()&&j(c)},B.interpolate=function(a){return arguments.length?(H=a,B):H},B.tension=function(a){return arguments.length?(I=a,B):I},B.defined=function(a){return arguments.length?(s=a,B):s},B.dashStyle=function(a){return arguments.length?(t=a,B):t},B.renderArea=function(a){return arguments.length?(C=a,B):C},B.label(function(a){return c.utils.printSingleValue(a.y0+a.y)},!1),B.xyTipsOn=function(a){return arguments.length?(J=a,B):J},B.dotRadius=function(a){return arguments.length?(D=a,B):D},B.renderDataPoints=function(a){return arguments.length?(a?(F=a.fillOpacity||.8,G=a.strokeOpacity||.8,E=a.radius||2):(F=z,G=z,E=null),B):{fillOpacity:F,strokeOpacity:G,radius:E}},B.legendHighlight=function(a){B.isLegendableHidden(a)||B.g().selectAll("path.line, path.area").classed("highlight",r(a.color,a.dashstyle)).classed("fadeout",r(a.color,a.dashstyle,!0))},B.legendReset=function(){B.g().selectAll("path.line, path.area").classed("highlight",!1).classed("fadeout",!1)},c.override(B,"legendables",function(){var a=B._legendables();return t?a.map(function(a){return a.dashstyle=t,a}):a}),B.anchor(b,d)},c.dataCount=function(b,d){var e=a.format(",d"),f=c.baseMixin({}),g={some:"",all:""};return f.html=function(a){return arguments.length?(a.all&&(g.all=a.all),a.some&&(g.some=a.some),f):g},f.formatNumber=function(a){return arguments.length?(e=a,f):e},f._doRender=function(){var a=f.dimension().size(),b=f.group().value(),c=e(a),d=e(b);return a===b&&""!==g.all?f.root().html(g.all.replace("%total-count",c).replace("%filter-count",d)):""!==g.some?f.root().html(g.some.replace("%total-count",c).replace("%filter-count",d)):(f.selectAll(".total-count").text(c),f.selectAll(".filter-count").text(d)),f},f._doRedraw=function(){return f._doRender()},f.anchor(b,d)},c.dataTable=function(b,d){function e(){var a=!0;if(p.forEach(function(b){a&="function"==typeof b}),!a){var b=n.selectAll("thead").data([0]);b.enter().append("thead"),b.exit().remove();var c=b.selectAll("tr").data([0]);c.enter().append("tr"),c.exit().remove();var d=c.selectAll("th").data(p);d.enter().append("th"),d.exit().remove(),d.attr("class",m).html(function(a){return n._doColumnHeaderFormat(a)})}var e=n.root().selectAll("tbody").data(f(),function(a){return n.keyAccessor()(a)}),g=e.enter().append("tbody");return t===!0&&g.append("tr").attr("class",l).append("td").attr("class",i).attr("colspan",p.length).html(function(a){return n.keyAccessor()(a)}),e.exit().remove(),g}function f(){var b;return b=r===a.ascending?n.dimension().bottom(o):n.dimension().top(o),a.nest().key(n.group()).sortKeys(r).entries(b.sort(function(a,b){return r(q(a),q(b))}).slice(s,h))}function g(a){var b=a.order().selectAll("tr."+j).data(function(a){return a.values}),c=b.enter().append("tr").attr("class",j);return p.forEach(function(a,b){c.append("td").attr("class",k+" _"+b).html(function(b){return n._doColumnValueFormat(a,b)})}),b.exit().remove(),b}var h,i="dc-table-label",j="dc-table-row",k="dc-table-column",l="dc-table-group",m="dc-table-head",n=c.baseMixin({}),o=25,p=[],q=function(a){return a},r=a.ascending,s=0,t=!0;return n._doRender=function(){return n.selectAll("tbody").remove(),g(e()),n},n._doColumnValueFormat=function(a,b){return"function"==typeof a?a(b):"string"==typeof a?b[a]:a.format(b)},n._doColumnHeaderFormat=function(a){return"function"==typeof a?n._doColumnHeaderFnToString(a):"string"==typeof a?n._doColumnHeaderCapitalize(a):String(a.label)},n._doColumnHeaderCapitalize=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},n._doColumnHeaderFnToString=function(a){var b=String(a),c=b.indexOf("return ");if(c>=0){var d=b.lastIndexOf(";");if(d>=0){b=b.substring(c+7,d);var e=b.indexOf("numberFormat");e>=0&&(b=b.replace("numberFormat",""))}}return b},n._doRedraw=function(){return n._doRender()},n.size=function(a){return arguments.length?(o=a,n):o},n.beginSlice=function(a){return arguments.length?(s=a,n):s},n.endSlice=function(a){return arguments.length?(h=a,n):h},n.columns=function(a){return arguments.length?(p=a,n):p},n.sortBy=function(a){return arguments.length?(q=a,n):q},n.order=function(a){return arguments.length?(r=a,n):r},n.showGroups=function(a){return arguments.length?(t=a,n):t},n.anchor(b,d)},c.dataGrid=function(b,d){function e(){var a=m.root().selectAll("div."+l).data(f(),function(a){return m.keyAccessor()(a)}),b=a.enter().append("div").attr("class",l);return s&&b.html(function(a){return s(a)}),a.exit().remove(),b}function f(){var b=m.dimension().top(n);return a.nest().key(m.group()).sortKeys(q).entries(b.sort(function(a,b){return q(p(a),p(b))}).slice(r,h))}function g(a){var b=a.order().selectAll("div."+j).data(function(a){return a.values});return b.enter().append("div").attr("class",j).html(function(a){return o(a)}),b.exit().remove(),b}var h,i="dc-grid-label",j="dc-grid-item",k="dc-grid-group",l="dc-grid-top",m=c.baseMixin({}),n=999,o=function(a){return"you need to provide an html() handling param:  "+JSON.stringify(a)},p=function(a){return a},q=a.ascending,r=0,s=function(a){return"<div class='"+k+"'><h1 class='"+i+"'>"+m.keyAccessor()(a)+"</h1></div>"};return m._doRender=function(){return m.selectAll("div."+l).remove(),g(e()),m},m._doRedraw=function(){return m._doRender()},m.beginSlice=function(a){return arguments.length?(r=a,m):r},m.endSlice=function(a){return arguments.length?(h=a,m):h},m.size=function(a){return arguments.length?(n=a,m):n},m.html=function(a){return arguments.length?(o=a,m):o},m.htmlGroup=function(a){return arguments.length?(s=a,m):s},m.sortBy=function(a){return arguments.length?(p=a,m):p},m.order=function(a){return arguments.length?(q=a,m):q},m.anchor(b,d)},c.bubbleChart=function(a,b){function d(a){var b=a.enter().append("g");b.attr("class",i.BUBBLE_NODE_CLASS).attr("transform",j).append("circle").attr("class",function(a,b){return i.BUBBLE_CLASS+" _"+b}).on("click",i.onClick).attr("fill",i.getColor).attr("r",0),c.transition(a,i.transitionDuration(),i.transitionDelay()).select("circle."+i.BUBBLE_CLASS).attr("r",function(a){return i.bubbleR(a)}).attr("opacity",function(a){return i.bubbleR(a)>0?1:0}),i._doRenderLabel(b),i._doRenderTitles(b)}function e(a){c.transition(a,i.transitionDuration(),i.transitionDelay()).attr("transform",j).select("circle."+i.BUBBLE_CLASS).attr("fill",i.getColor).attr("r",function(a){return i.bubbleR(a)}).attr("opacity",function(a){return i.bubbleR(a)>0?1:0}),i.doUpdateLabels(a),i.doUpdateTitles(a)}function f(a){a.exit().remove()}function g(a){var b=i.x()(i.keyAccessor()(a));return isNaN(b)&&(b=0),b}function h(a){var b=i.y()(i.valueAccessor()(a));return isNaN(b)&&(b=0),b}var i=c.bubbleMixin(c.coordinateGridMixin({}));i.transitionDuration(750),i.transitionDelay(0);var j=function(a){return"translate("+g(a)+","+h(a)+")"};return i.plotData=function(){i.calculateRadiusDomain(),i.r().range([i.MIN_RADIUS,i.xAxisLength()*i.maxBubbleRelativeSize()]);var a=i.data(),b=i.chartBodyG().selectAll("g."+i.BUBBLE_NODE_CLASS).data(a,function(a){return a.key});i.sortBubbleSize()&&b.order(),d(b),e(b),f(b),i.fadeDeselectedArea()},i.renderBrush=function(){},i.redrawBrush=function(){i.fadeDeselectedArea()},i.anchor(a,b)},c.compositeChart=function(b,d){function e(a,b){var c,d,e,g,h;return a&&(c=m(),d=p()),b&&(e=n(),g=q()),w.alignYAxes()&&a&&b&&(h=f(c,d,e,g)),h||{lyAxisMin:c,lyAxisMax:d,ryAxisMin:e,ryAxisMax:g}}function f(a,b,c,d){var e=(d-c)/(b-a);return{lyAxisMin:Math.min(a,c/e),lyAxisMax:Math.max(b,d/e),ryAxisMin:Math.min(c,a*e),ryAxisMax:Math.max(d,b*e)}}function g(b){var c=void 0===w.rightY()||w.elasticY(),d=c||w.resizing();void 0===w.rightY()&&w.rightY(a.scale.linear()),c&&w.rightY().domain([b.ryAxisMin,b.ryAxisMax]),d&&w.rightY().rangeRound([w.yAxisHeight(),0]),w.rightY().range([w.yAxisHeight(),0]),w.rightYAxis(w.rightYAxis().scale(w.rightY())),w.rightYAxis().orient("right")}function h(b){var c=void 0===w.y()||w.elasticY(),d=c||w.resizing();void 0===w.y()&&w.y(a.scale.linear()),c&&w.y().domain([b.lyAxisMin,b.lyAxisMax]),d&&w.y().rangeRound([w.yAxisHeight(),0]),w.y().range([w.yAxisHeight(),0]),w.yAxis(w.yAxis().scale(w.y())),w.yAxis().orient("left")}function i(a,b){a._generateG(w.g()),a.g().attr("class",u+" _"+b)}function j(){return x.filter(function(a){return!a.useRightYAxis()})}function k(){return x.filter(function(a){return a.useRightYAxis()})}function l(a){return a.map(function(a){return a.yAxisMin()})}function m(){return a.min(l(j()))}function n(){return a.min(l(k()))}function o(a){return a.map(function(a){return a.yAxisMax()})}function p(){return c.utils.add(a.max(o(j())),w.yAxisPadding())}function q(){return c.utils.add(a.max(o(k())),w.yAxisPadding())}function r(){return x.map(function(a){return a.xAxisMin()})}function s(){return x.map(function(a){return a.xAxisMax()})}var t,u="sub",v=12,w=c.coordinateGridMixin({}),x=[],y={},z=!1,A=!0,B=!1,C=a.svg.axis(),D=0,E=v,F=!1;return w._mandatoryAttributes([]),w.transitionDuration(500),w.transitionDelay(0),c.override(w,"_generateG",function(){for(var a=this.__generateG(),b=0;b<x.length;++b){var c=x[b];i(c,b),c.dimension()||c.dimension(w.dimension()),c.group()||c.group(w.group()),c.chartGroup(w.chartGroup()),c.svg(w.svg()),c.xUnits(w.xUnits()),c.transitionDuration(w.transitionDuration(),w.transitionDelay()),c.brushOn(w.brushOn()),c.renderTitle(w.renderTitle()),c.elasticX(w.elasticX())}return a}),w._brushing=function(){for(var a=w.extendBrush(),b=w.brushIsEmpty(a),c=0;c<x.length;++c)x[c].replaceFilter(b?null:a)},w._prepareYAxis=function(){var a=0!==j().length,b=0!==k().length,c=e(a,b);a&&h(c),b&&g(c),j().length>0&&!F?w._renderHorizontalGridLinesForAxis(w.g(),w.y(),w.yAxis()):k().length>0&&w._renderHorizontalGridLinesForAxis(w.g(),t,C)},w.renderYAxis=function(){0!==j().length&&(w.renderYAxisAt("y",w.yAxis(),w.margins().left),w.renderYAxisLabel("y",w.yAxisLabel(),-90)),0!==k().length&&(w.renderYAxisAt("yr",w.rightYAxis(),w.width()-w.margins().right),w.renderYAxisLabel("yr",w.rightYAxisLabel(),90,w.width()-E))},w.plotData=function(){for(var a=0;a<x.length;++a){var b=x[a];b.g()||i(b,a),z&&b.colors(w.colors()),b.x(w.x()),b.xAxis(w.xAxis()),b.useRightYAxis()?(b.y(w.rightY()),b.yAxis(w.rightYAxis())):(b.y(w.y()),b.yAxis(w.yAxis())),b.plotData(),b._activateRenderlets()}},w.useRightAxisGridLines=function(a){return arguments?(F=a,w):F},w.childOptions=function(a){return arguments.length?(y=a,x.forEach(function(a){a.options(y)}),w):y},w.fadeDeselectedArea=function(){for(var a=0;a<x.length;++a){var b=x[a];b.brush(w.brush()),b.fadeDeselectedArea()}},w.rightYAxisLabel=function(a,b){return arguments.length?(D=a,w.margins().right-=E,E=void 0===b?v:b,w.margins().right+=E,w):D},w.compose=function(a){return x=a,x.forEach(function(a){a.height(w.height()),a.width(w.width()),a.margins(w.margins()),A&&a.title(w.title()),a.options(y)}),w},w.children=function(){return x},w.shareColors=function(a){return arguments.length?(z=a,w):z},w.shareTitle=function(a){return arguments.length?(A=a,w):A},w.rightY=function(a){return arguments.length?(t=a,w.rescale(),w):t},w.alignYAxes=function(a){return arguments.length?(B=a,w.rescale(),w):B},delete w.yAxisMin,delete w.yAxisMax,c.override(w,"xAxisMin",function(){return c.utils.subtract(a.min(r()),w.xAxisPadding())}),c.override(w,"xAxisMax",function(){return c.utils.add(a.max(s()),w.xAxisPadding())}),w.legendables=function(){return x.reduce(function(a,b){return z&&b.colors(w.colors()),a.push.apply(a,b.legendables()),a},[])},w.legendHighlight=function(a){for(var b=0;b<x.length;++b){var c=x[b];c.legendHighlight(a)}},w.legendReset=function(a){for(var b=0;b<x.length;++b){var c=x[b];c.legendReset(a)}},w.legendToggle=function(){console.log("composite should not be getting legendToggle itself")},w.rightYAxis=function(a){return arguments.length?(C=a,w):C},w.anchor(b,d)},c.seriesChart=function(b,d){function e(b,c){return a.ascending(i.keyAccessor()(b),i.keyAccessor()(c))}function f(a){j[a].g()&&j[a].g().remove(),delete j[a]}function g(){Object.keys(j).map(f),j={}}var h,i=c.compositeChart(b,d),j={},k=c.lineChart,l=a.ascending,m=e;return i._mandatoryAttributes().push("seriesAccessor","chart"),i.shareColors(!0),i._preprocessData=function(){var b,c=[],e=a.nest().key(h);l&&e.sortKeys(l),m&&e.sortValues(m);var g=e.entries(i.data()),n=g.map(function(e,f){var g=j[e.key]||k.call(i,i,d,e.key,f);return j[e.key]||(b=!0),j[e.key]=g,c.push(e.key),g.dimension(i.dimension()).group({all:a.functor(e.values)},e.key).keyAccessor(i.keyAccessor()).valueAccessor(i.valueAccessor()).brushOn(i.brushOn())});Object.keys(j).filter(function(a){return c.indexOf(a)===-1}).forEach(function(a){f(a),b=!0}),i._compose(n),b&&i.legend()&&i.legend().render()},i.chart=function(a){return arguments.length?(k=a,g(),i):k},i.seriesAccessor=function(a){return arguments.length?(h=a,g(),i):h},i.seriesSort=function(a){return arguments.length?(l=a,g(),i):l},i.valueSort=function(a){return arguments.length?(m=a,g(),i):m},i._compose=i.compose,delete i.compose,i},c.geoChoroplethChart=function(b,d){function e(a){var b=f();if(g(a)){var c=h(a);n(c,a,b),o(c,a,b)}}function f(){for(var a={},b=p.data(),c=0;c<b.length;++c)a[p.keyAccessor()(b[c])]=p.valueAccessor()(b[c]);return a}function g(a){return m(a).keyAccessor}function h(a){var b=p.svg().selectAll(i(a)).classed("selected",function(b){return j(a,b)}).classed("deselected",function(b){return k(a,b)}).attr("class",function(b){var d=m(a).name,e=c.utils.nameToId(m(a).keyAccessor(b)),f=d+" "+e;return j(a,b)&&(f+=" selected"),k(a,b)&&(f+=" deselected"),f});return b}function i(a){return"g.layer"+a+" g."+m(a).name}function j(a,b){return p.hasFilter()&&p.hasFilter(l(a,b))}function k(a,b){return p.hasFilter()&&!p.hasFilter(l(a,b))}function l(a,b){return m(a).keyAccessor(b)}function m(a){return s[a]}function n(b,d,e){var f=b.select("path").attr("fill",function(){var b=a.select(this).attr("fill");return b?b:"none"}).on("click",function(a){return p.onClick(a,d)});c.transition(f,p.transitionDuration(),p.transitionDelay()).attr("fill",function(a,b){return p.getColor(e[m(d).keyAccessor(a)],b)})}function o(a,b,c){p.renderTitle()&&a.selectAll("title").text(function(a){var d=l(b,a),e=c[d];return p.title()({key:d,value:e})})}var p=c.colorMixin(c.baseMixin({}));p.colorAccessor(function(a){return a||0});var q,r=a.geo.path(),s=[];return p._doRender=function(){p.resetSvg();for(var a=0;a<s.length;++a){var b=p.svg().append("g").attr("class","layer"+a),c=b.selectAll("g."+m(a).name).data(m(a).data).enter().append("g").attr("class",m(a).name);c.append("path").attr("fill","white").attr("d",r),c.append("title"),e(a)}q=!1},p.onClick=function(a,b){var d=m(b).keyAccessor(a);c.events.trigger(function(){p.filter(d),p.redrawGroup()})},p._doRedraw=function(){for(var a=0;a<s.length;++a)e(a),q&&p.svg().selectAll("g."+m(a).name+" path").attr("d",r);q=!1},p.overlayGeoJson=function(a,b,c){for(var d=0;d<s.length;++d)if(s[d].name===b)return s[d].data=a,s[d].keyAccessor=c,p;return s.push({name:b,data:a,keyAccessor:c}),p},p.projection=function(a){return r.projection(a),q=!0,p},p.geoJsons=function(){return s},p.geoPath=function(){return r},p.removeGeoJson=function(a){for(var b=[],c=0;c<s.length;++c){var d=s[c];d.name!==a&&b.push(d)}return s=b,p},p.anchor(b,d)},c.bubbleOverlay=function(b,d){function e(){return j=n.select("g."+k),j.empty()&&(j=n.svg().append("g").attr("class",k)),j}function f(){var a=g();n.calculateRadiusDomain(),o.forEach(function(b){var d=h(b,a),e=d.select("circle."+m);e.empty()&&(e=d.append("circle").attr("class",m).attr("r",0).attr("fill",n.getColor).on("click",n.onClick)),c.transition(e,n.transitionDuration(),n.transitionDelay()).attr("r",function(a){return n.bubbleR(a)}),n._doRenderLabel(d),n._doRenderTitles(d)})}function g(){var a={};return n.data().forEach(function(b){a[n.keyAccessor()(b)]=b}),a}function h(a,b){var d=l+" "+c.utils.nameToId(a.name),e=j.select("g."+c.utils.nameToId(a.name));return e.empty()&&(e=j.append("g").attr("class",d).attr("transform","translate("+a.x+","+a.y+")")),e.datum(b[a.name]),e}function i(){var a=g();n.calculateRadiusDomain(),o.forEach(function(b){var d=h(b,a),e=d.select("circle."+m);c.transition(e,n.transitionDuration(),n.transitionDelay()).attr("r",function(a){return n.bubbleR(a)}).attr("fill",n.getColor),n.doUpdateLabels(d),n.doUpdateTitles(d)})}var j,k="bubble-overlay",l="node",m="bubble",n=c.bubbleMixin(c.baseMixin({})),o=[];return n.transitionDuration(750),n.transitionDelay(0),n.radiusValueAccessor(function(a){return a.value}),n.point=function(a,b,c){return o.push({name:a,x:b,y:c}),n},n._doRender=function(){return j=e(),n.r().range([n.MIN_RADIUS,n.width()*n.maxBubbleRelativeSize()]),f(),n.fadeDeselectedArea(),n},n._doRedraw=function(){return i(),n.fadeDeselectedArea(),n},n.debug=function(b){if(b){var d=n.select("g."+c.constants.DEBUG_GROUP_CLASS);
d.empty()&&(d=n.svg().append("g").attr("class",c.constants.DEBUG_GROUP_CLASS));var e=d.append("text").attr("x",10).attr("y",20);d.append("rect").attr("width",n.width()).attr("height",n.height()).on("mousemove",function(){var b=a.mouse(d.node()),c=b[0]+", "+b[1];e.text(c)})}else n.selectAll(".debug").remove();return n},n.anchor(b,d),n},c.rowChart=function(b,d){function e(){if(!t||u){var b=a.extent(v,G.cappedValueAccessor);b[0]>0&&(b[0]=0),b[1]<0&&(b[1]=0),t=a.scale.linear().domain(b).range([0,G.effectiveWidth()])}H.scale(t)}function f(){var a=s.select("g.axis");e(),a.empty()&&(a=s.append("g").attr("class","axis")),a.attr("transform","translate(0, "+G.effectiveHeight()+")"),c.transition(a,G.transitionDuration(),G.transitionDelay()).call(H)}function g(){s.selectAll("g.tick").select("line.grid-line").remove(),s.selectAll("g.tick").append("line").attr("class","grid-line").attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",function(){return-G.effectiveHeight()})}function h(){v=G.data(),f(),g();var a=s.selectAll("g."+D).data(v);i(a),j(a),l(a)}function i(a){var b=a.enter().append("g").attr("class",function(a,b){return D+" _"+b});b.append("rect").attr("width",0),n(b)}function j(a){a.exit().remove()}function k(){var a=t(0);return a===-(1/0)||a!==a?t(1):a}function l(a){var b,d=v.length;b=C?C:(G.effectiveHeight()-(d+1)*B)/d,y||(x=b/2);var e=a.attr("transform",function(a,c){return"translate(0,"+((c+1)*B+c*b)+")"}).select("rect").attr("height",b).attr("fill",G.getColor).on("click",p).classed("deselected",function(a){return!!G.hasFilter()&&!r(a)}).classed("selected",function(a){return!!G.hasFilter()&&r(a)});c.transition(e,G.transitionDuration(),G.transitionDelay()).attr("width",function(a){return Math.abs(k()-t(G.valueAccessor()(a)))}).attr("transform",q),m(a),o(a)}function m(a){G.renderTitle()&&(a.select("title").remove(),a.append("title").text(G.title()))}function n(a){G.renderLabel()&&a.append("text").on("click",p),G.renderTitleLabel()&&a.append("text").attr("class",E).on("click",p)}function o(a){if(G.renderLabel()){var b=a.select("text").attr("x",w).attr("y",x).attr("dy",z).on("click",p).attr("class",function(a,b){return D+" _"+b}).text(function(a){return G.label()(a)});c.transition(b,G.transitionDuration(),G.transitionDelay()).attr("transform",q)}if(G.renderTitleLabel()){var d=a.select("."+E).attr("x",G.effectiveWidth()-A).attr("y",x).attr("dy",z).attr("text-anchor","end").on("click",p).attr("class",function(a,b){return E+" _"+b}).text(function(a){return G.title()(a)});c.transition(d,G.transitionDuration(),G.transitionDelay()).attr("transform",q)}}function p(a){G.onClick(a)}function q(a){var b=t(G.cappedValueAccessor(a)),c=k(),d=b>c?c:b;return"translate("+d+",0)"}function r(a){return G.hasFilter(G.cappedKeyAccessor(a))}var s,t,u,v,w=10,x=15,y=!1,z="0.35em",A=2,B=5,C=!1,D="row",E="titlerow",F=!1,G=c.capMixin(c.marginMixin(c.colorMixin(c.baseMixin({})))),H=a.svg.axis().orient("bottom");return G.rowsCap=G.cap,G._doRender=function(){return G.resetSvg(),s=G.svg().append("g").attr("transform","translate("+G.margins().left+","+G.margins().top+")"),h(),G},G.title(function(a){return G.cappedKeyAccessor(a)+": "+G.cappedValueAccessor(a)}),G.label(G.cappedKeyAccessor),G.x=function(a){return arguments.length?(t=a,G):t},G.renderTitleLabel=function(a){return arguments.length?(F=a,G):F},G._doRedraw=function(){return h(),G},G.xAxis=function(){return H},G.fixedBarHeight=function(a){return arguments.length?(C=a,G):C},G.gap=function(a){return arguments.length?(B=a,G):B},G.elasticX=function(a){return arguments.length?(u=a,G):u},G.labelOffsetX=function(a){return arguments.length?(w=a,G):w},G.labelOffsetY=function(a){return arguments.length?(x=a,y=!0,G):x},G.titleLabelOffsetX=function(a){return arguments.length?(A=a,G):A},G.anchor(b,d)},c.legend=function(){function a(){return k+j}var b,d,e,f=2,g={},h=0,i=0,j=12,k=5,l=!1,m=560,n=70,o=!1,p=c.pluck("name");return g.parent=function(a){return arguments.length?(b=a,g):b},g.render=function(){b.svg().select("g.dc-legend").remove(),e=b.svg().append("g").attr("class","dc-legend").attr("transform","translate("+h+","+i+")");var g=b.legendables();void 0!==d&&(g=g.slice(0,d));var q=e.selectAll("g.dc-legend-item").data(g).enter().append("g").attr("class","dc-legend-item").on("mouseover",function(a){b.legendHighlight(a)}).on("mouseout",function(a){b.legendReset(a)}).on("click",function(a){a.chart.legendToggle(a)});e.selectAll("g.dc-legend-item").classed("fadeout",function(a){return a.chart.isLegendableHidden(a)}),g.some(c.pluck("dashstyle"))?q.append("line").attr("x1",0).attr("y1",j/2).attr("x2",j).attr("y2",j/2).attr("stroke-width",2).attr("stroke-dasharray",c.pluck("dashstyle")).attr("stroke",c.pluck("color")):q.append("rect").attr("width",j).attr("height",j).attr("fill",function(a){return a?a.color:"blue"}),q.append("text").text(p).attr("x",j+f).attr("y",function(){return j/2+(this.clientHeight?this.clientHeight:13)/2-2});var r=0,s=0;q.attr("transform",function(b,c){if(l){var d=o===!0?this.getBBox().width+k:n;r+d>m&&r>0&&(++s,r=0);var e="translate("+r+","+s*a()+")";return r+=d,e}return"translate(0,"+c*a()+")"})},g.x=function(a){return arguments.length?(h=a,g):h},g.y=function(a){return arguments.length?(i=a,g):i},g.gap=function(a){return arguments.length?(k=a,g):k},g.itemHeight=function(a){return arguments.length?(j=a,g):j},g.horizontal=function(a){return arguments.length?(l=a,g):l},g.legendWidth=function(a){return arguments.length?(m=a,g):m},g.itemWidth=function(a){return arguments.length?(n=a,g):n},g.autoItemWidth=function(a){return arguments.length?(o=a,g):o},g.legendText=function(a){return arguments.length?(p=a,g):p},g.maxItems=function(a){return arguments.length?(d=c.utils.isNumber(a)?a:void 0,g):d},g},c.scatterPlot=function(b,d){function e(a,b){return j(a)?v[b]?Math.pow(n,2):Math.pow(o,2):Math.pow(r,2)}function f(a,b){h.renderTitle()&&(a.selectAll("title").remove(),a.append("title").text(function(a){return h.title()(a)}))}function g(b,d){var e=h.chartBodyG().selectAll(".chart-body path.symbol").filter(function(){return b(a.select(this))}),f=i.size();i.size(Math.pow(d,2)),c.transition(e,h.transitionDuration(),h.transitionDelay()).attr("d",i),i.size(f)}var h=c.coordinateGridMixin({}),i=a.svg.symbol(),j=function(a){return a.value},k=h.keyAccessor();h.keyAccessor(function(a){return k(a)[0]}),h.valueAccessor(function(a){return k(a)[1]}),h.colorAccessor(function(){return h._groupName}),h.title(function(a){return h.keyAccessor()(a)+","+h.valueAccessor()(a)+": "+h.existenceAccessor()(a)});var l=function(a){return"translate("+h.x()(h.keyAccessor()(a))+","+h.y()(h.valueAccessor()(a))+")"},m=7,n=5,o=3,p=null,q=1,r=0,s=0,t=1,u=null,v=[];return i.size(e),c.override(h,"_filter",function(a){return arguments.length?h.__filter(c.filters.RangedTwoDimensionalFilter(a)):h.__filter()}),h.plotData=function(){var a=h.chartBodyG().selectAll("path.symbol").data(h.data());a.enter().append("path").attr("class","symbol").attr("opacity",0).attr("fill",h.getColor).attr("transform",l),a.call(f,h.data()),a.each(function(a,b){v[b]=!h.filter()||h.filter().isFiltered([a.key[0],a.key[1]])}),c.transition(a,h.transitionDuration(),h.transitionDelay()).attr("opacity",function(a,b){return j(a)?v[b]?t:h.excludedOpacity():s}).attr("fill",function(a,b){return u&&!j(a)?u:h.excludedColor()&&!v[b]?h.excludedColor():h.getColor(a)}).attr("transform",l).attr("d",i),c.transition(a.exit(),h.transitionDuration(),h.transitionDelay()).attr("opacity",0).remove()},h.existenceAccessor=function(a){return arguments.length?(j=a,this):j},h.symbol=function(a){return arguments.length?(i.type(a),h):i.type()},h.customSymbol=function(a){return arguments.length?(i=a,i.size(e),h):i},h.symbolSize=function(a){return arguments.length?(n=a,h):n},h.highlightedSize=function(a){return arguments.length?(m=a,h):m},h.excludedSize=function(a){return arguments.length?(o=a,h):o},h.excludedColor=function(a){return arguments.length?(p=a,h):p},h.excludedOpacity=function(a){return arguments.length?(q=a,h):q},h.hiddenSize=h.emptySize=function(a){return arguments.length?(r=a,h):r},h.emptyColor=function(a){return arguments.length?(u=a,h):u},h.emptyOpacity=function(a){return arguments.length?(s=a,h):s},h.nonemptyOpacity=function(a){return arguments.length?(t=a,h):s},h.legendables=function(){return[{chart:h,name:h._groupName,color:h.getColor()}]},h.legendHighlight=function(b){g(function(a){return a.attr("fill")===b.color},m),h.chartBodyG().selectAll(".chart-body path.symbol").filter(function(){return a.select(this).attr("fill")!==b.color}).classed("fadeout",!0)},h.legendReset=function(b){g(function(a){return a.attr("fill")===b.color},n),h.chartBodyG().selectAll(".chart-body path.symbol").filter(function(){return a.select(this).attr("fill")!==b.color}).classed("fadeout",!1)},h.setHandlePaths=function(){},h.extendBrush=function(){var a=h.brush().extent();return h.round()&&(a[0]=a[0].map(h.round()),a[1]=a[1].map(h.round()),h.g().select(".brush").call(h.brush().extent(a))),a},h.brushIsEmpty=function(a){return h.brush().empty()||!a||a[0][0]>=a[1][0]||a[0][1]>=a[1][1]},h._brushing=function(){var a=h.extendBrush();if(h.redrawBrush(h.g()),h.brushIsEmpty(a))c.events.trigger(function(){h.filter(null),h.redrawGroup()});else{var b=c.filters.RangedTwoDimensionalFilter(a);c.events.trigger(function(){h.filter(null),h.filter(b),h.redrawGroup()},c.constants.EVENT_DELAY)}},h.setBrushY=function(a){a.call(h.brush().y(h.y()))},h.anchor(b,d)},c.numberDisplay=function(b,d){function e(a){if(!a.length)return null;var b=i._computeOrderedGroups(a);return b[b.length-1]}var f,g="number-display",h=a.format(".2s"),i=c.baseMixin({}),j={one:"",some:"",none:""};return i._mandatoryAttributes(["group"]),i.ordering(function(a){return a.value}),i.html=function(a){return arguments.length?(a.none?j.none=a.none:a.one?j.none=a.one:a.some&&(j.none=a.some),a.one?j.one=a.one:a.some&&(j.one=a.some),a.some?j.some=a.some:a.one&&(j.some=a.one),i):j},i.value=function(){return i.data()},i.data(function(a){var b=a.value?a.value():e(a.all());return i.valueAccessor()(b)}),i.transitionDuration(250),i.transitionDelay(0),i._doRender=function(){var b=i.value(),c=i.selectAll("."+g);c.empty()&&(c=c.data([0]).enter().append("span").attr("class",g)),c.transition().duration(i.transitionDuration()).delay(i.transitionDelay()).ease("quad-out-in").tween("text",function(){var c=isFinite(f)?f:0,d=a.interpolateNumber(c||0,b);return f=b,function(a){var c=null,e=i.formatNumber()(d(a));0===b&&""!==j.none?c=j.none:1===b&&""!==j.one?c=j.one:""!==j.some&&(c=j.some),this.innerHTML=c?c.replace("%number",e):e}})},i._doRedraw=function(){return i._doRender()},i.formatNumber=function(a){return arguments.length?(h=a,i):h},i.anchor(b,d)},c.heatMap=function(b,d){function e(a,b){var d=p.selectAll(".box-group").filter(function(c){return c.key[a]===b}),e=d.filter(function(a){return!p.hasFilter(a.key)});c.events.trigger(function(){var a=e.empty()?d:e,b=a.data().map(function(a){return c.filters.TwoDimensionalFilter(a.key)});p._filter([b]),p.redrawGroup()})}var f,g,h,i=6.75,j=a.ascending,k=a.ascending,l=a.scale.ordinal(),m=a.scale.ordinal(),n=i,o=i,p=c.colorMixin(c.marginMixin(c.baseMixin({})));p._mandatoryAttributes(["group"]),p.title(p.colorAccessor());var q=function(a){return a},r=function(a){return a};p.colsLabel=function(a){return arguments.length?(q=a,p):q},p.rowsLabel=function(a){return arguments.length?(r=a,p):r};var s=function(a){e(0,a)},t=function(a){e(1,a)},u=function(a){var b=a.key;c.events.trigger(function(){p.filter(b),p.redrawGroup()})};return c.override(p,"filter",function(a){return arguments.length?p._filter(c.filters.TwoDimensionalFilter(a)):p._filter()}),p.rows=function(a){return arguments.length?(h=a,p):h},p.rowOrdering=function(a){return arguments.length?(k=a,p):k},p.cols=function(a){return arguments.length?(g=a,p):g},p.colOrdering=function(a){return arguments.length?(j=a,p):j},p._doRender=function(){return p.resetSvg(),f=p.svg().append("g").attr("class","heatmap").attr("transform","translate("+p.margins().left+","+p.margins().top+")"),p._doRedraw()},p._doRedraw=function(){var a=p.data(),b=p.rows()||a.map(p.valueAccessor()),d=p.cols()||a.map(p.keyAccessor());k&&(b=b.sort(k)),j&&(d=d.sort(j)),b=m.domain(b),d=l.domain(d);var e=b.domain().length,g=d.domain().length,h=Math.floor(p.effectiveWidth()/g),i=Math.floor(p.effectiveHeight()/e);d.rangeRoundBands([0,p.effectiveWidth()]),b.rangeRoundBands([p.effectiveHeight(),0]);var q=f.selectAll("g.box-group").data(p.data(),function(a,b){return p.keyAccessor()(a,b)+"\0"+p.valueAccessor()(a,b)}),r=q.enter().append("g").attr("class","box-group");r.append("rect").attr("class","heat-box").attr("fill","white").on("click",p.boxOnClick()),p.renderTitle()&&(r.append("title"),q.select("title").text(p.title())),c.transition(q.select("rect"),p.transitionDuration(),p.transitionDelay()).attr("x",function(a,b){return d(p.keyAccessor()(a,b))}).attr("y",function(a,c){return b(p.valueAccessor()(a,c))}).attr("rx",n).attr("ry",o).attr("fill",p.getColor).attr("width",h).attr("height",i),q.exit().remove();var s=f.select("g.cols");s.empty()&&(s=f.append("g").attr("class","cols axis"));var t=s.selectAll("text").data(d.domain());t.enter().append("text").attr("x",function(a){return d(a)+h/2}).style("text-anchor","middle").attr("y",p.effectiveHeight()).attr("dy",12).on("click",p.xAxisOnClick()).text(p.colsLabel()),c.transition(t,p.transitionDuration(),p.transitionDelay()).text(p.colsLabel()).attr("x",function(a){return d(a)+h/2}).attr("y",p.effectiveHeight()),t.exit().remove();var u=f.select("g.rows");u.empty()&&(u=f.append("g").attr("class","rows axis"));var v=u.selectAll("text").data(b.domain());return v.enter().append("text").attr("dy",6).style("text-anchor","end").attr("x",0).attr("dx",-2).on("click",p.yAxisOnClick()).text(p.rowsLabel()),c.transition(v,p.transitionDuration(),p.transitionDelay()).text(p.rowsLabel()).attr("y",function(a){return b(a)+i/2}),v.exit().remove(),p.hasFilter()?p.selectAll("g.box-group").each(function(a){p.isSelectedNode(a)?p.highlightSelected(this):p.fadeDeselected(this)}):p.selectAll("g.box-group").each(function(){p.resetHighlight(this)}),p},p.boxOnClick=function(a){return arguments.length?(u=a,p):u},p.xAxisOnClick=function(a){return arguments.length?(s=a,p):s},p.yAxisOnClick=function(a){return arguments.length?(t=a,p):t},p.xBorderRadius=function(a){return arguments.length?(n=a,p):n},p.yBorderRadius=function(a){return arguments.length?(o=a,p):o},p.isSelectedNode=function(a){return p.hasFilter(a.key)},p.anchor(b,d)},function(){function b(a){return[0,a.length-1]}function c(b){return[a.quantile(b,.25),a.quantile(b,.5),a.quantile(b,.75)]}a.box=function(){function d(b){b.each(function(b,c){b=b.map(j).sort(a.ascending);var d=a.select(this),n=b.length,o=b[0],p=b[n-1],q=b.quartiles=l(b),r=k&&k.call(this,b,c),s=r&&r.map(function(a){return b[a]}),t=r?a.range(0,r[0]).concat(a.range(r[1]+1,n)):a.range(n),u=a.scale.linear().domain(i&&i.call(this,b,c)||[o,p]).range([f,0]),v=this.__chart__||a.scale.linear().domain([0,1/0]).range(u.range());this.__chart__=u;var w=d.selectAll("line.center").data(s?[s]:[]);w.enter().insert("line","rect").attr("class","center").attr("x1",e/2).attr("y1",function(a){return v(a[0])}).attr("x2",e/2).attr("y2",function(a){return v(a[1])}).style("opacity",1e-6).transition().duration(g).delay(h).style("opacity",1).attr("y1",function(a){return u(a[0])}).attr("y2",function(a){return u(a[1])}),w.transition().duration(g).delay(h).style("opacity",1).attr("x1",e/2).attr("x2",e/2).attr("y1",function(a){return u(a[0])}).attr("y2",function(a){return u(a[1])}),w.exit().transition().duration(g).delay(h).style("opacity",1e-6).attr("y1",function(a){return u(a[0])}).attr("y2",function(a){return u(a[1])}).remove();var x=d.selectAll("rect.box").data([q]);x.enter().append("rect").attr("class","box").attr("x",0).attr("y",function(a){return v(a[2])}).attr("width",e).attr("height",function(a){return v(a[0])-v(a[2])}).transition().duration(g).delay(h).attr("y",function(a){return u(a[2])}).attr("height",function(a){return u(a[0])-u(a[2])}),x.transition().duration(g).delay(h).attr("width",e).attr("y",function(a){return u(a[2])}).attr("height",function(a){return u(a[0])-u(a[2])});var y=d.selectAll("line.median").data([q[1]]);y.enter().append("line").attr("class","median").attr("x1",0).attr("y1",v).attr("x2",e).attr("y2",v).transition().duration(g).delay(h).attr("y1",u).attr("y2",u),y.transition().duration(g).delay(h).attr("x1",0).attr("x2",e).attr("y1",u).attr("y2",u);var z=d.selectAll("line.whisker").data(s||[]);z.enter().insert("line","circle, text").attr("class","whisker").attr("x1",0).attr("y1",v).attr("x2",e).attr("y2",v).style("opacity",1e-6).transition().duration(g).delay(h).attr("y1",u).attr("y2",u).style("opacity",1),z.transition().duration(g).delay(h).attr("x1",0).attr("x2",e).attr("y1",u).attr("y2",u).style("opacity",1),z.exit().transition().duration(g).delay(h).attr("y1",u).attr("y2",u).style("opacity",1e-6).remove();var A=d.selectAll("circle.outlier").data(t,Number);A.enter().insert("circle","text").attr("class","outlier").attr("r",5).attr("cx",e/2).attr("cy",function(a){return v(b[a])}).style("opacity",1e-6).transition().duration(g).delay(h).attr("cy",function(a){return u(b[a])}).style("opacity",1),A.transition().duration(g).delay(h).attr("cx",e/2).attr("cy",function(a){return u(b[a])}).style("opacity",1),A.exit().transition().duration(g).delay(h).attr("cy",function(a){return u(b[a])}).style("opacity",1e-6).remove();var B=m||u.tickFormat(8),C=d.selectAll("text.box").data(q);C.enter().append("text").attr("class","box").attr("dy",".3em").attr("dx",function(a,b){return 1&b?6:-6}).attr("x",function(a,b){return 1&b?e:0}).attr("y",v).attr("text-anchor",function(a,b){return 1&b?"start":"end"}).text(B).transition().duration(g).delay(h).attr("y",u),C.transition().duration(g).delay(h).text(B).attr("x",function(a,b){return 1&b?e:0}).attr("y",u);var D=d.selectAll("text.whisker").data(s||[]);D.enter().append("text").attr("class","whisker").attr("dy",".3em").attr("dx",6).attr("x",e).attr("y",v).text(B).style("opacity",1e-6).transition().duration(g).delay(h).attr("y",u).style("opacity",1),D.transition().duration(g).delay(h).text(B).attr("x",e).attr("y",u).style("opacity",1),D.exit().transition().duration(g).delay(h).attr("y",u).style("opacity",1e-6).remove()}),a.timer.flush()}var e=1,f=1,g=0,h=0,i=null,j=Number,k=b,l=c,m=null;return d.width=function(a){return arguments.length?(e=a,d):e},d.height=function(a){return arguments.length?(f=a,d):f},d.tickFormat=function(a){return arguments.length?(m=a,d):m},d.duration=function(a){return arguments.length?(g=a,d):g},d.domain=function(b){return arguments.length?(i=null===b?b:a.functor(b),d):i},d.value=function(a){return arguments.length?(j=a,d):j},d.whiskers=function(a){return arguments.length?(k=a,d):k},d.quartiles=function(a){return arguments.length?(l=a,d):l},d}}(),c.boxPlot=function(b,d){function e(a){return function(b){var c=b.quartiles[0],d=b.quartiles[2],e=(d-c)*a,f=-1,g=b.length;do++f;while(b[f]<c-e);do--g;while(b[g]>d+e);return[f,g]}}function f(a){var b=a.enter().append("g");b.attr("class","box").attr("transform",p).call(m).on("click",function(a){i.filter(i.keyAccessor()(a)),i.redrawGroup()})}function g(b){c.transition(b,i.transitionDuration(),i.transitionDelay()).attr("transform",p).call(m).each(function(){a.select(this).select("rect.box").attr("fill",i.getColor)})}function h(a){a.exit().remove().call(m)}var i=c.coordinateGridMixin({}),j=1.5,k=e,l=k(j),m=a.box(),n=null,o=function(a,b){return i.isOrdinal()?i.x().rangeBand():a/(1+i.boxPadding())/b};i.yAxisPadding(12),i.x(a.scale.ordinal()),i.xUnits(c.units.ordinal),i.data(function(a){return a.all().map(function(a){return a.map=function(b){return b.call(a,a)},a}).filter(function(a){var b=i.valueAccessor()(a);return 0!==b.length})}),i.boxPadding=i._rangeBandPadding,i.boxPadding(.8),i.outerPadding=i._outerRangeBandPadding,i.outerPadding(.5),i.boxWidth=function(b){return arguments.length?(o=a.functor(b),i):o};var p=function(a,b){var c=i.x()(i.keyAccessor()(a,b));return"translate("+c+", 0)"};return i._preprocessData=function(){i.elasticX()&&i.x().domain([])},i.plotData=function(){var a=o(i.effectiveWidth(),i.xUnitCount());m.whiskers(l).width(a).height(i.effectiveHeight()).value(i.valueAccessor()).domain(i.y().domain()).duration(i.transitionDuration()).tickFormat(n);var b=i.chartBodyG().selectAll("g.box").data(i.data(),i.keyAccessor());f(b),g(b),h(b),i.fadeDeselectedArea()},i.fadeDeselectedArea=function(){if(i.hasFilter())if(i.isOrdinal())i.g().selectAll("g.box").each(function(a){i.isSelectedNode(a)?i.highlightSelected(this):i.fadeDeselected(this)});else{var a=i.brush().extent(),b=a[0],c=a[1],d=i.keyAccessor();i.g().selectAll("g.box").each(function(a){var e=d(a);e<b||e>=c?i.fadeDeselected(this):i.highlightSelected(this)})}else i.g().selectAll("g.box").each(function(){i.resetHighlight(this)})},i.isSelectedNode=function(a){return i.hasFilter(i.keyAccessor()(a))},i.yAxisMin=function(){var b=a.min(i.data(),function(b){return a.min(i.valueAccessor()(b))});return c.utils.subtract(b,i.yAxisPadding())},i.yAxisMax=function(){var b=a.max(i.data(),function(b){return a.max(i.valueAccessor()(b))});return c.utils.add(b,i.yAxisPadding())},i.tickFormat=function(a){return arguments.length?(n=a,i):n},i.anchor(b,d)},c.selectMenu=function(b,d){function e(){var a=h.selectAll("option."+j).data(k.data(),function(a){return k.keyAccessor()(a)});return a.enter().append("option").classed(j,!0).attr("value",function(a){return k.keyAccessor()(a)}),a.text(k.title()),a.exit().remove(),h.selectAll("option."+j).sort(p),h.on("change",f),a}function f(b,c){var d,e=a.event.target;if(e.selectedOptions){var f=Array.prototype.slice.call(e.selectedOptions);d=f.map(function(a){return a.value})}else{var g=[].slice.call(a.event.target.options);d=g.filter(function(a){return a.selected}).map(function(a){return a.value})}1===d.length&&""===d[0]?d=n||null:m||1!==d.length||(d=d[0]),k.onChange(d)}function g(){m?h.attr("multiple",!0):h.attr("multiple",null),null!==o?h.attr("size",o):h.attr("size",null)}var h,i="dc-select-menu",j="dc-select-option",k=c.baseMixin({}),l="Select all",m=!1,n=null,o=null,p=function(a,b){return k.keyAccessor()(a)>k.keyAccessor()(b)?1:k.keyAccessor()(b)>k.keyAccessor()(a)?-1:0},q=function(a){return k.valueAccessor()(a)>0};k.data(function(a){return a.all().filter(q)}),k._doRender=function(){return k.select("select").remove(),h=k.root().append("select").classed(i,!0),h.append("option").text(l).attr("value",""),k._doRedraw(),k};var r=window.navigator.userAgent;return r.indexOf("Trident/")>0&&r.indexOf("MSIE")===-1&&(k.redraw=k.render),k._doRedraw=function(){return g(),e(),k.hasFilter()&&m?h.selectAll("option").property("selected",function(a){return"undefined"!=typeof a&&k.filters().indexOf(String(k.keyAccessor()(a)))>=0}):k.hasFilter()?h.property("value",k.filter()):h.property("value",""),k},k.onChange=function(a){a&&m?k.replaceFilter([a]):a?k.replaceFilter(a):k.filterAll(),c.events.trigger(function(){k.redrawGroup()})},k.order=function(a){return arguments.length?(p=a,k):p},k.promptText=function(a){return arguments.length?(l=a,k):l},k.filterDisplayed=function(a){return arguments.length?(q=a,k):q},k.multiple=function(a){return arguments.length?(m=a,k):m},k.promptValue=function(a){return arguments.length?(n=a,k):n},k.numberVisible=function(a){return arguments.length?(o=a,k):o},k.size=c.logger.deprecate(k.numberVisible,"selectMenu.size is ambiguous - use numberVisible instead"),k.anchor(b,d)},c.abstractBubbleChart=c.bubbleMixin,c.baseChart=c.baseMixin,c.capped=c.capMixin,c.colorChart=c.colorMixin,c.coordinateGridChart=c.coordinateGridMixin,c.marginable=c.marginMixin,c.stackableChart=c.stackMixin,c.d3=a,c.crossfilter=b,c}if("function"==typeof define&&define.amd)define(["d3","crossfilter2"],a);else if("object"==typeof module&&module.exports){var b=require("d3"),c=require("crossfilter2");"function"!=typeof c&&(c=c.crossfilter),module.exports=a(b,c)}else this.dc=a(d3,crossfilter)}();

CRM.visual.crossfilter = crossfilter;
CRM.visual.d3 = d3;
CRM.visual.dc = dc;
window.crossfilter = backups.crossfilter;
window.d3 = backups.d3;
window.dc = backups.dc;
})();
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

(function (angular, $, _) {

  angular.module('crmAttachment', CRM.angRequires('crmAttachment'));

  angular.module('crmAttachment').factory('CrmAttachments', function (crmApi, crmStatus, FileUploader, $q) {

    function CrmAttachments(target) {
      var crmAttachments = this;
      this._target = target;
      this.files = [];
      this.trash = [];
      this.uploader = new FileUploader({
        url: CRM.url('civicrm/ajax/attachment'),
        onAfterAddingFile: function onAfterAddingFile(item) {
          item.crmData = {
            description: ''
          };
        },
        onSuccessItem: function onSuccessItem(item, response, status, headers) {
          crmAttachments.files.push(response.file.values[response.file.id]);
          crmAttachments.uploader.removeFromQueue(item);
        },
        onErrorItem: function onErrorItem(item, response, status, headers) {
          var msg = (response && response.file && response.file.error_message) ? response.file.error_message : ts('Unknown error');
          CRM.alert(item.file.name + ' - ' + msg, ts('Attachment failed'));
          crmAttachments.uploader.removeFromQueue(item);
        }
      });
    }

    angular.extend(CrmAttachments.prototype, {

      getTarget: function () {
        return (angular.isFunction(this._target) ? this._target() : this._target);
      },

      load: function load() {
        var target = this.getTarget();
        var Attachment = this;

        if (target.entity_id) {
          var params = {
            entity_table: target.entity_table,
            entity_id: target.entity_id
          };
          return crmApi('Attachment', 'get', params).then(function (apiResult) {
            Attachment.files = _.values(apiResult.values);
            return Attachment;
          });
        }
        else {
          var dfr = $q.defer();
          Attachment.files = [];
          dfr.resolve(Attachment);
          return dfr.promise;
        }
      },

      save: function save() {
        var crmAttachments = this;
        var target = this.getTarget();
        if (!target.entity_table || !target.entity_id) {
          throw "Cannot save attachments: unknown entity_table or entity_id";
        }

        var params = _.extend({}, target);
        params.values = crmAttachments.files;
        return crmApi('Attachment', 'replace', params)
          .then(function () {
            var dfr = $q.defer();

            var newItems = crmAttachments.uploader.getNotUploadedItems();
            if (newItems.length > 0) {
              _.each(newItems, function (item) {
                item.formData = [_.extend({crm_attachment_token: CRM.crmAttachment.token}, target, item.crmData)];
              });
              crmAttachments.uploader.onCompleteAll = function onCompleteAll() {
                delete crmAttachments.uploader.onCompleteAll;
                dfr.resolve(crmAttachments);
              };
              crmAttachments.uploader.uploadAll();
            }
            else {
              dfr.resolve(crmAttachments);
            }

            return dfr.promise;
          });
      },


      getAutosaveSignature: function getAutosaveSignature() {
        var sig = [];





        angular.forEach(this.files, function(item) {
          sig.push({f: item.name.replace(/[^a-zA0-Z0-9\.]/, '_'), d: item.description});
        });
        angular.forEach(this.uploader.queue, function(item) {
          sig.push({f: item.file.name.replace(/[^a-zA0-Z0-9\.]/, '_'), d: item.crmData.description});
        });
        angular.forEach(this.trash, function(item) {
          sig.push({f: item.name.replace(/[^a-zA0-Z0-9\.]/, '_'), d: item.description});
        });
        return _.sortBy(sig, 'name');
      },

      deleteFile: function deleteFile(file) {
        var crmAttachments = this;

        var idx = _.indexOf(this.files, file);
        if (idx != -1) {
          this.files.splice(idx, 1);
        }

        this.trash.push(file);

        if (file.id) {
          var p = crmApi('Attachment', 'delete', {id: file.id}).then(
            function () { // success
            },
            function (response) { // error; restore the file
              var msg = angular.isObject(response) ? response.error_message : '';
              CRM.alert(msg, ts('Deletion failed'));
              crmAttachments.files.push(file);

              var trashIdx = _.indexOf(crmAttachments.trash, file);
              if (trashIdx != -1) {
                crmAttachments.trash.splice(trashIdx, 1);
              }
            }
          );
          return crmStatus({start: ts('Deleting...'), success: ts('Deleted')}, p);
        }
      }
    });

    return CrmAttachments;
  });



  angular.module('crmAttachment').directive('crmAttachments', function ($parse, $timeout) {
    return {
      scope: {
        crmAttachments: '@'
      },
      template: '<div ng-if="ready" ng-include="inclUrl"></div>',
      link: function (scope, elm, attr) {
        var model = $parse(attr.crmAttachments);
        scope.att = model(scope.$parent);
        scope.ts = CRM.ts(null);
        scope.inclUrl = '~/crmAttachment/attachments.html';

        scope.ready = true;
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



  angular.module('crmRouteBinder', CRM.angRequires('crmRouteBinder'));


  var pendingUpdates = null, activeTimer = null, registered = false, ignorable = {};

  function registerGlobalListener($injector) {
    if (registered) return;
    registered = true;

    $injector.get('$rootScope').$on('$routeUpdate', function () {

      if (null === pendingUpdates) {
        $injector.get('$route').reload();
      }
    });
  }

  var formats = {
    json: {
      watcher: '$watchCollection',
      decode: angular.fromJson,
      encode: angular.toJson,
      default: {}
    },
    raw: {
      watcher: '$watch',
      decode: function(v) { return v; },
      encode: function(v) { return v; },
      default: ''
    },
    int: {
      watcher: '$watch',
      decode: function(v) { return parseInt(v); },
      encode: function(v) { return v; },
      default: 0
    },
    bool: {
      watcher: '$watch',
      decode: function(v) { return v === '1'; },
      encode: function(v) { return v ? '1' : '0'; },
      default: false
    }
  };

  angular.module('crmRouteBinder').config(function ($provide) {
    $provide.decorator('$rootScope', function ($delegate, $injector, $parse) {
      Object.getPrototypeOf($delegate).$bindToRoute = function (options) {
        registerGlobalListener($injector);

        options.format = options.format || 'json';
        var fmt = formats[options.format];
        if (options.deep) {
          fmt.watcher = '$watch';
        }
        if (options.default === undefined) {
          options.default = fmt.default;
        }
        var _scope = this;

        var $route = $injector.get('$route'), $timeout = $injector.get('$timeout');

        var value;
        if (options.param in $route.current.params) {
          value = fmt.decode($route.current.params[options.param]);
        }
        else {
          value = _.isObject(options.default) ? angular.extend({}, options.default) : options.default;
          ignorable[options.param] = fmt.encode(options.default);
        }
        $parse(options.expr).assign(_scope, value);

        _scope[fmt.watcher](options.expr, function (newValue) {
          var encValue = fmt.encode(newValue);
          if ($route.current.params[options.param] === encValue) return;

          pendingUpdates = pendingUpdates || {};
          pendingUpdates[options.param] = encValue;
          var p = angular.extend({}, $route.current.params, pendingUpdates);
          angular.forEach(ignorable, function(v,k){ if (p[k] === v) delete p[k]; });
          $route.updateParams(p);

          if (activeTimer) $timeout.cancel(activeTimer);
          activeTimer = $timeout(function () {
            pendingUpdates = null;
            activeTimer = null;
            ignorable = {};
          }, 50);
        }, options.deep);
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

(function($, angular){
angular.module('dialogService', []).service('dialogService',
	['$rootScope', '$q', '$compile', '$templateCache', '$http',
	function($rootScope, $q, $compile, $templateCache, $http) {

			var _this = this;
			_this.dialogs = {};

			this.open = function(id, template, model, options) {

				if (!angular.isDefined(id)) {
					throw "dialogService requires id in call to open";
				}

				if (!angular.isDefined(template)) {
					throw "dialogService requires template in call to open";
				}

				if (!angular.isDefined(model)) {
					model = null;
				}




				var dialogOptions = {};
				if (angular.isDefined(options)) {
					angular.extend(dialogOptions, options);
				}

				var dialog = { scope: null, ref: null, deferred: $q.defer() };

				loadTemplate(template).then(
					function(dialogTemplate) {

						dialog.scope = $rootScope.$new();
						dialog.scope.model = model;
						var dialogLinker = $compile(dialogTemplate);
						dialog.ref = $(dialogLinker(dialog.scope));



						var customCloseFn = dialogOptions.close;
						dialogOptions.close = function(event, ui) {
							if (customCloseFn) {
								customCloseFn(event, ui);
							}
							cleanup(id);
						};

						dialog.ref.dialog(dialogOptions);
						dialog.ref.dialog("open");

						_this.dialogs[id] = dialog;

					}, function(error) {
						throw error;
					}
				);

				return dialog.deferred.promise;
			};

			this.close = function(id, result) {

				var dialog = getExistingDialog(id);



				dialog.deferred.resolve(result);

				dialog.ref.dialog("close");
			};

			this.cancel = function(id) {

				var dialog = getExistingDialog(id);



				dialog.deferred.reject();

				dialog.ref.dialog("close");
			};

			this.setButtons = function(id, buttons) {
				var dialog = getExistingDialog(id);
				dialog.ref.dialog("option", 'buttons', buttons);
			};

			function cleanup (id) {

				var dialog = getExistingDialog(id);



				dialog.deferred.reject();
				dialog.scope.$destroy();

				dialog.ref.remove();

				delete _this.dialogs[id];
			};

			function getExistingDialog(id) {

				var dialog = _this.dialogs[id];

				if (!angular.isDefined(dialog)) {
					throw "DialogService does not have a reference to dialog id " + id;
				}
				return dialog;
			};

			function loadTemplate(template) {

				var deferred = $q.defer();
				var html = $templateCache.get(template);

				if (angular.isDefined(html)) {

					html = html.trim();
					deferred.resolve(html);
				} else {

					return $http.get(template, { cache : $templateCache }).then(
						function(response) {
							var html = response.data;
							if(!html || !html.length) {

								return $q.reject("Template " + template + " was not found");
							}
							html = html.trim();

							$templateCache.put(template, html);
							return html;
						}, function() {
							return $q.reject("Template " + template + " was not found");
			        	}
			        );
				}
			    return deferred.promise;
			}
		}
]);
})(jQuery, angular);

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
 * angular-ui-bootstrap
 * http://angular-ui.github.io/bootstrap/

 * Version: 2.5.0 - 2017-01-28
 * License: MIT
 */angular.module("ui.bootstrap",["ui.bootstrap.tpls","ui.bootstrap.collapse","ui.bootstrap.tabindex","ui.bootstrap.accordion","ui.bootstrap.alert","ui.bootstrap.buttons","ui.bootstrap.carousel","ui.bootstrap.dateparser","ui.bootstrap.isClass","ui.bootstrap.datepicker","ui.bootstrap.position","ui.bootstrap.datepickerPopup","ui.bootstrap.debounce","ui.bootstrap.multiMap","ui.bootstrap.dropdown","ui.bootstrap.stackedMap","ui.bootstrap.modal","ui.bootstrap.paging","ui.bootstrap.pager","ui.bootstrap.pagination","ui.bootstrap.tooltip","ui.bootstrap.popover","ui.bootstrap.progressbar","ui.bootstrap.rating","ui.bootstrap.tabs","ui.bootstrap.timepicker","ui.bootstrap.typeahead"]),angular.module("ui.bootstrap.tpls",["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html","uib/template/carousel/carousel.html","uib/template/carousel/slide.html","uib/template/datepicker/datepicker.html","uib/template/datepicker/day.html","uib/template/datepicker/month.html","uib/template/datepicker/year.html","uib/template/datepickerPopup/popup.html","uib/template/modal/window.html","uib/template/pager/pager.html","uib/template/pagination/pagination.html","uib/template/tooltip/tooltip-html-popup.html","uib/template/tooltip/tooltip-popup.html","uib/template/tooltip/tooltip-template-popup.html","uib/template/popover/popover-html.html","uib/template/popover/popover-template.html","uib/template/popover/popover.html","uib/template/progressbar/bar.html","uib/template/progressbar/progress.html","uib/template/progressbar/progressbar.html","uib/template/rating/rating.html","uib/template/tabs/tab.html","uib/template/tabs/tabset.html","uib/template/timepicker/timepicker.html","uib/template/typeahead/typeahead-match.html","uib/template/typeahead/typeahead-popup.html"]),angular.module("ui.bootstrap.collapse",[]).directive("uibCollapse",["$animate","$q","$parse","$injector",function(a,b,c,d){var e=d.has("$animateCss")?d.get("$animateCss"):null;return{link:function(d,f,g){function h(){r=!!("horizontal"in g),r?(s={width:""},t={width:"0"}):(s={height:""},t={height:"0"}),d.$eval(g.uibCollapse)||f.addClass("in").addClass("collapse").attr("aria-expanded",!0).attr("aria-hidden",!1).css(s)}function i(a){return r?{width:a.scrollWidth+"px"}:{height:a.scrollHeight+"px"}}function j(){f.hasClass("collapse")&&f.hasClass("in")||b.resolve(n(d)).then(function(){f.removeClass("collapse").addClass("collapsing").attr("aria-expanded",!0).attr("aria-hidden",!1),e?e(f,{addClass:"in",easing:"ease",css:{overflow:"hidden"},to:i(f[0])}).start()["finally"](k):a.addClass(f,"in",{css:{overflow:"hidden"},to:i(f[0])}).then(k)},angular.noop)}function k(){f.removeClass("collapsing").addClass("collapse").css(s),o(d)}function l(){return f.hasClass("collapse")||f.hasClass("in")?void b.resolve(p(d)).then(function(){f.css(i(f[0])).removeClass("collapse").addClass("collapsing").attr("aria-expanded",!1).attr("aria-hidden",!0),e?e(f,{removeClass:"in",to:t}).start()["finally"](m):a.removeClass(f,"in",{to:t}).then(m)},angular.noop):m()}function m(){f.css(t),f.removeClass("collapsing").addClass("collapse"),q(d)}var n=c(g.expanding),o=c(g.expanded),p=c(g.collapsing),q=c(g.collapsed),r=!1,s={},t={};h(),d.$watch(g.uibCollapse,function(a){a?l():j()})}}}]),angular.module("ui.bootstrap.tabindex",[]).directive("uibTabindexToggle",function(){return{restrict:"A",link:function(a,b,c){c.$observe("disabled",function(a){c.$set("tabindex",a?-1:null)})}}}),angular.module("ui.bootstrap.accordion",["ui.bootstrap.collapse","ui.bootstrap.tabindex"]).constant("uibAccordionConfig",{closeOthers:!0}).controller("UibAccordionController",["$scope","$attrs","uibAccordionConfig",function(a,b,c){this.groups=[],this.closeOthers=function(d){var e=angular.isDefined(b.closeOthers)?a.$eval(b.closeOthers):c.closeOthers;e&&angular.forEach(this.groups,function(a){a!==d&&(a.isOpen=!1)})},this.addGroup=function(a){var b=this;this.groups.push(a),a.$on("$destroy",function(c){b.removeGroup(a)})},this.removeGroup=function(a){var b=this.groups.indexOf(a);-1!==b&&this.groups.splice(b,1)}}]).directive("uibAccordion",function(){return{controller:"UibAccordionController",controllerAs:"accordion",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/accordion/accordion.html"}}}).directive("uibAccordionGroup",function(){return{require:"^uibAccordion",transclude:!0,restrict:"A",templateUrl:function(a,b){return b.templateUrl||"uib/template/accordion/accordion-group.html"},scope:{heading:"@",panelClass:"@?",isOpen:"=?",isDisabled:"=?"},controller:function(){this.setHeading=function(a){this.heading=a}},link:function(a,b,c,d){b.addClass("panel"),d.addGroup(a),a.openClass=c.openClass||"panel-open",a.panelClass=c.panelClass||"panel-default",a.$watch("isOpen",function(c){b.toggleClass(a.openClass,!!c),c&&d.closeOthers(a)}),a.toggleOpen=function(b){a.isDisabled||b&&32!==b.which||(a.isOpen=!a.isOpen)};var e="accordiongroup-"+a.$id+"-"+Math.floor(1e4*Math.random());a.headingId=e+"-tab",a.panelId=e+"-panel"}}}).directive("uibAccordionHeading",function(){return{transclude:!0,template:"",replace:!0,require:"^uibAccordionGroup",link:function(a,b,c,d,e){d.setHeading(e(a,angular.noop))}}}).directive("uibAccordionTransclude",function(){function a(){return"uib-accordion-header,data-uib-accordion-header,x-uib-accordion-header,uib\\:accordion-header,[uib-accordion-header],[data-uib-accordion-header],[x-uib-accordion-header]"}return{require:"^uibAccordionGroup",link:function(b,c,d,e){b.$watch(function(){return e[d.uibAccordionTransclude]},function(b){if(b){var d=angular.element(c[0].querySelector(a()));d.html(""),d.append(b)}})}}}),angular.module("ui.bootstrap.alert",[]).controller("UibAlertController",["$scope","$element","$attrs","$interpolate","$timeout",function(a,b,c,d,e){a.closeable=!!c.close,b.addClass("alert"),c.$set("role","alert"),a.closeable&&b.addClass("alert-dismissible");var f=angular.isDefined(c.dismissOnTimeout)?d(c.dismissOnTimeout)(a.$parent):null;f&&e(function(){a.close()},parseInt(f,10))}]).directive("uibAlert",function(){return{controller:"UibAlertController",controllerAs:"alert",restrict:"A",templateUrl:function(a,b){return b.templateUrl||"uib/template/alert/alert.html"},transclude:!0,scope:{close:"&"}}}),angular.module("ui.bootstrap.buttons",[]).constant("uibButtonConfig",{activeClass:"active",toggleEvent:"click"}).controller("UibButtonsController",["uibButtonConfig",function(a){this.activeClass=a.activeClass||"active",this.toggleEvent=a.toggleEvent||"click"}]).directive("uibBtnRadio",["$parse",function(a){return{require:["uibBtnRadio","ngModel"],controller:"UibButtonsController",controllerAs:"buttons",link:function(b,c,d,e){var f=e[0],g=e[1],h=a(d.uibUncheckable);c.find("input").css({display:"none"}),g.$render=function(){c.toggleClass(f.activeClass,angular.equals(g.$modelValue,b.$eval(d.uibBtnRadio)))},c.on(f.toggleEvent,function(){if(!d.disabled){var a=c.hasClass(f.activeClass);a&&!angular.isDefined(d.uncheckable)||b.$apply(function(){g.$setViewValue(a?null:b.$eval(d.uibBtnRadio)),g.$render()})}}),d.uibUncheckable&&b.$watch(h,function(a){d.$set("uncheckable",a?"":void 0)})}}}]).directive("uibBtnCheckbox",function(){return{require:["uibBtnCheckbox","ngModel"],controller:"UibButtonsController",controllerAs:"button",link:function(a,b,c,d){function e(){return g(c.btnCheckboxTrue,!0)}function f(){return g(c.btnCheckboxFalse,!1)}function g(b,c){return angular.isDefined(b)?a.$eval(b):c}var h=d[0],i=d[1];b.find("input").css({display:"none"}),i.$render=function(){b.toggleClass(h.activeClass,angular.equals(i.$modelValue,e()))},b.on(h.toggleEvent,function(){c.disabled||a.$apply(function(){i.$setViewValue(b.hasClass(h.activeClass)?f():e()),i.$render()})})}}}),angular.module("ui.bootstrap.carousel",[]).controller("UibCarouselController",["$scope","$element","$interval","$timeout","$animate",function(a,b,c,d,e){function f(a){for(var b=0;b<p.length;b++)p[b].slide.active=b===a}function g(c,d,g){if(!s){if(angular.extend(c,{direction:g}),angular.extend(p[r].slide||{},{direction:g}),e.enabled(b)&&!a.$currentTransition&&p[d].element&&o.slides.length>1){p[d].element.data(q,c.direction);var h=o.getCurrentIndex();angular.isNumber(h)&&p[h].element&&p[h].element.data(q,c.direction),a.$currentTransition=!0,e.on("addClass",p[d].element,function(b,c){"close"===c&&(a.$currentTransition=null,e.off("addClass",b))})}a.active=c.index,r=c.index,f(d),k()}}function h(a){for(var b=0;b<p.length;b++)if(p[b].slide===a)return b}function i(){m&&(c.cancel(m),m=null)}function j(b){b.length||(a.$currentTransition=null)}function k(){i();var b=+a.interval;!isNaN(b)&&b>0&&(m=c(l,b))}function l(){var b=+a.interval;n&&!isNaN(b)&&b>0&&p.length?a.next():a.pause()}var m,n,o=this,p=o.slides=a.slides=[],q="uib-slideDirection",r=a.active,s=!1;b.addClass("carousel"),o.addSlide=function(b,c){p.push({slide:b,element:c}),p.sort(function(a,b){return+a.slide.index-+b.slide.index}),(b.index===a.active||1===p.length&&!angular.isNumber(a.active))&&(a.$currentTransition&&(a.$currentTransition=null),r=b.index,a.active=b.index,f(r),o.select(p[h(b)]),1===p.length&&a.play())},o.getCurrentIndex=function(){for(var a=0;a<p.length;a++)if(p[a].slide.index===r)return a},o.next=a.next=function(){var b=(o.getCurrentIndex()+1)%p.length;return 0===b&&a.noWrap()?void a.pause():o.select(p[b],"next")},o.prev=a.prev=function(){var b=o.getCurrentIndex()-1<0?p.length-1:o.getCurrentIndex()-1;return a.noWrap()&&b===p.length-1?void a.pause():o.select(p[b],"prev")},o.removeSlide=function(b){var c=h(b);p.splice(c,1),p.length>0&&r===c?c>=p.length?(r=p.length-1,a.active=r,f(r),o.select(p[p.length-1])):(r=c,a.active=r,f(r),o.select(p[c])):r>c&&(r--,a.active=r),0===p.length&&(r=null,a.active=null)},o.select=a.select=function(b,c){var d=h(b.slide);void 0===c&&(c=d>o.getCurrentIndex()?"next":"prev"),b.slide.index===r||a.$currentTransition||g(b.slide,d,c)},a.indexOfSlide=function(a){return+a.slide.index},a.isActive=function(b){return a.active===b.slide.index},a.isPrevDisabled=function(){return 0===a.active&&a.noWrap()},a.isNextDisabled=function(){return a.active===p.length-1&&a.noWrap()},a.pause=function(){a.noPause||(n=!1,i())},a.play=function(){n||(n=!0,k())},b.on("mouseenter",a.pause),b.on("mouseleave",a.play),a.$on("$destroy",function(){s=!0,i()}),a.$watch("noTransition",function(a){e.enabled(b,!a)}),a.$watch("interval",k),a.$watchCollection("slides",j),a.$watch("active",function(a){if(angular.isNumber(a)&&r!==a){for(var b=0;b<p.length;b++)if(p[b].slide.index===a){a=b;break}var c=p[a];c&&(f(a),o.select(p[a]),r=a)}})}]).directive("uibCarousel",function(){return{transclude:!0,controller:"UibCarouselController",controllerAs:"carousel",restrict:"A",templateUrl:function(a,b){return b.templateUrl||"uib/template/carousel/carousel.html"},scope:{active:"=",interval:"=",noTransition:"=",noPause:"=",noWrap:"&"}}}).directive("uibSlide",["$animate",function(a){return{require:"^uibCarousel",restrict:"A",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/carousel/slide.html"},scope:{actual:"=?",index:"=?"},link:function(b,c,d,e){c.addClass("item"),e.addSlide(b,c),b.$on("$destroy",function(){e.removeSlide(b)}),b.$watch("active",function(b){a[b?"addClass":"removeClass"](c,"active")})}}}]).animation(".item",["$animateCss",function(a){function b(a,b,c){a.removeClass(b),c&&c()}var c="uib-slideDirection";return{beforeAddClass:function(d,e,f){if("active"===e){var g=!1,h=d.data(c),i="next"===h?"left":"right",j=b.bind(this,d,i+" "+h,f);return d.addClass(h),a(d,{addClass:i}).start().done(j),function(){g=!0}}f()},beforeRemoveClass:function(d,e,f){if("active"===e){var g=!1,h=d.data(c),i="next"===h?"left":"right",j=b.bind(this,d,i,f);return a(d,{addClass:i}).start().done(j),function(){g=!0}}f()}}}]),angular.module("ui.bootstrap.dateparser",[]).service("uibDateParser",["$log","$locale","dateFilter","orderByFilter","filterFilter",function(a,b,c,d,e){function f(a){return e(s,{key:a},!0)[0]}function g(a){var b=[],c=a.split(""),e=a.indexOf("'");if(e>-1){var f=!1;a=a.split("");for(var g=e;g<a.length;g++)f?("'"===a[g]&&(g+1<a.length&&"'"===a[g+1]?(a[g+1]="$",c[g+1]=""):(c[g]="",f=!1)),a[g]="$"):"'"===a[g]&&(a[g]="$",c[g]="",f=!0);a=a.join("")}return angular.forEach(s,function(d){var e=a.indexOf(d.key);if(e>-1){a=a.split(""),c[e]="("+d.regex+")",a[e]="$";for(var f=e+1,g=e+d.key.length;g>f;f++)c[f]="",a[f]="$";a=a.join(""),b.push({index:e,key:d.key,apply:d.apply,matcher:d.regex})}}),{regex:new RegExp("^"+c.join("")+"$"),map:d(b,"index")}}function h(a){for(var b,c,d=[],e=0;e<a.length;)if(angular.isNumber(c)){if("'"===a.charAt(e))(e+1>=a.length||"'"!==a.charAt(e+1))&&(d.push(i(a,c,e)),c=null);else if(e===a.length)for(;c<a.length;)b=j(a,c),d.push(b),c=b.endIdx;e++}else"'"!==a.charAt(e)?(b=j(a,e),d.push(b.parser),e=b.endIdx):(c=e,e++);return d}function i(a,b,c){return function(){return a.substr(b+1,c-b-1)}}function j(a,b){for(var c=a.substr(b),d=0;d<s.length;d++)if(new RegExp("^"+s[d].key).test(c)){var e=s[d];return{endIdx:b+e.key.length,parser:e.formatter}}return{endIdx:b+1,parser:function(){return c.charAt(0)}}}function k(a,b,c){return 1>c?!1:1===b&&c>28?29===c&&(a%4===0&&a%100!==0||a%400===0):3===b||5===b||8===b||10===b?31>c:!0}function l(a){return parseInt(a,10)}function m(a,b){return a&&b?q(a,b):a}function n(a,b){return a&&b?q(a,b,!0):a}function o(a,b){a=a.replace(/:/g,"");var c=Date.parse("Jan 01, 1970 00:00:00 "+a)/6e4;return isNaN(c)?b:c}function p(a,b){return a=new Date(a.getTime()),a.setMinutes(a.getMinutes()+b),a}function q(a,b,c){c=c?-1:1;var d=a.getTimezoneOffset(),e=o(b,d);return p(a,c*(e-d))}var r,s,t=/[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;this.init=function(){r=b.id,this.parsers={},this.formatters={},s=[{key:"yyyy",regex:"\\d{4}",apply:function(a){this.year=+a},formatter:function(a){var b=new Date;return b.setFullYear(Math.abs(a.getFullYear())),c(b,"yyyy")}},{key:"yy",regex:"\\d{2}",apply:function(a){a=+a,this.year=69>a?a+2e3:a+1900},formatter:function(a){var b=new Date;return b.setFullYear(Math.abs(a.getFullYear())),c(b,"yy")}},{key:"y",regex:"\\d{1,4}",apply:function(a){this.year=+a},formatter:function(a){var b=new Date;return b.setFullYear(Math.abs(a.getFullYear())),c(b,"y")}},{key:"M!",regex:"0?[1-9]|1[0-2]",apply:function(a){this.month=a-1},formatter:function(a){var b=a.getMonth();return/^[0-9]$/.test(b)?c(a,"MM"):c(a,"M")}},{key:"MMMM",regex:b.DATETIME_FORMATS.MONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.MONTH.indexOf(a)},formatter:function(a){return c(a,"MMMM")}},{key:"MMM",regex:b.DATETIME_FORMATS.SHORTMONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.SHORTMONTH.indexOf(a)},formatter:function(a){return c(a,"MMM")}},{key:"MM",regex:"0[1-9]|1[0-2]",apply:function(a){this.month=a-1},formatter:function(a){return c(a,"MM")}},{key:"M",regex:"[1-9]|1[0-2]",apply:function(a){this.month=a-1},formatter:function(a){return c(a,"M")}},{key:"d!",regex:"[0-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a},formatter:function(a){var b=a.getDate();return/^[1-9]$/.test(b)?c(a,"dd"):c(a,"d")}},{key:"dd",regex:"[0-2][0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a},formatter:function(a){return c(a,"dd")}},{key:"d",regex:"[1-2]?[0-9]{1}|3[0-1]{1}",apply:function(a){this.date=+a},formatter:function(a){return c(a,"d")}},{key:"EEEE",regex:b.DATETIME_FORMATS.DAY.join("|"),formatter:function(a){return c(a,"EEEE")}},{key:"EEE",regex:b.DATETIME_FORMATS.SHORTDAY.join("|"),formatter:function(a){return c(a,"EEE")}},{key:"HH",regex:"(?:0|1)[0-9]|2[0-3]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"HH")}},{key:"hh",regex:"0[0-9]|1[0-2]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"hh")}},{key:"H",regex:"1?[0-9]|2[0-3]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"H")}},{key:"h",regex:"[0-9]|1[0-2]",apply:function(a){this.hours=+a},formatter:function(a){return c(a,"h")}},{key:"mm",regex:"[0-5][0-9]",apply:function(a){this.minutes=+a},formatter:function(a){return c(a,"mm")}},{key:"m",regex:"[0-9]|[1-5][0-9]",apply:function(a){this.minutes=+a},formatter:function(a){return c(a,"m")}},{key:"sss",regex:"[0-9][0-9][0-9]",apply:function(a){this.milliseconds=+a},formatter:function(a){return c(a,"sss")}},{key:"ss",regex:"[0-5][0-9]",apply:function(a){this.seconds=+a},formatter:function(a){return c(a,"ss")}},{key:"s",regex:"[0-9]|[1-5][0-9]",apply:function(a){this.seconds=+a},formatter:function(a){return c(a,"s")}},{key:"a",regex:b.DATETIME_FORMATS.AMPMS.join("|"),apply:function(a){12===this.hours&&(this.hours=0),"PM"===a&&(this.hours+=12)},formatter:function(a){return c(a,"a")}},{key:"Z",regex:"[+-]\\d{4}",apply:function(a){var b=a.match(/([+-])(\d{2})(\d{2})/),c=b[1],d=b[2],e=b[3];this.hours+=l(c+d),this.minutes+=l(c+e)},formatter:function(a){return c(a,"Z")}},{key:"ww",regex:"[0-4][0-9]|5[0-3]",formatter:function(a){return c(a,"ww")}},{key:"w",regex:"[0-9]|[1-4][0-9]|5[0-3]",formatter:function(a){return c(a,"w")}},{key:"GGGG",regex:b.DATETIME_FORMATS.ERANAMES.join("|").replace(/\s/g,"\\s"),formatter:function(a){return c(a,"GGGG")}},{key:"GGG",regex:b.DATETIME_FORMATS.ERAS.join("|"),formatter:function(a){return c(a,"GGG")}},{key:"GG",regex:b.DATETIME_FORMATS.ERAS.join("|"),formatter:function(a){return c(a,"GG")}},{key:"G",regex:b.DATETIME_FORMATS.ERAS.join("|"),formatter:function(a){return c(a,"G")}}],angular.version.major>=1&&angular.version.minor>4&&s.push({key:"LLLL",regex:b.DATETIME_FORMATS.STANDALONEMONTH.join("|"),apply:function(a){this.month=b.DATETIME_FORMATS.STANDALONEMONTH.indexOf(a)},formatter:function(a){return c(a,"LLLL")}})},this.init(),this.getParser=function(a){var b=f(a);return b&&b.apply||null},this.overrideParser=function(a,b){var c=f(a);c&&angular.isFunction(b)&&(this.parsers={},c.apply=b)}.bind(this),this.filter=function(a,c){if(!angular.isDate(a)||isNaN(a)||!c)return"";c=b.DATETIME_FORMATS[c]||c,b.id!==r&&this.init(),this.formatters[c]||(this.formatters[c]=h(c));var d=this.formatters[c];return d.reduce(function(b,c){return b+c(a)},"")},this.parse=function(c,d,e){if(!angular.isString(c)||!d)return c;d=b.DATETIME_FORMATS[d]||d,d=d.replace(t,"\\$&"),b.id!==r&&this.init(),this.parsers[d]||(this.parsers[d]=g(d,"apply"));var f=this.parsers[d],h=f.regex,i=f.map,j=c.match(h),l=!1;if(j&&j.length){var m,n;angular.isDate(e)&&!isNaN(e.getTime())?m={year:e.getFullYear(),month:e.getMonth(),date:e.getDate(),hours:e.getHours(),minutes:e.getMinutes(),seconds:e.getSeconds(),milliseconds:e.getMilliseconds()}:(e&&a.warn("dateparser:","baseDate is not a valid date"),m={year:1900,month:0,date:1,hours:0,minutes:0,seconds:0,milliseconds:0});for(var o=1,p=j.length;p>o;o++){var q=i[o-1];"Z"===q.matcher&&(l=!0),q.apply&&q.apply.call(m,j[o])}var s=l?Date.prototype.setUTCFullYear:Date.prototype.setFullYear,u=l?Date.prototype.setUTCHours:Date.prototype.setHours;return k(m.year,m.month,m.date)&&(!angular.isDate(e)||isNaN(e.getTime())||l?(n=new Date(0),s.call(n,m.year,m.month,m.date),u.call(n,m.hours||0,m.minutes||0,m.seconds||0,m.milliseconds||0)):(n=new Date(e),s.call(n,m.year,m.month,m.date),u.call(n,m.hours,m.minutes,m.seconds,m.milliseconds))),n}},this.toTimezone=m,this.fromTimezone=n,this.timezoneToOffset=o,this.addDateMinutes=p,this.convertTimezoneToLocal=q}]),angular.module("ui.bootstrap.isClass",[]).directive("uibIsClass",["$animate",function(a){var b=/^\s*([\s\S]+?)\s+on\s+([\s\S]+?)\s*$/,c=/^\s*([\s\S]+?)\s+for\s+([\s\S]+?)\s*$/;return{restrict:"A",compile:function(d,e){function f(a,b,c){i.push(a),j.push({scope:a,element:b}),o.forEach(function(b,c){g(b,a)}),a.$on("$destroy",h)}function g(b,d){var e=b.match(c),f=d.$eval(e[1]),g=e[2],h=k[b];if(!h){var i=function(b){var c=null;j.some(function(a){var d=a.scope.$eval(m);return d===b?(c=a,!0):void 0}),h.lastActivated!==c&&(h.lastActivated&&a.removeClass(h.lastActivated.element,f),c&&a.addClass(c.element,f),h.lastActivated=c)};k[b]=h={lastActivated:null,scope:d,watchFn:i,compareWithExp:g,watcher:d.$watch(g,i)}}h.watchFn(d.$eval(g))}function h(a){var b=a.targetScope,c=i.indexOf(b);if(i.splice(c,1),j.splice(c,1),i.length){var d=i[0];angular.forEach(k,function(a){a.scope===b&&(a.watcher=d.$watch(a.compareWithExp,a.watchFn),a.scope=d)})}else k={}}var i=[],j=[],k={},l=e.uibIsClass.match(b),m=l[2],n=l[1],o=n.split(",");return f}}}]),angular.module("ui.bootstrap.datepicker",["ui.bootstrap.dateparser","ui.bootstrap.isClass"]).value("$datepickerSuppressError",!1).value("$datepickerLiteralWarning",!0).constant("uibDatepickerConfig",{datepickerMode:"day",formatDay:"dd",formatMonth:"MMMM",formatYear:"yyyy",formatDayHeader:"EEE",formatDayTitle:"MMMM yyyy",formatMonthTitle:"yyyy",maxDate:null,maxMode:"year",minDate:null,minMode:"day",monthColumns:3,ngModelOptions:{},shortcutPropagation:!1,showWeeks:!0,yearColumns:5,yearRows:4}).controller("UibDatepickerController",["$scope","$element","$attrs","$parse","$interpolate","$locale","$log","dateFilter","uibDatepickerConfig","$datepickerLiteralWarning","$datepickerSuppressError","uibDateParser",function(a,b,c,d,e,f,g,h,i,j,k,l){function m(b){a.datepickerMode=b,a.datepickerOptions.datepickerMode=b}function n(b){var c;if(angular.version.minor<6)c=b.$options||a.datepickerOptions.ngModelOptions||i.ngModelOptions||{},c.getOption=function(a){return c[a]};else{var d=b.$options.getOption("timezone")||(a.datepickerOptions.ngModelOptions?a.datepickerOptions.ngModelOptions.timezone:null)||(i.ngModelOptions?i.ngModelOptions.timezone:null);c=b.$options.createChild(i.ngModelOptions).createChild(a.datepickerOptions.ngModelOptions).createChild(b.$options).createChild({timezone:d})}return c}var o=this,p={$setViewValue:angular.noop},q={},r=[];b.addClass("uib-datepicker"),c.$set("role","application"),a.datepickerOptions||(a.datepickerOptions={}),this.modes=["day","month","year"],["customClass","dateDisabled","datepickerMode","formatDay","formatDayHeader","formatDayTitle","formatMonth","formatMonthTitle","formatYear","maxDate","maxMode","minDate","minMode","monthColumns","showWeeks","shortcutPropagation","startingDay","yearColumns","yearRows"].forEach(function(b){switch(b){case"customClass":case"dateDisabled":a[b]=a.datepickerOptions[b]||angular.noop;break;case"datepickerMode":a.datepickerMode=angular.isDefined(a.datepickerOptions.datepickerMode)?a.datepickerOptions.datepickerMode:i.datepickerMode;break;case"formatDay":case"formatDayHeader":case"formatDayTitle":case"formatMonth":case"formatMonthTitle":case"formatYear":o[b]=angular.isDefined(a.datepickerOptions[b])?e(a.datepickerOptions[b])(a.$parent):i[b];break;case"monthColumns":case"showWeeks":case"shortcutPropagation":case"yearColumns":case"yearRows":o[b]=angular.isDefined(a.datepickerOptions[b])?a.datepickerOptions[b]:i[b];break;case"startingDay":angular.isDefined(a.datepickerOptions.startingDay)?o.startingDay=a.datepickerOptions.startingDay:angular.isNumber(i.startingDay)?o.startingDay=i.startingDay:o.startingDay=(f.DATETIME_FORMATS.FIRSTDAYOFWEEK+8)%7;break;case"maxDate":case"minDate":a.$watch("datepickerOptions."+b,function(a){a?angular.isDate(a)?o[b]=l.fromTimezone(new Date(a),q.getOption("timezone")):(j&&g.warn("Literal date support has been deprecated, please switch to date object usage"),o[b]=new Date(h(a,"medium"))):o[b]=i[b]?l.fromTimezone(new Date(i[b]),q.getOption("timezone")):null,o.refreshView()});break;case"maxMode":case"minMode":a.datepickerOptions[b]?a.$watch(function(){return a.datepickerOptions[b]},function(c){o[b]=a[b]=angular.isDefined(c)?c:a.datepickerOptions[b],("minMode"===b&&o.modes.indexOf(a.datepickerOptions.datepickerMode)<o.modes.indexOf(o[b])||"maxMode"===b&&o.modes.indexOf(a.datepickerOptions.datepickerMode)>o.modes.indexOf(o[b]))&&(a.datepickerMode=o[b],a.datepickerOptions.datepickerMode=o[b])}):o[b]=a[b]=i[b]||null}}),a.uniqueId="datepicker-"+a.$id+"-"+Math.floor(1e4*Math.random()),a.disabled=angular.isDefined(c.disabled)||!1,angular.isDefined(c.ngDisabled)&&r.push(a.$parent.$watch(c.ngDisabled,function(b){a.disabled=b,o.refreshView()})),a.isActive=function(b){return 0===o.compare(b.date,o.activeDate)?(a.activeDateId=b.uid,!0):!1},this.init=function(b){p=b,q=n(p),a.datepickerOptions.initDate?(o.activeDate=l.fromTimezone(a.datepickerOptions.initDate,q.getOption("timezone"))||new Date,a.$watch("datepickerOptions.initDate",function(a){a&&(p.$isEmpty(p.$modelValue)||p.$invalid)&&(o.activeDate=l.fromTimezone(a,q.getOption("timezone")),o.refreshView())})):o.activeDate=new Date;var c=p.$modelValue?new Date(p.$modelValue):new Date;this.activeDate=isNaN(c)?l.fromTimezone(new Date,q.getOption("timezone")):l.fromTimezone(c,q.getOption("timezone")),p.$render=function(){o.render()}},this.render=function(){if(p.$viewValue){var a=new Date(p.$viewValue),b=!isNaN(a);b?this.activeDate=l.fromTimezone(a,q.getOption("timezone")):k||g.error('Datepicker directive: "ng-model" value must be a Date object')}this.refreshView()},this.refreshView=function(){if(this.element){a.selectedDt=null,this._refreshView(),a.activeDt&&(a.activeDateId=a.activeDt.uid);var b=p.$viewValue?new Date(p.$viewValue):null;b=l.fromTimezone(b,q.getOption("timezone")),p.$setValidity("dateDisabled",!b||this.element&&!this.isDisabled(b))}},this.createDateObject=function(b,c){var d=p.$viewValue?new Date(p.$viewValue):null;d=l.fromTimezone(d,q.getOption("timezone"));var e=new Date;e=l.fromTimezone(e,q.getOption("timezone"));var f=this.compare(b,e),g={date:b,label:l.filter(b,c),selected:d&&0===this.compare(b,d),disabled:this.isDisabled(b),past:0>f,current:0===f,future:f>0,customClass:this.customClass(b)||null};return d&&0===this.compare(b,d)&&(a.selectedDt=g),o.activeDate&&0===this.compare(g.date,o.activeDate)&&(a.activeDt=g),g},this.isDisabled=function(b){return a.disabled||this.minDate&&this.compare(b,this.minDate)<0||this.maxDate&&this.compare(b,this.maxDate)>0||a.dateDisabled&&a.dateDisabled({date:b,mode:a.datepickerMode})},this.customClass=function(b){return a.customClass({date:b,mode:a.datepickerMode})},this.split=function(a,b){for(var c=[];a.length>0;)c.push(a.splice(0,b));return c},a.select=function(b){if(a.datepickerMode===o.minMode){var c=p.$viewValue?l.fromTimezone(new Date(p.$viewValue),q.getOption("timezone")):new Date(0,0,0,0,0,0,0);c.setFullYear(b.getFullYear(),b.getMonth(),b.getDate()),c=l.toTimezone(c,q.getOption("timezone")),p.$setViewValue(c),p.$render()}else o.activeDate=b,m(o.modes[o.modes.indexOf(a.datepickerMode)-1]),a.$emit("uib:datepicker.mode");a.$broadcast("uib:datepicker.focus")},a.move=function(a){var b=o.activeDate.getFullYear()+a*(o.step.years||0),c=o.activeDate.getMonth()+a*(o.step.months||0);o.activeDate.setFullYear(b,c,1),o.refreshView()},a.toggleMode=function(b){b=b||1,a.datepickerMode===o.maxMode&&1===b||a.datepickerMode===o.minMode&&-1===b||(m(o.modes[o.modes.indexOf(a.datepickerMode)+b]),a.$emit("uib:datepicker.mode"))},a.keys={13:"enter",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down"};var s=function(){o.element[0].focus()};a.$on("uib:datepicker.focus",s),a.keydown=function(b){var c=a.keys[b.which];if(c&&!b.shiftKey&&!b.altKey&&!a.disabled)if(b.preventDefault(),o.shortcutPropagation||b.stopPropagation(),"enter"===c||"space"===c){if(o.isDisabled(o.activeDate))return;a.select(o.activeDate)}else!b.ctrlKey||"up"!==c&&"down"!==c?(o.handleKeyDown(c,b),o.refreshView()):a.toggleMode("up"===c?1:-1)},b.on("keydown",function(b){a.$apply(function(){a.keydown(b)})}),a.$on("$destroy",function(){for(;r.length;)r.shift()()})}]).controller("UibDaypickerController",["$scope","$element","dateFilter",function(a,b,c){function d(a,b){return 1!==b||a%4!==0||a%100===0&&a%400!==0?f[b]:29}function e(a){var b=new Date(a);b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1}var f=[31,28,31,30,31,30,31,31,30,31,30,31];this.step={months:1},this.element=b,this.init=function(b){angular.extend(b,this),a.showWeeks=b.showWeeks,b.refreshView()},this.getDates=function(a,b){for(var c,d=new Array(b),e=new Date(a),f=0;b>f;)c=new Date(e),d[f++]=c,e.setDate(e.getDate()+1);return d},this._refreshView=function(){var b=this.activeDate.getFullYear(),d=this.activeDate.getMonth(),f=new Date(this.activeDate);f.setFullYear(b,d,1);var g=this.startingDay-f.getDay(),h=g>0?7-g:-g,i=new Date(f);h>0&&i.setDate(-h+1);for(var j=this.getDates(i,42),k=0;42>k;k++)j[k]=angular.extend(this.createDateObject(j[k],this.formatDay),{secondary:j[k].getMonth()!==d,uid:a.uniqueId+"-"+k});a.labels=new Array(7);for(var l=0;7>l;l++)a.labels[l]={abbr:c(j[l].date,this.formatDayHeader),full:c(j[l].date,"EEEE")};if(a.title=c(this.activeDate,this.formatDayTitle),a.rows=this.split(j,7),a.showWeeks){a.weekNumbers=[];for(var m=(11-this.startingDay)%7,n=a.rows.length,o=0;n>o;o++)a.weekNumbers.push(e(a.rows[o][m].date))}},this.compare=function(a,b){var c=new Date(a.getFullYear(),a.getMonth(),a.getDate()),d=new Date(b.getFullYear(),b.getMonth(),b.getDate());return c.setFullYear(a.getFullYear()),d.setFullYear(b.getFullYear()),c-d},this.handleKeyDown=function(a,b){var c=this.activeDate.getDate();if("left"===a)c-=1;else if("up"===a)c-=7;else if("right"===a)c+=1;else if("down"===a)c+=7;else if("pageup"===a||"pagedown"===a){var e=this.activeDate.getMonth()+("pageup"===a?-1:1);this.activeDate.setMonth(e,1),c=Math.min(d(this.activeDate.getFullYear(),this.activeDate.getMonth()),c)}else"home"===a?c=1:"end"===a&&(c=d(this.activeDate.getFullYear(),this.activeDate.getMonth()));this.activeDate.setDate(c)}}]).controller("UibMonthpickerController",["$scope","$element","dateFilter",function(a,b,c){this.step={years:1},this.element=b,this.init=function(a){angular.extend(a,this),a.refreshView()},this._refreshView=function(){for(var b,d=new Array(12),e=this.activeDate.getFullYear(),f=0;12>f;f++)b=new Date(this.activeDate),b.setFullYear(e,f,1),d[f]=angular.extend(this.createDateObject(b,this.formatMonth),{uid:a.uniqueId+"-"+f});a.title=c(this.activeDate,this.formatMonthTitle),a.rows=this.split(d,this.monthColumns),a.yearHeaderColspan=this.monthColumns>3?this.monthColumns-2:1},this.compare=function(a,b){var c=new Date(a.getFullYear(),a.getMonth()),d=new Date(b.getFullYear(),b.getMonth());return c.setFullYear(a.getFullYear()),d.setFullYear(b.getFullYear()),c-d},this.handleKeyDown=function(a,b){var c=this.activeDate.getMonth();if("left"===a)c-=1;else if("up"===a)c-=this.monthColumns;else if("right"===a)c+=1;else if("down"===a)c+=this.monthColumns;else if("pageup"===a||"pagedown"===a){var d=this.activeDate.getFullYear()+("pageup"===a?-1:1);this.activeDate.setFullYear(d)}else"home"===a?c=0:"end"===a&&(c=11);this.activeDate.setMonth(c)}}]).controller("UibYearpickerController",["$scope","$element","dateFilter",function(a,b,c){function d(a){return parseInt((a-1)/f,10)*f+1}var e,f;this.element=b,this.yearpickerInit=function(){e=this.yearColumns,f=this.yearRows*e,this.step={years:f}},this._refreshView=function(){for(var b,c=new Array(f),g=0,h=d(this.activeDate.getFullYear());f>g;g++)b=new Date(this.activeDate),b.setFullYear(h+g,0,1),c[g]=angular.extend(this.createDateObject(b,this.formatYear),{uid:a.uniqueId+"-"+g});a.title=[c[0].label,c[f-1].label].join(" - "),a.rows=this.split(c,e),a.columns=e},this.compare=function(a,b){return a.getFullYear()-b.getFullYear()},this.handleKeyDown=function(a,b){var c=this.activeDate.getFullYear();"left"===a?c-=1:"up"===a?c-=e:"right"===a?c+=1:"down"===a?c+=e:"pageup"===a||"pagedown"===a?c+=("pageup"===a?-1:1)*f:"home"===a?c=d(this.activeDate.getFullYear()):"end"===a&&(c=d(this.activeDate.getFullYear())+f-1),this.activeDate.setFullYear(c)}}]).directive("uibDatepicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/datepicker.html"},scope:{datepickerOptions:"=?"},require:["uibDatepicker","^ngModel"],restrict:"A",controller:"UibDatepickerController",controllerAs:"datepicker",link:function(a,b,c,d){var e=d[0],f=d[1];e.init(f)}}}).directive("uibDaypicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/day.html"},
require:["^uibDatepicker","uibDaypicker"],restrict:"A",controller:"UibDaypickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibMonthpicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/month.html"},require:["^uibDatepicker","uibMonthpicker"],restrict:"A",controller:"UibMonthpickerController",link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibYearpicker",function(){return{templateUrl:function(a,b){return b.templateUrl||"uib/template/datepicker/year.html"},require:["^uibDatepicker","uibYearpicker"],restrict:"A",controller:"UibYearpickerController",link:function(a,b,c,d){var e=d[0];angular.extend(e,d[1]),e.yearpickerInit(),e.refreshView()}}}),angular.module("ui.bootstrap.position",[]).factory("$uibPosition",["$document","$window",function(a,b){var c,d,e={normal:/(auto|scroll)/,hidden:/(auto|scroll|hidden)/},f={auto:/\s?auto?\s?/i,primary:/^(top|bottom|left|right)$/,secondary:/^(top|bottom|left|right|center)$/,vertical:/^(top|bottom)$/},g=/(HTML|BODY)/;return{getRawNode:function(a){return a.nodeName?a:a[0]||a},parseStyle:function(a){return a=parseFloat(a),isFinite(a)?a:0},offsetParent:function(c){function d(a){return"static"===(b.getComputedStyle(a).position||"static")}c=this.getRawNode(c);for(var e=c.offsetParent||a[0].documentElement;e&&e!==a[0].documentElement&&d(e);)e=e.offsetParent;return e||a[0].documentElement},scrollbarWidth:function(e){if(e){if(angular.isUndefined(d)){var f=a.find("body");f.addClass("uib-position-body-scrollbar-measure"),d=b.innerWidth-f[0].clientWidth,d=isFinite(d)?d:0,f.removeClass("uib-position-body-scrollbar-measure")}return d}if(angular.isUndefined(c)){var g=angular.element('<div class="uib-position-scrollbar-measure"></div>');a.find("body").append(g),c=g[0].offsetWidth-g[0].clientWidth,c=isFinite(c)?c:0,g.remove()}return c},scrollbarPadding:function(a){a=this.getRawNode(a);var c=b.getComputedStyle(a),d=this.parseStyle(c.paddingRight),e=this.parseStyle(c.paddingBottom),f=this.scrollParent(a,!1,!0),h=this.scrollbarWidth(g.test(f.tagName));return{scrollbarWidth:h,widthOverflow:f.scrollWidth>f.clientWidth,right:d+h,originalRight:d,heightOverflow:f.scrollHeight>f.clientHeight,bottom:e+h,originalBottom:e}},isScrollable:function(a,c){a=this.getRawNode(a);var d=c?e.hidden:e.normal,f=b.getComputedStyle(a);return d.test(f.overflow+f.overflowY+f.overflowX)},scrollParent:function(c,d,f){c=this.getRawNode(c);var g=d?e.hidden:e.normal,h=a[0].documentElement,i=b.getComputedStyle(c);if(f&&g.test(i.overflow+i.overflowY+i.overflowX))return c;var j="absolute"===i.position,k=c.parentElement||h;if(k===h||"fixed"===i.position)return h;for(;k.parentElement&&k!==h;){var l=b.getComputedStyle(k);if(j&&"static"!==l.position&&(j=!1),!j&&g.test(l.overflow+l.overflowY+l.overflowX))break;k=k.parentElement}return k},position:function(c,d){c=this.getRawNode(c);var e=this.offset(c);if(d){var f=b.getComputedStyle(c);e.top-=this.parseStyle(f.marginTop),e.left-=this.parseStyle(f.marginLeft)}var g=this.offsetParent(c),h={top:0,left:0};return g!==a[0].documentElement&&(h=this.offset(g),h.top+=g.clientTop-g.scrollTop,h.left+=g.clientLeft-g.scrollLeft),{width:Math.round(angular.isNumber(e.width)?e.width:c.offsetWidth),height:Math.round(angular.isNumber(e.height)?e.height:c.offsetHeight),top:Math.round(e.top-h.top),left:Math.round(e.left-h.left)}},offset:function(c){c=this.getRawNode(c);var d=c.getBoundingClientRect();return{width:Math.round(angular.isNumber(d.width)?d.width:c.offsetWidth),height:Math.round(angular.isNumber(d.height)?d.height:c.offsetHeight),top:Math.round(d.top+(b.pageYOffset||a[0].documentElement.scrollTop)),left:Math.round(d.left+(b.pageXOffset||a[0].documentElement.scrollLeft))}},viewportOffset:function(c,d,e){c=this.getRawNode(c),e=e!==!1;var f=c.getBoundingClientRect(),g={top:0,left:0,bottom:0,right:0},h=d?a[0].documentElement:this.scrollParent(c),i=h.getBoundingClientRect();if(g.top=i.top+h.clientTop,g.left=i.left+h.clientLeft,h===a[0].documentElement&&(g.top+=b.pageYOffset,g.left+=b.pageXOffset),g.bottom=g.top+h.clientHeight,g.right=g.left+h.clientWidth,e){var j=b.getComputedStyle(h);g.top+=this.parseStyle(j.paddingTop),g.bottom-=this.parseStyle(j.paddingBottom),g.left+=this.parseStyle(j.paddingLeft),g.right-=this.parseStyle(j.paddingRight)}return{top:Math.round(f.top-g.top),bottom:Math.round(g.bottom-f.bottom),left:Math.round(f.left-g.left),right:Math.round(g.right-f.right)}},parsePlacement:function(a){var b=f.auto.test(a);return b&&(a=a.replace(f.auto,"")),a=a.split("-"),a[0]=a[0]||"top",f.primary.test(a[0])||(a[0]="top"),a[1]=a[1]||"center",f.secondary.test(a[1])||(a[1]="center"),b?a[2]=!0:a[2]=!1,a},positionElements:function(a,c,d,e){a=this.getRawNode(a),c=this.getRawNode(c);var g=angular.isDefined(c.offsetWidth)?c.offsetWidth:c.prop("offsetWidth"),h=angular.isDefined(c.offsetHeight)?c.offsetHeight:c.prop("offsetHeight");d=this.parsePlacement(d);var i=e?this.offset(a):this.position(a),j={top:0,left:0,placement:""};if(d[2]){var k=this.viewportOffset(a,e),l=b.getComputedStyle(c),m={width:g+Math.round(Math.abs(this.parseStyle(l.marginLeft)+this.parseStyle(l.marginRight))),height:h+Math.round(Math.abs(this.parseStyle(l.marginTop)+this.parseStyle(l.marginBottom)))};if(d[0]="top"===d[0]&&m.height>k.top&&m.height<=k.bottom?"bottom":"bottom"===d[0]&&m.height>k.bottom&&m.height<=k.top?"top":"left"===d[0]&&m.width>k.left&&m.width<=k.right?"right":"right"===d[0]&&m.width>k.right&&m.width<=k.left?"left":d[0],d[1]="top"===d[1]&&m.height-i.height>k.bottom&&m.height-i.height<=k.top?"bottom":"bottom"===d[1]&&m.height-i.height>k.top&&m.height-i.height<=k.bottom?"top":"left"===d[1]&&m.width-i.width>k.right&&m.width-i.width<=k.left?"right":"right"===d[1]&&m.width-i.width>k.left&&m.width-i.width<=k.right?"left":d[1],"center"===d[1])if(f.vertical.test(d[0])){var n=i.width/2-g/2;k.left+n<0&&m.width-i.width<=k.right?d[1]="left":k.right+n<0&&m.width-i.width<=k.left&&(d[1]="right")}else{var o=i.height/2-m.height/2;k.top+o<0&&m.height-i.height<=k.bottom?d[1]="top":k.bottom+o<0&&m.height-i.height<=k.top&&(d[1]="bottom")}}switch(d[0]){case"top":j.top=i.top-h;break;case"bottom":j.top=i.top+i.height;break;case"left":j.left=i.left-g;break;case"right":j.left=i.left+i.width}switch(d[1]){case"top":j.top=i.top;break;case"bottom":j.top=i.top+i.height-h;break;case"left":j.left=i.left;break;case"right":j.left=i.left+i.width-g;break;case"center":f.vertical.test(d[0])?j.left=i.left+i.width/2-g/2:j.top=i.top+i.height/2-h/2}return j.top=Math.round(j.top),j.left=Math.round(j.left),j.placement="center"===d[1]?d[0]:d[0]+"-"+d[1],j},adjustTop:function(a,b,c,d){return-1!==a.indexOf("top")&&c!==d?{top:b.top-d+"px"}:void 0},positionArrow:function(a,c){a=this.getRawNode(a);var d=a.querySelector(".tooltip-inner, .popover-inner");if(d){var e=angular.element(d).hasClass("tooltip-inner"),g=e?a.querySelector(".tooltip-arrow"):a.querySelector(".arrow");if(g){var h={top:"",bottom:"",left:"",right:""};if(c=this.parsePlacement(c),"center"===c[1])return void angular.element(g).css(h);var i="border-"+c[0]+"-width",j=b.getComputedStyle(g)[i],k="border-";k+=f.vertical.test(c[0])?c[0]+"-"+c[1]:c[1]+"-"+c[0],k+="-radius";var l=b.getComputedStyle(e?d:a)[k];switch(c[0]){case"top":h.bottom=e?"0":"-"+j;break;case"bottom":h.top=e?"0":"-"+j;break;case"left":h.right=e?"0":"-"+j;break;case"right":h.left=e?"0":"-"+j}h[c[1]]=l,angular.element(g).css(h)}}}}}]),angular.module("ui.bootstrap.datepickerPopup",["ui.bootstrap.datepicker","ui.bootstrap.position"]).value("$datepickerPopupLiteralWarning",!0).constant("uibDatepickerPopupConfig",{altInputFormats:[],appendToBody:!1,clearText:"Clear",closeOnDateSelection:!0,closeText:"Done",currentText:"Today",datepickerPopup:"yyyy-MM-dd",datepickerPopupTemplateUrl:"uib/template/datepickerPopup/popup.html",datepickerTemplateUrl:"uib/template/datepicker/datepicker.html",html5Types:{date:"yyyy-MM-dd","datetime-local":"yyyy-MM-ddTHH:mm:ss.sss",month:"yyyy-MM"},onOpenFocus:!0,showButtonBar:!0,placement:"auto bottom-left"}).controller("UibDatepickerPopupController",["$scope","$element","$attrs","$compile","$log","$parse","$window","$document","$rootScope","$uibPosition","dateFilter","uibDateParser","uibDatepickerPopupConfig","$timeout","uibDatepickerConfig","$datepickerPopupLiteralWarning",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){function q(b){var c=l.parse(b,x,a.date);if(isNaN(c))for(var d=0;d<J.length;d++)if(c=l.parse(b,J[d],a.date),!isNaN(c))return c;return c}function r(a){if(angular.isNumber(a)&&(a=new Date(a)),!a)return null;if(angular.isDate(a)&&!isNaN(a))return a;if(angular.isString(a)){var b=q(a);if(!isNaN(b))return l.toTimezone(b,H.getOption("timezone"))}return H.getOption("allowInvalid")?a:void 0}function s(a,b){var d=a||b;return c.ngRequired||d?(angular.isNumber(d)&&(d=new Date(d)),d?angular.isDate(d)&&!isNaN(d)?!0:angular.isString(d)?!isNaN(q(d)):!1:!0):!0}function t(c){if(a.isOpen||!a.disabled){var d=I[0],e=b[0].contains(c.target),f=void 0!==d.contains&&d.contains(c.target);!a.isOpen||e||f||a.$apply(function(){a.isOpen=!1})}}function u(c){27===c.which&&a.isOpen?(c.preventDefault(),c.stopPropagation(),a.$apply(function(){a.isOpen=!1}),b[0].focus()):40!==c.which||a.isOpen||(c.preventDefault(),c.stopPropagation(),a.$apply(function(){a.isOpen=!0}))}function v(){if(a.isOpen){var d=angular.element(I[0].querySelector(".uib-datepicker-popup")),e=c.popupPlacement?c.popupPlacement:m.placement,f=j.positionElements(b,d,e,z);d.css({top:f.top+"px",left:f.left+"px"}),d.hasClass("uib-position-measure")&&d.removeClass("uib-position-measure")}}function w(a){var b;return angular.version.minor<6?(b=angular.isObject(a.$options)?a.$options:{timezone:null},b.getOption=function(a){return b[a]}):b=a.$options,b}var x,y,z,A,B,C,D,E,F,G,H,I,J,K=!1,L=[];this.init=function(e){if(G=e,H=w(G),y=angular.isDefined(c.closeOnDateSelection)?a.$parent.$eval(c.closeOnDateSelection):m.closeOnDateSelection,z=angular.isDefined(c.datepickerAppendToBody)?a.$parent.$eval(c.datepickerAppendToBody):m.appendToBody,A=angular.isDefined(c.onOpenFocus)?a.$parent.$eval(c.onOpenFocus):m.onOpenFocus,B=angular.isDefined(c.datepickerPopupTemplateUrl)?c.datepickerPopupTemplateUrl:m.datepickerPopupTemplateUrl,C=angular.isDefined(c.datepickerTemplateUrl)?c.datepickerTemplateUrl:m.datepickerTemplateUrl,J=angular.isDefined(c.altInputFormats)?a.$parent.$eval(c.altInputFormats):m.altInputFormats,a.showButtonBar=angular.isDefined(c.showButtonBar)?a.$parent.$eval(c.showButtonBar):m.showButtonBar,m.html5Types[c.type]?(x=m.html5Types[c.type],K=!0):(x=c.uibDatepickerPopup||m.datepickerPopup,c.$observe("uibDatepickerPopup",function(a,b){var c=a||m.datepickerPopup;if(c!==x&&(x=c,G.$modelValue=null,!x))throw new Error("uibDatepickerPopup must have a date format specified.")})),!x)throw new Error("uibDatepickerPopup must have a date format specified.");if(K&&c.uibDatepickerPopup)throw new Error("HTML5 date input types do not support custom formats.");D=angular.element("<div uib-datepicker-popup-wrap><div uib-datepicker></div></div>"),D.attr({"ng-model":"date","ng-change":"dateSelection(date)","template-url":B}),E=angular.element(D.children()[0]),E.attr("template-url",C),a.datepickerOptions||(a.datepickerOptions={}),K&&"month"===c.type&&(a.datepickerOptions.datepickerMode="month",a.datepickerOptions.minMode="month"),E.attr("datepicker-options","datepickerOptions"),K?G.$formatters.push(function(b){return a.date=l.fromTimezone(b,H.getOption("timezone")),b}):(G.$$parserName="date",G.$validators.date=s,G.$parsers.unshift(r),G.$formatters.push(function(b){return G.$isEmpty(b)?(a.date=b,b):(angular.isNumber(b)&&(b=new Date(b)),a.date=l.fromTimezone(b,H.getOption("timezone")),l.filter(a.date,x))})),G.$viewChangeListeners.push(function(){a.date=q(G.$viewValue)}),b.on("keydown",u),I=d(D)(a),D.remove(),z?h.find("body").append(I):b.after(I),a.$on("$destroy",function(){for(a.isOpen===!0&&(i.$$phase||a.$apply(function(){a.isOpen=!1})),I.remove(),b.off("keydown",u),h.off("click",t),F&&F.off("scroll",v),angular.element(g).off("resize",v);L.length;)L.shift()()})},a.getText=function(b){return a[b+"Text"]||m[b+"Text"]},a.isDisabled=function(b){"today"===b&&(b=l.fromTimezone(new Date,H.getOption("timezone")));var c={};return angular.forEach(["minDate","maxDate"],function(b){a.datepickerOptions[b]?angular.isDate(a.datepickerOptions[b])?c[b]=new Date(a.datepickerOptions[b]):(p&&e.warn("Literal date support has been deprecated, please switch to date object usage"),c[b]=new Date(k(a.datepickerOptions[b],"medium"))):c[b]=null}),a.datepickerOptions&&c.minDate&&a.compare(b,c.minDate)<0||c.maxDate&&a.compare(b,c.maxDate)>0},a.compare=function(a,b){return new Date(a.getFullYear(),a.getMonth(),a.getDate())-new Date(b.getFullYear(),b.getMonth(),b.getDate())},a.dateSelection=function(c){a.date=c;var d=a.date?l.filter(a.date,x):null;b.val(d),G.$setViewValue(d),y&&(a.isOpen=!1,b[0].focus())},a.keydown=function(c){27===c.which&&(c.stopPropagation(),a.isOpen=!1,b[0].focus())},a.select=function(b,c){if(c.stopPropagation(),"today"===b){var d=new Date;angular.isDate(a.date)?(b=new Date(a.date),b.setFullYear(d.getFullYear(),d.getMonth(),d.getDate())):(b=l.fromTimezone(d,H.getOption("timezone")),b.setHours(0,0,0,0))}a.dateSelection(b)},a.close=function(c){c.stopPropagation(),a.isOpen=!1,b[0].focus()},a.disabled=angular.isDefined(c.disabled)||!1,c.ngDisabled&&L.push(a.$parent.$watch(f(c.ngDisabled),function(b){a.disabled=b})),a.$watch("isOpen",function(d){d?a.disabled?a.isOpen=!1:n(function(){v(),A&&a.$broadcast("uib:datepicker.focus"),h.on("click",t);var d=c.popupPlacement?c.popupPlacement:m.placement;z||j.parsePlacement(d)[2]?(F=F||angular.element(j.scrollParent(b)),F&&F.on("scroll",v)):F=null,angular.element(g).on("resize",v)},0,!1):(h.off("click",t),F&&F.off("scroll",v),angular.element(g).off("resize",v))}),a.$on("uib:datepicker.mode",function(){n(v,0,!1)})}]).directive("uibDatepickerPopup",function(){return{require:["ngModel","uibDatepickerPopup"],controller:"UibDatepickerPopupController",scope:{datepickerOptions:"=?",isOpen:"=?",currentText:"@",clearText:"@",closeText:"@"},link:function(a,b,c,d){var e=d[0],f=d[1];f.init(e)}}}).directive("uibDatepickerPopupWrap",function(){return{restrict:"A",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/datepickerPopup/popup.html"}}}),angular.module("ui.bootstrap.debounce",[]).factory("$$debounce",["$timeout",function(a){return function(b,c){var d;return function(){var e=this,f=Array.prototype.slice.call(arguments);d&&a.cancel(d),d=a(function(){b.apply(e,f)},c)}}}]),angular.module("ui.bootstrap.multiMap",[]).factory("$$multiMap",function(){return{createNew:function(){var a={};return{entries:function(){return Object.keys(a).map(function(b){return{key:b,value:a[b]}})},get:function(b){return a[b]},hasKey:function(b){return!!a[b]},keys:function(){return Object.keys(a)},put:function(b,c){a[b]||(a[b]=[]),a[b].push(c)},remove:function(b,c){var d=a[b];if(d){var e=d.indexOf(c);-1!==e&&d.splice(e,1),d.length||delete a[b]}}}}}}),angular.module("ui.bootstrap.dropdown",["ui.bootstrap.multiMap","ui.bootstrap.position"]).constant("uibDropdownConfig",{appendToOpenClass:"uib-dropdown-open",openClass:"open"}).service("uibDropdownService",["$document","$rootScope","$$multiMap",function(a,b,c){var d=null,e=c.createNew();this.isOnlyOpen=function(a,b){var c=e.get(b);if(c){var d=c.reduce(function(b,c){return c.scope===a?c:b},{});if(d)return 1===c.length}return!1},this.open=function(b,c,g){if(d||a.on("click",f),d&&d!==b&&(d.isOpen=!1),d=b,g){var h=e.get(g);if(h){var i=h.map(function(a){return a.scope});-1===i.indexOf(b)&&e.put(g,{scope:b})}else e.put(g,{scope:b})}},this.close=function(b,c,g){if(d===b&&(a.off("click",f),a.off("keydown",this.keybindFilter),d=null),g){var h=e.get(g);if(h){var i=h.reduce(function(a,c){return c.scope===b?c:a},{});i&&e.remove(g,i)}}};var f=function(a){if(d&&d.isOpen&&!(a&&"disabled"===d.getAutoClose()||a&&3===a.which)){var c=d.getToggleElement();if(!(a&&c&&c[0].contains(a.target))){var e=d.getDropdownElement();a&&"outsideClick"===d.getAutoClose()&&e&&e[0].contains(a.target)||(d.focusToggleElement(),d.isOpen=!1,b.$$phase||d.$apply())}}};this.keybindFilter=function(a){if(d){var b=d.getDropdownElement(),c=d.getToggleElement(),e=b&&b[0].contains(a.target),g=c&&c[0].contains(a.target);27===a.which?(a.stopPropagation(),d.focusToggleElement(),f()):d.isKeynavEnabled()&&-1!==[38,40].indexOf(a.which)&&d.isOpen&&(e||g)&&(a.preventDefault(),a.stopPropagation(),d.focusDropdownEntry(a.which))}}}]).controller("UibDropdownController",["$scope","$element","$attrs","$parse","uibDropdownConfig","uibDropdownService","$animate","$uibPosition","$document","$compile","$templateRequest",function(a,b,c,d,e,f,g,h,i,j,k){function l(){b.append(o.dropdownMenu)}var m,n,o=this,p=a.$new(),q=e.appendToOpenClass,r=e.openClass,s=angular.noop,t=c.onToggle?d(c.onToggle):angular.noop,u=!1,v=i.find("body");b.addClass("dropdown"),this.init=function(){c.isOpen&&(n=d(c.isOpen),s=n.assign,a.$watch(n,function(a){p.isOpen=!!a})),u=angular.isDefined(c.keyboardNav)},this.toggle=function(a){return p.isOpen=arguments.length?!!a:!p.isOpen,angular.isFunction(s)&&s(p,p.isOpen),p.isOpen},this.isOpen=function(){return p.isOpen},p.getToggleElement=function(){return o.toggleElement},p.getAutoClose=function(){return c.autoClose||"always"},p.getElement=function(){return b},p.isKeynavEnabled=function(){return u},p.focusDropdownEntry=function(a){var c=o.dropdownMenu?angular.element(o.dropdownMenu).find("a"):b.find("ul").eq(0).find("a");switch(a){case 40:angular.isNumber(o.selectedOption)?o.selectedOption=o.selectedOption===c.length-1?o.selectedOption:o.selectedOption+1:o.selectedOption=0;break;case 38:angular.isNumber(o.selectedOption)?o.selectedOption=0===o.selectedOption?0:o.selectedOption-1:o.selectedOption=c.length-1}c[o.selectedOption].focus()},p.getDropdownElement=function(){return o.dropdownMenu},p.focusToggleElement=function(){o.toggleElement&&o.toggleElement[0].focus()},p.$watch("isOpen",function(e,n){var u=null,w=!1;if(angular.isDefined(c.dropdownAppendTo)){var x=d(c.dropdownAppendTo)(p);x&&(u=angular.element(x))}if(angular.isDefined(c.dropdownAppendToBody)){var y=d(c.dropdownAppendToBody)(p);y!==!1&&(w=!0)}if(w&&!u&&(u=v),u&&o.dropdownMenu&&(e?(u.append(o.dropdownMenu),b.on("$destroy",l)):(b.off("$destroy",l),l())),u&&o.dropdownMenu){var z,A,B,C=h.positionElements(b,o.dropdownMenu,"bottom-left",!0),D=0;if(z={top:C.top+"px",display:e?"block":"none"},A=o.dropdownMenu.hasClass("dropdown-menu-right"),A?(z.left="auto",B=h.scrollbarPadding(u),B.heightOverflow&&B.scrollbarWidth&&(D=B.scrollbarWidth),z.right=window.innerWidth-D-(C.left+b.prop("offsetWidth"))+"px"):(z.left=C.left+"px",z.right="auto"),!w){var E=h.offset(u);z.top=C.top-E.top+"px",A?z.right=window.innerWidth-(C.left-E.left+b.prop("offsetWidth"))+"px":z.left=C.left-E.left+"px"}o.dropdownMenu.css(z)}var F=u?u:b,G=u?q:r,H=F.hasClass(G),I=f.isOnlyOpen(a,u);if(H===!e){var J;J=u?I?"removeClass":"addClass":e?"addClass":"removeClass",g[J](F,G).then(function(){angular.isDefined(e)&&e!==n&&t(a,{open:!!e})})}if(e)o.dropdownMenuTemplateUrl?k(o.dropdownMenuTemplateUrl).then(function(a){m=p.$new(),j(a.trim())(m,function(a){var b=a;o.dropdownMenu.replaceWith(b),o.dropdownMenu=b,i.on("keydown",f.keybindFilter)})}):i.on("keydown",f.keybindFilter),p.focusToggleElement(),f.open(p,b,u);else{if(f.close(p,b,u),o.dropdownMenuTemplateUrl){m&&m.$destroy();var K=angular.element('<ul class="dropdown-menu"></ul>');o.dropdownMenu.replaceWith(K),o.dropdownMenu=K}o.selectedOption=null}angular.isFunction(s)&&s(a,e)})}]).directive("uibDropdown",function(){return{controller:"UibDropdownController",link:function(a,b,c,d){d.init()}}}).directive("uibDropdownMenu",function(){return{restrict:"A",require:"?^uibDropdown",link:function(a,b,c,d){if(d&&!angular.isDefined(c.dropdownNested)){b.addClass("dropdown-menu");var e=c.templateUrl;e&&(d.dropdownMenuTemplateUrl=e),d.dropdownMenu||(d.dropdownMenu=b)}}}}).directive("uibDropdownToggle",function(){return{require:"?^uibDropdown",link:function(a,b,c,d){if(d){b.addClass("dropdown-toggle"),d.toggleElement=b;var e=function(e){e.preventDefault(),b.hasClass("disabled")||c.disabled||a.$apply(function(){d.toggle()})};b.on("click",e),b.attr({"aria-haspopup":!0,"aria-expanded":!1}),a.$watch(d.isOpen,function(a){b.attr("aria-expanded",!!a)}),a.$on("$destroy",function(){b.off("click",e)})}}}}),angular.module("ui.bootstrap.stackedMap",[]).factory("$$stackedMap",function(){return{createNew:function(){var a=[];return{add:function(b,c){a.push({key:b,value:c})},get:function(b){for(var c=0;c<a.length;c++)if(b===a[c].key)return a[c]},keys:function(){for(var b=[],c=0;c<a.length;c++)b.push(a[c].key);return b},top:function(){return a[a.length-1]},remove:function(b){for(var c=-1,d=0;d<a.length;d++)if(b===a[d].key){c=d;break}return a.splice(c,1)[0]},removeTop:function(){return a.pop()},length:function(){return a.length}}}}}),angular.module("ui.bootstrap.modal",["ui.bootstrap.multiMap","ui.bootstrap.stackedMap","ui.bootstrap.position"]).provider("$uibResolve",function(){var a=this;this.resolver=null,this.setResolver=function(a){this.resolver=a},this.$get=["$injector","$q",function(b,c){var d=a.resolver?b.get(a.resolver):null;return{resolve:function(a,e,f,g){if(d)return d.resolve(a,e,f,g);var h=[];return angular.forEach(a,function(a){angular.isFunction(a)||angular.isArray(a)?h.push(c.resolve(b.invoke(a))):angular.isString(a)?h.push(c.resolve(b.get(a))):h.push(c.resolve(a))}),c.all(h).then(function(b){var c={},d=0;return angular.forEach(a,function(a,e){c[e]=b[d++]}),c})}}}]}).directive("uibModalBackdrop",["$animate","$injector","$uibModalStack",function(a,b,c){function d(b,d,e){e.modalInClass&&(a.addClass(d,e.modalInClass),b.$on(c.NOW_CLOSING_EVENT,function(c,f){var g=f();b.modalOptions.animation?a.removeClass(d,e.modalInClass).then(g):g()}))}return{restrict:"A",compile:function(a,b){return a.addClass(b.backdropClass),d}}}]).directive("uibModalWindow",["$uibModalStack","$q","$animateCss","$document",function(a,b,c,d){return{scope:{index:"@"},restrict:"A",transclude:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/modal/window.html"},link:function(e,f,g){f.addClass(g.windowTopClass||""),e.size=g.size,e.close=function(b){var c=a.getTop();c&&c.value.backdrop&&"static"!==c.value.backdrop&&b.target===b.currentTarget&&(b.preventDefault(),b.stopPropagation(),a.dismiss(c.key,"backdrop click"))},f.on("click",e.close),e.$isRendered=!0;var h=b.defer();e.$$postDigest(function(){h.resolve()}),h.promise.then(function(){var h=null;g.modalInClass&&(h=c(f,{addClass:g.modalInClass}).start(),e.$on(a.NOW_CLOSING_EVENT,function(a,b){var d=b();c(f,{removeClass:g.modalInClass}).start().then(d)})),b.when(h).then(function(){var b=a.getTop();if(b&&a.modalRendered(b.key),!d[0].activeElement||!f[0].contains(d[0].activeElement)){var c=f[0].querySelector("[autofocus]");c?c.focus():f[0].focus()}})})}}}]).directive("uibModalAnimationClass",function(){return{compile:function(a,b){b.modalAnimation&&a.addClass(b.uibModalAnimationClass)}}}).directive("uibModalTransclude",["$animate",function(a){return{link:function(b,c,d,e,f){f(b.$parent,function(b){c.empty(),a.enter(b,c)})}}}]).factory("$uibModalStack",["$animate","$animateCss","$document","$compile","$rootScope","$q","$$multiMap","$$stackedMap","$uibPosition",function(a,b,c,d,e,f,g,h,i){function j(a){var b="-";return a.replace(E,function(a,c){return(c?b:"")+a.toLowerCase()})}function k(a){return!!(a.offsetWidth||a.offsetHeight||a.getClientRects().length)}function l(){for(var a=-1,b=x.keys(),c=0;c<b.length;c++)x.get(b[c]).value.backdrop&&(a=c);return a>-1&&A>a&&(a=A),a}function m(a,b){var c=x.get(a).value,d=c.appendTo;x.remove(a),B=x.top(),B&&(A=parseInt(B.value.modalDomEl.attr("index"),10)),p(c.modalDomEl,c.modalScope,function(){var b=c.openedClass||w;y.remove(b,a);var e=y.hasKey(b);d.toggleClass(b,e),!e&&v&&v.heightOverflow&&v.scrollbarWidth&&(v.originalRight?d.css({paddingRight:v.originalRight+"px"}):d.css({paddingRight:""}),v=null),n(!0)},c.closedDeferred),o(),b&&b.focus?b.focus():d.focus&&d.focus()}function n(a){var b;x.length()>0&&(b=x.top().value,b.modalDomEl.toggleClass(b.windowTopClass||"",a))}function o(){if(t&&-1===l()){var a=u;p(t,u,function(){a=null}),t=void 0,u=void 0}}function p(b,c,d,e){function g(){g.done||(g.done=!0,a.leave(b).then(function(){d&&d(),b.remove(),e&&e.resolve()}),c.$destroy())}var h,i=null,j=function(){return h||(h=f.defer(),i=h.promise),function(){h.resolve()}};return c.$broadcast(z.NOW_CLOSING_EVENT,j),f.when(i).then(g)}function q(a){if(a.isDefaultPrevented())return a;var b=x.top();if(b)switch(a.which){case 27:b.value.keyboard&&(a.preventDefault(),e.$apply(function(){z.dismiss(b.key,"escape key press")}));break;case 9:var c=z.loadFocusElementList(b),d=!1;a.shiftKey?(z.isFocusInFirstItem(a,c)||z.isModalFocused(a,b))&&(d=z.focusLastFocusableElement(c)):z.isFocusInLastItem(a,c)&&(d=z.focusFirstFocusableElement(c)),d&&(a.preventDefault(),a.stopPropagation())}}function r(a,b,c){return!a.value.modalScope.$broadcast("modal.closing",b,c).defaultPrevented}function s(){Array.prototype.forEach.call(document.querySelectorAll("["+C+"]"),function(a){var b=parseInt(a.getAttribute(C),10),c=b-1;a.setAttribute(C,c),c||(a.removeAttribute(C),a.removeAttribute("aria-hidden"))})}var t,u,v,w="modal-open",x=h.createNew(),y=g.createNew(),z={NOW_CLOSING_EVENT:"modal.stack.now-closing"},A=0,B=null,C="data-bootstrap-modal-aria-hidden-count",D="a[href], area[href], input:not([disabled]):not([tabindex='-1']), button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']), textarea:not([disabled]):not([tabindex='-1']), iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]",E=/[A-Z]/g;return e.$watch(l,function(a){u&&(u.index=a)}),c.on("keydown",q),e.$on("$destroy",function(){c.off("keydown",q)}),z.open=function(b,f){function g(a){function b(a){var b=a.parent()?a.parent().children():[];return Array.prototype.filter.call(b,function(b){return b!==a[0]})}if(a&&"BODY"!==a[0].tagName)return b(a).forEach(function(a){var b="true"===a.getAttribute("aria-hidden"),c=parseInt(a.getAttribute(C),10);c||(c=b?1:0),a.setAttribute(C,c+1),a.setAttribute("aria-hidden","true")}),g(a.parent())}var h=c[0].activeElement,k=f.openedClass||w;n(!1),B=x.top(),x.add(b,{deferred:f.deferred,renderDeferred:f.renderDeferred,closedDeferred:f.closedDeferred,modalScope:f.scope,backdrop:f.backdrop,keyboard:f.keyboard,openedClass:f.openedClass,windowTopClass:f.windowTopClass,animation:f.animation,appendTo:f.appendTo}),y.put(k,b);var m=f.appendTo,o=l();o>=0&&!t&&(u=e.$new(!0),u.modalOptions=f,u.index=o,t=angular.element('<div uib-modal-backdrop="modal-backdrop"></div>'),t.attr({"class":"modal-backdrop","ng-style":"{'z-index': 1040 + (index && 1 || 0) + index*10}","uib-modal-animation-class":"fade","modal-in-class":"in"}),f.backdropClass&&t.addClass(f.backdropClass),f.animation&&t.attr("modal-animation","true"),d(t)(u),a.enter(t,m),i.isScrollable(m)&&(v=i.scrollbarPadding(m),v.heightOverflow&&v.scrollbarWidth&&m.css({paddingRight:v.right+"px"})));var p;f.component?(p=document.createElement(j(f.component.name)),p=angular.element(p),p.attr({resolve:"$resolve","modal-instance":"$uibModalInstance",close:"$close($value)",dismiss:"$dismiss($value)"})):p=f.content,A=B?parseInt(B.value.modalDomEl.attr("index"),10)+1:0;var q=angular.element('<div uib-modal-window="modal-window"></div>');q.attr({"class":"modal","template-url":f.windowTemplateUrl,"window-top-class":f.windowTopClass,role:"dialog","aria-labelledby":f.ariaLabelledBy,"aria-describedby":f.ariaDescribedBy,size:f.size,index:A,animate:"animate","ng-style":"{'z-index': 1050 + $$topModalIndex*10, display: 'block'}",tabindex:-1,"uib-modal-animation-class":"fade","modal-in-class":"in"}).append(p),f.windowClass&&q.addClass(f.windowClass),f.animation&&q.attr("modal-animation","true"),m.addClass(k),f.scope&&(f.scope.$$topModalIndex=A),a.enter(d(q)(f.scope),m),x.top().value.modalDomEl=q,x.top().value.modalOpener=h,g(q)},z.close=function(a,b){var c=x.get(a);return s(),c&&r(c,b,!0)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.resolve(b),m(a,c.value.modalOpener),!0):!c},z.dismiss=function(a,b){var c=x.get(a);return s(),c&&r(c,b,!1)?(c.value.modalScope.$$uibDestructionScheduled=!0,c.value.deferred.reject(b),m(a,c.value.modalOpener),!0):!c},z.dismissAll=function(a){for(var b=this.getTop();b&&this.dismiss(b.key,a);)b=this.getTop()},z.getTop=function(){return x.top()},z.modalRendered=function(a){var b=x.get(a);b&&b.value.renderDeferred.resolve()},z.focusFirstFocusableElement=function(a){return a.length>0?(a[0].focus(),!0):!1},z.focusLastFocusableElement=function(a){return a.length>0?(a[a.length-1].focus(),!0):!1},z.isModalFocused=function(a,b){if(a&&b){var c=b.value.modalDomEl;if(c&&c.length)return(a.target||a.srcElement)===c[0]}return!1},z.isFocusInFirstItem=function(a,b){return b.length>0?(a.target||a.srcElement)===b[0]:!1},z.isFocusInLastItem=function(a,b){return b.length>0?(a.target||a.srcElement)===b[b.length-1]:!1},z.loadFocusElementList=function(a){if(a){var b=a.value.modalDomEl;if(b&&b.length){var c=b[0].querySelectorAll(D);return c?Array.prototype.filter.call(c,function(a){return k(a)}):c}}},z}]).provider("$uibModal",function(){var a={options:{animation:!0,backdrop:!0,keyboard:!0},$get:["$rootScope","$q","$document","$templateRequest","$controller","$uibResolve","$uibModalStack",function(b,c,d,e,f,g,h){function i(a){return a.template?c.when(a.template):e(angular.isFunction(a.templateUrl)?a.templateUrl():a.templateUrl)}var j={},k=null;return j.getPromiseChain=function(){return k},j.open=function(e){function j(){return q}var l=c.defer(),m=c.defer(),n=c.defer(),o=c.defer(),p={result:l.promise,opened:m.promise,closed:n.promise,rendered:o.promise,close:function(a){return h.close(p,a)},dismiss:function(a){return h.dismiss(p,a)}};if(e=angular.extend({},a.options,e),e.resolve=e.resolve||{},e.appendTo=e.appendTo||d.find("body").eq(0),!e.appendTo.length)throw new Error("appendTo element not found. Make sure that the element passed is in DOM.");if(!e.component&&!e.template&&!e.templateUrl)throw new Error("One of component or template or templateUrl options is required.");var q;q=e.component?c.when(g.resolve(e.resolve,{},null,null)):c.all([i(e),g.resolve(e.resolve,{},null,null)]);var r;return r=k=c.all([k]).then(j,j).then(function(a){function c(b,c,d,e){b.$scope=g,b.$scope.$resolve={},d?b.$scope.$uibModalInstance=p:b.$uibModalInstance=p;var f=c?a[1]:a;angular.forEach(f,function(a,c){e&&(b[c]=a),b.$scope.$resolve[c]=a})}var d=e.scope||b,g=d.$new();g.$close=p.close,g.$dismiss=p.dismiss,g.$on("$destroy",function(){g.$$uibDestructionScheduled||g.$dismiss("$uibUnscheduledDestruction")});var i,j,k={scope:g,deferred:l,renderDeferred:o,closedDeferred:n,animation:e.animation,backdrop:e.backdrop,keyboard:e.keyboard,backdropClass:e.backdropClass,windowTopClass:e.windowTopClass,windowClass:e.windowClass,windowTemplateUrl:e.windowTemplateUrl,ariaLabelledBy:e.ariaLabelledBy,ariaDescribedBy:e.ariaDescribedBy,size:e.size,openedClass:e.openedClass,appendTo:e.appendTo},q={},r={};e.component?(c(q,!1,!0,!1),q.name=e.component,k.component=q):e.controller&&(c(r,!0,!1,!0),j=f(e.controller,r,!0,e.controllerAs),e.controllerAs&&e.bindToController&&(i=j.instance,i.$close=g.$close,i.$dismiss=g.$dismiss,angular.extend(i,{$resolve:r.$scope.$resolve},d)),i=j(),angular.isFunction(i.$onInit)&&i.$onInit()),e.component||(k.content=a[0]),h.open(p,k),m.resolve(!0)},function(a){m.reject(a),l.reject(a)})["finally"](function(){k===r&&(k=null)}),p},j}]};return a}),angular.module("ui.bootstrap.paging",[]).factory("uibPaging",["$parse",function(a){return{create:function(b,c,d){b.setNumPages=d.numPages?a(d.numPages).assign:angular.noop,b.ngModelCtrl={$setViewValue:angular.noop},b._watchers=[],b.init=function(a,e){b.ngModelCtrl=a,b.config=e,a.$render=function(){b.render()},d.itemsPerPage?b._watchers.push(c.$parent.$watch(d.itemsPerPage,function(a){
b.itemsPerPage=parseInt(a,10),c.totalPages=b.calculateTotalPages(),b.updatePage()})):b.itemsPerPage=e.itemsPerPage,c.$watch("totalItems",function(a,d){(angular.isDefined(a)||a!==d)&&(c.totalPages=b.calculateTotalPages(),b.updatePage())})},b.calculateTotalPages=function(){var a=b.itemsPerPage<1?1:Math.ceil(c.totalItems/b.itemsPerPage);return Math.max(a||0,1)},b.render=function(){c.page=parseInt(b.ngModelCtrl.$viewValue,10)||1},c.selectPage=function(a,d){d&&d.preventDefault();var e=!c.ngDisabled||!d;e&&c.page!==a&&a>0&&a<=c.totalPages&&(d&&d.target&&d.target.blur(),b.ngModelCtrl.$setViewValue(a),b.ngModelCtrl.$render())},c.getText=function(a){return c[a+"Text"]||b.config[a+"Text"]},c.noPrevious=function(){return 1===c.page},c.noNext=function(){return c.page===c.totalPages},b.updatePage=function(){b.setNumPages(c.$parent,c.totalPages),c.page>c.totalPages?c.selectPage(c.totalPages):b.ngModelCtrl.$render()},c.$on("$destroy",function(){for(;b._watchers.length;)b._watchers.shift()()})}}}]),angular.module("ui.bootstrap.pager",["ui.bootstrap.paging","ui.bootstrap.tabindex"]).controller("UibPagerController",["$scope","$attrs","uibPaging","uibPagerConfig",function(a,b,c,d){a.align=angular.isDefined(b.align)?a.$parent.$eval(b.align):d.align,c.create(this,a,b)}]).constant("uibPagerConfig",{itemsPerPage:10,previousText:"« Previous",nextText:"Next »",align:!0}).directive("uibPager",["uibPagerConfig",function(a){return{scope:{totalItems:"=",previousText:"@",nextText:"@",ngDisabled:"="},require:["uibPager","?ngModel"],restrict:"A",controller:"UibPagerController",controllerAs:"pager",templateUrl:function(a,b){return b.templateUrl||"uib/template/pager/pager.html"},link:function(b,c,d,e){c.addClass("pager");var f=e[0],g=e[1];g&&f.init(g,a)}}}]),angular.module("ui.bootstrap.pagination",["ui.bootstrap.paging","ui.bootstrap.tabindex"]).controller("UibPaginationController",["$scope","$attrs","$parse","uibPaging","uibPaginationConfig",function(a,b,c,d,e){function f(a,b,c){return{number:a,text:b,active:c}}function g(a,b){var c=[],d=1,e=b,g=angular.isDefined(i)&&b>i;g&&(j?(d=Math.max(a-Math.floor(i/2),1),e=d+i-1,e>b&&(e=b,d=e-i+1)):(d=(Math.ceil(a/i)-1)*i+1,e=Math.min(d+i-1,b)));for(var h=d;e>=h;h++){var n=f(h,m(h),h===a);c.push(n)}if(g&&i>0&&(!j||k||l)){if(d>1){if(!l||d>3){var o=f(d-1,"...",!1);c.unshift(o)}if(l){if(3===d){var p=f(2,"2",!1);c.unshift(p)}var q=f(1,"1",!1);c.unshift(q)}}if(b>e){if(!l||b-2>e){var r=f(e+1,"...",!1);c.push(r)}if(l){if(e===b-2){var s=f(b-1,b-1,!1);c.push(s)}var t=f(b,b,!1);c.push(t)}}}return c}var h=this,i=angular.isDefined(b.maxSize)?a.$parent.$eval(b.maxSize):e.maxSize,j=angular.isDefined(b.rotate)?a.$parent.$eval(b.rotate):e.rotate,k=angular.isDefined(b.forceEllipses)?a.$parent.$eval(b.forceEllipses):e.forceEllipses,l=angular.isDefined(b.boundaryLinkNumbers)?a.$parent.$eval(b.boundaryLinkNumbers):e.boundaryLinkNumbers,m=angular.isDefined(b.pageLabel)?function(c){return a.$parent.$eval(b.pageLabel,{$page:c})}:angular.identity;a.boundaryLinks=angular.isDefined(b.boundaryLinks)?a.$parent.$eval(b.boundaryLinks):e.boundaryLinks,a.directionLinks=angular.isDefined(b.directionLinks)?a.$parent.$eval(b.directionLinks):e.directionLinks,b.$set("role","menu"),d.create(this,a,b),b.maxSize&&h._watchers.push(a.$parent.$watch(c(b.maxSize),function(a){i=parseInt(a,10),h.render()}));var n=this.render;this.render=function(){n(),a.page>0&&a.page<=a.totalPages&&(a.pages=g(a.page,a.totalPages))}}]).constant("uibPaginationConfig",{itemsPerPage:10,boundaryLinks:!1,boundaryLinkNumbers:!1,directionLinks:!0,firstText:"First",previousText:"Previous",nextText:"Next",lastText:"Last",rotate:!0,forceEllipses:!1}).directive("uibPagination",["$parse","uibPaginationConfig",function(a,b){return{scope:{totalItems:"=",firstText:"@",previousText:"@",nextText:"@",lastText:"@",ngDisabled:"="},require:["uibPagination","?ngModel"],restrict:"A",controller:"UibPaginationController",controllerAs:"pagination",templateUrl:function(a,b){return b.templateUrl||"uib/template/pagination/pagination.html"},link:function(a,c,d,e){c.addClass("pagination");var f=e[0],g=e[1];g&&f.init(g,b)}}}]),angular.module("ui.bootstrap.tooltip",["ui.bootstrap.position","ui.bootstrap.stackedMap"]).provider("$uibTooltip",function(){function a(a){var b=/[A-Z]/g,c="-";return a.replace(b,function(a,b){return(b?c:"")+a.toLowerCase()})}var b={placement:"top",placementClassPrefix:"",animation:!0,popupDelay:0,popupCloseDelay:0,useContentExp:!1},c={mouseenter:"mouseleave",click:"click",outsideClick:"outsideClick",focus:"blur",none:""},d={};this.options=function(a){angular.extend(d,a)},this.setTriggers=function(a){angular.extend(c,a)},this.$get=["$window","$compile","$timeout","$document","$uibPosition","$interpolate","$rootScope","$parse","$$stackedMap",function(e,f,g,h,i,j,k,l,m){function n(a){if(27===a.which){var b=o.top();b&&(b.value.close(),b=null)}}var o=m.createNew();return h.on("keyup",n),k.$on("$destroy",function(){h.off("keyup",n)}),function(e,k,m,n){function p(a){var b=(a||n.trigger||m).split(" "),d=b.map(function(a){return c[a]||a});return{show:b,hide:d}}n=angular.extend({},b,d,n);var q=a(e),r=j.startSymbol(),s=j.endSymbol(),t="<div "+q+'-popup uib-title="'+r+"title"+s+'" '+(n.useContentExp?'content-exp="contentExp()" ':'content="'+r+"content"+s+'" ')+'origin-scope="origScope" class="uib-position-measure '+k+'" tooltip-animation-class="fade"uib-tooltip-classes ng-class="{ in: isOpen }" ></div>';return{compile:function(a,b){var c=f(t);return function(a,b,d,f){function j(){P.isOpen?q():m()}function m(){O&&!a.$eval(d[k+"Enable"])||(u(),x(),P.popupDelay?H||(H=g(r,P.popupDelay,!1)):r())}function q(){s(),P.popupCloseDelay?I||(I=g(t,P.popupCloseDelay,!1)):t()}function r(){return s(),u(),P.content?(v(),void P.$evalAsync(function(){P.isOpen=!0,y(!0),U()})):angular.noop}function s(){H&&(g.cancel(H),H=null),J&&(g.cancel(J),J=null)}function t(){P&&P.$evalAsync(function(){P&&(P.isOpen=!1,y(!1),P.animation?G||(G=g(w,150,!1)):w())})}function u(){I&&(g.cancel(I),I=null),G&&(g.cancel(G),G=null)}function v(){E||(F=P.$new(),E=c(F,function(a){M?h.find("body").append(a):b.after(a)}),o.add(P,{close:t}),z())}function w(){s(),u(),A(),E&&(E.remove(),E=null,K&&g.cancel(K)),o.remove(P),F&&(F.$destroy(),F=null)}function x(){P.title=d[k+"Title"],S?P.content=S(a):P.content=d[e],P.popupClass=d[k+"Class"],P.placement=angular.isDefined(d[k+"Placement"])?d[k+"Placement"]:n.placement;var b=i.parsePlacement(P.placement);L=b[1]?b[0]+"-"+b[1]:b[0];var c=parseInt(d[k+"PopupDelay"],10),f=parseInt(d[k+"PopupCloseDelay"],10);P.popupDelay=isNaN(c)?n.popupDelay:c,P.popupCloseDelay=isNaN(f)?n.popupCloseDelay:f}function y(b){R&&angular.isFunction(R.assign)&&R.assign(a,b)}function z(){T.length=0,S?(T.push(a.$watch(S,function(a){P.content=a,!a&&P.isOpen&&t()})),T.push(F.$watch(function(){Q||(Q=!0,F.$$postDigest(function(){Q=!1,P&&P.isOpen&&U()}))}))):T.push(d.$observe(e,function(a){P.content=a,!a&&P.isOpen?t():U()})),T.push(d.$observe(k+"Title",function(a){P.title=a,P.isOpen&&U()})),T.push(d.$observe(k+"Placement",function(a){P.placement=a?a:n.placement,P.isOpen&&U()}))}function A(){T.length&&(angular.forEach(T,function(a){a()}),T.length=0)}function B(a){P&&P.isOpen&&E&&(b[0].contains(a.target)||E[0].contains(a.target)||q())}function C(a){27===a.which&&q()}function D(){var c=[],e=[],f=a.$eval(d[k+"Trigger"]);V(),angular.isObject(f)?(Object.keys(f).forEach(function(a){c.push(a),e.push(f[a])}),N={show:c,hide:e}):N=p(f),"none"!==N.show&&N.show.forEach(function(a,c){"outsideClick"===a?(b.on("click",j),h.on("click",B)):a===N.hide[c]?b.on(a,j):a&&(b.on(a,m),b.on(N.hide[c],q)),b.on("keypress",C)})}var E,F,G,H,I,J,K,L,M=angular.isDefined(n.appendToBody)?n.appendToBody:!1,N=p(void 0),O=angular.isDefined(d[k+"Enable"]),P=a.$new(!0),Q=!1,R=angular.isDefined(d[k+"IsOpen"])?l(d[k+"IsOpen"]):!1,S=n.useContentExp?l(d[e]):!1,T=[],U=function(){E&&E.html()&&(J||(J=g(function(){var a=i.positionElements(b,E,P.placement,M),c=angular.isDefined(E.offsetHeight)?E.offsetHeight:E.prop("offsetHeight"),d=M?i.offset(b):i.position(b);E.css({top:a.top+"px",left:a.left+"px"});var e=a.placement.split("-");E.hasClass(e[0])||(E.removeClass(L.split("-")[0]),E.addClass(e[0])),E.hasClass(n.placementClassPrefix+a.placement)||(E.removeClass(n.placementClassPrefix+L),E.addClass(n.placementClassPrefix+a.placement)),K=g(function(){var a=angular.isDefined(E.offsetHeight)?E.offsetHeight:E.prop("offsetHeight"),b=i.adjustTop(e,d,c,a);b&&E.css(b),K=null},0,!1),E.hasClass("uib-position-measure")?(i.positionArrow(E,a.placement),E.removeClass("uib-position-measure")):L!==a.placement&&i.positionArrow(E,a.placement),L=a.placement,J=null},0,!1)))};P.origScope=a,P.isOpen=!1,P.contentExp=function(){return P.content},d.$observe("disabled",function(a){a&&s(),a&&P.isOpen&&t()}),R&&a.$watch(R,function(a){P&&!a===P.isOpen&&j()});var V=function(){N.show.forEach(function(a){"outsideClick"===a?b.off("click",j):(b.off(a,m),b.off(a,j)),b.off("keypress",C)}),N.hide.forEach(function(a){"outsideClick"===a?h.off("click",B):b.off(a,q)})};D();var W=a.$eval(d[k+"Animation"]);P.animation=angular.isDefined(W)?!!W:n.animation;var X,Y=k+"AppendToBody";X=Y in d&&void 0===d[Y]?!0:a.$eval(d[Y]),M=angular.isDefined(X)?X:M,a.$on("$destroy",function(){V(),w(),P=null})}}}}}]}).directive("uibTooltipTemplateTransclude",["$animate","$sce","$compile","$templateRequest",function(a,b,c,d){return{link:function(e,f,g){var h,i,j,k=e.$eval(g.tooltipTemplateTranscludeScope),l=0,m=function(){i&&(i.remove(),i=null),h&&(h.$destroy(),h=null),j&&(a.leave(j).then(function(){i=null}),i=j,j=null)};e.$watch(b.parseAsResourceUrl(g.uibTooltipTemplateTransclude),function(b){var g=++l;b?(d(b,!0).then(function(d){if(g===l){var e=k.$new(),i=d,n=c(i)(e,function(b){m(),a.enter(b,f)});h=e,j=n,h.$emit("$includeContentLoaded",b)}},function(){g===l&&(m(),e.$emit("$includeContentError",b))}),e.$emit("$includeContentRequested",b)):m()}),e.$on("$destroy",m)}}}]).directive("uibTooltipClasses",["$uibPosition",function(a){return{restrict:"A",link:function(b,c,d){if(b.placement){var e=a.parsePlacement(b.placement);c.addClass(e[0])}b.popupClass&&c.addClass(b.popupClass),b.animation&&c.addClass(d.tooltipAnimationClass)}}}]).directive("uibTooltipPopup",function(){return{restrict:"A",scope:{content:"@"},templateUrl:"uib/template/tooltip/tooltip-popup.html"}}).directive("uibTooltip",["$uibTooltip",function(a){return a("uibTooltip","tooltip","mouseenter")}]).directive("uibTooltipTemplatePopup",function(){return{restrict:"A",scope:{contentExp:"&",originScope:"&"},templateUrl:"uib/template/tooltip/tooltip-template-popup.html"}}).directive("uibTooltipTemplate",["$uibTooltip",function(a){return a("uibTooltipTemplate","tooltip","mouseenter",{useContentExp:!0})}]).directive("uibTooltipHtmlPopup",function(){return{restrict:"A",scope:{contentExp:"&"},templateUrl:"uib/template/tooltip/tooltip-html-popup.html"}}).directive("uibTooltipHtml",["$uibTooltip",function(a){return a("uibTooltipHtml","tooltip","mouseenter",{useContentExp:!0})}]),angular.module("ui.bootstrap.popover",["ui.bootstrap.tooltip"]).directive("uibPopoverTemplatePopup",function(){return{restrict:"A",scope:{uibTitle:"@",contentExp:"&",originScope:"&"},templateUrl:"uib/template/popover/popover-template.html"}}).directive("uibPopoverTemplate",["$uibTooltip",function(a){return a("uibPopoverTemplate","popover","click",{useContentExp:!0})}]).directive("uibPopoverHtmlPopup",function(){return{restrict:"A",scope:{contentExp:"&",uibTitle:"@"},templateUrl:"uib/template/popover/popover-html.html"}}).directive("uibPopoverHtml",["$uibTooltip",function(a){return a("uibPopoverHtml","popover","click",{useContentExp:!0})}]).directive("uibPopoverPopup",function(){return{restrict:"A",scope:{uibTitle:"@",content:"@"},templateUrl:"uib/template/popover/popover.html"}}).directive("uibPopover",["$uibTooltip",function(a){return a("uibPopover","popover","click")}]),angular.module("ui.bootstrap.progressbar",[]).constant("uibProgressConfig",{animate:!0,max:100}).controller("UibProgressController",["$scope","$attrs","uibProgressConfig",function(a,b,c){function d(){return angular.isDefined(a.maxParam)?a.maxParam:c.max}var e=this,f=angular.isDefined(b.animate)?a.$parent.$eval(b.animate):c.animate;this.bars=[],a.max=d(),this.addBar=function(a,b,c){f||b.css({transition:"none"}),this.bars.push(a),a.max=d(),a.title=c&&angular.isDefined(c.title)?c.title:"progressbar",a.$watch("value",function(b){a.recalculatePercentage()}),a.recalculatePercentage=function(){var b=e.bars.reduce(function(a,b){return b.percent=+(100*b.value/b.max).toFixed(2),a+b.percent},0);b>100&&(a.percent-=b-100)},a.$on("$destroy",function(){b=null,e.removeBar(a)})},this.removeBar=function(a){this.bars.splice(this.bars.indexOf(a),1),this.bars.forEach(function(a){a.recalculatePercentage()})},a.$watch("maxParam",function(a){e.bars.forEach(function(a){a.max=d(),a.recalculatePercentage()})})}]).directive("uibProgress",function(){return{replace:!0,transclude:!0,controller:"UibProgressController",require:"uibProgress",scope:{maxParam:"=?max"},templateUrl:"uib/template/progressbar/progress.html"}}).directive("uibBar",function(){return{replace:!0,transclude:!0,require:"^uibProgress",scope:{value:"=",type:"@"},templateUrl:"uib/template/progressbar/bar.html",link:function(a,b,c,d){d.addBar(a,b,c)}}}).directive("uibProgressbar",function(){return{replace:!0,transclude:!0,controller:"UibProgressController",scope:{value:"=",maxParam:"=?max",type:"@"},templateUrl:"uib/template/progressbar/progressbar.html",link:function(a,b,c,d){d.addBar(a,angular.element(b.children()[0]),{title:c.title})}}}),angular.module("ui.bootstrap.rating",[]).constant("uibRatingConfig",{max:5,stateOn:null,stateOff:null,enableReset:!0,titles:["one","two","three","four","five"]}).controller("UibRatingController",["$scope","$attrs","uibRatingConfig",function(a,b,c){var d={$setViewValue:angular.noop},e=this;this.init=function(e){d=e,d.$render=this.render,d.$formatters.push(function(a){return angular.isNumber(a)&&a<<0!==a&&(a=Math.round(a)),a}),this.stateOn=angular.isDefined(b.stateOn)?a.$parent.$eval(b.stateOn):c.stateOn,this.stateOff=angular.isDefined(b.stateOff)?a.$parent.$eval(b.stateOff):c.stateOff,this.enableReset=angular.isDefined(b.enableReset)?a.$parent.$eval(b.enableReset):c.enableReset;var f=angular.isDefined(b.titles)?a.$parent.$eval(b.titles):c.titles;this.titles=angular.isArray(f)&&f.length>0?f:c.titles;var g=angular.isDefined(b.ratingStates)?a.$parent.$eval(b.ratingStates):new Array(angular.isDefined(b.max)?a.$parent.$eval(b.max):c.max);a.range=this.buildTemplateObjects(g)},this.buildTemplateObjects=function(a){for(var b=0,c=a.length;c>b;b++)a[b]=angular.extend({index:b},{stateOn:this.stateOn,stateOff:this.stateOff,title:this.getTitle(b)},a[b]);return a},this.getTitle=function(a){return a>=this.titles.length?a+1:this.titles[a]},a.rate=function(b){if(!a.readonly&&b>=0&&b<=a.range.length){var c=e.enableReset&&d.$viewValue===b?0:b;d.$setViewValue(c),d.$render()}},a.enter=function(b){a.readonly||(a.value=b),a.onHover({value:b})},a.reset=function(){a.value=d.$viewValue,a.onLeave()},a.onKeydown=function(b){/(37|38|39|40)/.test(b.which)&&(b.preventDefault(),b.stopPropagation(),a.rate(a.value+(38===b.which||39===b.which?1:-1)))},this.render=function(){a.value=d.$viewValue,a.title=e.getTitle(a.value-1)}}]).directive("uibRating",function(){return{require:["uibRating","ngModel"],restrict:"A",scope:{readonly:"=?readOnly",onHover:"&",onLeave:"&"},controller:"UibRatingController",templateUrl:"uib/template/rating/rating.html",link:function(a,b,c,d){var e=d[0],f=d[1];e.init(f)}}}),angular.module("ui.bootstrap.tabs",[]).controller("UibTabsetController",["$scope",function(a){function b(a){for(var b=0;b<d.tabs.length;b++)if(d.tabs[b].index===a)return b}var c,d=this;d.tabs=[],d.select=function(a,f){if(!e){var g=b(c),h=d.tabs[g];if(h){if(h.tab.onDeselect({$event:f,$selectedIndex:a}),f&&f.isDefaultPrevented())return;h.tab.active=!1}var i=d.tabs[a];i?(i.tab.onSelect({$event:f}),i.tab.active=!0,d.active=i.index,c=i.index):!i&&angular.isDefined(c)&&(d.active=null,c=null)}},d.addTab=function(a){if(d.tabs.push({tab:a,index:a.index}),d.tabs.sort(function(a,b){return a.index>b.index?1:a.index<b.index?-1:0}),a.index===d.active||!angular.isDefined(d.active)&&1===d.tabs.length){var c=b(a.index);d.select(c)}},d.removeTab=function(a){for(var b,c=0;c<d.tabs.length;c++)if(d.tabs[c].tab===a){b=c;break}if(d.tabs[b].index===d.active){var e=b===d.tabs.length-1?b-1:b+1%d.tabs.length;d.select(e)}d.tabs.splice(b,1)},a.$watch("tabset.active",function(a){angular.isDefined(a)&&a!==c&&d.select(b(a))});var e;a.$on("$destroy",function(){e=!0})}]).directive("uibTabset",function(){return{transclude:!0,replace:!0,scope:{},bindToController:{active:"=?",type:"@"},controller:"UibTabsetController",controllerAs:"tabset",templateUrl:function(a,b){return b.templateUrl||"uib/template/tabs/tabset.html"},link:function(a,b,c){a.vertical=angular.isDefined(c.vertical)?a.$parent.$eval(c.vertical):!1,a.justified=angular.isDefined(c.justified)?a.$parent.$eval(c.justified):!1}}}).directive("uibTab",["$parse",function(a){return{require:"^uibTabset",replace:!0,templateUrl:function(a,b){return b.templateUrl||"uib/template/tabs/tab.html"},transclude:!0,scope:{heading:"@",index:"=?",classes:"@?",onSelect:"&select",onDeselect:"&deselect"},controller:function(){},controllerAs:"tab",link:function(b,c,d,e,f){b.disabled=!1,d.disable&&b.$parent.$watch(a(d.disable),function(a){b.disabled=!!a}),angular.isUndefined(d.index)&&(e.tabs&&e.tabs.length?b.index=Math.max.apply(null,e.tabs.map(function(a){return a.index}))+1:b.index=0),angular.isUndefined(d.classes)&&(b.classes=""),b.select=function(a){if(!b.disabled){for(var c,d=0;d<e.tabs.length;d++)if(e.tabs[d].tab===b){c=d;break}e.select(c,a)}},e.addTab(b),b.$on("$destroy",function(){e.removeTab(b)}),b.$transcludeFn=f}}}]).directive("uibTabHeadingTransclude",function(){return{restrict:"A",require:"^uibTab",link:function(a,b){a.$watch("headingElement",function(a){a&&(b.html(""),b.append(a))})}}}).directive("uibTabContentTransclude",function(){function a(a){return a.tagName&&(a.hasAttribute("uib-tab-heading")||a.hasAttribute("data-uib-tab-heading")||a.hasAttribute("x-uib-tab-heading")||"uib-tab-heading"===a.tagName.toLowerCase()||"data-uib-tab-heading"===a.tagName.toLowerCase()||"x-uib-tab-heading"===a.tagName.toLowerCase()||"uib:tab-heading"===a.tagName.toLowerCase())}return{restrict:"A",require:"^uibTabset",link:function(b,c,d){var e=b.$eval(d.uibTabContentTransclude).tab;e.$transcludeFn(e.$parent,function(b){angular.forEach(b,function(b){a(b)?e.headingElement=b:c.append(b)})})}}}),angular.module("ui.bootstrap.timepicker",[]).constant("uibTimepickerConfig",{hourStep:1,minuteStep:1,secondStep:1,showMeridian:!0,showSeconds:!1,meridians:null,readonlyInput:!1,mousewheel:!0,arrowkeys:!0,showSpinners:!0,templateUrl:"uib/template/timepicker/timepicker.html"}).controller("UibTimepickerController",["$scope","$element","$attrs","$parse","$log","$locale","uibTimepickerConfig",function(a,b,c,d,e,f,g){function h(){var b=+a.hours,c=a.showMeridian?b>0&&13>b:b>=0&&24>b;return c&&""!==a.hours?(a.showMeridian&&(12===b&&(b=0),a.meridian===y[1]&&(b+=12)),b):void 0}function i(){var b=+a.minutes,c=b>=0&&60>b;return c&&""!==a.minutes?b:void 0}function j(){var b=+a.seconds;return b>=0&&60>b?b:void 0}function k(a,b){return null===a?"":angular.isDefined(a)&&a.toString().length<2&&!b?"0"+a:a.toString()}function l(a){m(),x.$setViewValue(new Date(v)),n(a)}function m(){s&&s.$setValidity("hours",!0),t&&t.$setValidity("minutes",!0),u&&u.$setValidity("seconds",!0),x.$setValidity("time",!0),a.invalidHours=!1,a.invalidMinutes=!1,a.invalidSeconds=!1}function n(b){if(x.$modelValue){var c=v.getHours(),d=v.getMinutes(),e=v.getSeconds();a.showMeridian&&(c=0===c||12===c?12:c%12),a.hours="h"===b?c:k(c,!z),"m"!==b&&(a.minutes=k(d)),a.meridian=v.getHours()<12?y[0]:y[1],"s"!==b&&(a.seconds=k(e)),a.meridian=v.getHours()<12?y[0]:y[1]}else a.hours=null,a.minutes=null,a.seconds=null,a.meridian=y[0]}function o(a){v=q(v,a),l()}function p(a,b){return q(a,60*b)}function q(a,b){var c=new Date(a.getTime()+1e3*b),d=new Date(a);return d.setHours(c.getHours(),c.getMinutes(),c.getSeconds()),d}function r(){return(null===a.hours||""===a.hours)&&(null===a.minutes||""===a.minutes)&&(!a.showSeconds||a.showSeconds&&(null===a.seconds||""===a.seconds))}var s,t,u,v=new Date,w=[],x={$setViewValue:angular.noop},y=angular.isDefined(c.meridians)?a.$parent.$eval(c.meridians):g.meridians||f.DATETIME_FORMATS.AMPMS,z=angular.isDefined(c.padHours)?a.$parent.$eval(c.padHours):!0;a.tabindex=angular.isDefined(c.tabindex)?c.tabindex:0,b.removeAttr("tabindex"),this.init=function(b,d){x=b,x.$render=this.render,x.$formatters.unshift(function(a){return a?new Date(a):null});var e=d.eq(0),f=d.eq(1),h=d.eq(2);s=e.controller("ngModel"),t=f.controller("ngModel"),u=h.controller("ngModel");var i=angular.isDefined(c.mousewheel)?a.$parent.$eval(c.mousewheel):g.mousewheel;i&&this.setupMousewheelEvents(e,f,h);var j=angular.isDefined(c.arrowkeys)?a.$parent.$eval(c.arrowkeys):g.arrowkeys;j&&this.setupArrowkeyEvents(e,f,h),a.readonlyInput=angular.isDefined(c.readonlyInput)?a.$parent.$eval(c.readonlyInput):g.readonlyInput,this.setupInputEvents(e,f,h)};var A=g.hourStep;c.hourStep&&w.push(a.$parent.$watch(d(c.hourStep),function(a){A=+a}));var B=g.minuteStep;c.minuteStep&&w.push(a.$parent.$watch(d(c.minuteStep),function(a){B=+a}));var C;w.push(a.$parent.$watch(d(c.min),function(a){var b=new Date(a);C=isNaN(b)?void 0:b}));var D;w.push(a.$parent.$watch(d(c.max),function(a){var b=new Date(a);D=isNaN(b)?void 0:b}));var E=!1;c.ngDisabled&&w.push(a.$parent.$watch(d(c.ngDisabled),function(a){E=a})),a.noIncrementHours=function(){var a=p(v,60*A);return E||a>D||v>a&&C>a},a.noDecrementHours=function(){var a=p(v,60*-A);return E||C>a||a>v&&a>D},a.noIncrementMinutes=function(){var a=p(v,B);return E||a>D||v>a&&C>a},a.noDecrementMinutes=function(){var a=p(v,-B);return E||C>a||a>v&&a>D},a.noIncrementSeconds=function(){var a=q(v,F);return E||a>D||v>a&&C>a},a.noDecrementSeconds=function(){var a=q(v,-F);return E||C>a||a>v&&a>D},a.noToggleMeridian=function(){return v.getHours()<12?E||p(v,720)>D:E||p(v,-720)<C};var F=g.secondStep;c.secondStep&&w.push(a.$parent.$watch(d(c.secondStep),function(a){F=+a})),a.showSeconds=g.showSeconds,c.showSeconds&&w.push(a.$parent.$watch(d(c.showSeconds),function(b){a.showSeconds=!!b})),a.showMeridian=g.showMeridian,c.showMeridian&&w.push(a.$parent.$watch(d(c.showMeridian),function(b){if(a.showMeridian=!!b,x.$error.time){var c=h(),d=i();angular.isDefined(c)&&angular.isDefined(d)&&(v.setHours(c),l())}else n()})),this.setupMousewheelEvents=function(b,c,d){var e=function(a){a.originalEvent&&(a=a.originalEvent);var b=a.wheelDelta?a.wheelDelta:-a.deltaY;return a.detail||b>0};b.on("mousewheel wheel",function(b){E||a.$apply(e(b)?a.incrementHours():a.decrementHours()),b.preventDefault()}),c.on("mousewheel wheel",function(b){E||a.$apply(e(b)?a.incrementMinutes():a.decrementMinutes()),b.preventDefault()}),d.on("mousewheel wheel",function(b){E||a.$apply(e(b)?a.incrementSeconds():a.decrementSeconds()),b.preventDefault()})},this.setupArrowkeyEvents=function(b,c,d){b.on("keydown",function(b){E||(38===b.which?(b.preventDefault(),a.incrementHours(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementHours(),a.$apply()))}),c.on("keydown",function(b){E||(38===b.which?(b.preventDefault(),a.incrementMinutes(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementMinutes(),a.$apply()))}),d.on("keydown",function(b){E||(38===b.which?(b.preventDefault(),a.incrementSeconds(),a.$apply()):40===b.which&&(b.preventDefault(),a.decrementSeconds(),a.$apply()))})},this.setupInputEvents=function(b,c,d){if(a.readonlyInput)return a.updateHours=angular.noop,a.updateMinutes=angular.noop,void(a.updateSeconds=angular.noop);var e=function(b,c,d){x.$setViewValue(null),x.$setValidity("time",!1),angular.isDefined(b)&&(a.invalidHours=b,s&&s.$setValidity("hours",!1)),angular.isDefined(c)&&(a.invalidMinutes=c,t&&t.$setValidity("minutes",!1)),angular.isDefined(d)&&(a.invalidSeconds=d,u&&u.$setValidity("seconds",!1))};a.updateHours=function(){var a=h(),b=i();x.$setDirty(),angular.isDefined(a)&&angular.isDefined(b)?(v.setHours(a),v.setMinutes(b),C>v||v>D?e(!0):l("h")):e(!0)},b.on("blur",function(b){x.$setTouched(),r()?m():null===a.hours||""===a.hours?e(!0):!a.invalidHours&&a.hours<10&&a.$apply(function(){a.hours=k(a.hours,!z)})}),a.updateMinutes=function(){var a=i(),b=h();x.$setDirty(),angular.isDefined(a)&&angular.isDefined(b)?(v.setHours(b),v.setMinutes(a),C>v||v>D?e(void 0,!0):l("m")):e(void 0,!0)},c.on("blur",function(b){x.$setTouched(),r()?m():null===a.minutes?e(void 0,!0):!a.invalidMinutes&&a.minutes<10&&a.$apply(function(){a.minutes=k(a.minutes)})}),a.updateSeconds=function(){var a=j();x.$setDirty(),angular.isDefined(a)?(v.setSeconds(a),l("s")):e(void 0,void 0,!0)},d.on("blur",function(b){r()?m():!a.invalidSeconds&&a.seconds<10&&a.$apply(function(){a.seconds=k(a.seconds)})})},this.render=function(){var b=x.$viewValue;isNaN(b)?(x.$setValidity("time",!1),e.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.')):(b&&(v=b),C>v||v>D?(x.$setValidity("time",!1),a.invalidHours=!0,a.invalidMinutes=!0):m(),n())},a.showSpinners=angular.isDefined(c.showSpinners)?a.$parent.$eval(c.showSpinners):g.showSpinners,a.incrementHours=function(){a.noIncrementHours()||o(60*A*60)},a.decrementHours=function(){a.noDecrementHours()||o(60*-A*60)},a.incrementMinutes=function(){a.noIncrementMinutes()||o(60*B)},a.decrementMinutes=function(){a.noDecrementMinutes()||o(60*-B)},a.incrementSeconds=function(){a.noIncrementSeconds()||o(F)},a.decrementSeconds=function(){a.noDecrementSeconds()||o(-F)},a.toggleMeridian=function(){var b=i(),c=h();a.noToggleMeridian()||(angular.isDefined(b)&&angular.isDefined(c)?o(720*(v.getHours()<12?60:-60)):a.meridian=a.meridian===y[0]?y[1]:y[0])},a.blur=function(){x.$setTouched()},a.$on("$destroy",function(){for(;w.length;)w.shift()()})}]).directive("uibTimepicker",["uibTimepickerConfig",function(a){return{require:["uibTimepicker","?^ngModel"],restrict:"A",controller:"UibTimepickerController",controllerAs:"timepicker",scope:{},templateUrl:function(b,c){return c.templateUrl||a.templateUrl},link:function(a,b,c,d){var e=d[0],f=d[1];f&&e.init(f,b.find("input"))}}}]),angular.module("ui.bootstrap.typeahead",["ui.bootstrap.debounce","ui.bootstrap.position"]).factory("uibTypeaheadParser",["$parse",function(a){var b=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+([\s\S]+?)$/;return{parse:function(c){var d=c.match(b);if(!d)throw new Error('Expected typeahead specification in form of "_modelValue_ (as _label_)? for _item_ in _collection_" but got "'+c+'".');return{itemName:d[3],source:a(d[4]),viewMapper:a(d[2]||d[1]),modelMapper:a(d[1])}}}}]).controller("UibTypeaheadController",["$scope","$element","$attrs","$compile","$parse","$q","$timeout","$document","$window","$rootScope","$$debounce","$uibPosition","uibTypeaheadParser",function(a,b,c,d,e,f,g,h,i,j,k,l,m){function n(){P.moveInProgress||(P.moveInProgress=!0,P.$digest()),$()}function o(){P.position=F?l.offset(b):l.position(b),P.position.top+=b.prop("offsetHeight")}function p(a){var b;return angular.version.minor<6?(b=a.$options||{},b.getOption=function(a){return b[a]}):b=a.$options,b}var q,r,s=[9,13,27,38,40],t=200,u=a.$eval(c.typeaheadMinLength);u||0===u||(u=1),a.$watch(c.typeaheadMinLength,function(a){u=a||0===a?a:1});var v=a.$eval(c.typeaheadWaitMs)||0,w=a.$eval(c.typeaheadEditable)!==!1;a.$watch(c.typeaheadEditable,function(a){w=a!==!1});var x,y,z=e(c.typeaheadLoading).assign||angular.noop,A=c.typeaheadShouldSelect?e(c.typeaheadShouldSelect):function(a,b){var c=b.$event;return 13===c.which||9===c.which},B=e(c.typeaheadOnSelect),C=angular.isDefined(c.typeaheadSelectOnBlur)?a.$eval(c.typeaheadSelectOnBlur):!1,D=e(c.typeaheadNoResults).assign||angular.noop,E=c.typeaheadInputFormatter?e(c.typeaheadInputFormatter):void 0,F=c.typeaheadAppendToBody?a.$eval(c.typeaheadAppendToBody):!1,G=c.typeaheadAppendTo?a.$eval(c.typeaheadAppendTo):null,H=a.$eval(c.typeaheadFocusFirst)!==!1,I=c.typeaheadSelectOnExact?a.$eval(c.typeaheadSelectOnExact):!1,J=e(c.typeaheadIsOpen).assign||angular.noop,K=a.$eval(c.typeaheadShowHint)||!1,L=e(c.ngModel),M=e(c.ngModel+"($$$p)"),N=function(b,c){return angular.isFunction(L(a))&&r.getOption("getterSetter")?M(b,{$$$p:c}):L.assign(b,c)},O=m.parse(c.uibTypeahead),P=a.$new(),Q=a.$on("$destroy",function(){P.$destroy()});P.$on("$destroy",Q);var R="typeahead-"+P.$id+"-"+Math.floor(1e4*Math.random());b.attr({"aria-autocomplete":"list","aria-expanded":!1,"aria-owns":R});var S,T;K&&(S=angular.element("<div></div>"),S.css("position","relative"),b.after(S),T=b.clone(),T.attr("placeholder",""),T.attr("tabindex","-1"),T.val(""),T.css({position:"absolute",top:"0px",left:"0px","border-color":"transparent","box-shadow":"none",opacity:1,background:"none 0% 0% / auto repeat scroll padding-box border-box rgb(255, 255, 255)",color:"#999"}),b.css({position:"relative","vertical-align":"top","background-color":"transparent"}),T.attr("id")&&T.removeAttr("id"),S.append(T),T.after(b));var U=angular.element("<div uib-typeahead-popup></div>");U.attr({id:R,matches:"matches",active:"activeIdx",select:"select(activeIdx, evt)","move-in-progress":"moveInProgress",query:"query",position:"position","assign-is-open":"assignIsOpen(isOpen)",debounce:"debounceUpdate"}),angular.isDefined(c.typeaheadTemplateUrl)&&U.attr("template-url",c.typeaheadTemplateUrl),angular.isDefined(c.typeaheadPopupTemplateUrl)&&U.attr("popup-template-url",c.typeaheadPopupTemplateUrl);var V=function(){K&&T.val("")},W=function(){P.matches=[],P.activeIdx=-1,b.attr("aria-expanded",!1),V()},X=function(a){return R+"-option-"+a};P.$watch("activeIdx",function(a){0>a?b.removeAttr("aria-activedescendant"):b.attr("aria-activedescendant",X(a))});var Y=function(a,b){return P.matches.length>b&&a?a.toUpperCase()===P.matches[b].label.toUpperCase():!1},Z=function(c,d){var e={$viewValue:c};z(a,!0),D(a,!1),f.when(O.source(a,e)).then(function(f){var g=c===q.$viewValue;if(g&&x)if(f&&f.length>0){P.activeIdx=H?0:-1,D(a,!1),P.matches.length=0;for(var h=0;h<f.length;h++)e[O.itemName]=f[h],P.matches.push({id:X(h),label:O.viewMapper(P,e),model:f[h]});if(P.query=c,o(),b.attr("aria-expanded",!0),I&&1===P.matches.length&&Y(c,0)&&(angular.isNumber(P.debounceUpdate)||angular.isObject(P.debounceUpdate)?k(function(){P.select(0,d)},angular.isNumber(P.debounceUpdate)?P.debounceUpdate:P.debounceUpdate["default"]):P.select(0,d)),K){var i=P.matches[0].label;angular.isString(c)&&c.length>0&&i.slice(0,c.length).toUpperCase()===c.toUpperCase()?T.val(c+i.slice(c.length)):T.val("")}}else W(),D(a,!0);g&&z(a,!1)},function(){W(),z(a,!1),D(a,!0)})};F&&(angular.element(i).on("resize",n),h.find("body").on("scroll",n));var $=k(function(){P.matches.length&&o(),P.moveInProgress=!1},t);P.moveInProgress=!1,P.query=void 0;var _,aa=function(a){_=g(function(){Z(a)},v)},ba=function(){_&&g.cancel(_)};W(),P.assignIsOpen=function(b){J(a,b)},P.select=function(d,e){var f,h,i={};y=!0,i[O.itemName]=h=P.matches[d].model,f=O.modelMapper(a,i),N(a,f),q.$setValidity("editable",!0),q.$setValidity("parse",!0),B(a,{$item:h,$model:f,$label:O.viewMapper(a,i),$event:e}),W(),P.$eval(c.typeaheadFocusOnSelect)!==!1&&g(function(){b[0].focus()},0,!1)},b.on("keydown",function(b){if(0!==P.matches.length&&-1!==s.indexOf(b.which)){var c=A(a,{$event:b});if(-1===P.activeIdx&&c||9===b.which&&b.shiftKey)return W(),void P.$digest();b.preventDefault();var d;switch(b.which){case 27:b.stopPropagation(),W(),a.$digest();break;case 38:P.activeIdx=(P.activeIdx>0?P.activeIdx:P.matches.length)-1,P.$digest(),d=U[0].querySelectorAll(".uib-typeahead-match")[P.activeIdx],d.parentNode.scrollTop=d.offsetTop;break;case 40:P.activeIdx=(P.activeIdx+1)%P.matches.length,P.$digest(),d=U[0].querySelectorAll(".uib-typeahead-match")[P.activeIdx],
d.parentNode.scrollTop=d.offsetTop;break;default:c&&P.$apply(function(){angular.isNumber(P.debounceUpdate)||angular.isObject(P.debounceUpdate)?k(function(){P.select(P.activeIdx,b)},angular.isNumber(P.debounceUpdate)?P.debounceUpdate:P.debounceUpdate["default"]):P.select(P.activeIdx,b)})}}}),b.on("focus",function(a){x=!0,0!==u||q.$viewValue||g(function(){Z(q.$viewValue,a)},0)}),b.on("blur",function(a){C&&P.matches.length&&-1!==P.activeIdx&&!y&&(y=!0,P.$apply(function(){angular.isObject(P.debounceUpdate)&&angular.isNumber(P.debounceUpdate.blur)?k(function(){P.select(P.activeIdx,a)},P.debounceUpdate.blur):P.select(P.activeIdx,a)})),!w&&q.$error.editable&&(q.$setViewValue(),P.$apply(function(){q.$setValidity("editable",!0),q.$setValidity("parse",!0)}),b.val("")),x=!1,y=!1});var ca=function(c){b[0]!==c.target&&3!==c.which&&0!==P.matches.length&&(W(),j.$$phase||a.$digest())};h.on("click",ca),a.$on("$destroy",function(){h.off("click",ca),(F||G)&&da.remove(),F&&(angular.element(i).off("resize",n),h.find("body").off("scroll",n)),U.remove(),K&&S.remove()});var da=d(U)(P);F?h.find("body").append(da):G?angular.element(G).eq(0).append(da):b.after(da),this.init=function(b){q=b,r=p(q),P.debounceUpdate=e(r.getOption("debounce"))(a),q.$parsers.unshift(function(b){return x=!0,0===u||b&&b.length>=u?v>0?(ba(),aa(b)):Z(b):(z(a,!1),ba(),W()),w?b:b?void q.$setValidity("editable",!1):(q.$setValidity("editable",!0),null)}),q.$formatters.push(function(b){var c,d,e={};return w||q.$setValidity("editable",!0),E?(e.$model=b,E(a,e)):(e[O.itemName]=b,c=O.viewMapper(a,e),e[O.itemName]=void 0,d=O.viewMapper(a,e),c!==d?c:b)})}}]).directive("uibTypeahead",function(){return{controller:"UibTypeaheadController",require:["ngModel","uibTypeahead"],link:function(a,b,c,d){d[1].init(d[0])}}}).directive("uibTypeaheadPopup",["$$debounce",function(a){return{scope:{matches:"=",query:"=",active:"=",position:"&",moveInProgress:"=",select:"&",assignIsOpen:"&",debounce:"&"},replace:!0,templateUrl:function(a,b){return b.popupTemplateUrl||"uib/template/typeahead/typeahead-popup.html"},link:function(b,c,d){b.templateUrl=d.templateUrl,b.isOpen=function(){var a=b.matches.length>0;return b.assignIsOpen({isOpen:a}),a},b.isActive=function(a){return b.active===a},b.selectActive=function(a){b.active=a},b.selectMatch=function(c,d){var e=b.debounce();angular.isNumber(e)||angular.isObject(e)?a(function(){b.select({activeIdx:c,evt:d})},angular.isNumber(e)?e:e["default"]):b.select({activeIdx:c,evt:d})}}}}]).directive("uibTypeaheadMatch",["$templateRequest","$compile","$parse",function(a,b,c){return{scope:{index:"=",match:"=",query:"="},link:function(d,e,f){var g=c(f.templateUrl)(d.$parent)||"uib/template/typeahead/typeahead-match.html";a(g).then(function(a){var c=angular.element(a.trim());e.replaceWith(c),b(c)(d)})}}}]).filter("uibTypeaheadHighlight",["$sce","$injector","$log",function(a,b,c){function d(a){return a.replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1")}function e(a){return/<.*>/g.test(a)}var f;return f=b.has("$sanitize"),function(b,g){return!f&&e(b)&&c.warn("Unsafe use of typeahead please use ngSanitize"),b=g?(""+b).replace(new RegExp(d(g),"gi"),"<strong>$&</strong>"):b,f||(b=a.trustAsHtml(b)),b}}]),angular.module("uib/template/accordion/accordion-group.html",[]).run(["$templateCache",function(a){a.put("uib/template/accordion/accordion-group.html",'<div role="tab" id="{{::headingId}}" aria-selected="{{isOpen}}" class="panel-heading" ng-keypress="toggleOpen($event)">\n  <h4 class="panel-title">\n    <a role="button" data-toggle="collapse" href aria-expanded="{{isOpen}}" aria-controls="{{::panelId}}" tabindex="0" class="accordion-toggle" ng-click="toggleOpen()" uib-accordion-transclude="heading" ng-disabled="isDisabled" uib-tabindex-toggle><span uib-accordion-header ng-class="{\'text-muted\': isDisabled}">{{heading}}</span></a>\n  </h4>\n</div>\n<div id="{{::panelId}}" aria-labelledby="{{::headingId}}" aria-hidden="{{!isOpen}}" role="tabpanel" class="panel-collapse collapse" uib-collapse="!isOpen">\n  <div class="panel-body" ng-transclude></div>\n</div>\n')}]),angular.module("uib/template/accordion/accordion.html",[]).run(["$templateCache",function(a){a.put("uib/template/accordion/accordion.html",'<div role="tablist" class="panel-group" ng-transclude></div>')}]),angular.module("uib/template/alert/alert.html",[]).run(["$templateCache",function(a){a.put("uib/template/alert/alert.html",'<button ng-show="closeable" type="button" class="close" ng-click="close({$event: $event})">\n  <span aria-hidden="true">&times;</span>\n  <span class="sr-only">Close</span>\n</button>\n<div ng-transclude></div>\n')}]),angular.module("uib/template/carousel/carousel.html",[]).run(["$templateCache",function(a){a.put("uib/template/carousel/carousel.html",'<div class="carousel-inner" ng-transclude></div>\n<a role="button" href class="left carousel-control" ng-click="prev()" ng-class="{ disabled: isPrevDisabled() }" ng-show="slides.length > 1">\n  <span aria-hidden="true" class="glyphicon glyphicon-chevron-left"></span>\n  <span class="sr-only">previous</span>\n</a>\n<a role="button" href class="right carousel-control" ng-click="next()" ng-class="{ disabled: isNextDisabled() }" ng-show="slides.length > 1">\n  <span aria-hidden="true" class="glyphicon glyphicon-chevron-right"></span>\n  <span class="sr-only">next</span>\n</a>\n<ol class="carousel-indicators" ng-show="slides.length > 1">\n  <li ng-repeat="slide in slides | orderBy:indexOfSlide track by $index" ng-class="{ active: isActive(slide) }" ng-click="select(slide)">\n    <span class="sr-only">slide {{ $index + 1 }} of {{ slides.length }}<span ng-if="isActive(slide)">, currently active</span></span>\n  </li>\n</ol>\n')}]),angular.module("uib/template/carousel/slide.html",[]).run(["$templateCache",function(a){a.put("uib/template/carousel/slide.html",'<div class="text-center" ng-transclude></div>\n')}]),angular.module("uib/template/datepicker/datepicker.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/datepicker.html",'<div ng-switch="datepickerMode">\n  <div uib-daypicker ng-switch-when="day" tabindex="0" class="uib-daypicker"></div>\n  <div uib-monthpicker ng-switch-when="month" tabindex="0" class="uib-monthpicker"></div>\n  <div uib-yearpicker ng-switch-when="year" tabindex="0" class="uib-yearpicker"></div>\n</div>\n')}]),angular.module("uib/template/datepicker/day.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/day.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i aria-hidden="true" class="glyphicon glyphicon-chevron-left"></i><span class="sr-only">previous</span></button></th>\n      <th colspan="{{::5 + showWeeks}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i aria-hidden="true" class="glyphicon glyphicon-chevron-right"></i><span class="sr-only">next</span></button></th>\n    </tr>\n    <tr>\n      <th ng-if="showWeeks" class="text-center"></th>\n      <th ng-repeat="label in ::labels track by $index" class="text-center"><small aria-label="{{::label.full}}">{{::label.abbr}}</small></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-weeks" ng-repeat="row in rows track by $index" role="row">\n      <td ng-if="showWeeks" class="text-center h6"><em>{{ weekNumbers[$index] }}</em></td>\n      <td ng-repeat="dt in row" class="uib-day text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default btn-sm"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-muted\': dt.secondary, \'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/datepicker/month.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/month.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i aria-hidden="true" class="glyphicon glyphicon-chevron-left"></i><span class="sr-only">previous</span></button></th>\n      <th colspan="{{::yearHeaderColspan}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i aria-hidden="true" class="glyphicon glyphicon-chevron-right"></i><span class="sr-only">next</span></i></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-months" ng-repeat="row in rows track by $index" role="row">\n      <td ng-repeat="dt in row" class="uib-month text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/datepicker/year.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepicker/year.html",'<table role="grid" aria-labelledby="{{::uniqueId}}-title" aria-activedescendant="{{activeDateId}}">\n  <thead>\n    <tr>\n      <th><button type="button" class="btn btn-default btn-sm pull-left uib-left" ng-click="move(-1)" tabindex="-1"><i aria-hidden="true" class="glyphicon glyphicon-chevron-left"></i><span class="sr-only">previous</span></button></th>\n      <th colspan="{{::columns - 2}}"><button id="{{::uniqueId}}-title" role="heading" aria-live="assertive" aria-atomic="true" type="button" class="btn btn-default btn-sm uib-title" ng-click="toggleMode()" ng-disabled="datepickerMode === maxMode" tabindex="-1"><strong>{{title}}</strong></button></th>\n      <th><button type="button" class="btn btn-default btn-sm pull-right uib-right" ng-click="move(1)" tabindex="-1"><i aria-hidden="true" class="glyphicon glyphicon-chevron-right"></i><span class="sr-only">next</span></button></th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr class="uib-years" ng-repeat="row in rows track by $index" role="row">\n      <td ng-repeat="dt in row" class="uib-year text-center" role="gridcell"\n        id="{{::dt.uid}}"\n        ng-class="::dt.customClass">\n        <button type="button" class="btn btn-default"\n          uib-is-class="\n            \'btn-info\' for selectedDt,\n            \'active\' for activeDt\n            on dt"\n          ng-click="select(dt.date)"\n          ng-disabled="::dt.disabled"\n          tabindex="-1"><span ng-class="::{\'text-info\': dt.current}">{{::dt.label}}</span></button>\n      </td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/datepickerPopup/popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/datepickerPopup/popup.html",'<ul role="presentation" class="uib-datepicker-popup dropdown-menu uib-position-measure" dropdown-nested ng-if="isOpen" ng-keydown="keydown($event)" ng-click="$event.stopPropagation()">\n  <li ng-transclude></li>\n  <li ng-if="showButtonBar" class="uib-button-bar">\n    <span class="btn-group pull-left">\n      <button type="button" class="btn btn-sm btn-info uib-datepicker-current" ng-click="select(\'today\', $event)" ng-disabled="isDisabled(\'today\')">{{ getText(\'current\') }}</button>\n      <button type="button" class="btn btn-sm btn-danger uib-clear" ng-click="select(null, $event)">{{ getText(\'clear\') }}</button>\n    </span>\n    <button type="button" class="btn btn-sm btn-success pull-right uib-close" ng-click="close($event)">{{ getText(\'close\') }}</button>\n  </li>\n</ul>\n')}]),angular.module("uib/template/modal/window.html",[]).run(["$templateCache",function(a){a.put("uib/template/modal/window.html","<div class=\"modal-dialog {{size ? 'modal-' + size : ''}}\"><div class=\"modal-content\" uib-modal-transclude></div></div>\n")}]),angular.module("uib/template/pager/pager.html",[]).run(["$templateCache",function(a){a.put("uib/template/pager/pager.html",'<li ng-class="{disabled: noPrevious()||ngDisabled, previous: align}"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li ng-class="{disabled: noNext()||ngDisabled, next: align}"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n')}]),angular.module("uib/template/pagination/pagination.html",[]).run(["$templateCache",function(a){a.put("uib/template/pagination/pagination.html",'<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-first"><a href ng-click="selectPage(1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'first\')}}</a></li>\n<li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noPrevious()||ngDisabled}" class="pagination-prev"><a href ng-click="selectPage(page - 1, $event)" ng-disabled="noPrevious()||ngDisabled" uib-tabindex-toggle>{{::getText(\'previous\')}}</a></li>\n<li role="menuitem" ng-repeat="page in pages track by $index" ng-class="{active: page.active,disabled: ngDisabled&&!page.active}" class="pagination-page"><a href ng-click="selectPage(page.number, $event)" ng-disabled="ngDisabled&&!page.active" uib-tabindex-toggle>{{page.text}}</a></li>\n<li role="menuitem" ng-if="::directionLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-next"><a href ng-click="selectPage(page + 1, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'next\')}}</a></li>\n<li role="menuitem" ng-if="::boundaryLinks" ng-class="{disabled: noNext()||ngDisabled}" class="pagination-last"><a href ng-click="selectPage(totalPages, $event)" ng-disabled="noNext()||ngDisabled" uib-tabindex-toggle>{{::getText(\'last\')}}</a></li>\n')}]),angular.module("uib/template/tooltip/tooltip-html-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/tooltip/tooltip-html-popup.html",'<div class="tooltip-arrow"></div>\n<div class="tooltip-inner" ng-bind-html="contentExp()"></div>\n')}]),angular.module("uib/template/tooltip/tooltip-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/tooltip/tooltip-popup.html",'<div class="tooltip-arrow"></div>\n<div class="tooltip-inner" ng-bind="content"></div>\n')}]),angular.module("uib/template/tooltip/tooltip-template-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/tooltip/tooltip-template-popup.html",'<div class="tooltip-arrow"></div>\n<div class="tooltip-inner"\n  uib-tooltip-template-transclude="contentExp()"\n  tooltip-template-transclude-scope="originScope()"></div>\n')}]),angular.module("uib/template/popover/popover-html.html",[]).run(["$templateCache",function(a){a.put("uib/template/popover/popover-html.html",'<div class="arrow"></div>\n\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content" ng-bind-html="contentExp()"></div>\n</div>\n')}]),angular.module("uib/template/popover/popover-template.html",[]).run(["$templateCache",function(a){a.put("uib/template/popover/popover-template.html",'<div class="arrow"></div>\n\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content"\n      uib-tooltip-template-transclude="contentExp()"\n      tooltip-template-transclude-scope="originScope()"></div>\n</div>\n')}]),angular.module("uib/template/popover/popover.html",[]).run(["$templateCache",function(a){a.put("uib/template/popover/popover.html",'<div class="arrow"></div>\n\n<div class="popover-inner">\n    <h3 class="popover-title" ng-bind="uibTitle" ng-if="uibTitle"></h3>\n    <div class="popover-content" ng-bind="content"></div>\n</div>\n')}]),angular.module("uib/template/progressbar/bar.html",[]).run(["$templateCache",function(a){a.put("uib/template/progressbar/bar.html",'<div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n')}]),angular.module("uib/template/progressbar/progress.html",[]).run(["$templateCache",function(a){a.put("uib/template/progressbar/progress.html",'<div class="progress" ng-transclude aria-labelledby="{{::title}}"></div>')}]),angular.module("uib/template/progressbar/progressbar.html",[]).run(["$templateCache",function(a){a.put("uib/template/progressbar/progressbar.html",'<div class="progress">\n  <div class="progress-bar" ng-class="type && \'progress-bar-\' + type" role="progressbar" aria-valuenow="{{value}}" aria-valuemin="0" aria-valuemax="{{max}}" ng-style="{width: (percent < 100 ? percent : 100) + \'%\'}" aria-valuetext="{{percent | number:0}}%" aria-labelledby="{{::title}}" ng-transclude></div>\n</div>\n')}]),angular.module("uib/template/rating/rating.html",[]).run(["$templateCache",function(a){a.put("uib/template/rating/rating.html",'<span ng-mouseleave="reset()" ng-keydown="onKeydown($event)" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="{{range.length}}" aria-valuenow="{{value}}" aria-valuetext="{{title}}">\n    <span ng-repeat-start="r in range track by $index" class="sr-only">({{ $index < value ? \'*\' : \' \' }})</span>\n    <i ng-repeat-end ng-mouseenter="enter($index + 1)" ng-click="rate($index + 1)" class="glyphicon" ng-class="$index < value && (r.stateOn || \'glyphicon-star\') || (r.stateOff || \'glyphicon-star-empty\')" ng-attr-title="{{r.title}}"></i>\n</span>\n')}]),angular.module("uib/template/tabs/tab.html",[]).run(["$templateCache",function(a){a.put("uib/template/tabs/tab.html",'<li ng-class="[{active: active, disabled: disabled}, classes]" class="uib-tab nav-item">\n  <a href ng-click="select($event)" class="nav-link" uib-tab-heading-transclude>{{heading}}</a>\n</li>\n')}]),angular.module("uib/template/tabs/tabset.html",[]).run(["$templateCache",function(a){a.put("uib/template/tabs/tabset.html",'<div>\n  <ul class="nav nav-{{tabset.type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>\n  <div class="tab-content">\n    <div class="tab-pane"\n         ng-repeat="tab in tabset.tabs"\n         ng-class="{active: tabset.active === tab.index}"\n         uib-tab-content-transclude="tab">\n    </div>\n  </div>\n</div>\n')}]),angular.module("uib/template/timepicker/timepicker.html",[]).run(["$templateCache",function(a){a.put("uib/template/timepicker/timepicker.html",'<table class="uib-timepicker">\n  <tbody>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-increment hours"><a ng-click="incrementHours()" ng-class="{disabled: noIncrementHours()}" class="btn btn-link" ng-disabled="noIncrementHours()" tabindex="-1"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-increment minutes"><a ng-click="incrementMinutes()" ng-class="{disabled: noIncrementMinutes()}" class="btn btn-link" ng-disabled="noIncrementMinutes()" tabindex="-1"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-increment seconds"><a ng-click="incrementSeconds()" ng-class="{disabled: noIncrementSeconds()}" class="btn btn-link" ng-disabled="noIncrementSeconds()" tabindex="-1"><span class="glyphicon glyphicon-chevron-up"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n    <tr>\n      <td class="form-group uib-time hours" ng-class="{\'has-error\': invalidHours}">\n        <input type="text" placeholder="HH" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementHours()" ng-blur="blur()">\n      </td>\n      <td class="uib-separator">:</td>\n      <td class="form-group uib-time minutes" ng-class="{\'has-error\': invalidMinutes}">\n        <input type="text" placeholder="MM" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="::readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementMinutes()" ng-blur="blur()">\n      </td>\n      <td ng-show="showSeconds" class="uib-separator">:</td>\n      <td class="form-group uib-time seconds" ng-class="{\'has-error\': invalidSeconds}" ng-show="showSeconds">\n        <input type="text" placeholder="SS" ng-model="seconds" ng-change="updateSeconds()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2" tabindex="{{::tabindex}}" ng-disabled="noIncrementSeconds()" ng-blur="blur()">\n      </td>\n      <td ng-show="showMeridian" class="uib-time am-pm"><button type="button" ng-class="{disabled: noToggleMeridian()}" class="btn btn-default text-center" ng-click="toggleMeridian()" ng-disabled="noToggleMeridian()" tabindex="{{::tabindex}}">{{meridian}}</button></td>\n    </tr>\n    <tr class="text-center" ng-show="::showSpinners">\n      <td class="uib-decrement hours"><a ng-click="decrementHours()" ng-class="{disabled: noDecrementHours()}" class="btn btn-link" ng-disabled="noDecrementHours()" tabindex="-1"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td>&nbsp;</td>\n      <td class="uib-decrement minutes"><a ng-click="decrementMinutes()" ng-class="{disabled: noDecrementMinutes()}" class="btn btn-link" ng-disabled="noDecrementMinutes()" tabindex="-1"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showSeconds">&nbsp;</td>\n      <td ng-show="showSeconds" class="uib-decrement seconds"><a ng-click="decrementSeconds()" ng-class="{disabled: noDecrementSeconds()}" class="btn btn-link" ng-disabled="noDecrementSeconds()" tabindex="-1"><span class="glyphicon glyphicon-chevron-down"></span></a></td>\n      <td ng-show="showMeridian"></td>\n    </tr>\n  </tbody>\n</table>\n')}]),angular.module("uib/template/typeahead/typeahead-match.html",[]).run(["$templateCache",function(a){a.put("uib/template/typeahead/typeahead-match.html",'<a href\n   tabindex="-1"\n   ng-bind-html="match.label | uibTypeaheadHighlight:query"\n   ng-attr-title="{{match.label}}"></a>\n')}]),angular.module("uib/template/typeahead/typeahead-popup.html",[]).run(["$templateCache",function(a){a.put("uib/template/typeahead/typeahead-popup.html",'<ul class="dropdown-menu" ng-show="isOpen() && !moveInProgress" ng-style="{top: position().top+\'px\', left: position().left+\'px\'}" role="listbox" aria-hidden="{{!isOpen()}}">\n    <li class="uib-typeahead-match" ng-repeat="match in matches track by $index" ng-class="{active: isActive($index) }" ng-mouseenter="selectActive($index)" ng-click="selectMatch($index, $event)" role="option" id="{{::match.id}}">\n        <div uib-typeahead-match index="$index" match="match" query="query" template-url="templateUrl"></div>\n    </li>\n</ul>\n')}]),angular.module("ui.bootstrap.carousel").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibCarouselCss&&angular.element(document).find("head").prepend('<style type="text/css">.ng-animate.item:not(.left):not(.right){-webkit-transition:0s ease-in-out left;transition:0s ease-in-out left}</style>'),angular.$$uibCarouselCss=!0}),angular.module("ui.bootstrap.datepicker").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibDatepickerCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker .uib-title{width:100%;}.uib-day button,.uib-month button,.uib-year button{min-width:100%;}.uib-left,.uib-right{width:100%}</style>'),angular.$$uibDatepickerCss=!0}),angular.module("ui.bootstrap.position").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibPositionCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-position-measure{display:block !important;visibility:hidden !important;position:absolute !important;top:-9999px !important;left:-9999px !important;}.uib-position-scrollbar-measure{position:absolute !important;top:-9999px !important;width:50px !important;height:50px !important;overflow:scroll !important;}.uib-position-body-scrollbar-measure{overflow:scroll !important;}</style>'),angular.$$uibPositionCss=!0}),angular.module("ui.bootstrap.datepickerPopup").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibDatepickerpopupCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-datepicker-popup.dropdown-menu{display:block;float:none;margin:0;}.uib-button-bar{padding:10px 9px 2px;}</style>'),angular.$$uibDatepickerpopupCss=!0}),angular.module("ui.bootstrap.tooltip").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTooltipCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-tooltip-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-html-popup].tooltip.right-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.top-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-left > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.bottom-right > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.left-bottom > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-top > .tooltip-arrow,[uib-tooltip-template-popup].tooltip.right-bottom > .tooltip-arrow,[uib-popover-popup].popover.top-left > .arrow,[uib-popover-popup].popover.top-right > .arrow,[uib-popover-popup].popover.bottom-left > .arrow,[uib-popover-popup].popover.bottom-right > .arrow,[uib-popover-popup].popover.left-top > .arrow,[uib-popover-popup].popover.left-bottom > .arrow,[uib-popover-popup].popover.right-top > .arrow,[uib-popover-popup].popover.right-bottom > .arrow,[uib-popover-html-popup].popover.top-left > .arrow,[uib-popover-html-popup].popover.top-right > .arrow,[uib-popover-html-popup].popover.bottom-left > .arrow,[uib-popover-html-popup].popover.bottom-right > .arrow,[uib-popover-html-popup].popover.left-top > .arrow,[uib-popover-html-popup].popover.left-bottom > .arrow,[uib-popover-html-popup].popover.right-top > .arrow,[uib-popover-html-popup].popover.right-bottom > .arrow,[uib-popover-template-popup].popover.top-left > .arrow,[uib-popover-template-popup].popover.top-right > .arrow,[uib-popover-template-popup].popover.bottom-left > .arrow,[uib-popover-template-popup].popover.bottom-right > .arrow,[uib-popover-template-popup].popover.left-top > .arrow,[uib-popover-template-popup].popover.left-bottom > .arrow,[uib-popover-template-popup].popover.right-top > .arrow,[uib-popover-template-popup].popover.right-bottom > .arrow{top:auto;bottom:auto;left:auto;right:auto;margin:0;}[uib-popover-popup].popover,[uib-popover-html-popup].popover,[uib-popover-template-popup].popover{display:block !important;}</style>'),angular.$$uibTooltipCss=!0}),angular.module("ui.bootstrap.timepicker").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTimepickerCss&&angular.element(document).find("head").prepend('<style type="text/css">.uib-time input{width:50px;}</style>'),angular.$$uibTimepickerCss=!0}),angular.module("ui.bootstrap.typeahead").run(function(){!angular.$$csp().noInlineStyle&&!angular.$$uibTypeaheadCss&&angular.element(document).find("head").prepend('<style type="text/css">[uib-typeahead-popup].dropdown-menu{display:block;}</style>'),angular.$$uibTypeaheadCss=!0});
(function (angular, $, _) {
  angular.module('uibTabsetClass', CRM.angRequires('uibTabsetClass'));
  angular.module('uibTabsetClass').directive('uibTabsetClass', function ($timeout) {
    return {
      link: function (scope, element, attrs) {
        $timeout(function () {
          element.find('.nav').first().addClass(attrs.uibTabsetClass);
        });
      }
    };
  });
})(angular, CRM.$, CRM._);
