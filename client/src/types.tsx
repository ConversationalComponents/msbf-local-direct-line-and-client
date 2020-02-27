import { CSSProperties } from "react";

export type Config = {
  headerImage: string;
  headerAlignment: "center" | "left" | "right";
  headerText: string;
  userAvatar: string;
  botAvatar: string;
  headerTextStyle?: CSSProperties;
};

export type Exchange = {
  type: string;
  serviceUrl: string;
  channelId: string;
  conversation: {
    id: string;
  };
  recipient: {
    id: string;
  };
  text: string;
  inputHint: string;
  replyToId: string;
  id: string;
  from: {
    id: string;
    name: string;
  };
};
