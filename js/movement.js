$(document).ready(function () {
    $("#SideMenu").hide();
    var footer = document.getElementById("Footer");
    if (footer.offsetTop < 1000) 
    footer.style.top = "700px";
})

function SidemenuToggle() { 
    $("#SideMenu").animate({ width: "toggle" }, "slow");
}