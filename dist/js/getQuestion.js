$(document).ready(function() {

    var questionNumber = 1;
    var jsonObj = "Loading question";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            jsonObj = JSON.parse(xmlhttp.responseText);
            // jsonObj = {
            //     Type: "GuessYear",
            //     QId: "2",
            //     Correct: "1988",
            //     QText: "Which year is Björnen born?",
            //     QImage: "bjorn.jpg"
            // }
            console.log(jsonObj);
            if (jsonObj.Type == "GuessYear") {
                guessYearQuestion(jsonObj, questionNumber);
            } else if (jsonObj.Type == "MCQ") {
                mcQuestion(jsonObj, questionNumber);
            } else {
                element = $("#question").append("div").html("<h1> no question matchaded </h1>");
            }

        }
    }
    var element = $("#question").append("div").html("<h1> id =" + jsonObj + "</h1>");
    xmlhttp.open("GET", "getQuestion.php");
    xmlhttp.send();

});