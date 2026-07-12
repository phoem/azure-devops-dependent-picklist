export type EmptySourceBehavior = "disable" | "empty" | "all" | "fallback" | "error";
export type UnknownSourceBehavior = "disable" | "empty" | "all" | "fallback" | "error";
export type InvalidTargetBehavior = "clear" | "preserve-and-error" | "preserve-with-warning";

export interface ValueMapping {
  sourceValues: string[];
  targetValues: string[];
}

export interface RuleBehavior {
  whenSourceEmpty: EmptySourceBehavior;
  whenSourceUnknown: UnknownSourceBehavior;
  invalidTargetValue: InvalidTargetBehavior;
  allowEmptyTarget: boolean;
  sortValues: boolean;
  caseSensitive: boolean;
  fallbackValues?: string[];
}

export interface DependencyRule {
  id: string;
  name: string;
  enabled: boolean;
  workItemTypes: string[];
  sourceField: string;
  targetField: string;
  behavior: RuleBehavior;
  mappings: ValueMapping[];
}

export interface ExtensionConfiguration {
  version: 1;
  rules: DependencyRule[];
}

export const DEFAULT_BEHAVIOR: RuleBehavior = {
  whenSourceEmpty: "disable",
  whenSourceUnknown: "error",
  invalidTargetValue: "clear",
  allowEmptyTarget: true,
  sortValues: false,
  caseSensitive: false
};
