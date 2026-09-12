 import { useState } from 'react';
import Modal from '../common/Modal';
import learningResourceData from '../mock-data/learningResourceData';
import resourceData from '../mock-data/resourceData';
import ResourceLink from '../common/ResourceLink';
import { Link } from 'react-router';

 const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const renderLearningResources = learningResourceData.map((resource) => {
        return ( 
            <ResourceLink 
               title={resource.title}
               description={resource.description}
               url={resource.url}
            />
        );
    });

    const renderResourceData = resourceData.map((resource) => {
        return (
            <ResourceLink
                title={resource.title}
                description={resource.description}
                url={resource.url}
                key={resource.title}
            />
      );
  });


    return (
        <footer className="footer">
            <ul className='footer-list'>
                <li onClick={() => setIsOpen(true)}>Resources</li>
                <li className='all-phrases-link'>
                    <Link to="/all-phrases">
                      All Phrases
                    </Link>
                </li>
                <li>
                    <Link to="https://github.com/amberMorris97/get-fluent" target="_blank">
                      Project Source
                    </Link>
                </li>
            </ul>
            <p>&copy; 2026 Get Fluent. All rights reserved.</p>
            <Modal className="learning-resources-modal" open={isOpen} onClose={() => setIsOpen(false)}>
                <h2 className="learning-resources-modal-title">Learning Resources</h2>
                {renderLearningResources}
                <div className="ui-divider"></div>
                <h2>How To Help</h2>
                {renderResourceData}
            </Modal>
        </footer>
    );
 };

 export default Footer;