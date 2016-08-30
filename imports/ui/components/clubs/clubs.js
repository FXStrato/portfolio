//Page for clubs

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './clubs.html';

class Clubs {
  constructor($scope, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);
  }
}

const name = 'clubs';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Clubs
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('clubs', {
      url: '/clubs',
      template: '<clubs></clubs>'
    });
}
