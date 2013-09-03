(function() {

  var app = angular.module('stargrin', ['shibuya.form.kicksend']);

  app.controller('SignupCtrl', ['$scope', function($scope) {
    $scope.email      = '';
    $scope.processing = false;
    $scope.attempted  = false;
    $scope.complete   = false;

    $scope.submit = function(event) {
      event.preventDefault();
      $scope.attempted  = true;
    };
  }]);

})();
