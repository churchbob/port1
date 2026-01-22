
(function(){
 if(typeof window.pannellum==='undefined'){return;}
 const viewer = pannellum.viewer('panorama',{
   type:'equirectangular',
   panorama:'assets/room_placeholder_8k.jpg',
   autoLoad:true,
   hotSpots:[
     {pitch:4,yaw:35,type:'info',text:'Nurse',clickHandlerFunc:()=>document.getElementById('infoOverlay').classList.add('open')},
     {pitch:-2,yaw:-110,type:'info',text:'Policy',clickHandlerFunc:()=>window.open('assets/policy.pdf','_blank','noopener,noreferrer')}
   ]
 });
 const closeBtn=document.querySelector('.close-info');
 if(closeBtn){closeBtn.addEventListener('click',()=>{
    document.getElementById('infoOverlay').classList.remove('open');
 });}
})();
