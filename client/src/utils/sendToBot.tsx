import { USER_ID } from "../App";
export const sendToBot = async (conversationId: string, message: string) => {
  fetch(`/directline/conversations/${conversationId}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "message",
      from: {
        id: USER_ID
      },
      text: message
    })
  });
};
