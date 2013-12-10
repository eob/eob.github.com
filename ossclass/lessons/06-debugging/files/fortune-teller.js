/* Fortune Teller . JS */
// You can think of this as an object constructor.
var FortuneTeller = function(fortuneFile, nice) {
  this._fortuneFile = fortuneFile;
  this._nice = nice;
  this._fortunes = [];
  this.init();
};

// You can think of this as a member function of FortuneTeller
FortuneTeller.prototype.init = function() {
  // Fetch the fortuen file
  $.ajax({
    url: this._fortuneFile,
    dataType: "json",
    success: function(data) {
      console.log(data);
      console.log(this);
      this._fortunes = data;
      this.tellFortune();
    }
  ,
    error: function(jqXhr, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
      console.log("The Mysterious Machine has Failed!");
    },
    context: this
  });
};

// You can think of this as a member function of FortuneTeller
FortuneTeller.prototype.tellFortune = function() {
  _.each(_.shuffle(this._fortunes), function(fortune) {
    if (fortune.kind == "nice") {
      this.displayFortune(fortune);
    }
  }, this);
};

FortuneTeller.prototype.displayFortune = function(fortune) {
  $("#theFortune").html(fortune.text);
};

