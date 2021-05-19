import React from 'react'
import { Row, Col } from 'reactstrap'

const Header = () => {
    return (
        <div id="page-header" className="mb-3">
            <Row>
                <Col md="6" sm="auto" className="text-center m-auto">
                    <h1>Kyumoon's Blog :D</h1>
                    <p>SW Developer & Security Engineer</p>
                </Col>
            </Row>

        </div>
    )
};

export default Header;