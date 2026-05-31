type LogContext = Record<string, string | number | boolean | null | undefined>;

function write(level: "info" | "warn" | "error", event: string, context: LogContext = {}) {
  const safeContext = Object.fromEntries(
    Object.entries(context).filter(([key]) => !["email", "token", "password", "secret"].includes(key)),
  );

  console[level](JSON.stringify({ timestamp: new Date().toISOString(), level, event, ...safeContext }));
}

export const logger = {
  info: (event: string, context?: LogContext) => write("info", event, context),
  warn: (event: string, context?: LogContext) => write("warn", event, context),
  error: (event: string, context?: LogContext) => write("error", event, context),
};

