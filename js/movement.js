$(document).ready(function () {
    $("#SideMenu").hide();
    var footer = document.getElementById("Foot");
    if (footer.offsetTop < 700) {
        footer.style.top = 700 - footer.offsetTop + "px";
    }
})

function SidemenuToggle() {
    $("#SideMenu").animate({ width: "toggle" }, "fast");
}