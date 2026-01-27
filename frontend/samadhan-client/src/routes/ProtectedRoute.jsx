const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = localStorage.getItem('role')

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />
  }

  return children
}
