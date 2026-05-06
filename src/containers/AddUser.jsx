import React, { useState } from "react";

const AddUser = (props) => {
  const { handleSubmit } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleFLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAdd = (event) => {
    handleSubmit({
      firstName,
      lastName,
      email,
    });
    event.preventDefault();
  };

  return (
    <form onSubmit={handleAdd} action="">
      <label for="fname">First Name</label>
      <input
        type="text"
        id="fname"
        onChange={handleFirstNameChange}
        style={{
          width: "100%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
        name="firstname"
        placeholder="Your name.."
      />

      <label for="lname">Last Name</label>
      <input
        type="text"
        id="lname"
        name="lastname"
        onChange={handleFLastNameChange}
        style={{
          width: "100%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
        placeholder="Your last name.."
      />
      <label for="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={handleEmailChange}
        style={{
          width: "100%",
          padding: "12px 20px",
          margin: "8px 0",
          display: "inline-block",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxSizing: "border-box",
        }}
        placeholder="Your email.."
      />
      <input
        type="submit"
        value="Submit"
        style={{
          width: "100%",
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "14px 20px",
          margin: "8px 0",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      />
    </form>
  );
};

export default AddUser;
