import * as SDK from "azure-devops-extension-sdk";
import { getAllowedValues, targetIsAllowed } from "../common/mapping-engine";
import { loadConfiguration } from "../services/configuration-service";
import { getFormService } from "../services/work-item-service";

SDK.init({ loaded: false });

async function validate(): Promise<void> {
  const form = await getFormService();
  const config = await loadConfiguration();
  for (const rule of config.rules.filter(candidate => candidate.enabled)) {
    const values = await form.getFieldValues([rule.sourceField, rule.targetField]);
    const result = getAllowedValues(rule, values[rule.sourceField]);
    if (!result.matched) continue;
    if (!targetIsAllowed(values[rule.targetField], result.values, rule.behavior.allowEmptyTarget) && rule.behavior.invalidTargetValue === "preserve-and-error") {
      await form.setError(`${rule.name}: target value is not permitted by the source value.`);
      return;
    }
  }
  await form.clearError();
}

SDK.register(SDK.getContributionId(), () => ({
  onLoaded: validate,
  onRefreshed: validate,
  onFieldChanged: validate
}));
void SDK.notifyLoadSucceeded();
