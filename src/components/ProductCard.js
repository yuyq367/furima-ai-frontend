import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const isSold = product.status === "sold";

  return (
    <article className={`product-card ${isSold ? "product-card-sold" : ""}`}>
      <div className="product-image-area">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.title}
            className="product-image"
          />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}

        {isSold && <span className="sold-badge">SOLD</span>}
      </div>

      <div className="product-card-body">
        <div className="product-card-header">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">{product.price.toLocaleString()}円</p>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <span>{product.category}</span>
          <span>{product.condition_label}</span>
        </div>

        <div className="product-card-footer">
          <span className={`status-label ${isSold ? "status-sold" : ""}`}>
            {isSold ? "売り切れ" : "販売中"}
          </span>

          <Link to={`/products/${product.id}`} className="detail-link">
            詳細を見る
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
