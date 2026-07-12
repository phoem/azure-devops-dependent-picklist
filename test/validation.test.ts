import { describe, expect, it } from "vitest";
import { validateRule } from "../src/common/validation";
import type { DependencyRule } from "../src/common/models";

function makeRule(): DependencyRule {
  return {
    id: "rule", name: "Rule", enabled: true, workItemTypes: ["Bug"], sourceField: "Custom.Source", targetField: "Custom.Target",
    behavior: { whenSourceEmpty: "disable", whenSourceUnknown: "error", invalidTargetValue: "clear", allowEmptyTarget: true, sortValues: false, caseSensitive: false },
    mappings: [{ sourceValues: ["A"], targetValues: ["1"] }]
  };
}

describe("rule validation", () => {
  it("accepts a valid rule", () => expect(validateRule(makeRule())).toEqual([]));
  it("rejects identical source and target fields", () => {
    const rule = makeRule(); rule.targetField = rule.sourceField;
    expect(validateRule(rule).some(issue => issue.path === "targetField")).toBe(true);
  });
  it("rejects conflicting source mappings", () => {
    const rule = makeRule(); rule.mappings.push({ sourceValues: ["a"], targetValues: ["2"] });
    expect(validateRule(rule).some(issue => issue.message.includes("more than one mapping"))).toBe(true);
  });
});
