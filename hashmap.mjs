import LinkedList from "./linked-list.mjs";

class HashMap {
  constructor() {
    this.buckets = Array(16);
    this.numberOfEntries = 0;
  }

  #hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    let seed = 1;

    for (let i = 0; i < key.length; i++) {
      hashCode =
        ((primeNumber + seed) * hashCode + key.charCodeAt(i)) %
        this.buckets.length;
      seed = seed + 2;
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
        return;
      }
      currentNode = currentNode.nextNode;
    }

    this.buckets[index].append({ [key]: value });
  }

  #growBuckets() {
    const loadFactor = 0.8;

    if (this.numberOfEntries >= this.buckets.length * loadFactor) {
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
          console.log(this.buckets[index]);
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
    this.buckets = Array(this.buckets.length);
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
}

const test = new HashMap();
test.set("Hello", "World");
/* test.set("Hello", "Again world"); */
test.set("olleH", "dlroW");
test.set("lloHe", "World");
test.set("eHoll", "World");
test.set("Hi", "there!");
console.log(test);
/* console.log(test.buckets[0]);
console.log(test.buckets[9]);
console.log(test.buckets[9].headNode.nextNode);
console.log(test.buckets[15]);
console.log(test.buckets[15].headNode.nextNode); */
/* console.log(test.get("Hello")); */
/* console.log(test.length()); */
