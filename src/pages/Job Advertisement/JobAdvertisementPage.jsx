import React from "react";
import { Grid } from "semantic-ui-react";
import AdvertisementList from "../../layouts/AdvertisementList";
import Filter from "../../layouts/Filter";
import Head from "../../layouts/Head";

export default function JobAdvertisementPage() {
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Filter></Filter>
            </Grid.Column>
            <Grid.Column width={9}>
              <AdvertisementList></AdvertisementList>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
  );
}
