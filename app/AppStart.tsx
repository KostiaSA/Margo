import * as React from "react";
import * as ReactDOM from "react-dom";
import {init} from "./buhta-core/init";
import {MainPage3} from "./buhta-core/main-page/MainPage3";
import {MainPage2} from "./buhta-core/main-page/MainPage2";
import {TestPage1} from "./buhta-core/main-page/TestPage1";
import {SchemaDesigner} from "./buhta-core/designer/SchemaDesigner";

init();


ReactDOM.render(
    (
        <SchemaDesigner>

        </SchemaDesigner>
    ),
    document.getElementById("container")!//,
    //()=>registeredAllRoutes()
);
