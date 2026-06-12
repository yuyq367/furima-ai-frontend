function UserMenu({ loginUser, handleLogout }) {
  return (
    <div>
      <p>ログイン中です</p>
      <p>Email: {loginUser.email}</p>

      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
}

export default UserMenu;
