class Node {
  constructor() {
    this.value = null;
    this.nextNode = null;
  }
}

export default class LinkedList {
  constructor() {
    this.headNode = null;
  }

  firstNode(value) {
    this.headNode = new Node();
    this.headNode.value = value;
  }

  append(value) {
    let finalNode = this.tail();

    if (finalNode === null) {
      this.firstNode(value);
      return;
    }

    finalNode.nextNode = new Node();
    finalNode.nextNode.value = value;
  }

  prepend(value) {
    if (this.headNode === null) {
      this.firstNode(value);
      return;
    } else {
      let newNode = new Node();
      newNode.value = value;
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
    }
  }

  size() {
    let listSize = 0;
    let finalNode = this.headNode;

    if (finalNode !== null) {
      listSize++;
      while (finalNode.nextNode !== null) {
        finalNode = finalNode.nextNode;
        listSize++;
      }
    }

    return listSize;
  }

  head() {
    return this.headNode;
  }

  tail() {
    let finalNode = this.headNode;

    if (finalNode !== null) {
      while (finalNode.nextNode !== null) {
        finalNode = finalNode.nextNode;
      }
    }

    return finalNode;
  }

  at(index) {
    let currentIndex = 0;
    let nodeAtIndex = false;

    if (typeof index === "number" && this.headNode !== null) {
      nodeAtIndex = this.headNode;
      while (currentIndex < index) {
        nodeAtIndex = nodeAtIndex.nextNode;
        if (nodeAtIndex === null) {
          return false;
        }
        currentIndex++;
      }
    }

    return nodeAtIndex;
  }

  pop() {
    const listSize = this.size();
    let newFinalNode = this.headNode;

    if (listSize !== 0) {
      for (let i = 1; i < listSize - 1; i++) {
        newFinalNode = newFinalNode.nextNode;
      }
      newFinalNode.nextNode = null;
    }
  }

  contains(value) {
    let currentNode = this.headNode;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return true;
      }
      currentNode = currentNode.nextNode;
    }

    return false;
  }

  find(value) {
    let currentNode = this.headNode;
    let currentIndex = 0;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentIndex;
      }
      currentNode = currentNode.nextNode;
      currentIndex++;
    }
    return null;
  }

  toString() {
    let listString = "";
    let currentNode = this.headNode;

    while (currentNode !== null) {
      listString += `( ${currentNode.value} ) => `;
      currentNode = currentNode.nextNode;
    }
    listString += "null";

    return listString;
  }

  insertAt(value, index) {
    let listSize = this.size();

    if (index > listSize) {
      return false;
    }
    if (index === listSize) {
      this.append(value);
      return;
    }
    if (index === 0) {
      this.prepend(value);
      return;
    } else {
      let currentIndex = 1;
      let previous = this.headNode;
      const newNode = new Node();
      newNode.value = value;

      while (currentIndex < index) {
        previous = previous.nextNode;
        currentIndex++;
      }
      newNode.nextNode = previous.nextNode;
      previous.nextNode = newNode;
    }
  }

  removeAt(index) {
    let listSize = this.size();

    if (index >= listSize) {
      return;
    }
    if (index === listSize - 1) {
      this.pop();
      return;
    }
    if (index === 0) {
      this.headNode = this.headNode.nextNode;
    } else {
      let currentIndex = 1;
      let previous = this.headNode;

      while (currentIndex < index) {
        previous = previous.nextNode;
        currentIndex++;
      }
      previous.nextNode = previous.nextNode.nextNode;
    }
  }
}
