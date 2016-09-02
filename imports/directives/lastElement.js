export default angular.module('projectDetails').directive('emitLastRepeaterElement', function() {
  return function(scope) {
      if (scope.$last){
        scope.$emit('LastRepeaterElement');
      }
    };
});
