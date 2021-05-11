import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Fragment } from 'react'
import AppNavbar from '../component/AppNavbar';

const MyRouter = () => (
    <Fragment>
        <AppNavbar />
        <Header />
        <h1>Hello Body</h1>
        <Footer />
    </Fragment>
);

export default MyRouter