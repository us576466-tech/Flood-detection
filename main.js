/**
 * AI-Based Detection of Flood-Affected Areas in North-East India Using Satellite Images
 * Environmental Studies (EVS) College Project Website
 * Script: main.js
 * Clean, structured vanilla JavaScript designed for easy understanding by a 1st year B.Tech CSE student.
 */

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initMobileNav();
  initStickyNav();
  initBeforeAfterSlider();
  initNeIndiaMap();
  initPipeline();
  initAiDetectionDemo();
  initDashboardControls();
  initScrollAnimations();
  initStatCounters();
  initBackToTop();
});

/* ==========================================================================
   1. Theme Toggle (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem("evs-flood-theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("evs-flood-theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.getElementById("themeIcon");
  if (!themeIcon) return;
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  themeIcon.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
}

/* ==========================================================================
   2. Sticky Navigation & Mobile Menu
   ========================================================================== */
function initStickyNav() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link highlighting on scroll
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });
}

function initMobileNav() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!hamburgerBtn || !navMenu) return;

  hamburgerBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    hamburgerBtn.textContent = isOpen ? "✕" : "☰";
    hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      hamburgerBtn.textContent = "☰";
      hamburgerBtn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================================
   3. Section 3: Interactive North-East India Map Data & Interaction
   ========================================================================== */
const NE_STATES_DATA = {
  assam: {
    name: "Assam",
    capital: "Dispur",
    risk: "High",
    riskClass: "risk-high",
    rivers: "Brahmaputra, Barak, Subansiri, Kopili",
    terrain: "Extensive alluvial river valley flanked by hills",
    rainfall: "2,000 - 3,500 mm annually",
    description: "Assam experiences recurrent, devastating annual floods as the Brahmaputra carries snowmelt from the Himalayas and heavy monsoon rainfall through a narrow valley, causing massive erosion, submerging river islands like Majuli, and inundating Kaziranga National Park.",
    keyFactors: "Extreme sedimentation, bank erosion, high river discharge, breach of earthen embankments."
  },
  arunachal: {
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    risk: "Moderate (Flash Floods)",
    riskClass: "risk-moderate",
    rivers: "Siang, Subansiri, Kameng, Lohit, Dibang",
    terrain: "Rugged Eastern Himalayas with steep gorges",
    rainfall: "2,500 - 4,500 mm annually",
    description: "Characterized by mountainous terrain, vulnerability mainly stems from intense cloudbursts, severe flash floods, and landslide dam outburst floods (LDOFs) that rush down into Assam's plains.",
    keyFactors: "Steep topography, active seismic zone, cloudbursts, heavy debris flow."
  },
  meghalaya: {
    name: "Meghalaya",
    capital: "Shillong",
    risk: "Moderate (Foothills)",
    riskClass: "risk-moderate",
    rivers: "Simsang, Umngot, Myntdu, Umiam",
    terrain: "Rolling plateau with deep southern gorges",
    rainfall: "Highest in the world (Mawsynram: ~11,800 mm)",
    description: "While high plateaus drain rapidly, the southern and western foothill valleys (West Garo Hills) face severe waterlogging and flash floods overflowing towards Bangladesh and Assam.",
    keyFactors: "World-record monsoon rains, soil erosion on exposed steep slopes, rapid runoff."
  },
  manipur: {
    name: "Manipur",
    capital: "Imphal",
    risk: "Moderate",
    riskClass: "risk-moderate",
    rivers: "Imphal, Iril, Thoubal, Barak",
    terrain: "Central bowl-shaped Imphal valley enclosed by hills",
    rainfall: "1,400 - 1,800 mm annually",
    description: "The central valley forms a natural depression draining into Loktak Lake. When rainfall exceeds lake discharge capacity, urban flooding strikes Imphal and agricultural lowlands.",
    keyFactors: "Bowl topography, siltation of Loktak lake and drainage channels, river choking."
  },
  mizoram: {
    name: "Mizoram",
    capital: "Aizawl",
    risk: "Low-to-Moderate (Valleys)",
    riskClass: "risk-low",
    rivers: "Tlawng, Chhimtuipui (Kaladan), Tuivawl",
    terrain: "North-south parallel ridge terrain and steep valleys",
    rainfall: "2,500 - 3,000 mm annually",
    description: "Mountainous topography prevents widespread standing riverine flooding, but intense monsoon spells trigger dangerous flash floods along narrow river gorges and catastrophic landslides.",
    keyFactors: "Steep hillside slopes, flash floods along river beds, road connectivity washouts."
  },
  nagaland: {
    name: "Nagaland",
    capital: "Kohima",
    risk: "Low-to-Moderate (Foothills)",
    riskClass: "risk-low",
    rivers: "Doyang, Dhansiri, Dikhu, Tizu",
    terrain: "Rugged Naga hills and narrow foothill terraces",
    rainfall: "1,800 - 2,500 mm annually",
    description: "The upland interior faces localized flash floods and mudslides, while the foothill border areas near Dimapur (Dhansiri river) witness flood inundations during peak monsoon.",
    keyFactors: "Narrow valleys, landslide mud flows, foothill silt accumulation."
  },
  tripura: {
    name: "Tripura",
    capital: "Agartala",
    risk: "Moderate to High",
    riskClass: "risk-moderate",
    rivers: "Howrah, Gomati, Manu, Khowai",
    terrain: "Low undulating hills with broad alluvial plains",
    rainfall: "2,200 - 2,600 mm annually",
    description: "Low-lying topography surrounded on three sides by Bangladesh. Flash floods and river bank breaches along Howrah and Gomati rivers regularly inundate urban settlements and paddy lands.",
    keyFactors: "Trans-boundary river drainage, low terrain elevation, urban drainage congestion."
  },
  sikkim: {
    name: "Sikkim",
    capital: "Gangtok",
    risk: "Moderate (GLOF & Flash)",
    riskClass: "risk-moderate",
    rivers: "Teesta, Rangeet",
    terrain: "Glaciated High Himalayas and deep gorges",
    rainfall: "2,700 - 3,200 mm annually",
    description: "Vulnerable to Glacial Lake Outburst Floods (GLOFs) and torrential flash floods along the Teesta river basin, which can wash away bridges, dams, and riverside roads.",
    keyFactors: "High glacial lakes (e.g. South Lhonak), steep hydraulic gradient, cloudbursts."
  }
};

