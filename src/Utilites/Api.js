import { getCookie } from "./Cookie";

class Api {
    #url;
    #headers;
    constructor({ baseUrl, headers }) {
        this.#url = baseUrl;
        this.#headers = headers;
    }

    #onResponse = (res) => {
        return res.ok ? res.json() : res.json().then(error => Promise.reject(error.message));
    }

    #methodSending(method = "GET", data) {
        switch (true) {
            case method === "GET" || method === "DELETE":
                return {
                    method: method,
                    headers: { ...this.#headers, Authorization: getCookie("token") ? getCookie("token") : this.#headers.Authorization }
                }

            default:
                return {
                    method: method,
                    headers: { ...this.#headers, Authorization: getCookie("token") },
                    body: JSON.stringify(data)
                }
        }
    }

    getProducts(idProduct = "") {
        return fetch(`${this.#url}/products${idProduct && `/${idProduct}`}`, this.#methodSending()).then(this.#onResponse);
    }

    createProduct(newProduct) {
        return fetch(`${this.#url}/products`, this.#methodSending("POST", newProduct)).then(this.#onResponse);
    }

    setProduct({ idProduct, method = "DELETE", data = {} }) {
        return fetch(`${this.#url}/products/${idProduct}`, this.#methodSending(method, data)).then(this.#onResponse);
    }

    userInfo(dataUser) {
        return fetch(`${this.#url}/users/me`, !!dataUser ? this.#methodSending("PATH", dataUser) : this.#methodSending()
        ).then(this.#onResponse);
    }

    setProductsUser(idProduct = "") {
        return Promise.all([this.getProducts(idProduct), this.userInfo()])
            .catch(this.#onResponse);
    }

    checkLike(productId, islike) {
        return fetch(`${this.#url}/products/likes/${productId}`, islike ? this.#methodSending("DELETE") : this.#methodSending("PUT")).then(this.#onResponse);
    }

    search(searchQuery) {
        return fetch(`${this.#url}/products/search?query=${searchQuery}`, this.#methodSending()).then(this.#onResponse);
    }

    setReview(dataComment, productId, reviewId = "") {
        return fetch(`${this.#url}/products/review/${productId}/${reviewId && reviewId}`, reviewId === "" ? this.#methodSending("POST", dataComment) : this.#methodSending("DELETE")
        ).then(this.#onResponse);

    }

    getComments(productId) {
        return fetch(`${this.#url}/products/review/${productId && productId}`, this.#methodSending()).then(this.#onResponse);
    }

    register(data) {
        return fetch(`${this.#url}/signup`, this.#methodSending("POST", data)).then(this.#onResponse);

    }

    authorize(data) {
        return fetch(`${this.#url}/signin`, this.#methodSending("POST", data)).then(this.#onResponse);
    }

    setAvatar(avatar) {
        return fetch(`${this.#url}/users/me/avatar`, this.#methodSending("PATCH", avatar)).then(this.#onResponse);
    }

    setUser(data) {
        return fetch(`${this.#url}/users/me`, this.#methodSending("PATCH", data)).then(this.#onResponse);
    }

    forgotPass(email) {
        return fetch(`${this.#url}/forgot-password`, this.#methodSending("POST", email)).then(this.#onResponse);
    }

    resetPass(newPass) {
        return fetch(`${this.#url}password-reset/${getCookie("token")}`, this.#methodSending("PATCH", newPass)).then(this.#onResponse);
    }

    checkToken() {
        return fetch(`${this._url}/users/me`, this.#methodSending()).then(this.#onResponse);
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru/v2/group-7",
    headers: {
        "content-type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzZhNTEwNjU5Yjk4YjAzOGY3NzlkMDkiLCJncm91cCI6Imdyb3VwLTciLCJpYXQiOjE2Njc5MTE5NDgsImV4cCI6MTY5OTQ0Nzk0OH0.ulDwC10wR3-KvsxJmhoC1xM3U-d_WJa7XKbKM2x8A2c"
    }
}

const api = new Api(config);

export default api;