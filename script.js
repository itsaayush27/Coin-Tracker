
function parseNumberFromText(text) {
  // Extract number from "Mkt Cap: 1325196501435"
  const cleaned = (text || "").replace(/[^\d.-]/g, "");
  return parseFloat(cleaned || "0");
}

function applyColors() {
  document.querySelectorAll(".Percentage_change").forEach(cell => {
    const value = parseFloat((cell.textContent || "0").replace("%", ""));
    if (value > 0) {
      cell.style.color = "#16c784"; // green
    } else if (value < 0) {
      cell.style.color = "#ea3943"; // red
    } else {
      cell.style.color = "#999"; // gray for 0
    }
  });
}

// -------- Live Search --------
function filterCoins() {
  const query = document.getElementById("search_bar").value.toLowerCase();
  const rows = document.querySelectorAll(".table_body tr");

  rows.forEach(row => {
    const name = row.querySelector(".coin-name")?.textContent.toLowerCase() || "";
    const symbol = row.querySelectorAll("td")[1]?.textContent.toLowerCase() || "";
    const match = name.includes(query) || symbol.includes(query);
    row.style.display = match ? "" : "none";
  });
}

// -------- Sorting --------
let marketCapAsc = false;
let percentageAsc = false;

function MarketCap() {
  const tbody = document.querySelector(".table_body");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aCap = parseNumberFromText(a.querySelector("td:last-child")?.textContent);
    const bCap = parseNumberFromText(b.querySelector("td:last-child")?.textContent);
    return marketCapAsc ? aCap - bCap : bCap - aCap;
  });

  marketCapAsc = !marketCapAsc;
  rows.forEach(r => tbody.appendChild(r));
}

function Percentage() {
  const tbody = document.querySelector(".table_body");
  const rows = Array.from(tbody.querySelectorAll("tr"));

  rows.sort((a, b) => {
    const aPer = parseFloat((a.querySelector(".Percentage_change")?.textContent || "0").replace("%", ""));
    const bPer = parseFloat((b.querySelector(".Percentage_change")?.textContent || "0").replace("%", ""));
    return percentageAsc ? aPer - bPer : bPer - aPer;
  });

  percentageAsc = !percentageAsc;
  rows.forEach(r => tbody.appendChild(r));
}


document.addEventListener("DOMContentLoaded", () => {
  applyColors();

  const search = document.getElementById("search_bar");
  if (search) {
    search.addEventListener("input", filterCoins); // live search
  }
});