function initNeIndiaMap() {
  const statePaths = document.querySelectorAll(".state-path");
  const stateBtns = document.querySelectorAll(".state-btn");

  function selectState(stateKey) {
    const data = NE_STATES_DATA[stateKey];
    if (!data) return;

    // Update SVG states
    statePaths.forEach((path) => {
      path.classList.toggle("active-state", path.dataset.state === stateKey);
    });

    // Update State Buttons
    stateBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.state === stateKey);
    });

    // Update Info Display Card
    const nameEl = document.getElementById("stateNameDisplay");
    const riskEl = document.getElementById("stateRiskDisplay");
    const capitalEl = document.getElementById("stateCapitalDisplay");
    const riversEl = document.getElementById("stateRiversDisplay");
    const terrainEl = document.getElementById("stateTerrainDisplay");
    const rainfallEl = document.getElementById("stateRainfallDisplay");
    const descEl = document.getElementById("stateDescDisplay");
    const factorsEl = document.getElementById("stateFactorsDisplay");

    if (nameEl) nameEl.textContent = data.name;
    if (riskEl) {
      riskEl.textContent = `${data.risk} Vulnerability`;
      riskEl.className = `risk-pill ${data.riskClass}`;
    }
    if (capitalEl) capitalEl.textContent = data.capital;
    if (riversEl) riversEl.textContent = data.rivers;
    if (terrainEl) terrainEl.textContent = data.terrain;
    if (rainfallEl) rainfallEl.textContent = data.rainfall;
    if (descEl) descEl.textContent = data.description;
    if (factorsEl) factorsEl.textContent = data.keyFactors;
  }

  // Hover & Click listeners on SVG paths
  statePaths.forEach((path) => {
    path.addEventListener("click", () => {
      selectState(path.dataset.state);
    });
    path.addEventListener("mouseenter", () => {
      selectState(path.dataset.state);
    });
  });

  // Click listeners on State Pills
  stateBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      selectState(btn.dataset.state);
    });
  });

  // Default selection
  selectState("assam");
}

