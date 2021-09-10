import axios from "axios";

export default class ExperinceService {
  getByCvId(cvId){
    return axios.get(`http://localhost:8080/api/jobExperience/getByCvId?id=${cvId}`)
}

  deleteExperince(experinceId) {
    return axios.delete(`http://localhost:8080/api/jobExperience/delete?id=${experinceId}`);
  }
  addExperince(experince) {
    return axios.post("http://localhost:8080/api/jobExperience/add", experince);
  }
}
