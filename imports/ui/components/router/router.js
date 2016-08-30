//This is the main component that will redirect to all other pages. Include an import and include it as part of the modules list
//when you want to incorporate a page.

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './router.html';
import { name as Navigation } from '../navigation/navigation';
import { name as Clubs } from '../clubs/clubs';
import { name as Landing } from '../landing/landing'; //Example of import

//Logic for controller will go here. To format correctly, follow some example code from tutorial_code folder
class Router {}

const name = 'router';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  Navigation,
  Clubs,
  Landing //Example of adding module to module list
]).component(name, {
  template,
  controllerAs: name,
  controller: Router
})
  .config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true); //Sets url to html5 standards

  $urlRouterProvider.otherwise('/'); // This redirects back to home page if a nonexistent url is attempted

}
