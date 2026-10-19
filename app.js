const CITIES = [
  { name: "København", lat: 55.676, lon: 12.568 },
  { name: "Aarhus", lat: 56.162, lon: 10.204 },
  { name: "Odense", lat: 55.403, lon: 10.402 },
  { name: "Aalborg", lat: 57.048, lon: 9.922 },
  { name: "Esbjerg", lat: 55.476, lon: 8.459 },
  { name: "Randers", lat: 56.461, lon: 10.037 },
  { name: "Kolding", lat: 55.49, lon: 9.472 },
  { name: "Horsens", lat: 55.861, lon: 9.85 },
  { name: "Vejle", lat: 55.709, lon: 9.536 },
  { name: "Roskilde", lat: 55.642, lon: 12.087 },
  { name: "Herning", lat: 56.136, lon: 8.973 },
  { name: "Silkeborg", lat: 56.17, lon: 9.548 },
  { name: "Næstved", lat: 55.23, lon: 11.76 },
  { name: "Farum", lat: 55.812, lon: 12.357 },
  { name: "Køge", lat: 55.458, lon: 12.182 },
  { name: "Holstebro", lat: 56.36, lon: 8.616 },
  { name: "Taastrup", lat: 55.65, lon: 12.3 },
  { name: "Slagelse", lat: 55.401, lon: 11.355 },
  { name: "Hillerød", lat: 55.927, lon: 12.311 },
  { name: "Sønderborg", lat: 54.913, lon: 9.792 },
  { name: "Svendborg", lat: 55.06, lon: 10.608 },
  { name: "Hjørring", lat: 57.464, lon: 9.982 },
  { name: "Helsingør", lat: 56.036, lon: 12.613 },
  { name: "Holbæk", lat: 55.718, lon: 11.71 },
  { name: "Fredericia", lat: 55.566, lon: 9.755 },
  { name: "Nørresundby", lat: 57.058, lon: 9.919 },
  { name: "Årslev", lat: 55.301, lon: 10.456 },
];

const PARAMS = [
  "temperature-2m-10percentile",
  "temperature-2m-50percentile",
  "temperature-2m-90percentile",
  "total-precipitation-1h-50percentile",
  "total-precipitation-1h-90percentile",
  "wind-speed-10m-50percentile",
  "wind-speed-10m-90percentile",
];
const API_URL =
  "https://opendataapi.dmi.dk/v1/forecastedr/collections/harmonie_dini_eps_percentiles/position";

const CONFIG = window.KONFIDENSVEJR_CONFIG || { version: "alfa.3", danadresseApiKey: "" };
const DANADRESSE_URL = "https://api.danadresse.dk/steder/autocomplete";
const DAWA_DEBOUNCE_MS = 300;
const DAWA_KEY_STORAGE = "konfidensvejr.danadressekey";
const CACHE_KEY_PREFIX = "konfidensvejr.cov.";
const CACHE_TTL_MS = 15 * 60 * 1000;

const FAV_KEY = "konfidensvejr.favorites";

const els = {
  search: document.getElementById("city-search"),
  results: document.getElementById("search-results"),
  favBtn: document.getElementById("fav-toggle"),
  geoBtn: document.getElementById("geo-btn"),
  frostWarning: document.getElementById("frost-warning"),
  version: document.getElementById("version"),
  favs: document.getElementById("favorites"),
  status: document.getElementById("status"),
  current: document.getElementById("current"),
  cityName: document.getElementById("city-name"),
  curTemp: document.getElementById("cur-temp"),
  curPrecip: document.getElementById("cur-precip"),
  curWind: document.getElementById("cur-wind"),
};

let selectedCity = null;
let charts = { temp: null, precip: null, wind: null };

function loadFavorites() {
  try {
    const raw = JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
    return Array.isArray(raw) ? raw.filter((c) => c && c.name && isFinite(c.lat) && isFinite(c.lon)) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favs) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(favs));
  } catch {
    showStatus("Kunne ikke gemme favoritter i localStorage.", true);
  }
}

function showStatus(msg, isErr = false) {
  els.status.textContent = msg;
  els.status.classList.toggle("error", isErr);
}

function cityKey(c) {
  return `${c.name}`.toLowerCase();
}

