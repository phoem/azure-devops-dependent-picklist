# Installation

1. Create or select an Azure DevOps Marketplace publisher.
2. Replace `your-publisher-id` in `azure-devops-extension.json`.
3. Run `npm install`.
4. Run `npm run typecheck`, `npm test`, and `npm run build`.
5. Install `tfx-cli` globally and run `npm run package`.
6. Upload the generated VSIX as a private extension and share it with a test organization.
7. Add the Dependent Picklist control to the relevant inherited-process work-item layouts.
8. Enter the configured `ruleId` in the control input.
9. Configure project rules under Project Settings > Dependent Picklists.

Do not publish publicly until the contribution IDs, storage behavior, permissions, and save-blocking behavior have been verified in a dedicated Azure DevOps test organization.
