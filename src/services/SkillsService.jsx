import axios from "axios";

export default class SkillsService {
  getByCvId(cvId){
    return axios.get(`http://localhost:8080/api/skills/getByCvId?cvId=${cvId}`)
}

  deleteSkills(skillsId) {
    return axios.delete(`http://localhost:8080/api/skills/delete?id=${skillsId}`);
  }
  addSkills(skills) {
    return axios.post("http://localhost:8080/api/skills/add", skills);
  }
}
