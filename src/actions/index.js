import axios from 'axios';


export const FETCH_POSTS = 'fetch_posts';
export const CREATE_POST = 'create_Post';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=PAPERCLIPBLOG1234';

export function fetchPosts(){
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
  .then(() => callback()); //navigation call back i.e. after creating a new post control transfer to home page

  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id){
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
  return{
    type: FETCH_POST,
    payload:request
  };
}

export function deletePost(id, callback){
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
  .then(() => callback()); //navigation call back i.e. after deleting a post control transfer to home page
  return{
    type: DELETE_POST,
    payload: id
  };
}
