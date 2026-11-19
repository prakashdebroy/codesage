(function(){
 var styles=document.createElement("style");
 styles.textContent='.lightbox{position:fixed;inset:0;z-index:200;display:none;align-items:center;justify-content:center;padding:24px;background:#020302ee;backdrop-filter:blur(8px)}.lightbox.open{display:flex}.lightbox-content{display:flex;flex-direction:column;align-items:center;max-width:min(92vw,1100px)}.lightbox-image{max-width:min(92vw,1100px);max-height:78vh;object-fit:contain;border:1px solid #31583a;border-radius:8px;box-shadow:0 24px 70px #000}.lightbox-caption{width:min(92vw,1100px);margin-top:14px;padding:12px 18px;border:1px solid #31583a;border-radius:8px;background:#080b09e8;color:#e8f5e4;text-align:center;font:16px "Space Grotesk","Segoe UI",system-ui,sans-serif;line-height:1.5}.lightbox-caption strong{color:#7CFC5A}.lightbox-close,.lightbox-prev,.lightbox-next{position:absolute;display:grid;place-items:center;border:1px solid #31583a;border-radius:50%;background:#080b09;color:#7CFC5A;cursor:pointer;font-size:20px}.lightbox-close{top:20px;right:20px;width:42px;height:42px}.lightbox-prev,.lightbox-next{top:50%;width:44px;height:44px;transform:translateY(-50%)}.lightbox-prev{left:20px}.lightbox-next{right:20px}@media(max-width:600px){.lightbox-caption{font-size:13px}.lightbox-image{max-height:72vh}}';
 document.head.appendChild(styles);
 var galleryImages=Array.prototype.slice.call(document.querySelectorAll(".gallery img,.poster-card img"));
 if(!galleryImages.length)return;

 var overlay=document.createElement("div");
 overlay.className="lightbox";
 overlay.setAttribute("role","dialog");
 overlay.setAttribute("aria-modal","true");
 overlay.setAttribute("aria-label","Photo viewer");
 overlay.innerHTML='<button class="lightbox-close" type="button" aria-label="Close photo">&times;</button><button class="lightbox-prev" type="button" aria-label="Previous photo">&#8249;</button><div class="lightbox-content"><img class="lightbox-image" alt=""><div class="lightbox-caption"></div></div><button class="lightbox-next" type="button" aria-label="Next photo">&#8250;</button>';
 document.body.appendChild(overlay);

 var image=overlay.querySelector(".lightbox-image");
 var caption=overlay.querySelector(".lightbox-caption");
 var index=0;

 function openPhoto(nextIndex){
  index=(nextIndex+galleryImages.length)%galleryImages.length;
  image.src=galleryImages[index].src;
  image.alt=galleryImages[index].alt;
  var photoCaption=galleryImages[index].dataset.caption;
  if(photoCaption){
   var parts=photoCaption.split("<br>");
   caption.innerHTML="<strong>"+parts[0]+"</strong>"+(parts[1]?"<br>"+parts.slice(1).join("<br>"):"");
   caption.style.display="block";
  }else{
   caption.textContent="";
   caption.style.display="none";
  }
  overlay.classList.add("open");
  document.body.style.overflow="hidden";
  overlay.querySelector(".lightbox-close").focus();
 }

 function closePhoto(){
  overlay.classList.remove("open");
  document.body.style.overflow="";
 }

 galleryImages.forEach(function(photo,nextIndex){
  photo.style.cursor="zoom-in";
  photo.tabIndex=0;
  photo.setAttribute("role","button");
  photo.setAttribute("aria-label","Open photo: "+photo.alt);
  photo.addEventListener("click",function(){openPhoto(nextIndex)});
  photo.addEventListener("keydown",function(event){
   if(event.key==="Enter"||event.key===" "){
    event.preventDefault();
    openPhoto(nextIndex);
   }
  });
 });

 overlay.querySelector(".lightbox-close").addEventListener("click",closePhoto);
 overlay.querySelector(".lightbox-prev").addEventListener("click",function(){openPhoto(index-1)});
 overlay.querySelector(".lightbox-next").addEventListener("click",function(){openPhoto(index+1)});
 overlay.addEventListener("click",function(event){if(event.target===overlay)closePhoto()});
 document.addEventListener("keydown",function(event){
  if(!overlay.classList.contains("open"))return;
  if(event.key==="Escape")closePhoto();
  if(event.key==="ArrowLeft")openPhoto(index-1);
  if(event.key==="ArrowRight")openPhoto(index+1);
 });
})();
