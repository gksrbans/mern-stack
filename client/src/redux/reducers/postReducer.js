import { POSTS_LOADING_FAILURE, POSTS_LOADING_REQUEST, POSTS_LOADING_SUCCESS } from "../types";

const initialState = {
    isAuthenticated: null,
    posts: [],
    postDetail: "",
    postCount: "",
    loading: false,
    error: '',
    creatorId: "",
    categoryFindResult: "",
    title: "",
    searchBy: "",
    searchResult: "",
};

export default function(state = initialState, action) {
    switch(action.type) {
        case POSTS_LOADING_REQUEST:
            return {
                ...state,
                posts: [], // 카드를 눌렀을때 빈배열로 초기화.
                loading: true,
            } 

        case POSTS_LOADING_SUCCESS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload],
                loading: false,
            }
            
        case POSTS_LOADING_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
} 