import * as React from "react";
import * as ReactDOM from "react-dom";
import {TestPage} from "./TestPage";
import {init} from "./buhta-core/init";
import {MainPage} from "./buhta-core/main-page/MainPage";
import {MainPage2} from "./buhta-core/main-page/MainPage2";

init();


ReactDOM.render(
    (
        <MainPage2>

        </MainPage2>
    ),
    document.getElementById("container")!//,
    //()=>registeredAllRoutes()
);
