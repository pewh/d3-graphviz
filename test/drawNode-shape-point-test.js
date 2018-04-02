var tape = require("tape");
var jsdom = require("./jsdom");
var d3 = require("d3-selection");
var d3_graphviz = require("../");

tape("Verify that point shape is drawn exactly as Graphviz does.", function(test) {
    var window = global.window = jsdom('<div id="expected-graph"></div><div id="actual-graph"></div>');
    var document = global.document = window.document;
    var expectedGraph = d3.select("#expected-graph");
    var actualGraph = d3.select("#actual-graph");
    var expectedGraphviz = d3_graphviz.graphviz("#expected-graph");
    var actualGraphviz = d3_graphviz.graphviz("#actual-graph");

    expectedGraphviz
        .zoom(false)
        .renderDot('digraph {a [shape="point"]}', function () {
            actualGraphviz
                .renderDot('digraph {}', function () {
                    actualGraphviz
                        .drawNode(0, -3.6, 3.6, null, 'point', 'a', {id: 'node1'})
                        .insertDrawnNode('a');

                    expectedNodeGroup = expectedGraph.selectAll('.node');
                    expectedNodeTitle = expectedNodeGroup.selectAll('title');
                    expectedNodeShape = expectedNodeGroup.selectAll('ellipse');

                    actualNodeGroup = actualGraph.selectAll('.node');
                    actualNodeTitle = actualNodeGroup.selectAll('title');
                    actualNodeShape = actualNodeGroup.selectAll('ellipse');

                    test.equal(actualNodeGroup.attr("id"), expectedNodeGroup.attr("id"), 'id of group');

                    test.equal(actualNodeTitle.text(), expectedNodeTitle.text(), 'text of title');

                    test.equal(actualNodeShape.attr("fill"), expectedNodeShape.attr("fill"), 'fill of ellipse');
                    test.equal(actualNodeShape.attr("stroke"), expectedNodeShape.attr("stroke"), 'stroke of ellipse');
                    test.equal(actualNodeShape.attr("cx"), expectedNodeShape.attr("cx"), 'cx of ellipse');
                    test.equal(actualNodeShape.attr("cy"), expectedNodeShape.attr("cy"), 'cy of ellipse');
                    test.equal(actualNodeShape.attr("rx"), expectedNodeShape.attr("rx"), 'rx of ellipse');
                    test.equal(actualNodeShape.attr("ry"), expectedNodeShape.attr("ry"), 'ry of ellipse');

                    test.end();
                });
        });
});
