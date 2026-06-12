function MyPage({ myProducts, myPurchases }) {
  return (
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
  );
}

export default MyPage;
