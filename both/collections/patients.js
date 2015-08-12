Patients = new Mongo.Collection('patients');

Patients.helpers({

});

Patients.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});
