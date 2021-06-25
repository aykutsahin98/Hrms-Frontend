import React from "react";
import { NavLink } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

export default function EmployerLoginPage() {
  return (
    <div style={{backgroundImage:'url("https://res.cloudinary.com/du9huaxi3/image/upload/v1624119397/background-color-black_dxcapu.jpg")', 
    backgroundRepeat:'no-repeat', backgroundPosition:"center", 
    backgroundSize:"cover"}} >
      
      <Grid 
        textAlign="center" 
        style={{ height: "100vh"}}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450}}>
          <Header as="h2" color="yellow" textAlign="center" >
            İŞ VEREN GİRİŞ EKRANI
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
              />

              <Button color="purple" fluid size="large" as={NavLink} to ="/jobadvertadd">
                Giriş Yap
              </Button>
            </Segment>
          </Form>
          <Message>
            Yeni Misin? <NavLink to="/employerregisterpage">Kayıt Ol</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
