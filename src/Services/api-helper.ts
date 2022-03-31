import axios from 'axios';

const baseUrl = process.env.Node_ENV === 'production' ? 'https://circle-chat1.herokuapp.com' : 'http://localhost:5050';


// Create a new instance of axios with a custom config
// Useful to reduce redundency of typing out entire url for each request, just write path
// Use axios like normal, but just call api.get instaed of axios.get
const api = axios.create({
  baseURL: baseUrl,
});

interface RegisterData {
  username: string,
  password: string
}
export const registerUser = async (registerData: RegisterData, navigate: Function) => {
  
  await api.post('/api/user/create', registerData)
    .then(res => {
      // console.log('successfully created new user');
      navigate('/');
      window.location.reload();
    }).catch(err => {
      // console.log(err);
      // console.log('Sorry, your username or password is unavailable to use, try again');
      return err;
    });
  
};

interface LoginData {
  username: string, 
  password: string
}
// Uses /user/auth post to verify credentials, then grants a jwt and user info
export const loginUser = async (loginData: LoginData) => 
  await api.post('/user/auth', loginData).then(res => {

    localStorage.setItem('authToken', res.data.token);
    api.defaults.headers.common.authorization = `Bearer ${res.data.token}`;
    return res.data.user;
  }).catch(err => console.log('CANNOT LOG IN'))




export const verifyUser = async () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    return api.get('/user/auth/verify')
      .then(res => {
        return res.data
      }, err => null)
  }
}

export const removeToken = () => {
  // Accepts type string, number, boolean
  api.defaults.headers.common.authorization = false;
};