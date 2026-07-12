# Configuration

Configuration is a versioned JSON document stored per Azure DevOps project.

```json
{
  "version": 1,
  "rules": []
}
```

Each rule identifies source and target field reference names, applicable work-item types, mappings, and behavior for empty, unknown, or invalid values.

## Recommended field setup

Create the target as a native string picklist and include the complete union of values used by every mapping. The settings page should reject or warn about configured values missing from the native list once field-metadata validation is implemented.

## Invalid values

- `clear`: remove a target value that becomes invalid.
- `preserve-and-error`: keep it and block web-form saving.
- `preserve-with-warning`: keep it and allow saving with a warning.
