import React, { useReducer } from 'react'
import { login } from './utils'

function loginReducer(state, action) {
    switch (action.type) {
        case 'form-onSubmit': {
            return {
                ...state,
                [action.field]: action.value,
            }
        }
        case 'login': {
            return {
                ...state,
                isLoading: true ,
                error: '',
            }
        }
        case 'login-success': {
            return {
                ...state,
                isLoggedIn: true ,
            }
        }
        case 'logout': {
            return {
                ...state,
                isLoggedIn: false ,
//                username: '',
                password: '',
                isLoading: false,
                error: '',
            }
        }
        case 'error-message': {
            return {
                ...state,
                [action.field]: action.value,
                username: '',
                password: '',
                isLoading: false,
            }
        }
        
        default:
            break;
    }

    return state;
}

const initialState = {
    username   : '' ,
    password   : '' ,
    isLoading  : false ,
    error      : '' ,
    isLoggedIn : false ,
}



export default function LoginPlain() {

    const [state, dispatch] = useReducer(loginReducer, initialState) 

    const {username, password, isLoading, error, isLoggedIn } = state
    
    // const [ username, setUsername ] = useState('')
    // const [ password, setPassword ] = useState('')
    // const [ isLoading, setIsLoading ] = useState(false)
    // const [ error, setError ] = useState('')
    // const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    const onSubmit = async e => {
        e.preventDefault()

        dispatch({ type: 'login' })

        try {
            await login( {username, password} )

//          setIsLoading(true)

            dispatch({ type: 'login-success' })
 //           setPassword('')
 //           setError('')
        }
        catch (error) {

            dispatch({ 
                type: 'error-message', 
                field: 'error', 
                value: error ,
            })
//            setError(error)
            console.log(error)
            
        }

//        setIsLoading(false)

    }



    return (
        <div className="App">
            <div className="login-container">
                {isLoggedIn ? (
                    <>
                        <h1>Hello {username}</h1>
                        <button onClick={ () => dispatch({ type: 'logout' }) }>Log Out</button>
                    </>
                ) : 
                (
                <form className="form" onSubmit={onSubmit}>
                    {error && <p className="error">{error}</p>}
                    <p>Please Login</p>
                    <input type="text" 
                        placeholder="username" 
                        value={username} 
                        onChange={ e => 
                            dispatch({ 
                                type: 'form-onSubmit' ,
                                field: 'username' ,
                                value: e.currentTarget.value ,
                            })
                        }
                    />
                    <input
                        type="password"
                        placeholder="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={ e => 
                            dispatch({ 
                                type: 'form-onSubmit' ,
                                field: 'password' ,
                                value: e.currentTarget.value ,
                            })
                        }
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