function renderFavorites() {
  els.favs.innerHTML = "";
  const favs = loadFavorites();
  for (const fav of favs) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (selectedCity && cityKey(selectedCity) === cityKey(fav) ? " active" : "");
    chip.innerHTML = `<span>${escapeHtml(fav.name)}</span>`;
    chip.addEventListener("click", () => selectCity(fav));
    const rm = document.createElement("span");
    rm.className = "remove";
    rm.textContent = "✕";
    rm.title = "Fjern favorit";
    rm.addEventListener("click", (e) => {
      e.stopPropagation();
      removeFavorite(fav);
    });
    chip.appendChild(rm);
    els.favs.appendChild(chip);
  }
  const faved = selectedCity && favs.some((f) => cityKey(f) === cityKey(selectedCity));
  els.favBtn.textContent = faved ? "★" : "☆";
  els.favBtn.classList.toggle("faved", !!faved);
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function toggleFavorite() {
  if (!selectedCity) return;
  const favs = loadFavorites();
  const idx = favs.findIndex((f) => cityKey(f) === cityKey(selectedCity));
  if (idx >= 0) favs.splice(idx, 1);
  else favs.unshift({ ...selectedCity });
  saveFavorites(favs);
  renderFavorites();
}

function removeFavorite(city) {
  saveFavorites(loadFavorites().filter((f) => cityKey(f) !== cityKey(city)));
  renderFavorites();
}

function getDanadresseKey() {
  if (CONFIG.danadresseApiKey) return CONFIG.danadresseApiKey;
  try {
    return localStorage.getItem(DAWA_KEY_STORAGE) || "";
  } catch {
    return "";
  }
}

let searchToken = 0;
let debounceTimer = null;

function searchInputHandler(e) {
  if (debounceTimer) clearTimeout(debounceTimer);
  const q = e.target.value.trim();
  if (q.length < 2) {
    renderCityListSuggestions(CITIES.slice(0, 12));
    return;
  }
  debounceTimer = setTimeout(() => runSearch(q), DAWA_DEBOUNCE_MS);
}

async function runSearch(query) {
  const token = ++searchToken;
  const key = getDanadresseKey();
  const fallback = () =>
    CITIES.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 12);
  if (!key) {
    renderCityListSuggestions(fallback());
    return;
  }
  try {
    const url = `${DANADRESSE_URL}?q=${encodeURIComponent(query)}&type=bebyggelse,postnummer&per_side=12`;
    const res = await fetch(url, { headers: { "X-Api-Key": key } });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const results = await res.json();
    if (token !== searchToken) return;
    const places = (Array.isArray(results) ? results : []).map(dawaResultToCity).filter(Boolean);
    renderCityListSuggestions(places.length > 0 ? places : fallback());
  } catch {
    if (token === searchToken) renderCityListSuggestions(fallback());
  }
}

function dawaResultToCity(r) {
  const lat = r?.wgs84koordinat?.lat ?? r?.geometry?.coordinates?.[1] ?? r?.y;
  const lon = r?.wgs84koordinat?.lon ?? r?.geometry?.coordinates?.[0] ?? r?.x;
  if (!isFinite(lat) || !isFinite(lon)) return null;
  return { name: r.tekst || r.navn || "Ukendt sted", lat, lon };
}

function renderCityListSuggestions(cities) {
  els.results.innerHTML = "";
  if (cities.length === 0) {
    els.results.hidden = true;
    return;
  }
  for (const city of cities) {
    const li = document.createElement("li");
    li.role = "option";
    li.innerHTML = `<strong>${escapeHtml(city.name)}</strong><span class="meta">${Number(city.lat).toFixed(3)}°N, ${Number(city.lon).toFixed(3)}°E</span>`;
    li.addEventListener("click", () => {
      els.results.hidden = true;
      els.search.value = city.name;
      selectCity(city);
    });
    els.results.appendChild(li);
  }
  els.results.hidden = false;
}

function useMyLocation() {
  if (!navigator.geolocation) {
    showStatus("Din browser understøtter ikke geolokation.", true);
    return;
  }
  els.geoBtn.disabled = true;
  showStatus("Finder din placering…");
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      els.geoBtn.disabled = false;
      selectCity({ name: "Min placering", lat: pos.coords.latitude, lon: pos.coords.longitude });
    },
    (err) => {
      els.geoBtn.disabled = false;
      const msgs = {
        1: "Adgang til placering blev nægtet. Tjek browserens indstillinger.",
        2: "Din placering kunne ikke findes lige nu.",
        3: "Timeout ved søgning efter din placering.",
      };
      showStatus(msgs[err.code] || "Din placering kunne ikke findes.", true);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 5 * 60 * 1000 }
  );
}

