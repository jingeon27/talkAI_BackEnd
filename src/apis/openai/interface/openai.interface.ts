import { IContext } from 'src/common/interfaces/context';
import { ChatResponseInput } from '../input/chat-response.input';

export interface IChatResponse {
  chat: ChatResponseInput[];
}
export interface IOpenAiServiceReflection {
  location: string;
  situation: string;
  question: number;
}
export interface IOpenAiServiceCreateChat extends IChatResponse {
  context: IContext;
  name: string;
  role: string;
}
export interface IGetChatList {
  context: IContext;
}
export interface IOpenAiServiceUpdateChat extends IChatResponse {
  id: string;
}
export interface IGetChatConversation {
  id: string;
}
