'use strict';

// @see http://stackoverflow.com/questions/16208899/intercepting-ng-click-in-angularjs
(function() {
  angular
    .module('tienda')
    .directive('confirmClick', Directive);

  function Directive() {
    return {
        restrict: 'A',
        link: function(scope, elt, attrs) {
            elt.bind('click', function(e) {
                var message = attrs.confirmation || "Are you sure you want to do that?";
                if (window.confirm(message)) {
                    var action = attrs.confirmClick;
                    if (action)
                        scope.$apply(scope.$eval(action));
                }
            });
        }
    }
  }

})();
