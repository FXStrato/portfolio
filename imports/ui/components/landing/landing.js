import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Projects } from '../../../api/projects';

import template from './landing.html';

class Landing {
  constructor($scope, $reactive, $anchorScroll) {
    'ngInject';

    $reactive(this).attach($scope);

    $anchorScroll();

    this.helpers({
      projects() {
        return Projects.find({}, {sort: {index: 1}});
      }
    });
  }
}

const name = 'landing';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Landing
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/',
      template: '<landing></landing>'
    });
}
