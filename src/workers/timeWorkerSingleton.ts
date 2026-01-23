import type { TaskStateModel } from "../models/TaskStateModel";

let instance: TimerWorkerSingleton | null = null;

export class TimerWorkerSingleton {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL("./timeWorker.js", import.meta.url));
  }

  static getInstance(): TimerWorkerSingleton {
    if (!instance) {
      return instance = new TimerWorkerSingleton();
    }
    return instance;
  }

  postMessage(message: TaskStateModel): void {
    this.worker.postMessage(message);
  }

  onmessage(cb: (e: MessageEvent) => void): void {
    this.worker.onmessage = cb;
  }

  terminate(): void {
    if (instance) {
      instance.worker.terminate();
      instance = null;
    }
  }
}
