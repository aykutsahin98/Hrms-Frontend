import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment
} from "semantic-ui-react";
export default function JobSeekerRegisterPage() {
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://res.cloudinary.com/du9huaxi3/image/upload/v1624095648/customer_gltqs4.png" />{" "}
            İş Arayan Kayıt Ekranı
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
               
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Adınız" 
              />

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Soyadınız" required
              />
              <Form.Input
                fluid
                icon="birthday cake"
                iconPosition="left"
                placeholder="Doğum Yılı" required
              />
              <Form.Input
                fluid
                icon="id card outline"
                iconPosition="left"
                placeholder="TC Kimlik Numaranız" required
              />
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail " required
              />

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Şifre"
                type="password" required
              />

              <Button color="teal" fluid size="large">
                Üye Ol
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
