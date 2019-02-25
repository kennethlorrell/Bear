window.addEventListener("load", function() {
    var toggle = document.getElementsByClassName("main-nav__toggle")[0];
    var mainnav = document.getElementsByClassName("main-nav")[0];

    toggle.addEventListener("click", function() {
        if (mainnav.classList.contains("removed")) {
            mainnav.classList.remove("removed");
        }
        else {
            mainnav.classList.add("removed");
        }

    })
});