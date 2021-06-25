import React, { useState, useEffect } from "react";
import JobAdvertisementService from "../../services/JobAdvertisementService";
import {
  Table,
  Segment,
  Container,
  Icon,
  Card,
  Button,
  Divider,
} from "semantic-ui-react";
import swal from "sweetalert";

export default function ConfirmJobAdvertisementPage() {
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  let jobAdvertisementService = new JobAdvertisementService();

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getByConfirmFalse()
      .then((result) => setJobAdvertisements(result.data.data));
  }, []);

  const confirmStatusTrue = (jobAdvertisementId) => {
    jobAdvertisementService.confirm(jobAdvertisementId).then(
      swal({
        title: "Başarılı!",
        text: "İş ilanı onaylandı!",
        icon: "success",
        button: "OK",
      }).then(function () {
        window.location.reload();
      })
    );
  };

  const deleteJob = (jobAdvertisementId) => {
    jobAdvertisementService.delete(jobAdvertisementId).then(
      swal({
        title: "Emin Misiniz?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("İş ilanı silindi.", { icon: "success" }).then(function () {
            window.location.reload();
          });
        }
      })
    );
  };

  return (
    <div>
      <Segment style={{ padding: "17em 0em" }} vertical>
        <Container>
          <Card fluid color="orange">
            {" "}
            <Card.Header
              as="h2"
              textAlign="center"
              style={{ fontSize: "2em", marginBottom: "1em", marginTop: "1em" }}
            >
              <Icon name="edit outline" color="orange" />
              Onay Bekleyen İlanlar
            </Card.Header>
            <Card.Content>
              <Table color="orange">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Firma Adı</Table.HeaderCell>
                    <Table.HeaderCell>Şehir</Table.HeaderCell>
                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                    <Table.HeaderCell>Alınacak Kişi Sayısı</Table.HeaderCell>
                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Maaş Aralığı</Table.HeaderCell>
                    <Table.HeaderCell>Onay Durumu</Table.HeaderCell>
                    <Table.HeaderCell>Onay İşlemi</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {jobAdvertisements.map((jobAdvertisement) => (
                    <Table.Row key={jobAdvertisement.id}>
                      <Table.Cell>
                        {jobAdvertisement.employer.companyName}
                      </Table.Cell>
                      <Table.Cell>{jobAdvertisement.city.cityName} </Table.Cell>
                      <Table.Cell>
                        {jobAdvertisement.jobPosition.name}
                      </Table.Cell>
                      <Table.Cell>
                        {jobAdvertisement.numberOfOpenPositions}
                      </Table.Cell>
                      <Table.Cell>
                        {jobAdvertisement.applicationDeadline}
                      </Table.Cell>
                      <Table.Cell>
                        {jobAdvertisement.minSalary}-
                        {jobAdvertisement.maxSalary}
                      </Table.Cell>
                      <Table.Cell>
                        {jobAdvertisement.confirmStatus === false
                          ? "Onaylandı"
                          : "Onaylanmadı"}
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          animated
                          basic
                          color="green"
                          onClick={(e) =>
                            confirmStatusTrue(jobAdvertisement.id)
                          }
                        >
                          <Button.Content visible>Onayla</Button.Content>
                          <Button.Content hidden>
                            <Icon name="check" />
                          </Button.Content>
                        </Button>
                        <Divider />
                        <Button
                          animated
                          basic
                          color="orange"
                          onClick={(e) => deleteJob(jobAdvertisement.id)}
                        >
                          <Button.Content visible>İlanı Sil</Button.Content>
                          <Button.Content hidden>
                            <Icon name="delete" />
                          </Button.Content>
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Card.Content>
          </Card>
        </Container>
      </Segment>
    </div>
  );
}
