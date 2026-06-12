function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  handleSignup,
  handleLogin,
  isSellPage,
  isMyPage,
}) {
  return (
    <section className="form-card auth-card">
      <div className="form-card-header">
        <h3>ログイン / 新規登録</h3>

        {isSellPage && <p>商品を出品するにはログインしてください。</p>}

        {isMyPage && <p>マイページを見るにはログインしてください。</p>}

        {!isSellPage && !isMyPage && (
          <p>ログインすると、商品の出品や購入ができます。</p>
        )}
      </div>

      <div className="form-field">
        <label>メールアドレス</label>
        <input
          type="email"
          placeholder="example@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="form-field">
        <label>パスワード</label>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="secondary-action" onClick={handleSignup}>
          新規登録
        </button>
        <button className="primary-action" onClick={handleLogin}>
          ログイン
        </button>
      </div>
    </section>
  );
}

export default AuthForm;