/* ==========================================================================
   4. Section 5: Before / After Satellite Comparison Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById("comparisonSlider");
  const afterLayer = document.getElementById("sliderImageAfter");
  const handle = document.getElementById("sliderHandle");

  if (!container || !afterLayer || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let xPos = clientX - rect.left;
    let percent = (xPos / rect.width) * 100;

    // Constrain within 4% and 96%
    if (percent < 4) percent = 4;
    if (percent > 96) percent = 96;

    afterLayer.style.width = `${percent}%`;
    handle.style.left = `${percent}%`;
  }

  // Mouse Events
  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Touch Events for Mobile & Tablet
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });
}

/* ==========================================================================
   5. Section 6: AI Detection Pipeline Data & Interactions
   ========================================================================== */
const PIPELINE_DETAILS = [
  {
    stepNum: "Step 01",
    title: "Satellite Image Acquisition",
    summary: "Satellite imagery is collected for the area of interest.",
    details: "High-resolution satellite sensors (such as ESA Sentinel-1 Synthetic Aperture Radar or Sentinel-2 Multispectral sensors) capture wide-swath views over the target North-East Indian river basin. SAR is particularly useful because microwave radar passes through monsoon cloud cover that blinds regular cameras.",
    vivaTip: "EVS Viva Insight: Optical satellites (like Landsat/Sentinel-2) provide natural color images but cannot see through clouds. Radar satellites (Sentinel-1 SAR) operate day and night and penetrate monsoon cloud cover."
  },
  {
    stepNum: "Step 02",
    title: "Image Preprocessing",
    summary: "The image is prepared and processed so that it can be analyzed.",
    details: "Raw satellite digital numbers are calibrated into backscatter coefficients (sigma-naught). Radiometric calibration, speckle noise reduction filtering (Lee or Refined Frost filters), and terrain orthorectification (using DEM elevation models) are applied to normalize mountainous terrain distortion.",
    vivaTip: "EVS Viva Insight: North-East India is flanked by steep hills. Terrain correction ensures radar shadows from mountains are not falsely mistaken for dark water bodies."
  },
  {
    stepNum: "Step 03",
    title: "AI & Computer Vision Analysis",
    summary: "An AI/computer-vision model examines patterns and features in the image.",
    details: "A deep Convolutional Neural Network (such as a U-Net architecture) or water index thresholding (NDWI / MNDWI) inspects texture, spatial context, and surface reflectance. Smooth calm water reflects radar beams away (specular reflection), showing up as dark regions compared to rough vegetated land.",
    vivaTip: "EVS Viva Insight: Smooth open water reflects radar beams like a mirror away from the satellite, appearing very dark (low backscatter), allowing the AI to distinguish water from rough soil and trees."
  },
  {
    stepNum: "Step 04",
    title: "Flood Segmentation",
    summary: "The model can classify or segment areas that appear to be covered by floodwater.",
    details: "The deep learning model generates a pixel-level binary classification mask dividing the image into 'Permanent Water', 'Inundated / Flooded Land', and 'Non-Water Terrain'. Permanent river courses are subtracted from current high-water extents to isolate new flood inundation.",
    vivaTip: "EVS Viva Insight: A crucial step is subtracting the pre-flood normal river baseline, so we only flag newly submerged agricultural land, village roads, and forests."
  },
  {
    stepNum: "Step 05",
    title: "Flood-Affected Geo-Map",
    summary: "The detected regions can be visualized on a map to understand the possible extent of flooding.",
    details: "The segmented raster mask is vectorised and georeferenced onto GIS map layers. Authorities, disaster managers (like ASDMA), and environmental scientists can overlay flood boundaries onto road networks, agricultural boundaries, and wildlife reserve maps.",
    vivaTip: "EVS Viva Insight: The output helps calculate inundated area in square kilometres (km²), identify marooned villages, and direct emergency evacuation boats and food drops."
  }
];

