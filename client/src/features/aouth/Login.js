import { useEffect, useState } from "react";
import { useLoginMutation } from "../aouth/aothApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Message } from "primereact/message";
import { Divider } from "primereact/divider";

import "primereact/resources/themes/lara-light-green/theme.css";
import "primereact/resources/primereact.min.css";

import "./Register.css";

const Login = () => {
  const [login, { isError, isSuccess, error, data }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.token));
      navigate("/");
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = login(formData);
    localStorage.setItem("Token", token);
  };

  return (
    <div
      className="register-container"
      style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}
    >
      <Card
        title="התחברות למערכת"
        style={{ width: "30rem", padding: "2rem" }}
        className="shadow-3 border-round-xl"
      >
        <Divider />
        {isError && (
          <Message severity="error" text="שגיאה בהתחברות. נסה שוב." />
        )}
        <form onSubmit={handleSubmit} className="register-form p-fluid">
          <div className="p-field" style={{ marginBottom: "1rem" }}>
            <label htmlFor="userName" className="block mb-2">
              שם משתמש
            </label>
            <InputText
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="p-inputtext-lg w-full"
            />
          </div>
          <div className="p-field" style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="password" className="block mb-2">
              סיסמה
            </label>
            <Password
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              toggleMask
              feedback={false}
              required
              className="w-full"
              inputClassName="p-inputtext-lg"
            />
          </div>
          <Button
            type="submit"
            label="התחבר"
            icon="pi pi-sign-in"
            className="p-button-success p-button-lg w-full"
          />
        </form>
      </Card>
    </div>
  );
};

export default Login;
