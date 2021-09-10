import React from "react";
import { Container, Header } from "semantic-ui-react";
import { Form } from "semantic-ui-react";

export default function Head() {
  return (
    <div style={{ marginTop: "-10px", marginBottom:"10px"}} >
      <Header size="huge" block textAlign="right" >
        <Container textAlign="center">
        <Form>
            <Form.Group >
              <Form.Input
                placeholder="Pozisyon veya şirket ara"
                icon="search"
              />
              <Form.Input placeholder="Şehir ara" icon="search" />
              <Form.Button color="purple">İş Ara</Form.Button>
            </Form.Group>
          </Form>
        </Container>
      </Header>
    </div>
  );
}
