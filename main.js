var kosen10sJson = $.getJSON("./kosen10s.json");

var width = 1200,
    height = 1000;

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var color = d3.scale.category20();

var mercator = d3.geo.mercator()
    .center([136.0, 35.6])
    .translate([width / 2, height / 2])
    .scale(1200);

var geopath = d3.geo.path()
    .projection(mercator);

d3.json("pref.json", function (error, jp) {

    for (let i = 1; i < jp.features.length; i++) {
        jp.features[i]["kosen10s_count"] = 0;
        kosen10sJson.responseJSON.items.forEach(item => {
            if (jp.features[i].properties.name_local == item.pref) {
                jp.features[i]["kosen10s_count"] += item.population;
            }
        });
    }

    svg.selectAll("path")
        .data(jp.features)
        .enter().append("path")
        .attr("class", function (d) {
            return d.id;
        })
        .attr("d", geopath)
        .attr("fill", function (d) {
            return `rgb(255,${240 - d.kosen10s_count * 40},${240 - d.kosen10s_count * 40})`
        });
});

