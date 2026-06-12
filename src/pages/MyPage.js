import { Link } from "react-router-dom";

import UserMenu from "../components/UserMenu";

function MyPage({
  loginUser,
  handleLogout,
  myProducts,
  myPurchases,
  myPageLoading,
  myPageError,
}) {
  if (myPageLoading) {
    return (
      <>
        <UserMenu loginUser={loginUser} handleLogout={handleLogout} />
        <div className="loading-box">マイページを読み込み中です...</div>
      </>
    );
  }

  if (myPageError) {
    return (
      <>
        <UserMenu loginUser={loginUser} handleLogout={handleLogout} />
        <div className="empty-state">
          <p>{myPageError}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <UserMenu loginUser={loginUser} handleLogout={handleLogout} />

      <div className="mypage-layout">
        <section className="mypage-section">
          <div className="section-header">
            <div>
              <h3>自分の出品一覧</h3>
              <p>あなたが出品した商品の一覧です。</p>
            </div>

            <span className="count-badge">{myProducts.length}件</span>
          </div>

          {myProducts.length === 0 ? (
            <div className="empty-state">
              <p>出品した商品はありません</p>
            </div>
          ) : (
            <div className="compact-card-list">
              {myProducts.map((product) => (
                <article key={product.id} className="compact-card">
                  <div className="compact-card-header">
                    <div>
                      <h4>{product.title}</h4>
                      <p className="compact-meta">販売状況: {product.status}</p>
                    </div>

                    <p className="compact-price">
                      {product.price.toLocaleString()}円
                    </p>
                  </div>

                  <Link to={`/products/${product.id}`} className="mini-link">
                    詳細を見る
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="mypage-section">
          <div className="section-header">
            <div>
              <h3>自分の購入一覧</h3>
              <p>あなたが購入した商品の一覧です。</p>
            </div>

            <span className="count-badge">{myPurchases.length}件</span>
          </div>

          {myPurchases.length === 0 ? (
            <div className="empty-state">
              <p>購入した商品はありません</p>
            </div>
          ) : (
            <div className="compact-card-list">
              {myPurchases.map((purchase) => (
                <article key={purchase.purchase_id} className="compact-card">
                  <div className="compact-card-header">
                    <div>
                      <h4>{purchase.title}</h4>
                      <p className="compact-meta">
                        出品者: {purchase.seller_username}
                      </p>
                      <p className="compact-meta">
                        購入日時: {purchase.purchased_at}
                      </p>
                    </div>

                    <p className="compact-price">
                      {purchase.price.toLocaleString()}円
                    </p>
                  </div>

                  <Link
                    to={`/products/${purchase.product_id}`}
                    className="mini-link"
                  >
                    詳細を見る
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default MyPage;
