import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './projectDetails.html';
import { Projects } from '../../../api/projects';

class ProjectDetails {
  constructor($stateParams, $scope, $reactive, $anchorScroll) {
    'ngInject';

    $reactive(this).attach($scope);

    $anchorScroll(); 

    this.projId = $stateParams.projId;

    // $scope.$on('LastRepeaterElement', function(){
    //   $('.materialboxed').materialbox();
    // });


    this.helpers({
      project() {
        return Projects.findOne({
          project_id: $stateParams.projId
        });
      },
      projects() {
        return Projects.find({});
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
