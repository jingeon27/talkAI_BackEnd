import { IContext } from 'src/common/interfaces/context';
import { ChatResponseInput } from '../input/chat-response.input';

export interface IChatResponse {
  question: ChatResponseInput[];
}
export interface IOpenAiServiceReflection {
  location: string;
  situation: string;
  question: number;
}
export interface IOpenAiServiceCreateChat extends IChatResponse {
  context: IContext;
  name: string;
}
export interface IGetChatList {
  context: IContext;
}
