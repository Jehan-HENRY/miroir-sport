import React, { Component } from "react";
import { Container, Form, Button, Message, Icon } from "semantic-ui-react";

class EntryForm extends Component {
  render() {
    return (
      <Container className="MainView">
        <Message
          attached
          header="Bienvenue dans l'application !"
          content="Il faut remplir les champs ci-dessous puis valider pour éditer une nouvelle fiche."
        />
        <br />
        <br />
        <Form>
          <Form.Group widths="equal">
            <Form.Input required label="Référence" placeholder="Référence" />
            <Form.Input required label="Titre" placeholder="Titre" />
          </Form.Group>
          <Form.Input label="Nom du produit" placeholder="Nom du produit" />
          <Form.TextArea
            required
            label="Description"
            placeholder="Description"
          />
          <Form.Input label="Norme" placeholder="Norme" />
          <Button animated>
            <Button.Content visible>Ajouter photo</Button.Content>
            <Button.Content hidden>
              <Icon name="plus" />
            </Button.Content>
          </Button>
          <br />
          <br />
          <br />
          <br />
          <Form.Checkbox label="J'ai tout renseigné, y a plus qu'à éditer !" />
          <Button animated>
            <Button.Content visible>Valider</Button.Content>
            <Button.Content hidden>
              <Icon name="right arrow" />
            </Button.Content>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default EntryForm;
