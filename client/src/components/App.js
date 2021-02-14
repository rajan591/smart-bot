import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Landing from "./pages/Landing";

import Header from "./Header";
import Chatbot from "./chatbot/Chatbot";
import Reccom from "./pages/Reccom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Landing} />

        <Route exact path="/about" component={Reccom} />

        <Chatbot />
      </BrowserRouter>
    </div>
  );
};

export default App;
