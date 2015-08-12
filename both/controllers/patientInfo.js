PatientInfoController = AppController.extend({
    waitOn: function() {
        return this.subscribe('patients');
    },
    data: {
        patients: Patients.find({})
    },
    onAfterAction: function () {
        Meta.setTitle('Patient Information');
    }
});

PatientInfoController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
