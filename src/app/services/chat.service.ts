import type { ApiResponse } from "./types";
import { httpClient } from "./httpClient";

export interface ChatService {
  sendChatMessage(
    message: string
  ): Promise<ApiResponse<Record<string, unknown>>>;
  getChatHistory(): Promise<ApiResponse<Record<string, unknown>[]>>;
  clearChatHistory(): Promise<ApiResponse>;
  getConversation(
    conversationId: string
  ): Promise<ApiResponse<Record<string, unknown>>>;
  deleteConversation(conversationId: string): Promise<ApiResponse>;
}

export class HttpChatService implements ChatService {
  sendChatMessage(
    message: string
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return httpClient.request<Record<string, unknown>>("/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  }

  getChatHistory(): Promise<ApiResponse<Record<string, unknown>[]>> {
    return httpClient.request<Record<string, unknown>[]>("/chat/history");
  }

  clearChatHistory(): Promise<ApiResponse> {
    return httpClient.request("/chat/clear", { method: "DELETE" });
  }

  getConversation(
    conversationId: string
  ): Promise<ApiResponse<Record<string, unknown>>> {
    return httpClient.request<Record<string, unknown>>(
      `/chat/conversation/${conversationId}`
    );
  }

  deleteConversation(conversationId: string): Promise<ApiResponse> {
    return httpClient.request(`/chat/conversation/${conversationId}`, {
      method: "DELETE",
    });
  }
}

export const chatService: ChatService = new HttpChatService();
