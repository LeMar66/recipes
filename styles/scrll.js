/**
 * Scrll.js - Beheert interne scroll-acties voor dynamische content.
 * Focus op UI-elementen in plaats van de volledige pagina.
 */

/**
 * Zorgt dat het geopende accordeon-item netjes in beeld komt.
 * Wordt aangeroepen vanuit acc.js nadat content is geladen.
 * @param {HTMLElement} element - De header van het geopende item.
 */
function fscrollToItem(element) {
  if (!element) return;

  // scrollIntoView zorgt dat het element naar de bovenkant van de viewport schuift.
  // 'smooth' zorgt voor de animatie, 'start' lijnt de bovenkant uit.
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/**
 * Update de voortgangsbalk op basis van een specifiek scroll-element (zoals .ui-content).
 * @param {HTMLElement} container - De div die gescrold wordt.
 */
function fupdateInternalScrollProgress(container) {
  const progressBar = document.querySelector(".scrllindbar");
  if (!progressBar || !container) return;

  const winScroll = container.scrollTop;
  const height = container.scrollHeight - container.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

  progressBar.style.width = scrolled + "%";
}

/**
 * Luistert naar scroll-events in de UI-container.
 */
document.querySelector(".ui-content")?.addEventListener("scroll", function () {
  fupdateInternalScrollProgress(this);
});
