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

export const deletePost = async (urlDeletePost: string, postId: number) => {
    try {
        const response = await axios.delete(urlDeletePost + postId);
        return response.data.status;
    } catch (error) {
    }
}