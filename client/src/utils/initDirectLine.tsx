export const initDirectLine = async (onIdReceived: (id: string) => void) => {
  const reply = await fetch("/directline/conversations", {
    method: "POST"
  });
  const json = await reply.json();
  onIdReceived(json.conversationId);
};
