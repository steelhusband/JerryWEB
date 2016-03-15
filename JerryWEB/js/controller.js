// Login

function Login()
{
    var done = 0;
    var username = document.login.username.value;
    var password = document.login.password.value;

    username = username.toLowerCase();
    password = password.toLowerCase();

    if (username === "admin" && password === "admin")
    { window.location = "admintor.html"; done = 1; }
    if (username === "larare" && password === "larare")
    { window.location = "larare.html"; done = 1; }
    if (username === "elev1@newton.se" && password === "1234")
    { window.location = "anvandare.html"; done = 1; }
    if (username === "elev2@newton.se" && password === "1234")
    { window.location = "anvandare.html"; done = 1; }
    if (username === "user" && password === "user")
    { window.location = "anvandare.html"; done = 1; }
    if (done === 0)
    { alert("Felaktigt Lösenord!"); }
}

// Fotbollsprovet

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
        
        $(stage).append('<div class="questionText">' + questionBank[questionNumber][0] + '</div><div id="1" class="option">' + q1 + '</div><div id="2" class="option">' + q2 + '</div><div id="3" class="option">' + q3 + "</div>");

        $(".option").click(function ()
        {
            if (questionLock == false)
            {
                questionLock = true;

                // Rätt svar
                if (this.id == rnd)
                {
                    $(stage).append('<div class="feedback1"></div>');
                    score++;
                }
                // Fel Svar	
                if (this.id != rnd)
                {
                    $(stage).append('<div class="feedback2"></div>');
                }
                setTimeout(function() { changeQuestion() }, 500);
            }
        });
    }

    function changeQuestion()
    {
        questionNumber++;

        if (stage == "#game1")
        {
            stage2 = "#game1";
            stage = "#game2";
        }

        else
        {
             stage2 = "#game2"; stage = "#game1";
        }

        if (questionNumber < numberOfQuestions)
        {
            displayQuestion();
        }

        else
        {
            displayFinalSlide();  
        }

        $(stage2).animate({ "right": "+=800px" }, "slow", function () { $(stage2).css("right", "-800px"); $(stage2).empty(); });
        $(stage).animate({ "right": "+=800px" }, "slow", function () { questionLock = false; });
    }

    function displayFinalSlide()
    {
        var pcnt = (100 * score / (numberOfQuestions).toFixed(1));
        alert("Provet är slut!\nAntal frågor: " + numberOfQuestions + "\nAntal Rätt: " + score + "\nProcent: " + pcnt + "%");

        // Sparar ner resultatet i local storage med JSon.
        var result = [score];
        localStorage.setItem("userResult", JSON.stringify(result));

        // Plockar upp resultatet från local storage och skriver ut det.
        var storedResult = localStorage.getItem("userResult"); 
        var result2 = JSON.parse(storedResult);

        //Test så att man vet att rätt värde har laddats in
        alert(result2);
    }
});

// Timer

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
            stopTimer();
        }
    }, 1000);
}

function Exit()
{
    var y = confirm("Provet är slut. Du skickas nu tillbaka till förgående sida!");
    if (y)
    {
        document.location.href = "anvandare.html";
    }
}

function stopTimer()
{
    Exit();
}

function myStopFunktion()
{

    var y = confirm("Är du säker på att du vill avsluta provet? I så fall skickas nu tillbaka till förgående sida!");
    if (y)
    {
        document.location.href = "anvandare.html";
    }
}


window.onload = function ()
{
    var countDown = 60 * 0.1,
    display = document.querySelector("#time");
    startTimer(countDown, display);
}