function initPipeline() {
  const stepNodes = document.querySelectorAll(".pipeline-step-node");
  const progressBar = document.getElementById("connectorProgress");
  const stepNumEl = document.getElementById("pipelineDetailStep");
  const titleEl = document.getElementById("pipelineDetailTitle");
  const bodyEl = document.getElementById("pipelineDetailBody");
  const tipEl = document.getElementById("pipelineDetailTip");

  function selectPipelineStep(index) {
    stepNodes.forEach((node, i) => {
      node.classList.toggle("active", i === index);
    });

    if (progressBar) {
      progressBar.style.width = `${((index + 1) / stepNodes.length) * 100}%`;
    }

    const item = PIPELINE_DETAILS[index];
    if (item) {
      if (stepNumEl) stepNumEl.textContent = item.stepNum;
      if (titleEl) titleEl.textContent = item.title;
      if (bodyEl) bodyEl.innerHTML = `<strong>${item.summary}</strong><br><br>${item.details}`;
      if (tipEl) tipEl.textContent = item.vivaTip;
    }
  }

  stepNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const idx = parseInt(node.dataset.stepIndex, 10);
      selectPipelineStep(idx);
    });
  });

  // Default to step 0
  selectPipelineStep(0);
}

/* ==========================================================================
   6. Section 7: Demonstration AI Flood Detection Simulator
   ========================================================================== */
/* ==========================================================================
   6. Section 7: Advanced Demonstration AI Flood Detection Simulator & Lab
   ========================================================================== */
const DEMO_SECTORS = {
  majuli: {
    name: "Majuli River Island",
    district: "Upper Assam Division",
    baseArea: 24.6,
    conf: 94.2,
    coord: "26.95°N, 94.21°E",
    river: "Brahmaputra Main Stem",
    displaced: "~18,400 residents",
    ecoThreat: "Severe riverbank slicing threatening fragile river island sandbars and monsoon Sali paddy crops.",
    riverPath: "M0,130 C120,110 210,190 310,140 T400,160",
    floodPath: "M110,120 Q190,70 280,135 T370,245 Q210,270 110,225 Z",
    floodSec: "M20,60 Q70,40 100,75 T60,110 Z"
  },
  kaziranga: {
    name: "Kaziranga National Park Corridor",
    district: "Golaghat & Nagaon Districts",
    baseArea: 42.8,
    conf: 96.5,
    coord: "26.58°N, 93.17°E",
    river: "Brahmaputra / Diphlu River",
    displaced: "~8,200 villagers & wildlife emergency",
    ecoThreat: "Extensive grassland inundation forcing endangered One-Horned Rhinos and elephants across NH-715 toward Karbi Anglong highlands.",
    riverPath: "M0,90 C130,120 220,70 340,110 T400,95",
    floodPath: "M60,80 Q160,50 260,100 T380,180 Q250,230 80,190 Z",
    floodSec: "M240,180 Q310,170 360,220 T280,260 Z"
  },
  morigaon: {
    name: "Morigaon Floodplains",
    district: "Central Assam Division",
    baseArea: 19.3,
    conf: 91.8,
    coord: "26.25°N, 92.34°E",
    river: "Brahmaputra / Kopili River",
    displaced: "~34,100 residents",
    ecoThreat: "Heavy sand-casting deposit across monsoon paddy farms, destroying soil fertility for multiple seasons.",
    riverPath: "M0,160 C100,140 200,200 300,150 T400,180",
    floodPath: "M80,130 Q180,90 290,140 T360,230 Q200,260 90,210 Z",
    floodSec: "M20,80 Q80,60 120,95 T70,140 Z"
  },
  silchar: {
    name: "Silchar (Barak River Basin)",
    district: "Cachar District, Southern Assam",
    baseArea: 15.7,
    conf: 92.4,
    coord: "24.83°N, 92.79°E",
    river: "Barak River / Madhura",
    displaced: "~52,000 residents",
    ecoThreat: "Embankment breach causing acute urban waterlogging, sewage mixing, and drinking water source contamination.",
    riverPath: "M0,110 C90,160 210,100 310,170 T400,130",
    floodPath: "M100,100 Q200,80 300,140 T370,220 Q220,250 110,190 Z",
    floodSec: "M30,120 Q80,110 110,150 T50,180 Z"
  }
};

