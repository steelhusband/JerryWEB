// Loginfunktion som skickar t ex lärare och elev till olika sidor

function Login()
{
    var done = 0;
    var username = document.login.username.value;
    var password = document.login.password.value;

    username = username.toLowerCase();
    password = password.toLowerCase();

    if (username === "admin" && password === "admin")
    { window.location = "admintor.html"; done = 1; }
    if (username === "larare1@newton.se" && password === "1234")
    { window.location = "databas json/larare1.html"; done = 1; }
    if (username === "elev1@newton.se" && password === "1234")
    { window.location = "databas json/student1.html"; done = 1; }
    if (username === "elev2@newton.se" && password === "1234")
    { window.location = "databas json/student1.html"; done = 1; }
    if (username === "user" && password === "user")
    { window.location = "databas json/student1.html"; done = 1; }
    if (done === 0)
    { alert("Felaktigt Lösenord!"); }
}

// Fotbollsprovet - loopar igenom activity.json där frågorna och svaren ligger lagrade i en JSon Array.

$(document).ready(function ()
{
    var questionNumber = 0;
    var questionBank = new Array();
    var stage = "#game1";
    var stage2 = new Object;
    var questionLock = false;
    var numberOfQuestions;
    var score = 0;

    $.getJSON("js/activity.json", function (data)
    {
        for (var i = 0; i < data.prov.length; i++)
        {
            questionBank[i] = new Array;
            questionBank[i][0] = data.prov[i].question;
            questionBank[i][1] = data.prov[i].option1;
            questionBank[i][2] = data.prov[i].option2;
            questionBank[i][3] = data.prov[i].option3;
        }
        numberOfQuestions = questionBank.length;
        displayQuestion();
    });


    // Visar frågorna och slumpar svarsalternativens ordning då Option 1 alltid innehåller det korrekta svaret.

    function displayQuestion()
    {
        var rnd = Math.random() * 3;
        rnd = Math.ceil(rnd);

        var q1, q2, q3;
        
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 3) { q3 = questionBank[questionNumber][1]; q1 = questionBank[questionNumber][2]; q2 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 1) { q1 = questionBank[questionNumber][1]; q2 = questionBank[questionNumber][2]; q3 = questionBank[questionNumber][3]; }
        if (rnd == 2) { q2 = questionBank[questionNumber][1]; q3 = questionBank[questionNumber][2]; q1 = questionBank[questionNumber][3]; }
        
        // Script för att visa frågan samt ge den ett id för sammankoppling med html.

        $(stage).append('<div class="questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="option">' + q1 + '</div><div id="2" class="option">' + q2 + '</div><div id="3" class="option">' + q3 + "</div>");

        $(".option").click(function ()
        {
            if (questionLock == false)
            {
                questionLock = true;

                // Rätt svar som visade direkt, vi valde att ta bort detta utan att förstöra logiken om vi skulle behöva återvända till denna
                if (this.id == rnd)
                {
                    $(stage).append('<div class="feedback1"></div>');
                    score++;
                }

                // Fel Svar	- läs ovan
                if (this.id != rnd)
                {
                    $(stage).append('<div class="feedback2"></div>');
                }
                setTimeout(function() { changeQuestion() }, 500);
            }
        });
    }
     
    // Jquery som visar nästa fråga samt "låser" den besvarade så man inte kan göra samma två gånger.
    function changeQuestion()
    {
        questionNumber++;

        if (stage == "#game1")
        {
            stage2 = "#game1";
            stage = "#game2";
        }

        else
        { stage2 = "#game2"; stage = "#game1"; }

        if (questionNumber < numberOfQuestions)
        { displayQuestion(); }

        else
        { displayFinalSlide(); }

        $(stage2).animate({ "right": "+=800px" }, "slow", function () { $(stage2).css("right", "-800px"); $(stage2).empty(); });
        $(stage).animate({ "right": "+=800px" }, "slow", function () { questionLock = false; });
    }


    // En simpel if/else som räknar ut det godkända betyget på de korrekt valda alternativen
    function grade()
    {
        var g = ("G");
        var ig = ("IG");

            if (score >= 12)
            { return g; }

            else
            { return ig; }
    }


    // visar resultatet som poäng samt procent
    function displayFinalSlide()
    {
        var pcnt = (100 * score / (numberOfQuestions).toFixed(1));
        alert("Provet är slut!\nAntal frågor: " + numberOfQuestions + "\nAntal Rätt: " + score + "\nProcent: " + pcnt + "%");

        // Sparar ner resultatet + betyget i local storage med JSon.
        var result = ["Antal Rätt:" + " " + score + ", " + "Betyg: " + "" + grade()];
        localStorage.setItem("userResult", JSON.stringify(result));
    }
});

// Timer som klockar provet. del 1. Längst ner i dokumentet finner vi den inställda klockan

function startTimer(duration, display)
{
    var timer = duration, minutes, seconds;
    setInterval(function ()
    {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;

        if (--timer === 0)
        {
            display.textContent = "Provet är slut!";
            Exit();
        }
    }, 1000);
}

// stoppfunktion när tiden går ut - inget alternativ för att avbryta
function Exit()
{
    alert("Provet är slut. Du skickas nu tillbaka till förgående sida!");
    document.location.href = "databas json/student1.html";
}

// stoppfunktion för pågående prov med möjlighet av avbryta
function myStopFunktion()
{
    var y = confirm("Är du säker på att du vill avsluta provet? I så fall skickas nu tillbaka till förgående sida!");
    if (y)
    {
        document.location.href = "databas json/student1.html";
    }
}

// Tidsinställning av timern samt att den laddas in när fönstret öppnar.
window.onload = function ()
{
    var countDown = 60 * 3.0,
    display = document.querySelector("#time");
    startTimer(countDown, display);
}