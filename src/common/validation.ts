import type { DependencyRule, ExtensionConfiguration } from "./models";

export interface ValidationIssue {
  path: string;
  message: string;
}

export function validateRule(rule: DependencyRule): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (!rule.id.trim()) issues.push({ path: "id", message: "Rule ID is required." });
  if (!rule.name.trim()) issues.push({ path: "name", message: "Rule name is required." });
  if (!rule.sourceField.trim()) issues.push({ path: "sourceField", message: "Source field is required." });
  if (!rule.targetField.trim()) issues.push({ path: "targetField", message: "Target field is required." });
  if (rule.sourceField === rule.targetField) issues.push({ path: "targetField", message: "Source and target fields must differ." });
  if (rule.mappings.length === 0) issues.push({ path: "mappings", message: "At least one mapping is required." });

  const seen = new Set<string>();
  rule.mappings.forEach((mapping, index) => {
    if (!mapping.sourceValues.length) issues.push({ path: `mappings.${index}.sourceValues`, message: "At least one source value is required." });
    if (!mapping.targetValues.length) issues.push({ path: `mappings.${index}.targetValues`, message: "At least one target value is required." });
    mapping.sourceValues.forEach(value => {
      const key = rule.behavior.caseSensitive ? value.trim() : value.trim().toLocaleLowerCase();
      if (seen.has(key)) issues.push({ path: `mappings.${index}.sourceValues`, message: `Source value '${value}' appears in more than one mapping.` });
      seen.add(key);
    });
  });
  return issues;
}

export function validateConfiguration(config: ExtensionConfiguration): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  if (config.version !== 1) issues.push({ path: "version", message: "Unsupported configuration version." });
  const ids = new Set<string>();
  config.rules.forEach((rule, index) => {
    if (ids.has(rule.id)) issues.push({ path: `rules.${index}.id`, message: `Duplicate rule ID '${rule.id}'.` });
    ids.add(rule.id);
    validateRule(rule).forEach(issue => issues.push({ path: `rules.${index}.${issue.path}`, message: issue.message }));
  });
  return issues;
}
