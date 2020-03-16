import React from "react";

function TableBody({ collection }) {
    return (
        <tbody>
    
        {collection.map(person => (
      
      <tr key={person.id}>
                <td>{person.firstName}</td>
                <td>{person.lastName}</td>
                <td className="text-right">{person.age}</td>
                <td>{person.position}</td>
                <td>{person.hiredAt}</td>
                <td className="text-right">
                  {parseFloat(person.salary).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD"
                  })}
                </td>
                <td>{person.email}</td>
                <td>{person.isActive}</td>
      
                {/* <td>{person.location?person.location:''}
                </td> */}
      <button className="btn btn-danger">Remove</button>
      </tr>
      
      
      ))}
      
        
        </tbody>
    );
  }
  
  export default TableBody;