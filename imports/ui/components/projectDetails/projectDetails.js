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


    $scope.$on('LastRepeaterElement', function(){
      $('.materialboxed').materialbox();
    });

    this.prev = function() {
      $('.carousel').carousel('prev');
      toggleButtons();
    }

    this.next = function() {
      $('.carousel').carousel('next');
      toggleButtons();
    }

    function toggleButtons() {
      $('#icon_prev').addClass('disabled');
      $('#icon_prev').prop('disabled', true);
      $('#icon_next').addClass('disabled');
      $('#icon_next').prop('disabled', true);
      setTimeout(function() {
        $('#icon_prev').removeClass('disabled');
        $('#icon_prev').prop('disabled', false);
        $('#icon_next').removeClass('disabled');
        $('#icon_next').prop('disabled', false);
      }, 1300);
    }

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
    url: '/project/:projId',
    template: '<project-details></project-details>'
  });
}
