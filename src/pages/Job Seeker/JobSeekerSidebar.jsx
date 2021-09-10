import React from "react";
import { NavLink,Link} from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
export default function JobSeekerSidebar() {


  return (
    <div style={{ marginBottom: "500px", paddingLeft: "115px" }}>
      <Menu vertical>
        <Menu.Item as={NavLink} to={"/jobseekerprofile"} >
          <Icon name="user"></Icon>Profil
        </Menu.Item>

        <Menu.Item as={Link} to={"/cvdetail/1"} >
          <Icon name="file text"></Icon>Özgeçmişler
        </Menu.Item>

        <Menu.Item as={Link} to={"/references"}>
          <Icon name="plus"></Icon>Başvurular
        </Menu.Item>

        <Menu.Item as={Link} to={"/favorites"} >
          <Icon name="star"></Icon>Favoriler
        </Menu.Item>

        <Menu.Item as={Link} to={"/jobadvertadd"} >
          <Icon name="settings"></Icon>Ayarlar
        </Menu.Item>
      </Menu>
    </div>
  );
}
