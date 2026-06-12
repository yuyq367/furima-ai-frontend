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
  aiDescriptionLoading,
  aiDescriptionError,
  handleGenerateProductDescription,
  handleCreateProduct,
}) {
  return (
    <section className="form-card sell-form-card">
      <div className="form-card-header">
        <h3>出品情報を入力</h3>
        <p>商品名・状態・価格を入力して、商品を出品しましょう。</p>
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>商品名</label>
          <input
            type="text"
            placeholder="例：ワイヤレスイヤホン"
            value={newProductTitle}
            onChange={(event) => setNewProductTitle(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label>価格</label>
          <input
            type="number"
            placeholder="例：3000"
            value={newProductPrice}
            onChange={(event) => setNewProductPrice(event.target.value)}
          />
        </div>

        <div className="form-field">
          <label>カテゴリ</label>
          <select
            value={newProductCategory}
            onChange={(event) => setNewProductCategory(event.target.value)}
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
            <option value="スポーツ・アウトドア">スポーツ・アウトドア</option>
            <option value="食品">食品</option>
            <option value="チケット">チケット</option>
            <option value="その他">その他</option>
          </select>
        </div>

        <div className="form-field">
          <label>商品の状態</label>
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

        <div className="form-field form-field-full">
          <div className="form-label-row">
            <label>商品説明</label>

            <div className="form-label-actions">
              {aiDescriptionError && (
                <span className="inline-error">{aiDescriptionError}</span>
              )}

              <button
                type="button"
                className="ai-generate-button"
                onClick={handleGenerateProductDescription}
                disabled={aiDescriptionLoading}
              >
                {aiDescriptionLoading ? "生成中..." : "AIで説明文を生成"}
              </button>
            </div>
          </div>

          <textarea
            placeholder="商品の特徴や状態を入力してください"
            value={newProductDescription}
            onChange={(event) => setNewProductDescription(event.target.value)}
          />
        </div>

        <div className="form-field form-field-full">
          <label>画像URL</label>
          <input
            type="text"
            placeholder="任意：画像URLを入力"
            value={newProductImageUrl}
            onChange={(event) => setNewProductImageUrl(event.target.value)}
          />
        </div>
      </div>

      <div className="form-actions">
        <button className="primary-action" onClick={handleCreateProduct}>
          出品する
        </button>
      </div>
    </section>
  );
}

export default SellPage;
