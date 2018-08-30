'use strict';

// YOU KNOW WHAT TO DO //

/**
* 
* identity: Designed to returned whatever value is passed in unchanged.
* 
* @param {...} anything: any value that is a value.
* 
* @return {...} anything: any value input will be return unaltered.
* 
* Usage:
*       var input = [1,2,3];
*       console.log(identity(input)); // -> [1,2,3]
* 
* 
*/
function identity (anything) {return anything}; 

/** 
* 
* typeOf: Designed to return the datatype of a given value as a string.

* 
* @param {... } anything: any type of expression or value.
* 
* @return {String}:       
*          - "string"
*          - "array"
*          - "object"
*          - "undefined"
*          - "number"
*          - "boolean"
*          - "null"
*          - "function"* 
* 
* Usage :
*  console.log(typeOf(134)); //  -> "number"
*  console.log(typeOf("javascript")); // -> "string"
*  console.log(typeOf([1,2,3])); //  -> "array"
*/
function typeOf (anything) {
    
    if(Array.isArray(anything)) return "array";
    if(anything === null) return "null";
    else return typeof anything;
    
}
/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection. Each is an impure function 
 * and therefore doesnt return anything and can only produce side effects. 
 * Each doesnt produce a new value, but it can be used to alter elements in
 * an array or key/value pairs in an object.
 * Each can also be used to 'dive' into complex objects, every time each is run
 * we can see one-layer deeper into our object.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * 
 * Usage:
 *      var input = [1,2,3];
 *      var result =[];
 *      each(input, (e,i)=>{
 *          input[i] = input[i]*2;
 *          result.push(e*2);
        });
 *      console.log(result); // -> [2,4,6]
 *      console.log(input);  // -> [2,4,6]
 * 
 *      
 */
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}

/**
 * first: Designed to return a new array containing the first of a specified 
 * amount of elements in an array.
 *
 * @param {Array} array: The array over which to iterate.
 * @param {Number} num: The number of indexes, including and starting at 
 * zero, that will be returned. If left empty the function will return
 * the first element of the array.
 * 
 * @return {Array}: will return a new array with a length equal to the lesser 
 * of the second argument and the length of the given array. If an array is 
 * not given an empty array will be returned.
 * 
 * Usage:
 * 
 *      var input =[1,2,3,4];
 *      var result = first(input, 2);
 *      console.log(result); // -> [1,2]
 * 
*/
function first (array, num) {
    if(!(Array.isArray(array))) return [];
    if(typeof num !== "number") return array[0];
    else if (num > array.length) return array;
    else {
        var result =[];
        for (var i = 0; i < num; i++){
            result.push(array[i]);
        }
        return result;
    }
}

/** 
 * last: Designed to return a new array containing the last of a specified
 * amount of elements in an array.
 * 
 * @param {Array} array: The array over which to iterate.
 * @param {Number} num: The number of indexes starting from the last element
 * of the array that will be returned. If left empty the function will return
 * the last element of the array.
 * 
 * @return {Array}: will return a new array with a length equal to the lesser 
 * of the second parameter and the length of the given array. If an array 
 * is not given an empty array will be returned. the last element in the 
 * returned array will be equal to the last element in the given array. 
 * 
 * Usage:
 * 
 *      var input =[1,2,3,4];
 *      var result = last(input, 2);
 *      console.log(result); // -> [3,4]  
 * 
*/
function last (array, num) {
    //console.log(array.reverse());
    if(!(Array.isArray(array))) return [];
    if(typeof num !== "number") return array[array.length-1];
    else if (num > array.length) return array;
    else {
        var result =[];
        for (var i = array.length-num; i < array.length; i++){
            result.push(array[i]);
        }
        return result;
    }
}
/** 
 * 
 * indexOf: Designed to return the index of the first occurance of a given
 * value. or -1 if the value is not contained within any of the elements
 * in the array.
 * 
 * @param{Array} array: The array over which to iterate.
 * @param{Value} value: The value with whcih to seach the array for.
 * 
 * @return{Number}: will return a number represented the index, or -1 if
 * the given value is not found in the array.
 * 
 * Usage:
 * 
 *      var input =['a','b','c','d'];
 *      var result = indexOf(input, 'c');
 *      console.log(result); // -> 2
 * 
*/
function indexOf (array, value) {
   for (var i = 0; i < array.length; i++){
        if(array[i] === value) return i;
   }
    return -1;
}

/**
 * 
 * filter: Designed to iterate through and array and return a new array
 * containing all the elements which returned true from calling function.
 *
 * @param {Array} array: the array over which to iterate.
 * @param {Function} action: The function to apply to each element
 * in the array. action is looking for a Boolean expression from the
 * passed in function. *Make sure action returns a Boolean*
 * 
 * @return {Array}: will return a new array consiting of elements for which the
 * calling function returned true for. 
 * 
 * Usage: 
 * 
       var input = [1,2,3,4];
       var result = filter(input, (e => e%2 !== 0));
       console.log(result); // -> [1,3]
*/




