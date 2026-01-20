/**
 * Main.js - Deel 1: Config & Init
 */
let websock;
let WWWMenu = false;
let settings = {
  admin: false,
  awesome: false,
  fullscreen: false,
  lefthand: false,
  internetaccess: false,
};

let jsonDoc1 = {
  id: "display",
  settings: [
    { admin: true },
    { awesome: false },
    { fullscreen: false },
    { lefthand: false },
    { internetaccess: false },
  ],
  inits: [{ company: "Advanced Grow Xperiences" }, { author: "M.F. Saathof" }],
  items: [
    { item: "bgimage", props: [{ active: true }, { show: false }] },
    { item: "chapter", props: [{ active: true }, { show: true }] },
    { item: "clock", props: [{ active: true }, { show: false }] },
    { item: "footer", props: [{ active: true }, { show: true }] },
    { item: "header", props: [{ active: true }, { show: true }] },
    { item: "loader", props: [{ active: true }, { show: false }] },
    {
      item: "menu",
      props: [{ active: true }, { show: true }],
      items: [
        { id: "Profile", props: [{ show: true }] },
        { id: "Device", props: [{ show: true }] },
        { id: "WWW", props: [{ show: false }] },
        { id: "Training", props: [{ show: false }] },
        { id: "Store", props: [{ show: false }] },
        { id: "Catalog", props: [{ show: false }] },
        { id: "Forum", props: [{ show: false }] },
      ],
    },
    { item: "scrllind", props: [{ active: true }, { show: true }] },
    { item: "snackbar", props: [{ active: true }, { show: false }] },
    { item: "ui", props: [{ active: true }, { show: true }] },
  ],
};

// Luister naar het 'load' event volgens de [MDN Window: load event](https://developer.mozilla.org) regels
window.addEventListener("load", Init);

/**
 * Start de applicatie.
 * @param {Event} event - Het load event van de browser.
 */
function Init(event) {
  console.log("Init gestart door event:", event.type);

  fprocessDisplayJson(jsonDoc1);

  if (typeof clock_Init === "function") {
    clock_Init();
  }

  setInterval(fisBrowserOnline, 3000);
  ws_Init();
}

/**
 * Main.js - Deel 2: Verwerking & Logica
 */
function fprocessSensorJson(jsonDoc) {
  console.log("Sensor Update:", jsonDoc);
  // Logica voor sensoren toevoegen
}
function fprocessDisplayJson(jsonDoc) {
  // 1. Settings Update
  if (jsonDoc.settings) {
    jsonDoc.settings.forEach((item) => {
      const [key, value] = Object.entries(item)[0];
      if (settings.hasOwnProperty(key)) settings[key] = value;
    });
  }

  // 2. Inits (Footer/Logo)
  if (jsonDoc.inits) {
    jsonDoc.inits.forEach((init) => {
      if (init.company) {
        document.getElementById("footer-company").textContent = init.company;
        finitHeader(init.company);
      }
      if (init.author)
        document.getElementById("footer-author-alias").textContent =
          init.author;
    });
  }

  // 3. UI Items Toggling via classList.toggle
  if (jsonDoc.items) {
    jsonDoc.items.forEach((jsonItem) => {
      const element = document.querySelector("." + jsonItem.item);
      if (!element) return;

      if (jsonItem.props) {
        jsonItem.props.forEach((prop) => {
          const [key, value] = Object.entries(prop)[0];
          if (["active", "show", "awesome", "ani"].includes(key))
            element.classList.toggle(key, !!value);
        });
      }

      if (jsonItem.items) {
        jsonItem.items.forEach((subItem) => {
          const subElement = document.getElementById(subItem.id);
          if (subElement && subItem.props) {
            subItem.props.forEach((p) => {
              if (p.hasOwnProperty("show"))
                subElement.classList.toggle("show", !!p.show);
            });
          }
        });
      }
    });
  }
}
/*Header logo*/
/**
 * Bouwt de interactieve logo-lijst op in de header en update de bedrijfsnaam-afkorting in de footer.
 * @param {string} company - De volledige bedrijfsnaam (bijv. "Advanced Grow Xperiences").
 */
