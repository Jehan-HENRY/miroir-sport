import React, { Component } from "react";
import { Container, Form, Button, Message, Icon } from "semantic-ui-react";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
import background from "../img/background.jpg";
import footer from "../img/footer.jpg";
import logo from "../img/logo.jpg";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: "",
      product: "",
      background: "",
      footer: "",
      logo: ""
    };
    this.getDataUri = this.getDataUri.bind(this);
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
  }

  render() {
    console.log(this);
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    var docDefinition = {
      pageMargins: [50, 100, 50, 75],
      background: {
        image: this.state.background,
        fit:[596, 842]
      },
      footer: {
        image: this.state.footer,
        fit:[596, 77]
      },
      header: {
        columns: [
          {
            image: this.state.logo,
            fit:[279, 80],
          },
        {
          text: 'Réf: ' + this.state.reference,
          style: "reference",
          alignment: 'right'
        }
        ],
      },
      content: [
        {
          text: "Fiche Technique",
          style: "title",
          alignment: 'center'
        },
        {
          text: this.state.product,
          style: "product"
        },
        {
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n",
          alignment: "justify",
          style: "testText"
        },
        {
          text:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
          alignment: "justify",
          style: "bigText"
        },
        {
          text: "Subheader 2 - using subheader style",
          style: "subheader"
        },
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video."
      ],
      styles: {
        title: {
          fontSize: 18,
          margin: [0, 0, 0, 40]
        },
        product: {
          fontSize: 18,
          bold: true
        },
        reference: {
          fontSize: 18,
          margin: [0, 38, 50]
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        // bigText: {
        //   margin: [0, 180]
        // },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
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
            />
            <Form.Input
              value={this.state.product}
              onChange={evt =>
                this.setState({
                  product: evt.target.value
                })
              }
              required
              label="Titre"
              placeholder="Titre"
            />
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
          <Button
            animated
            onClick={() => pdfMake.createPdf(docDefinition).open()}
          >
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
