import * as React from "react";
import * as ReactDOMServer from "react-dom/server";

export function renderToStaticHtml(element: React.ReactElement<any>): string {
    return ReactDOMServer.renderToStaticMarkup(element);
}
