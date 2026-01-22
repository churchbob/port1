
(function(){
  if(typeof window.pannellum==='undefined'){console.warn('Pannellum missing');return;}
  const viewer = pannellum.viewer('panorama', {
    autoLoad: true,
    type: 'multires',
    multiRes: {
      basePath: 'assets/tiles/room',
      path: '/%l/%s%y_%x',
      fallbackPath: '',
      extension: 'jpg',
      tileResolution: 512,
      maxLevel: 4,
      cubeResolution: 4096
    },
    hotSpots: [
      { pitch: 4, yaw: 35, type: 'info', text: 'Nurse Call Panel', clickHandlerFunc: () => document.getElementById('infoOverlay').classList.add('open') },
      { pitch: -2, yaw: -110, type: 'info', text: 'Room Safety Policy (PDF)', clickHandlerFunc: () => window.open('assets/policy.pdf','_blank','noopener,noreferrer') }
    ]
  });
  const closeBtn = document.querySelector('.close-info');
  if(closeBtn){ closeBtn.addEventListener('click', () => document.getElementById('infoOverlay').classList.remove('open')); }
})();
