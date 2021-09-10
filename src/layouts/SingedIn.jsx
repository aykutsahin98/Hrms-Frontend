import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Dropdown, Image, Menu, Segment } from "semantic-ui-react";
import { userLogout } from "../store/actions/authActions";

export default function SingedIn() {

    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory();

    const handleLogout=(user)=>{
        dispatch(userLogout(user))
        history.push("/")
    }
  return (
    <div>
      <Segment inverted>
        <Menu.Item>
          <Image
            avatar
            spaced="right"
            src={authItem[0].user.image}
          />
          <Dropdown pointing="top left" text={authItem[0].user.name}>
            <Dropdown.Menu>
            {authItem[0].user.userType===1 &&<Dropdown.Item text="Cv Güncelle" icon="user"  as={Link} to={`/cvdetail/${authItem[0].user.id}`}/>}
            {authItem[0].user.userType===2 &&<Dropdown.Item text="Şirket Profilini Güncelle" as={Link} to ="/employerupdate" icon="user"/>}
              <Dropdown.Item
               onClick={()=>handleLogout(authItem[0].user)}
                text="Çıkış Yap"
                icon="sign-out"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Segment>
    </div>
  );
}
