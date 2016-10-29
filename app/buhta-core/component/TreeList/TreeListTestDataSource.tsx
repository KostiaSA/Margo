import * as React from "react";
import {ITreeListDataSource, ITreeListDataSourceNode} from "./TreeListDataSource";
import {getInstantPromise} from "../../utils/getInstantPromise";

export class TreeListTestDataSource implements ITreeListDataSource<ITreeListDataSourceNode> {
    getNodes(): Promise<ITreeListDataSourceNode[]> {

        let nodes: ITreeListDataSourceNode[] = [];

        for (let i = 0; i < 20; i++) {
            let node: ITreeListDataSourceNode = {
                title: "нода N" + i,
                key:i
            };

            if (i%5===0){
                node.children=[{folder:true, title: <div>жопа!! {i} <div>жопа!! {i}</div> <div>жопа!! {i}</div> <div>жопа!! {i}</div> </div>,
                    key:i}]
            }

            nodes.push(node);
        }

        return getInstantPromise(nodes);

    }
}
