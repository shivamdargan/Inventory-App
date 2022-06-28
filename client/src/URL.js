const URL =
  process.env.NODE_ENV === "production"
    ? 'https://inventory-app-in.herokuapp.com'
    : 'http://localhost:5000'
export default URL;
