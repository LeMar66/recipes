// !!Items has a Unique ID through all the accordion
let acc;
let acc_menu_tree;

/**
 * Initialiseert de accordeon door klik-events aan de headers te koppelen.
 */
function acc_Init() {
  acc = document.querySelector(".accordion");
  if (!acc) return;

  const acc_items = acc.querySelectorAll(".acc_item");
  acc_items.forEach((acc_item) => {
    // Gebruik firstElementChild om zeker te zijn dat we de header-div pakken
    let acc_item_header = acc_item.firstElementChild;
    if (acc_item_header) {
      acc_item_header.addEventListener("click", function () {
        facc_change_Item(this);
      });
    }
  });
}

/**
 * Regelt het openen/sluiten van items en het inladen van content.
 */
function facc_change_Item(acc_item_header) {
  const acc_item = acc_item_header.parentElement;
  const isAlreadyActive = acc_item_header.classList.contains("active");

  // 1. Eerst alle actieve 'broertjes' sluiten voor een schone UI
  const acc_parent_item = acc_item.parentElement;
  const activeHeaders = acc_parent_item.querySelectorAll(
    ".acc_item_header.active",
  );

  activeHeaders.forEach((header) => {
    if (header !== acc_item_header) {
      header.classList.remove("active");
      if (header.nextElementSibling) {
        header.nextElementSibling.style.maxHeight = 0;
      }
    }
  });

  // 2. Het geklikte item afhandelen
  if (isAlreadyActive) {
    // Als het al open was: sluiten
    acc_item_header.classList.remove("active");
    acc_item_header.nextElementSibling.style.maxHeight = 0;
  } else {
    // Openen
    const acc_item_body = acc_item_header.nextElementSibling;
    const acc_item_body_content = acc_item_body.firstElementChild;

    acc_item_header.classList.add("active");
    acc_menu_tree = fgetMenuTree();

    // Content inladen als de container nog leeg is
    if (acc_item_body_content.childElementCount === 0) {
      if (acc.id === "profile") {
        if (acc_menu_tree[acc_menu_tree.length - 1] === "settings") {
          _renderSettingsTable(acc_item_body_content);
          fcalcBodyContent();
          // Scroll direct naar de settings
          fscrollToItem(acc_item_header);
        } else {
          let url =
            `/devices/html/${acc_menu_tree[acc_menu_tree.length - 1]}.html`.toLowerCase();
          fFetchAndRenderData(acc_item_body_content, url, acc_item_header);
        }
      } else if (acc.id === "devices") {
        let url =
          `/html/${acc_menu_tree[acc_menu_tree.length - 1]}.html`.toLowerCase();
        fFetchAndRenderData(acc_item_body_content, url, acc_item_header);
      } else {
        // Training, Catalog, etc.
        let url =
          `/${acc.id}/${acc_menu_tree.join("/")}/index.html`.toLowerCase();
        let div = document.createElement("div");
        div.className = "content";
        div.setAttribute("translate", "yes");
        acc_item_body_content.appendChild(div);
        fFetchAndRenderData(div, url, acc_item_header);
      }
    } else {
      // Reeds geladen, herberekenen en scrollen
      fcalcBodyContent();
      fscrollToItem(acc_item_header);
    }
  }
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
  let calcHeight = 0;
  let tree = fgetMenuTree().reverse();

  tree.forEach((id) => {
    const element = document.getElementById(id);
    if (element && element.lastElementChild) {
      const body = element.lastElementChild;
      calcHeight += body.scrollHeight;
      body.style.maxHeight = calcHeight + "px";
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
