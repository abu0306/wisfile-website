// Event logging utility functions

interface LogEventProps {
  [key: string]: string | number | boolean | null | undefined;
}

export const logEvent = (eventName: string, props: LogEventProps = {}) => {
  const session_id = localStorage.getItem("session_id") || "";
  const channel = localStorage.getItem("channel") || "";
  const referrer = localStorage.getItem("referrer") || "";

  fetch("/api/log", {
    method: "POST",
    body: JSON.stringify({
      channel,
      event_name: eventName,
      session_id,
      props: {
        ...props,
        referrer,
      },
    }),
  });
};

// Initialize tracking parameters
export const initTracking = () => {
  // Generate session_id if not exists
  if (!localStorage.getItem("session_id")) {
    const session_id = crypto.randomUUID();
    localStorage.setItem("session_id", session_id);
  }

  // Save referrer if not exists
  if (!localStorage.getItem("referrer") && document.referrer) {
    localStorage.setItem("referrer", document.referrer);
  }
};
