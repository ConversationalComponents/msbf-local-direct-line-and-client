import { setInterval } from "timers";
import { Exchange } from "../types";

const POLL_INTERVAL = 300;

const poll = async (conversationId: string) => {
  const activities = await fetch(
    `/directline/conversations/${conversationId}/activities`
  );
  const actObj = await activities.json();
  return (actObj.activities || []) as Exchange[];
};
export const startPolling = async (
  conversationId: string,
  onActivities: (activities: Exchange[]) => void
) => {
  const doPoll = () => poll(conversationId).then(onActivities);
  setInterval(doPoll, POLL_INTERVAL);
};
