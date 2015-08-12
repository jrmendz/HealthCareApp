Template.patients.rendered = function() {
    Session.set('patientId',null); 
};

Template.patients.events({
    'click #patient_id': function(event){
        Session.set('patientId',this._id);
        
    },
    'click #clockIn' : function(event){
        Session.set('clockIn',getDateTimeNow());
        
    }
});

Template.patients.helpers({
    'isSelected' : function(){
        var patientId = Session.get('patientId');
        if(patientId == null){
            return false;
        }else{
            return true;   
        }
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