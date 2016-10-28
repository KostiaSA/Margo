import * as React from "react";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";
import ReactChild = React.ReactChild;
import {PersistentItemDesignToolbar, PersistentItemDesignToolItem} from "./PersistentItemDesignToolbar";

const SortableTree = require("react-sortable-tree").default;

console.log(require("react-sortable-tree").exports);
console.log(SortableTree);

export interface IPersistentTreeListProps extends IPersistentComponentProps {
    text?: string;
}

export class PersistentTreeList extends PersistentComponent<IPersistentTreeListProps> {

    treeData:any[];

    render() {
        if (this.treeData===undefined)
            this.treeData= [
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
                { title: <div>пиздец</div>, children: [ { title: 'Egg' } ] },
            ];

        return (

                <SortableTree
                    rowHeight={30}
                    treeData={this.treeData}
                    onChange={(treeData:any) => this.setState({ treeData })}
                />

        )
    }
}
