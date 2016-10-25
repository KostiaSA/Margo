import * as React from "react";
import * as ReactDOM from "react-dom";

let ReactGridLayout = require('react-grid-layout');


export class GridLayout2 extends React.Component<any, any> {

    render() {
        // layout is an array of objects, see the demo for more complete usage
        var layout = [
            {i: 'a', x: 0, y: 0, w: 1, h: 2, static: false},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
            {i: 'c', x: 4, y: 0, w: 1, h: 2}

        ];
        return (
            <ReactGridLayout className="layout" style={{ border:"1px solid green"}} layout={layout} cols={12}
                             rowHeight={30} width={1200}>
                <div style={{ border:"1px solid red"}} key={'a'}>asssssss</div>
                <div style={{ border:"1px solid blue"}} key={'b'}>b</div>
                <div style={{ border:"1px solid black"}} key={'c'}>c</div>
            </ReactGridLayout>
        )
    }
}
