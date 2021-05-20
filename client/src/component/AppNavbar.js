import React, { useCallback, useEffect } from 'react'
import { Fragment, useState } from 'react'
import { Navbar, Container, NavbarToggler, Collapse, Nav } from 'reactstrap'
import {Link} from 'react-router-dom'
import LoginModal from '../component/auth/LoginModal'
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_REQUEST } from '../redux/types'

const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {isAuthenticated, user, userRole} = useSelector((state) => state.auth)
    console.log(userRole, "USER Role")

    const dispatch = useDispatch()

    const onLogout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST
        })
    }, [dispatch]) // useEffect와 구조는 동일하나 useEffect와는 배열, 즉 의존성값이 변화될때 매번 새롭게 그리지만, useCallback은 기존값을 저장하고 있다가 변화된 값을 반영

    useEffect(() => {
        setIsOpen(false)
    }, [user])

    const handleToggle = () => {
        setIsOpen(!isOpen)
    }

    return(
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoratino-none">
                        Kyumoon Side Project's Blog
                    </Link>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                        {isAuthenticated ? (
                            <h1 className="text-white">authLink</h1>
                        ) : (                           
                            <LoginModal />
                        )}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar