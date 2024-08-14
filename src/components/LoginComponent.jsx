import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate();

    async function handleLoginForm(e){

        e.preventDefault();

        await loginAPICall(email, password).then((response) => {
            console.log(response.data);

            const token = 'Basic ' + window.btoa(email + ":" + password);
            storeToken(token);

            saveLoggedInUser(email);
            navigator("/home")

            window.location.reload(false);
        }).catch(error => {
            console.error(error);
        })

    }

    return (
        <div className='container'>
       
        <br /> <br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className='card'>
                    <div className='card-header'>
                        <h2 className='text-center'> Login Form </h2>
                    </div>

                      <div className='card-body'>
                          <form>

                              <div className='row mb-3'>
                                  <label className='col-md-3 control-label'> Email</label>
                                  <div className='col-md-9'>
                                      <input
                                          type='text'
                                          name='email'
                                          className='form-control'
                                          placeholder='Enter Email'
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                      >
                                      </input>
                                  </div>
                              </div>

                              <div className='row mb-3'>
                                  <label className='col-md-3 control-label'> Password </label>
                                  <div className='col-md-9'>
                                      <input
                                          type='password'
                                          name='password'
                                          className='form-control'
                                          placeholder='Enter password'
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                      >
                                      </input>
                                  </div>
                              </div>

                              <div className='form-group mb-3'>
                                  <button className='btn btn-primary' onClick={(e) => handleLoginForm(e)}>Submit</button>

                              </div>
                          </form>
                    </div>

                </div>
            </div>
        </div>


    </div>
  )
}

export default LoginComponent