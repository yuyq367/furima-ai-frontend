import ProductCard from "../components/ProductCard";

function HomePage({ products }) {
  return (
    <>
      <hr />

      {products.length === 0 ? (
        <p>商品がありません</p>
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
