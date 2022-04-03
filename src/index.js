// @ts-check
import "../assets/style.css";
import { LotoFormComponent } from "./loto-form.component";
import { SummaryComponent } from "./summary.component";

customElements.define("loto-form", LotoFormComponent);
customElements.define("loto-summary", SummaryComponent);

// const { app, selected } = useApp({ defaultValues: [...tirages[0].boules] });

const app = document.querySelector("body");

const form = document.createElement("loto-form");
const summary = document.createElement("loto-summary");

form.addEventListener("change", (event) => {
  console.log("change");
  document.querySelector("loto-summary").setAttribute("boules", event.detail.join(","));
});

app.append(form);
app.append(summary);
