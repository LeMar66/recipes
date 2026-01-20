/**
 * Storage.js - Beheert Local- en SessionStorage.
 * Geoptimaliseerd met automatische JSON detectie.
 */

const session = 0;
const local = 1;

/**
 * Slaat een item op. Converteert objecten/arrays automatisch naar JSON-strings.
 */
function saveItem(storage, key, value) {
  // Gebruik JSON.stringify als het een object of array is
  const finalValue = typeof value === "object" ? JSON.stringify(value) : value;
  const target = storage === local ? localStorage : sessionStorage;

  try {
    target.setItem(key, finalValue);
  } catch (e) {
    console.error("Storage full or disabled", e);
  }
}

/**
 * Leest een item uit. Probeert JSON automatisch terug te draaien naar een object.
 */
function readItem(storage, key) {
  const target = storage === local ? localStorage : sessionStorage;
  const value = target.getItem(key);

  if (!value) return null;

  // Probeer te parsen als het eruit ziet als JSON (begint met { of [)
  if (value.startsWith("{") || value.startsWith("[")) {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  return value;
}

/**
 * Haalt de key-naam op basis van index.
 */
function readValueByIndex(storage, index) {
  const target = storage === local ? localStorage : sessionStorage;
  return target.key(index);
}

/**
 * Verwijdert een specifiek item.
 */
function removeItem(storage, key) {
  const target = storage === local ? localStorage : sessionStorage;
  target.removeItem(key);
}

/**
 * Wast de volledige opslag van het gekozen type leeg.
 */
function clearAllItems(storage) {
  const target = storage === local ? localStorage : sessionStorage;
  target.clear();
}

/**
 * Geeft het aantal opgeslagen items terug.
 */
function countItems(storage) {
  const target = storage === local ? localStorage : sessionStorage;
  return target.length;
}
