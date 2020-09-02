import React, { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const url = "https://randomuser.me/api/?results=1";
const refreshIcon = <FontAwesomeIcon icon={faRedoAlt} />;

class App extends Component {
  state = {
    user: [],
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw Error(response.status + " " + response.statusText);
      })
      .then((data) => {
        const user = data.results;

        this.setState({
          user,
        });
      });
  };

  refresh = () => {
    setTimeout(()=> {
      this.fetchData()
    },500)
  }

  render() {
    const user = this.state.user.map((user) => (
      <div className="mainContainer" key={user.login.uuid}>
        <span className="refreshIcon" onClick={this.refresh}>{refreshIcon}</span>
        <span className="userInfo">
          <span className="userImg">
            <img src={user.picture.large} alt="xD" />
            <span>
              {user.name.title} {user.name.first} {user.name.last}
            </span>
          </span>
          <span className="gridContainer">
            <span className="gridItems">
              <strong>Email: </strong> {user.email}
            </span>
            <span className="gridItems">
              <strong>Phone: </strong> {user.phone}
            </span>
            <span className="gridItems">
              <strong>Country: </strong> {user.location.country}
            </span>
            <span className="gridItems">
              <strong>City: </strong> {user.location.city}
            </span>
          </span>
        </span>
      </div>
    ));
    return <div className="App">{user}</div>;
  }
}

export default App;
