import IORedis from "ioredis";

let redis: IORedis | null = null;

export function getRedis() {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!redis) {
    redis = new IORedis(process.env.REDIS_URL, {
      maxRetriesPerRequest: null,
      enableReadyCheck: true,
      lazyConnect: true,
    });
  }

  return redis;
}

