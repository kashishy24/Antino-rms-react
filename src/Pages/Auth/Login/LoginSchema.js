import * as yup from "yup";

let loginschema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6).max(16),
});

export default loginschema;
