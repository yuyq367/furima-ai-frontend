import { useState } from "react";
import { Link } from "react-router-dom";

function ProductDetailPage({
  selectedProduct,
  loginUser,
  currentUser,
  handlePurchaseProduct,
  handleUpdateProduct,
}) {
  const isSold = selectedProduct.status !== "available";
  const isOwnProduct =
    loginUser && currentUser && selectedProduct.seller_id === currentUser.id;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(selectedProduct.title);
  const [editDescription, setEditDescription] = useState(
    selectedProduct.description,
  );
  const [editPrice, setEditPrice] = useState(String(selectedProduct.price));
  const [editCategory, setEditCategory] = useState(selectedProduct.category);
  const [editCondition, setEditCondition] = useState(
    selectedProduct.condition_label,
  );
  const [editImageUrl, setEditImageUrl] = useState(
    selectedProduct.image_url || "",
  );

  const handleStartEdit = () => {
    setEditTitle(selectedProduct.title);
    setEditDescription(selectedProduct.description);
    setEditPrice(String(selectedProduct.price));
    setEditCategory(selectedProduct.category);
    setEditCondition(selectedProduct.condition_label);
    setEditImageUrl(selectedProduct.image_url || "");
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    const success = await handleUpdateProduct(selectedProduct.id, {
      title: editTitle,
      description: editDescription,
      price: editPrice,
      image_url: editImageUrl,
      category: editCategory,
      condition_label: editCondition,
    });

    if (success) {
      setIsEditing(false);
    }
  };

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
          {isEditing ? (
            <>
              <div className="form-card-header">
                <h3>商品情報を編集</h3>
                <p>出品した商品の内容を変更できます。</p>
              </div>

              <div className="form-grid">
                <div className="form-field">
                  <label>商品名</label>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>価格</label>
                  <input
                    type="number"
                    value={editPrice}
                    onChange={(event) => setEditPrice(event.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>カテゴリ</label>
                  <select
                    value={editCategory}
                    onChange={(event) => setEditCategory(event.target.value)}
                  >
                    <option value="">カテゴリを選択</option>
                    <option value="衣類">衣類</option>
                    <option value="靴・バッグ">靴・バッグ</option>
                    <option value="アクセサリー">アクセサリー</option>
                    <option value="本・漫画">本・漫画</option>
                    <option value="ゲーム・おもちゃ">ゲーム・おもちゃ</option>
                    <option value="家電・スマホ">家電・スマホ</option>
                    <option value="インテリア">インテリア</option>
                    <option value="コスメ・美容">コスメ・美容</option>
                    <option value="スポーツ・アウトドア">
                      スポーツ・アウトドア
                    </option>
                    <option value="食品">食品</option>
                    <option value="チケット">チケット</option>
                    <option value="その他">その他</option>
                  </select>
                </div>

                <div className="form-field">
                  <label>商品の状態</label>
                  <select
                    value={editCondition}
                    onChange={(event) => setEditCondition(event.target.value)}
                  >
                    <option value="">商品の状態を選択</option>
                    <option value="新品・未使用">新品・未使用</option>
                    <option value="未使用に近い">未使用に近い</option>
                    <option value="目立った傷や汚れなし">
                      目立った傷や汚れなし
                    </option>
                    <option value="やや傷や汚れあり">やや傷や汚れあり</option>
                    <option value="傷や汚れあり">傷や汚れあり</option>
                  </select>
                </div>

                <div className="form-field form-field-full">
                  <label>商品説明</label>
                  <textarea
                    value={editDescription}
                    onChange={(event) => setEditDescription(event.target.value)}
                  />
                </div>

                <div className="form-field form-field-full">
                  <label>画像URL</label>
                  <input
                    type="text"
                    value={editImageUrl}
                    onChange={(event) => setEditImageUrl(event.target.value)}
                  />
                </div>
              </div>

              <div className="detail-actions">
                <button className="secondary-action" onClick={handleCancelEdit}>
                  キャンセル
                </button>
                <button className="primary-action" onClick={handleSaveEdit}>
                  保存する
                </button>
              </div>
            </>
          ) : (
            <>
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

              <p className="detail-description">
                {selectedProduct.description}
              </p>

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
                  <p className="detail-notice">
                    購入するにはログインしてください
                  </p>
                ) : !currentUser ? (
                  <p className="detail-notice">ログイン情報を確認中です</p>
                ) : isOwnProduct ? (
                  <>
                    <p className="detail-notice">
                      これは自分が出品した商品です
                    </p>
                    <button
                      className="primary-action"
                      onClick={handleStartEdit}
                    >
                      編集する
                    </button>
                  </>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetailPage;
