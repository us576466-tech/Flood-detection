# AI-Based Detection of Flood-Affected Areas in North-East India Using Satellite Images
**An Environmental Studies (EVS) College Project Website**  
**Created By:** **Vivaan Saxena**, **Gagan Deep Kaur**, and **Abdul Muhmin**  
*1st Year B.Tech Computer Science & Engineering • Built with HTML5, CSS3, and Modern Vanilla JavaScript*

---

## 📌 Project Overview
This project presents an educational and scientific demonstration of how spaceborne remote sensing satellites and Artificial Intelligence (AI) can assist in detecting, assessing, and mitigating seasonal flood disasters across the eight states of North-East India (**Assam, Arunachal Pradesh, Meghalaya, Manipur, Mizoram, Nagaland, Tripura, and Sikkim**).

### 🎯 Primary Project Focus: Environmental Studies (EVS)
While the website demonstrates computer vision and remote sensing workflows, the **central focus remains ecological and humanitarian conservation**:
- Protecting fragile riverine wetlands (*beels*) and biodiversity corridors (e.g., the One-Horned Rhinoceros migration from Kaziranga National Park to Karbi Anglong highlands).
- Mitigating severe topsoil erosion and agricultural sand-casting on monsoon paddy farmlands.
- Preventing potable water contamination and disease outbreaks in marooned riverine villages (*chars*).

---

## 📂 Project Structure

```
flood-detection-evs-project/
│
├── index.html          # Main semantic HTML5 document containing all 13 project sections
├── css/
│   └── style.css       # Complete modern styling (variables, glassmorphism, responsive grid, animations)
├── js/
│   └── main.js         # Modular Vanilla JavaScript (map interaction, slider, AI demo, layer toggles)
└── README.md           # Documentation, section guide, and viva preparation tips
```

---

## 🚀 How to Run the Website

### Option 1: Direct Browser Launch (Zero Setup Required)
Simply double-click the `index.html` file or drag and drop it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Option 2: Local Web Server (Optional)
If using Python 3:
```powershell
# Open terminal inside the project directory
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

---

## 🧭 Page & Section Outline (13 Comprehensive Sections)

1. **Section 1: Hero / Home**
   - Full-screen aerial & satellite perspective with animated orbital telemetry.
   - Title, subtitle, environmental badge, quick stat counters, and primary action buttons.

2. **Section 2: Understanding the Problem (Introduction)**
   - Plain-language explanation of flood vulnerability in North-East India.
   - 3 Glassmorphism cards: *Natural Factors*, *Environmental Factors*, and *Human Impact*.

3. **Section 3: Why North-East India?**
   - Interactive SVG map covering all 8 North-East Indian states with river Brahmaputra and Barak channels.
   - Dynamic inspection panel showing each state's vulnerability level, capital, major river systems, terrain type, and annual rainfall.

4. **Section 4: Environmental Impact of Floods (Core EVS)**
   - 6 animated cards with detailed ecological context:
     1. 🌱 *Agriculture* (paddy submergence, sand-casting, food security)
     2. 🌳 *Forests* (riparian canopy loss, riverbank slicing)
     3. 🐘 *Wildlife* (Kaziranga wildlife migration corridors across NH-715)
     4. 💧 *Water Quality* (silt plumes, tube-well contamination, waterborne pathogens)
     5. 🏠 *Human Settlements* (char displacements, infrastructure severance)
     6. 🌍 *Ecosystems* (beels replenishment vs destructive silt deposition)

5. **Section 5: Seeing Floods From Space (Satellite Imagery)**
   - Explains optical vs. Synthetic Aperture Radar (SAR) remote sensing.
   - **Interactive Before/After Satellite Slider**: Drag to compare pre-flood river courses with peak flood inundation.

6. **Section 6: How Artificial Intelligence Detects Floods**
   - 5-step animated pipeline:
     `Satellite Ingestion → Image Preprocessing → AI Analysis → Flood Segmentation → Flood Map`
   - Detailed viva explanations for each stage.

7. **Section 7: AI Flood Detection — Demonstration (Demo Only)**
   - Interactive simulation panel with live radar sweep animation.
   - Simulates neural inference to reveal glowing flood segmentation masks.
   - Displays simulated metrics: 24.6 km² estimated flood area, 94% confidence, 1.4s processing time.
   - Clear academic disclaimer: *Demo values are simulated and do not represent live satellite measurements.*

8. **Section 8: Flood Mapping & Disaster Zoning**
   - Interactive geospatial dashboard focused on the Brahmaputra River Basin (Majuli Island).
   - Dynamic layer toggles: Permanent rivers, detected inundation masks, and highland ecological buffers.

9. **Section 9: Why This Approach Matters (Benefits)**
   - 6 core benefits: Faster Assessment, Large-Area Monitoring, Visual Mapping, Environmental Monitoring, Disaster Management, and Data-Based Decisions.

10. **Section 10: Challenges & Limitations**
    - Academic transparency: Cloud cover limitations on optical sensors, SAR mountain shadow distortions, 10m-30m spatial resolution constraints, revisit latency, and the need for ground-truth validation.

11. **Section 11: Future Possibilities (Roadmap)**
    - 4-phase evolution: Prototype → Improved AI → Real-Time Sensor Ingestion → Smart Flood Portal.
    - IoT river gauge and Doppler radar integration highlights.

12. **Section 12: Technology for a Safer Environment (Conclusion & Viva Guide)**
    - Concluding thesis and final takeaway: *“AI + Satellite Imagery + Environmental Awareness”*.
    - **Quick Viva Cheat-Sheet**: 4 prepared high-scoring answers for evaluation interviews.

13. **Section 13: References & Academic Resources**
    - Citations across 5 categories: ISRO Bhuvan, NRSC, MoEFCC, ASDMA, NDMA, and Computer Vision literature.

---

## 🎓 Viva Presentation Tips for First-Year B.Tech CSE Students

When presenting this project to your college EVS professor:

1. **Lead with the Environmental Problem:**
   - Mention that North-East India receives over 2,500 mm of annual rainfall, and the Brahmaputra carries snowmelt plus monsoon discharge through a narrow valley, resulting in repeated annual devastation.
2. **Explain Why Radar (SAR) is Essential:**
   - Optical satellites (like standard cameras) cannot see through monsoon clouds. Synthetic Aperture Radar (SAR) penetrates rain and clouds 24/7.
3. **Clarify How AI Identifies Water:**
   - Smooth water acts like a mirror, bouncing radar energy away from the satellite (specular reflection), showing up dark. AI models segment these low-backscatter clusters and subtract baseline rivers to identify newly flooded land.
4. **Emphasize the Human & Ecological Impact:**
   - Focus on Kaziranga wildlife crossings and rural farm protection.
