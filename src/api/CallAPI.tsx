import axios from 'axios'

export const postAPI = async (apiUrlPost: string) => {
    try {
        const response = await axios.get(apiUrlPost)
        return response.data
    } catch (error) {
    }
}

export const savePostAPI = async (urlSavePost: string, data: any) => {
    try {
        const response = await axios.post(urlSavePost, data);
        return response.data.status;
    } catch (error) {
    }
}

export const deletePostAPI = async (urlDeletePost: string, postId: number) => {
    try {
        const response = await axios.delete(urlDeletePost + postId);
        return response.data.status;
    } catch (error) {
    }
}

export const deleteCommentAPI = async (urlDeleteComment: string, _data: any) => {
    try {
        const response = await axios.delete(urlDeleteComment, {
            data: {
                commentId: _data.commentId,
                postId: _data.postId,
                userId: _data.userId
            }
        })
        return response.data.status;
    } catch (error) {
    }
}

export const likeAPI = async (urlLike: string, _data: any) => {
    try {
        const response = await axios.post(urlLike, _data)
        return response.data.status;
    } catch (error) {
    }
}

export const getAllCommentAPI = async (urlGetAllComment: string, _data: any) => {
    try {
        const response = await axios.post(urlGetAllComment, {
            "postId": _data.postId,
            "userId": _data.userId,
            "content": _data.content,
            "parentCommentId": _data.parentCommentId
        })
        return response.data.status;
    } catch (error) {

    }
}

export const createNorMalPostAPI = async (urlCreateNormalPost: string, _data: any) => {
    try {
        const response = await axios
            .post(urlCreateNormalPost, {
                type: _data.type,
                groupId: _data.groupId,
                images: _data.images,
                userId: _data.userId,
                content: _data.content
            })
        return response.data.status;
    } catch (error) {
    }
}

export const followAPI = async (urlFollow: string, followData: any) => {
    try {
        const response = await axios.post(urlFollow, followData);
        return response.data.status;
    } catch (error) {
    }
}

export const updateNormalPostAPI = async (urlUpdate: string, data: any) => {
    try {
        const response = await axios.put(urlUpdate, data);
        return response.data.status;
    } catch (error) {
    }
}

export const updateImageUserProfile = async (urlUpdate: string, data: any) => {
    try {
        const response = await axios.post(urlUpdate, data);
        return response.data.status;
    } catch (error) {
    }
}


export const getFacultyForSelect = async (urlUpdate: string) => {
    try {
        const response = await axios.get(urlUpdate);
        return response.data;
    } catch (error) {
    }
}