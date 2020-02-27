import { Config } from "../types";

//@ts-ignore
const config: Config = window.Config;

export const makeMessage = (isUser: boolean, text: string, id: string) => ({
  isUser,
  message: text,
  avatar: isUser
    ? config.userAvatar || "https://img.icons8.com/color/search/0"
    : config.botAvatar || "https://img.icons8.com/color/search/1",
  id,
  isLoading: false
});
