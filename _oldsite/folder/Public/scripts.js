module.exports.beforeRender = function(elem, data) {
  console.log("Hi there, before render!");
}

module.exports.afterRender = function(elem, data) {
  console.log("Hi there, after render!");
}