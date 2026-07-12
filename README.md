# Azure DevOps Dependent Picklist

A configurable Azure DevOps extension for Azure Boards that filters the allowed values of one work-item field based on the current value of another field.

For example:

- When `Custom.Field1` is `list1`, `Custom.Field2` allows `one`, `two`, or `three`.
- When `Custom.Field1` is `list2`, `Custom.Field2` allows `three`, `four`, `five`, or `six`.

## Architecture

The extension uses a native Azure DevOps target field containing the complete superset of valid values, then renders a custom work-item form control that exposes only the subset permitted by the configured source value.

The MVP contains a React/TypeScript form control, a reusable rule engine, project configuration storage, a work-item form observer, a project settings page, tests, documentation, and VSIX packaging configuration.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
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
        { "sourceValues": ["list1"], "targetValues": ["one", "two", "three"] },
        { "sourceValues": ["list2"], "targetValues": ["three", "four", "five", "six"] }
      ]
    }
  ]
}
```

## Enforcement limitation

The extension can prevent invalid combinations in the Azure DevOps web work-item form. REST clients, imports, integrations, and alternate editors can bypass client-side enforcement. Optional post-save external validation is planned for a later release.

## Status

This repository contains the initial MVP implementation scaffold. The pure rule engine and validation layer are implemented with tests. Azure DevOps organization-specific installation and end-to-end form integration still need validation in a dedicated test organization.

See [ROADMAP.md](ROADMAP.md), [architecture](docs/architecture.md), [configuration](docs/configuration.md), and [installation](docs/installation.md).
