import React from "react";
import { toast } from "react-toastify";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import EmployerService from "../../services/EmployerService";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
export default function EmployerRegisterPage() {
  let employerService = new EmployerService();
  const employerRegisterSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Şirket adı zorunludur")
      .min(2, "Şirket adı en az iki uzunlukta olmalıdır"),
    phoneNumber: Yup.string()
      .required("Telefon numarası zorunludur")
      .length(10, "Telefon numarası hatalı '0' olmadan yazınız")
      .matches(/^[0-9]+$/, "Sadece rakam girilmelidir"),
    password: Yup.string()
      .required("Şifre zorunludur")
      .min(8, "Şifre en az 8 karakter uzunluğunda olmalıdır"),
    webSite: Yup.string()
      .required("Web sitesi zorunludur")
      .test("Http olmadan yazınız", function () {
        let site = this.parent["webSite"];
        if (site) {
          return site.startsWith("http") ? false : true;
        }
      }),
    email: Yup.string().required("Email zorunludur").email("Geçerli bir email değil")
      ,
  });

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      companyName: "",
      password: "",
      webSite: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: employerRegisterSchema,
    onSubmit: (values) => {
      employerService
        .registerEmployer(values)
        .then((result) => {
          toast.success(result.data.message);
          history.push("/employerloginpage");
        })
        .catch((result) => {
          toast.error(result.response.data.message);
        });
    },
  });

  return (
    <div
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/du9huaxi3/image/upload/v1624120533/kayit_quqzyf.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        marginTop: 90,
      }}
    >
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="orange" textAlign="center">
            İŞ VEREN KAYIT EKRANI
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="building"
                iconPosition="left"
                placeholder="Şirket Adınız"
                type="text"
                value={formik.values.companyName}
                name="companyName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.companyName && formik.touched.companyName && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.companyName}
                </div>
              )}

              <Form.Input
                fluid
                icon="linkify"
                iconPosition="left"
                placeholder="Web Site Adresiniz"
                required
                type="text"
                name="webSite"
                value={formik.values.webSite}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.webSite && formik.touched.webSite && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.webSite}
                </div>
              )}
              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Telefon Numaranız"
                required
                type="text"
                value={formik.values.phoneNumber}
                name="phoneNumber"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.phoneNumber}
                </div>
              )}
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                type="email"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.email}
                </div>
              )}

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
              <Button color="green" fluid size="large">
                Üye Ol
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}
