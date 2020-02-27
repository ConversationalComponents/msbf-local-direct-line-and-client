import React, { useState, useEffect } from "react";
import { ChatWindow } from "@conversationalcomponents/chat-window";
import { makeMessage } from "./utils/makeMessage";
import { sendToBot } from "./utils/sendToBot";
import { Exchange, Config } from "./types";
import { startPolling } from "./utils/poll";
import { initDirectLine } from "./utils/initDirectLine";

export const USER_ID = "user";

const getConfigHeaderAlignCss = (config: Config) => {
  let reply = "center";
  if (config.headerAlignment) {
    if (config.headerAlignment === "left") {
      reply = "flex-start";
    } else if (config.headerAlignment === "right") {
      reply = "flex-end";
    }
  }
  return reply;
};

const getHeaderImage = (config: Config) => {
  return (
    <div
      style={{
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: getConfigHeaderAlignCss(config)
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <img
          style={{
            height: "calc(100% - 12px)"
          }}
          alt=""
          src={config.headerImage}
        />
      </div>
    </div>
  );
};

const getHeaderText = (config: Config) => {
  return (
    <div
      style={{
        height: "100%",
        flex: 1,
        display: "flex",
        justifyContent: getConfigHeaderAlignCss(config)
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <div style={config.headerTextStyle || { fontSize: "17px" }}>
          {config.headerText}
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  const [content, setContent] = useState([
    makeMessage(false, "Hello and welcome to the example!", "entry id")
  ]);
  // @ts-ignore
  const [config] = useState<Config>(window.Config);
  const [headerAdditionalContent] = useState(
    config.headerImage ? getHeaderImage(config) : getHeaderText(config)
  );

  const [conversationId, setConversationId] = useState("");
  const [activities, setActivities] = useState<Exchange[]>([]);

  useEffect(() => {
    initDirectLine(setConversationId);
  }, []);

  useEffect(() => {
    const botActivities = activities.filter(
      act => act.from.id !== USER_ID && !content.some(c => c.id === act.id)
    );
    if (!botActivities.length) return;
    setContent([
      ...content,
      ...botActivities.map(act => makeMessage(false, act.text, act.id))
    ]);
    // eslint-disable-next-line
  }, [activities]);

  useEffect(() => {
    if (!conversationId) return;
    startPolling(conversationId, setActivities);
    // eslint-disable-next-line
  }, [conversationId]);

  const processUserInput = (text: string) => {
    setContent([
      ...content,
      makeMessage(true, text, content.length.toString())
    ]);
    sendToBot(conversationId, text);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <div style={{ height: "500px", width: "300px" }}>
          <ChatWindow
            headerAdditionalContent={headerAdditionalContent}
            content={content}
            onSubmit={processUserInput}
          />
        </div>
      </div>
    </div>
  );
};
