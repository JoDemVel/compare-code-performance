export class RequestQueue<T> {
  private queue: (() => Promise<T>)[] = [];
  private isProcessing = false;

  addRequest(request: () => Promise<T>) {
    this.queue.push(request);
    this.processQueue();
  }

  private async processQueue() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const req = this.queue.shift();
      if (req) await req();
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    this.isProcessing = false;
  }
}