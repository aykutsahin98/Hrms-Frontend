import axios from "axios";

export default class CvService{
    getCvs(){
        return axios.get("http://localhost:8080/api/cv/getall");
    }

    getByCandidateId(id){
        return axios.get("http://localhost:8080/api/cv/getByCandidateId?candidateId="+id)
    }

    updateGithub(cvId,githubLink){
        return axios.put(`http://localhost:8080/api/cv/updateGithub?cvId=${cvId}&githublink=${githubLink}`)
    }

    updateLinkedin(cvId,linkedin){
        return axios.put(`http://localhost:8080/api/cv/updateLinkedin?cvId=${cvId}&linkedinlink=${linkedin}`)
    }

    updateBiography(cvId,biography){
        return axios.put(`http://localhost:8080/api/cv/updateBiography?biography=${biography}&cvId=${cvId}`)
    }

    deleteGithub(cvId){
        return axios.delete(`http://localhost:8080/api/cv/deleteGithub?cvId=${cvId}`)
    }

    deleteLinkedin(cvId){
        return axios.delete(`http://localhost:8080/api/cv/deleteLinkedin?cvId=${cvId}`)
    }
}