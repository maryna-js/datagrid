import React from 'react';

export default function TableMain(props) {
    return (
        <table className="table table-filter">
            <thead>
                <tr>
                    <th>                    <button
                            onClick={() => props.sortBy('id')}
                        >
                        #
                        </button></th>
                    <th>
                        <button
                            onClick={() => props.sortBy('first_name')}
                        >
                            First Name
                        </button>
                    </th>
                    <th>Last Name</th>
                    <th>e-mail</th>
                    <th>Gender</th>
                    <th>
                    <button
                            onClick={() => props.sortBy('ip_address')}
                        >
                        IP Address
                        </button>
                    </th>
                </tr>                
            </thead>
            <tbody>
                {
                    props.data.map(row => (
                        <tr>
                            <td>{row.id}</td>
                            <td>{row.first_name}</td>
                            <td>{row.last_name}</td>
                            <td>{row.email}</td>
                            <td>{row.gender}</td>
                            <td>{row.ip_address}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}