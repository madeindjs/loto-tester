// @ts-check
import "../assets/style.css";
import { useApp } from "./build-form";
import { tirages } from "./data/euromilion";

const { app, selected } = useApp({ defaultValues: [...tirages[0].boules] });

document.getElementById("app").append(app);
