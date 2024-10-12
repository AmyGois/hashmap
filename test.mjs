import HashMap from "./hashmap.mjs";

/* Test HashMap class */
const test = new HashMap();

test.setLoadFactor(0.75);

console.log("Set initial values");
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test);
console.log(test.buckets.length);
console.log(test.entries());
for (let i = 0; i < test.buckets.length; i++) {
  console.log(test.buckets[i]);
}

console.log("Change some values");
test.set("hat", "white");
test.set("apple", "green");
console.log(test.entries());

console.log("Grow the map");
test.set("moon", "silver");
console.log(test);
console.log(test.buckets.length);
for (let i = 0; i < test.buckets.length; i++) {
  console.log(test.buckets[i]);
}

console.log("Change some values");
test.set("moon", "blue");
test.set("dog", "black");
console.log(test.entries());

console.log("Test get, has, remove, length, keys, values, clear");
console.log(test.get("banana"));
console.log(test.has("apple"));
console.log(test.get("monkey"));
console.log(test.has("monkey"));
console.log(test.remove("monkey"));
console.log(test.remove("moon"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
test.clear();
console.log(test);
