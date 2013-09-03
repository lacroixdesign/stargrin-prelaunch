/* globals Kicksend: true */

/*
 * shibuyaMailcheck - Provides suggestions for common email typos
 * @restrict attribute
 * @example:
    <div shibuya:form:mailcheck="user.email">
      Did you mean <span>example@<strong>gmail.com</strong></span>?
    </div>
 */

angular.module('shibuya.form.mailcheck', []).directive('shibuyaMailcheck', [function () {
  return {
    scope: true,
    restrict: 'A',
    template: '<div>Did you mean <span>{{ address }}@<strong>{{ domain }}</strong></span>?</div>',
    replace: true,
    link: function(scope, element, attrs) {

      function checkEmail(email) {
        Kicksend.mailcheck.run({
          email: email,
          suggested: function(suggestion) {
            scope.suggestion = suggestion.full;
            scope.address    = suggestion.address;
            scope.domain     = suggestion.domain;
            element.show();
          },
          empty: function() {
            scope.suggestion = null;
            element.hide();
          }
        });
      }

      scope.$watch(attrs.shibuyaMailcheck, function(email) {
        checkEmail(email);
      });

      element.bind('click', function (event) {
        event.preventDefault();
        if (scope.suggestion) {
          scope.$parent.$apply(attrs.shibuyaMailcheck+' = "'+scope.suggestion+'"');
        }
      });

    }
  };

}]);
