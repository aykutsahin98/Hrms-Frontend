import React, { useState, useEffect } from "react";
import { Segment, Checkbox, Button } from "semantic-ui-react";
import CityService from "../services/CityService";

export default function Filter() {
  const [City, setCities] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));
  }, []);

  return (
    <div>
      <Segment as="h3">Şehir</Segment>

      <Segment.Group>
        <Segment>
          <select style={{ width: "200px", height: "30px" }}>
            {City.map((city) => (
              <option key={city.id}>{city.cityName}</option>
            ))}
          </select>
        </Segment>
      </Segment.Group>

      <div className="myBox">
        <Segment as="h3">Çalışma Şekli</Segment>
        <Segment.Group as="h3" attached="top">
          <Segment textAlign="left">
            <Checkbox label="Tam Zamanlı" />
          </Segment>
          <Segment textAlign="left">
            <Checkbox label="Dönemsel" />
          </Segment>
          <Segment textAlign="left">
            <Checkbox label="Stajyer" />
          </Segment>
          <Segment textAlign="left">
            <Checkbox label="Part Time" />
          </Segment>
          <Segment textAlign="left">
            <Checkbox label="Serbest Zamanlı" />
          </Segment>
        </Segment.Group>
      </div>

      <div className="myBox">
        <Segment as="h3">Pozisyon</Segment>
        <Segment.Group as="h3" attached="top">
          <Segment textAlign="left">
            <Checkbox label="Yazılım Geliştirici" />
          </Segment>
          <Segment textAlign="left">
            <Checkbox label="Yazılım Uzmanı" />
          </Segment>
        </Segment.Group>
        <Button color="green" style={{ width: 300 }}>
          Filtrele
        </Button>
      </div>
    </div>
  );
}
