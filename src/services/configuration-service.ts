import * as SDK from "azure-devops-extension-sdk";
import type { ExtensionConfiguration } from "../common/models";

const COLLECTION = "dependent-picklist";
const DOCUMENT_ID = "project-configuration";
const EMPTY_CONFIG: ExtensionConfiguration = { version: 1, rules: [] };

export async function loadConfiguration(): Promise<ExtensionConfiguration> {
  await SDK.ready();
  const accessToken = await SDK.getAccessToken();
  const context = SDK.getExtensionContext();
  const host = SDK.getHost();
  const project = SDK.getWebContext().project;
  if (!project) return EMPTY_CONFIG;

  const url = `${host.uri}/${project.name}/_apis/ExtensionManagement/InstalledExtensions/${context.publisherId}/${context.extensionId}/Data/Scopes/Default/Current/Collections/${COLLECTION}/Documents/${DOCUMENT_ID}?api-version=7.1-preview.1`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
  if (response.status === 404) return EMPTY_CONFIG;
  if (!response.ok) throw new Error(`Unable to load configuration (${response.status}).`);
  return await response.json() as ExtensionConfiguration;
}

export async function saveConfiguration(config: ExtensionConfiguration): Promise<void> {
  await SDK.ready();
  const accessToken = await SDK.getAccessToken();
  const context = SDK.getExtensionContext();
  const host = SDK.getHost();
  const project = SDK.getWebContext().project;
  if (!project) throw new Error("A project context is required.");

  const url = `${host.uri}/${project.name}/_apis/ExtensionManagement/InstalledExtensions/${context.publisherId}/${context.extensionId}/Data/Scopes/Default/Current/Collections/${COLLECTION}/Documents?api-version=7.1-preview.1`;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ ...config, id: DOCUMENT_ID })
  });
  if (!response.ok) throw new Error(`Unable to save configuration (${response.status}).`);
}