function filter (array, action) {
    var result = [];
    each(array,((element, index, collection) => {
        if(action(element, index, collection)) result.push(element); 
    }));
    return result;
}

/**
 * 
 * reject:Designed to iterate through and array and return a new array
 * containing all the elements which returned false from calling function.
 *
 * @param {Array} array: the array over which to iterate.
 * @param {Function} action: The function to apply to each element
 * in the array. action is looking for a Boolean expression from the
 * passed in function. *Make sure action returns a Boolean*
 * 
 * @return {Array}: will return a new array consiting of elements for which the
 * calling function returned false for. 
 * 
 * Usage: 
 * 
 *      var input = [1,2,3,4];
 *      var result = reject(input, (e => e%2 !== 0));
 *      console.log(result); // -> [2,4]
*/

function reject (array, action) {
    var result = [];
    filter(array, ( (element, index, collection) => { 
        if(!(action(element, index, collection))) result.push(element);
        } )  );
    return result;
}


/**
* 
* partition: Designed to take an array and return a new array 
* that contains two subarrays.
* 
* @param {Array} array: The array or collection over which to iterate.
* @param {Function} action: The function that will be passed agaisnt all the
* elements in the given array or collection. The passed in function must return
* a Boolean value or it will not work.
* 
* @return: {Array} Inside one of these sub-arrays are all the elements which 
* returned true from the passed in function. And in the other sub-array are
* all the elements which returned false from the passed in function.
* 
* 
* Usage:
* 
*      var input = [1,2,3,4];
*      var result = partition(input, (e => e%2 !== 0));
*      console.log(result); // -> [[1,2],[2,4]];  
* 
*/
function partition (array, action) {
    var result = [[],[]];
    each(array, ( (element, key, collection) => {
        if(action(element, key, collection)) result[0].push(element);
        else if(!(action(element, key, collection))) result[1].push(element);        
        }));
    return result;
}


/** 
* 
* unique: Designed to take an array and return a new array with only unique 
* values. Removes duplicate values from an array. 
* 
* @param {Array} an array: the array you wish to have without duplicates.
* 
* @return {Array}: This function uses indexOf to push items into the returned
* array that do not already exist in the array to be returned.
* 
* Usage:
* 
*       console.log(unique([1,2,2,4,5,6,5,2])); // -> [1,2,4,5,6]
*/


function unique (array) {
    var result = [];
    for(var i =0; i<array.length; i++){
    let index =(indexOf(array, array[i]));
    //if the current value is not included in the result array then push it
    if(!(result.includes(array[i]))) result.push(array[indexOf(array, array[i])]);
    }
    return result;
}

/**
*
* map: Designed to take a collection and return a new array containing the 
* result of the given function over applied to each one of the elements/values. 
* 
* @param: {Object or Array} collection: the collection or array in wish you
* wish to iterate over. 
* @param {Function} action: the action you wish to perform all on the 
* elements/values in the given collection.
* 
* @return {Array}: Will return a new array with a length equal in length of 
* given array. 
*
* Usage: 
* 
*   console.log(map([1,2,3,4], e=>{return e * 2})); -> [2,4,6,8]
*/
function map  (collection, action) {
    var result =[];
    each(collection, (element, index, collection) => {
        result.push((action(element, index, collection)));     
    });        
    return result;
} 
/**
* 
* pluck: Designed to iterate over an array of objects and return a new array 
*  of values which are attached to a specific and given key. 
*
* @param {An array of objects} array: An array containing the objects you wish
* to search through the values for a specific key.*Must be an array of objects.*
* @param {String (property name)} property: The name of the property you wish 
* to pull values from in across an array of objects.*This value must be the 
* name of the property as a string.*
*
* @return {Array}: It returns an array containing all the values in the
* an array that are associated with the given key.
* 
* Usage:
* 
*   var arrayOfObjects =[{key1: 'value1'},{key1: 'value2'},{key1: 'value3'}]; 
*   var result = pluck(arrayOfObjects, "key1");
*   console.log(result); // -> ['value1','value2','value3']
*   
*/
function pluck  (array, property) {
  var result = [];
  map(array, (element, index, collection) =>{
      result.push(element[property]);
  } );
  return result;
    
}
/**
* 
* contains: Designed to return a Boolean reflecting the existence of a given
* value within a given array.
* 
* @param {Array} array: Give the array you wish to search through.
* @param {A value} value: any value you want to check the elements of the given
* array for.
* 
* @return {Boolean}: will return a Boolean value of true or false.
* 
* Usage:
*   console.log(contains([1,"two", 3.14], "two")); // -> true
* 
*/
function contains(array, value){
    return array.includes(value) ? true : false;
}

