import React, { useState } from 'react'



export default function LoginPlain() {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const onSubmit = async e => {
        e.preventDefault();

        alert('todo')

    }



    return (
        <div className="App">
            <div className="login-container">
                <form className="form" onSubmit={onSubmit}>
                    <p>Please Login</p>
                    <input type="text" placeholder="username" 
                        value={username} 
                        onChange={ e => setUsername(e.currentTarget.value)} 
                    />
                    <input
                        type="password"
                        placeholder="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={ e => setPassword(e.currentTarget.value) }
                    />
                    <button className="submit" type="submit">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    )
}
