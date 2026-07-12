import React, { useEffect, useState } from "react";
import { Button } from "azure-devops-ui/Button";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import type { ExtensionConfiguration } from "../common/models";
import { validateConfiguration } from "../common/validation";
import { loadConfiguration, saveConfiguration } from "../services/configuration-service";

export function SettingsPage(): React.ReactElement {
  const [config, setConfig] = useState<ExtensionConfiguration>({ version: 1, rules: [] });
  const [text, setText] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { void loadConfiguration().then(value => { setConfig(value); setText(JSON.stringify(value, null, 2)); }); }, []);

  async function save(): Promise<void> {
    try {
      const parsed = JSON.parse(text) as ExtensionConfiguration;
      const issues = validateConfiguration(parsed);
      if (issues.length) throw new Error(issues.map(issue => `${issue.path}: ${issue.message}`).join("\n"));
      await saveConfiguration(parsed);
      setConfig(parsed);
      setMessage("Configuration saved.");
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : String(cause));
    }
  }

  return <Page className="flex-grow">
    <Header title="Dependent Picklists" titleSize={TitleSize.Large} />
    <div style={{ padding: 24 }}>
      <p>Edit the versioned project configuration as JSON. A visual rule editor is the next MVP milestone.</p>
      <textarea aria-label="Configuration JSON" value={text} onChange={event => setText(event.target.value)} style={{ width: "100%", minHeight: 480, fontFamily: "monospace" }} />
      <div style={{ marginTop: 12 }}><Button primary text="Validate and save" onClick={() => void save()} /></div>
      {message && <pre role="status">{message}</pre>}
      <small>{config.rules.length} configured rule(s)</small>
    </div>
  </Page>;
}
