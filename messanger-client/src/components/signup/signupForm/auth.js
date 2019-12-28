class Auth{

    Signup = async (data, cb) => {
        let res = await fetch('http://localhost:8000/signup',{
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type':'application/json'
            }
        });
        res = await res.json();
        cb(res);
    }
}

export default new Auth();