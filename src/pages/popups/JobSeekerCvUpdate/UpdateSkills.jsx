import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import SkillsService from "../../../services/SkillsService";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateSkills({ cvId, updateCvValues }) {
  let [skills, setSkills] = useState([]);

  let skillsService = new SkillsService();
  useEffect(() => {
    let skillsService = new SkillsService();
    skillsService.getByCvId(cvId).then((result) => {
      setSkills(result.data.data);
    });
  },[cvId]);

  let technologyAddSchema = Yup.object().shape({
    skillsName: Yup.string()
      .required("Bu alan zorunludur")
      .min(2, "Minimum 2 karakter uzunlugunda olmalıdır"),
  });

  const formik = useFormik({
    initialValues: {
      skillsName: "",
    },
    validationSchema: technologyAddSchema,
    onSubmit: (values) => {
      values.cvId = cvId;
      skillsService
        .addSkills(values)
        .then((result) => {
          toast.success(result.data.message)
          skillsService.getByCvId(cvId).then((result) => {
            setSkills(result.data.data)
          })
          updateCvValues();
        })
        .catch((result) => {
          toast.error(result.response.data.message)
        });
    },
  });

  const handleDeleteTechnology = (skillsId) => {
    skillsService.deleteSkills(skillsId).then((result) => {
          toast.success(result.data.message)
          skillsService.getByCvId(cvId).then((result) => {
            setSkills(result.data.data)
          })
          updateCvValues();
      }).catch((result) => {
          toast.error(result.response.data.message)
      })
  }

  return (
    <div>
      <Grid stackable>
        <Grid.Column width={8}>
          <Card fluid color={"black"}>
            <Card.Content header={"Teknoloji Ekle"} />
            <Card.Content>
              <Form onSubmit={formik.handleSubmit}>
                <label>
                  <b>Teknoloji Adı</b>
                </label>
                <Form.Input
                  fluid
                  placeholder="Teknoloji Adı Adı"
                  type="text"
                  name="skillsName"
                  value={formik.values.skillsName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.skillsName && formik.touched.skillsName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.skillsName}
                  </div>
                )}
                <Button fluid color="green" type="submit">Ekle</Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={8}>
          <Table celled color={"black"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Teknoloji</Table.HeaderCell>
                <Table.HeaderCell>Sil</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {skills?.map((skill) => (
                <Table.Row key={skill.id}>
                  <Table.Cell>{skill.skillsName}</Table.Cell>
                  <Table.Cell>
                    <Button color="red" icon="x" circular onClick={() => handleDeleteTechnology(skill.id)}>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}