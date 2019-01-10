import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container, Row} from 'reactstrap';
import Saved from "./pages/Saved";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div>
        <Container>
          <Row>
            <Header />
            <Navbar />
          </Row>
        </Container>
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/books" component={Saved} />
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
