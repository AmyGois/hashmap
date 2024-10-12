import LinkedList from "./linked-list.mjs";

export default class HashSet {
  constructor() {
    this.buckets = Array(16);
    this.numberOfEntries = 0;
    this.loadFactor = 0.8;
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        (primeNumber * hashCode + key.charCodeAt(i)) % this.buckets.length;
    }

    return hashCode;
  }

  #addToMap(key) {
    const index = this.#hash(key);

    if (this.buckets[index] === undefined) {
      this.buckets[index] = new LinkedList();
    }
    let currentNode = this.buckets[index].headNode;

    while (currentNode !== null) {
      if (currentNode.value === key) {
        return;
      }
      currentNode = currentNode.nextNode;
    }

    this.buckets[index].append(key);
    this.numberOfEntries++;
  }

  #growBuckets() {
    if (this.numberOfEntries > this.buckets.length * this.loadFactor) {
      const oldBuckets = this.buckets;

      this.buckets = Array(this.buckets.length * 2);
      this.numberOfEntries = 0;

      for (let i = 0; i < oldBuckets.length; i++) {
        if (oldBuckets[i] !== undefined) {
          let currentNode = oldBuckets[i].headNode;

          while (currentNode !== null) {
            this.#addToMap(currentNode.value);
            currentNode = currentNode.nextNode;
          }
        }
      }
    }
  }

  set(key) {
    this.#addToMap(key);
    this.#growBuckets();
  }

  get(key) {
    const index = this.#hash(key);

    if (this.buckets[index] !== undefined) {
      let currentNode = this.buckets[index].headNode;

      while (currentNode !== null) {
        if (currentNode.value === key) {
          return currentNode.value;
        }
        currentNode = currentNode.nextNode;
      }
    }

    return null;
  }

  has(key) {
    const index = this.#hash(key);

    if (this.buckets[index] !== undefined) {
      let currentNode = this.buckets[index].headNode;

      while (currentNode !== null) {
        if (currentNode.value === key) {
          return true;
        }
        currentNode = currentNode.nextNode;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.#hash(key);

    if (this.buckets[index] !== undefined) {
      let currentNode = this.buckets[index].headNode;
      let currentIndex = 0;

      while (currentNode !== null) {
        if (currentNode.value === key) {
          this.buckets[index].removeAt(currentIndex);
          this.numberOfEntries--;
          return true;
        }
        currentNode = currentNode.nextNode;
        currentIndex++;
      }
    }

    return false;
  }

  length() {
    return this.numberOfEntries;
  }

  clear() {
    this.buckets = Array(16);
    this.numberOfEntries = 0;
  }

  keys() {
    const allKeys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let currentNode = this.buckets[i].headNode;

        while (currentNode !== null) {
          if (currentNode.value !== null) {
            allKeys.push(currentNode.value);
          }
          currentNode = currentNode.nextNode;
        }
      }
    }

    return allKeys;
  }

  setLoadFactor(newFactor) {
    if (newFactor == NaN || newFactor > 1 || newFactor < 0.75) {
      throw new Error("Load factor must be between 0.75 and 1");
    } else {
      this.loadFactor = newFactor;
    }
  }
}
