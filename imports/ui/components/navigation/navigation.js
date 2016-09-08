//Logic for navbar

import angular from 'angular';
import angularMeteor from 'angular-meteor';

import template from './navigation.html';
import { Projects } from '../../../api/projects';

class Navigation {
  constructor($scope, $reactive, $location) {
    'ngInject';

    $reactive(this).attach($scope);


    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $(".button-collapse").sideNav({closeOnClick: true});


    $scope.$on('LastRepeaterElement', function(){
    });

    this.helpers({
      projects() {
        return Projects.find({}, {sort: {index: 1}});
      }
    });
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
