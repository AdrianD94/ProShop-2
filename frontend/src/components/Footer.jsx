import React from 'react'
import { Col, Row } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Row>
                <Col className='text-center py-3'>
                    <p>ProShop &copy; {currentYear}</p>
                </Col>
            </Row>
        </footer>
    )
}

export default Footer