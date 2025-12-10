import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";

import { useNavigate } from "react-router-dom";
import { useRegisterFuncMutation } from "../aouth/aothApiSlice";

const Register = () => {
  const [register, { isError, isSuccess, error, isLoading, data }] = useRegisterFuncMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <div
      className="register-container"
      style={{
        display: "flex",
        justifyContent: "center",
        direction: "rtl",
        marginTop: "5rem"
      }}
    >
      <Card title="הרשמה" style={{ width: "30rem", padding: "2rem" }}>
        <Divider />
        {isError && (
          <Message
            severity="error"
            text={error?.data?.message || "אירעה שגיאה"}
            style={{ marginBottom: "1rem" }}
          />
        )}

        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="p-field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">שם מלא</label>
            <InputText id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="p-field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="userName">שם משתמש</label>
            <InputText id="userName" name="userName" value={formData.userName} onChange={handleChange} required />
          </div>

          <div className="p-field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">אימייל</label>
            <InputText id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="p-field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="phone">טלפון</label>
            <InputText id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="p-field" style={{ marginBottom: "2rem" }}>
            <label htmlFor="password">סיסמה</label>
            <Password
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              toggleMask
              feedback={false}
              required
            />
          </div>

          <Button
            type="submit"
            label={isLoading ? "נרשם..." : "הרשמה"}
            icon="pi pi-user-plus"
            className="p-button-success p-button-rounded"
            disabled={isLoading}
          />
        </form>
      </Card>
    </div>
  );
};

export default Register;