function finitHeader(company) {
  const a = document.getElementById("logo-list");
  if (!a) return;

  // Verwijder alle bestaande lijst-items (efficiënter dan een while-loop)
  a.innerHTML = "";

  // De eerste letter van de bedrijfsnaam (krijgt geen speciale class)
  let li = document.createElement("li");
  li.textContent = company[0];
  a.appendChild(li);

  // Start de afkorting met de eerste letter
  let abbrev = company[0];
  let letterClass = "ghost";

  // Loop door de rest van de letters
  for (let i = 1; i < company.length; i++) {
    if (company[i] === " ") {
      letterClass = "spaced";
      // Voeg de letter na de spatie toe aan de afkorting
      if (company[i + 1]) {
        abbrev += company[i + 1];
      }
      // We voegen de spatie toe als een apart li-element (optioneel, afhankelijk van je CSS)
      // Maar volgens jouw logica springen we direct naar de volgende letter:
      i++;
    } else {
      letterClass = "ghost";
    }

    li = document.createElement("li");
    li.textContent = company[i];
    li.className = letterClass;
    a.appendChild(li);
  }

  // Update de footer met de gegenereerde afkorting (bijv. "AGX")
  const footerComp = document.getElementById("footer-company");
  if (footerComp) {
    footerComp.innerText = abbrev;
  }
}
function fexpandLogo() {
  document.getElementById("logo").classList.remove("hidden");
  /*document.getElementById("chaptervalue").innerHTML="BLALBA";*/
}
function fcollapseLogo() {
  document.getElementById("logo").classList.add("hidden");
}
/*Chapter*/
/**
 * Verandert de hoofdstuk-titel met animatie-effecten.
 * @param {string} title - De nieuwe titel voor het hoofdstuk.
 */
function fchangeChapter(title) {
  const chapter = document.querySelector(".chapter");
  if (!chapter) return;

  // Als er al letters in staan, voer de 'uitwaai' animatie uit
  if (chapter.childElementCount > 0) {
    // Start de animatie om de oude tekst te laten verdwijnen
    fAnimateText(chapter, true);

    // Wis de oude elementen en bouw de nieuwe animatie op
    // We gebruiken een kleine vertraging als de animatie tijd nodig heeft
    fereaseAnimation(chapter);
    fcreateAnimation(chapter, title);
  } else {
    // Direct opbouwen als de container nog leeg is
    fcreateAnimation(chapter, title);
  }
}
/**
 * Hulpmiddel om de container snel leeg te maken voor een nieuwe animatie.
 */
function fereaseAnimation(element) {
  // replaceChildren() zonder argumenten is de snelste manier om een element te legen
  // Zie [MDN replaceChildren](https://developer.mozilla.org)
  element.replaceChildren();
  element.classList.remove("show");
}
/**
 * Bouwt de span-elementen op voor de hoofdstuk-animatie.
 * @param {HTMLElement} divElement - De .chapter container.
 * @param {string} title - De tekst die geanimeerd moet worden.
 */
function fcreateAnimation(divElement, title) {
  // Gebruik een loop om elk teken te verwerken
  for (let i = 0; i < title.length; i++) {
    const char = title[i];
    const span = document.createElement("span");

    if (char === " ") {
      // Gebruik een non-breaking space voor spaties tussen woorden
      span.innerHTML = "&nbsp;";
      span.className = "spaced";
    } else {
      // Zet tekst om naar hoofdletters zoals in je origineel
      span.textContent = char.toUpperCase();
    }

    divElement.appendChild(span);
  }
  // Start de animatie na het opbouwen
  fAnimateText(divElement);
}
/**
 * Voert de revolveScale animatie uit op de span-elementen.
 * @param {HTMLElement} Element - De container met spans.
 * @param {boolean} reverse - Of de animatie achteruit moet spelen (bij wissen).
 */
