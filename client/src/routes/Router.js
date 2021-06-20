import React from 'react'
import Header from '../component/Header'
import Footer from '../component/Footer'
import { Fragment } from 'react'
import AppNavbar from '../component/AppNavbar';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import Search from './normalRoute/Search';
import PostEdit from './normalRoute/PostEdit';
import Profile from './normalRoute/Profile';
import CategoryResult from './normalRoute/CategoryResult';
import { EditProtectedRoute, ProfileProtectedRoute } from './protectedRoute/ProtectedRoute';


const MyRouter = () => (
    <Fragment>
        <AppNavbar />
        <Header />
        <Container id="main-body">
            <Switch>
                <Route path="/" exact component={PostCardList}/>
                <Route path="/post" exact component={PostWrite}/>
                <Route path="/post/:id" exact component={PostDetail}/>
                <EditProtectedRoute 
                  path="/post/:id/edit" exact component={PostEdit}
                />
                <ProfileProtectedRoute 
                  path="/user/:userName/profile" exact component={Profile}
                />
                <Route path="/post/category/:categoryName" exact component={CategoryResult}/>
                <Route path="/search/:searchTerm" exact component={Search}/>
                <Redirect from="*" to="/" />
            </Switch> 
        </Container>
        <Footer />
    </Fragment>
);

export default MyRouter