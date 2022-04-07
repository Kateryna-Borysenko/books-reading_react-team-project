import axios from 'axios';

axios.defaults.baseURL = 'https://bookread-backend.goit.global';

export const registerUserApi = userData => {
  return axios.post('/auth/register', userData).then(({ data }) => ({
    email: data.email,
    id: data.id,
  }));
};

export const loginUserApi = userData => {
  return axios.post('/auth/login', userData).then(({ data }) => ({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    sid: data.sid,
    name: data.userData.name,
    email: data.userData.email,
    id: data.userData.id,
    goingToRead: data.userData.goingToRead,
    currentlyReading: data.userData.currentlyReading,
    finishedReading: data.userData.finishedReading,
  }));
};

export const refreshTokenApi = (sid, refreshToken) => {
  axios.defaults.headers.common.Authorization = `Bearer ${refreshToken}`;
  // Documentation recommend POST method, but it looks like that GET is also an option
  return axios.post('/auth/refresh', { sid }).then(({ data }) => ({
    accessToken: data.newAccessToken,
    refreshToken: data.newRefreshToken,
    sid: data.newSid,
  }));
};

export const addNewBookApi = ({formBook, token}) => {
  return axios.post('/book', {token, formBook }).then(({ data }) => ({
    title: data.title,
    author: data.author,
    publishYear: data.publishYear,
    totalPages: data.totalPages,
    pagesFinished: data.pagesFinished, // or 0 as initial value for a new book in the library
    _id: data._id,
  }));
};

export const addBookReviewApi = (reviewData, _id) => {
  // reviewData is an object:
  // {
  //  "rating",
  //  "feedback",
  // }
  //
  // _id - this is "book's id"
  axios.defaults.params = { bookId: _id };
  return axios.post('/book/review', reviewData).then(({ data }) => ({
    title: data.title,
    author: data.author,
    publishYear: data.publishYear,
    totalPages: data.totalPages,
    pagesFinished: data.pagesFinished,
    rating: data.rating,
    feedback: data.feedback,
    _id: data._id,
  }));
};

export const addBookToTrainingApi = addBook => {
  return axios
    .post('/user/books', addBook)
    .then(({ data }) => ({ ...addBook, id: data.id }))
    .catch(err => err);
};

export const getTrainingListApi = () => {
  return axios
    .get('/user/books')
    .then(({ data }) => data)
    .catch(err => err);
};

export const deleteTrainingBookApi = id => {
  return axios
    .delete(`/user/books/${id}`)
    .then(({ data }) => data.id)
    .catch(err => err);
};

export const startTrainingApi = id => {
  return axios
    .post('/planning')
    .then(({ data }) => data)
    .catch(err => err);
};

export const logOutApi = accessToken => {
  return axios
    .post('/auth/logout', accessToken)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      throw err;
    });
};