function fAnimateText(Element, reverse = false) {
  const spanElements = Element.querySelectorAll("span");
  let delay = 0;

  spanElements.forEach((span) => {
    if (settings.awesome) {
      delay += 0.05;

      // Voorbereiden van de startpositie voor Awesome mode
      span.style.transform =
        "translate(-150px, -50px) rotate(-180deg) scale(3)";

      // Animatie instellen via de [Web Animations API](https://developer.mozilla.org) principes
      span.style.animation = `revolveScale 0.3s ${reverse ? "reverse" : "forwards"}`;
      span.style.animationDelay = `${delay}s`;
    } else {
      // Simpele fallback voor normale mode
      span.style.opacity = "1";
    }
  });
}

/*Menu*/
/**
 * Beheert de zichtbaarheid van het menu en de individuele knoppen.
 * Gebruikt ftoggleMenuButton om rekening te houden met Awesome mode.
 */
function fshowMenuButton(butt = -1, show = false, showmenu = true) {
  const menu = document.querySelector(".menu");
  const buttons = document.querySelectorAll(".menu .rbut");

  if (!menu) return;

  if (showmenu) {
    // Menu zelf direct tonen
    menu.classList.add("show");
  } else {
    // Verberg alle knoppen via de slimme toggle (houdt rekening met ani/show)
    buttons.forEach((button) => {
      ftoggleMenuButton(button, show);
    });

    // Wacht 2.5s voordat het menu-container zelf verdwijnt
    setTimeout(() => {
      menu.classList.remove("show");
    }, 2500);
  }

  // Specifieke knop-afhandeling op basis van index
  if (butt === -1) {
    // Alle knoppen verwerken
    buttons.forEach((button) => {
      ftoggleMenuButton(button, show);
    });
  } else {
    // Eén specifieke knop op index verwerken (bijv. index 2 voor WWW)
    if (buttons[butt]) {
      ftoggleMenuButton(buttons[butt], show);
    }
  }
}
/**
 * Toggelt de zichtbaarheid van een menu-element.
 * Kiest tussen 'ani' (Awesome mode) of 'show' (normaal).
 * Schakelt de zichtbaarheid van een menu-knop.
 * @param {HTMLElement} button - De .rbut knop.
 */
function ftoggleMenuButton(button, show) {
  if (!button) return;

  if (settings.awesome) {
    // In Awesome mode gebruiken we de 'ani' class voor animaties
    button.classList.toggle("ani", show);
    // Zorg dat de normale 'show' class weg is/blijft in awesome mode
    button.classList.remove("show");
  } else {
    // In normale mode gebruiken we de standaard 'show' class
    button.classList.toggle("show", show);
    // Zorg dat de 'ani' class weg is/blijft in normale mode
    button.classList.remove("ani");
  }
}

/*UI*/
/**
 * Laadt UI-content (HTML of Accordion JSON) en beheert de overgangen.
 */
function faddUIContent(url, chapter, local = true) {
  const ui = document.querySelector(".ui");
  const loader = document.querySelector(".loader");

  if (loader) loader.classList.add("show");

  // Awesome of Normale mode afhandeling
  const activeClass = settings.awesome ? "ani" : "show";

  if (ui.classList.contains(activeClass)) {
    ui.classList.remove(activeClass);
  }

  fremoveUIContent();

  // Indien lokaal en WWWMenu open is, sluit het internetmenu
  if (local && WWWMenu) {
    ftoggleWWWMenu();
  }

  fchangeChapter(chapter);

  // Timing aangepast voor soepele ESP32 transitie
  setTimeout(() => {
    fgetUIData(url);
    ui.classList.add(activeClass);
  }, 200);
}

/**
 * Maakt de UI-container leeg.
 */
function fremoveUIContent() {
  const ui_content = document.querySelector(".ui-content");
  if (ui_content) {
    // replaceChildren is de snelste methode voor ESP32/Browser
    ui_content.replaceChildren();
  }
}
/**
 * Haalt data op van de server en bepaalt of het HTML of JSON (accordeon) is.
 */
