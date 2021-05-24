import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { POSTS_LOADING_REQUEST } from '../../redux/types';
import { Helmet } from 'react-helmet'
import { Row } from 'reactstrap'
import { GrowingSpinner } from '../../component/spinner/Spinner'
import PostCardOne from '../../component/post/PostCardOne';

const PostCardList = () => {
    const {posts} = useSelector((state) => state.post) // initiate 내부 posts를 의미함.
    const dispatch = useDispatch()

    // useEffect의 의존성 배열의 dispatch에 변화가 일어났을 때 실행.
    useEffect(() => {
        dispatch({type: POSTS_LOADING_REQUEST}) //POSTS_LOADING_REQUEST 가 일어났을때 효과 발효
    }, [dispatch])

    return (
        <Fragment>
            <Helmet title="Home" />
            <Row>
                {posts ? <PostCardOne posts={posts}/> : GrowingSpinner}
            </Row>
        </Fragment>
    )
};

export default PostCardList

