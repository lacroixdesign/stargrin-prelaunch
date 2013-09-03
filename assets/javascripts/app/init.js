(function() {

  var app = angular.module('stargrin', ['shibuya.form.mailcheck']);

  app.controller('SignupCtrl', ['$scope', function($scope) {
    $scope.email      = '';
    $scope.processing = false;
    $scope.attempted  = false;
    $scope.complete   = false;

    $scope.submit = function(event) {
      event.preventDefault();
      // console.log(event);
      // $scope.processing = true;
      // console.log($scope.email);
      $scope.attempted  = true;
    };
  }]);

})();
