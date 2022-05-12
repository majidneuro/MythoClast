import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class NotFoundPage extends Component {
  render() {
    return ( <div className="w-100 h-100 align-items-center d-flex">
          <div className="w-100 text-center">
            <h1 className="bolder">ERROR 404</h1>
            <h4>Page Not Found</h4> 
            <Link to={'/'} className="btn btn-outline-primary mt-4">Go Back to Home</Link>           
            </div>
        </div>
    );
  }
}

export default NotFoundPage;