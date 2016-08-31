import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './projectDetails.html';
import { Projects } from '../../../api/projects';

class ProjectDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.projId = $stateParams.projId;

    this.helpers({
      project() {
        return Projects.findOne({
          id: $stateParams.projId
        });
      }
    });
  }
}

const name = 'projectDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: ProjectDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('projectDetails', {
    url: '/project/:projId',
    template: '<project-details></project-details>'
  });
}
