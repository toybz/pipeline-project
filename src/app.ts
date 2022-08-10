import { initApp } from "./users";
const startApp = async () => {
  /**
   * mount app to root element
   */
  initApp(document.querySelector("#app"));
};

document.addEventListener("DOMContentLoaded", startApp);
