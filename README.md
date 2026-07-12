# Azure DevOps Dependent Picklist

A configurable Azure DevOps extension for Azure Boards that filters the allowed values of one work-item field based on the current value of another field.

For example:

- When `Custom.Field1` is `list1`, `Custom.Field2` allows `one`, `two`, or `three`.
- When `Custom.Field1` is `list2`, `Custom.Field2` allows `three`, `four`, `five`, or `six`.

## Architecture

The extension uses a native Azure DevOps target field containing the complete superset of valid values, then renders a custom work-item form control that exposes only the subset permitted by the configured source value.

The MVP contains:

- A React/TypeScript dependent-picklist form control.
- A reusable, independently tested rule engine.
- Project-scoped configuration models and storage service.
- A work-item form observer for validation.
- A project settings page shell.
- JSON import/export-ready configuration.
- Unit tests for mapping and validation behavior.
- Azure DevOps extension packaging configuration.

## Repository structure

```text
.
├── azure-devops-extension.json
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── ROADMAP.md
├── docs/
│   ├── architecture.md
│   ├── configuration.md
│   └── installation.md
├── src/
│   ├── common/
│   │   ├── models.ts
│   │   ├── mapping-engine.ts
│   │   └── validation.ts
│   ├── control/
│   │   ├── index.html
│   │   ├── index.tsx
│   │   └── DependentPicklist.tsx
│   ├── observer/
│   │   ├── index.html
│   │   └── index.ts
│   ├── settings/
│   │   ├── index.html
│   │   ├── index.tsx
│   │   └── SettingsPage.tsx
│   └── services/
│       ├── configuration-service.ts
│       └── work-item-service.ts
└── test/
    ├── mapping-engine.test.ts
    └── validation.test.ts
```

## Prerequisites

- Node.js 20 or newer.
- npm 10 or newer.
- An Azure DevOps organization for testing.
- An Azure DevOps Marketplace publisher.
- `tfx-cli` for packaging and publishing.

## Development

```bash
npm install
npm run build
npm test
```

To create a VSIX package:

```bash
npm install --global tfx-cli
npm run package
```

Before packaging, replace `your-publisher-id` in `azure-devops-extension.json` with your Marketplace publisher ID.

## Configuration example

```json
{
  "version": 1,
  "rules": [
    {
      "id": "field1-field2",
      "name": "Field 2 by Field 1",
      "enabled": true,
      "workItemTypes": ["Bug", "User Story"],
      "sourceField": "Custom.Field1",
      "targetField": "Custom.Field2",
      "behavior": {
        "whenSourceEmpty": "disable",
        "whenSourceUnknown": "error",
        "invalidTargetValue": "clear",
        "allowEmptyTarget": true,
        "sortValues": false,
        "caseSensitive": false
      },
      "mappings": [
        {
          "sourceValues": ["list1"],
          "targetValues": ["one", "two", "three"]
        },
        {
          "sourceValues": ["list2"],
          "targetValues": ["three", "four", "five", "six"]
        }
      ]
    }
  ]
}
```

## Enforcement limitation

The extension can prevent invalid combinations in the Azure DevOps web work-item form. It cannot provide synchronous server-side enforcement for updates made through REST clients, imports, integrations, or other editors. A later release may add post-save validation through service hooks and an external validator.

## Status

The repository currently contains the initial MVP implementation scaffold. The rule engine and validation layer are functional and tested; Azure DevOps organization-specific installation and end-to-end form integration still need to be validated in a test organization.

See [ROADMAP.md](ROADMAP.md) for the complete MVP scope and planned later versions.
