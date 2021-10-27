module.exports.sortArray = function sortArray(arrayString) {
    var array = JSON.parse(arrayString);
    array.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    return JSON.stringify(array);
  };
  
 