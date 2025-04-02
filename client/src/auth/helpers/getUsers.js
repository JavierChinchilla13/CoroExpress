import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
});

const logInUser = (email, password) => {

  const userJSONobject = {
    email,
    password
  }

  let success = false;

  api.get("/login", userJSONobject)
  .then((response) => {
    console.log("Login successful", response);
    success = true;
    return {
      success,
      response
    };
  })
  .catch((error) => {
    console.error("Login failed", error);
    return {
      success,
      response: null
    };
  });
   
};

// const createUser2 = () => api.post("/login");


const resgisterUser = (user) => {

  let success = false
  api.post("/login", user )
    .then((response) => {
      console.log("Registration successful", response.data);
      success = true;
    })
    .catch((error) => {
      console.error("Registration failed", error);
    });

    return success;
};



export { logInUser, resgisterUser };
