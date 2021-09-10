import axios from "axios";

export default class ImageService {
  uploadImage(cvId, file) {
    return axios.post(`http://localhost:8080/api/images/upload?cvId=${cvId}`, file);
  }
}
