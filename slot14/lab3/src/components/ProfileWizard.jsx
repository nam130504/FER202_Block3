import React, { useState } from "react";
import { Tabs, Tab, Button, Form, Modal, Card, Toast, ToastContainer } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ProfileWizard({ onClose }) {
  const [key, setKey] = useState("about");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Modal summary + toast
  const [showSummary, setShowSummary] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    secretQuestion: "",
    answer: "",
    country: "",
    province: "",
    district: "",
    avatar: "https://via.placeholder.com/150" // default avatar
  });

  // Sample data for Viet Nam
  const provincesVN = ["Ha Noi", "Da Nang", "Ho Chi Minh", ];
  const districts = {
    "Ha Noi": ["Ba Dinh", "Dong Da", "Cau Giay"],
    "Da Nang": ["Hai Chau", "Thanh Khe", "Lien Chieu"],
    "Ho Chi Minh": ["Quan 1", "Quan 3", "Quan 7"]
  
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý upload avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: URL.createObjectURL(file) });
    }
  };

  // --- Validation ---
  const validateAbout = () =>
    formData.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const validatePassword = (pwd) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd);

  const validateAccount = () =>
    formData.username.trim().length >= 6 &&
    validatePassword(formData.password) &&
    formData.confirmPassword === formData.password &&
    formData.secretQuestion.trim().length > 0 &&
    formData.answer.trim().length > 0;

  const validateAddress = () => {
    if (formData.country === "Viet Nam") {
      return (
        formData.country.trim().length > 0 &&
        formData.province.trim().length > 0 &&
        formData.district.trim().length > 0
      );
    }
    return formData.country.trim().length > 0;
  };

  // Khi nhấn Finish
  const handleFinish = () => {
    if (!validateAddress()) {
      alert("⚠️ Please complete your address information!");
      return;
    }
    setShowSummary(true);
    setShowToast(true);
  };

  return (
    <>
      <Tabs
        activeKey={key}
        onSelect={(k) => {
          if (k === "account" && !validateAbout()) {
            alert("⚠️ Please complete About information first!");
            return;
          }
          if (k === "address" && !validateAccount()) {
            alert("⚠️ Please complete Account information first!");
            return;
          }
          setKey(k);
        }}
        className="mb-3"
        id="profile-wizard"
      >
        {/* --- Tab About --- */}
        <Tab eventKey="about" title="About">
          <Form.Group className="mb-3 text-center">
            <img
              src={formData.avatar}
              alt="avatar"
              style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div className="mt-2">
              <Form.Control type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button className="mt-2" onClick={() => setKey("account")} disabled={!validateAbout()}>
            Next
          </Button>
        </Tab>

        {/* --- Tab Account --- */}
        <Tab eventKey="account" title="Account">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="At least 6 characters"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 chars, 1 uppercase, 1 number, 1 special"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={showConfirm ? "text" : "password"}
                placeholder="Re-enter password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Secret Question</Form.Label>
            <Form.Select
              name="secretQuestion"
              value={formData.secretQuestion}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a question --</option>
              <option>What is your first pet’s name?</option>
              <option>What is your mother’s maiden name?</option>
              <option>In which city were you born?</option>
              <option>Who was your favorite teacher?</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="mt-3">
            <Button variant="secondary" onClick={() => setKey("about")}>
              Previous
            </Button>{" "}
            <Button onClick={() => setKey("address")} disabled={!validateAccount()}>
              Next
            </Button>
          </div>
        </Tab>

        {/* --- Tab Address --- */}
        <Tab eventKey="address" title="Address">
          <Form.Group className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Select
              name="country"
              value={formData.country}
              onChange={(e) => {
                handleChange(e);
                setFormData({ ...formData, country: e.target.value, province: "", district: "" });
              }}
              required
            >
              <option value="">-- Select country --</option>
              <option>Viet Nam</option>
              <option>Korea</option>
              <option>Italy</option>
              <option>USA</option>
              <option>Japan</option>
            </Form.Select>
          </Form.Group>

          {formData.country === "Viet Nam" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Province/City</Form.Label>
                <Form.Select
                  name="province"
                  value={formData.province}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData({ ...formData, province: e.target.value, district: "" });
                  }}
                  required
                >
                  <option value="">-- Select province --</option>
                  {provincesVN.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {formData.province && (
                <Form.Group className="mb-3">
                  <Form.Label>District</Form.Label>
                  <Form.Select
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select district --</option>
                    {districts[formData.province]?.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </>
          )}

          <div className="mt-3">
            <Button variant="secondary" onClick={() => setKey("account")}>
              Previous
            </Button>{" "}
            <Button onClick={handleFinish} disabled={!validateAddress()}>
              Finish
            </Button>
          </div>
        </Tab>
      </Tabs>

      {/* --- Modal Summary --- */}
      <Modal show={showSummary} onHide={() => setShowSummary(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Img variant="top" src={formData.avatar} alt="avatar" />
            <Card.Body>
              <Card.Title>About</Card.Title>
              <p><b>Name:</b> {formData.name}</p>
              <p><b>Email:</b> {formData.email}</p>

              <Card.Title className="mt-3">Account</Card.Title>
              <p><b>Username:</b> {formData.username}</p>
              <p><b>Secret Question:</b> {formData.secretQuestion}</p>
              <p><b>Answer:</b> {formData.answer}</p>

              <Card.Title className="mt-3">Address</Card.Title>
              <p><b>Country:</b> {formData.country}</p>
              {formData.province && <p><b>Province:</b> {formData.province}</p>}
              {formData.district && <p><b>District:</b> {formData.district}</p>}
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>

      {/* --- Toast message --- */}
      <ToastContainer position="top-end" className="p-3">
        <Toast bg="success" show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