async function fgetUIData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) return;

    if (url.includes(".json")) {
      const jsonDoc = await response.json();
      fprocessUIJson(jsonDoc);
    } else if (url.includes(".html")) {
      const htmlstr = await response.text();
      const ui_content = document.querySelector(".ui-content");

      const div = document.createElement("div");
      div.className = "content";
      div.setAttribute("translate", "yes");
      div.innerHTML = htmlstr;
      ui_content.appendChild(div);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    document.querySelector(".loader").classList.remove("show");
  }
}
/**
 * Verwerkt Accordion JSON en bouwt de boomstructuur.
 */
function fprocessUIJson(jsonDoc) {
  const uicontent = document.querySelector(".ui-content");
  if (jsonDoc.type === "accordion") {
    const acc = document.createElement("div");
    acc.className = jsonDoc.type;
    acc.id = jsonDoc.id;

    if (jsonDoc.translate === false) acc.setAttribute("translate", "no");
    uicontent.appendChild(acc);

    // Recursieve functie om diepe nesting aan te kunnen zonder 100 IF-statements
    const buildItems = (parent, items) => {
      items.forEach((jsonItem) => {
        const bodyContent = fcreateACCItem(parent, jsonItem);
        if (jsonItem.items) buildItems(bodyContent, jsonItem.items);
      });
    };

    buildItems(acc, jsonDoc.items);
    if (typeof acc_Init === "function") acc_Init();
  }
}
/**
 * Creëert de individuele DOM-elementen voor een accordeon-item.
 */
function fcreateACCItem(addToBodyContent, json_item) {
  const acc_name = json_item.item;

  // Container
  const acc_item = document.createElement("div");
  acc_item.className = "acc_item";
  acc_item.id = acc_name;
  addToBodyContent.appendChild(acc_item);

  // Header
  const acc_item_header = document.createElement("div");
  acc_item_header.className = "acc_item_header";

  // Vertaling instellen
  if (json_item.hasOwnProperty("translate")) {
    acc_item_header.setAttribute(
      "translate",
      json_item.translate ? "yes" : "no",
    );
  }

  // Naam met hoofdletter (bijv. 'profile' -> 'Profile')
  acc_item_header.innerText =
    acc_name.charAt(0).toUpperCase() + acc_name.slice(1);
  acc_item.appendChild(acc_item_header);

  // Body & Content Wrapper
  const acc_item_body = document.createElement("div");
  acc_item_body.className = "acc_item_body";

  const acc_item_body_content = document.createElement("div");
  acc_item_body_content.className = "acc_item_body_content";

  acc_item_body.appendChild(acc_item_body_content);
  acc_item.appendChild(acc_item_body);

  return acc_item_body_content;
}

