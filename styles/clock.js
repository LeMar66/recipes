/**
 * Clock.js - Geoptimaliseerd voor ESP32.
 * Regelt de tijd, datum en de natuurlijke 'val-animatie' van de cijfers.
 */

let hoursContainer, minutesContainer, secondsContainer, tickElements;
let daynameContainer, dayContainer, monthContainer;
let last = new Date(0);

/**
 * Start de klok en koppelt de DOM-elementen.
 */
function clock_Init() {
  hoursContainer = document.querySelector(".hours");
  minutesContainer = document.querySelector(".minutes");
  secondsContainer = document.querySelector(".seconds");
  tickElements = document.querySelectorAll(".tick");

  daynameContainer = document.querySelector(".dayname");
  dayContainer = document.querySelector(".day");
  monthContainer = document.querySelector(".month");

  // Forceer update bij start
  last = new Date(0);
  last.setHours(-1);

  setInterval(updateTime, 1000);
  updateTime();
}

/**
 * Controleert elke seconde of er cijfers moeten verspringen.
 */
function updateTime() {
  const now = new Date();

  // 1. TIJD: Uren, Minuten, Seconden
  const timeParts = [
    {
      container: hoursContainer,
      nowVal: now.getHours(),
      lastVal: last.getHours(),
    },
    {
      container: minutesContainer,
      nowVal: now.getMinutes(),
      lastVal: last.getMinutes(),
    },
    {
      container: secondsContainer,
      nowVal: now.getSeconds(),
      lastVal: last.getSeconds(),
    },
  ];

  timeParts.forEach((part) => {
    if (part.nowVal !== part.lastVal) {
      updateContainer(part.container, part.nowVal.toString().padStart(2, "0"));
      if (part.container === secondsContainer) tick();
    }
  });

  // 2. DATUM: Taal-gevoelige dagnaam (via browser Intl API)
  // Zie [MDN Intl.DateTimeFormat](https://developer.mozilla.org)
  const nowDayname = now
    .toLocaleDateString(undefined, { weekday: "short" })
    .slice(0, 3)
    .toLowerCase();
  if (last.getDay() !== now.getDay()) {
    const first = daynameContainer.firstElementChild;
    if (first && first.lastElementChild.textContent !== nowDayname) {
      updateNumber(first, nowDayname);
    }
  }

  // 3. DATUM: Dag (01-31)
  if (last.getDate() !== now.getDate()) {
    updateContainer(dayContainer, now.getDate().toString().padStart(2, "0"));
  }

  // 4. DATUM: Maand (01-12)
  if (last.getMonth() !== now.getMonth()) {
    updateContainer(
      monthContainer,
      (now.getMonth() + 1).toString().padStart(2, "0"),
    );
  }

  // 5. JAAR: Update footer automatisch
  if (last.getFullYear() !== now.getFullYear()) {
    const footerYear = document.getElementById("footer-year");
    if (footerYear) footerYear.textContent = now.getFullYear();
  }

  last = now;
}

/**
 * Laat de dubbele punt knipperen.
 */
function tick() {
  tickElements.forEach((t) => t.classList.toggle("tick-show"));
}

/**
 * Verdeelt de 2 cijfers over .first en .second divs.
 */
function updateContainer(container, timeStr) {
  const digits = timeStr.split("");
  const firstDigit = container.querySelector(".first");
  const secondDigit = container.querySelector(".second");

  if (firstDigit && firstDigit.lastElementChild.textContent !== digits[0]) {
    updateNumber(firstDigit, digits[0]);
  }
  if (secondDigit && secondDigit.lastElementChild.textContent !== digits[1]) {
    updateNumber(secondDigit, digits[1]);
  }
}

/**
 * Voert de 'val' animatie uit (nieuw cijfer komt van boven).
 */
function updateNumber(element, value) {
  // Bouwt class bijv. "hours-move"
  const parentClass = element.parentElement.classList[0];
  const moveClass = `${parentClass}-move`;

  const nextNumber = element.lastElementChild.cloneNode(true);
  nextNumber.textContent = value;

  // NIEUW CIJFER BOVENAAN VOOR VAL-EFFECT
  element.prepend(nextNumber);
  element.classList.add(moveClass);

  setTimeout(() => {
    element.classList.remove(moveClass);
    // Verwijder het oude cijfer onderaan
    if (element.children.length > 1) {
      element.removeChild(element.lastElementChild);
    }
  }, 500); // Gelijk aan CSS animatie duur
}