function cacheKey(city) {
  return `${CACHE_KEY_PREFIX}${Number(city.lon).toFixed(4)},${Number(city.lat).toFixed(4)}`;
}

function readCache(city) {
  try {
    const raw = sessionStorage.getItem(cacheKey(city));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || typeof entry.expires !== "number" || Date.now() > entry.expires) {
      sessionStorage.removeItem(cacheKey(city));
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeCache(city, data) {
  try {
    sessionStorage.setItem(cacheKey(city), JSON.stringify({ expires: Date.now() + CACHE_TTL_MS, data }));
  } catch {
  }
}

async function fetchForecast(city) {
  const cached = readCache(city);
  if (cached) return cached;

  const coords = `POINT(${city.lon} ${city.lat})`;
  const url = `${API_URL}?coords=${encodeURIComponent(coords)}&crs=crs84&parameter-name=${PARAMS.join(",")}`;
  const res = await fetchWithRetry(url, 2);
  if (!res.ok) throw new Error(`DMI API svarede ${res.status}`);
  const data = await res.json();
  writeCache(city, data);
  return data;
}

async function fetchWithRetry(url, retries) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, { headers: { Accept: "application/prs.coverage+json" } });
    if (res.status !== 429) return res;
    if (attempt === retries) return res;
    await new Promise((r) => setTimeout(r, 5000 * (attempt + 1)));
  }
}

function parseCoverage(cov) {
  const times = (cov.domain?.axes?.t?.values || []).map((v) => new Date(v));
  const get = (param, pct) => {
    const key = `${param}-${pct}percentile`;
    const series = cov.ranges?.[key]?.values;
    return Array.isArray(series) ? series : null;
  };
  return { times, get };
}

function sanitizeSeries(series, transform, keepGaps = false) {
  if (!Array.isArray(series)) return [];
  return series.map((v) => {
    if (v === null || v === undefined) return keepGaps ? null : 0;
    return transform ? transform(v) : v;
  });
}

async function loadForecast(city) {
  showStatus(`Henter prognose for ${city.name}…`);
  try {
    const cov = await fetchForecast(city);
    const { times, get } = parseCoverage(cov);

    const temp50 = sanitizeSeries(get("temperature-2m", 50), (k) => k - 273.15, true);
    const temp10 = sanitizeSeries(get("temperature-2m", 10), (k) => k - 273.15, true);
    const temp90 = sanitizeSeries(get("temperature-2m", 90), (k) => k - 273.15, true);
    const precip50 = sanitizeSeries(get("total-precipitation-1h", 50));
    const precip90 = sanitizeSeries(get("total-precipitation-1h", 90));
    const wind50 = sanitizeSeries(get("wind-speed-10m", 50));
    const wind90 = sanitizeSeries(get("wind-speed-10m", 90));

    if (times.length === 0 || temp50.length === 0) {
      throw new Error("Ingen prognosedata returneret fra API'et.");
    }

    renderCurrent(city, times, temp50, precip50, wind50, temp10);
    renderCharts(times, { temp10, temp50, temp90 }, { precip50, precip90 }, { wind50, wind90 });
    showStatus(`Prognose opdateret ${new Date().toLocaleTimeString("da-DK")}`);
  } catch (err) {
    console.error(err);
    showStatus(`Fejl: ${err.message}. Tjek din internetforbindelse og prøv igen.`, true);
  }
}

function selectCity(city) {
  selectedCity = city;
  els.search.value = city.name;
  els.results.hidden = true;
  renderFavorites();
  loadForecast(city);
}

function fmt(v, unit) {
  if (v === null || v === undefined) return `– ${unit}`;
  return `${v.toFixed(1)} ${unit}`;
}

function renderCurrent(city, times, temps, precips, winds, temp10) {
  els.current.hidden = false;
  els.cityName.textContent = city.name;
  const frostRisk = Array.isArray(temp10) && temp10.some((v) => v !== null && v !== undefined && v < 0);
  els.frostWarning.hidden = !frostRisk;
  els.curTemp.textContent = fmt(temps[0], "°C");
  els.curPrecip.textContent = fmt(precips[0], "mm/t");
  els.curWind.textContent = fmt(winds[0], "m/s");
}

function nextIndex(times) {
  const now = Date.now();
  for (let i = 0; i < times.length; i++) if (times[i].getTime() >= now) return i;
  return 0;
}

const timeLabels = (times) => times.map((t) => t.toLocaleString("da-DK", { weekday: "short", hour: "2-digit" }));

