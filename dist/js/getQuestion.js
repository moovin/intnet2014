$(document).ready(function() {

	//randomFunction();
	var jsonObj = {
		"id": 1,
		"correct": "true",
		"type": "song"
	};

	var element = $("#question").append("div").html("<h1> id =" + jsonObj.id + "</h1>");;

});


function randomFunction() {
	alert("hej!");
}