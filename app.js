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
  { name: "Ikast", lat: 56.139, lon: 9.155 },
  { name: "Middelfart", lat: 55.505, lon: 9.732 },
  { name: "Grenaa", lat: 56.416, lon: 10.879 },
  { name: "Nyborg", lat: 55.312, lon: 10.79 },
  { name: "Faaborg", lat: 55.096, lon: 10.245 },
  { name: "Skive", lat: 56.567, lon: 9.029 },
  { name: "Thisted", lat: 56.955, lon: 8.694 },
  { name: "Brønderslev", lat: 57.258, lon: 9.945 },
  { name: "Frederikshavn", lat: 57.44, lon: 10.536 },
  { name: "Hadsund", lat: 56.715, lon: 10.114 },
  { name: "Rønne", lat: 55.1, lon: 14.7 },
  { name: "Nexø", lat: 55.062, lon: 15.131 },
  { name: "Rudkøbing", lat: 54.869, lon: 10.724 },
  { name: "Maribo", lat: 54.777, lon: 11.503 },
  { name: "Vordingborg", lat: 55.008, lon: 11.91 },
  { name: "Kalundborg", lat: 55.679, lon: 11.09 },
  { name: "Frederikssund", lat: 55.839, lon: 12.068 },
  { name: "Frederiksværk", lat: 55.97, lon: 12.02 },
  { name: "Birkerød", lat: 55.842, lon: 12.432 },
  { name: "Solrød Strand", lat: 55.532, lon: 12.183 },
  { name: "Greve", lat: 55.583, lon: 12.293 },
  { name: "Ishøj", lat: 55.616, lon: 12.352 },
  { name: "Hvidovre", lat: 55.657, lon: 12.472 },
  { name: "Rødovre", lat: 55.681, lon: 12.453 },
  { name: "Glostrup", lat: 55.666, lon: 12.412 },
  { name: "Albertslund", lat: 55.657, lon: 12.353 },
  { name: "Taastrup", lat: 55.65, lon: 12.3 },
  { name: "Ballerup", lat: 55.728, lon: 12.362 },
  { name: "Lyngby", lat: 55.77, lon: 12.503 },
  { name: "Hørsholm", lat: 55.882, lon: 12.499 },
  { name: "Fredensborg", lat: 55.975, lon: 12.402 },
  { name: "Svejbæk", lat: 55.988, lon: 12.533 },
  { name: "Græsted", lat: 55.998, lon: 12.403 },
  { name: "Rønnede", lat: 55.246, lon: 12.466 },
  { name: "Faxe", lat: 55.195, lon: 12.167 },
  { name: "Stege", lat: 54.985, lon: 12.276 },
  { name: "Nakskov", lat: 54.833, lon: 11.136 },
  { name: "Hobro", lat: 56.642, lon: 9.79 },
  { name: "Løgstør", lat: 56.958, lon: 9.336 },
  { name: "Lemvig", lat: 56.551, lon: 8.307 },
  { name: "Struer", lat: 56.492, lon: 8.595 },
  { name: "Ringkøbing", lat: 56.089, lon: 8.271 },
  { name: "Varde", lat: 55.62, lon: 8.482 },
  { name: "Grindsted", lat: 55.756, lon: 8.928 },
  { name: "Vejen", lat: 55.48, lon: 9.137 },
  { name: "Ribe", lat: 55.33, lon: 8.766 },
  { name: "Åbenrå", lat: 55.035, lon: 9.419 },
  { name: "Tønder", lat: 54.934, lon: 8.856 },
  { name: "Padborg", lat: 54.823, lon: 9.36 },
  { name: "Samsø", lat: 55.833, lon: 10.583 },
  { name: "Thyborøn", lat: 56.71, lon: 8.217 },
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

const APP_VERSION = "alfa.6";
const CACHE_KEY_PREFIX = "konfidensvejr.cov.";
const CACHE_TTL_MS = 15 * 60 * 1000; // cache anses for "frisk" i 15 min (så hentes der ikke ved hver indlæsning)
const CACHE_MAX_AGE_MS = 6 * 60 * 60 * 1000; // ældre cache beholdes som fallback ("sidst gode prognose") i op til 6 timer
const FETCH_TIMEOUT_MS = 30 * 1000; // giv op på et API-kald hvis API'et ikke svarer inden for 30 sek

