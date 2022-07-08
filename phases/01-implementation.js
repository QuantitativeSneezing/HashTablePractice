class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity= numBuckets;
    this.data= new Array (numBuckets);
    this.data.fill(null,0,numBuckets);
    this.count=0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }
  insertWithHashCollisions(key, value) {
    // Your code here
    const pair= new KeyValuePair(key,value)
    const index= this.hashMod(key);
    if (this.data[index]){
      pair.next= this.data[index];
      this.data[index]= pair;
      this.count++;
    } else{
      this.data[index]= pair;
      this.count++;
    }
  }

  insert(key, value) {
    // Your code here
    let inserted = 0;
    const pair= new KeyValuePair(key,value)
    const index= this.hashMod(key);
    if (this.data[index]){
      let curr= this.data[index];

      while (curr.next){
        if (curr.key===key){
          curr.value= value;
          inserted++;
        }
        curr = curr.next;
      }
     }
     if (inserted===0){
      this.insertWithHashCollisions(key, value);
     }
  }


  read(key) {
    // Your code here
    const index= this.hashMod(key);
    return (this.data[index])
  }


  resize() {
    // Your code here
  }


  delete(key) {
    // Your code here
  }
}


module.exports = HashTable;
