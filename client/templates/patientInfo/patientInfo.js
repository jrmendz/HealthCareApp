Template.patientInfo.rendered = function() {
    $('.removeVitals').attr('disabled', true);
};

Template.patientInfo.helpers({
    getInfo : function(){
        var info = Patients.findOne({_id:Session.get('patientId')});
        return info;
    },
    isNull : function(){
        var patientId = Session.get('patientId');
        if(patientId == null){
            window.location.href = '/';
        }
    }
});

arrToServer = new Array();
vitalInfo = {};

Template.addVitalHealthInfo.events({
    'change .type': function(event) {
        var type = event.target.value;
        var typeIndex = $('.type').data("type");
        if(type == 'Blood Pressure') {
            $('#not-blood-pressure-'+typeIndex).hide();
            $('#blood-pressure-'+typeIndex).show();
        } else {
            $('#not-blood-pressure-'+typeIndex).show();
            $('#blood-pressure-'+typeIndex).hide();
        }
    },
    'click .add': function(event) {
        event.preventDefault();
        var addIndex = $('.add').data("index");
        var type = $('#type-'+addIndex).val();
        
        vitals = {
            type: type,
            createTime: getDateTimeNow()
        }
        
        vitalInfo = {
            id: Session.get('patientId'),
            clockIn: Session.get('clockIn'),
            vitals: arrToServer
        }
        console.log(vitalInfo);
        arrToServer.push(vitals);
        
        if(type == 'Temperature') {
            var temperature = parseFloat($('#one-input-'+addIndex).val());
            event.preventDefault();
            if(temperature >= 80 && temperature <= 120 && type != null) {
                vitals.data = {
                    Fahrenheit: temperature
                };
                
            } else {
                $('<div class="alert alert-warning" role="alert">Temperature should be between 80 and 120</div>').appendTo( ".error" );
                $( ".error" ).fadeOut(15000);
                
            }
        } else if(type == "Blood Pressure") {
            event.preventDefault();
            var systolic = parseFloat($('#systolic-'+addIndex).val());
            var diastolic = parseFloat($('#diastolic-'+addIndex).val());
            if(systolic >= 40 && systolic <= 200 && diastolic >= 40 && diastolic <= 200 && type != null) {
                vitals.data = {
                    systolic: systolic,
                    diastolic: diastolic
                };
            } else {
                $('<div class="alert alert-warning" role="alert">Systolic/Diastolic should be between 40 and 200</div>').appendTo( ".error" );
                $( ".error" ).fadeOut(15000);
                
            }
        } else if(type == 'Heart Rate') {
            event.preventDefault();
            var heartRate = parseFloat($('#one-input-'+addIndex).val());
            if(heartRate >= 0 && heartRate <= 200 && type != null) {
                vitals.data = {
                    heartRate: heartRate
                };
            } else {
                $('<div class="alert alert-warning" role="alert">Heart Rate should be between 0 and 200.</div>').appendTo( ".error" );
                $( ".error" ).fadeOut(15000);
            }
        } else if(type == 'Respiration') {
            event.preventDefault();
            var respiration = parseFloat($('#one-input-'+addIndex).val());
            console.log(respiration);
            if(respiration >= 0 && respiration <= 25) {
                vitals.data = {
                    respiration: respiration
                };
            } else {
                $('<div class="alert alert-warning" role="alert">Respiration should be between 0 and 25.</div>').appendTo( ".error" );
                $( ".error" ).fadeOut(15000);
                
            }
        }
    },
    'click .addVitals': function(event){
        var num     = $('.vitals').length,
            newNum  = new Number(num + 1),
            newElem = $('#moreVitals' + num).clone().attr('id', 'moreVitals' + newNum).fadeIn('slow');
        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('Collection #' + newNum);
        newElem.find('.not-blood-pressure').attr('id', 'not-blood-pressure-' + newNum).attr('class', 'not-blood-pressure');
        newElem.find('.blood-pressure').attr('id', 'blood-pressure-' + newNum).attr('class', 'blood-pressure');
        newElem.find('.type').attr('id', 'type-' + newNum);
        newElem.find('.one-input').attr('id', 'one-input-' + newNum);
        newElem.find('.systolic').attr('id', 'systolic-' + newNum);
        newElem.find('.diastolic').attr('id', 'diastolic-' + newNum);
        newElem.find('.add').attr('id', 'add-' + newNum);
        $('#moreVitals' + num).after(newElem);
        console.log(num);
        
        var type = $('.type').data('type') + 1;     
        $('.type').data('type',type);
        
        var type = $('.add').data('index') + 1;     
        $('.add').data('index',type);
        
        var remove = $('.removeVitals').data("index") + 1;       
        $('.removeVitals').data('index', remove); 
        
        $('.removeVitals').attr('disabled', false);
        clearChildren(document.getElementById('moreVitals'+newNum));
        

    },
    'click .removeVitals': function(event){
        var remove = $('.removeVitals').data("index");
        console.log(remove);
         if (confirm("Are you sure you wish to remove this section? This cannot be undone."))
            {
                var num = $('.vitals').length;
                var type = $('.type').data('type') - 1;     
                $('.type').data('type',type);
                
                var remove = $('.removeVitals').data('index');     
                $('.removeVitals').data('index',remove  - 1);
                // how many "duplicatable" input fields we currently have
                $('#moreVitals' + remove).remove();  
                // if only one element remains, disable the "remove" button
                if (num-1 === 1 ){
//                    $('.removeVitals').attr('disabled', true);
                }
            }
        return false;
             // remove the last element
                                           
        
        

    },
    'click #saveVital' : function(event){
        event.preventDefault();
        Meteor.call('insertVInfo',vitalInfo);
        window.location.href = '/out';
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

function clearChildren(element) {
   for (var i = 0; i < element.childNodes.length; i++) {
      var e = element.childNodes[i];
      if (e.tagName) switch (e.tagName.toLowerCase()) {
         case 'input':
            switch (e.type) {
               case "radio":
               case "checkbox": e.checked = false; break;
               case "button":
               case "submit":
               case "image": break;
               default: e.value = ''; break;
            }
            break;
         case 'select': e.selectedIndex = 0; break;
         case 'textarea': e.innerHTML = ''; break;
         default: clearChildren(e);
      }
   }
}