const FAV_KEY = "konfidensvejr.favorites";
const MODEL_KEY = "konfidensvejr.model";

// Tilgængelige prognosekilder. "auto" vælger bedste model for koordinaten.
const OPEN_METEO_ENSEMBLE_URL = "https://ensemble-api.open-meteo.com/v1/ensemble";
const MODELS = [
  { id: "auto", label: "Auto (bedste for stedet)", type: "auto" },
  { id: "dmi", label: "DMI HARMONIE DINI-EPS · 2 km · 60 t", type: "dmi", source: "DMI Open Data · HARMONIE DINI EPS percentiler", url: "https://www.dmi.dk/" },
  { id: "icon_d2_eps", label: "DWD ICON-D2-EPS · 2 km · 48 t", type: "openmeteo", model: "icon_d2_eps", source: "Open-Meteo · DWD ICON-D2-EPS", url: "https://open-meteo.com/" },
  { id: "icon_eu_eps", label: "DWD ICON-EU-EPS · ~6 km · 5 døgn", type: "openmeteo", model: "icon_eu_eps", source: "Open-Meteo · DWD ICON-EU-EPS", url: "https://open-meteo.com/" },
  { id: "ecmwf_ifs025", label: "ECMWF IFS ENS · 25 km · 15 døgn", type: "openmeteo", model: "ecmwf_ifs025", source: "Open-Meteo · ECMWF IFS 0.25° ENS", url: "https://open-meteo.com/" },
  { id: "gfs025", label: "NOAA GFS ENS · 25 km · 10 døgn", type: "openmeteo", model: "gfs025", source: "Open-Meteo · NOAA GFS Ensemble 0.25°", url: "https://open-meteo.com/" },
];

// Omtrentlige dækningsområder til auto-valg
const DINI_BBOX = { lonMin: 7, lonMax: 16, latMin: 53, latMax: 60 }; // DMI HARMONIE DINI
const EUROPE_BBOX = { lonMin: -11, lonMax: 45, latMin: 35, latMax: 71 }; // ICON-EU / Europa

function inBBox(city, b) {
  return city.lon >= b.lonMin && city.lon <= b.lonMax && city.lat >= b.latMin && city.lat <= b.latMax;
}

function resolveModel(city, selectedId) {
  const byId = (id) => MODELS.find((m) => m.id === id);
  if (selectedId && selectedId !== "auto" && byId(selectedId)) return byId(selectedId);
  if (inBBox(city, DINI_BBOX)) return byId("dmi");
  if (inBBox(city, EUROPE_BBOX)) return byId("icon_eu_eps");
  return byId("gfs025");
}

function loadModelPref() {
  try {
    const v = localStorage.getItem(MODEL_KEY);
    return v && MODELS.some((m) => m.id === v) ? v : "auto";
  } catch {
    return "auto";
  }
}

function saveModelPref(id) {
  try {
    localStorage.setItem(MODEL_KEY, id);
  } catch {
  }
}

const perf = {
  t0: 0,
  start() {
    this.t0 = performance.now();
  },
  mark(label) {
    const dt = performance.now() - this.t0;
    console.log(`[perf] ${label}: +${dt.toFixed(0)} ms`);
    return dt;
  },
  total(label = "total") {
    return this.mark(label);
  },
};

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
  modelSelect: document.getElementById("model-select"),
  dataSource: document.getElementById("data-source"),
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

