import { ChatResponseInput } from 'src/apis/chat/input/chat-response.input';

export interface IChatResponse {
  chat: ChatResponseInput[];
}
export interface ISummary {
  content: string;
}
