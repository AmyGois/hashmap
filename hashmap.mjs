import LinkedList from "./linked-list.mjs";

export default class HashMap {
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

  #addToMap(key, value) {
    const index = this.#hash(key);

    if (this.buckets[index] === undefined) {
      this.buckets[index] = new LinkedList();
    }
    let currentNode = this.buckets[index].headNode;

    while (currentNode !== null) {
      if (currentNode.value[key]) {
        currentNode.value[key] = value;
        this.numberOfEntries--;
        return;
      }
      currentNode = currentNode.nextNode;
    }

    this.buckets[index].append({ [key]: value });
  }

  #growBuckets() {
    if (this.numberOfEntries > this.buckets.length * this.loadFactor) {
      const oldBuckets = this.buckets;

      this.buckets = Array(this.buckets.length * 2);

      for (let i = 0; i < oldBuckets.length; i++) {
        if (oldBuckets[i] !== undefined) {
          let currentNode = oldBuckets[i].headNode;

          while (currentNode !== null) {
            this.#addToMap(
              Object.keys(currentNode.value)[0],
              Object.values(currentNode.value)[0]
            );
            currentNode = currentNode.nextNode;
          }
        }
      }
    }
  }

  set(key, value) {
    this.#addToMap(key, value);
    this.numberOfEntries++;
    this.#growBuckets();
  }

  get(key) {
    const index = this.#hash(key);

    if (this.buckets[index] !== undefined) {
      let currentNode = this.buckets[index].headNode;

      while (currentNode !== null) {
        if (currentNode.value[key]) {
          return currentNode.value[key];
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
        if (currentNode.value[key]) {
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
        if (currentNode.value[key]) {
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
            allKeys.push(Object.keys(currentNode.value)[0]);
          }
          currentNode = currentNode.nextNode;
        }
      }
    }

    return allKeys;
  }

  values() {
    const allValues = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let currentNode = this.buckets[i].headNode;

        while (currentNode !== null) {
          if (currentNode.value !== null) {
            allValues.push(Object.values(currentNode.value)[0]);
          }
          currentNode = currentNode.nextNode;
        }
      }
    }

    return allValues;
  }

  entries() {
    const allEntries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== undefined) {
        let currentNode = this.buckets[i].headNode;

        while (currentNode !== null) {
          if (currentNode.value !== null) {
            let newEntry = [];

            newEntry.push(Object.keys(currentNode.value)[0]);
            newEntry.push(Object.values(currentNode.value)[0]);
            allEntries.push(newEntry);
          }
          currentNode = currentNode.nextNode;
        }
      }
    }

    return allEntries;
  }

  setLoadFactor(newFactor) {
    if (newFactor == NaN || newFactor > 1 || newFactor < 0.75) {
      throw new Error("Load factor must be between 0.75 and 1");
    } else {
      this.loadFactor = newFactor;
    }
  }
}
