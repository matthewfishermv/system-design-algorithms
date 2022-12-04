class RateLimiter {
  constructor(BUCKET_SIZE, REFILL_INTERVAL_SECONDS) {
    this.BUCKET_SIZE = BUCKET_SIZE;
    this.REFILL_INTERVAL_SECONDS = REFILL_INTERVAL_SECONDS;
    this.bucket = [];

    this._initFill();
  }

  _fill() {
    if (this.bucket.length < this.BUCKET_SIZE) this.bucket.push('t');
  }

  _initFill() {
    setTimeout(() => {
      this._fill(this.bucket);
      this._initFill();
    }, this.REFILL_INTERVAL_SECONDS * 1000);
  }

  _consume() {
    if (this.bucket.length > 0) {
      this.bucket.shift();
      return true;
    }

    return false;
  }

  request() {
    if (this._consume()) console.log(`REQUEST FULFILLED - ${this.bucket.length} requests remain.`);
    else console.log('REQUEST REJECTED');
  }
}

const rateLimiter = new RateLimiter(5, 5);
