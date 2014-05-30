$(document).ready(function() {

    var jsonObj ="Loading question";
    var xmlhttp=new XMLHttpRequest();
    
    xmlhttp.onreadystatechange=function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
    	  jsonObj =JSON.parse(xmlhttp.responseText);
    	  console.log(typeof(jsonObj) + jsonObj); 
    	  element = $("#question").append("div").html("<h1> id =" + jsonObj.QId + "</h1>");
      }
    }
    var element = $("#question").append("div").html("<h1> id =" + jsonObj + "</h1>");
    xmlhttp.open("GET","getQuestion.php");
    xmlhttp.send();

});
