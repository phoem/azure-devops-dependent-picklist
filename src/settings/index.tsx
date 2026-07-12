import React from "react";
import { createRoot } from "react-dom/client";
import * as SDK from "azure-devops-extension-sdk";
import { SettingsPage } from "./SettingsPage";

SDK.init({ loaded: false, applyTheme: true });
createRoot(document.getElementById("root")!).render(<SettingsPage />);
SDK.notifyLoadSucceeded();
