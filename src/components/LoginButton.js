import { useAuth0 } from '@auth0/auth0-react'

function LoginButton() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0()

  if (isLoading) {
    return <span>Загрузка...</span>
  }
  return (
    <>
      {!isAuthenticated &&
      <button className="btn btn-primary btn-sm" type="button" onClick={() => loginWithRedirect()}>
        Войти
      </button>
      }

      {isAuthenticated &&
      <div className="d-flex align-items-center">
        <div className="me-2">
          {user.name}
        </div>
        <button className="btn btn-primary btn-sm" type="button" onClick={() => logout({
          returnTo: window.location.origin,
        })}>
          Выйти
        </button>
      </div>}
    </>
  )
}

export default LoginButton
