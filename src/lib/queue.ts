import { Queue } from "bullmq";
let mediaQueue: Queue | null = null;

export function getMediaQueue() {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!mediaQueue) {
    mediaQueue = new Queue("property-media-processing", {
      connection: { url: process.env.REDIS_URL },
    });
  }

  return mediaQueue;
}
