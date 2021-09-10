
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";
import { Icon } from "semantic-ui-react";
import SingedIn from "./SingedIn";
import SingedOut from "./SingedOut";

export default function Navi() {
  //const [isAuthenticated, setIsAuthenticated] = useState(true);
  const {authItem} = useSelector(state => state.auth)

 /* function handleSignOut() {
    setIsAuthenticated(false);
  }
  function handleSignIn() {
    setIsAuthenticated(true);
    
  }*/
  return (
    <div>
      <Menu inverted fixed="top">
        <Menu.Item style={{ textAlign: "center", fontSize: 17 }}>
          <Icon size="large" circular color="teal" name="users" />
          <b>HRMS.Net</b>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/"
          style={{ textAlign: "center", fontSize: 17 }}
        >
          <b>Anasayfa</b>
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/jobadvertspage"
          style={{ textAlign: "center", fontSize: 17 }}
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

        <Menu.Menu position="right" style={{ margin: '0.5em' }}>
        {authItem[0].loggedIn && authItem[0].user.userType===2 &&  <Button style={{marginTop:20,marginBottom:20}} inverted color='red' as={Link} to={"/jobadvertadd"}>İlan Ekle</Button>}
        {authItem[0].loggedIn && authItem[0].user.userType===1}
        {authItem[0].loggedIn?<SingedIn/>:<SingedOut/>}
        </Menu.Menu>
      </Menu>
    </div>
  );
}
