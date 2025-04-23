import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import DataTable from "react-data-table-component";
import { useDebounce } from "use-debounce";
import {
  getMostFrequentlySentEmails,
  sendEmails,
} from "../services/EmailService";
import toast from "react-hot-toast";

function AddEmailsComponent() {
  const [email, setEmail] = useState("");
  const [debouncedEmail] = useDebounce(email, 300);
  const [emailError, setEmailError] = useState("");
  const [addedEmails, setAddedEmails] = useState([]);
  const [data, setData] = useState([]);

  const columns = [
    { name: "No", selector: (row) => row.id, width: "80px" },
    { name: "Email", selector: (row) => row.email, width: "800px" },
    { name: "Repeats", selector: (row) => row.repeats, width: "100px" },
  ];

  useEffect(() => {
    getMostFrequentlySentEmails()
      .then((response) => setData(response.data))
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (debouncedEmail.trim() === "") {
      setEmailError("");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(debouncedEmail)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  }, [debouncedEmail]);

  const handleEmailChange = (value) => setEmail(value);

  const addEmail = (e) => {
    e.preventDefault();
    if (!email || emailError) return;
    setAddedEmails((prev) => [...prev, email]);
    setEmail("");
  };

  const removeEmail = (index) => {
    setAddedEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSendEmails = () => {
    sendEmails(addedEmails)
      .then(() => {
        setAddedEmails([]);
        return getMostFrequentlySentEmails();
      })
      .then((res) => setData(res.data))
      .catch((err) =>
        toast.error(err.response?.data?.message || "Sending failed")
      );
  };

  const createChip = (email, index) => (
    <Col
      key={index}
      xs="auto"
      className="d-flex justify-content-center align-items-center"
    >
      <div
        className="d-flex align-items-center justify-content-between text-white rounded"
        style={{
          backgroundColor: "#e83e8c",
          width: "220px",
          padding: "8px 12px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
          {email}
        </span>
        <button
          onClick={() => removeEmail(index)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            marginLeft: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ×
        </button>
      </div>
    </Col>
  );

  return (
    <Container>
      <h2 className="py-3">Add Emails to Database</h2>

      <Form onSubmit={addEmail}>
        <Row className="align-items-center">
          <Col md={9}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">
              {emailError}
            </Form.Control.Feedback>
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit">
              Add Email <FaArrowRight />
            </Button>
          </Col>
        </Row>
      </Form>

      <Row className="flex-nowrap overflow-auto py-4 gx-2">
        {addedEmails.map((email, index) => createChip(email, index))}
      </Row>

      <Row>
        <Col xs="auto">
          <Button
            variant="secondary"
            onClick={handleSendEmails}
            disabled={addedEmails.length < 3}
          >
            <BsCartFill className="me-2" />
            Send Emails
          </Button>
        </Col>
      </Row>

      <h2 className="py-5">Most Frequently Sent Emails</h2>

      <DataTable
        columns={columns}
        data={data}
        striped
        highlightOnHover
        fixedHeader
      />
    </Container>
  );
}

export default AddEmailsComponent;
