# Architecture

The MVP is divided into four layers:

1. **Rule engine** — pure TypeScript mapping and validation code with no Azure DevOps dependency.
2. **Work-item integration** — wrappers around the Azure DevOps Extension SDK and work-item form service.
3. **User interfaces** — a dependent-picklist form control and project administration page.
4. **Observer** — validates active rules when work items load, refresh, or change.

The recommended process design defines the target field as a native picklist containing the union of all possible values. The extension filters that superset in the web UI. This preserves querying, reporting, REST access, and compatibility if the extension is removed.

## Trust boundary

Web-form validation is client-side. REST clients, imports, integrations, and alternate editors can bypass it. Post-save external validation is planned for a later version.

## Rule constraints in 0.1

- One source and one target field per rule.
- One enabled rule per target field and work-item type.
- Static source-to-target mappings.
- Project-scoped configuration.
