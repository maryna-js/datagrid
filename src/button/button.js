import React from "react";

const Button = ({
    deleteContact,
    id
}) => (
    <button onClick={() => deleteContact(id)} className="btn btn-danger">Remove</button>
  
);

export default Button;