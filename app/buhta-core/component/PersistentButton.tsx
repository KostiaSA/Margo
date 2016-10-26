import * as React from "react";
import {PersistentComponent, IPersistentComponentProps} from "./PersistentComponent";
import ReactChild = React.ReactChild;
import {PersistentItemDesignToolbar, PersistentItemDesignToolItem} from "./PersistentItemDesignToolbar";

export interface IPersistentButtonProps extends IPersistentComponentProps {
    text?: string;
}

export class PersistentButton extends PersistentComponent<IPersistentButtonProps> {

    render() {
        return (
            <div {...this.props}>
                <div style={{ border:"1px solid silver", overflow:"hidden", height:"100%"}}>
                    <button className="button">
                        {this.props.text}
                        {this.getClearChildren()}
                    </button>
                    <PersistentItemDesignToolbar>
                        <PersistentItemDesignToolItem iconClass="fa fa-th-large drag-me"></PersistentItemDesignToolItem>
                        <PersistentItemDesignToolItem iconClass="fa fa-cog" isPullRight></PersistentItemDesignToolItem>
                    </PersistentItemDesignToolbar>
                    {this.getResizableHandler()}
                </div>
            </div>
        )
    }
}
