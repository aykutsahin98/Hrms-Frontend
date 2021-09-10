import axios from "axios";

export default class EducationService {

  getByCvId(cvId){
    return axios.get(`http://localhost:8080/api/educations/getByCvId?cvId=${cvId}`)
}

  deleteEducation(educationId) {
    return axios.delete(`http://localhost:8080/api/educations/delete?id=${educationId}`);
  }

  addEducation(education) {
    return axios.post("http://localhost:8080/api/educations/add", education);
  }
}
