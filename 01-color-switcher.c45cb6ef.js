!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");function o(){n.setAttribute("style","background-color:".concat("#".concat(Math.floor(16777215*Math.random()).toString(16))))}t.disabled=!1,t.addEventListener("click",(function(){t.disabled=!0,e.addEventListener("click",(function(){clearInterval(n),t.disabled=!1})),o();var n=setInterval(o,1e3)}))}();
//# sourceMappingURL=01-color-switcher.c45cb6ef.js.map
