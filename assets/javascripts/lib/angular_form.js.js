// (function() {

//   var lacroixForms = angular.module('lacroix.forms', []);

//   lacroixForms.config([
//     "$httpProvider", function($httpProvider) {
//       // TODO: change this for Node.js && check on v1.2 CSRF/XSRF syntax
//       $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
//     }
//   ]);

//   // TODO: change for Node.js
//   lacroixForms.factory("submitForm", [
//     "$http", function($http) {
//       return function(url, $scope) {
//         var data, error, req, success;
//         $scope.sending = true;
//         data = {
//           model: $scope.model
//         };
//         success = function(data, status, headers, config) {
//           return $scope.sent = true;
//         };
//         error = function(data, status, headers, config) {
//           $scope.sending = false;
//           return $scope.responseError = data.message;
//         };
//         return req = $http({
//           method: "POST",
//           url: url,
//           data: data
//         }).success(success).error(error);
//       };
//     }
//   ]);

//   lacroixForms.factory("suggestEmail", function() {
//     return function($scope) {
//       return Kicksend.mailcheck.run({
//         email: $scope.model.email,
//         suggested: function(suggestion) {
//           return $scope.emailSuggestion = suggestion.full;
//         },
//         empty: function() {
//           return $scope.emailSuggestion = null;
//         }
//       });
//     };
//   });

//   lacroixForms.factory("useSuggestion", function() {
//     return function($scope) {
//       if ($scope.emailSuggestion != null) {
//         $scope.model.email = $scope.emailSuggestion;
//         return $scope.emailSuggestion = null;
//       }
//     };
//   });

//   lacroixForms.factory("emailRegex", function() {
//     return function() {
//       return /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i;
//     };
//   });

//   lacroixForms.directive("jqShow", [
//     "$timeout", function($timeout) {
//       var result;
//       result = {
//         restrict: "A",
//         link: function(scope, element, attrs) {
//           var callback, delay, duration, hideImmediately, jqElm, options, passedOptions, type;
//           passedOptions = scope.$eval(attrs.jqOptions);
//           options = {
//             type: "fade",
//             duration: 200,
//             delay: 0,
//             hideImmediately: false,
//             callback: null
//           };
//           $.extend(options, passedOptions);
//           type = options.type;
//           duration = options.duration;
//           callback = options.callback;
//           delay = options.delay;
//           hideImmediately = options.hideImmediately;
//           jqElm = $(element);
//           return scope.$watch(attrs.jqShow, function(value) {
//             if (hideImmediately && !value) {
//               return jqElm.hide(0, callback);
//             } else {
//               return $timeout(function() {
//                 if (type === "fade") {
//                   if (value) {
//                     return jqElm.fadeIn(duration, callback);
//                   } else {
//                     return jqElm.fadeOut(duration, callback);
//                   }
//                 } else if (type === "slide") {
//                   if (value) {
//                     return jqElm.slideDown(duration, callback);
//                   } else {
//                     return jqElm.slideUp(duration, callback);
//                   }
//                 } else {
//                   if (value) {
//                     return jqElm.show(duration, callback);
//                   } else {
//                     return jqElm.hide(duration, callback);
//                   }
//                 }
//               }, delay);
//             }
//           });
//         }
//       };
//       return result;
//     }
//   ]);

// }).call(this);
