import * as React from "react";
import * as ReactDOM from "react-dom";
import {TestPage} from "./TestPage";
import {init} from "./buhta-core/init";

init();


ReactDOM.render(
    (
        <TestPage>

        </TestPage>
    ),
    document.getElementById("container")!//,
    //()=>registeredAllRoutes()
);
