import React, { useCallback, useEffect, Fragment, useState } from 'react'
import { Navbar, Container, NavbarToggler, Collapse, Nav, NavItem, Form, Button } from 'reactstrap'
import {Link} from 'react-router-dom'
import LoginModal from '../component/auth/LoginModal'
import RegisterModal from "../component/auth/RegisterModal";
import { useSelector, useDispatch } from 'react-redux'
import { LOGOUT_REQUEST, POSTS_WRITE_REQUEST } from '../redux/types'
import SearchInput from './search/searchInput';
 
 
const AppNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { isAuthenticated, user, userRole } = useSelector((state) => state.auth)
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

    const addPostClick = () => {
        dispatch({
          type: POSTS_WRITE_REQUEST,
        });
    };

    const authLink = (
        <Fragment>
            <NavItem>
                {userRole === "MainJuin" ? (
                    <Form className="col mt-2">
                        <Link to="post" className="btn btn-success block text-white px-3" onClick={addPostClick}>
                         Add Post
                        </Link>
                    </Form>
                ) : ""}
            </NavItem>
            <NavItem className="d-flex justify-content-center">
                <Form className="col mt-2">
                    {user && user.name ? (
                        <Link to={`/user/${user.name}/profile`}>
                        <Button outline color="light" className="px-3" block>
                            <strong>{user? `Welcome ${user.name}`:""}</strong>
                        </Button>
                        </Link>
                    ): (
                        <Button outline color="light" className="px-3" block>
                            <strong>"No User"</strong>
                        </Button>
                    )}
                </Form>
            </NavItem>
            <NavItem>
                <Form className="col">
                    <Link onClick={onLogout} to="#">
                        <Button outline color="light" className="mt-2" block>
                            Logout
                        </Button>
                    </Link>
                </Form>
            </NavItem>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <NavItem>
                <RegisterModal />
            </NavItem>
            <NavItem>
                <LoginModal />
            </NavItem>
        </Fragment>
    );

    return(
        <Fragment>
            <Navbar color="dark" dark expand="lg" className="sticky-top">
                <Container>
                    <Link to="/" className="text-white text-decoratino-none">
                        Kyumoon Side Project's Blog
                    </Link>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <SearchInput isOpen={isOpen} />
                        <Nav className="ml-auto d-flex justify-content-around" navbar>
                            {isAuthenticated ? authLink : guestLink}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
}

export default AppNavbar