let currentSectorKey = "majuli";
let currentThreshold = 85;

function initAiDetectionDemo() {
  const runBtn = document.getElementById("runDemoBtn");
  const resetBtn = document.getElementById("resetDemoBtn");
  const radarScanLine = document.getElementById("radarScanLine");
  const floodMask = document.getElementById("demoFloodMask");
  const statusIndicator = document.getElementById("demoStatusIndicator");
  const statusText = document.getElementById("demoStatusText");
  const areaValue = document.getElementById("demoAreaValue");
  const confValue = document.getElementById("demoConfValue");
  const timeValue = document.getElementById("demoTimeValue");
  const statusVal = document.getElementById("demoStatusVal");

  // Threshold elements
  const thresholdSlider = document.getElementById("thresholdRange");
  const thresholdValDisplay = document.getElementById("thresholdValDisplay");
  const sensitivityLabel = document.getElementById("sensitivityLabel");

  // Terminal elements
  const terminalLogBody = document.getElementById("terminalLogBody");
  const terminalStatusBadge = document.getElementById("terminalStatusBadge");

  // Sector buttons
  const sectorTabs = document.querySelectorAll(".demo-sector-tab");
  const bandBtns = document.querySelectorAll(".band-btn");

  // SVG elements
  const svgInputRiver = document.getElementById("svgInputRiver");
  const svgInputFlood = document.getElementById("svgInputFlood");
  const svgInputCoord = document.getElementById("svgInputCoord");
  const svgInputInfo = document.getElementById("svgInputInfo");
  const svgOutputRiver = document.getElementById("svgOutputRiver");
  const svgRiverLabel = document.getElementById("svgRiverLabel");
  const svgMaskMain = document.getElementById("svgMaskMain");
  const svgMaskSec = document.getElementById("svgMaskSec");
  const svgBBoxText = document.getElementById("svgBBoxText");
  const svgOutputHud = document.getElementById("svgOutputHud");

  function getScaledArea(base, threshold) {
    // Dynamically scale calculated area based on confidence threshold slider
    const factor = 1 + (85 - threshold) * 0.012;
    return (base * factor).toFixed(1);
  }

  function addTerminalLine(msg, type = "info") {
    if (!terminalLogBody) return;
    const div = document.createElement("div");
    div.className = `terminal-line ${type}`;
    div.textContent = msg;
    terminalLogBody.appendChild(div);
    terminalLogBody.scrollTop = terminalLogBody.scrollHeight;
  }

  function updateSector(sectorKey) {
    currentSectorKey = sectorKey;
    const data = DEMO_SECTORS[sectorKey];
    if (!data) return;

    sectorTabs.forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.sector === sectorKey);
    });

    if (svgInputCoord) svgInputCoord.textContent = `SAR BACKSCATTER (VV/VH) | ${data.name.toUpperCase()}`;
    if (svgInputInfo) svgInputInfo.textContent = `RES: 10m/px | COORD: ${data.coord}`;
    if (svgInputRiver && data.riverPath) svgInputRiver.setAttribute("d", data.riverPath);
    if (svgInputFlood && data.floodPath) svgInputFlood.setAttribute("d", data.floodPath);

    if (svgOutputRiver && data.riverPath) svgOutputRiver.setAttribute("d", data.riverPath);
    if (svgRiverLabel) svgRiverLabel.textContent = data.river;
    if (svgMaskMain && data.floodPath) svgMaskMain.setAttribute("d", data.floodPath);
    if (svgMaskSec && data.floodSec) svgMaskSec.setAttribute("d", data.floodSec);

    const calculatedArea = getScaledArea(data.baseArea, currentThreshold);
    if (svgBBoxText) svgBBoxText.textContent = `INUNDATION ZONE: ${calculatedArea} km²`;
    if (areaValue) areaValue.textContent = `${calculatedArea} km²`;
    if (confValue) confValue.textContent = `${data.conf}%`;
    if (svgOutputHud) svgOutputHud.textContent = `AI CONFIDENCE: ${data.conf}% | FALSE POSITIVES FILTERED`;

    addTerminalLine(`[LOAD] Sector switched to: ${data.name} (${data.district}). Ready.`);
  }

  sectorTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      updateSector(tab.dataset.sector);
    });
  });

  // Spectral View Modes
  bandBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      bandBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const mode = btn.dataset.mode;
      const leftViewer = document.getElementById("demoLeftViewer");
      const badge = document.getElementById("demoLeftPanelBadge");

      if (leftViewer) {
        if (mode === "rgb") {
          leftViewer.style.filter = "hue-rotate(90deg) saturate(1.4)";
          if (badge) badge.textContent = "Optical RGB Multispectral";
        } else if (mode === "ndwi") {
          leftViewer.style.filter = "invert(0.9) hue-rotate(180deg) saturate(2)";
          if (badge) badge.textContent = "NDWI Water Index";
        } else if (mode === "mask") {
          leftViewer.style.filter = "contrast(1.5) brightness(1.2)";
          if (badge) badge.textContent = "Binary Water Segmentation";
        } else {
          leftViewer.style.filter = "none";
          if (badge) badge.textContent = "Sentinel-1 SAR C-Band";
        }
      }
      addTerminalLine(`[DISPLAY] Spectral Band switched to: ${btn.textContent.trim()}`);
    });
  });

  // Dynamic Threshold Slider
  if (thresholdSlider) {
    thresholdSlider.addEventListener("input", (e) => {
      currentThreshold = parseInt(e.target.value, 10);
      if (thresholdValDisplay) thresholdValDisplay.textContent = `${currentThreshold}%`;

      if (sensitivityLabel) {
        if (currentThreshold < 65) {
          sensitivityLabel.textContent = "High Recall (May include wet soil)";
          sensitivityLabel.style.color = "#d97706";
        } else if (currentThreshold > 90) {
          sensitivityLabel.textContent = "High Precision (Deep water only)";
          sensitivityLabel.style.color = "#0284c7";
        } else {
          sensitivityLabel.textContent = "Balanced (Recommended)";
          sensitivityLabel.style.color = "var(--env-green)";
        }
      }

      const data = DEMO_SECTORS[currentSectorKey];
      if (data) {
        const calculatedArea = getScaledArea(data.baseArea, currentThreshold);
        if (areaValue) areaValue.textContent = `${calculatedArea} km²`;
        if (svgBBoxText) svgBBoxText.textContent = `INUNDATION ZONE: ${calculatedArea} km²`;
        if (floodMask) {
          floodMask.style.opacity = (currentThreshold / 100).toString();
        }
      }
    });
  }

  // Run Demo Detection Click
  if (runBtn) {
    runBtn.addEventListener("click", () => {
      runBtn.disabled = true;
      runBtn.textContent = "Analyzing Satellite Tile...";

      if (statusIndicator) statusIndicator.className = "status-indicator processing";
      if (statusText) statusText.textContent = "Scanning tile & running deep learning inference...";
      if (statusVal) statusVal.textContent = "Inference In Progress";
      if (terminalStatusBadge) {
        terminalStatusBadge.textContent = "RUNNING";
        terminalStatusBadge.style.color = "#f59e0b";
      }

      if (radarScanLine) radarScanLine.classList.add("scanning");
      if (floodMask) floodMask.classList.remove("active");

      if (areaValue) areaValue.textContent = "-- km²";
      if (confValue) confValue.textContent = "-- %";
      if (timeValue) timeValue.textContent = "Processing...";

      addTerminalLine(`[0.1s] Ingesting Sentinel-1 GRD SAR tile for ${DEMO_SECTORS[currentSectorKey].name}...`);
      setTimeout(() => addTerminalLine("[0.4s] Radiometric terrain correction & Lee speckle filter applied..."), 350);
      setTimeout(() => addTerminalLine("[0.8s] Normalizing microwave backscatter (threshold: σ₀ < -16.5 dB)..."), 750);
      setTimeout(() => addTerminalLine("[1.2s] U-Net Deep Convolutional Inference executing over 512x512 patches..."), 1150);

      // 1.6s inference completion
      setTimeout(() => {
        if (radarScanLine) radarScanLine.classList.remove("scanning");
        if (floodMask) floodMask.classList.add("active");

        if (statusIndicator) statusIndicator.className = "status-indicator completed";
        if (statusText) statusText.textContent = "Demo Analysis Complete (Segmentation Mask Ready)";
        if (statusVal) statusVal.textContent = "Demo Analysis Complete";
        if (terminalStatusBadge) {
          terminalStatusBadge.textContent = "COMPLETED";
          terminalStatusBadge.style.color = "#34d399";
        }

        const data = DEMO_SECTORS[currentSectorKey];
        const calculatedArea = getScaledArea(data.baseArea, currentThreshold);

        if (areaValue) areaValue.textContent = `${calculatedArea} km²`;
        if (confValue) confValue.textContent = `${data.conf}%`;
        if (timeValue) timeValue.textContent = "1.42 sec";
        if (svgBBoxText) svgBBoxText.textContent = `INUNDATION ZONE: ${calculatedArea} km²`;

        addTerminalLine(`[1.5s] Subtracted dry-season baseline river channel. Inundation mask finalized.`);
        addTerminalLine(`[1.6s] Success: ${calculatedArea} km² segmented with ${data.conf}% confidence.`, "success");

        runBtn.disabled = false;
        runBtn.textContent = "Re-Run Detection";
      }, 1600);
    });
  }

  // Reset Button
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (radarScanLine) radarScanLine.classList.remove("scanning");
      if (floodMask) floodMask.classList.remove("active");
      if (statusIndicator) statusIndicator.className = "status-indicator ready";
      if (statusText) statusText.textContent = "Ready to analyze satellite scene";
      if (statusVal) statusVal.textContent = "Demo Ready";
      if (terminalStatusBadge) {
        terminalStatusBadge.textContent = "IDLE / READY";
        terminalStatusBadge.style.color = "var(--accent-cyan)";
      }
      if (areaValue) areaValue.textContent = "0.0 km²";
      if (confValue) confValue.textContent = "0.0%";
      if (timeValue) timeValue.textContent = "0.0 sec";
      if (runBtn) {
        runBtn.disabled = false;
        runBtn.textContent = "Run Demo Detection";
      }
      addTerminalLine("[RESET] Scanner reset to initial state. Ready.");
    });
  }

  // Assessment Summary Report Modal
  initAssessmentModal();
}

