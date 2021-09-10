import React from "react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import JobSeekerService from "../../services/JobSeekerService";

import { useFormik } from "formik";
import { toast } from "react-toastify";

export default function JobSeekerRegisterPage() {
  let candidateService = new JobSeekerService();
  const candidateRegisterSchema = Yup.object().shape({
    birthYear: Yup.date().required("Doğum Tarihi zorunludur"),
    email: Yup.string().required("Email alanı zorunludur").email("Geçerli bir email değil"),
    firstName: Yup.string().required("İsim zorunludur"),
    lastName: Yup.string().required("Soy isim zorunludur"),
    nationalId: Yup.string().required("Kimlik numarası zorunludur").length(11, "Kımlık numarası hatalı").matches(/^[0-9]+$/, "Sadece rakam girilmelidir"),
    password: Yup.string().required("Şifre zorunludur").min(8, "Şifre en az 8 karakter uzunlugunda olmalıdır"),
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      birthYear: "",
      email: "",
      firstName: "",
      lastName: "",
      nationalId: "",
      password: "",
    },
    validationSchema: candidateRegisterSchema,
    onSubmit: (values) => {
      candidateService
        .registerCandidate(values)
        .then((result) => {
          toast.success(result.data.message);
          history.push("/jobseekerloginpage");
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div style={{ marginTop: 95 }}>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            <Image src="https://res.cloudinary.com/du9huaxi3/image/upload/v1624095648/customer_gltqs4.png" />{" "}
            İş Arayan Kayıt Ekranı
          </Header>
          <Form size="large" onSubmit={formik.handleSubmit}>
            <Segment stacked>
              <Grid stackable>
                <Grid.Column width={8}>
                  <div style={{ marginTop: "1em" }}>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="İsim"
                      type="text"
                      value={formik.values.firstName}
                      name="firstName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.firstName && formik.touched.firstName && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: "1em" }}>
                    <Form.Input
                      fluid
                      icon="user"
                      iconPosition="left"
                      placeholder="Soy isim"
                      type="text"
                      value={formik.values.lastName}
                      name="lastName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.lastName && formik.touched.lastName && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.lastName}
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: "1em" }}>
                    <Form.Input
                      fluid
                      icon="id card"
                      iconPosition="left"
                      placeholder="Kimlik numarası"
                      type="text"
                      value={formik.values.nationalId}
                      name="nationalId"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.nationalId &&
                      formik.touched.nationalId && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.nationalId}
                        </div>
                      )}
                  </div>
                  <div style={{ marginTop: "1em" }}>
                    <Form.Input
                      fluid
                      icon="calendar"
                      iconPosition="left"
                      placeholder="Dogum Yılı"
                      type="number"
                      value={formik.values.birthYear}
                      name="birthYear"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.birthYear &&
                      formik.touched.birthYear && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.birthYear}
                        </div>
                      )}
                  </div>
                </Grid.Column>

                <Grid.Column width={8}>
                  <div style={{ marginTop: "1em" }}>
                    <Form.Input
                      fluid
                      icon="mail"
                      iconPosition="left"
                      placeholder="E-mail adresi"
                      type="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="email"
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
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="password"
                    />
                    {formik.errors.password && formik.touched.password && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                </Grid.Column>
              </Grid>

              <br />
              <Button color="teal" fluid size="large" type="submit">
                Kayıt Ol
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
