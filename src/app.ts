import { initApp } from "./users";
const startApp = async () => {
  initApp(document.querySelector("#app"));
};

document.addEventListener("DOMContentLoaded", startApp);
