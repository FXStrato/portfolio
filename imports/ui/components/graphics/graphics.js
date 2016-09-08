import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import { Projects } from '../../../api/projects';
import template from './graphics.html';

class Graphics {
  constructor($scope, $reactive) {
  'ngInject';

  $reactive(this).attach($scope);

  this.helpers({
    projects() {
      return Projects.find({});
    }
  });
  }
}

const name = 'graphics';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: Graphics
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider
    .state('graphics', {
      url: '/graphics',
      template: '<graphics></graphics>'
    });
}