function normalizeText(s) {
  return s
    .toLowerCase()
    .replace(/å/g, "a")
    .replace(/ø/g, "o")
    .replace(/æ/g, "a")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function localSearch(query) {
  const q = normalizeText(query);
  if (!q) return CITIES.slice(0, 12);
  const starts = [];
  const contains = [];
  for (const city of CITIES) {
    const n = normalizeText(city.name);
    if (n.startsWith(q)) starts.push(city);
    else if (n.includes(q)) contains.push(city);
  }
  return starts.concat(contains).slice(0, 12);
}

function searchInputHandler(e) {
  renderCityListSuggestions(localSearch(e.target.value));
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

function cacheKey(city, modelId) {
  return `${CACHE_KEY_PREFIX}${modelId}:${Number(city.lon).toFixed(4)},${Number(city.lat).toFixed(4)}`;
}

function readCache(city, modelId) {
  try {
    const raw = localStorage.getItem(cacheKey(city, modelId));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (!entry || !entry.data || typeof entry.expires !== "number") return null;
    // gamle cache-poster uden savedAt: udled det fra expires
    const savedAt = typeof entry.savedAt === "number" ? entry.savedAt : entry.expires - CACHE_TTL_MS;
    if (Date.now() - savedAt > CACHE_MAX_AGE_MS) {
      localStorage.removeItem(cacheKey(city, modelId));
      return null;
    }
    return { data: entry.data, savedAt, fresh: Date.now() <= entry.expires };
  } catch {
    return null;
  }
}

function writeCache(city, modelId, data) {
  try {
    const now = Date.now();
    localStorage.setItem(cacheKey(city, modelId), JSON.stringify({ expires: now + CACHE_TTL_MS, savedAt: now, data }));
  } catch {
  }
}

async function fetchForecast(city, model) {
  perf.start();
  perf.mark(`cache miss — henter friskt (${model.id})`);

  const data = model.type === "dmi" ? await fetchDMI(city) : await fetchOpenMeteo(city, model);
  writeCache(city, model.id, data);
  return data;
}

async function fetchDMI(city) {
  const coords = `POINT(${city.lon} ${city.lat})`;
  const url = `${API_URL}?coords=${encodeURIComponent(coords)}&crs=crs84&parameter-name=${PARAMS.join(",")}`;
  const res = await fetchWithRetry(url, 2, { Accept: "application/prs.coverage+json" });
  perf.mark("API fetch (headers + download)");
  if (!res.ok) throw new Error(`DMI API svarede ${res.status}`);
  const blob = await res.blob();
  perf.mark(`payload size ${(blob.size / 1024).toFixed(0)} KB`);
  const data = await blob.json();
  perf.mark("JSON parse");
  return data;
}

async function fetchOpenMeteo(city, model) {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    hourly: "temperature_2m,precipitation,wind_speed_10m",
    models: model.model,
    wind_speed_unit: "ms", // så vi får m/s ligesom DMI
    timeformat: "unixtime",
    timezone: "auto",
    forecast_days: "7",
  });
  const url = `${OPEN_METEO_ENSEMBLE_URL}?${params.toString()}`;
  const res = await fetchWithRetry(url, 2, { Accept: "application/json" });
  perf.mark("API fetch (headers + download)");
  if (!res.ok) throw new Error(`Open-Meteo svarede ${res.status}`);
  const blob = await res.blob();
  perf.mark(`payload size ${(blob.size / 1024).toFixed(0)} KB`);
  const data = await blob.json();
  perf.mark("JSON parse");
  return data;
}

