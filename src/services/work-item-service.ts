import * as SDK from "azure-devops-extension-sdk";
import { WorkItemTrackingServiceIds, type IWorkItemFormService } from "azure-devops-extension-api/WorkItemTracking";

export async function getFormService(): Promise<IWorkItemFormService> {
  await SDK.ready();
  return SDK.getService<IWorkItemFormService>(WorkItemTrackingServiceIds.WorkItemFormService);
}
