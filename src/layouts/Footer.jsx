import React from "react";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
export default function Footer() {
  return (
    <div>
      <Segment inverted vertical style={{ padding: "5em 0em" }} >
        <Container>
          <Grid divided inverted stackable >
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Hakkında" />
                <List link inverted>
                  <List.Item as="a">Site Haritası</List.Item>
                  <List.Item as="a">İletişim</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Servisler" />
                <List link inverted>
                  <List.Item as="a">Mail</List.Item>
                  <List.Item as="a">Sık Sorulan Sorular</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Biz Kimiz
                </Header>
                <p>
                  İş arayanları ve iş verenleri buluşturduğumuz ortak platform
                  HRMS.Net'iz. Kolay bir şekilde iş arayın ve iletişime geçin.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}
