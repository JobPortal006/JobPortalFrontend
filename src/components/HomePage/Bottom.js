import React from 'react';
import './Bottom.css';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaGit, FaGithub } from 'react-icons/fa';
import { Typography } from '@mui/material';

const Bottompage = () => {
  const navigate = useNavigate();



  return (<>
    <div className="bottom-contact-container">
      {/* Location Column */}
      <div className="column">
        <h3 className="column-heading">Location</h3>
        <ul className="list">
          <li>VJ Business Center, 14 - 15, 2nd Floor, Trichy Road, Ramanathapuram, Coimbatore,</li>
          <li>India</li>
          <li>Postal Code: 641018</li>
        </ul>
      </div>

      {/* Company Column */}
      <div className="column">
        <h3 className="column-heading">Company</h3>
        <ul className="list">
          <li>JustLogix</li>
          <li style={{ cursor: 'pointer' }}>
            About Us
          </li>
          <li>Established: 2023</li>
        </ul>
      </div>

      {/* Contact Us Column */}
      <div className="column">
        <h3 className="column-heading">Contact Us</h3>
        <ul className="list">
          <li>Email: justlogix@example.com</li>
          <li>Phone: +123 456 789</li>
          <li>Fax: +123 456 789</li>
        </ul>
      </div>

      {/* Additional Column */}
      <div className="column">
        <h3 className="column-heading">Additional</h3>
        <ul className="list">
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
              Facebook
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
              Twitter
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
              Instagram
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaGithub />
              Github
            </a>
          </li>
          <li>FAQs</li>
          <li>Privacy Policy</li>
          
        </ul>
      </div>
    </div>
   
    </>
  );
};

export default Bottompage;
