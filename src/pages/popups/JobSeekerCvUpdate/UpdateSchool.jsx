import React, { useEffect } from "react";
import { useState } from "react";
import EducationService from "../../../services/EducationService";
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateSchool({cvId,updateCvValues}) {

  let [educations, setEducations] = useState([]);

  let educationService = new EducationService();
  useEffect(() => {    
    let educationService = new EducationService();
    educationService.getByCvId(cvId).then((result) => {
      setEducations(result.data.data);
    });
  },[cvId]);

  let schoolAddSchema = Yup.object().shape({
    department: Yup.string().required("Bu alan zorunlu").min(2,"Minimum 2 karakter uzunlugunda olmalıdır"),
    endedDate: Yup.date(),
    schoolName: Yup.string().required("Bu alan zorunludur").min(2,"Minimum 2 karakter uzunlugunda olmalıdır"),
    startedDate: Yup.date().required("Bu alan zorunludur")
  })

  const formik = useFormik({
    initialValues: {
      department:"",
      endedDate:"",
      schoolName:"",
      startedDate:""
    },
    validationSchema: schoolAddSchema,
    onSubmit:(values)=>{
      values.cvId=cvId;
      educationService.addEducation(values).then((result) => {
        toast.success(result.data.message)
        educationService.getByCvId(cvId).then((result) => {
          setEducations(result.data.data);
        })
        updateCvValues();
      }).catch((result) => {
        toast.error(result.response.data.message)
      })
    }
  })

  const handleDeleteSchool = (educationId) => {
    educationService.deleteEducation(educationId).then((result) =>{
      toast.success(result.data.message);
      educationService.getByCvId(cvId).then((result) => {
        setEducations(result.data.data)
      })
      updateCvValues();
    }).catch((result) => {
      toast.error(result.response.data.message)
    })
  }


  return (
    <div>
      <Card fluid color={"black"}>
        <Card.Content header="Okuduğu Okullar" />
        <Table celled color={"black"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Okul Adı</Table.HeaderCell>
              <Table.HeaderCell>Bölüm</Table.HeaderCell>
              <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Mezuniyet Tarihi</Table.HeaderCell>
              <Table.HeaderCell>Sil</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {educations?.map((education) => (
              <Table.Row key={education.id}>
                <Table.Cell>{education.schoolName}</Table.Cell>
                <Table.Cell>{education.department}</Table.Cell>
                <Table.Cell>{education.startedDate}</Table.Cell>
                <Table.Cell>{education.endedDate}</Table.Cell>
                <Table.Cell>
                  <Button color="red" icon="x" circular onClick={() => handleDeleteSchool(education.id)}>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"black"}>
        <Card.Content header="Okul Ekle" />
        <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
                <Grid stackable>
                    <Grid.Column width={8}>
                        <label><b>Okul Adı</b></label>
                        <Form.Input
                            fluid
                            placeholder="Okul Adı"
                            type="text"
                            name="schoolName"
                            value={formik.values.schoolName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <label><b>Başlangıç Tarihi</b></label>
                        <Form.Input
                            fluid
                            type="date"
                            name="startedDate"
                            value={formik.values.startedDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <label><b>Bölüm Adı</b></label>
                    <Form.Input
                            fluid
                            placeholder="Bölüm Adı"
                            type="text"
                            name="department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    <label><b>Mezuniyet Tarihi</b></label>
                        <Form.Input
                            fluid
                            type="date"
                            name="endedDate"
                            value={formik.values.endedDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Grid.Column>
                </Grid>
                <div style={{marginTop:"1em"}}>
                <Button fluid color="green" type="submit">Ekle</Button>
                </div>
            </Form>
        </Card.Content>
      </Card>
    </div>
  );
}