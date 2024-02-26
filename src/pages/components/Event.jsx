import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const EventBox = () => {
  return (
    <div className="hero-banner">
      <div className="mb-4">
        <h5 className="text-secondary">EVENTS</h5>
        <h2>Evenement à venir</h2>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus leo
        porta nunc, velit. Dui justo, non platea viverra aliquam convallis arcu
        molestie egestas. Voluptat integer tristique ac nam integer. Hac ut
        nisi, ut amet donec porta.
      </p>
      <Button className="button-5">Découvrir</Button>
    </div>
    // <Container fluid className="text-light p-5 hero-banner">
    //   <Row>
    //     <Col
    //       md={6}
    //       className="d-flex align-items-center justify-content-center"
    //     >
    //       {/* <img
    //         src="https://i.insertcred.it/2023/08/baldurs-gate-3-bard--3-.webp"
    //         alt=""
    //       /> */}
    //     </Col>
    //     <Col md={6} className="p-5">
    //       <div className="mb-4">
    //         <h5 className="text-secondary">EVENTS</h5>
    //         <h2>Evenement à venir</h2>
    //       </div>
    //       <p>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
    //         leo porta nunc, velit. Dui justo, non platea viverra aliquam
    //         convallis arcu molestie egestas. Voluptat integer tristique ac nam
    //         integer. Hac ut nisi, ut amet donec porta.
    //       </p>
    //       <Button className="button-5">Découvrir</Button>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default EventBox;
