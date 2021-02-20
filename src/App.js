import "./App.css";
import Signin from "./components/Signin";
import { connect } from "react-redux";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hii {this.props.user} </h1>
        <Signin />
      </div>
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
