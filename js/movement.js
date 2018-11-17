var scroll_pos;
var side_close;
$(document).ready(function () {
    scroll_pos = document.documentElement.scrollTop;
    $("#SideMenu").hide();
    side_close = 1;
    var footer = document.getElementById("Foot");
    if (footer.offsetTop < 700) {
        footer.style.top = 700 - footer.offsetTop + "px";
    }
})

function SidemenuToggle() {
    side_close *= -1;
    $("#SideMenu").animate({ width: "toggle" }, "fast");
}

$(window).scroll(function () {
    var new_pos = document.documentElement.scrollTop;
    document.getElementById("ArticleInfor").style.marginTop = new_pos + 20 + "px";
    if (side_close > 0 && new_pos - scroll_pos > 30) {
        $("#HeadMenu").hide("fast");
    }
    if (side_close > 0 && new_pos - scroll_pos < -40) {
        $("#HeadMenu").show("fast");
    }
    scroll_pos = new_pos;
})
  