
(function(){
  if(!window.pannellum){console.error('pannellum missing'); return;}
  const viewer=pannellum.viewer('panorama',{
    type:'equirectangular',
    panorama:'assets/room.jpg',
    autoLoad:true,
    hotSpots:[
      {pitch:5,yaw:10,type:'info',text:'Nurse Panel',clickHandlerFunc:()=>{
        document.getElementById('overlay').style.display='block';
      }},
      {pitch:-5,yaw:-110,type:'info',text:'Policy',clickHandlerFunc:()=>{
        window.open('assets/policy.pdf','_blank','noopener');
      }}
    ]
  });
  document.getElementById('closeBtn').addEventListener('click',()=>{
    document.getElementById('overlay').style.display='none';
  });
})();
