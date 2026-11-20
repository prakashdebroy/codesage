(function(){
var cursorSage=document.getElementById("cursor-sage");
if(!cursorSage)return;
var scriptUrl=document.currentScript&&document.currentScript.src;
var assetUrl=scriptUrl?function(name){return new URL(name,scriptUrl).href}:function(name){return name};
var video=document.createElement("video"),source=document.createElement("source"),idle=document.createElement("img");
video.autoplay=true;video.loop=true;video.muted=true;video.playsInline=true;video.preload="auto";
source.src=assetUrl("cat-bg.webm");source.type="video/webm";video.appendChild(source);
idle.src=assetUrl("cat-idle.png");idle.alt="";cursorSage.appendChild(video);cursorSage.appendChild(idle);
var cursorX=-80,cursorY=-80,characterX=cursorX,characterY=cursorY;
function moveCursor(e){cursorX=e.clientX;cursorY=e.clientY;cursorSage.classList.add("visible")}
addEventListener("pointermove",moveCursor,{passive:true});
addEventListener("pointerleave",function(){cursorSage.classList.remove("visible")});
(function followCursor(){
 characterX+=(cursorX-characterX)*.12;characterY+=(cursorY-characterY)*.12;
 cursorSage.classList.toggle("idle",Math.abs(cursorX-characterX)+Math.abs(cursorY-characterY)<=1);
 cursorSage.style.transform="translate3d("+characterX+"px,"+characterY+"px,0) translate3d(-50%,-50%,0)";
 requestAnimationFrame(followCursor);
})();
})();
