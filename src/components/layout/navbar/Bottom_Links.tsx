import React from 'react';
import { Link } from 'react-router-dom';

export class BottomLinks extends React.Component {
render() {
  return (   <>                            
               <ul className="navbottom nav">
                    <li className="nav__item">
                        <Link to="#" className="nav__link">
                            <div className="nav__link-icon">
                                <img src="img/workflow-icon.svg" className="icon-default" alt=""></img>
                                <img src="img/workflow-hover-icon.svg" className="icon-hover" alt=""></img>
                            </div>
                            <span className="nav__link-text">Workflow</span>
                        </Link> 
                    </li>
                    <li className="nav__item">
                        <Link to="#" className="nav__link">
                            <div className="nav__link-icon">
                                <img src="img/file-icon.svg" className="icon-default" alt=""></img>
                                <img src="img/file-hover-icon.svg" className="icon-hover" alt=""></img>
                            </div>
                            <span className="nav__link-text">File Access</span>
                        </Link> 
                    </li>
                    <li className="nav__item">
                        <Link to="#" className="nav__link">
                            <div className="nav__link-icon">
                                <img src="img/system-icon.svg" className="icon-default" alt=""></img>
                                <img src="img/system-hover-icon.svg" className="icon-hover" alt=""></img>
                            </div>
                            <span className="nav__link-text">System Maintenance</span>
                        </Link> 
                    </li>
                    <li className="nav__item-devider"></li>
                    <li className="nav__item">
                        <Link to="#" className="nav__link">
                            <div className="nav__link-icon">
                                <img src="img/logout-icon.svg" className="icon-default" alt=""></img>
                                <img src="img/logout-hover-icon.svg" className="icon-hover" alt=""></img>
                            </div>
                            <span className="nav__link-text">Logout</span>
                        </Link> 
                    </li>
                 </ul>             
          </>       
  );
}

}

export default BottomLinks;
