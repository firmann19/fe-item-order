const handleError = (error) => {
  if (error.response && error.response.data.msg === "jwt expired") {
    localStorage.removeItem("auth");
    window.location.href = "/";
  } else {
    return Promise.reject(error);
  }
};

export default handleError;
