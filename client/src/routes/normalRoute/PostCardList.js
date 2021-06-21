import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { POSTS_LOADING_REQUEST } from '../../redux/types';
import { Helmet } from 'react-helmet'
import { Alert, Row } from 'reactstrap'
import { GrowingSpinner } from '../../component/spinner/Spinner'
import PostCardOne from '../../component/post/PostCardOne';
import Category from '../../component/post/Category'

const PostCardList = () => {
    const { posts, categoryFindResult, loading, postCount } = useSelector((state) => state.post) // initiate 내부 posts를 의미함.
    const dispatch = useDispatch()

    // useEffect의 의존성 배열의 dispatch에 변화가 일어났을 때 실행.
    useEffect(() => {
        dispatch({type: POSTS_LOADING_REQUEST, payload: 0 }) //POSTS_LOADING_REQUEST 가 일어났을때 효과 발효
    }, [dispatch])


    ////////////////////////////////////////
    const skipNumberRef = useRef(0); // 라이프 사이클에서 지속, useEffect 또는 콜백 안에서 상태값들을 저장하고 빼오기 위해서는 useState를 사용할 수 없음.
    const postCountRef = useRef(0);
    const endMsg = useRef(false);
    
    postCountRef.current = postCount - 6;
    
    const useOnScreen = (options) => {
        const lastPostElementRef = useRef();
    
        const [visible, setVisible] = useState(false);
    
        useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
    
            if (entry.isIntersecting) {
            let remainPostCount = postCountRef.current - skipNumberRef.current;
            if (remainPostCount >= 0) {
                dispatch({
                type: POSTS_LOADING_REQUEST,
                payload: skipNumberRef.current + 6,
                });
                skipNumberRef.current += 6;
            } else {
                endMsg.current = true;
                console.log(endMsg.current);
            }
            }
        }, options);
    
        if (lastPostElementRef.current) {
            observer.observe(lastPostElementRef.current);
        }
    
        const LastElementReturnFunc = () => {
            if (lastPostElementRef.current) {
            observer.unobserve(lastPostElementRef.current);
            }
        };
    
        return LastElementReturnFunc;
        }, [lastPostElementRef, options]);
    
        return [lastPostElementRef, visible];
    };
    
    ////////////////////////////////////////
    const [lastPostElementRef, visible] = useOnScreen({
        threshold: "0.5",
    });
    console.log(visible, "visible", skipNumberRef.current, "skipNum");

    return (
        <Fragment>
            <Helmet title="Home" />
            <Row className="border-bottom border-top border-primary py-2 mb-3">
              <Category posts={categoryFindResult} />
            </Row>
            <Row>
                {posts ? <PostCardOne posts={posts}/> : GrowingSpinner}
            </Row>
            <div ref={lastPostElementRef}> {loading && GrowingSpinner} </div>
            {loading ? "" : endMsg ? <div>
                <Alert color="danger" className="text-center font-weight-bolder">
                  더 이상의 포스트는 없어요! - infinity scroll 구현
                </Alert>
            </div>
            : ""
            }
        </Fragment>
    )
};

export default PostCardList

