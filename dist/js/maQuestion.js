function mcQuestion(jsonObj, questionNumber) {
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
        "<form>" +
        "<div class='multipleChoice'>" +
        "<input class='answer' type='radio' name='alt1' value=" + jsonObj.Alt1 + ">" + " " + jsonObj.Alt1 + "</br>" +
        "<input class='answer' type='radio' name='alt2' value=" + jsonObj.Alt2 + ">" + " " + jsonObj.Alt2 + "</br>" +
        "<input class='answer' type='radio' name='alt3' value=" + jsonObj.Alt3 + ">" + " " + jsonObj.Alt3 + "</br>" +
        "</div>" +
        "<input id='submitAnswer' type='submit'>" +
        "</form>" +
        "</div>" +
        "<div class='col-md-6'>" +
        "<img class='qimg' src=" + imageURL + ">" +
        "</div>" +
        "</div>"
    );

    var answer;
    $(".answer").change(function() {
        //Save the users temporary answer to the variable answer.
        answer = $(this)[0].value
    });

    $("#submitAnswer").click(function() {

        // console.log(answer);
        // console.log("correct: " + jsonObj.Correct);

        // Compare the answer to the correct answer.
        if (answer == jsonObj.Correct) {
            alert("rätt!");
        } else {
            alert("fel");
        }
        window.location.reload();
    });
}