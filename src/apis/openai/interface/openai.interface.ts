import { IContext } from 'src/common/interfaces/context';
import { IChatResponse } from 'src/apis/ai/interfaces/ai.interface';
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
  id: number;
}
export interface IIdArgs {
  id: number;
}
