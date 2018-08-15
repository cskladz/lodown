'use strict';

// YOU KNOW WHAT TO DO //

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
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
 * If an array is not given and empty array will be returned.
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
 * 
 * last: Designed to return a new array containing the last of a specified
 * amount of elements in an array.
 * 
 * @param {Array} array: The array over which to iterate.
 * @param {Number} num: The number of indexes starting from the last element
 * of the array that will be returned. If left empty the function will return
 * the last element of the array.
 * 
 * If an array is not given and empty array will be returned.
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
 * reject: Designed to iterate through and array and return a new array
 * containing all the elements which returned false from calling function.
 * 
 * @param {Array} array: the array over which to iterate.
 * @param {Function} action: The function to apply to each element
 * in the array. <action> is looking for a Boolean expression from the
 * passed in function. *Make sure action returns a Boolean*  
*/
function reject (array, action) {
    var result = [];
    filter(array, ( (element, index, collection) => { 
        if(!(action(element, index, collection))) result.push(element);
        } )  );
    return result;
}
console.log(reject([1,2,3,4], (e) => {return e%2 === 1}));
/**
 * 
 * partition: Designed to take an array and return a new array 
 * that contains two subarrays.
 * Inside one of these sub-arrays are all the elements which returned true
 * from the passed in function. And in the other sub-array are all the 
 * element which returned false from the passed in function.
 * 
* @param {Array} array: The array or collection over which to iterate.
* @param {Function} action: The function that will be passed agaisnt all the
* elements in the given array or collection. The passed in function must return
* a Boolean value or it will not work. 
* 
*/
function partition (array, action) {
    var result = [[],[]];
    each(array, ( (element, key, collection) => {
        if(action(element, key, collection)) result[0].push(element);
        else if(!(action(element, key, collection))) result[1].push(element);        
        //else return "What the hell am I doing here?? I must not be Boolean\n";
        }));
    return result;
}

/** _.unique()
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/

//apply indexOf as the function to pass into .each....
//use indexOf 

//if match
    //splice?....
    //indexOf requires an array and a value. to do what?? to find duplicates matching arrays
        //want to use the <resolved expression of _.each> as the value parameter in indexOf
            //need to make an action to pass into .each that acts as a function which will return the value of th element in given array
    //splice out returned indexes from indexOf;
function unique (array) {
    var result = [];
    for(var i =0; i<array.length; i++){
    let index =(indexOf(array, array[i]));
    //if the current value is not included in the result array then push it
    if(!(result.includes(array[i]))) result.push(array[indexOf(array, array[i])]);
    }
    return result;
}

/** _.map()
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) call <function> for each element in <collection> passing the arguments:
*        if <collection> is an array:
*            the element, it's index, <collection>
*        if <collection> is an object:
*            the value, it's key, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/
function map  (collection, action) {
    var result =[];
    each(collection, (element, index, collection) => {
        result.push((action(element, index, collection)));     
    });        
    return result;
} 
/** _.pluck()
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/
function pluck  (array, property) {
  var result = [];
  map(array, (element, index, collection) =>{
      result.push(element[property]);
  } );
  return result;
    
}
/** _.contains()
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Gotchas:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
* 
*/
function contains(array, value){
    return array.includes(value) ? true : false;
}

/** _.every()
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
*   2) If the return value of calling <function> for every element is true, return true
*   3) If even one of them returns false, return false
*   4) If <function> is not provided, return true if every element is truthy, otherwise return false
* Gotchas:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/
function every  (collection, action) {
  var result;
  if(typeof action != "function" ){
      each(collection, function(element, index, collection){
            if((!!(element))) result =true;
            else result = false;
            return result;
        });
  }
  else {  
      var reject = reject(collection,action);
    reject.length === 0 ? result = true : result = false;
  }
 return result;
}

    //else if(_.filter(collection, action)) return true;
    //call function for every element (.each should meet both requests for iterating over an object and/or an array with said parameters)
    //console.log(_.reject(collection, action));
    //pass function over every element in an array or object
    
    //if(action(e) === true) for every iteration return true
        //if(!action(e)) for any iteration return false. 
        
    //if function is not provided, run !! agaiasnt every value and return true if all true else false. 
//   if(action === undefined){
//       _.each(collection, function(element, index, collection){
//             if((!!(element))) result =true;
//             else result = false;
//             console.log(result);
//             return result;
//         });
//   }
//   else{
//         _.each(collection, function(element, index, collection){
//             if(action(element)) result = true;
//             else result = false;
//             console.log(result);
//             return result;
//             //result.push(action(element));
            
//         });
//   }

//run the collections through .filter and .reject and infer presence of a falsey statemtns by comparing the lengths of the returning arrays....check if returning array includes any false statements.....
//  for example, if i send the same array and function to .filter and .reject, .filter will only fill up true values, if that returning length is less than the length of array sent to it, we can infer not all statements were true.
//  or, similary we can send it through .reject. if it returns an empty array then return true, else, false.

//     var result1;
//     var result2;
//     console.log(Boolean(collection.length === _.filter(collection, action).length));
//     //console.log((_.filter(collection, function(e){return Boolean(collection[e])})));
//     if(action === undefined && collection.length === _.filter(collection, function(e,i,a){return Boolean(e)} ).length) result1 = true;
        
//     // && (_.filter(collection, function(e){return Boolean(collection[e])}) === true)) return true;
//     if(action === undefined && collection.length === _.reject(collection, action).length) result1 = false;
//     _.each(collection, (element, index, collection) =>{
//     if(action(element, index, collection)) result2 = true;
//     else result2 = false;
//     });
//   return result1; 
// };
/** _.some()
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*       if <collection> is an array:
*        current element, it's index, <collection>
*       if <collection> is an object:
*        current value, current key, <collection>
*   2) If the return value of calling <function> is true for at least one element, return true
*   3) If it is false for all elements, return false
*   4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Gotchas:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/
function some (collection, action) {
    var result;
     if(typeof action != "function" ){
      each(collection, function(element, index, collection){
            if((!!(element))) result =true;
            else result = false;
            return result;
        });
  }
  else{
    var filter = filter(collection, action);
    filter.length === 0 ? result = false : result = true;
    return result;
  }
    
 return result;   
}

/** _.reduce()
* Arguments:
*   1) An array
*   2) A function
*   3) A seed
* Objectives:
*   1) Call <function> for every element in <collection> passing the arguments:
*         previous result, element, index
*   2) Use the return value of <function> as the "previous result"
*      for the next iteration
*   3) On the very first iteration, use <seed> as the "previous result"
*   4) If no <seed> was given, use the first element/value of <collection> as <seed>
*   5) After the last iteration, return the return value of the final <function> call
* Gotchas:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(previousSum, currentValue, currentIndex){ return previousSum + currentValue }, 0) -> 6
*/
function reduce (array, action, seed) {
//pass the action onto every element in the collecion
//var result1 = _.each(array, action); 
//pass the result from the action back into the function
  
each(array, function(element,index,array){
            if(seed === undefined /* || typeof seed === "false"*/){
                return seed = element;
            } 
            else {
                return seed = action(seed, element, index);
        
                }
    });
 return seed;   
}

/** _.extend()
* Arguments:
*   1) An Object
*   2) An Object
*   ...Possibly more objects
* Objectives:
*   1) Copy properties from <object 2> to <object 1>
*   2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*   3) Return the update <object 1>
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/

function extend  (object1, obj2, nextObj) {
    for(var key in object1) {
        Object.assign(object1, obj2, nextObj);
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