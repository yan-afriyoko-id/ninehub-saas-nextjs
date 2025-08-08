import type { ApiResponse, Plan } from "./types";
import { httpClient } from "./httpClient";

export interface PlansService {
  getPlans(): Promise<ApiResponse<Plan[]>>;
  createPlan(
    plan: Omit<Plan, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Plan>>;
  updatePlan(id: number, plan: Partial<Plan>): Promise<ApiResponse<Plan>>;
  deletePlan(id: number): Promise<ApiResponse>;
}

export class HttpPlansService implements PlansService {
  getPlans(): Promise<ApiResponse<Plan[]>> {
    return httpClient.request<Plan[]>("/plans");
  }
  createPlan(
    plan: Omit<Plan, "id" | "created_at" | "updated_at">
  ): Promise<ApiResponse<Plan>> {
    return httpClient.request<Plan>("/plans", {
      method: "POST",
      body: JSON.stringify(plan),
    });
  }
  updatePlan(id: number, plan: Partial<Plan>): Promise<ApiResponse<Plan>> {
    return httpClient.request<Plan>(`/plans/${id}`, {
      method: "PUT",
      body: JSON.stringify(plan),
    });
  }
  deletePlan(id: number): Promise<ApiResponse> {
    return httpClient.request(`/plans/${id}`, { method: "DELETE" });
  }
}

export const plansService: PlansService = new HttpPlansService();
