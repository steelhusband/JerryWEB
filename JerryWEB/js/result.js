$(document).ready(function ()
{
    var storedResult = localStorage.getItem("userResult");
    var result2 = JSON.parse(storedResult);
    document.getElementById("studentResult").innerHTML = result2;
});

function ClearAll()
{
    window.onclick(localStorage.clear());
}