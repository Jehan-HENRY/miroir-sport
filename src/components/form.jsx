import React, { Component } from "react";
import $ from "jquery";
import {
  Grid,
  Container,
  Form,
  Button,
  Message,
  Icon,
  Modal,
  Header
} from "semantic-ui-react";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import background from "../img/background.jpg";
import footer from "../img/footer.jpg";
import logo from "../img/logo.jpg";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEdit: false,
      toggleModal: false,

      reference: "",
      product: "",
      description: "",
      characteristics: "",
      dimensions: "",
      standards: "",
      images: "",

      background: "",
      footer: "",
      logo: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
  }

  handleSubmit() {
    this.setState({
      reference: "",
      product: "",
      description: "",
      characteristics: "",
      dimensions: "",
      standards: "",
      toggleModal: !this.state.toggleModal
    });
  }

  getDataUri(url, callback) {
    var image = new Image();
    image.onload = function() {
      var canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(this, 0, 0);
      callback(canvas.toDataURL("image/jpeg"));
    };
    for (let property in url) {
      image.src = url[property];
    }
  }

  componentDidMount() {
    this.getDataUri({ background }, dataUri => {
      this.setState({
        background: dataUri
      });
    });
    this.getDataUri({ footer }, dataUri => {
      this.setState({
        footer: dataUri
      });
    });
    this.getDataUri({ logo }, dataUri => {
      this.setState({
        logo: dataUri
      });
    });
    document
      .getElementById("files")
      .addEventListener("change", this.handleFileSelect, false);
  }

  handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
      // Only process image files.
      if (!f.type.match("image.*")) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (theFile => {
        return e => {
          // Render thumbnail.
          var span = document.createElement("span");
          span.innerHTML = [
            "<span>",
            '<img class="thumb" src="',
            e.target.result,
            '" title="',
            escape(theFile.name),
            '"/>',
            '<a class="delete">&times;</a>',
            "</span>",
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          ].join("");
          document.getElementById("list").insertBefore(span, null);
          this.setState({
            images: [...this.state.images, e.target.result]
          });
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  render() {
    $("#checkbox").change(function() {
      $("#labelUpload").toggleClass("disabled", this.checked);
    });
    console.log(this);
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    var docDefinition = {
      pageMargins: [50, 100, 50, 75],
      background: {
        image: this.state.background,
        fit: [596, 842]
      },
      footer: {
        image: this.state.footer,
        fit: [596, 77]
      },
      header: {
        columns: [
          {
            image: this.state.logo,
            fit: [279, 80]
          },
          {
            text: "Fiche Technique\nRéf: " + this.state.reference,
            style: "reference",
            alignment: "right"
          }
        ]
      },
      content: [
        {
          text: this.state.product,
          style: "product",
          alignment: "center"
        },
        {
          table: {
            widths: [200],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: "Description",
                  style: "subtitle"
                }
              ]
            ]
          },
          style: "subheader"
        },
        {
          text: this.state.description,
          alignment: "justify",
          style: "content"
        },
        {
          table: {
            widths: [200],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: "Caractéristiques",
                  style: "subtitle"
                }
              ]
            ]
          },
          style: "subheader"
        },
        {
          text: this.state.characteristics,
          alignment: "justify",
          style: "content"
        },
        {
          table: {
            widths: [200],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: "Dimensions",
                  style: "subtitle"
                }
              ]
            ]
          },
          style: "subheader"
        },
        {
          text: this.state.dimensions,
          alignment: "justify",
          style: "content"
        },
        {
          table: {
            widths: [200],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: "Normes",
                  style: "subtitle"
                }
              ]
            ]
          },
          style: "subheader"
        },
        {
          text: this.state.standards,
          alignment: "justify",
          style: "content"
        },
        {
          table: {
            widths: [200],
            body: [
              [
                {
                  border: [false, false, false, false],
                  text: "Photo",
                  style: "subtitle"
                }
              ]
            ]
          },
          style: "subheader"
        },
        {
          image: this.state.images,
          width: 350,
          alignment: "center",
        }
      ],
      styles: {
        product: {
          fontSize: 24,
          margin: [0, 0, 0, 30],
          bold: true
        },
        reference: {
          fontSize: 14,
          margin: [0, 30, 50]
        },
        subheader: {
          fontSize: 13,
          fillColor: "#007f9f",
          color: "white",
          margin: [0, 15, 0, 15]
        },
        subtitle: {
          margin: [55, 0, 0, 0]
        },
        content: {
          margin: [60, 0, 0, 0]
        }
      },
      images: {
        background: "test"
      }
    };

    return (
      <Container className="MainView">
        <Message
          attached
          floating
          header="Bienvenue dans l'application !"
          content="Il faut remplir les champs ci-dessous puis valider pour éditer une nouvelle fiche."
        />
        <br />
        <br />
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              value={this.state.reference}
              onChange={evt =>
                this.setState({
                  reference: evt.target.value
                })
              }
              required
              label="Référence"
              placeholder="Référence"
              readOnly={this.state.toggleEdit ? true : false}
            />
            <Form.Input
              value={this.state.product}
              onChange={evt =>
                this.setState({
                  product: evt.target.value
                })
              }
              required
              label="Produit"
              placeholder="Produit"
              readOnly={this.state.toggleEdit ? true : false}
            />
          </Form.Group>
          <Form.Input
            value={this.state.description}
            onChange={evt =>
              this.setState({
                description: evt.target.value
              })
            }
            label="Description"
            placeholder="Description"
            readOnly={this.state.toggleEdit ? true : false}
          />
          <Form.TextArea
            value={this.state.characteristics}
            onChange={evt =>
              this.setState({
                characteristics: evt.target.value
              })
            }
            required
            label="Caractéristiques"
            placeholder="Caractéristiques"
            readOnly={this.state.toggleEdit ? true : false}
          />
          <Form.TextArea
            value={this.state.dimensions}
            onChange={evt =>
              this.setState({
                dimensions: evt.target.value
              })
            }
            required
            label="Dimensions"
            placeholder="Dimensions"
            readOnly={this.state.toggleEdit ? true : false}
          />
          <Form.Input
            value={this.state.standards}
            onChange={evt =>
              this.setState({
                standards: evt.target.value
              })
            }
            label="Normes"
            placeholder="Normes"
            readOnly={this.state.toggleEdit ? true : false}
          />
          <Grid
            className="imagesGrid"
            columns={2}
            divided
            verticalAlign="middle"
          >
            <Grid.Row>
              <Grid.Column width={3}>
                <label
                  htmlFor="files"
                  id="labelUpload"
                  className="ui basic grey icon button"
                >
                  <i className="upload icon" />
                  &nbsp;&nbsp;Ajouter photo
                </label>
                <input
                  type="file"
                  id="files"
                  name="files[]"
                  multiple
                  style={{ display: "none" }}
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <output id="list" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <br />
          <Form.Checkbox
            toggle
            id="checkbox"
            onClick={() =>
              this.setState({ toggleEdit: !this.state.toggleEdit })
            }
            label="J'ai tout renseigné, y a plus qu'à éditer !"
          />
          <Button
            animated="fade"
            inverted
            color="green"
            disabled={this.state.toggleEdit ? false : true}
            onClick={() => pdfMake.createPdf(docDefinition).open()}
          >
            <Button.Content visible>Valider</Button.Content>
            <Button.Content hidden>
              <Icon name="checkmark" />
            </Button.Content>
          </Button>
          <Modal
            className="modalCustom"
            trigger={
              <Button
                animated="fade"
                inverted
                color="red"
                floated="right"
                disabled={this.state.toggleEdit ? true : false}
                onClick={() =>
                  this.setState({ toggleModal: !this.state.toggleModal })
                }
              >
                <Button.Content visible>Reset</Button.Content>
                <Button.Content hidden color="red">
                  <Icon name="trash" />
                </Button.Content>
              </Button>
            }
            open={this.state.toggleModal}
            basic
            size="small"
          >
            <Header icon="trash" content="Réinitialiser le formulaire" />
            <Modal.Content>
              <p>
                Le formulaire va être réinitialisé et le contenu actuel
                supprimé, t&apos;es sûr de vouloir faire ça ?
              </p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                basic
                color="green"
                inverted
                onClick={() =>
                  this.setState({ toggleModal: !this.state.toggleModal })
                }
              >
                <Icon name="close" /> Non
              </Button>
              <Button color="red" inverted onClick={this.handleSubmit}>
                <Icon name="checkmark" /> Oui
              </Button>
            </Modal.Actions>
          </Modal>
        </Form>
        <br />
        <br />
      </Container>
    );
  }
}

export default EntryForm;
