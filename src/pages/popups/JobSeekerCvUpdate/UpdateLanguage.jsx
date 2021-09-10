import React, { useState } from "react";
import { useEffect } from "react";
import LanguageService from "../../../services/LanguageService";
import { Card, Table, Button, Form, Grid, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateLanguage({ cvId, updateCvValues }) {

  let [languages, setLanguages] = useState([]);

  let languageService = new LanguageService();

  useEffect(() => {
    let languageService = new LanguageService();
    languageService.getByCvId(cvId).then((result) => {
      setLanguages(result.data.data);
    });
  },[cvId]);

  let languageAddSchema = Yup.object().shape({
    languageName: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "En az 2 karakter uzunlugunda olmalıdır"),
    level: Yup.number()
      .min(1, "1 Den az olamaz")
      .max(5, "5 ten fazla olamaz")
      .required("Bu alan zorunludur"),
  });

  const formik = useFormik({
    initialValues: {
        languageName: "",
      level: "",
    },
    validationSchema: languageAddSchema,
    onSubmit: (values) => {
      values.cvId = cvId;
      languageService
        .addLanguage(values)
        .then((result) => {
          toast.success(result.data.message);
          languageService.getByCvId(cvId).then((result) => {
            setLanguages(result.data.data)
          })
          updateCvValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message)
        });
    },
  });

  const levels=[1,2,3,4,5]
  const levelOption = levels.map((level) => ({
      key: level,
      text: level,
      value: level
  }))

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  }

  const handleDeleteLanguage = (languageId) => {
      languageService.deleteLanguage(languageId).then((result) => {
          toast.success(result.data.message)
          languageService.getByCvId(cvId).then((result) => {
            setLanguages(result.data.data)
          })
          updateCvValues();
      }).catch((result) => {
          toast.error(result.response.data.message)
      })
  }

  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Bilinen Diller" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Dil</Table.HeaderCell>
              <Table.HeaderCell>Seviye</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.languageName}</Table.Cell>
                <Table.Cell>{language.level}</Table.Cell>
                <Table.Cell>
                  <Button color="red" icon="x" circular onClick={() => handleDeleteLanguage(language.id)}>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>


      <Card fluid color={"black"}>
        <Card.Content header="Dil Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={8}>
                <label>
                  <b>Dil Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Dil Adı"
                  type="text"
                  name="languageName"
                  value={formik.values.languageName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.languageName && formik.touched.languageName && (
                <div className={"ui pointing red basic label"}>
                {formik.errors.languageName}
              </div>
              )}
              </Grid.Column>
              <Grid.Column width={8}>
                <label>
                  <b>Seviye</b>
                </label>
                <Dropdown
                    clearable
                    item
                    placeholder="Seviye"
                    search
                    selection
                    fluid
                    options={levelOption}
                    onChange={(event, data) => {
                        handleChangeSemantic(data.value, "level")
                    }}
                    value={formik.values.level}
                    onBlur={formik.handleBlur}
                    name="level"
                />
                {formik.errors.level && formik.touched.level && (
                <div className={"ui pointing red basic label"}>
                {formik.errors.level}
              </div>
              )}
              </Grid.Column>
            </Grid>
            <div style={{ marginTop: "1em" }}>
              <Button fluid color="green" type="submit">
                Ekle
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}