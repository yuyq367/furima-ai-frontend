import { Link } from "react-router-dom";

function HomePage({ products }) {
  return (
    <>
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
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.title}
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    display: "block",
                    marginBottom: "12px",
                  }}
                />
              )}

              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>{product.price}円</p>
              <p>カテゴリ: {product.category}</p>
              <p>状態: {product.condition_label}</p>
              <p>販売状況: {product.status}</p>

              <Link to={`/products/${product.id}`}>詳細を見る</Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
