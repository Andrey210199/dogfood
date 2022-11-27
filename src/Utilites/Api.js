
 class Api{
    constructor({baseUrl, headers}){
        this._url = baseUrl;
        this._headers = headers;
    }

    _onResponse= (res)=>{
        return res.ok? res.json(): Promise.reject(`Ошибка: ${res.status}`);
    }

    getProducts(idProduct){
        return fetch(`${this._url}/products${idProduct && `/${idProduct}`}`,{
            method: "GET",
            headers: this._headers
        }).then(this._onResponse);
    }

    userInfo(dataUser){
        return fetch(`${this._url}/users/me`, !!dataUser ? {
            method: "PATH",
            headers: this._headers,
            body: JSON.stringify(dataUser)
        } : {
            method: "GET",
            headers: this._headers
        }
        ).then(this._onResponse);
    }

    setProductsUser(idProduct=""){
        return Promise.all([this.getProducts(idProduct), this.userInfo()])
        .catch(this._onResponse);
    }

    checkLike(productId, islike){
        return fetch(`${this._url}/products/likes/${productId}`,{
            method: islike? "DELETE": "PUT",
            headers: this._headers
        }).then(this._onResponse);
    }

    search(searchQuery){
        return fetch(`${this._url}/products/search?query=${searchQuery}`,{
            method: "GET",
            headers: this._headers
        }).then(this._onResponse);
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