/*login */
function fcheckFormInput() {}
function ftoggleShowPsw() {
  var x = document.getElementById("PSWInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

/*WebSocket functions*/
/**
 * WebSocket Routering en Connectiviteitsbeheer.
 * Geoptimaliseerd voor een lichte voetafdruk op de ESP32.
 */
function ws_Init() {
  if (!("WebSocket" in window)) {
    // Vroege uitgang als de browser geen WebSockets ondersteunt
    alert("WebSocket NOT supported by your Browser!");
    return;
  }

  // Verbindt met de ESP32 op poort 81
  websock = new WebSocket("ws://" + window.location.hostname + ":81/ws");

  // Koppel de event handlers
  websock.onopen = ws_Open;
  websock.onclose = ws_Close;
  websock.onmessage = ws_Message;
  websock.onerror = ws_Error;
}

function ws_Open(event) {
  console.log("WebSocket Verbinding geopend.");
  // Hier kun je een status-indicator in de UI bijwerken
}

function ws_Message(event) {
  try {
    const jsonDoc = JSON.parse(event.data);
    const jsonID = jsonDoc["id"];

    // Efficiënte routering op basis van de 'id' property
    if (jsonID === "display") {
      fprocessDisplayJson(jsonDoc);
    } else if (jsonID === "sensor") {
      fprocessSensorJson(jsonDoc);
    }
    // Eventuele 'snack' of andere IDs kunnen hieronder toegevoegd worden
  } catch (error) {
    console.error("Fout bij JSON parsen of verwerken van WS bericht:", error);
  }
}

function ws_Close(event) {
  if (event.wasClean) {
    console.log(`Verbinding netjes gesloten, code=${event.code}`);
  } else {
    // Verbinding verloren (bijv. server herstart)
    console.warn("Verbinding verbroken. Herstart poging over 2 seconden...");
    // Probeer opnieuw te verbinden
    setTimeout(ws_Init, 2000);
  }
  // websock.close() is niet nodig hier, de verbinding is al verbroken
}

function ws_Error(error) {
  console.error(`WebSocket Error: ${error.message}`);
}
/*Elements
/**
 * Ontvangt en toont snackbar-berichten van de ESP32.
 * @param {Object} jsonDoc - De JSON met message, color en timems.
 */
function ws_rx_Snackbar(jsonDoc) {
  const element = document.getElementById("snackbar");
  if (!element) return;

  element.textContent = jsonDoc.message;

  // Kleurenbeheer op basis van type (1: info/UI, 2: error, 3: warning)
  const colors = {
    1: "var(--color-ui-background)", // Gebruik de CSS variabele direct
    2: "rgba(255, 0, 0, 0.67)",
    3: "rgba(251, 255, 0, 0.97)",
  };

  element.style.backgroundColor = colors[jsonDoc.color] || colors[1];
  element.classList.add("show");

  // Verberg de snackbar na de opgegeven tijd (uit de JSON)
  setTimeout(() => {
    element.classList.remove("show");
  }, jsonDoc.timems || 3000);
}
/**
 * Verstuurt tekst naar de ESP32 via de WebSocket.
 */
function ws_tx_Text() {
  const txBar = document.getElementById("txBar");
  if (txBar && websock.readyState === WebSocket.OPEN) {
    websock.send(txBar.value);
    txBar.value = ""; // Veld leegmaken na verzenden
  }
}
/**
 * Verstuurt de helderheidswaarde naar de ESP32.
 */
function ws_tx_Brightness() {
  const brightness = document.getElementById("brightness");
  if (brightness && websock.readyState === WebSocket.OPEN) {
    // Verstuurt met '#' prefix zoals in je originele logica
    websock.send("#" + brightness.value);
  }
}

/*Miscellaneous methods*/
/**
 * Toggelt het WWW-menu en de bijbehorende knoppen (Training, Store, Catalog, Forum).
 */
function ftoggleWWWMenu() {
  // Toggle de boolean state
  WWWMenu = !WWWMenu;

  // De knoppen die bij het WWW-menu horen (index 4 t/m 7)
  const wwwButtons = [4, 5, 6, 7];

  // Update alle knoppen in één keer
  wwwButtons.forEach((index) => {
    fshowMenuButton(index, WWWMenu);
  });

  // Schoon de UI op en reset het hoofdstuk
  fremoveUIContent();
  fchangeChapter("");
}
/*Fullscreen mode*/
/**
 * Checkt of de browser momenteel in Fullscreen modus staat.
 */
function fisFullScreen() {
  return !!document.fullscreenElement;
}
/**
 * Schakelt Fullscreen in of uit op basis van settings.
 */
function fFullScreen() {
  const elem = document.documentElement;
  const clock = document.querySelector(".clock");

  if (settings.fullscreen) {
    // Gebruik de moderne standaard methode van [MDN](https://developer.mozilla.org)
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => console.error(err));
    }
    if (clock) clock.classList.add("show");
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    if (clock) clock.classList.remove("show");
  }
}
function ftoggleFullScreen() {
  settings.fullscreen = !settings.fullscreen;
  fFullScreen();
}
/*AweSome mode*/
/**
 * Schakelt tussen de Awesome visuele stijl en de Normale mode.
 * Gebruikt gerichte selectie voor betere performance op ESP32 clients.
 */
