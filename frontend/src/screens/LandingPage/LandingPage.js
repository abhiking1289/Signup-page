import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import "./LandingPage.css";

const LandingPage = ({ history }) => {
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo"); //getting the information from local storage
    if (userInfo) {
      history.push("/mynotes"); // if there is something info then we push that to mynotes page
    }
  }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome</h1>
              <p className="subtitle">Learning meets satisfaction</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/register">
                <Button
                  size="lg"
                  className="landingbutton"
                  variant="outline-primary"
                >
                  Signup
                </Button>
              </a>
            </div>
            <br />
            <div>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                href="https://accounts.google.com/signin/v2/identifier?passive=1209600&continue=https%3A%2F%2Faccounts.google.com%2Fb%2F1%2FAddMailService&followup=https%3A%2F%2Faccounts.google.com%2Fb%2F1%2FAddMailService&hl=en&flowName=GlifWebSignIn&flowEntry=ServiceLogin"
              >
                Signin with google
              </Button>{" "}
              <Button
                variant="primary"
                size="sm"
                type="submit"
                href="https://www.facebook.com/"
              >
                Signin with Facebook
              </Button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
