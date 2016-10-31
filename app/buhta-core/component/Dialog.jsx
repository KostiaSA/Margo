"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var ReactGridLayout = require('react-grid-layout');
var GridLayout = (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout() {
        _super.apply(this, arguments);
    }
    GridLayout.prototype.render = function () {
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
            { i: 'a', x: 0, y: 0, w: 1, h: 2, static: false },
            { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 14 },
            { i: 'c', x: 4, y: 0, w: 1, h: 2 },
            { i: 'd', x: 0, y: 0, w: 4, h: 4 }
        ];
        return (<ReactGridLayout className="layout" style={{ border: "1px solid green" }} draggableHandle=".xxx" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div style={{ border: "1px solid red" }} key={'a'}>asssssss <span className="xxx">dragm-i</span></div>
                <div style={{ border: "1px solid blue" }} key={'b'}>b</div>
                <div style={{ border: "1px solid black" }} key={'c'}>c</div>

                <div style={{ border: "2px solid black" }} key={'d'}>
                    <span className="xxx">DRAG</span>
                    <GridLayout2></GridLayout2>
                </div>
            </ReactGridLayout>);
    };
    return GridLayout;
}(React.Component));
exports.GridLayout = GridLayout;
