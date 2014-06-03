function guessYearQuestion(jsonObj) {
    //var rights = numberRight;
    var questionNumber = 7;
    var imageURL = "'" + "dist/img/" + jsonObj.QImage + "'";
    element = $("#question").append("div").html(
        "<div class='row'>" +
        "<div class='col-md-1'>" +
        "</div>" +
        "<div class='col-md-5'>" +
        "<h1> Question " + questionNumber + "</h1>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-md-1'>" +
        "</div>" +
        "<div class='col-md-5'>" +
        "<p id='qText'>" +
        jsonObj.QText + "</p>" +
        "<div class=multipleChoice>" +
        "<input id='answer' type='number' name='quantity' min='1900' max='2050'>" +
        "</div>" +
        "<input id='submitAnswer' type='submit'>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<img class='qimg' src=" + imageURL + ">" +
        "</div>" +
        "</div>"
    );

    console.log("2: jsonObj.Correct is: " + jsonObj.Correct + "and of type: " + typeof(jsonObj.Correct));
    $("#submitAnswer").click(function() {
        //Save the users answer to the variable answer. This is a string (like "1988"). 
        var answer = $("#answer")[0].value;
        console.log("answer is: " + answer + " and type is: " + typeof(answer));
        console.log("jsonObj.Correct is: " + jsonObj.Correct + "and of type: " + typeof(jsonObj.Correct));
        // Compare the answer to the correct answer.
        if (answer == jsonObj.Correct) {
            alert("rätt!");
            var rights = parseInt(getCookie("nRights"));
            rights = rights + 1;
            document.cookie = "nRights=" + rights + "; expires= date() + 600;";
            console.log("inne i mcQuestion och har satt rights: " + getCookie("nRights"));
            rightIds = getCookie("rightIds");
            if (rightIds == "none") {
                document.cookie = "rightIds=" + jsonObj.QId + "; expires=date() + 600;";
            } else {
                document.cookie = "rightIds=" + rightIds + "," + jsonObj.QId + "; expires=date() + 600;";
            }
        } else {
            alert("fel");
        }
        //window.location.reload(); //reload the page again and get a new question. 
        newQuestion();
    });
};