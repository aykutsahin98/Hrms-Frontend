import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Menu, Dropdown } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";


const options = [
  {
    key: "login",
    icon: "sign in",
    text: "Giriş Yap",
    value: "login",
    as: Link,
    to: "/employerloginpage",
  },
  {
    key: "register",
    icon: "signup",
    text: "Üye Ol",
    value: "register",
    as: Link,
    to: "/employerregisterpage",
  },
];
export default function Navi() {
  return (
    <div>
      <Menu size="large">
        <Menu.Item>
          <Icon size="large" circular color="teal" name="users" />
          <menu
            style={{ textAlign: "center", marginRight: 25, fontSize: 20 }}
            type="context"
          >
            <b>HRMS.Net</b>
          </menu>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/"
          style={{ textAlign: "center", fontSize: 17 }}
          name="homepage"
        >
          <b>Anasayfa</b>
        </Menu.Item>

        <Menu.Item
          as={NavLink}
          to="/jobadvertspage"
          style={{ textAlign: "center", fontSize: 17 }}
          name="workplace"
        >
          <b>İş İlanları</b>
          <Icon style={{ marginLeft: 5 }} name="search" size="small" />
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/confirmAdvert"
          style={{ textAlign: "center", fontSize: 17 }}
          name="confirm"
        >
          <b>İlan Onaylama</b>
        </Menu.Item>

        <Menu.Item position="right" as={NavLink} to="/jobseekerregisterpage">
          <Button color="purple">Üye Ol</Button>
        </Menu.Item>

        <Menu.Item as={NavLink} to="/jobseekerloginpage">
          <Button color="purple">Üye Girişi</Button>
        </Menu.Item>

        <Menu.Item>
          <Button.Group color="blue">
            <Button>İş Veren</Button>
            <Dropdown
              className="button icon"
              floating
              options={options}
              trigger={<></>}
            />
          </Button.Group>
        </Menu.Item>
      </Menu>
    </div>
  );
}
