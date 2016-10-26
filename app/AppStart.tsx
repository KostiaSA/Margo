import * as React from "react";
import * as ReactDOM from "react-dom";
import {TestPage} from "./TestPage";
import {init} from "./buhta-core/init";
import {MainPage} from "./buhta-core/main-page/MainPage";

init();


ReactDOM.render(
    (
        <MainPage>

        </MainPage>
    ),
    document.getElementById("container")!//,
    //()=>registeredAllRoutes()
);
