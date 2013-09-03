lacroixForms = angular.module('lacroix.forms', [])

lacroixForms.config ["$httpProvider", ($httpProvider) ->
  $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')
]


##
# Submit Form
# 
lacroixForms.factory "submitForm", ["$http", ($http) ->
  return (url, $scope) ->
    $scope.sending = true
    data = { model: $scope.model }

    success = (data, status, headers, config) ->
      $scope.sent = true
    error = (data, status, headers, config) ->
      $scope.sending = false
      $scope.responseError = data.message
    req = $http({method: "POST", url: url, data: data})
      .success(success)
      .error(error)
]


##
# Suggest Email
# 
lacroixForms.factory "suggestEmail", ->
  return ($scope) ->
    Kicksend.mailcheck.run
      email: $scope.model.email
      suggested: (suggestion) ->
        $scope.emailSuggestion = suggestion.full
      empty: ->
        $scope.emailSuggestion = null


##
# Use Email Suggestion
# 
lacroixForms.factory "useSuggestion", ->
  return ($scope) ->
    if $scope.emailSuggestion?
      $scope.model.email = $scope.emailSuggestion
      $scope.emailSuggestion = null


##
# Email Regex
# 
lacroixForms.factory "emailRegex", ->
  return ->
    /([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/i


##
# jQuery Show/Hide
# 
lacroixForms.directive "jqShow", ["$timeout", ($timeout) ->
  result =
    restrict: "A"
    link: (scope, element, attrs) ->
      # configure options
      passedOptions = scope.$eval(attrs.jqOptions)
      
      # defaults
      options =
        type: "fade" # or "slide"
        duration: 200
        delay: 0 
        hideImmediately: false # if true, will hide without effects or duration
        callback: null 

      $.extend(options, passedOptions)
      type = options.type
      duration = options.duration
      callback = options.callback
      delay = options.delay
      hideImmediately = options.hideImmediately
 
      # watch the trigger
      jqElm = $(element)
      scope.$watch attrs.jqShow, (value) ->
        if (hideImmediately && !value)
          jqElm.hide(0, callback)
        else
          $timeout ->
            if (type is "fade")
              if value then jqElm.fadeIn(duration, callback) else jqElm.fadeOut(duration, callback)
            else if (type is "slide")
              if value then jqElm.slideDown(duration, callback) else jqElm.slideUp(duration, callback)
            else
              if value then jqElm.show(duration, callback) else jqElm.hide(duration, callback)
          ,
            delay

  return result
]
