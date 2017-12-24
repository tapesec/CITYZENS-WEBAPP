import React from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard(props) {
    return (
        <div>
            <h1>Here's the Dashboard</h1>
            <span>
                <Link to="/register">Login</Link>
            </span>
        </div>
    );
}
