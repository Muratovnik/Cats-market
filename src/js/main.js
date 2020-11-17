// menu toggle
$(function () {
    $(".js-menu-toggle").on("click", function () {
        $(this).toggleClass("is-active");
        $(".main-header__nav").toggleClass("is-open");
        $(".main-header .container").toggleClass("js-bg");
    });
});

// scroll
var windowhight = $(window).height();

$(window).scroll(function () {
    if ($(this).scrollTop() > windowhight - 600) {
        $("#scrolltotop").fadeIn();
    } else {
        $("#scrolltotop").fadeOut();
    }
});

$("#scrolltotop").click(function (event) {
    event.preventDefault();
    $("html").animate({ scrollTop: 0 }, 800);
});

// sort
var btn = document.getElementById("bycost");
var toggle = false;

btn.addEventListener(
    "click",
    function () {
        evt.preventDefault();
        var items = document.querySelectorAll(".catalog__card");
        var parent = document.getElementById("parent");
        var SortElements = new Object();
        items.forEach(function (item, indx) {
            var itemValue = parseInt(
                item
                    .querySelector(".catalog__cost")
                    .textContent.replace("руб", "")
                    .replace(/\s+/g, "")
            );
            SortElements[itemValue] = { element: item, index: indx };
        });
        var keys = Object.keys(SortElements);
        function compareNumeric1(a, b) {
            a = parseInt(a);
            b = parseInt(b);
            if (a < b) return 1;
            if (a > b) return -1;
        }
        function compareNumeric2(a, b) {
            a = parseInt(a);
            b = parseInt(b);
            if (a > b) return 1;
            if (a < b) return -1;
        }
        if (toggle === false) {
            keys.sort(compareNumeric1);
            toggle = !toggle;
        } else {
            keys.sort(compareNumeric2);
            toggle = !toggle;
        }

        keys.map(function (key, indx) {
            parent.insertAdjacentElement(
                "beforeend",
                SortElements[key]["element"]
            );
            SortElements[key]["index"] = indx;
        });
        return toggle;
    },
    toggle
);
