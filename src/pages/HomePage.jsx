import React from "react";
import { NavLink } from "react-router-dom";
import {
  Grid,
  Image,
  Segment,
  Container,
  Header,
  Button,
  Icon,
} from "semantic-ui-react";


export default function HomePage() {

  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <div
        style={{
          backgroundColor: "black",
          paddingBlockStart: 10,
          paddingBlockEnd: 200,
        }}
      >
        <Container text style={{marginTop:200}}>
          <Header
            color="brown"
            as="h1"
            content="HRMS.Net"
            inverted
            style={{
              fontSize: 0 ? "2em" : "4em",
              fontWeight: "normal",

              marginTop: 10 ? "1.5em" : "3em",
            }}
          />
          <Header
            color="black"
            as="h2"
            content="Anlamlı ve yapmaya değer bir iş bulmanın uzun bir yolculuk olduğunu biliyoruz.
             Hedefimiz bu işlemi sizin için mümkün olduğu kadar kolaylaştırmak"
            inverted
            style={{
              fontSize: 0 ? "1.5em" : "1.7em",
              fontWeight: "normal",
              marginTop: 0 ? "0.5em" : "1.5em",
            }}
          />
          <Button as ={NavLink} to="/jobadvertspage" primary size="huge" style={{ marginTop: 20 }}>
            İş İlanlarını Görüntüle
            <Icon name="right arrow" />
          </Button>
        </Container>
      </div>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                Şirketlere Kolaylık Sağlıyoruz
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Kolay bir şekilde işveren olarak kayıt olun ve iş ilanlarınızı
                tek bir adımda iş arayan kişiler ile buluşturun.
              </p>
              <Header as="h3" style={{ fontSize: "2em" }}>
                İş Arayanlara Özel Filtreler
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Kolayca filtreleme yapın hayalinizde ki mesleğe başvurun.
                Cv'nizi oluşturun ve iş verenler ile kayıt olduğunuz andan
                itibaren paylaşın.
              </p>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Image
                bordered
                rounded
                size="large"
                src="https://res.cloudinary.com/du9huaxi3/image/upload/v1623677553/HR_imvmbi.jpg"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Bir Şirket Miyiz?"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                Evet, sizlere kolaylıklar sağlıyoruz.
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "Rakip Sitelere Göre Kullanımı Çok Basit"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                <Image
                  avatar
                  src="https://res.cloudinary.com/du9huaxi3/image/upload/v1623688026/man_kahs9m.png"
                />
                <b>Bağımsız</b> Kullanıcı Yorumu
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Kariyer Rehberi İle Bilgiler Edinin
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Kariyeriniz hakkında bilgi sahibi olmak ve kariyerinizi hangi alanda
            devam ettireceğinize dair bir çok şeyi kariyer rehberi kısmından
            erişebilirsiniz.
          </p>
          <Button as="a" size="large">
            Daha Fazlasını Oku
          </Button>
        </Container>
      </Segment>
    </div>
  );
}
