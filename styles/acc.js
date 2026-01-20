// !!Items has a Unique ID through all the accordion
let acc;
let acc_menu_tree;
let acc_data = null;

/**
 * Initialiseert de accordeon door klik-events aan de headers te koppelen.
 */
function acc_Init() {
  console.log("acc_Init gestart...");
  acc = document.querySelector(".accordion");
  if (!acc) {
    console.error("DEBUG: .accordion niet gevonden!");
    return;
  }

  const headers = acc.querySelectorAll(".acc_item_header");
  console.log("DEBUG: Aantal headers gevonden:", headers.length);

  headers.forEach((header, index) => {
    // Verwijder oude listeners om dubbele clicks te voorkomen
    header.onclick = null;
    // Forceer cursor en pointer-events
    header.style.cursor = "pointer";
    header.style.pointerEvents = "auto";

    header.onclick = function (e) {
      console.log("✅ Klik op item:", index, this.innerText);
      facc_change_Item(this);
    };
  });
}

/**
 * Regelt het openen/sluiten van items en het inladen van content.
 */
function facc_change_Item(acc_item_header) {
  const acc_item = acc_item_header.parentElement;
  const isAlreadyActive = acc_item_header.classList.contains("active");
  const acc_item_body = acc_item_header.nextElementSibling;
  const acc_item_body_content = acc_item_body.firstElementChild;

  if (isAlreadyActive) {
    acc_item_header.classList.remove("active");
    acc_item_body.style.maxHeight = 0;
    // Sluit ook diepere lagen
    acc_item_body
      .querySelectorAll(".active")
      .forEach((el) => el.classList.remove("active"));
  } else {
    // 1. Broertjes sluiten
    acc_item.parentElement
      .querySelectorAll(":scope > .acc_item > .acc_item_header.active")
      .forEach((h) => {
        h.classList.remove("active");
        h.nextElementSibling.style.maxHeight = 0;
      });

    acc_item_header.classList.add("active");
    const acc_menu_tree = fgetMenuTree();
    const lastItem = acc_menu_tree[acc_menu_tree.length - 1];
    console.log("📂 Boom-structuur:", acc_menu_tree);

    // 2. Alleen actie ondernemen als de container leeg is
    if (acc_item_body_content.innerHTML.trim() === "") {
      console.log("🔍 Zoeken in JSON naar sub-items...");
      const currentData = ffindDataInTree(acc_menu_tree);

      if (currentData && currentData.items) {
        console.log("📦 Sub-items gevonden, renderen van laag...");
        currentData.items.forEach((jsonSubItem) => {
          fcreateACCItem(acc_item_body_content, jsonSubItem);
        });
      } else {
        // GEEN sub-items? Check of het een speciaal profiel-item is of een recept
        if (acc.id === "profile" && lastItem === "settings") {
          console.log("⚙️ Settings tabel laden...");
          _renderSettingsTable(acc_item_body_content);
        } else {
          // Dit is een eindpunt (het recept of device HTML)
          const safePath = acc_menu_tree
            .map((step) => encodeURIComponent(step.toLowerCase().trim()))
            .join("/");

          // Bepaal de URL (gebruik /html/ voor devices, anders het safePath)
          let url =
            acc.id === "devices"
              ? `/html/${lastItem.toLowerCase()}.html`
              : `/${safePath}/index.html`;

          console.log("🚀 Laden HTML-content:", url);

          let div = document.createElement("div");
          div.className = "content";
          div.setAttribute("translate", "yes");
          acc_item_body_content.appendChild(div);
          fFetchAndRenderData(div, url, acc_item_header);
        }
      }
    }

    // Directe hoogte update voor de animatie
    acc_item_body.style.maxHeight = acc_item_body.scrollHeight + 10 + "px";

    setTimeout(() => {
      fcalcBodyContent();
      fscrollToItem(acc_item_header);
    }, 150);
  }
}

