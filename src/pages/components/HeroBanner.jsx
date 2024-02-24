import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const HeroBanner = () => {
  return (
    <div className="hero-banner" >
      <Container>
        <Row className="align-items-center">
          <Col md={12} className="text-center">
            <h1>Lexique Gamer </h1>
            <p className="my-4 subtitle"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus enim inventore corrupti ad dolore eligendi tempora, dolorum iure, quis, earum omnis. Est fugiat ipsam unde ipsa ut, accusantium maxime quo exercitationem culpa facilis dolores omnis magnam quos laudantium minus itaque ea necessitatibus nobis quibusdam adipisci minima quisquam consequatur sint et? </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col md={3}>
            <div className="info-box">
              <h3>MMOG</h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="info-box">
              <h3>Jeux vidéos</h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="info-box">
              <h3>Jeux de role</h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="info-box">
              <h3>Argot internet</h3>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroBanner;