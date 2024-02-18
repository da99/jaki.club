/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="dom" />

console.log("loaded");
console.log(new Date());

window.addEventListener('load', (__event) => {
  document.body.classList.remove('loading');
});
