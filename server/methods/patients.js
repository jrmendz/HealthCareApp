Meteor.methods({
  'insertVInfo': function(params){
      getVital = Patients.findOne({_id:params.id}).dailyVitals.vData;
      data = {
          idNurse : this.userId,
          clockIn : params.clockIn,
          clockOut: getDateTimeNow(),
          vitals: params.vitals
      };
      getVital.push(data);
      return Patients.update({_id:params.id},{$set:{'dailyVitals.vData':getVital}});
  }
});



function getDateTimeNow() {
    var dt = new Date();
    return dt.getFullYear() + '-' + addZero(dt.getMonth()+1) + '-' + addZero(dt.getDate()) + ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' +                    dt.getMilliseconds();
}

function addZero(number) {
    if(number < 10) return '0' + number;
    else return number;
}
