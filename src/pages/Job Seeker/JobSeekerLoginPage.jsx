import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Message,
} from "semantic-ui-react";
import UserService from "../../services/UserService";
import { userLogin } from "../../store/actions/authActions";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";

export default function JobSeekerLoginPage() {
  const dispatch = useDispatch();

  const handleLogin = (user) => {
    dispatch(userLogin(user));
  };

  const history = useHistory();
  let userService = new UserService();

  const userLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("Bu alan doldurulmak zorundadır")
      .email("Geçerli bir email adresi giriniz"),
    password: Yup.string().required("Bu alan doldurulmak zorundadır"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      userService
        .login(values)
        .then((result) => {
          handleLogin(result.data.data);
          history.push("/");
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div style={{ marginTop: 40, backgroundColor:"rebeccapurple" }}>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="yellow" textAlign="center">
            İŞ ARAYAN GİRİŞ EKRANI
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked>
              <div>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail adresi"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1em" }}>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Şifre"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <Button
                color="teal"
                fluid
                size="large"
                type="submit"
                style={{ marginTop: "1em" }}
              >
                Giriş Yap
              </Button>
            </Segment>
          </Form>
          <Message info>
            Kayıtlı değilmisin?{" "}
            <b>
              <Link to={"/jobseekerregisterpage"}>Kaydol</Link>
            </b>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}
