function SellPage({
  newProductTitle,
  setNewProductTitle,
  newProductDescription,
  setNewProductDescription,
  newProductPrice,
  setNewProductPrice,
  newProductCategory,
  setNewProductCategory,
  newProductCondition,
  setNewProductCondition,
  newProductImageUrl,
  setNewProductImageUrl,
  handleCreateProduct,
}) {
  return (
    <>
      <hr />

      <div>
        <input
          type="text"
          placeholder="商品名"
          value={newProductTitle}
          onChange={(event) => setNewProductTitle(event.target.value)}
        />
      </div>

      <div>
        <textarea
          placeholder="商品説明"
          value={newProductDescription}
          onChange={(event) => setNewProductDescription(event.target.value)}
        />
      </div>

      <div>
        <input
          type="number"
          placeholder="価格"
          value={newProductPrice}
          onChange={(event) => setNewProductPrice(event.target.value)}
        />
      </div>

      <div>
        <select
          value={newProductCategory}
          onChange={(event) => setNewProductCategory(event.target.value)}
        >
          <option value="">カテゴリを選択</option>
          <option value="衣類">衣類</option>
          <option value="本">本</option>
          <option value="家電">家電</option>
          <option value="コスメ">コスメ</option>
          <option value="その他">その他</option>
        </select>
      </div>

      <div>
        <select
          value={newProductCondition}
          onChange={(event) => setNewProductCondition(event.target.value)}
        >
          <option value="">商品の状態を選択</option>
          <option value="新品・未使用">新品・未使用</option>
          <option value="未使用に近い">未使用に近い</option>
          <option value="目立った傷や汚れなし">目立った傷や汚れなし</option>
          <option value="やや傷や汚れあり">やや傷や汚れあり</option>
          <option value="傷や汚れあり">傷や汚れあり</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          placeholder="画像URL（任意）"
          value={newProductImageUrl}
          onChange={(event) => setNewProductImageUrl(event.target.value)}
        />
      </div>

      <button onClick={handleCreateProduct}>出品する</button>
    </>
  );
}

export default SellPage;
