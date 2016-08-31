//Logic for navbar

import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';

class Navigation {
  constructor($scope, $reactive, $location) {
    'ngInject';

    $reactive(this).attach($scope);

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $(".button-collapse").sideNav({closeOnClick: true});
  }
}

const name = 'navigation';

// create a module
export default angular.module(name, [
  angularMeteor
]).component(name, {
  template,
  controllerAs: name,
  controller: Navigation
});
