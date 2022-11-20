export default function WithRole(WrappedComponent) {
  return function WithRole({ user }) {
    if (!user) return '';
    const role = user.role.name ? user.role.name : 'Public';
    if (role === 'Public') return '';
    if (role != 'Public') return <WrappedComponent role={role} user={user} />;
    return '';
  };
}
