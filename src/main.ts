import { ui } from "./ui";

// localStorage.clear()
ui.load();

window.setTimeout( () => {
  ui.update();
  window.location.reload();
}, 30*60000);
