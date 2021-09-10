import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Dropdown, Menu, Segment } from "semantic-ui-react";

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
export default function SingedOut() {
  return (
    <div>
        <Menu inverted style={{ marginTop: 10 }}>
          <Menu.Item>
            <Button color="purple" as={NavLink} to="/jobseekerregisterpage">
              Üye Ol
            </Button>
            <Button
              color="purple"
              style={{ marginLeft: "0.5em" }}
              as={NavLink}
              to="/jobseekerloginpage" 
            >
              Üye Girişi
            </Button>
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
