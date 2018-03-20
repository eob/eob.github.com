var Profiler = function() {
  this.timing = [];
  this.objects = [];
  this.funcNames = [];
};

Profiler.prototype.profile = function(object, funcName) {

  var self = this;
  var theFunction = object[funcName];
  var theIndex = this.timing.length;

  this.timing.push(0);
  this.objects.push(object);
  this.funcNames.push(funcName);

  var wrappedFunc = function() {
    var start = new Date().getTime();
    theFunction();
    var end = new Date().getTime();
    self.timing[theIndex] += (end - start);
  }

  // Replace it with wrapped
  object[funcName] = wrappedFunc;
};


// Now down here

module.exports = Profiler;