// HULPFUNCTIE: Navigeer door de JSON-boom op basis van de actieve headers
function ffindDataInTree(tree) {
  if (!acc_data) {
    console.error("❌ Fout: acc_data is nog niet gevuld!");
    return null;
  }

  let current = acc_data;
  for (let step of tree) {
    if (current && current.items) {
      // Zoek het item, negeer hoofdletters/kleine letters
      let found = current.items.find(
        (i) => i.item.toLowerCase() === step.toLowerCase(),
      );
      if (found) {
        current = found;
      } else {
        return null;
      }
    }
  }
  return current;
}

/**
 * Genereert de instellingen-tabel met een overzichtelijke Template Literal.
 */
function _renderSettingsTable(container) {
  let tableHTML = `<table>`;

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    tableHTML += `
      <tr>
        <td class="duo control" translate="no">Awesome</td>
        <td class="duo control">
          <input type="checkbox" class="toggle" onclick="ftoggleAweSomeMode()" ${settings.awesome ? "checked" : ""}>
        </td>
      </tr>`;
  }

  tableHTML += `
    <tr>
      <td>FullScreen</td>
      <td><input type="checkbox" class="toggle" onclick="ftoggleFullScreen()" ${settings.fullscreen ? "checked" : ""}></td>
    </tr>
    <tr>
      <td>Left handed</td>
      <td><input type="checkbox" class="toggle" onclick="ftoggleLeftHand()" ${settings.lefthand ? "checked" : ""}></td>
    </tr>`;

  if (settings.admin) {
    tableHTML += `
      <tr>
        <td>Internet access</td>
        <td><input type="checkbox" class="toggle" onclick="ftoggleInternetAccess()" ${settings.internetaccess ? "checked" : ""}></td>
      </tr>`;
  }

  tableHTML += `</table>`;
  container.innerHTML = tableHTML;
}

/**
 * Haalt HTML op en plaatst deze in de accordeon.
 * @param {HTMLElement} container - De doelcontainer
 * @param {string} url - De bron
 * @param {HTMLElement} header - De header om naar te scrollen na laden
 */
async function fFetchAndRenderData(container, url, header) {
  const loader = document.querySelector(".loader");
  if (loader) loader.classList.add("show");

  let data = await fgetBodyContent(url);
  container.innerHTML = data;

  // Wacht op DOM rendering voor hoogtemeting en scrollen
  setTimeout(() => {
    fcalcBodyContent();
    if (header) fscrollToItem(header);
    if (loader) loader.classList.remove("show");
  }, 150);
}

/**
 * Fetch helper met foutafhandeling.
 */
async function fgetBodyContent(url) {
  try {
    let response = await fetch(url);
    return response.ok
      ? await response.text()
      : "<p>👉 Page is coming <b>SOON</b> 👈</p>";
  } catch (error) {
    console.error("Fetch error:", error);
    return "<p>Error loading content.</p>";
  }
}

/**
 * Zorgt dat het geopende element netjes in het zicht schuift.
 */
function fscrollToItem(element) {
  if (!element) return;
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/**
 * Berekent de maxHeight voor alle geopende niveaus in de boom.
 */
function fcalcBodyContent() {
  // Zoek alle actieve headers, van diep naar ondiep
  const activeHeaders = Array.from(
    document.querySelectorAll(".acc_item_header.active"),
  ).reverse();

  activeHeaders.forEach((header) => {
    const body = header.nextElementSibling;
    if (body) {
      // De hoogte is de som van de inhoud
      body.style.maxHeight = body.firstElementChild.scrollHeight + 20 + "px";
    }
  });
}

/**
 * Bouwt een array van ID's van de actieve menu-paden.
 */
function fgetMenuTree() {
  const tree = [];
  const actives = acc.querySelectorAll(".acc_item_header.active");
  actives.forEach((header) => {
    if (header.parentElement.id) {
      tree.push(header.parentElement.id);
    }
  });
  return tree;
}
