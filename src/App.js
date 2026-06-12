import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import SellPage from "./pages/SellPage";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, setLoginUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
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

  const location = useLocation();

  const productDetailMatch = location.pathname.match(/^\/products\/(\d+)$/);
  const productDetailId = productDetailMatch ? productDetailMatch[1] : null;

  const isHomePage = location.pathname === "/";
  const isSellPage = location.pathname === "/sell";
  const isMyPage = location.pathname === "/mypage";
  const isProductDetailPage = productDetailId !== null;

  let pageTitle = "Furima AI";

  if (isHomePage) {
    pageTitle = "商品一覧";
  }

  if (isSellPage) {
    pageTitle = "商品を出品する";
  }

  if (isMyPage) {
    pageTitle = "マイページ";
  }

  if (isProductDetailPage) {
    pageTitle = "商品詳細";
  }

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

  useEffect(() => {
    const fetchProductDetail = async () => {
      if (!productDetailId) {
        return;
      }

      try {
        const response = await fetch(
          `http://127.0.0.1:8000/products/${productDetailId}`,
        );
        const data = await response.json();
        setSelectedProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetail();
  }, [productDetailId]);

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
      setCurrentUser(null);
      setSelectedProduct(null);
      setMyProducts([]);
      setMyPurchases([]);

      await signOut(auth);

      setMessage("ログアウトしました");
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!loginUser) {
        setCurrentUser(null);
        return;
      }

      try {
        const idToken = await loginUser.getIdToken();

        const response = await fetch("http://127.0.0.1:8000/auth/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setCurrentUser(null);
          return;
        }

        setCurrentUser(data);
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
      }
    };

    fetchCurrentUser();
  }, [loginUser]);

  const handleCreateProduct = async () => {
    try {
      setMessage("");
      setBackendMessage("");

      if (!loginUser) {
        setMessage("ログインしてください");
        return;
      }

      if (!newProductTitle) {
        setMessage("商品名を入力してください");
        return;
      }

      if (!newProductDescription) {
        setMessage("商品説明を入力してください");
        return;
      }

      if (!newProductPrice) {
        setMessage("価格を入力してください");
        return;
      }

      if (Number(newProductPrice) <= 0) {
        setMessage("価格は1円以上で入力してください");
        return;
      }

      if (!newProductCategory) {
        setMessage("カテゴリを選択してください");
        return;
      }

      if (!newProductCondition) {
        setMessage("商品の状態を選択してください");
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

      setBackendMessage("");
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

      setBackendMessage("");
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

  useEffect(() => {
    if (!isMyPage || !loginUser) {
      return;
    }

    handleGetMyPage();
  }, [isMyPage, loginUser]);

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

      <h2>{pageTitle}</h2>

      {loginUser ? (
        <div>
          <p>ログイン中です</p>
          <p>Email: {loginUser.email}</p>

          <button onClick={handleLogout}>ログアウト</button>

          {isSellPage && (
            <SellPage
              newProductTitle={newProductTitle}
              setNewProductTitle={setNewProductTitle}
              newProductDescription={newProductDescription}
              setNewProductDescription={setNewProductDescription}
              newProductPrice={newProductPrice}
              setNewProductPrice={setNewProductPrice}
              newProductCategory={newProductCategory}
              setNewProductCategory={setNewProductCategory}
              newProductCondition={newProductCondition}
              setNewProductCondition={setNewProductCondition}
              newProductImageUrl={newProductImageUrl}
              setNewProductImageUrl={setNewProductImageUrl}
              handleCreateProduct={handleCreateProduct}
            />
          )}

          {isMyPage && (
            <>
              <hr />

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
            </>
          )}
        </div>
      ) : (
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
      )}

      {message && <p>{message}</p>}

      {backendMessage && (
        <div>
          <h3>エラー詳細</h3>
          <pre>{backendMessage}</pre>
        </div>
      )}

      {isHomePage && <HomePage products={products} />}

      {isProductDetailPage && selectedProduct && (
        <ProductDetailPage
          selectedProduct={selectedProduct}
          loginUser={loginUser}
          currentUser={currentUser}
          handlePurchaseProduct={handlePurchaseProduct}
        />
      )}
    </div>
  );
}

export default App;
