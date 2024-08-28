import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function UserForm({ handleOnChange, onFormSubmit, handleCloseForm, rest }) {
  return (
    <div className="formContainer">
      <form onSubmit={onFormSubmit}>
        {/* <form onSubmit={onFormSubmit} className="userForm"> */}
        <div className="close-btn" id="closeFormBtn" onClick={handleCloseForm}>
          <AiOutlineClose />
        </div>
        <label htmlFor="name">Enter Name</label>
        <div className="input-container">
          <input
            type="text"
            name="name"
            id="name"
            className="input-name"
            autoFocus
            required
            onChange={handleOnChange}
            value={rest.name}
          />
        </div>
        <label htmlFor="email">Enter Email</label>
        <div className="input-container">
          <input
            type="email"
            name="email"
            id="email"
            className="input-email"
            placeholder="your-email@example.com"
            required
            onChange={handleOnChange}
            value={rest.email}
          />
        </div>
        <label htmlFor="mobile">Enter Mobile No</label>
        <input
          type="tel"
          name="mobile"
          id="mobile"
          maxLength={10}
          minLength={10}
          required
          onChange={handleOnChange}
          value={rest.mobile}
        />
        <button className="btn btn-submit">Submit</button>
      </form>
    </div>
  );
}

export { UserForm };
