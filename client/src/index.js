import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "./assets/app.css";

import "materialize-css/dist/css/materialize.min.css";

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
