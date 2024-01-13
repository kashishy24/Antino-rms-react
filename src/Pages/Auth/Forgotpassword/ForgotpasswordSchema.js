import * as yup from 'yup';

let Forgotpasswordschema = yup.object().shape({
    oldpassword : yup.string().required().min(6).max(16),
    newpassword :  yup.string().required().min(6).max(16),
    confirmnewpassword :  Yup.string()
    .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
});

export default Forgotpasswordschema;