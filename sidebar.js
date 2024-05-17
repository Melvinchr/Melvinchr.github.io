sidebar_open = false

function toggle_sidebar() {
    if (sidebar_open) {
        sidebar.style.width = "4em";
        // sidebar_btn.style.transform = "rotate(90deg)";
        sidebar_btn.style.transform = "rotate(0deg)";
        sidebar_sep.classList.toggle("sepparator-active")
        sidebar_open = false;
    }
    else {
        sidebar.style.width = "18em";
        // sidebar_btn.style.transform = "rotate(0deg)";
        sidebar_btn.style.transform = "rotate(90deg)";
        sidebar_sep.classList.toggle("sepparator-active")
        sidebar_open = true;
    }
};

window.onload = function() {
    sidebar = document.getElementById("sidebar")
    sidebar_btn = document.getElementById("sidebar-btn")
    sidebar_sep = document.getElementById("sepparator")
    sidebar_btn.addEventListener("click", toggle_sidebar); 
};
