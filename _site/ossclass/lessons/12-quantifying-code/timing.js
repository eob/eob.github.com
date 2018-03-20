
function measureTime(otherFunction, iterations) {
  var start = new Date().getTime();

  for (var i = 0; i < iterations; i++) {
    otherFunction();
  }

  var end = new Date().getTime();
  return (end - start);
}


var allocWithPush = function() {
  var a = [1];
  a.push(2);
}

var allocWithIndex = function() {
  var a = [1];
  a[a.length] = 2;
}

console.log(measureTime(allocWithPush, 1000000));
console.log(measureTime(allocWithIndex, 1000000));

