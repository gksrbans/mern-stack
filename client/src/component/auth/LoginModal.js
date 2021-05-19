import React, { useState, useEffect } from 'react'
import {NavLink, Modal, ModalBody, ModalHeader, Alert, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import { useDispatch, useSelector } from "react-redux"
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from '../../redux/types';

// React는 다시 반응하기 위해서는 이전상태와의 비교를 통해 변화된 상태를 업데이트 => 상태관리가 제일 중요.
// React Hook
const LoginModal = () => {
    const [modal, setModal] = useState(false)
    const [localMsg, setLocalMsg] = useState('')
    const [form, setValues] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()

    // reducers/index.js 의 auth를 select.
    const {errorMsg} = useSelector((state) => state.auth);

    // 변화가 있을 경우 가져온 errorMsg를 localMsg에 저장
    useEffect(() => {
        try{
            setLocalMsg(errorMsg)
        } catch(e) {
            console.log(e)
        }
    }, [errorMsg]) // errorMsg의 변화가 있을 경우 이 함수를 작동

    const handleToggle = () => {
        dispatch({
            type: CLEAR_ERROR_REQUEST
        })
        setModal(!modal)
    }

    const onChange = (e) => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit= (e) => {
        e.preventDefault() // react가 새로고침없이 변화된것만 작업해주기 때문에 그걸방지
        const {email, password} = form
        const user = {email, password}
        console.log(user)
        dispatch({
            type: LOGIN_REQUEST,
            payload: user
        })
    }

    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>
            <Modal isOpen={modal} toggle={handleToggle}>
             <ModalHeader toggle={handleToggle}>Login</ModalHeader>
             <ModalBody>{localMsg ? <Alert color="danger">{localMsg}</Alert> : null }
              <Form onSubmit={onSubmit}>
                  <FormGroup>
                      <Label for="email">Email</Label>
                      <Input 
                        type="email"
                        name="email" // e.target.name 및 useState 내부에 것.
                        id="email"
                        placeholder="Email"
                        onChange={onChange} // React는 input 내부에 onChange를 꼭 달아줘아햠.
                      />
                      <Label for="password">Password</Label>
                      <Input 
                        type="password"
                        name="password" // e.target.name 및 useState 내부에 것.
                        id="password"
                        placeholder="Password"
                        onChange={onChange} // React는 input 내부에 onChange를 꼭 달아줘아햠.
                      />

                      <Button color='dark' style={{marginTop: "2rem"}} block >
                          Login
                      </Button>
                  </FormGroup>
              </Form>
             </ModalBody>
            </Modal>
        </div>
    )
};



export default LoginModal;