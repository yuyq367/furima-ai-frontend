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
    <div>
      {isSellPage && <p>商品を出品するにはログインしてください</p>}

      {isMyPage && <p>マイページを見るにはログインしてください</p>}

      {!isSellPage && !isMyPage && (
        <p>ログインすると、商品の出品や購入ができます</p>
      )}

      <div>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <button onClick={handleSignup}>新規登録</button>
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}

export default AuthForm;
