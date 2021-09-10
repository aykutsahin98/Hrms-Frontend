import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Table, Button, Icon, Segment } from "semantic-ui-react";
import JobAdvertisementService from "../../services/JobAdvertisementService";

export default function JobAdvertisementDetail() {
  let { id } = useParams();
  const [JobAdvertisements, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getById(id)
      .then((result) => setJobAdverts([result.data.data]));
  }, []);

  return (
    <div className="card" style={{marginTop:100}}>
      {JobAdvertisements.map((jobAdvert) => (
        <div>
          <Segment color="green" textAlign="center">
            İLAN DETAYI
          </Segment>
          <Table color="red" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  ŞİRKET
                  <br />
                  BİLGİLERİ
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <Icon name="warehouse" /> Şirket
                </Table.Cell>
                <Table.Cell>{jobAdvert.employer.companyName}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="world" />
                  Web Sitesi
                </Table.Cell>
                <Table.Cell>
                  <a
                    target="_blank"
                    href={"https://" + jobAdvert.employer.webSite}
                  >
                    {jobAdvert.employer.webSite}
                  </a>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="phone" />
                  Telefon Numarası
                </Table.Cell>
                <Table.Cell>{jobAdvert.employer.phoneNumber}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <Icon name="map marker alternate" />
                  Şehir
                </Table.Cell>
                <Table.Cell>{jobAdvert.city.cityName}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="yellow" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="2">
                  <Icon name="users" />
                  İŞ
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Pozisyon</Table.Cell>
                <Table.Cell>{jobAdvert.jobPosition.name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell collapsing>Açık Pozisyon Sayısı</Table.Cell>
                <Table.Cell>{jobAdvert.numberOfOpenPositions}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Çalışma Türü</Table.Cell>
                <Table.Cell>{jobAdvert.workingType.typeName}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="green" celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="money" />
                  MAAŞ
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Minimum Maaş </Table.Cell>
                <Table.Cell positive>{jobAdvert.minSalary} TL</Table.Cell>
                <Table.Cell>Maksimum Maaş </Table.Cell>
                <Table.Cell positive>{jobAdvert.maxSalary} TL</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="blue">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="paperclip" />
                  AÇIKLAMA
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{jobAdvert.jobDescription}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Table color="black">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Icon name="time" />
                  Son Başvuru Tarihi
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell negative>
                  {jobAdvert.applicationDeadline}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
      ))}
      <Button style={{ marginTop: "5pt" }} floated="right" color="green">
        İLANA BAŞVUR
      </Button>
    </div>
  );
}
