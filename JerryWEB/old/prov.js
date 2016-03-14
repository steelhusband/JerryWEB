/*  Login   */

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
    if (done === 0)
    { alert("Felaktigt Lösenord!"); }
}

/*  Provrättning  */

function init()
{
    document.getElementById("btn").onclick = stopTimer;
    document.getElementById("btnclr").onclick = clear;
}

function validate()
{
    var radios = document.getElementById("prov").getElementsByTagName("INPUT");
    var right = 0;
    var wrong = 0;
    for (var i = 0, len = radios.length; i < len; i++)
    {
        if (radios[i].value === "x")
        {
            if (radios[i].checked === true)
            {
                right++;
                radios[i].parentNode.parentNode.className = "rightans";
            }
            else
            {
                wrong++;
                radios[i].parentNode.parentNode.className = "wrongans";
            }
        }
    }
    var pcnt = (100 * right / (wrong + right)).toFixed(1);
    alert("Rätt: " + right + "\nFel: " + wrong + "\nProcent: " + pcnt + "%");
}



function clear()
{
    var radios = document.getElementById("prov").getElementsByTagName("INPUT");
    for (var i = 0, len = radios.length; i < len; i++)
    {
        radios[i].checked = false;
        if (radios[i].value === "x")
        {
            radios[i].parentNode.parentNode.className = "";
        }
    }
    document.getElementById("result").innerHTML = "";
}

/* Timerfunktion  */

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
    validate();
    Exit();
}

window.onload = function()
{
        var countDown = 60 * 0.1,
        display = document.querySelector("#time");
        startTimer(countDown, display);
        init();
}   