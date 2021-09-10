import React from "react";
import { Button, Card, Grid, Icon, Image, Popup } from "semantic-ui-react";
import JobSeekerSidebar from "./JobSeekerSidebar";
import { NavLink } from "react-router-dom";
import Calender from "../../layouts/Calendar";

export default function JobSeekerProfile() {
  return (
    <div>
      <div style={{ marginTop: "100px" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={3}>
              <JobSeekerSidebar></JobSeekerSidebar>
            </Grid.Column>
            <Grid.Column width={10}>
              <Card.Group style={{ paddingLeft: 100 }}>
                <Card style={{ width: 980 }}>
                  <Card.Content>
                    <Card.Header>
                      <b className="font">Güncel Özgeçmiş</b>
                    </Card.Header>
                    <Card.Meta>
                      En son güncellediğin özgeçmişine buradan ulaşabilirsin.
                    </Card.Meta>

                    <Card.Header textAlign="right">
                      <Calender></Calender>
                    </Card.Header>
                    <div style={{ backgroundColor: "whitesmoke" }}>
                      <Image
                        floated="left"
                        size="mini"
                        style={{ marginTop: 10, marginLeft: 10 }}
                        src="https://res.cloudinary.com/du9huaxi3/image/upload/v1625253823/circle-cropped_aoo92w.png"
                      />
                      <Card.Description
                        style={{
                          height: 80,
                          textAlign: "left",
                          marginTop: 10,
                          padding: 15,
                          marginBottom: 5,
                        }}
                      >
                        Özgeçmişini görüntülemek için {" "}
                        <strong
                          as={{ NavLink }}
                          to="/jobseekercv"
                          style={{ cursor: "pointer" }}
                        >
                          tıkla
                        </strong>
                        <br></br>
                        <Popup
                          trigger={
                            <Button
                              basic
                              color="green"
                              style={{
                                marginTop: 5,
                                height: 30,
                                paddingBottom: 20,
                                paddingTop: 8,
                              }}
                            >
                              {" "}
                              <Icon name="arrow circle up"></Icon>Güncelle
                            </Button>
                          }
                          content="Güncelleme Başarılı"
                          on="Güncelle"
                          hideOnScroll
                        />
                      </Card.Description>
                    </div>
                  </Card.Content>
                </Card>
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