Chart.defaults.color = "#9fb8cc";
Chart.defaults.font.family = "system-ui, sans-serif";
Chart.defaults.borderColor = "rgba(159,184,204,0.15)";

const ACCENT_RGB = "76, 201, 240";

function gradientFill(context) {
  const { chartArea } = context.chart;
  if (!chartArea) return `rgba(${ACCENT_RGB}, 0.2)`;
  const g = context.chart.ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  g.addColorStop(0, `rgba(${ACCENT_RGB}, 0.35)`);
  g.addColorStop(1, `rgba(${ACCENT_RGB}, 0.08)`);
  return g;
}



const baseScales = (labels) => ({
  x: { ticks: { maxTicksLimit: 6, maxRotation: 0 }, grid: { display: false } },
  y: { beginAtZero: true, grid: { color: "rgba(159,184,204,0.1)" } },
});

function renderCharts(times, temp, precip, wind) {
  const labels = timeLabels(times);
  const common = (yTitle) => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: { legend: { display: false }, tooltip: { mode: "index", intersect: false } },
    scales: {
      ...baseScales(labels),
      y: { beginAtZero: true, title: { display: true, text: yTitle }, grid: { color: "rgba(159,184,204,0.1)" } },
    },
  });

  // Temperature fan chart
  const tempData = {
    labels,
    datasets: [
      {
        label: "10. percentil",
        data: temp.temp10,
        borderColor: "transparent",
        pointRadius: 0,
        borderWidth: 0,
        tension: 0.35,
      },
      {
        label: "90. percentil",
        data: temp.temp90,
        borderColor: `rgba(${ACCENT_RGB}, 0.35)`,
        backgroundColor: gradientFill,
        fill: "-1",
        pointRadius: 0,
        borderWidth: 1,
        tension: 0.35,
      },
      {
        label: "Median",
        data: temp.temp50,
        borderColor: "#4cc9f0",
        backgroundColor: "#4cc9f0",
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.35,
      },
    ],
  };

  // Precipitation bars with 90th percentile line
  const precipData = {
    labels,
    datasets: [
      {
        label: "Median (mm/t)",
        data: precip.precip50,
        backgroundColor: "rgba(76, 201, 240, 0.55)",
        borderColor: "#4cc9f0",
        borderWidth: 1,
        categoryPercentage: 0.9,
        barPercentage: 0.9,
      },
      {
        label: "90. percentil",
        data: precip.precip90,
        type: "line",
        borderColor: "#ffb703",
        backgroundColor: "#ffb703",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      },
    ],
  };

  // Wind chart: median with shaded area up to 90th percentile
  const windData = {
    labels,
    datasets: [
      {
        label: "90. percentil",
        data: wind.wind90,
        borderColor: "rgba(239, 71, 111, 0.5)",
        backgroundColor: "rgba(239, 71, 111, 0.18)",
        fill: "start",
        pointRadius: 0,
        borderWidth: 1.5,
        tension: 0.35,
      },
      {
        label: "Median",
        data: wind.wind50,
        borderColor: "#4cc9f0",
        backgroundColor: "#4cc9f0",
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.35,
      },
    ],
  };

  if (charts.temp) charts.temp.destroy();
  if (charts.precip) charts.precip.destroy();
  if (charts.wind) charts.wind.destroy();

  const tempOpts = common("°C");
  tempOpts.scales.y.beginAtZero = false;

  charts.temp = new Chart(document.getElementById("temp-chart"), {
    type: "line",
    data: tempData,
    options: tempOpts,
  });

  charts.precip = new Chart(document.getElementById("precip-chart"), {
    type: "bar",
    data: precipData,
    options: common("mm/t"),
  });

  charts.wind = new Chart(document.getElementById("wind-chart"), {
    type: "line",
    data: windData,
    options: common("m/s"),
  });
}

function init() {
  els.search.addEventListener("input", searchInputHandler);
  els.search.addEventListener("focus", searchInputHandler);
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) els.results.hidden = true;
  });
  els.favBtn.addEventListener("click", toggleFavorite);
  els.geoBtn.addEventListener("click", useMyLocation);
  els.version.textContent = `Version ${CONFIG.version}`;
  renderFavorites();

  const favs = loadFavorites();
  if (favs.length > 0) {
    selectCity(favs[0]);
  } else {
    selectCity(CITIES[0]);
    showStatus("Tip: Tryk ☆ for at gemme en favoritby.");
  }
}

if ("serviceWorker" in navigator && location.protocol === "https:") {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

init();
