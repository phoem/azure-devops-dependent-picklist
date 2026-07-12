import type { DependencyRule } from "./models";

export interface MappingResult {
  values: string[];
  matched: boolean;
  sourceEmpty: boolean;
}

function normalize(value: string, caseSensitive: boolean): string {
  const trimmed = value.trim();
  return caseSensitive ? trimmed : trimmed.toLocaleLowerCase();
}

export function unique(values: string[]): string[] {
  return [...new Set(values)];
}

export function getAllowedValues(rule: DependencyRule, sourceValue: unknown): MappingResult {
  const source = sourceValue === null || sourceValue === undefined ? "" : String(sourceValue).trim();
  if (!source) return { values: [], matched: false, sourceEmpty: true };

  const needle = normalize(source, rule.behavior.caseSensitive);
  const mapping = rule.mappings.find(entry =>
    entry.sourceValues.some(value => normalize(value, rule.behavior.caseSensitive) === needle)
  );

  if (!mapping) return { values: [], matched: false, sourceEmpty: false };

  const values = unique(mapping.targetValues);
  if (rule.behavior.sortValues) values.sort((a, b) => a.localeCompare(b));
  return { values, matched: true, sourceEmpty: false };
}

export function targetIsAllowed(targetValue: unknown, values: string[], allowEmpty: boolean): boolean {
  if (targetValue === null || targetValue === undefined || targetValue === "") return allowEmpty;
  return values.includes(String(targetValue));
}
