import React, { useState } from 'react'
import { login } from './utils'



export default function LoginPlain() {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)
    const [ error, setError ] = useState('')
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()

        setIsLoading(true)

        try {
            await login( {username, password} )
            setIsLoggedIn(true)
//            setUsername('')
            setPassword('')
            setError('')
        }
        catch (error) {

            setError(error)
            console.log(error)

        }

        setIsLoading(false)

    }



    return (
        <div className="App">
            <div className="login-container">
                {isLoggedIn ? (
                    <>
                        <h1>Hello {username}</h1>
                        <button onClick={ ()=> setIsLoggedIn(false) }>Log Out</button>
                    </>
                ) : 
                (
                <form className="form" onSubmit={onSubmit}>
                    {error && <p className="error">{error}</p>}
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
                    <button className="submit" type="submit" disabled={isLoading}>
                        {isLoading ? 'Loggin in...' : 'Log in'}
                    </button>
                </form>
                )}
            </div>
        </div>
    )
}
