import React, { Component } from "react";
import { Container, Form, Button, Message, Icon } from "semantic-ui-react";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reference: "",
      title: ""
    };
  }

  render() {
    console.log(this);
    const { vfs } = vfsFonts.pdfMake;
    pdfMake.vfs = vfs;

    var docDefinition = {
      pageMargins: [50, 50],
      content: [
        {
          image: "header",
          width: 495
        },
        {
          text: this.state.title,
          style: "title"
        },
        { text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam.\n\n",
          alignment: "justify",
          style: "testText"
        },
        {
          text: this.state.reference,
          alignment: "right",
          style: "reference"
        },
        {
          text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
        alignment: "justify",
        style: "bigText"
        },
        {
          text: "Subheader 2 - using subheader style",
          style: "subheader"
        },
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.",
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Confectum ponit legam, perferendis nomine miserum, animi. Moveat nesciunt triari naturam posset, eveniunt specie deorsus efficiat sermone instituendarum fuisse veniat, eademque mutat debeo. Delectet plerique protervi diogenem dixerit logikh levius probabo adipiscuntur afficitur, factis magistra inprobitatem aliquo andriam obiecta, religionis, imitarentur studiis quam, clamat intereant vulgo admonitionem operis iudex stabilitas vacillare scriptum nixam, reperiri inveniri maestitiam istius eaque dissentias idcirco gravis, refert suscipiet recte sapiens oportet ipsam terentianus, perpauca sedatio aliena video.\n\n",
        {
          text:
            "Miroir Sport ● SARL au capital de 1000 € ● SIRET 539 632 794 00027 ● RCS Lorient ● APE 4334Z",
          style: ["quote", "small"]
        }
      ],
      styles: {
        title: {
          fontSize: 18,
          bold: true,
          margin: [150, -40]
        },
        testText: {
          margin: [0, 70]
        },
        reference: {
          fontSize: 15,
          bold: true,
          margin: [0, -230, 15]
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
        header:
          "data:image/png;base64,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TCYiIiIG1EjR3d2NnJwc4bnT6cTr169FL51v27ZNdB1T3bWUv4EBCgoKYLVavaYdPHgQ9fX1XtNUKhUaGxunbP95qZ+IiIgYUP9PdXU1iouLhec3b97024H98DHuh/vjjz+mpO3pcDKZzO/+nThxwmfanj17fNqjmkwm2O32Kdl/9qlKREREDKgAzGaz181OFRUVcLlckEqlouFU7NL+w4cPfe76nyrbt28XnZ6fn+8zRCsgPtzpP//5zynZd9agEhER0awPqC9evMDevXuF5yUlJejt7RWtyXM4HNi3b59oiBp5qXwqxcTEYGBgQPxNEgndS5YsQXp6utc0pVKJH3/8kWc1ERERMaCG09u3b/Hf//3fwh3tpaWlKCgoEL3Dvbe3F5999pkQToeH1JKSEsTHx0fUsX366afo6+vzma7RaFBWVuYzfc6cOYiKivKalpaWhgcPHoRlfz0/CHiJn4iIiGZtQG1pacGOHTsAvBsh6siRIz5DmHrY7XZs2bJFNFCVlJRMebtTf/z1JpCbm4srV674TF+5ciXq6uq8wrfVasXz588ntP3xXK53u90Mp0RERDR7A2pdXR127twJ4F1by7Nnz/oMCerR3d2NDRs2CKHU8w8ADh8+HLHhFAAKCwv99tUql8tFa0f37t0Lm83mNa2pqWnC+xBoSJVIJGx/SkRERLMzoFZXVwttTo8fPw63242kpCTReTs7O7F582YoFAqf144ePerVJVWk2rVrF6qqqkRfa29vF53++eefY8GCBcLz6OhoXLt2LeT7yhpUIiIimnUB1WQyYf/+/aitrYXRaPS5MWhkkP3qq698hgm12+0wGo2id75Hqv/6r/9CW1ubz/To6GhcunRJtEspg8GAlStXwul0vntzpVKcPHkypN1PsQaViIiIZlVAbWlpwfbt21FaWora2tpR542Ojvbqdsqjra0NFRUV0/LNKS4uFg2pUVFROHXqFLq7u0Vf++STT2A2m4XQev78eQwODvJsJyIiIgbUiXK5XNDr9bBarbh//77fG6EAoLm5GYWFhfj44499Xjty5Aj+/PPPafvmREVF4bPPPhO9rJ+SkoIbN24ItaXDyeVy7N+/X1guISEB586dC8k+8hI/ERERzfiA2t3djaGhIbS3t6OgoMDncr3H0NAQ+vr6sGvXLiQnJ3u9ZrfbcenSJb83UU0nWq0W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+q5du0TnNxqNOHnypN/RnyZi6dKlWLp0qehrZ8+ehUqlYjglIiIiBtTZRKPR+IzQNFp7T4PB4PX88ePHSEtLC3h7H374oddIVXfv3hW9fB/IoAFEREREkYhtUCfJ013URFksFiQmJgY0b1NTE3JzcyGTycac1zMylGe0KiIiIiIG1FlCp9NNqusnhUIBmUyGwsLCMeddtmwZTp06hZycnIDWfeLECXz88cfsO5WIiIgYUGei2NhY0WlffvnlpAPgtWvXkJycjHnz5om+brVaMXfuXCiVynHViCYnJ+P48eMcRYqIiIimFbZBDVBubi70er3XtLq6OhiNxoAv0fv9lSCVwmg0oq2tDZ999hm0Wq3X693d3fjll19QUFAApVI5rnWnp6dDoVDAbrdDpVLxjSQiIqKIJ3G73e779++jr6+PpUERpbe3F1arlQVBREQ0i8hkMl7iJyIiIqLIwoBKRERERAyoREREREQMqERERETEgEpERERExIBKRERERAyoREREREQMqERERETEgEpERERExIBKRERERAyoREREREQMqEREREREAOQAEB0djaGhIZYGRRSXy8VCICIimm3hVC7H/wKIblvyha97UwAAAABJRU5ErkJggg==",
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
              value={this.state.title}
              onChange={evt =>
                this.setState({
                  title: evt.target.value
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
