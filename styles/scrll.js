let scrollPercentage = () => {
    console.log("scroll");
    let scrollProgress = document.querySelector(".scrolltotop");
    let progressValue = document.getElementsByClassName("scrolltotop-progress")[0];
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round(pos * 100 / calcHeight);

    scrollProgress.classList.toggle("active", window.scrollY > 100);

    scrollProgress.addEventListener("click", () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(#00ff0d ${scrollValue}%, #504f4f ${scrollValue}%)`;
    //scrollProgress.style.background = `conic-gradient(#008fff ${scrollValue}%, #c0c0ff ${scrollValue}%)`;
    progressValue.textContent = `${scrollValue}%`;
    document.querySelector(".scrllindbar").style.width = scrollValue + "%";
}
function scrll_Init() {
    console.log("scroller:");

}
//window.onscroll = scrollPercentage;
//window.onload = scrollPercentage;