function initAssessmentModal() {
  const modal = document.getElementById("assessmentModal");
  const openBtn = document.getElementById("openReportModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const dismissBtn = document.getElementById("dismissModalBtn");
  const printBtn = document.getElementById("printReportBtn");

  const sectorNameEl = document.getElementById("modalSectorName");
  const areaEl = document.getElementById("modalInundationArea");
  const confEl = document.getElementById("modalConfidence");
  const displacedEl = document.getElementById("modalDisplaced");
  const ecoThreatEl = document.getElementById("modalEcoThreat");

  function openModal() {
    if (!modal) return;
    const data = DEMO_SECTORS[currentSectorKey] || DEMO_SECTORS.majuli;
    const factor = 1 + (85 - currentThreshold) * 0.012;
    const currentArea = (data.baseArea * factor).toFixed(1);

    if (sectorNameEl) sectorNameEl.textContent = `${data.name} (${data.district})`;
    if (areaEl) areaEl.textContent = `${currentArea} km²`;
    if (confEl) confEl.textContent = `${data.conf}%`;
    if (displacedEl) displacedEl.textContent = data.displaced;
    if (ecoThreatEl) ecoThreatEl.textContent = data.ecoThreat;

    modal.classList.add("active");
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("active");
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (dismissBtn) dismissBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* ==========================================================================
   7. Section 8: Flood Mapping Dashboard Interactive Layers
   ========================================================================== */
function initDashboardControls() {
  const toggleWater = document.getElementById("toggleWaterLayer");
  const toggleFlood = document.getElementById("toggleFloodLayer");
  const toggleBuffer = document.getElementById("toggleBufferLayer");

  const waterLayerPath = document.querySelectorAll(".dash-layer-water");
  const floodLayerPath = document.querySelectorAll(".dash-layer-flood");
  const bufferLayerPath = document.querySelectorAll(".dash-layer-buffer");

  if (toggleWater) {
    toggleWater.addEventListener("change", (e) => {
      waterLayerPath.forEach((el) => {
        el.style.opacity = e.target.checked ? "1" : "0.15";
      });
    });
  }

  if (toggleFlood) {
    toggleFlood.addEventListener("change", (e) => {
      floodLayerPath.forEach((el) => {
        el.style.opacity = e.target.checked ? "0.9" : "0";
      });
    });
  }

  if (toggleBuffer) {
    toggleBuffer.addEventListener("change", (e) => {
      bufferLayerPath.forEach((el) => {
        el.style.opacity = e.target.checked ? "0.75" : "0";
      });
    });
  }

  // Dashboard Region Switcher (District preset demo values)
  const regionSelector = document.getElementById("dashboardRegionSelect");
  if (regionSelector) {
    regionSelector.addEventListener("change", (e) => {
      const regionData = {
        majuli: { area: "24.6 km²", conf: "94%", date: "18 Aug 2024", region: "Majuli Island, Assam", risk: "Critical" },
        kaziranga: { area: "42.8 km²", conf: "96%", date: "22 Aug 2024", region: "Kaziranga Park Buffer, Assam", risk: "Severe (Wildlife Alert)" },
        morigaon: { area: "19.3 km²", conf: "91%", date: "15 Aug 2024", region: "Morigaon Floodplains, Assam", risk: "High" },
        cachar: { area: "15.7 km²", conf: "92%", date: "27 Aug 2024", region: "Barak Valley (Silchar), Assam", risk: "High" }
      };

      const selected = regionData[e.target.value] || regionData.majuli;
      const areaEl = document.getElementById("dashCardArea");
      const confEl = document.getElementById("dashCardConfidence");
      const dateEl = document.getElementById("dashCardDate");
      const nameEl = document.getElementById("dashCardRegion");

      if (areaEl) areaEl.textContent = selected.area;
      if (confEl) confEl.textContent = selected.conf;
      if (dateEl) dateEl.textContent = selected.date;
      if (nameEl) nameEl.textContent = selected.region;
    });
  }
}

/* ==========================================================================
   8. Scroll-Triggered Animations
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".fade-in-up");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scrolled-in");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  animatedElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   9. Statistics Counters Animation
   ========================================================================== */
function initStatCounters() {
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target"));
        const suffix = el.getAttribute("data-suffix") || "";
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        let current = 0;
        const duration = 1500;
        const stepTime = 25;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toFixed(decimals) + suffix;
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  statNumbers.forEach((el) => counterObserver.observe(el));
}

/* ==========================================================================
   10. Back-To-Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}
