import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Message,
} from "semantic-ui-react";


export default function JobSeekerLoginPage() {
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://res.cloudinary.com/du9huaxi3/image/upload/v1624095794/login_evilmt.png" />{" "}
            Hesabınıza Giriş Yapın
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail" required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
                type="password" required
              />

              <Button color="green" fluid size="large">
                Giriş Yap
              </Button>
            </Segment>
          </Form>
          <Message>
            Yeni Misin? <NavLink to="/jobseekerregisterpage">Kayıt Ol</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
