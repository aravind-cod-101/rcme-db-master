import React from "react";
import { Formik, Form, Field, resetForm } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "../signup.css";
import artbg from "../../assets/art1.jpeg";
import artlogo from "../../assets/rcme-logo.png";
import toastr from "toastr";
import { TextField } from "../TextField";

import { Container, Card, CardBody, Row, Col } from "reactstrap";

class Upload extends React.Component {
  validate = Yup.object({
    id: Yup.string().trim().required("Required"),
  });
  render() {
    return (
      <>
        <Formik
          initialValues={{
            id: "",
          }}
          validationSchema={this.validate}
          onSubmit={(values) => {
            axios
              .get(`http://206.189.130.90:3050/upload/${values.id}`)
              .then((r) => {
                if (r.data.data.length > 0) {
                  toastr.success("Attach your drawing here");
                  this.props.history.push(`/upload/${values.id}`);
                } else {
                  toastr.error("Please check your Id");
                }
              })
              .catch((e) => toastr.error(e));
          }}
        >
          {(formik) => (
            <div className="signup">
              <div className="artlogo-box">
                <img src={artlogo} alt="Art" className="artlogo" />
              </div>
              <h2 className="my-4 font-weight-bold .display-4">Upload</h2>
              {/* <div className="signup-box"> */}
              <Container>
                <Card>
                  <CardBody style={{ backgroundColor: "#e6a9ca" }}>
                    <Row>
                      <Form>
                        <label for="id">
                          <h3>Enter Unique Id</h3>
                        </label>
                        <TextField name="id" type="text" />
                        <button className="btn btn-dark mt-3" type="submit">
                          Upload
                        </button>
                      </Form>
                      <Col>
                        <img
                          style={{ height: "100%", width: "100%" }}
                          src={artbg}
                          alt="Art"
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Container>
            </div>
          )}
        </Formik>
      </>
    );
  }
}

export default Upload;
