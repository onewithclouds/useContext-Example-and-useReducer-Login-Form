export async function login({ username, password }) {

        return new Promise( (resolve, reject) => {

            setTimeout( ()=> { 
            if (username === 'andrew' && password === 'password') {
                resolve();
            } else {
                reject('Incorrect username or password');
            }
        }, 1000);
    });
}