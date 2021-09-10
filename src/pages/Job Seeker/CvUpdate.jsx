import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  Button,
  Card,
  Image,
  Table,
  Header,
  Icon,
  Grid,
} from "semantic-ui-react";
import CvService from "../../services/CvService";
import UpdateBiography from "../popups/JobSeekerCvUpdate/UpdateBiography";
import UpdateExperience from "../popups/JobSeekerCvUpdate/UpdateExperience";
import UpdateGithub from "../popups/JobSeekerCvUpdate/UpdateGithub";
import UpdateImage from "../popups/JobSeekerCvUpdate/UpdateImage";
import UpdateLanguage from "../popups/JobSeekerCvUpdate/UpdateLanguage";
import UpdateLinkedin from "../popups/JobSeekerCvUpdate/UpdateLinkedin";
import UpdateSchool from "../popups/JobSeekerCvUpdate/UpdateSchool";
import UpdateSkills from "../popups/JobSeekerCvUpdate/UpdateSkills";
import JobSeekerSidebar from "../Job Seeker/JobSeekerSidebar";

export default function CvUpdate() {
  const { authItem } = useSelector((state) => state.auth);
  let { id } = useParams();
  let [Cv, setCv] = useState({});

  let cvService = new CvService();
  useEffect(() => {
    let cvService = new CvService();
    cvService.getByCandidateId(id).then((result) => setCv(result.data.data));
  }, [id]);

  let myProfile = false;
  if (authItem[0].loggedIn === false) {
    myProfile = false;
  } else if (authItem[0].loggedIn === true) {
    myProfile = parseInt(authItem[0].user.id) === parseInt(id);
  }

  const handleGithubDelete = (cvId) => {
    cvService
      .deleteGithub(cvId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        toast.error(result.response.data.message);
      });
  };
  const handleLinkedinDelete = (cvId) => {
    cvService
      .deleteLinkedin(cvId)
      .then((result) => {
        toast.success(result.data.message);
        updateCvValues();
      })
      .catch((result) => {
        alert(result.response.data.message);
        toast.error(result.response.data.message);
      });
  };

  const updateCvValues = () => {
    cvService.getByCandidateId(id).then((result) => {
      setCv(result.data.data);
    });
  };

  return (
    <div>
      <div style={{ marginTop: 100, marginBottom: 20 }}>
        <Grid>
          <Grid.Column width={4}>
            <JobSeekerSidebar></JobSeekerSidebar>
          </Grid.Column>
          <Grid.Column width={10}>
            <Card.Group>
              <Card fluid color={"black"}>
                <Card.Content>
                  {Cv.images?.map((image) => (
                    <Image
                      floated="left"
                      size="small"
                      src={image?.urlAddress}
                      circular
                      key={image?.id}
                    />
                  ))}
                  {myProfile && (
                    <Popup
                      trigger={
                        <button className="ui button">Resim Yükle</button>
                      }
                      modal
                    >
                      <UpdateImage
                        cvId={Cv.id}
                        updateCvValues={updateCvValues}
                      />
                    </Popup>
                  )}

                  <Card.Header style={{ marginTop: "0.3em" }}>
                    {Cv.candidate?.firstName + " " + Cv.candidate?.lastName}
                  </Card.Header>
                  <Card.Meta>
                    <strong>{Cv.biography}</strong>
                  </Card.Meta>
                  <Card.Description>
                    <Table celled color={"black"}>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>Kullanıcı</Table.HeaderCell>
                          <Table.HeaderCell>Bilgiler</Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>

                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>Ad</Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{Cv.candidate?.firstName}</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>Soyad</Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{Cv.candidate?.lastName}</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>Doğum Tarihi</Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{Cv.candidate?.birthYear}</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>Email</Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{Cv.candidate?.email}</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                <a
                                  href={Cv.github}
                                  target={"_blank"}
                                  rel="noopener noreferrer"
                                >
                                  <Button secondary disabled={!Cv.github}>
                                    <Icon name="github" /> Github
                                  </Button>
                                </a>
                                {myProfile && (
                                  <Popup
                                    trigger={
                                      <button className="ui button">
                                        {" "}
                                        Güncelle{" "}
                                      </button>
                                    }
                                    modal
                                  >
                                    <UpdateGithub
                                      cvId={Cv.id}
                                      updateCvValues={updateCvValues}
                                    />
                                  </Popup>
                                )}
                                {myProfile && (
                                  <Button
                                    color="red"
                                    circular
                                    icon="x"
                                    onClick={() => handleGithubDelete(Cv.id)}
                                    disabled={!Cv.github}
                                  ></Button>
                                )}
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{Cv.github}</Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                <a
                                  href={Cv.linkedin}
                                  target={"_blank"}
                                  rel="noopener noreferrer"
                                >
                                  <Button
                                    color="linkedin"
                                    disabled={!Cv.linkedin}
                                  >
                                    <Icon name="linkedin" /> LinkedIn
                                  </Button>
                                </a>
                                {myProfile && (
                                  <Popup
                                    trigger={
                                      <button className="ui button">
                                        {" "}
                                        Güncelle{" "}
                                      </button>
                                    }
                                    modal
                                  >
                                    <UpdateLinkedin
                                      cvId={Cv.id}
                                      updateCvValues={updateCvValues}
                                    />
                                  </Popup>
                                )}
                                {myProfile && (
                                  <Button
                                    color="red"
                                    icon="x"
                                    circular
                                    disabled={!Cv.linkedin}
                                    onClick={() => handleLinkedinDelete(Cv.id)}
                                  ></Button>
                                )}
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>{Cv.linkedin}</Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra></Card.Content>
              </Card>
            </Card.Group>
            <Card fluid color={"black"}>
              <Card.Content>
                <Card.Header>
                  Biyografi
                  {myProfile && (
                    <Popup
                      trigger={
                        <button
                          className="ui button"
                          style={{ marginLeft: "1em" }}
                        >
                          {" "}
                          Güncelle{" "}
                        </button>
                      }
                      modal
                    >
                      <UpdateBiography
                        cvId={Cv.id}
                        updateCvValues={updateCvValues}
                        curentBiography={Cv.biography}
                      />
                    </Popup>
                  )}
                </Card.Header>
              </Card.Content>
              <Card.Content description={Cv.biography} />
            </Card>

            <Card fluid color={"black"}>
              <Card.Content>
                <Card.Header>
                  Okuduğu Okullar
                  {myProfile && (
                    <Popup
                      trigger={
                        <button
                          className="ui button"
                          style={{ marginLeft: "1em" }}
                        >
                          {" "}
                          Güncelle{" "}
                        </button>
                      }
                      modal
                    >
                      <UpdateSchool
                        cvId={Cv.id}
                        updateCvValues={updateCvValues}
                      />
                    </Popup>
                  )}
                </Card.Header>
              </Card.Content>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Okul Adı</Table.HeaderCell>
                    <Table.HeaderCell>Bölüm</Table.HeaderCell>
                    <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Cv.educations?.map((education) => (
                    <Table.Row key={education.id}>
                      <Table.Cell>{education.schoolName}</Table.Cell>
                      <Table.Cell>{education.department}</Table.Cell>
                      <Table.Cell>{education.startedDate}</Table.Cell>
                      <Table.Cell>
                        {education.endedDate ? (
                          education.endedDate
                        ) : (
                          <p>Devam Ediyor</p>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
            <Card fluid>
              <Card.Content>
                <Card.Header>
                  Tecrübeler
                  {myProfile && (
                    <Popup
                      trigger={
                        <button
                          className="ui button"
                          style={{ marginLeft: "1em" }}
                        >
                          {" "}
                          Güncelle{" "}
                        </button>
                      }
                      modal
                    >
                      <UpdateExperience
                        cvId={Cv.id}
                        updateCvValues={updateCvValues}
                      />
                    </Popup>
                  )}
                </Card.Header>
              </Card.Content>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                    <Table.HeaderCell>Başalngıç Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {Cv.experiences?.map((experience) => (
                    <Table.Row key={experience.id}>
                      <Table.Cell>{experience.workspaceName}</Table.Cell>
                      <Table.Cell>{experience.position}</Table.Cell>
                      <Table.Cell>{experience.startedDate}</Table.Cell>
                      <Table.Cell>
                        {experience.endedDate ? (
                          experience.endedDate
                        ) : (
                          <p>Devam Ediyor</p>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>

            <Card fluid color={"black"}>
              <Card.Content>
                <Card.Header>
                  Yabancı Diller
                  {myProfile && (
                    <Popup
                      trigger={
                        <button
                          className="ui button"
                          style={{ marginLeft: "1em" }}
                        >
                          {" "}
                          Güncelle{" "}
                        </button>
                      }
                      modal
                    >
                      <UpdateLanguage
                        cvId={Cv.id}
                        updateCvValues={updateCvValues}
                      />
                    </Popup>
                  )}
                </Card.Header>
              </Card.Content>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Dil Adı</Table.HeaderCell>
                    <Table.HeaderCell>Seviye min:1 max:5</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Cv.languages?.map((language) => (
                    <Table.Row key={language.id}>
                      <Table.Cell>{language.languageName}</Table.Cell>
                      <Table.Cell>{language.level}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>

            <Card fluid color={"black"}>
              <Card.Content>
                <Card.Header>
                  Yazılım Teknolojileri
                  {myProfile && (
                    <Popup
                      trigger={
                        <button
                          className="ui button"
                          style={{ marginLeft: "1em" }}
                        >
                          {" "}
                          Güncelle{" "}
                        </button>
                      }
                      modal
                    >
                      <UpdateSkills
                        cvId={Cv.id}
                        updateCvValues={updateCvValues}
                      />
                    </Popup>
                  )}
                </Card.Header>
              </Card.Content>
              <Table celled color={"black"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Teknoloji Adı</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {Cv.skills?.map((skill) => (
                    <Table.Row key={skill.id}>
                      <Table.Cell>{skill.skillsName}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
}
