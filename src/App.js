import React, { Component } from "react";
import { Header, Segment, Container, Icon } from "semantic-ui-react";
import EntryForm from "./components/form";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header
          className="App-header"
          inverted
          color="blue"
          as="h1"
          textAlign="center"
        >
          Miroir & Sport
          <Header.Subheader>
            L&apos;application de création de fiche technique ;-)
          </Header.Subheader>
        </Header>
        <EntryForm />
        <Segment className="footer" basic color="blue">
          <Container>
            <Icon name="code" /> with <Icon name="heart" /> by Jehan ~ 2018 ~ All Rights Reserved
          </Container>
        </Segment>
      </div>
    );
  }
}

export default App;
