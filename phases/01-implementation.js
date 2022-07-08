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
    if (this.count>= (0.7*this.capacity)){
      this.resize();
    }
    const pair= new KeyValuePair(key,value)
    const index= this.hashMod(key);
    if (this.data[index]){
      let curr= this.data[index];

      while (curr){
        if (curr.key===key){
          curr.value= value;
          return;
        }
        curr = curr.next;
      }
     }
      this.insertWithHashCollisions(key, value);
  }


  read(key) {
    const index= this.hashMod(key);
    let curr = this.data[index];
    // Your code here
    while (curr){
      if (curr.key===key){
        return curr.value;
      }
      curr= curr.next;
  }
  return undefined;
}


  resize() {
    const newTable= new HashTable (this.capacity*2);
    for (let i=0;i<this.data.length;i++){
      let kvp= this.data[i];
      while (kvp){
        newTable.insert(kvp.key, kvp.value);
        kvp= kvp.next;
      }
    }
    this.capacity= newTable.capacity;
    this.data= newTable.data;
  }


  delete(key) {
    // Your code here
    const index= this.hashMod(key);
    if (this.data[index]){
      let curr= this.data[index];
      if (curr.key === key){
        curr=curr.next;
        this.data[index]= curr;
        this.count -= 1;
        return "hello";
      }
      while (curr.next){
        if (curr.next.key===key){
          curr.next=curr.next.next;
          this.count -= 1;
          return "goodbye";
        }
        curr = curr.next;
      }
     }
     return "Key not found";
  }
}


module.exports = HashTable;
