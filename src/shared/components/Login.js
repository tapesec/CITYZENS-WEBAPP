import React from 'react';
import { Link } from 'react-router-dom';

export default function Login(props) {
    return (
        <div>
            <h1>Here's the login page</h1>
            <span>
                <Link to="/">Dashboard</Link>
            </span>
        </div>
    );
}
