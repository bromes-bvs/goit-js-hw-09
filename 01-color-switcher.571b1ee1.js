const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r;t.addEventListener("click",(function(d){d.preventDefault(),r=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),t.setAttribute("disabled",!0),e.removeAttribute("disabled")})),e.addEventListener("click",(function(){r&&(clearInterval(r),t.removeAttribute("disabled"),e.setAttribute("disabled",!0),r=0)})),e.setAttribute("disabled",!0);
//# sourceMappingURL=01-color-switcher.571b1ee1.js.map