import React from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
} from "semantic-ui-react";
export default function EmployerRegisterPage() {
  return (
    <div style={{backgroundImage:'url("https://res.cloudinary.com/du9huaxi3/image/upload/v1624120533/kayit_quqzyf.jpg")', 
    backgroundRepeat:'no-repeat', backgroundPosition:"center", 
    backgroundSize:"cover"}}>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="orange" textAlign="center">
            İŞ VEREN KAYIT EKRANI
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Şirket Adınız"
              />

              <Form.Input
                fluid
                icon="linkify"
                iconPosition="left"
                placeholder="Web Site Adresiniz"
                required
              />
              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Telefon Numaranız"
                required
              />

              <Button color="green" fluid size="large">
                Üye Ol
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