/**
*  
* every: Designed to take a function, apply it to each element or value 
* in a collection, and return a Boolean of true if the action on every element 
* returns true, else it will return false.    
* 
* @param {An Array or Object} collection: The array or object of which you wish
* to iterate over.
* @param {Function} action: The function that will be passed agaisnt all the
* elements in the given array or collection. 
* **The passed in function must return a Boolean value or it will not work.** 
* 
* @return{Boolean}: will return true only if all elements in the given 
* collection resolve to true when the action passed in is applied to them.
* If action is left empty or not a function and all elements resolve to truthy 
* values the return will be true. If even one element resolves to false, 
* false will be returned.
* 
* Usage:
*   console.log(every([2,4,6], function(e){return e % 2 === 0})); -> true
*   console.log(every([1,2,3], function(e){return e % 2 === 0})); -> false
*/
function every(collection, action) {
    var result =true;
    if(!action){
     action = identity;
    }
    each(collection, (e,i) => {
        if(!action(e)) result= false;
    });
  return result;
}

/**
* 
* some: Designed to take a collection, apply a given function returning Boolean
* to all elements/value in the collection, and return true if any of the 
* elements/values resloved to true. This is the similar to <every()>, but will 
* return true if 1 or more elements pass the test.
* This function makes use of <filter> which returns an array of values that return
* the same Boolean. By comparing the length of this array with the orginal array
* we can infer if any of the elements resolved to the same Boolean expression 
* or not.
* 
* @param {An Array or Object} collection: The array or object of which you wish
* to iterate over.
* @param {Function} action: The function that will be passed agaisnt all the
* elements in the given array or collection. 
* **The passed in function must return a Boolean value or it will not work.** 
* 
* @return {Boolean}: true if any elements return true from the function passed 
* in. False if none of the elements return true.

* Usage:
*   console.log(some([1,3,5], function(e){return e % 2 === 0})) // -> false
*   console.log(some([1,2,3], function(e){return e % 2 === 0})) // -> true
*/
function some (collection, action) {
    var result;
    if(typeof action != "function" ){
      each(collection, function(element, index, collection){
        if((!!(element))) result =true;
        else result = false;
        });
    }else{
        var filter = filter(collection, action);
        filter.length === 0 ? result = false : result = true;
        return result;
    }
 return result;   
}

/**
* 
* reduce: Designed to take a collection and return a single value based on
* the last function call. Performs iteration through an entire array or object,
* returning the result to be passed in again through the next iteration.
* 
* @param {Array} array: the collection over which you wish to iterate.
* @param {Function} action: The function you wish to apply to the 
* elements/values in the collection supplied in the preceeding parameter 
* @param {*} seed: This is the starting value for the first iteration.
* It must be also be returned within the callback function so that it 
* can be passed in again during the next interation. The value of seed
* after the last iteration is return.
* "Set the Seed to what you Need" ie. use the seed to set your datatype
* 
* @return {*}: Will return any single value performed by the last function 
* call. 
*
* Usage:
*   console.log(reduce([1,2,3], (sum, number) => { return sum + number}, 0));
*       // -> 6
*/
function reduce (array, action, seed) {
//pass the action onto every element in the collecion
//pass the result from the action back into the function
//(seed === undefined) ? return seed = element : return seed = action(seed, element, index) });  
each(array, function(element,index,array){
    (seed === undefined) ? seed = element : seed = action(seed, element, index);
    });
 return seed;   
}
/** 
* 
* extend: Designed to copy properties from object2 into object1. It will overwrite
* any values that share the same key name and add new key/value pairs for those that
* exist in object2 but not in object1. additonal objects can be after after object 2
* and will be copied into object 1 with the last argument value being the last applied.
*
* @param {Object} object1: This is where all properties will be copied too and returned.  
* @param {Object} object2: This is what properties will be copied to the preceeding 
* object argument. The properties in this object will be copied into object1.
* @param {Object} nextObj : can pass in more objects as sources. They will all be 
* copied to the first object argument, <object1>, in order from left to right as
* listed in the function call parenthesis.
* 
* @return {Object}: Will return object 1 with its properties updated by the 
* subsequent object arguments.
* 
* Usage:
*   var data = {a:"one"};
*   extend(data, {b:"two"});
*   console.log(data); //->  {a:"one",b:"two"}
*   extend(data, {a:"two"});
*   console.log(data); //-> {a:"two"}
*/

function extend  (object1, object2, nextObj) {
    for(var key in object1) {
        Object.assign(object1, object2, nextObj);
    }
    return object1;
}

 
module.exports.each = each;
module.exports.first = first;
module.exports.last = last;
module.exports.indexOf = indexOf;
module.exports.filter = filter;
module.exports.reject = reject;
module.exports.partition = partition;
module.exports.unique = unique;
module.exports.map = map;
module.exports.pluck = pluck;
module.exports.contains = contains;
module.exports.every = every;
module.exports.some = some;
module.exports.reduce = reduce;
module.exports.extend = extend;
module.exports.identity = identity;
module.exports.typeOf = typeOf;