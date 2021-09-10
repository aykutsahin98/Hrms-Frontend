import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ExperienceService from '../../../services/ExperinceService'
import { Card, Table, Button, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateExperience({cvId,updateCvValues}) {

    let [experiences, setExperiences] = useState([])

    let experienceService = new ExperienceService();
    useEffect(() => {
        let experienceService = new ExperienceService();
        experienceService.getByCvId(cvId).then((result) => {
            setExperiences(result.data.data)
        })
    },[cvId])

    let experienceAddSchema = Yup.object().shape({
        workspaceName: Yup.string().required("Bu alan zorunludur").min(2,"En az 2 karakter uzunlugunda olmalıdır"),
        position: Yup.string().required("Bu alan zorunludur").min(2,"En az 2 karakter uzunlugunda olmalıdır"),
        startedDate: Yup.date().required("Bu alan zorunludur"),
        endedDate: Yup.date(),
    })

    const formik = useFormik({
        initialValues: {
            workspaceName:"",
            position:"",
            startedDate:"",
            endedDate:"",
        },
        validationSchema: experienceAddSchema,
        onSubmit:(values)=>{
            values.cvId=cvId;
            experienceService.addExperince(values).then((result) => {
                toast.success(result.data.message)
                experienceService.getByCvId(cvId).then((result) => {
                    setExperiences(result.data.data)
                })
                updateCvValues();
            }).catch((result) => {
                toast.error(result.response.data.message)
            })
        }
    })

    const handleDeleteExperience = (experienceId) => {
        experienceService.deleteExperince(experienceId).then((result) => {
            toast.success(result.data.message);
            experienceService.getByCvId(cvId).then((result) => {
                setExperiences(result.data.data)
            })
            updateCvValues();
        }).catch((result) => {
            toast.error(result.response.data.message)
        })
    }

    return (
        <div>
            <Card fluid color={"black"}>
                <Card.Content header="Tecrübeler" />
                <Table celled color={"black"}>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                    <Table.HeaderCell>Pozisyon</Table.HeaderCell>
                    <Table.HeaderCell>Başlangıç Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Bitiş Tarihi</Table.HeaderCell>
                    <Table.HeaderCell>Sil</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {experiences?.map((experience) => (
                        <Table.Row key={experience.id}>
                            <Table.Cell>{experience.workspaceName}</Table.Cell>
                            <Table.Cell>{experience.position}</Table.Cell>
                            <Table.Cell>{experience.startedDate}</Table.Cell>
                            <Table.Cell>{experience.endedDate ? experience.endedDate:<p>Devam ediyor</p>}</Table.Cell>
                            <Table.Cell>
                            <Button color="red" icon="x" circular onClick={() => handleDeleteExperience(experience.id)}>
                            </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                </Table>
            </Card>
            <Card fluid color={"black"}>
                <Card.Content header="Tecrübe Ekle"/>
                <Card.Content>
                <Form onSubmit={formik.handleSubmit}>
                    <Grid>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Şirket Adı</b></label>
                            <Form.Input
                                fluid
                                placeholder="Şirket Adı"
                                type="text"
                                name="workspaceName"
                                value={formik.values.workspaceName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.workspaceName && formik.touched.workspaceName && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.workspaceName}
                                </div>
                            )}
                            </div>
                            <label><b>Başlangıç Tarihi</b></label>
                            <Form.Input
                                fluid
                                type="date"
                                name="startedDate"
                                value={formik.values.startedDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.startedDate && formik.touched.startedDate && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.startedDate}
                                </div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div>
                                <label><b>Pozisyon</b></label>
                                <Form.Input
                                    fluid
                                    placeholder="Pozisyon"
                                    type="text"
                                    name="position"
                                    value={formik.values.position}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.position && formik.touched.position && (
                                    <div className={"ui pointing red basic label"}>
                                        {formik.errors.position}
                                    </div>
                                )}
                            </div>
                            <label><b>Bitiş Tarihi</b></label>
                            <Form.Input
                                fluid
                                type="date"
                                name="endedDate"
                                value={formik.values.endedDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.endedDate && formik.touched.endedDate && (
                                <div className={"ui pointing red basic label"}>
                                    {formik.errors.endedDate}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop:"1em"}}>
                    <Button fluid color="green" type="submit">Ekle</Button>
                    </div>
                </Form>
                </Card.Content>
            </Card>
        </div>
    )
}