async function fetchWithTimeout(url, timeoutMs, headers) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(url, { headers, signal: ctrl.signal });
  } catch (err) {
    if (err && err.name === "AbortError") {
      throw new Error(`API'et svarede ikke inden for ${timeoutMs / 1000} sekunder`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRetry(url, retries, headers = { Accept: "application/json" }) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const t = performance.now();
    const res = await fetchWithTimeout(url, FETCH_TIMEOUT_MS, headers);
    console.log(`[perf] fetch attempt ${attempt + 1}: status ${res.status} in ${(performance.now() - t).toFixed(0)} ms`);
    if (res.status !== 429) return res;
    if (attempt === retries) return res;
    // respekter Retry-After hvis API'et sender den, ellers kort backoff (max 15 s)
    const retryAfterSec = Number(res.headers.get("Retry-After"));
    const wait = Number.isFinite(retryAfterSec) && retryAfterSec > 0 ? Math.min(retryAfterSec * 1000, 15000) : 2000 * (attempt + 1);
    console.log(`[perf] 429 received, waiting ${wait} ms before retry`);
    await new Promise((r) => setTimeout(r, wait));
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

let loadSeq = 0;

// DMI CoverageJSON -> færdige serier (°C, mm/t, m/s) med percentiler fra API'et
function parseDMISeries(cov) {
  const { times, get } = parseCoverage(cov);
  return {
    times,
    temp10: sanitizeSeries(get("temperature-2m", 10), (k) => k - 273.15, true),
    temp50: sanitizeSeries(get("temperature-2m", 50), (k) => k - 273.15, true),
    temp90: sanitizeSeries(get("temperature-2m", 90), (k) => k - 273.15, true),
    precip50: sanitizeSeries(get("total-precipitation-1h", 50)),
    precip90: sanitizeSeries(get("total-precipitation-1h", 90)),
    wind50: sanitizeSeries(get("wind-speed-10m", 50)),
    wind90: sanitizeSeries(get("wind-speed-10m", 90)),
  };
}

function percentile(sortedVals, p) {
  const n = sortedVals.length;
  if (n === 0) return null;
  const idx = (p / 100) * (n - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sortedVals[lo];
  return sortedVals[lo] + (sortedVals[hi] - sortedVals[lo]) * (idx - lo);
}

// Open-Meteo ensemble (ét array pr. medlem: "<var>_member00"...) -> percentiler pr. timestep.
// Værdier er allerede i °C / mm / m/s (wind_speed_unit=ms).
function parseOpenMeteoSeries(json) {
  const hourly = json.hourly || {};
  const times = (hourly.time || []).map((v) => new Date(v * 1000));

  const memberArrays = (base) =>
    Object.keys(hourly)
      .filter((k) => k.startsWith(`${base}_member`))
      .sort()
      .map((k) => hourly[k]);

  const pctSeries = (base, p) => {
    const members = memberArrays(base);
    const out = new Array(times.length).fill(null);
    for (let i = 0; i < times.length; i++) {
      const vals = [];
      for (const arr of members) {
        const v = arr && arr[i];
        if (typeof v === "number" && isFinite(v)) vals.push(v);
      }
      if (vals.length > 0) {
        vals.sort((a, b) => a - b);
        out[i] = percentile(vals, p);
      }
    }
    return out;
  };

  // beskær bort fortidige timer (Open-Meteo starter ved 00:00 i dag)
  const nowIdx = times.findIndex((t) => t.getTime() >= Date.now() - 60 * 60 * 1000);
  const start = nowIdx > 0 ? nowIdx : 0;
  const slice = (arr) => (Array.isArray(arr) ? arr.slice(start) : arr);

  return {
    times: slice(times),
    temp10: slice(pctSeries("temperature_2m", 10)),
    temp50: slice(pctSeries("temperature_2m", 50)),
    temp90: slice(pctSeries("temperature_2m", 90)),
    precip50: slice(pctSeries("precipitation", 50)),
    precip90: slice(pctSeries("precipitation", 90)),
    wind50: slice(pctSeries("wind_speed_10m", 50)),
    wind90: slice(pctSeries("wind_speed_10m", 90)),
  };
}

function parseSeries(model, raw) {
  return model.type === "dmi" ? parseDMISeries(raw) : parseOpenMeteoSeries(raw);
}

function renderForecast(city, model, series) {
  perf.mark(`data parsed (${series.times.length} timesteps, model ${model.id})`);
  if (series.times.length === 0 || series.temp50.length === 0) {
    throw new Error("Ingen prognosedata returneret fra API'et.");
  }
  if (els.dataSource) {
    els.dataSource.textContent = model.source || model.label;
    if (model.url) els.dataSource.href = model.url;
  }
  renderCurrent(city, series.times, series.temp50, series.precip50, series.wind50, series.temp10);
  renderCharts(series.times, { temp10: series.temp10, temp50: series.temp50, temp90: series.temp90 }, { precip50: series.precip50, precip90: series.precip90 }, { wind50: series.wind50, wind90: series.wind90 });
}

async function refreshForecast(city, model, seq, staleSavedAt) {
  try {
    const raw = await fetchForecast(city, model);
    if (seq !== loadSeq) return; // en anden by/model er valgt, mens vi hentede
    renderForecast(city, model, parseSeries(model, raw));
    const dt = perf.total("render done");
    showStatus(`Prognose opdateret ${new Date().toLocaleTimeString("da-DK")} (${(dt / 1000).toFixed(1)} s) · ${model.label}`);
  } catch (err) {
    console.error(err);
    perf.total("failed after");
    if (seq !== loadSeq) return;
    if (staleSavedAt) {
      showStatus(`Kunne ikke hente friske data (${err.message}) — viser cachet prognose fra ${new Date(staleSavedAt).toLocaleTimeString("da-DK")}.`, true);
    } else {
      showStatus(`Fejl: ${err.message}. Tjek din internetforbindelse og prøv igen.`, true);
    }
  }
}

async function loadForecast(city) {
  const seq = ++loadSeq;
  const model = resolveModel(city, loadModelPref());
  const cached = readCache(city, model.id);

  // Frisk cache: vis med det samme, uden netværkskald
  if (cached && cached.fresh) {
    perf.start();
    perf.mark("cache hit (frisk, localStorage)");
    try {
      renderForecast(city, model, parseSeries(model, cached.data));
      perf.total("render done (cache)");
      showStatus(`Prognose fra cache, gemt ${new Date(cached.savedAt).toLocaleTimeString("da-DK")} · ${model.label}`);
      return;
    } catch (err) {
      console.error("Frisk cache kunne ikke vises, henter friskt:", err);
    }
  }

  // Stale-while-revalidate: vis gammel cache med det samme, hent nyt i baggrunden
  if (cached) {
    let shown = false;
    try {
      perf.start();
      renderForecast(city, model, parseSeries(model, cached.data));
      perf.total("render done (stale cache)");
      shown = true;
      showStatus(`Viser cachet prognose fra ${new Date(cached.savedAt).toLocaleTimeString("da-DK")} — henter friske data…`);
    } catch (err) {
      console.error("Stale cache kunne ikke vises:", err);
      showStatus(`Henter prognose for ${city.name}…`);
    }
    refreshForecast(city, model, seq, shown ? cached.savedAt : null);
    return;
  }

  // Ingen cache: blokér på første hentning
  showStatus(`Henter prognose for ${city.name}…`);
  await refreshForecast(city, model, seq, null);
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

function renderCurrent(city, times, temps, precips, winds) {
  els.current.hidden = false;
  els.cityName.textContent = city.name;
  els.curTemp.textContent = fmt(temps[0], "°C");
  els.curPrecip.textContent = fmt(precips[0], "mm/t");
  els.curWind.textContent = fmt(winds[0], "m/s");
}

function nextIndex(times) {
  const now = Date.now();
  for (let i = 0; i < times.length; i++) if (times[i].getTime() >= now) return i;
  return 0;
}

function timeLabels(times) {
  let lastDay = null;
  return times.map((t) => {
    const day = t.getDate();
    const isDayChange = lastDay !== null && day !== lastDay;
    lastDay = day;
    const hour = t.toLocaleTimeString("da-DK", { hour: "2-digit" });
    if (isDayChange) {
      return `${t.toLocaleDateString("da-DK", { weekday: "short" })} ${hour}`;
    }
    return hour;
  });
}

function makeTickSkipper(labels) {
  const n = labels.length;
  const target = Math.max(6, Math.min(14, Math.ceil(n / 5)));
  if (n <= target) return (value, index) => labels[index];
  const step = Math.ceil(n / target);
  const dayChangeIdx = new Set();
  labels.forEach((l, i) => {
    if (l.length > 3) dayChangeIdx.add(i);
  });
  return (value, index) => {
    if (dayChangeIdx.has(index)) return labels[index];
    if (dayChangeIdx.has(index - 1) || dayChangeIdx.has(index - 2)) return null;
    if (index % step === 0) return labels[index];
    return null;
  };
}

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
  x: {
    ticks: { maxRotation: 0, autoSkip: false, callback: makeTickSkipper(labels) },
    grid: { display: true, color: (ctx) => (ctx.tick.label && String(ctx.tick.label).length > 3 ? "rgba(159,184,204,0.25)" : "transparent") },
  },
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

  const tempOpts = common("\u00b0C");
  tempOpts.scales.y.beginAtZero = false;
  const precipOpts = common("mm/t");
  const windOpts = common("m/s");

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

  charts.temp = new Chart(document.getElementById("temp-chart"), {
    type: "line",
    data: tempData,
    options: tempOpts,
  });

  charts.precip = new Chart(document.getElementById("precip-chart"), {
    type: "bar",
    data: precipData,
    options: precipOpts,
  });

  charts.wind = new Chart(document.getElementById("wind-chart"), {
    type: "line",
    data: windData,
    options: windOpts,
  });
}

function initModelSelect() {
  for (const m of MODELS) {
    const opt = document.createElement("option");
    opt.value = m.id;
    opt.textContent = m.label;
    els.modelSelect.appendChild(opt);
  }
  els.modelSelect.value = loadModelPref();
  els.modelSelect.addEventListener("change", () => {
    saveModelPref(els.modelSelect.value);
    if (selectedCity) loadForecast(selectedCity);
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
  els.version.textContent = `Version ${APP_VERSION}`;
  initModelSelect();
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