function fAweSomeMode() {
  const body = document.body;
  const bgimage = document.querySelector(".bgimage");
  const buttons = document.querySelectorAll(".rbut");
  // Selecteer alleen directe kinderen van body (behalve het menu)
  const mainElements = document.querySelectorAll("body > div:not(.menu)");

  if (settings.awesome) {
    console.log("Modus: Awesome");
    body.classList.add("awesome");

    mainElements.forEach((el) => {
      const cls = el.classList;

      if (cls.contains("bgimage")) {
        cls.add("awesome", "ani");
        // De timeout zorgt voor de vertraagde start van de animatie
        setTimeout(() => cls.add("ani"), 2000);
      } else if (cls.contains("clock")) {
        el.querySelector(".time")?.classList.add("awesome");
        el.querySelector(".date")?.classList.add("awesome");
      } else {
        // Wissel show voor ani als het item zichtbaar is
        if (cls.contains("show")) cls.replace("show", "ani");
        cls.add("awesome");
      }
    });

    buttons.forEach((btn) => {
      btn.classList.add("awesome");
      if (btn.classList.contains("show")) btn.classList.replace("show", "ani");
    });
  } else {
    console.log("Modus: Normaal");

    mainElements.forEach((el) => {
      const cls = el.classList;

      if (cls.contains("bgimage")) {
        cls.remove("ani");
        setTimeout(() => body.classList.remove("awesome"), 2000);
      } else if (cls.contains("clock")) {
        el.querySelector(".time")?.classList.remove("awesome");
        el.querySelector(".date")?.classList.remove("awesome");
      } else if (cls.contains("loader")) {
        cls.remove("awesome");
      } else {
        // Herstel de normale 'show' status
        if (cls.contains("ani")) {
          cls.add("show");
          cls.remove("awesome", "ani");
        }
      }
    });

    setTimeout(() => bgimage?.classList.remove("awesome"), 2000);

    buttons.forEach((btn) => {
      if (btn.classList.contains("ani")) {
        btn.classList.add("show");
        btn.classList.remove("awesome", "ani");
      }
      btn.classList.remove("awesome");
    });
  }
}
/**
 * Toggle functie voor de Awesome Mode setting.
 */
function ftoggleAweSomeMode() {
  // Bitwise XOR (^) is prima, maar !settings.awesome is leesbaarder
  settings.awesome = !settings.awesome;
  fAweSomeMode();
}

/*Ergonomie*/
/**
 * Schakelt de UI-indeling om voor linkshandig gebruik.
 */
function fLeftHand() {
  const body = document.body;
  const profileBut = document.getElementById("Profile");
  const clock = document.querySelector(".clock");

  // Gebruik toggle met de boolean waarde van de setting
  // Zie [MDN classList.toggle](https://developer.mozilla.org)
  body.classList.toggle("left", settings.lefthand);

  if (profileBut) {
    profileBut.classList.toggle("left", settings.lefthand);
  }

  if (clock) {
    clock.classList.toggle("left", settings.lefthand);
  }

  console.log("Linkshandige modus:", settings.lefthand);
}
/**
 * Toggle functie voor de Left Hand setting.
 */
function ftoggleLeftHand() {
  settings.lefthand = !settings.lefthand;
  fLeftHand();
}

/*Browser*/
function fisBrowserOnline() {
  if (settings.internetaccess && navigator.onLine) {
    fshowMenuButton(2, true);
  } else {
    fshowMenuButton(2, false);
  }
}
function fInternetAccess() {
  if (settings.internetaccess) {
    fshowMenuButton(2, true);
  } else {
    fshowMenuButton(2, false);
    fshowMenuButton(4, false);
    fshowMenuButton(5, false);
    fshowMenuButton(6, false);
    fshowMenuButton(7, false);
  }
}
function ftoggleInternetAccess() {
  console.log("ftoggleInternetAccess");
  settings.internetaccess = settings.internetaccess ^ true;
  fInternetAccess();
}
