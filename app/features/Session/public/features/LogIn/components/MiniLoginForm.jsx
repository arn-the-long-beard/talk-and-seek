import React from 'react'
import PropTypes from 'prop-types'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
// material ui theme
const LoginForm = ({
                     onSubmit,
                     onChange,
                     errors,
                     successMessage,
                     user
                   }) => (
                     <form action='' onSubmit={onSubmit} method='post'>
                       {successMessage && <p className='success-message'>{successMessage}</p>}
                       {errors.summary && <p className='error-message'>{errors.summary}</p>}

                       <TextField
                         id='email'
                         hintText='Email'
                         name='email'
                         errorText={errors.email}
                         onChange={onChange}
                         value={user.email} />

                       <TextField
                         id='password'
                         hintText='Password'
                         type='password'
                         name='password'
                         onChange={onChange}
                         errorText={errors.password}
                         value={user.password} />
                       < button type='submit' label='Log in' >Log in</button>
                     </form>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired
}

export default LoginForm
