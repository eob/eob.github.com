/*
 * Useful constants
 */
var MAN = 0;
var WOMAN = 1;
var PEE = 0;
var POOP = 1;

var costs = {
  "woman": {
  },
  "man": {
  }
};

costs["woman"]["policy1"] = function()
  return 0;
};

costs["man"]["policy1"] = function(whoGoes, action, penalty) {
  return action[MAN][PEE] * penalty;
};

costs["man"]["policy1prime"] = function(whoGoes, action, penalty) {
  return 2 * action[MAN][PEE] * penalty;
};

costs["woman"]["policy2"] = function(whoGoes, action, penalty) {
  return whoGoes[MAN] * action[MAN][PEE] * penalty;
};

costs["man"]["policy2"] = function(whoGoes, action, penalty) {
  return (
    (penalty * action[MAN][POOP] * (whoGoes[MAN] * action[MAN][PEE])) +
    (penalty * action[MAN][PEE] * (whoGoes[MAN] * action[MAN][POOP] + whoGoes[WOMAN]))
  );
};

// Builds a dictionary of costs
var getData = function() {
  var phim = parseFloat($("#whoGoesMore").slider("value"));
  var whoGoes = [phim, 1-phim];
  var phimpee = parseFloat($("#whatHeDoes").slider("value"));
  var action = [
    [1-phimpee, phimpee]
  ];
  var penalty = 1;
  var CM1 = costs.man.policy1(whoGoes, action, penalty);
  var CM1P = costs.man.policy1prime(whoGoes, action, penalty);
  var CM2 = costs.man.policy2(whoGoes, action, penalty);
  var CW1 = costs.woman.policy2(whoGoes, action, penalty);
  var CW2 = costs.woman.policy2(whoGoes, action, penalty);
  return {
    "forLookup": {
      "man": {
        "policy1": CM1,
        "policy1prime": CM1P,
        "policy2": CM2
      },
      "woman": {
        "policy1": CW1,
        "policy1prime": CW1,
        "policy2": CW2
      },
      "total": {
        "policy1": CM1 + CW1,
        "policy1prime": CM1P + CW1,
        "policy2": CW2 + CM2
    },
    "forD3": [
    {"Policy": "Policy 1",
     "Man": CM1,
     "Woman": CW1},
    {"Policy": "Policy 1-Prime",
     "Man": CM1P,
     "Woman": CW1},
    {"Policy": "Policy 2",
     "Man": CM2,
     "Woman": CW2}
    ]
  }
};

// Updatedata
var updateData = function(costs) {
  $("#cm1").html(costs.forLookup.man.policy1.toFixed(2));
  $("#cw1").html(costs.forLookup.woman.policy1.toFixed(2));
  $("#cm1p").html(costs.forLookup.man.policy1prime.toFixed(2));
  $("#cw1p").html(costs.forLookup.woman.policy1prime.toFixed(2));
  $("#cm2").html(costs.forLookup.man.policy2.toFixed(2));
  $("#cw2").html(costs.forLookup.woman.policy2.toFixed(2));
  $("#cj1").html(costs.forLookup.total.policy1.toFixed(2));
  $("#cj1p").html(costs.forLookup.total.policy1prime.toFixed(2));
  $("#cj2").html(costs.forLookup.total.policy2.toFixed(2));
}

var onDataUpdated = function() {
  var data = getData();
  updateData(data);
  updateChart(data)
}

window.viz = null;

var updateChart = function() {
}

// http://bl.ocks.org/benjchristensen/1488375
var drawChart = function() {
}

var drawChart2 = function() {
  var w = 300,
      h = 300,
      p = [20, 50, 30, 20],
      x = d3.scale.ordinal().rangeRoundBands([0, w - p[1] - p[3]]),
      y = d3.scale.linear().range([0, h - p[0] - p[2]]),
      z = d3.scale.ordinal().range(["lightblue", "lightpink"]);
  
  var svg = d3.select("#chart").append("svg:svg")
      .attr("width", w)
      .attr("height", h)
      .append("svg:g")
      .attr("transform", "translate(" + p[3] + "," + (h - p[2]) + ")");
  
  var data = getData();
  
  // Transpose the data into layers by person.
  var genders = d3.layout.stack()(["Man", "Woman"].map(function(gender) {
    return data.map(function(d) {
      return {x: d.Policy, y: d[gender]};
    });
  }));

    // Compute the x-domain (by date) and y-domain (by top).
  x.domain(genders[0].map(function(d) { return d.x; }));
  y.domain([0, 2]);
  //y.domain([0, d3.max(genders[genders.length - 1], function(d) { return d.y0 + d.y; })]);
  
    // Add a group for each cause.
  var gender = svg.selectAll("g.cause")
      .data(genders)
    .enter().append("svg:g")
      .attr("class", "gender")
      .style("fill", function(d, i) { return z(i); })
      .style("stroke", function(d, i) { return d3.rgb(z(i)).darker(); });
  
    // Add a rect for each policy
  var rect = gender.selectAll("rect")
      .data(Object)
      .enter().append("svg:rect")
        .attr("x", function(d) { return x(d.x); })
        .attr("y", function(d) { return -y(d.y0) - y(d.y); })
        .attr("height", function(d) { return y(d.y); })
        .attr("width", x.rangeBand());
  
    // Add a label per date.
  var label = svg.selectAll("text")
    .data(x.domain())
    .enter().append("svg:text")
        .attr("x", function(d) { return x(d) + x.rangeBand() / 2; })
        .attr("y", 6)
        .attr("text-anchor", "middle")
        .attr("dy", ".71em")
        .text(function(d) { return d; });
  
    // Add y-axis rules.
    var rule = svg.selectAll("g.rule")
        .data(y.ticks(5))
      .enter().append("svg:g")
        .attr("class", "rule")
        .attr("transform", function(d) { return "translate(0," + -y(d) + ")"; });
  
    rule.append("svg:line")
        .attr("x2", w - p[1] - p[3])
        .style("stroke", function(d) { return d ? "#fff" : "#000"; })
        .style("stroke-opacity", function(d) { return d ? .7 : null; });
  
    rule.append("svg:text")
        .attr("x", w - p[1] - p[3] + 6)
        .attr("dy", ".35em")
        .text(d3.format(",2f"));
    return svg;
};

