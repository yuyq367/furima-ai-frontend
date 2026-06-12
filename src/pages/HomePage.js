import ProductCard from "../components/ProductCard";

function HomePage({ products, productsLoading, productsError }) {
  return (
    <>
      <hr />

      {productsLoading ? (
        <div className="loading-box">商品一覧を読み込み中です...</div>
      ) : productsError ? (
        <div className="empty-state">
          <p>{productsError}</p>
        </div>
      ) : products.length === 0 ? (
        <div className="empty-state">
          <p>商品がありません</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
