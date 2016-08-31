//Page for clubs

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Projects } from '../../../api/projects';
import template from './web.html';

class Web {
  constructor($scope, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  $('#nav_web').addClass('active');

  this.helpers({
    webproj() {
      return Projects.find({});
    }
  });
  }
}

const name = 'web';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Web
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('web', {
      url: '/web',
      template: '<web></web>'
    });
}
