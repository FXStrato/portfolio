//Startup code. This code runs when the server boots up, and does the following
//1. Creates constant called parties, and then inserts into the Collection
//2. Note that the collection needs to be imported first

import { Meteor } from 'meteor/meteor';
import { Projects } from '../api/projects';

Meteor.startup(() => {
  // if (Projects.find().count() === 0) {
    const projs = [{
      'index': 0,
      'project_id': 'wga_2016',
      'name': 'WGA Umbrella Site Design 2016',
      'shortname': 'WGA 2016',
      'description': "Creation of Washington Gaming Association's umbrella site",
      'code': 'Meteor, MEAN Stack, MaterializeCSS',
      'role': 'Full Stack Developer',
      'long_description': "This is a current project for WGA (Washington Gaming Association). The site being developed will serve as an umbrella site for all the eSports clubs within the University of Washington. It is both desktop and mobile responsive, and will be online by the end of this year.",
      'pictures': ['wga_2016_1', 'wga_2016_2']
    }, {
      'index': 1,
      'project_id': 'att_icc_2016',
      'name': 'AT&T Intern Coding Challenge 2016',
      'shortname': 'AT&T ICC 2016',
      'description': "Team of 4 redesigned the Heroes On The Water organization's website",
      'code': 'MEAN Stack (MongoDB, Express, AngularJS, Node.js) and Bootstrap',
      'role': 'Project Manager, Full Stack Developer',
      'long_description': "This project was part of AT&T's internship program. We were asked to redesign the Heroes On The Water orgnization's site. The top three intern teams across the nation chosen by the judges would receive a cash prize. Given four weeks time compared to the other teams who had seven weeks, we created a functional, developed, and scalable site. For our efforts, we placed 3rd overall from a pool of 12 teams and received Best Video and Most Innovative accolades.",
      'pictures': ['att_icc_2016_1', 'att_icc_2016_2', 'att_icc_2016_3', 'att_icc_2016_4', 'att_icc_2016_5', 'att_icc_2016_6', 'att_icc_2016_7', 'att_icc_2016_8', 'att_icc_2016_9']
    }, {
      'index': 2,
      'project_id': 'info_463',
      'name': 'INFO 463 Final Project 2016',
      'shortname': 'INFO 463 2016',
      'description': 'Worked in a team of 4 to design an efficient and accurate smartwatch interface',
      'code': 'HTML/CSS with Javascript libraries',
      'role': 'Graphic Designer and Web Developer',
      'long_description': "INFO 463 is a course at the University of Washington that focuses on user experience and interaction. Our final project was to design a smartwatch interface that was intuitive, efficient, accurate, and quick. As the team's developer, I built the page for users to test on, and also assisted in providing graphical wireframes for initial prototyping ideas. Our final design produced 17 WPM, whereas our class average was 14 WPM with their designs.",
      'github': "https://github.com/FXStrato/GG3-Final"
    }, {
      'index': 3,
      'project_id': 'att_internship_2015',
      'name': 'AT&T Internship 2015',
      'shortname': 'AT&T 2015',
      'description': 'Redesigned the OTSM dashboard for client team working with Jasper',
      'code': 'Adobe Coldfusion, HTML, Javascript, and Bootstrap',
      'role': 'UI/UX and Front-End Web Developer',
      'long_description': "My client work for my internship at AT&T in 2015 required me to redesign their dashboard. I accomplished this task by adding in additional user functionality, ease of access, increasing readability, and overall improving the user experience when accessing the dashboard.",
      'pictures': ['att_internship_2015_1', 'att_internship_2015_2', 'att_internship_2015_3', 'att_internship_2015_4', 'att_internship_2015_5', 'att_internship_2015_6', 'att_internship_2015_7', 'att_internship_2015_8'],
      'captions': ['Redesigned capacity page', 'Old capacity page', 'Redesigned Activity File History page', 'Old Activity File History Page', 'Redesigned Invoice File History Page', 'Old Invoice History Page', 'Redesigned Invoice History Page', 'Old Invoice History Page']
    }, {
      'index': 4,
      'project_id': 'att_icc_2015',
      'name': 'AT&T Intern Coding Challenge 2015',
      'shortname': 'AT&T ICC 2015',
      'description': 'Worked in a team of 6 to create a food buddy app',
      'code': 'Node.js, AngularJS, Parse Database, Google and Yelp API',
      'role': 'Front-End Web Developer',
      'long_description': "Our intern team of 6 was tasked with creating a food buddy app to allow coworkers to easily find time and friends to go to lunch with. We designed our web app with a focus on mobile usage and created user profiles, event creation and details, polling, comments, events list separated by attending and invited, public vs. private events, and much more. We competed against the other summer interns across the nation. All the other interns had 7 weeks to complete their apps, while our team only had 4 weeks to submit a working application. Our app placed 1st in Best Overall from a pool of 16 intern teams.",
      'pictures': ['att_icc_2015_1', 'att_icc_2015_2', 'att_icc_2015_3', 'att_icc_2015_4', 'att_icc_2015_5', 'att_icc_2015_6', 'att_icc_2015_7', 'att_icc_2015_8', 'att_icc_2015_9', 'att_icc_2015_10']
    }, {
      'index': 5,
      'project_id': 'dubhacks_2015',
      'name': 'Dubhacks 2015',
      'shortname': 'Dubhacks 2015',
      'description': 'Team of 2 created an encrypted messaging app built with Socket.io',
      'code': 'MEAN Stack, Socket.io, Bootstrap CSS',
      'role': 'Developer',
      'github': 'https://github.com/FXStrato/dubhacks2015',
      'long_description': "At Dubhacks 2015, hosted by the University of Washington, a partner and I created an encrypted messaging app that we dubbed Ghost in 14 hours. Utilizing Socket.io chat functionality, we created randomly generated rooms and allowed for hosting and joining of these rooms. The messages sent through the server are encrypted, and then decoded on the client side; that way, anyone intercepting the messages from the client to the server will only find an encrypted message.",
      'pictures': ['dubhacks_2015_1', 'dubhacks_2015_2', 'dubhacks_2015_3']
    }];
    Projects.remove({});
    projs.forEach((project) => {
      Projects.insert(project)
    });
  // }

});
