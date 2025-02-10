import { Navigate } from "react-router-dom";
import { Heading } from "@components/common";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { Input } from "@components/forms";
import useRegister from "@hooks/useRegister";

const Register = () => {
  const {
    loading,
    error,
    accessToken,
    formErrors,
    register,
    handleSubmit,
    emailAvailabilityStatus,
    onSubmit,
    emailOnBlurHandler,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Registration" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="First Name"
              register={register}
              error={formErrors.firstName?.message}
              type="text"
              name="firstName"
            />
            <Input
              label="Last Name"
              register={register}
              error={formErrors.lastName?.message}
              type="text"
              name="lastName"
            />
            <Input
              label="email"
              register={register}
              error={
                formErrors.email?.message
                  ? formErrors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "This email is already in use."
                  : emailAvailabilityStatus === "failed"
                  ? "Error from the server."
                  : ""
              }
              type="text"
              name="email"
              onBlur={emailOnBlurHandler}
              disabled={emailAvailabilityStatus === "checking" ? true : false}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "Email is  available for use"
                  : ""
              }
            />
            <Input
              label="password"
              register={register}
              error={formErrors.password?.message}
              type="password"
              name="password"
            />
            <Input
              label="confirmPassword"
              register={register}
              error={formErrors.confirmPassword?.message}
              type="password"
              name="confirmPassword"
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                loading === "pending" || emailAvailabilityStatus === "checking"
                  ? true
                  : false
              }
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
