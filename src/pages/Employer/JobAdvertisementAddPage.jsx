import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import JobAdvertisementService from '../../services/JobAdvertisementService';
import JobPositionService from '../../services/JobPositionService';
import WorkTypeService from '../../services/WorkTypeService';
import CityService from '../../services/CityService';
import * as Yup from "yup";
import {Button, Dropdown,Input,TextArea,Card,Form, Grid,} from "semantic-ui-react";

export default function JobAdvertisementAddPage() {
    let jobAdvertisementService = new JobAdvertisementService();

    const addScheme = Yup.object().shape({
      jobDescription: Yup.string().required("Açıklama Kısmı Zorunlu"),
      jobPositionId: Yup.number().required("Pozisyon Bilgisi Zorunlu"),
      workingTypeId: Yup.number().required("Çalışma Tipi Zorunlu"),
      numberOfOpenPositions: Yup.number().required("Açık Pozisyon Sayısı Zorunlu").min(1,"Kota 1'den Küçük Olamaz"),
      cityId: Yup.number().required("Şehir Bilgisi Zorunlu"),
      applicationDeadline: Yup.string().required("İlan Bitiş Tarihi Zorunlu"),
      creationDate: Yup.string().required("Oluşturma Tarihi Zorunlu"),
      minSalary: Yup.number().min(0, "Maaş 0'dan Az Olamaz").required("Minimum Maaş Zorunlu"),
      maxSalary: Yup.number().min(0, "Maaş 0'dan Az Olamaz").required("Maksimum Maaş Zorunlu"),
  });
    
      const history = useHistory();
    
      const formik = useFormik({
        initialValues: {
          jobDescription : "", 
          jobPositionId : "", 
          workingTypeId : "", 
          numberOfOpenPositions : "",
          cityId : "",
          applicationDeadline : "",
          creationDate : "",
          maxSalary : "",
          minSalary : "",
        },
        validationSchema: addScheme,
        onSubmit: (values) => 
        { 
          values.employerId = 2; 
          jobAdvertisementService.add(values).then((result) => console.log(result.data.data));
          alert("İş ilanı eklendi, personelin onayı ardından listelenecektir");
          history.push("/jobadvertspage");
        },
      });
    
      const [WorkingType, setWorkTypes] = useState([]);
      const [City, setCities] = useState([]);
      const [JobPosition, setJobPositions] = useState([]);
    
      useEffect(() => {
        let workTypeService = new WorkTypeService();
        let cityService = new CityService();
        let jobPositionService = new JobPositionService();
    
        workTypeService.getWorkTypes().then((result) => setWorkTypes(result.data.data));
        cityService.getCities().then((result) => setCities(result.data.data));
        jobPositionService.getPositions().then((result) => setJobPositions(result.data.data));
      }, []);
    
      const workTypeOption = WorkingType.map((workType, index) =>(
        { key:index, text:workType.typeName, value: workType.id}));

      const cityOption = City.map((cities, index) =>(
        { key:index, text:cities.cityName, value: cities.id}));

      const jobPositionOption = JobPosition.map((jobPosition, index) =>(
        { key:index, text:jobPosition.name, value: jobPosition.id}));
    
      const handleChangeSemantic = (value, fieldName) => {
        formik.setFieldValue(fieldName, value);
      };

    return (
        <div className="container">
             <Card fluid  className="cardstyle">
        <Card.Content  header="İş ilanı Ekle" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}><Form.Field style={{ marginBottom: "1rem" }}>
              <label>İş Pozisyonu</label>
              <Dropdown clearable item placeholder="İş pozisyonu" search selection onChange={(event, data) =>
                  handleChangeSemantic(data.value, "jobPositionId")
                }
                onBlur={formik.onBlur}
                id="jobPositionId"
                value={formik.values.jobPositionId}
                options={jobPositionOption}
              />
              {formik.errors.jobPositionId && formik.touched.jobPositionId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.jobPositionId}
                </div>
              )}
            </Form.Field> 
            <Form.Field>
              <label>Şehir</label>
              <Dropdown clearable item placeholder="Şehir" search selection onChange={(event, data) =>
                  handleChangeSemantic(data.value, "cityId")
                }
                onBlur={formik.onBlur}
                id="cityId"
                value={formik.values.cityId}
                options={cityOption}
              />
              {formik.errors.cityId && formik.touched.cityId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.cityId}
                </div>
              )}
            </Form.Field>
            <Form.Field>
              <label>Çalışma yeri</label>
              <Dropdown
                clearable
                item
                placeholder="Çalışma Türü"
                search
                selection
                onChange={(event, data) =>
                  handleChangeSemantic(data.value, "workingTypeId")
                }
                onBlur={formik.onBlur}
                id="workingTypeId"
                value={formik.values.workingTypeId}
                options={workTypeOption}
              />
              {formik.errors.workingTypeId && formik.touched.workingTypeId && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.workingTypeId}
                </div>
              )}        
            </Form.Field>
            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Maaş aralığı MİNİMUM
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Maaş aralığı MİNİMUM"
                    value={formik.values.minSalary}
                    name="minSalary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.minSalary && formik.touched.minSalary && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.salaryMin}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Maaş aralığı MAKSİMUM
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="number"
                    placeholder="Maaş aralığı MAKSİMUM"
                    value={formik.values.maxSalary}
                    name="maxSalary"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></Input>
                  {formik.errors.maxSalary && formik.touched.maxSalary && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.maxSalary}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Form.Field>
              <Grid stackable>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Açık Posisyon sayısı
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    id="numberOfOpenPositions"
                    name="numberOfOpenPositions"
                    error={Boolean(formik.errors.numberOfOpenPositions)}
                    onChange={formik.handleChange}
                    value={formik.values.numberOfOpenPositions}
                    onBlur={formik.handleBlur}
                    type="number"
                    placeholder="Açık Posisyon sayısı"
                  />
                  {formik.errors.numberOfOpenPositions &&
                    formik.touched.numberOfOpenPositions && (
                      <div className={"ui pointing red basic label"}>
                        {formik.errors.numberOfOpenPositions}
                      </div>
                    )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Son başvuru tarihi
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.applicationDeadline)}
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "applicationDeadline")
                    }
                    value={formik.values.applicationDeadline}
                    onBlur={formik.handleBlur}
                    name="applicationDeadline"
                    placeholder="Son başvuru tarihi"
                  />
                  {formik.errors.applicationDeadline && formik.touched.applicationDeadline && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.applicationDeadline}
                    </div>
                  )}
                </Grid.Column>
                <Grid.Column width={8}>
                  <label style={{ fontWeight: "bold" }}>
                    Oluşturma tarihi
                  </label>
                  <Input
                    style={{ width: "100%" }}
                    type="date"
                    error={Boolean(formik.errors.creationDate)}
                    onChange={(event, data) =>
                      handleChangeSemantic(data.value, "creationDate")
                    }
                    value={formik.values.creationDate}
                    onBlur={formik.handleBlur}
                    name="creationDate"
                    placeholder="Son başvuru tarihi"
                  />
                  {formik.errors.creationDate && formik.touched.creationDate && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.creationDate}
                    </div>
                  )}
                  </Grid.Column>

              </Grid>
            </Form.Field>

            <Form.Field>
              <label>Açıklama</label>
              <TextArea
                placeholder="Açıklama"
                style={{ minHeight: 100 }}
                error={Boolean(formik.errors.jobDescription).toString()}
                value={formik.values.jobDescription}
                name="jobDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.jobDescription && formik.touched.jobDescription && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.jobDescription}
                </div>
              )}
            </Form.Field>
            <Button
              content="ilan Ekle"
              labelPosition="right"
              icon="add"
              positive
              type="submit"
              style={{ marginLeft: "300px" }}
            />
          </Form>
        </Card.Content>
      </Card>
        </div>
    )
}
