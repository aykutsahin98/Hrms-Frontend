import axios from "axios";

export default class LanguageService {
  getByCvId(cvId) {
    return axios.get(
      "http://localhost:8080/api/languages/getByCvId?cvId=" + cvId);
  }
  deleteLanguage(languageId) {
    return axios.delete(`http://localhost:8080/api/languages/delete?id=${languageId}`);
  }
  addLanguage(language) {
    return axios.post("http://localhost:8080/api/languages/add", language);
  }
}
