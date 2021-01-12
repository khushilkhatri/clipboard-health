import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/_shared/navbar";
import { Col, Form, Card, Row } from "react-bootstrap";
import JobBody from "../components/jobBody";
import Footer from "../components/_shared/footer";

export default function Home() {
  const [filters, updateFilters] = useState({});
  const [search, changeSearch] = useState("");
  const changeSearchFun = e => {
    changeSearch(e.target.value);
  };
  useEffect(() => {
    async function loadData() {
      const response = await fetch("http://localhost:3000/api/filters");
      const data = await response.json();
      updateFilters(data);
    }
    loadData();
  }, []);
  console.log(filters);
  return (
    <div>
      <Head>
        <title>Clipboard Health Khushil Kharti</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossorigin="anonymous"
        ></link>
      </Head>
      <Navbar></Navbar>
      <main className="bg-light">
        <Col md={12}>
          <Card body>
            <Form.Control
              type="text"
              className="border-0"
              placeholder="Search for any job, title, keyword or company"
              name="search"
              value={search}
              onChange={e => {
                changeSearchFun(e);
              }}
            />
          </Card>
        </Col>
        <Col md={12} className="mt-3">
          <Row>
            <Col md={3}>
              {filters.job_type && (
                <Row>
                  <Col md={12}>
                    <Card body>
                      <div className="mb-2">
                        <strong>JOB TYPE</strong>
                      </div>
                      {filters.job_type.map(job => (
                        <div className="py-1">
                          <span>{job.key}</span>
                          <span className="text-muted pl-3">
                            {job.doc_count}
                          </span>
                        </div>
                      ))}
                    </Card>
                  </Col>
                  <Col md={12} className="mt-3">
                    <Card body>
                      <div className="mb-2">
                        <strong>DEPARTMENT</strong>
                      </div>
                      {filters.department.map(job => (
                        <div className="py-1">
                          <span>{job.key}</span>
                          <span className="text-muted pl-3">
                            {job.doc_count}
                          </span>
                        </div>
                      ))}
                    </Card>
                  </Col>
                  <Col md={12} className="mt-3">
                    <Card body>
                      <div className="mb-2">
                        <strong>WORK SCHEDULE</strong>
                      </div>
                      {filters.work_schedule.map(job => (
                        <div className="py-1">
                          <span>{job.key}</span>
                          <span className="text-muted pl-3">
                            {job.doc_count}
                          </span>
                        </div>
                      ))}
                    </Card>
                  </Col>
                  <Col md={12} className="my-3">
                    <Card body>
                      <div className="mb-2">
                        <strong>EXPERIENCE</strong>
                      </div>
                      {filters.experience.map(job => (
                        <div className="py-1">
                          <span>{job.key}</span>
                          <span className="text-muted pl-3">
                            {job.doc_count}
                          </span>
                        </div>
                      ))}
                    </Card>
                  </Col>
                </Row>
              )}
            </Col>
            <JobBody search={search} />
          </Row>
        </Col>
      </main>
      <Footer />
      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
    </div>
  );
}
