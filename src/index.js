// @ts-check
import "../assets/style.css";
import { LotoFormComponent } from "./loto-form.component";
import { LotoSummaryComponent } from "./loto-summary.component";

customElements.define("loto-form", LotoFormComponent);
customElements.define("loto-summary", LotoSummaryComponent);

// const { app, selected } = useApp({ defaultValues: [...tirages[0].boules] });

const app = document.querySelector("body");

const form = document.createElement("loto-form");
const summary = document.createElement("loto-summary");

form.addEventListener("change", (event) => {
  console.log("change", event);
  document.querySelector("loto-summary").setAttribute("boules", Array.from(event.detail.boules.values()));
  document.querySelector("loto-summary").setAttribute("extra", Array.from(event.detail.extra.values()));
});

app.append(form);
app.append(summary);
