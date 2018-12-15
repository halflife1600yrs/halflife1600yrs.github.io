var scroll_pos;
var side_close;

function Insert(father, kind, cname) {
    var child = document.createElement(kind);
    child.className = cname;
    father.appendChild(child);
    return child;
}

var work_infor, infor1, infor2;

function ShowInfor(event, cont) {
    var e = event || window.event;
    var x = e.clientX, y = e.clientY;
    work_infor.style.left = x - 15 + 'px', work_infor.style.top = y - 60 + 'px';
    infor1.innerHTML = cont.substring(0, cont.lastIndexOf(' '));
    infor2.innerHTML = cont.substring(cont.lastIndexOf(' '), cont.length) + " post(s)";
    $(work_infor).show();
}

$(document).ready(function () {
    scroll_pos = document.documentElement.scrollTop;
    $("#side-menu").hide();
    side_close = 1;
    var footer = document.getElementById("foot");
    if (footer.offsetTop < 700) {
        footer.style.top = 700 - footer.offsetTop + "px";
    }
    //如果页面长度过短,将页眉的位置向下设置
    work_infor = Insert(document.body, 'div', 'work-infor');
    infor1 = Insert(work_infor, 'span', "infor-1");
    Insert(work_infor, 'br', null);
    infor2 = Insert(work_infor, 'span', "infor-2");
    $(work_infor).hide();
    //插入显示文章信息的div
    var cur_time = new Date();
    var note_area = document.getElementById("NoteArea");
    var post_num = 0;
    if (note_area == null) return;
    for (var i = 6; i > cur_time.getDay(); i--) {
        Insert(note_area, 'div', "worknote-4");
    }
    for (var i = 0; i < 365; i++) {
        var new_time = new Date();
        new_time.setDate(cur_time.getDate() - i);
        var week_day = new_time.getDay();
        if (i && week_day == 6 && Math.floor((7 - cur_time.getDay() + i) / 7) % 2 == 0) {
            if (Math.floor((7 - cur_time.getDay() + i) / 7) % 16 == 2) {
                var work_note = Insert(note_area, 'span', "weekday");
                work_note.innerHTML = month[new_time.getMonth()];
            }
            Insert(note_area, 'div', "clear");
        }  //处理换行和月份的标注
        var hash = Math.floor(Date.parse(new_time) / (24 * 3600 * 1000)) - 15000;
        if (isNaN(postnote[hash])) Insert(note_area, 'div', "worknote-0");
        else {
            var work_note = Insert(note_area, 'div', "worknote-" + Math.min(3, postnote[hash]));
            var note_url = Insert(work_note, 'a', 'note-url');
            note_url.innerHTML = new_time.getFullYear() + '-' +
                (new_time.getMonth() + 1) + '-' +
                (new_time.getDate().toString().length == 1 ? "0" + new_time.getDate() : new_time.getDate())
                + "  " + postnote[hash];
            if (Math.floor((post_num + 1) / paginate) == 0) note_url.href = "/#date-";
            else note_url.href = "/page/" + Math.floor((post_num + 1) / paginate + 1) + '/#date-';
            note_url.href += note_url.innerHTML.substring(0, note_url.innerHTML.lastIndexOf(' '));
            work_note.onmouseover = function () { ShowInfor(event, this.children[0].innerHTML); };
            work_note.onmouseout = function () { $(work_infor).hide(); };
            post_num += postnote[hash];
        }
    }
    Insert(note_area, 'div', "clear");
})

function SidemenuToggle() {
    side_close *= -1;
    $("#side-menu").animate({ width: "toggle" }, "fast");
}

$(window).scroll(function () {
    var new_pos = document.documentElement.scrollTop;
    var art_inf = document.getElementById("article-infor");
    if (art_inf != null) art_inf.style.marginTop = new_pos + 20 + "px";
    if (side_close > 0 && new_pos - scroll_pos > 30) {
        $("#head-menu").hide("normal");
    }
    if (side_close > 0 && new_pos - scroll_pos < -40) {
        $("#head-menu").show("normal");
    }
    scroll_pos = new_pos;
})
