class RateLimiter {
  constructor(QUEUE_LENGTH, OUTFLOW_RATE_SECONDS) {
    this.QUEUE_LENGTH = QUEUE_LENGTH;
    this.OUTFLOW_RATE_SECONDS = OUTFLOW_RATE_SECONDS;
    this.queue = [];

    this._initQueue();
  }

  _initQueue() {
    setTimeout(() => {
      this._processQueue();
      this._initQueue();
    }, this.OUTFLOW_RATE_SECONDS * 1000);
  }

  _isQueueFull() {
    return this.queue.length >= this.QUEUE_LENGTH;
  }

  _enqueueRequest(id = 'unidentified request') {
    this.queue.push(id);
  }

  _processQueue() {
    this.queue.map((request) => console.log(`PROCESSING ${request}`));
    this.queue = [];
  }

  request(id) {
    if (this._isQueueFull()) console.log('REQUEST DROPPED');
    else {
      this._enqueueRequest(id);
      console.log('REQUEST ENQUEUED');
    }
  }
}

const rateLimiter = new RateLimiter(5, 5);
