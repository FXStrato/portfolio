//Page for clubs

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './about.html';

class About {
  constructor($scope, $reactive, $location) {
  'ngInject';


  $reactive(this).attach($scope);

  $('#nav_about').addClass('active');
  }
}

const name = 'about';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: About
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('about', {
      url: '/about',
      template: '<about></about>'
    });
}
