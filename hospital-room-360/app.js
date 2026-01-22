
(function init() {
  if (typeof window.pannellum === 'undefined') {
    console.warn('Pannellum not found. Place pannellum.js and pannellum.css under /lib/pannellum/.');
    return;
  }
  const useMultiRes = false; // Flip to true if you add tiles under /assets/tiles/room/
  const baseConfig = { autoLoad: true, showZoomCtrl: true, compass: false, keyboardZoom: true, mouseZoom: true, hfov: 100, minHfov: 60, maxHfov: 120, pitch: 0, yaw: 0 };
  const panoConfig = useMultiRes ? { type: 'multires', multiRes: { basePath: 'assets/tiles/room', tileResolution: 512, maxLevel: 5, cubeResolution: 8192 } } : { type: 'equirectangular', panorama: 'assets/room_placeholder_8k.jpg' };
  function openInfoHotspot(){ document.getElementById('infoOverlay').classList.add('open'); }
  function openLocalPDF(){ window.open('assets/policy.pdf', '_blank', 'noopener,noreferrer'); }

  const viewer = pannellum.viewer('panorama', { ...baseConfig, ...panoConfig, hotSpots: [
    { pitch: 4, yaw: 35, type: 'info', text: 'Nurse Call Panel', clickHandlerFunc: openInfoHotspot },
    { pitch: -2, yaw: -110, type: 'info', text: 'Room Safety Policy (PDF)', clickHandlerFunc: openLocalPDF }
  ]});

  const fb = document.getElementById('fallback'); if (fb) fb.remove();
  viewer.on('mousedown', function(ev){ const [pitch, yaw] = viewer.mouseEventToCoords(ev); console.log(`yaw: ${yaw.toFixed(2)}, pitch: ${pitch.toFixed(2)}`); });
})();
