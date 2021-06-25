import axios from "axios";

export default class JobAdvertisementService {
  getJobAdvertisement() {
    return axios.get("http://localhost:8080/api/jobadvertisements/sortbyreleasedate");
  }

  getById(id){
    return axios.get("http://localhost:8080/api/jobadvertisements/getbyid?id=" + id)
}

  add(jobAdvert) {
    return axios.post("http://localhost:8080/api/jobadvertisements/add", jobAdvert);
  }

  delete(id) {
    return axios.post("http://localhost:8080/api/jobadvertisements/delete?id=" + id);
  }

  getByConfirmFalse(){
    return axios.get("http://localhost:8080/api/jobadvertisements/getbyisconfirm?isConfirm=false")
}

getByJobAdvertisementIdAndConfirmFalse(id){
    return axios.get("http://localhost:8080/api/jobadvertisements/getbyisconfirm?isConfirm=false&id="+id)
}
confirm(id){
  return axios.post("http://localhost:8080/api/jobadvertisements/updateisconfirm?isConfirm=true&id="+id)
}
}
