const MAX_SIZE = 5;

let bucket = [];

function fill() {
  if (bucket.length >= MAX_SIZE) return bucket;
  else {
    bucket.push('t');
    return bucket;
  }
}

function consume() {
  if (bucket.length > 0) {
    bucket.shift();
    return true;
  } else return false;
}

function request() {
  if (bucket.length > 0) {
    consume(bucket);
    console.log(`REQUEST FULFILLED - ${bucket.length} requests remain.`);
  } else console.log('REQUEST REJECTED');
}

function fillInitiator() {
  setTimeout(() => {
    fill(bucket);
    fillInitiator();
  }, 1000);
}

fillInitiator();
