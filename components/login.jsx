import { useRef } from "react";

export default function Login() {
  const userNameRef = useRef("");
  const emailRef = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userNameValue = userNameRef.current.value;
    const emailValue = emailRef.current.value;

    // Display the values in an alert
    alert(`Username: ${userNameValue}\nEmail: ${emailValue}`);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login Form</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            User Name:
          </label>
          <input
            type="text"
            ref={userNameRef}
            className="form-control"
            id="userName"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            ref={emailRef}
            className="form-control"
            id="email"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
