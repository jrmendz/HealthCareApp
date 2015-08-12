PatientsController = AppController.extend({
    waitOn: function() {
        return this.subscribe('patients');
    },
    data: {
        patients: Patients.find({})
    },
    onAfterAction: function () {
        Meta.setTitle('Patients');
    }
});

PatientsController.events({
  'click [data-action=doSomething]': function (event, template) {
    event.preventDefault();
  }
});
