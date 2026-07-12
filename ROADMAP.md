# Roadmap

## Project vision

Provide configurable dependent picklists for Azure Boards while preserving native field storage, querying, reporting, and API compatibility.

## Version 0.1 — MVP

### Scope

- React/TypeScript work-item form control.
- One source and one target field per rule.
- Multiple rules per project.
- Multiple source values and target values per mapping.
- Per-work-item-type applicability.
- Empty, unknown, and invalid-value behaviors.
- Project-level configuration storage.
- Work-item form observer.
- JSON import/export-ready schema.
- Configuration validation.
- Native superset picklist support.
- Unit-tested mapping and validation engine.
- Private VSIX packaging and installation documentation.

### Invalid target behaviors

- `clear`
- `preserve-and-error`
- `preserve-with-warning`

### Acceptance criteria

- Administrators can create rules without changing extension source.
- Source changes immediately refresh target choices.
- Only mapped values are displayed.
- Valid existing values are retained.
- Invalid values follow the configured policy.
- Invalid web-form saves can be blocked.
- Rules can be limited to work-item types.
- Configuration can be exported and restored.
- Invalid configuration returns actionable errors.
- No external backend is required.
- Core rule behavior is covered by automated tests.
- A VSIX can be privately installed in a test organization.

### Explicitly out of scope

- Server-side pre-save enforcement.
- External webhook or Azure Function validation.
- Multiple source fields and AND/OR groups.
- Three-level cascades.
- Remote REST value sources.
- Organization-wide shared rules.
- Group-specific values.
- Audit history, telemetry, bulk repair, and localization.

## Version 0.2 — Chained dependencies

- Three-level and deeper cascades.
- Dependency graph and deterministic evaluation order.
- Circular-dependency detection.
- Rule search, tags, cloning, previews, and configuration diffs.
- Better diagnostics and accessibility.

## Version 0.3 — Multi-field conditions

- Multiple source fields.
- AND/OR and nested condition groups.
- String, identity, Boolean, numeric, and date operators.
- Rule priority, stop-processing, union, intersection, and replacement policies.
- Visual condition builder.

## Version 0.4 — Shared configuration

- Organization-level templates and shared value sets.
- Project overrides and configuration inheritance.
- Cross-project import/export.
- Development, test, and production promotion.
- Approval workflows and role-based administration.

## Version 0.5 — Dynamic value providers

- Azure DevOps queries, teams, identities, Area Paths, and Iteration Paths.
- External REST and static JSON providers.
- Caching, retry, pagination, searchable dropdowns, and secure authentication.

## Version 0.6 — External validation

- Work Item Created/Updated service hooks.
- Optional Azure Function validator.
- Comments, tags, notifications, remediation, and compliance reporting.
- Clear documentation that validation occurs after save.

## Version 0.7 — Audit and diagnostics

- Configuration history.
- Rule usage and invalid-combination counts.
- Unmapped source reports.
- Privacy-conscious optional telemetry.
- Diagnostic bundles and health page.

## Version 0.8 — Bulk analysis and repair

- Scan existing work items.
- Dry-run violation reports.
- CSV/JSON export.
- Bulk clear, replace, tag, comment, and resumable repair jobs.

## Version 1.0 — Marketplace release

- Stable schema and migrations.
- Accessibility, security, compatibility, and performance reviews.
- Upgrade testing.
- Marketplace assets, privacy policy, support process, examples, changelog, and signed production package.

## Additional ideas

- User/group-aware values.
- Time-aware and sprint-aware rules.
- Option descriptions, groups, search, recommendations, and explanations.
- Rule simulation and evaluation traces.
- Public rule-engine package, JSON Schema, CLI validator, configuration-as-code, and CI validation.
- Open-source core with optional enterprise administration or hosted validation.

## Initial milestones

1. Foundation and extension packaging.
2. Rule engine and tests.
3. Visual settings editor and metadata validation.
4. Runtime integration and observer hardening.
5. Import/export and complete documentation.
6. End-to-end test-organization validation and `0.1.0` release.

## Accepted decisions

- Custom Work Item Form control.
- Native superset target picklist.
- Project-scoped extension storage.
- Form observer validation.
- Configurable invalid-value handling.
- TypeScript and React.
- Backend-free MVP.
- Private first release.

## Pending decisions

- Final extension and publisher names.
- Open-source license.
- Whether plain string targets are supported in 0.1.
- Final handling for multiple rules targeting one field.
- Settings-page authorization model.
- Public marketplace and commercial model.
