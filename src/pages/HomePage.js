import { useMemo, useState } from "react";

import ProductCard from "../components/ProductCard";

const categories = [
  "衣類",
  "靴・バッグ",
  "アクセサリー",
  "本・漫画",
  "ゲーム・おもちゃ",
  "家電・スマホ",
  "インテリア",
  "コスメ・美容",
  "スポーツ・アウトドア",
  "食品",
  "チケット",
  "その他",
];

function toSearchText(value) {
  return String(value ?? "").toLowerCase();
}

function HomePage({ products, productsLoading, productsError }) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredProducts = useMemo(() => {
    const keyword = searchKeyword.trim().toLowerCase();

    return products.filter((product) => {
      const searchableTexts = [
        product.title,
        product.description,
        product.category,
        product.condition_label,
      ];

      const matchesKeyword =
        keyword === "" ||
        searchableTexts.some((text) => toSearchText(text).includes(keyword));

      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "" || product.status === selectedStatus;

      return matchesKeyword && matchesCategory && matchesStatus;
    });
  }, [products, searchKeyword, selectedCategory, selectedStatus]);

  const hasActiveFilter =
    searchKeyword !== "" || selectedCategory !== "" || selectedStatus !== "";

  const handleClearFilters = () => {
    setSearchKeyword("");
    setSelectedCategory("");
    setSelectedStatus("");
  };

  return (
    <>
      <div className="product-filter-panel">
        <div className="filter-header">
          <div>
            <h3>商品を探す</h3>
            <p>キーワードやカテゴリで商品を絞り込めます。</p>
          </div>

          {hasActiveFilter && (
            <button
              className="filter-clear-button"
              onClick={handleClearFilters}
            >
              条件をリセット
            </button>
          )}
        </div>

        <div className="filter-grid">
          <div className="filter-field filter-field-keyword">
            <label>キーワード</label>
            <input
              type="text"
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
              placeholder="商品名・商品説明で検索"
            />
          </div>

          <div className="filter-field">
            <label>カテゴリ</label>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="">すべて</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label>販売状況</label>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
            >
              <option value="">すべて</option>
              <option value="available">販売中</option>
              <option value="sold">売り切れ</option>
            </select>
          </div>
        </div>

        {!productsLoading && !productsError && (
          <p className="filter-result-count">
            {products.length}件中 {filteredProducts.length}件を表示
          </p>
        )}
      </div>

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
      ) : filteredProducts.length === 0 ? (
        <div className="empty-state">
          <p>条件に一致する商品がありません</p>
          <button className="secondary-action" onClick={handleClearFilters}>
            条件をリセットする
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default HomePage;
