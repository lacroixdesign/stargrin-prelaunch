
/*
 * dropdownToggle - Provides dropdown menu functionality in place of bootstrap js
 * @restrict class or attribute
 * @example:
   <div class="m-btn-dropdown">
     <a dropdown-toggle>Dropdown Menu</a>
     <ul class="dropdown-menu">
       <li ng-repeat="choice in dropChoices">
         <a ng-href="{{choice.href}}">{{choice.text}}</a>
       </li>
     </ul>
   </div>
 */

angular.module('shibuya.form.kicksend', []).directive('shibuyaFormKicksend', [function () {
  return {
    restrict: 'A',
    link: function(scope, element) {

      // function checkEmail() {
      //   Kicksend.mailcheck.run({
      //     email: scope.form.email,
      //     suggested: function(suggestion) {
      //       scope.emailSuggestion = suggestion.full;
      //     },
      //     empty: function() {
      //       scope.emailSuggestion = null;
      //     }
      //   });
      // }

      scope.$watch('email', function(newVal) {
        console.log('CHANGE:');
        console.warn(newVal);
      });

      element.bind('click', function (event) {
        event.preventDefault();
        // console.log(scope.email);
        console.log(scope);
        // console.log(attrs);
        // console.log(attrs.shibuyaFormKicksend);
        // event.stopPropagation();
        // element.addClass('is-active');
      });

    }
  };

}]);
