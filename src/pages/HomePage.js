import ProductCard from "../components/ProductCard";

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
