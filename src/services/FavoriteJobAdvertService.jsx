import axios from "axios";


export default class FavoriteJobAdvertService {
    getByCandidateId(candidateId) {
      return axios.get(
        `http://localhost:8080/api/favorites/getbycandidateid?candidateI=${candidateId}`
      );
    }
  
    addFavorite(candidateId, jobAdvertId) {
      return axios.post(
        `http://localhost:8080/api/favorites/addfavorite?candidateId=${candidateId}&jobAdvertId=${jobAdvertId}`
      );
    }
  
    removeFavorite(favoriteId){
      return axios.post(
          `http://localhost:8080/api/favorites/removefavorite?favoriteId=${favoriteId}`
        );
    }
  }