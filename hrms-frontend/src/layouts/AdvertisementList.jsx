import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Card } from "semantic-ui-react";
import JobAdvertisementService from "../services/JobAdvertisementService";

export default function AdvertisementList() {
  const [JobAdvertisement, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertisementService();
    jobAdvertService
      .getJobAdvertisement()
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  return (
    <div style={{ width: "971px" }}>
      {JobAdvertisement.map((jobAdvert) => (
        <Card.Group key={jobAdvert.id}>
          <Card fluid color="purple" as={NavLink} to={`/jobadvertsdetail/${jobAdvert.id}`}>
            <Card.Content>
              <Card.Header textAlign="left">
                {jobAdvert.jobDescription}
              </Card.Header>
              <Card.Meta textAlign="left">
                {jobAdvert.employer.companyName}
              </Card.Meta>
              <Card.Description
                textAlign="left"
                content={jobAdvert.workingType.typeName}
              />
              <Card.Description
                textAlign="left"
                content={jobAdvert.city.cityName}
              />
              <Card.Description
                textAlign="right"
                content={jobAdvert.creationDate}
              />
            </Card.Content>
          </Card>
        </Card.Group>
      ))}
    </div>
  );
}
