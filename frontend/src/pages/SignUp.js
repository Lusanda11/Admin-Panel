// ****************** SignUp.js *********************


// Import necessary modules.
// ----------------------------------------------------------------------------------------------------------------------------
    import React, { useState } from "react"; // Imports React and hooks (useState, useNavigate) to manage state and navigation.
    import { useNavigate } from "react-router-dom";
    import { Formik, Form, Field, ErrorMessage } from "formik"; // Uses Formik for form handling, including form validation with Yup.
    import * as Yup from "yup";
    import { Form as BootstrapForm, Button, Container, Row, Col, ToggleButtonGroup, ToggleButton } from "react-bootstrap"; // Imports Bootstrap components for styling.
    import { useAuth } from "../context/AuthContext"; // Import useAuth
// ----------------------------------------------------------------------------------------------------------------------------

// Defining the SignUp function.
const SignUp = () =>
{
// Component Initialization and State Management.
// ----------------------------------------------------------------------------------------------------------------------------
    const [isSignUp, setIsSignUp] = useState(true); // Initializes a state variable isSignUp to toggle between the Sign-Up and Login forms.
    const { login } = useAuth(); // Access login function from AuthContext
    const navigate = useNavigate(); // Uses useNavigate for redirecting users after form submission.
// ----------------------------------------------------------------------------------------------------------------------------


// Form Initial Values.
// ----------------------------------------------------------------------------------------------------------------------------
    const signUpInitialValues =
    {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Defines initial values for both the Sign-Up and Login forms.
// ----------------------------------------------------------------------------------------------------------------------------
    const loginInitialValues =
    {
        email: "",
        password: "",
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Form Validation Schemas.
// ----------------------------------------------------------------------------------------------------------------------------
    const signUpValidationSchema = Yup.object(
        {
            firstName: Yup.string().required("First name is required"),
            lastName: Yup.string().required("Last name is required"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        }
    );
// ----------------------------------------------------------------------------------------------------------------------------

// Defines Yup validation schemas for both forms to ensure required fields are filled correctly.
// ----------------------------------------------------------------------------------------------------------------------------
    const loginValidationSchema = Yup.object(
        {
            email: Yup.string().email("Invalid email").required("Email is required"),
            password: Yup.string().required("Password is required"),
        }
    );
// ----------------------------------------------------------------------------------------------------------------------------

// Form Submission Handler.
// ----------------------------------------------------------------------------------------------------------------------------
    const handleSubmit = (values, { resetForm }) =>
    {
        if (isSignUp)
        {
            console.log("Sign-Up Form Submitted:", values);
            // On successful signup, login the user and pass the full user data
            login(
                {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                }
            );
        }
        else
        {
            console.log("Login Form Submitted:", values);
            // On successful login, just pass the email (or any necessary data)
            login({ email: values.email });
        }
        resetForm();
        navigate("/"); // Redirect to homepage or dashboard after login/signup
    };
// ----------------------------------------------------------------------------------------------------------------------------

// Component UI and Form.
    return (
        <Container className="mt-5"> {/* Wraps the form in a Bootstrap Container and centers it using Row and Col. */}
          <Row className="justify-content-md-center">
            <Col md={6}>
              <h2 className="text-center">{isSignUp ? "Sign Up" : "Login"}</h2> {/* Displays a heading that dynamically changes based on whether the user is signing up or logging in. */}

              <ToggleButtonGroup type="radio" name="authType" defaultValue={1} className="mb-3 d-flex justify-content-center"> {/* Toggle Button for Switching Between Sign-Up and Login. */}
                <ToggleButton id="signup-btn" variant="outline-primary" value={1} onClick={() => setIsSignUp(true)}>
                  Sign Up
                </ToggleButton>
                <ToggleButton id="login-btn" variant="outline-secondary" value={2} onClick={() => setIsSignUp(false)}>
                  Login
                </ToggleButton>
              </ToggleButtonGroup>

              <Formik
                initialValues={isSignUp ? signUpInitialValues : loginInitialValues}
                validationSchema={isSignUp ? signUpValidationSchema : loginValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
               {/* Sign-Up Form Fields */}
                {({ isSubmitting }) => (
                  <Form as={BootstrapForm}>
                    {isSignUp && (
                      <>
                        <BootstrapForm.Group className="mb-3">
                          <BootstrapForm.Label>First Name</BootstrapForm.Label> {/* Displays the "First Name" and "Last Name" fields only if isSignUp is true. */}
                          <Field name="firstName" type="text" className="form-control" /> {/* Uses Formik’s <Field> for input handling and <ErrorMessage> to display validation errors. */}
                          <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group className="mb-3">
                          <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                          <Field name="lastName" type="text" className="form-control" />
                          <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </BootstrapForm.Group>
                      </>
                    )}

                    <BootstrapForm.Group className="mb-3"> {/* Common Form Fields (Email and Password). */}
                      <BootstrapForm.Label>Email</BootstrapForm.Label> {/* Includes email and password fields, which are required for both Sign-Up and Login. */}
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </BootstrapForm.Group>

                    <BootstrapForm.Group className="mb-3">
                      <BootstrapForm.Label>Password</BootstrapForm.Label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </BootstrapForm.Group>

                    {/* Submit Button. */}
                    <Button type="submit" variant="primary" disabled={isSubmitting} className="w-100"> {/* Displays a submit button that dynamically changes text based on isSignUp. */}
                      {isSubmitting ? "Submitting..." : isSignUp ? "Sign Up" : "Login"} {/* Disables the button while submitting to prevent multiple submissions. */}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
    );
};

export default  SignUp; // Export necessary modules.
