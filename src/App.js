import "./App.css";
import Signin from "./components/Signin";
import Main from "./components/Main";
import { connect } from "react-redux";
import { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          {/* {!this.props.user ? <Redirect to="/signin" /> : <Redirect to="/" />} */}
          <Switch>
            <Route path="/signin" component={Signin} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userPhoto: state.userPhoto,
  };
};

export default connect(mapStateToProps)(App);
