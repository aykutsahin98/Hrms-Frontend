import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Rating } from "semantic-ui-react";
import FavoriteJobAdvertService from "../services/FavoriteJobAdvertService";
import JobAdvertisementService from "../services/JobAdvertisementService";

export default function AdvertisementList() {
  const [JobAdvertisement, setJobAdverts] = useState([]);

  useEffect(() => {
    let jobAdvertService = new JobAdvertisementService();
    jobAdvertService
      .getJobAdvertisement()
      .then((result) => setJobAdverts(result.data.data));
  }, []);

  let favoriteJobAdvertService = new FavoriteJobAdvertService();
  const handleAddFavorite = (jobAdvertId) => {
    favoriteJobAdvertService
      .addFavorite(1, jobAdvertId)
      .then((result) => {
        toast.success("Favorilere eklendi");
      })
      .catch((result) => {
        toast.error("Favorilerde var zaten");
      });
    }

  return (
    <div style={{ width: "971px", marginTop:90 }}>
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
                <Card.Description textAlign="left">
                        <Rating
                          icon="star"
                          onRate={() => handleAddFavorite(jobAdvert.id)}
                        />
                      </Card.Description>
            </Card.Content>
          </Card>
        </Card.Group>
      ))}
    </div>
  );
}
