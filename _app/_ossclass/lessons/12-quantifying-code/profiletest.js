var Profiler = require('./profiling');

// Now we wrap it
var profiler = new Profiler();


var OtherObject = {
  doSomething: function() {
    var j = "";
    for (var i = 0; i < 200000; i++) {
      j = "Number" + i;
    }
    console.log(j);
  }
}



profiler.profile(OtherObject, 'doSomething');

// Just continue to use it

OtherObject.doSomething();


// Now we can insepct results

console.log(profiler.timing, profiler.funcNames);
