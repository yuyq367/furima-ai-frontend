import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("");
  const [newProductCondition, setNewProductCondition] = useState("");
  const [newProductImageUrl, setNewProductImageUrl] = useState("");
  const [myProducts, setMyProducts] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoginUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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

  const handleCreateProduct = async () => {
    try {
      setMessage("");
      setBackendMessage("");

      if (!loginUser) {
        setMessage("ログインしてください");
        return;
      }

      const idToken = await loginUser.getIdToken();

      const response = await fetch("http://127.0.0.1:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          title: newProductTitle,
          description: newProductDescription,
          price: Number(newProductPrice),
          image_url: newProductImageUrl || null,
          category: newProductCategory,
          condition_label: newProductCondition,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setBackendMessage(JSON.stringify(data, null, 2));
        return;
      }

      setBackendMessage(JSON.stringify(data, null, 2));
      setMessage("商品を出品しました");

      setNewProductTitle("");
      setNewProductDescription("");
      setNewProductPrice("");
      setNewProductCategory("");
      setNewProductCondition("");
      setNewProductImageUrl("");

      await fetchProducts();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handlePurchaseProduct = async (productId) => {
    try {
      setMessage("");
      setBackendMessage("");

      if (!loginUser) {
        setMessage("ログインしてください");
        return;
      }

      const idToken = await loginUser.getIdToken();

      const response = await fetch(
        `http://127.0.0.1:8000/products/${productId}/purchase`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setBackendMessage(JSON.stringify(data, null, 2));
        return;
      }

      setBackendMessage(JSON.stringify(data, null, 2));
      setMessage("商品を購入しました");

      await fetchProducts();

      const detailResponse = await fetch(
        `http://127.0.0.1:8000/products/${productId}`,
      );
      const detailData = await detailResponse.json();
      setSelectedProduct(detailData);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGetMyPage = async () => {
    try {
      setMessage("");
      setBackendMessage("");

      if (!loginUser) {
        setMessage("ログインしてください");
        return;
      }

      const idToken = await loginUser.getIdToken();

      const productsResponse = await fetch(
        "http://127.0.0.1:8000/users/me/products",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      const productsData = await productsResponse.json();

      const purchasesResponse = await fetch(
        "http://127.0.0.1:8000/users/me/purchases",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        },
      );

      const purchasesData = await purchasesResponse.json();

      if (!productsResponse.ok) {
        setBackendMessage(JSON.stringify(productsData, null, 2));
        return;
      }

      if (!purchasesResponse.ok) {
        setBackendMessage(JSON.stringify(purchasesData, null, 2));
        return;
      }

      setMyProducts(productsData);
      setMyPurchases(purchasesData);
      setMessage("マイページ情報を取得しました");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Furima AI</h1>

      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "12px" }}>
          ホーム
        </Link>
        <Link to="/sell" style={{ marginRight: "12px" }}>
          出品
        </Link>
        <Link to="/mypage" style={{ marginRight: "12px" }}>
          マイページ
        </Link>
      </nav>

      <h2>Firebase Authentication Test</h2>

      {loginUser ? (
        <div>
          <p>ログイン中です</p>
          <p>Email: {loginUser.email}</p>
          <p>Firebase UID: {loginUser.uid}</p>

          <button onClick={handleCheckBackendAuth}>バックエンド認証確認</button>
          <button onClick={handleGetMyPage}>マイページ情報を取得</button>
          <button onClick={handleLogout}>ログアウト</button>
          <hr />

          <h2>商品を出品する</h2>

          <div>
            <input
              type="text"
              placeholder="商品名"
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value)}
            />
          </div>

          <div>
            <textarea
              placeholder="商品説明"
              value={newProductDescription}
              onChange={(event) => setNewProductDescription(event.target.value)}
            />
          </div>

          <div>
            <input
              type="number"
              placeholder="価格"
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="カテゴリ"
              value={newProductCategory}
              onChange={(event) => setNewProductCategory(event.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="商品の状態"
              value={newProductCondition}
              onChange={(event) => setNewProductCondition(event.target.value)}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="画像URL（任意）"
              value={newProductImageUrl}
              onChange={(event) => setNewProductImageUrl(event.target.value)}
            />
          </div>

          <button onClick={handleCreateProduct}>出品する</button>
          <hr />

          <h2>マイページ</h2>

          <h3>自分の出品一覧</h3>

          {myProducts.length === 0 ? (
            <p>出品した商品はありません</p>
          ) : (
            <div>
              {myProducts.map((product) => (
                <div
                  key={product.id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    marginBottom: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <h4>{product.title}</h4>
                  <p>{product.price}円</p>
                  <p>販売状況: {product.status}</p>
                </div>
              ))}
            </div>
          )}

          <h3>自分の購入一覧</h3>

          {myPurchases.length === 0 ? (
            <p>購入した商品はありません</p>
          ) : (
            <div>
              {myPurchases.map((purchase) => (
                <div
                  key={purchase.purchase_id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "12px",
                    marginBottom: "12px",
                    borderRadius: "8px",
                  }}
                >
                  <h4>{purchase.title}</h4>
                  <p>{purchase.price}円</p>
                  <p>出品者: {purchase.seller_username}</p>
                  <p>購入日時: {purchase.purchased_at}</p>
                </div>
              ))}
            </div>
          )}
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

          {selectedProduct.status === "available" ? (
            <button onClick={() => handlePurchaseProduct(selectedProduct.id)}>
              購入する
            </button>
          ) : (
            <p>この商品は売り切れです</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
