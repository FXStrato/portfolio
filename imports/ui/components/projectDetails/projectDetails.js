import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './projectDetails.html';
import { Projects } from '../../../api/projects';

class ProjectDetails {
  constructor($stateParams, $scope, $reactive, $anchorScroll) {
    'ngInject';

    $reactive(this).attach($scope);

    const coreindexes = [2,9,0,8,10,3];

    $anchorScroll();

    let id = $stateParams.projId;
    let index = $stateParams.index;
    let result = [];

    for(var i = 1; i <= coreindexes[index]; i++) {
      result.push({image: '/images/' + id + '/' + id + '_' + i + '.png'});
    }
    Galleria.loadTheme('/thirdparty/galleria.classic.min.js');
    Galleria.run('.galleria', {
      responsive : true,
      height: 1,
      dataSource: result,
      lightbox: true
    });

    this.projId = $stateParams.projId;

    this.helpers({
      project() {
        return Projects.findOne({
          project_id: $stateParams.projId
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
    url: '/project/:projId/:index',
    template: '<project-details></project-details>'
  });
}
