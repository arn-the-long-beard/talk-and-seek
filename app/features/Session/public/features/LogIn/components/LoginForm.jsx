import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Card, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
// material ui theme
const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user
}) => (
  <Card className='container'>
    <form action='' onSubmit={onSubmit} method='post'>
      <h2 className='card-heading'>Login</h2>
      {successMessage && <p className='success-message'>{successMessage}</p>}
      {errors.summary && <p className='error-message'>{errors.summary}</p>}
      <div className='field-line'>
        <TextField
          id='email'
          floatingLabelText='Email'
          name='email'
          errorText={errors.email}
          onChange={onChange}
          value={user.email}
        />
      </div>
      <div className='field-line'>
        <TextField
          id='password'
          floatingLabelText='Password'
          type='password'
          name='password'
          onChange={onChange}
          errorText={errors.password}
          value={user.password}
        />
      </div>

      <div className='button-line'>
        < button type='submit' label='Log in' >Log in</button>
      </div>
      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
    </form>
  </Card>
)

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired
}

export default LoginForm
