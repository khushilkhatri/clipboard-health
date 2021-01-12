import { useState, useEffect } from "react";
import { Col, Card, Row, Button } from "react-bootstrap";
import Collapse from "./_shared/collapse";
import styles from "../styles/Home.module.css";

const getURL = () => {
  return window.location.origin;
};

const JobBody = ({ singleJob, search }) => {
  const [jobs, updateJobs] = useState([]);
  const [location, updateLocation] = useState("");
  const [role, updateRole] = useState("");
  const [experience, updateExperience] = useState("");

  const loadData = async () => {
    const response = await fetch(
      `${getURL()}/api/jobs?search=${search}&location=${location}&experience=${experience}&role=${role}`
    );
    const data = await response.json();
    updateJobs(data);
  };

  useEffect(async () => {
    loadData(search);
  }, [search, location, experience, role]);

  return (
    <Col md={9} xs={12} sm={12}>
      <Card body>
        <Row>
          <Col md={3}>
            {jobs.reduce((val, job) => {
              return val + job.items.length;
            }, 0)}{" "}
            Job Postings
          </Col>
          <Col md={2} className="text-muted">
            Sort By
          </Col>
          <Col
            md={1}
            className={
              "p-0 " +
              (location === 1 && "text-success ") +
              (location === -1 && " text-danger")
            }
            onClick={() => {
              location === 1
                ? updateLocation(-1)
                : location === -1
                ? updateLocation("")
                : updateLocation(1);
            }}
          >
            location
          </Col>
          <Col
            md={1}
            className={
              "p-0 " +
              (role === 1 && "text-success ") +
              (role === -1 && " text-danger")
            }
            onClick={() => {
              role === 1
                ? updateRole(-1)
                : role === -1
                ? updateRole("")
                : updateRole(1);
            }}
          >
            Role
          </Col>
          <Col
            md={1}
            className={
              "p-0 " +
              (experience === 1 && "text-success ") +
              (experience === -1 && " text-danger")
            }
            onClick={() => {
              experience === 1
                ? updateExperience(-1)
                : experience === -1
                ? updateExperience("")
                : updateExperience(1);
            }}
          >
            Experience
          </Col>
        </Row>

        <Row className="mt-5">
          {jobs.map((job, index) => {
            return (
              <Collapse
                key={index}
                collapseToggle={
                  <Col
                    md={12}
                    className={styles.pointer + " py-2 border-bottom"}
                  >
                    <Row>
                      <Col md={1} xs={4}>
                        <div className="text-center bg-secondary text-white p-2 rounded mr-2">
                          {job.name.substr(0, 2).toUpperCase()}
                        </div>
                      </Col>
                      <Col md={11} xs={8} className="py-2">
                        {job.items.length} jobs for {job.name}
                      </Col>
                    </Row>
                  </Col>
                }
                collapseBody={
                  <>{job.items.map((item, index) => JobItem(item, index))}</>
                }
              ></Collapse>
            );
          })}
        </Row>
      </Card>
    </Col>
  );
};

const JobItem = (item, index) => {
  return (
    <>
      <Collapse
        key={index}
        collapseToggle={
          <Col md={12} className={styles.pointer + " px-3 py-3 border-bottom"}>
            <Row>
              <Col md={10}>
                <strong>{item.job_title}</strong>
                <br />
                <span>
                  {item.job_type} | ${item.salary_range[0]} - $
                  {item.salary_range[1]} an hour | {item.city}
                </span>
              </Col>
              <Col md={2}>{new Date(item.created).toLocaleDateString()}</Col>
            </Row>
          </Col>
        }
        collapseBody={
          <Col md={12} className="px-4 py-3 border-bottom">
            <Row>
              <Col md={9}>
                <Row>
                  <Col md={3}>
                    <strong>Department:</strong>
                  </Col>
                  <Col md={9}>{item.department.join(", ")}</Col>
                  <Col md={3}>
                    <strong>Hour / Shift:</strong>
                  </Col>
                  <Col md={9}>
                    {item.hours} Hour / {item.work_schedule}
                  </Col>
                  <Col md={3}>
                    <strong>Summary:</strong>
                  </Col>
                  <Col md={9}>{item.description}</Col>
                </Row>
              </Col>
              <Col md={3} xs={12}>
                <Row>
                  <Col md={6}>
                    <Button>Job Details</Button>
                  </Col>
                  <Col md={6}>
                    <Button variant="outline-primary">Save Job</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        }
      />
    </>
  );
};

export default JobBody;
