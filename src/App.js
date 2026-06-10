import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, setLoginUser] = useState(null);
  const [message, setMessage] = useState("");
  const [backendMessage, setBackendMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoginUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleSignup = async () => {
    try {
      setMessage("");
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("新規登録に成功しました");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      setMessage("");
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("ログインに成功しました");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      setMessage("");
      setBackendMessage("");
      await signOut(auth);
      setMessage("ログアウトしました");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleCheckBackendAuth = async () => {
    try {
      setBackendMessage("");

      if (!loginUser) {
        setBackendMessage("ログインしていません");
        return;
      }

      const idToken = await loginUser.getIdToken();

      const response = await fetch("http://127.0.0.1:8000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setBackendMessage(JSON.stringify(data, null, 2));
        return;
      }

      setBackendMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setBackendMessage(error.message);
    }
  };

  const handleShowProductDetail = async (productId) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/${productId}`,
      );
      const data = await response.json();

      setSelectedProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Furima AI</h1>
      <h2>Firebase Authentication Test</h2>

      {loginUser ? (
        <div>
          <p>ログイン中です</p>
          <p>Email: {loginUser.email}</p>
          <p>Firebase UID: {loginUser.uid}</p>

          <button onClick={handleCheckBackendAuth}>バックエンド認証確認</button>

          <button onClick={handleLogout}>ログアウト</button>
        </div>
      ) : (
        <div>
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
      )}

      {message && <p>{message}</p>}

      {backendMessage && (
        <div>
          <h3>Backend Response</h3>
          <pre>{backendMessage}</pre>
        </div>
      )}

      <hr />

      <h2>商品一覧</h2>

      {products.length === 0 ? (
        <p>商品がありません</p>
      ) : (
        <div>
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ddd",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>{product.price}円</p>
              <p>カテゴリ: {product.category}</p>
              <p>状態: {product.condition_label}</p>
              <p>販売状況: {product.status}</p>

              <button onClick={() => handleShowProductDetail(product.id)}>
                詳細を見る
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div
          style={{
            border: "2px solid #333",
            padding: "16px",
            marginTop: "24px",
            borderRadius: "8px",
          }}
        >
          <h2>商品詳細</h2>
          <h3>{selectedProduct.title}</h3>
          <p>{selectedProduct.description}</p>
          <p>{selectedProduct.price}円</p>
          <p>カテゴリ: {selectedProduct.category}</p>
          <p>状態: {selectedProduct.condition_label}</p>
          <p>販売状況: {selectedProduct.status}</p>
          <p>出品者: {selectedProduct.seller_username}</p>
          <p>作成日: {selectedProduct.created_at}</p>
        </div>
      )}
    </div>
  );
}

export default App;
