import React from "react";
import { createRoot } from "react-dom/client";
import * as SDK from "azure-devops-extension-sdk";
import { DependentPicklist } from "./DependentPicklist";

SDK.init({ loaded: false, applyTheme: true });
const root = createRoot(document.getElementById("root")!);
root.render(<DependentPicklist />);
SDK.notifyLoadSucceeded();
