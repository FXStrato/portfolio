import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './webDetails.html';
import { WebProjects } from '../../../api/webprojects';

class WebDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.webId = $stateParams.webId;

    $('#nav_web').addClass('active');

    this.helpers({
      project() {
        return WebProjects.findOne({
          id: $stateParams.webId
        });
      }
    });
  }
}

const name = 'webDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: WebDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('webDetails', {
    url: '/web/:webId',
    template: '<web-details></web-details>'
  });
}
