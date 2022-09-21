import axiosClient from "./axiosClient";

const api = {
    getAllUsers: () => {
        const url = 'user/';
        return axiosClient.get(url);
    },
    logInUser: (user) => {
        const url = 'auth/login';
        return axiosClient.post(url, user);
    },
    logOutUser: () => {
        const url = 'auth/logout';
        return axiosClient.post(url);
    },
    registerUser: (user) => {
        const url = 'auth/register';
        return axiosClient.post(url, user);
    },
    getAllPosts: () => {
        const url = 'posts/';
        return axiosClient.get(url);
    },
    addPost: (post) => {
        const url = 'posts/';
        return axiosClient.post(url, post);
    },
    deletePost: (id) => {
        const url = `posts/${id}`;
        return axiosClient.delete(url);
    },
    updatePost: (post) => {
        const url = 'posts/';
        return axiosClient.put(url, post);
    }
}

export default api;