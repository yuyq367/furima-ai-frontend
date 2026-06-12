import { Link } from "react-router-dom";

function ProductDetailPage({
  selectedProduct,
  loginUser,
  currentUser,
  handlePurchaseProduct,
}) {
  const isSold = selectedProduct.status !== "available";

  return (
    <section className="detail-card">
      <div className="detail-layout">
        <div className="detail-image-area">
          {selectedProduct.image_url ? (
            <img
              src={selectedProduct.image_url}
              alt={selectedProduct.title}
              className="detail-image"
            />
          ) : (
            <div className="detail-image-placeholder">No Image</div>
          )}

          {isSold && <span className="sold-badge">SOLD</span>}
        </div>

        <div className="detail-info">
          <div className="detail-header">
            <div>
              <h2 className="detail-title">{selectedProduct.title}</h2>
              <p className="detail-seller">
                出品者: {selectedProduct.seller_username}
              </p>
            </div>

            <p className="detail-price">
              {selectedProduct.price.toLocaleString()}円
            </p>
          </div>

          <p className="detail-description">{selectedProduct.description}</p>

          <div className="detail-meta">
            <div>
              <span>カテゴリ</span>
              <strong>{selectedProduct.category}</strong>
            </div>

            <div>
              <span>状態</span>
              <strong>{selectedProduct.condition_label}</strong>
            </div>

            <div>
              <span>販売状況</span>
              <strong>{isSold ? "売り切れ" : "販売中"}</strong>
            </div>

            <div>
              <span>作成日</span>
              <strong>{selectedProduct.created_at}</strong>
            </div>
          </div>

          <div className="detail-actions">
            {isSold ? (
              <p className="detail-notice">この商品は売り切れです</p>
            ) : !loginUser ? (
              <p className="detail-notice">購入するにはログインしてください</p>
            ) : !currentUser ? (
              <p className="detail-notice">ログイン情報を確認中です</p>
            ) : selectedProduct.seller_id === currentUser.id ? (
              <p className="detail-notice">これは自分が出品した商品です</p>
            ) : (
              <button
                className="primary-action"
                onClick={() => handlePurchaseProduct(selectedProduct.id)}
              >
                購入する
              </button>
            )}

            <Link to="/" className="back-link">
              商品一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
