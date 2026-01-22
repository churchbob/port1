
(function () {
  // Ensure Pannellum is available
  if (typeof window.pannellum === "undefined") {
    console.warn("Pannellum not found. Place pannellum.js and pannellum.css under /lib/pannellum/.");
    return;
  }

  // IMPORTANT: Direct file path to your panorama (no blob:)
  // Place room_16k.jpg in /assets and keep this exact path.
  const PANORAMA_PATH = "assets/room_v.jpg";

  // Helper functions for hotspots
  function openInfoHotspot() {
    document.getElementById("infoOverlay").classList.add("open");
  }
  function openLocalPDF() {
    // Opens same-origin PDF; allowed by CSP and Pages
    window.open("assets/policy.pdf", "_blank", "noopener,noreferrer");
  }

  // Initialize the viewer (single equirectangular—NO TILES)
  const viewer = pannellum.viewer("panorama", {
    type: "equirectangular",
    panorama: PANORAMA_PATH,    // <-- direct URL, not a blob or data URL
    autoLoad: true,
    showZoomCtrl: true,
    mouseZoom: true,
    keyboardZoom: true,
    hfov: 100,
    minHfov: 60,
    maxHfov: 120,
    pitch: 0,
    yaw: 0,
    hotSpots: [
      {
        pitch: 4,
        yaw: 35,
        type: "info",
        text: "Nurse Call Panel",
        clickHandlerFunc: openInfoHotspot
      },
      {
        pitch: -2,
        yaw: -110,
        type: "info",
        text: "Room Safety Policy (PDF)",
        clickHandlerFunc: openLocalPDF
      }
    ]
  });

  // Remove fallback once initialized
  const fb = document.getElementById("fallback");
  if (fb) fb.remove();

  // Accessibility & close button
  const closeBtn = document.querySelector(".close-info");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("infoOverlay").classList.remove("open");
    });
  }

  // (Optional) authoring helper: click to log yaw/pitch for hotspot placement
  viewer.on("mousedown", function (ev) {
    const [pitch, yaw] = viewer.mouseEventToCoords(ev);
    console.log(`yaw: ${yaw.toFixed(2)}, pitch: ${pitch.toFixed(2)}`);
  });
})();

