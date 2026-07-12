import { describe, expect, it } from "vitest";
import { getAllowedValues, targetIsAllowed } from "../src/common/mapping-engine";
import type { DependencyRule } from "../src/common/models";

const rule: DependencyRule = {
  id: "test", name: "Test", enabled: true, workItemTypes: ["Bug"],
  sourceField: "Custom.Field1", targetField: "Custom.Field2",
  behavior: { whenSourceEmpty: "disable", whenSourceUnknown: "error", invalidTargetValue: "clear", allowEmptyTarget: true, sortValues: false, caseSensitive: false },
  mappings: [
    { sourceValues: ["list1"], targetValues: ["one", "two", "three"] },
    { sourceValues: ["list2"], targetValues: ["three", "four", "five", "six"] }
  ]
};

describe("mapping engine", () => {
  it("resolves a mapped subset", () => expect(getAllowedValues(rule, "list1").values).toEqual(["one", "two", "three"]));
  it("matches without case sensitivity", () => expect(getAllowedValues(rule, "LIST2").matched).toBe(true));
  it("reports empty source values", () => expect(getAllowedValues(rule, null).sourceEmpty).toBe(true));
  it("recognizes valid and invalid targets", () => {
    expect(targetIsAllowed("three", ["one", "three"], true)).toBe(true);
    expect(targetIsAllowed("five", ["one", "three"], true)).toBe(false);
  });
});
