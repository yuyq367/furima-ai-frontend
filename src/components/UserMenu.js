function UserMenu({ loginUser, handleLogout }) {
  return (
    <section className="user-menu">
      <div className="user-menu-info">
        <span className="user-status">ログイン中</span>
        <p className="user-email">{loginUser.email}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        ログアウト
      </button>
    </section>
  );
}

export default UserMenu;
