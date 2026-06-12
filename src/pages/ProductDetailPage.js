import { Link } from "react-router-dom";

function ProductDetailPage({
  selectedProduct,
  loginUser,
  currentUser,
  handlePurchaseProduct,
}) {
  return (
    <div
      style={{
        border: "2px solid #333",
        padding: "16px",
        marginTop: "24px",
        borderRadius: "8px",
      }}
    >
      <h2>商品詳細</h2>

      {selectedProduct.image_url && (
        <img
          src={selectedProduct.image_url}
          alt={selectedProduct.title}
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
            display: "block",
            marginBottom: "16px",
          }}
        />
      )}

      <h3>{selectedProduct.title}</h3>
      <p>{selectedProduct.description}</p>
      <p>{selectedProduct.price}円</p>
      <p>カテゴリ: {selectedProduct.category}</p>
      <p>状態: {selectedProduct.condition_label}</p>
      <p>販売状況: {selectedProduct.status}</p>
      <p>出品者: {selectedProduct.seller_username}</p>
      <p>作成日: {selectedProduct.created_at}</p>

      {selectedProduct.status !== "available" ? (
        <p>この商品は売り切れです</p>
      ) : !loginUser ? (
        <p>購入するにはログインしてください</p>
      ) : !currentUser ? (
        <p>ログイン情報を確認中です</p>
      ) : selectedProduct.seller_id === currentUser.id ? (
        <p>これは自分が出品した商品です</p>
      ) : (
        <button onClick={() => handlePurchaseProduct(selectedProduct.id)}>
          購入する
        </button>
      )}

      <div style={{ marginTop: "12px" }}>
        <Link to="/">商品一覧に戻る</Link>
      </div>
    </div>
  );
}

export default ProductDetailPage;
