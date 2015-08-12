Router.route('/', {
  name: 'patients',
  controller: 'PatientsController',
  template : 'patients'
});

Router.route('/patient', {
  name: 'patientInfo',
  controller: 'PatientInfoController',
  template : 'patientInfo'
});

Router.route('/in', {
  name: 'in',
  controller: 'PatientInfoController',
  template: 'clockIn'
});

Router.route('/out', {
  name: 'out',
  controller: 'PatientInfoController',
  template: 'clockOut'
});

Router.plugin('ensureSignedIn', {
  only: ['patients']
});


