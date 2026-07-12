import React, { useEffect, useMemo, useState } from "react";
import * as SDK from "azure-devops-extension-sdk";
import { Dropdown } from "azure-devops-ui/Dropdown";
import type { IListBoxItem } from "azure-devops-ui/ListBox";
import { getAllowedValues, targetIsAllowed } from "../common/mapping-engine";
import type { DependencyRule } from "../common/models";
import { loadConfiguration } from "../services/configuration-service";
import { getFormService } from "../services/work-item-service";

export function DependentPicklist(): React.ReactElement {
  const [rule, setRule] = useState<DependencyRule | null>(null);
  const [allowed, setAllowed] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const items = useMemo<IListBoxItem[]>(() => allowed.map(value => ({ id: value, text: value })), [allowed]);

  useEffect(() => {
    let active = true;
    void (async () => {
      try {
        await SDK.ready();
        const inputs = SDK.getConfiguration().witInputs as Record<string, string> | undefined;
        const ruleId = inputs?.ruleId;
        const config = await loadConfiguration();
        const found = config.rules.find(candidate => candidate.id === ruleId && candidate.enabled);
        if (!found) throw new Error(`Enabled rule '${ruleId ?? ""}' was not found.`);
        if (!active) return;
        setRule(found);
        await refresh(found);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : String(cause));
      }
    })();
    return () => { active = false; };
  }, []);

  async function refresh(currentRule: DependencyRule): Promise<void> {
    const form = await getFormService();
    const values = await form.getFieldValues([currentRule.sourceField, currentRule.targetField]);
    const source = values[currentRule.sourceField];
    const target = values[currentRule.targetField];
    const result = getAllowedValues(currentRule, source);
    const nextAllowed = result.matched ? result.values : currentRule.behavior.fallbackValues ?? [];
    setAllowed(nextAllowed);
    setSelected(target == null ? "" : String(target));
    setDisabled(result.sourceEmpty || !result.matched);

    if (!targetIsAllowed(target, nextAllowed, currentRule.behavior.allowEmptyTarget)) {
      if (currentRule.behavior.invalidTargetValue === "clear") {
        await form.setFieldValue(currentRule.targetField, null);
        setSelected("");
      } else if (currentRule.behavior.invalidTargetValue === "preserve-and-error") {
        await form.setError(`${currentRule.name}: '${String(target)}' is not allowed for the selected source value.`);
      }
    } else {
      await form.clearError();
    }
  }

  async function select(item: IListBoxItem): Promise<void> {
    if (!rule) return;
    const value = String(item.id);
    const form = await getFormService();
    await form.setFieldValue(rule.targetField, value);
    await form.clearError();
    setSelected(value);
  }

  if (error) return <div role="alert">{error}</div>;
  return <Dropdown ariaLabel={rule?.name ?? "Dependent picklist"} items={items} selectedItem={items.find(item => item.id === selected)} onSelect={(_, item) => void select(item)} disabled={disabled} placeholder={disabled ? "Select a source value first" : "Select a value"} />;
}
