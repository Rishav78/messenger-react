class Auth{

    Login = async (data, cb) => {
        let res = await fetch('http://localhost:8000/login',{
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        });
        res = await res.json();
        if(!res.authenticated) return cb(res);
        const { Token } = res;
        localStorage.setItem("Token1", Token);
        cb({authenticated: true});
    }
}

export default new Auth();