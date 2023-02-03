import React from 'react';
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from 'formik';
import { Debug } from './Debug';
// import * as Yup from 'yup';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { UserSchema } from './schemas';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
}

const App = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  }

  const results = UserSchema.safeParse(initialValues);

  if(!results.success) {
    console.log(results.error.format());
  }

  // const validationSchema = Yup.object({
  //   firstName: Yup.string().required('First Name is required.'),
  //   lastName: Yup.string().required('Last Name is required.'),
  //   email: Yup.string().required('Email is required')
  // })
  // initialErrors={validationSchema.isValidSync(initialData)}

  const hasReviewed = true;
  const hasTouched = {
    firstName: hasReviewed,
    lastName: hasReviewed,
    email: hasReviewed,
  }
  return (
    <div>
      <h1>Signup</h1>
      <Formik
        enableReinitialize
        validationSchema={ toFormikValidationSchema(UserSchema) }
        initialValues={ initialValues }
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 100);
        }}
        initialTouched={hasTouched}
        validateOnMount={true}
      >
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="John" />
            <ErrorMessage className="error" component="span" name="firstName" />
          </div>
          <div>
          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />
          <ErrorMessage className="error" component="span" name="lastName" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              placeholder="john@acme.com"
              type="email"
            />
            <ErrorMessage className="error" component="span" name="email" />
          </div>
          <div>
            <br />
            <button type="submit">Submit</button>
          </div>
          <Debug />
        </Form>
      </Formik>
    </div>
  );
};

export default App;

// Example code
// {
//   ({ dirty, isValid } : { dirty: boolean, isValid: boolean }) => (
//     <button disabled={dirty && !isValid} type="submit">Submit</button>
//   )
// }
