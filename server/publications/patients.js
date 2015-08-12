Meteor.publishComposite("patients", function() {
  return {
    find: function() {
      return Patients.find();
    }
  }
});
