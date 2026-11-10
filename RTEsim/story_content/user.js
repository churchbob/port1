window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var once = player.once;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
var update = player.update;
var pointerX = player.pointerX;
var pointerY = player.pointerY;
var showPointer = player.showPointer;
var hidePointer = player.hidePointer;
var slideWidth = player.slideWidth;
var slideHeight = player.slideHeight;
var getKeyDown = player.getKeyDown;
var keydown = player.keydown;
var keyup = player.keyup;
window.Script1 = function()
{
  var patients = {
    ADDISON: {
	    patientFname: "Addison",
        patientLname: "Allen",
		patientDOB: "02/02/2000",
        CoverageID: "20002",
        CoverageName: "AETNA MC NAP",
        MemberID1: "123456789",
		SubscriberID1:"123456789",
		SubscriberFname1:"Addison",
		SubscriberLname1:"Allen",
        RTEerror: 2,
        misMatchData1Type: "MemberID",
        misMatchData1Sent: "123456789",
        misMatchData1Received: "1234567890",
        CoverageEligibileStart: "02/02/2022",
        Elgibility: "Eligible"
    },

    ROBYN: {
	    patientFname: "Robyn",
        patientLname: "Byrd",
		patientDOB: "12/07/2002",
        RTEerror: 1,
        CoverageID: "30005",
        CoverageName: "BCBS PPO",
        MemberID1: "555777999",
		SubscriberID1:"555777999",
		SubscriberFname1:"Robyn",
		SubscriberLname1:"Bryd",
		misMatchData1Type: "",
        misMatchData1Sent: "",
        misMatchData1Received: "",
        CoverageEligibileStart: "",
        Elgibility: "Eligible"
    },
     FRANK: {
	    patientFname: "Frank",
        patientLname: "Allen",
		patientDOB: "01/01/1997",
        CoverageID: "20002",
        CoverageName: "AETNA MC NAP",
        MemberID1: "ABCDEFGH",
		SubscriberID1:"ABCDEFGH",
		SubscriberFname1:"Frank",
		SubscriberLname1:"Allen",
        RTEerror: 2,
        misMatchData1Type: "Group",
        misMatchData1Sent: "2345",
        misMatchData1Received: "02345",
        CoverageEligibileStart: "01/01/2025",
        Elgibility: "Eligible"
    },
     ANNE: {
	    patientFname: "Anne",
        patientLname: "Raye",
		patientDOB: "01/01/2000",
        CoverageID: "20002",
        CoverageName: "AETNA MC NAP",
        MemberID1: "ABCDEFGH",
		SubscriberID1:"ABCDEFGH",
		SubscriberFname1:"Anne",
		SubscriberLname1:"Raye",
        RTEerror: 2,
        misMatchData1Type: "Name",
        misMatchData1Sent: "Anne Raye",
        misMatchData1Received: "Ann Raye",
        CoverageEligibileStart: "01/01/2025",
        Elgibility: "Eligible"
    },

};

// DON'T CHANGE ANYTHING BELOW THIS LINE //////////////////
var player = GetPlayer();

var selectedPatientName = player.GetVar("SelectedPatient");

var selectedPatient = patients[selectedPatientName];

if (selectedPatient) {
    for (var key in selectedPatient) {
        player.SetVar(key, selectedPatient[key]);
    }
        // Create initials
    player.SetVar(
        "patientInitials",
        selectedPatient.patientFname.substring(0,1) +
        selectedPatient.patientLname.substring(0,1)
    );
	// Calculate age
	var dob = new Date(selectedPatient.patientDOB);
	var today = new Date();

	var age = today.getFullYear() - dob.getFullYear();

	var monthDiff = today.getMonth() - dob.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < dob.getDate())
	) {
		age--;
	}
	
var formattedDate =
String(today.getMonth() + 1).padStart(2, '0') + "/" +
String(today.getDate()).padStart(2, '0') + "/" +
today.getFullYear();

player.SetVar("today", formattedDate);
player.SetVar("patientAge", age);

}
}

window.Script2 = function()
{
  var player = GetPlayer();

var mismatchType = player.GetVar("misMatchData1Type");

if (mismatchType == "Name") {
    var fname = player.GetVar("patientFname");
    var lname = player.GetVar("patientLname");
    player.SetVar("misMatchData1Sent", fname + " " + lname);
    //alert("good idea"+fname+"-"+lname);
}
else if (mismatchType == "Group") {
    player.SetVar("misMatchData1Sent",
    player.GetVar("coverageGroupID"));
}
else if (mismatchType == "MemberID") {
    player.SetVar("misMatchData1Sent",
    player.GetVar("MemberID1"));
}
}

window.Script3 = function()
{
  var player = GetPlayer();

var termedCoverage = {
    id: player.GetVar("CoverageID"),
    name: player.GetVar("CoverageName"),
    subscriberName: player.GetVar("SubscriberLname1")+","+ player.GetVar("SubscriberFname1"),
    memberId: player.GetVar("MemberID1"),
    effectiveFrom: player.GetVar("CoverageEligibileStart"),
    effectiveTo: player.GetVar("CoverageEffectiveTo"),
    groupNumber: player.GetVar("coverageGroupID")
};

player.SetVar(
    "CoverageToTerm",
    JSON.stringify(termedCoverage)
);
}

};
