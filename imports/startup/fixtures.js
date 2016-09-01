//Startup code. This code runs when the server boots up, and does the following
//1. Creates constant called parties, and then inserts into the Collection
//2. Note that the collection needs to be imported first

import { Meteor } from 'meteor/meteor';
import { Parties } from '../api/parties';
import { Projects } from '../api/projects';

Meteor.startup(() => {
  if (Parties.find().count() === 0) {
    const parties = [{
      'name': 'Dubstep-Free Zone',
      'description': 'Fast just got faster with Nexus S.'
    }, {
      'name': 'All dubstep all the time',
      'description': 'Get it on!'
    }, {
      'name': 'Savage lounging',
      'description': 'Leisure suit required. And only fiercest manners.'
    }];

    parties.forEach((party) => {
      Parties.insert(party)
    });
  }
  if (Projects.find().count() === 0) {
    const projs = [{
      'project_id': 'wga_2016',
      'name': 'WGA Umbrella Site Design 2016',
      'description': "Currently working on creating Washington Gaming Association's umbrella site"
    }, {
      'project_id': 'att_icc_2016',
      'name': 'AT&T Intern Coding Challenge 2016',
      'description': "Team of 4 redesigned the Heroes On The Water organization's website"
    }, {
      'project_id': 'info_463',
      'name': 'INFO 463 Smartwatch Design 2016',
      'description': 'Worked in a team of four to design a smartwatch interface'
    }, {
      'project_id': 'att_internship_2015',
      'name': 'AT&T Internship 2015',
      'description': 'Redesigned the OTSM dashboard for client team working with Jasper'
    }, {
      'project_id': 'att_icc_2015',
      'name': 'AT&T Intern Coding Challenge 2015',
      'description': 'Worked in a team of 6 to create a food buddy app'
    }, {
      'project_id': 'dubhacks_2015',
      'name': 'Dubhacks 2015',
      'description': 'Team of 2 created an encrypted messaging app built with Socket.io'
    }];
    projs.forEach((project) => {
      Projects.insert(project)
    });
  }

});
