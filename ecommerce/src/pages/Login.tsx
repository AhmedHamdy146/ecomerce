import { Navigate } from "react-router-dom";
import { Heading } from "@components/common";
import { Input } from "@components/forms";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import useLogin from "@hooks/useLogin";
const Login = () => {
  const {
    loading,
    error,
    register,
    formErrors,
    onSubmit,
    handleSubmit,
    accessToken,
    searchParam,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParam.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created, please login
            </Alert>
          )}
          {searchParam.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to access the page
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="text"
              name="email"
              register={register}
              error={formErrors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              name="password"
              register={register}
              error={formErrors.password?.message}
            />

            <Button
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={loading === "pending"}
            >
              {loading === "pending" ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </>
              ) : (
                "Login"
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

export default Login;
