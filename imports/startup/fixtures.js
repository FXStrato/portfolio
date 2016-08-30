//Startup code. This code runs when the server boots up, and does the following
//1. Creates constant called parties, and then inserts into the Collection
//2. Note that the collection needs to be imported first

import { Meteor } from 'meteor/meteor';
import { Parties } from '../api/parties';
import { WebProjects} from '../api/webprojects';

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
  // if (WebProjects.find().count() === 0) {
    const projects = [{
      'project_id': 'info_463',
      'name': 'INFO 463 Final Design',
      'description': 'Worked with in a team of 4 to design a smartwatch interface'
    }, {
      'project_id': 'att_internship_2015',
      'name': 'AT&T Internship 2015',
      'description': 'Redesigned the OTSM dashboard for client'
    }, {
      'project_id': 'att_icc_2016',
      'name': 'AT&T Intern Coding Challenge 2016',
      'description': "Redesigned the Heroes On The Water organization's website"
    }];
    WebProjects.remove({});
    projects.forEach((project) => {
      WebProjects.insert(project)
    });
  // }

});
