let hoursContainer;
let minutesContainer;
let secondsContainer;
let tickElements;
let daynameContainer;
let dayContainer;
let monthContainer;
let yearContainer;
let last = new Date(0);
let tickState = true;

function clock_Init() {
    hoursContainer = document.querySelector(".hours");
    minutesContainer = document.querySelector(".minutes");
    secondsContainer = document.querySelector(".seconds");
    tickElements = Array.from(document.querySelectorAll(".tick"));

    daynameContainer = document.querySelector(".dayname");
    dayContainer = document.querySelector(".day");
    monthContainer = document.querySelector(".month");

    last = new Date(0);
    last.setUTCHours(-25);
    tickState = true;
    setInterval(updateTime, 1000);

}
function updateTime() {
    var now = new Date;

    var lastHours = last.getHours().toString();
    var nowHours = now.getHours().toString();
    if (lastHours !== nowHours) {
        updateContainer(hoursContainer, nowHours);
    }
    var lastMinutes = last.getMinutes().toString();
    var nowMinutes = now.getMinutes().toString();
    if (lastMinutes !== nowMinutes) {
        updateContainer(minutesContainer, nowMinutes);
    }
    var lastSeconds = last.getSeconds().toString();
    var nowSeconds = now.getSeconds().toString();
    if (lastSeconds !== nowSeconds) {
        tick();
        updateContainer(secondsContainer, nowSeconds);
    }

    /*Date*/
    var lastdayname = last.toDateString(navigator.language).slice(0, 2);
    var nowDayname = now.toDateString(navigator.language).slice(0, 2);
    if (lastdayname !== nowDayname) {
        var first = daynameContainer.firstElementChild;
        /*updateNumber(first, nowDayname);*/
        if (first.lastElementChild.textContent !== nowDayname) {
            updateNumber(first, nowDayname);
        }
    }

    var lastday = last.getDate().toString();
    var nowDay = now.getDate().toString();
    if (lastday !== nowDay) {
        updateContainer(dayContainer, nowDay);
    }

    var lastMonth = last.getMonth();
    var nowMonth = now.getMonth();
    if (lastMonth !== nowMonth) {
        nowMonth = nowMonth + 1;
        updateContainer(monthContainer, nowMonth.toString());
    }

    var lastyear = last.getFullYear();
    var nowYear = now.getFullYear();
    if (lastyear !== nowYear) {
        document.getElementById("footer-year").innerHTML = nowYear;
    }

    last = now;
}

function tick() {
    tickElements.forEach(t => t.classList.toggle('tick-show'));
}

function updateContainer(container, newTime) {
    var time = newTime.split('');
    if (time.length === 1) {
        time.unshift('0');
    }
    var first = container.firstElementChild;
    if (first.lastElementChild.textContent !== time[0]) {
        updateNumber(first, time[0]);
    }
    var last = container.lastElementChild;
    if (last.lastElementChild.textContent !== time[1]) {
        updateNumber(last, time[1]);
    }
}

function updateNumber(element, number) {
    //element.lastElementChild.textContent = number
    let classname = element.parentElement.parentElement.classList[0] + "-move";
    let second = element.lastElementChild.cloneNode(true);
    second.textContent = number;
    /*console.log("CLassname:", classname);*/
    /*  if (InAwesome) {
          console.log("CLassname:", classname);
          classname = classname + "-awesome";
      }*/
    element.appendChild(second);
    element.classList.add(classname);
    setTimeout(function () {
        element.classList.remove(classname);
        element.removeChild(element.firstElementChild);
    }, 500)
}