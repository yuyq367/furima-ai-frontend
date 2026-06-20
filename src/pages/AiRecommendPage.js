import ProductCard from "../components/ProductCard";

function AiRecommendPage({
  query,
  setQuery,
  aiMessage,
  recommendedProducts,
  isLoading,
  errorMessage,
  handleAiRecommend,
}) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleAiRecommend(query);
  };

  return (
    <div className="ai-recommend-page">
      <section className="ai-hero">
        <div className="ai-hero-badge">AI Recommend</div>

        <h2>AIに商品を探してもらう</h2>

        <p>
          欲しい商品のイメージを文章で入力すると、AIが出品中の商品から条件に近いものをおすすめします。
        </p>

        <form className="ai-recommend-form" onSubmit={handleSubmit}>
          <label htmlFor="ai-recommend-query">
            どんな商品を探していますか？
          </label>

          <textarea
            id="ai-recommend-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例：通学に使えるシンプルなバッグが欲しい"
            rows="4"
          />

          <button className="primary-action" type="submit" disabled={isLoading}>
            {isLoading ? "AIが探しています..." : "AIにおすすめしてもらう"}
          </button>
        </form>

        <div className="ai-example-box">
          <p>入力例</p>
          <button
            type="button"
            onClick={() => setQuery("通学に使えるシンプルなバッグが欲しい")}
          >
            通学に使えるバッグ
          </button>
          <button
            type="button"
            onClick={() => setQuery("一人暮らしに便利な家電が欲しい")}
          >
            一人暮らし向け家電
          </button>
          <button
            type="button"
            onClick={() =>
              setQuery("友達へのプレゼントに良さそうな小物が欲しい")
            }
          >
            プレゼント向き小物
          </button>
        </div>
      </section>

      {errorMessage && <p className="inline-error">{errorMessage}</p>}

      {aiMessage && (
        <section className="ai-result-message">
          <h3>AIからのコメント</h3>
          <p>{aiMessage}</p>
        </section>
      )}

      {recommendedProducts.length > 0 && (
        <section className="ai-recommend-results">
          <div className="section-heading-row">
            <div>
              <h3>おすすめ商品</h3>
              <p>入力された条件に近い順に表示しています。</p>
            </div>
          </div>

          <div className="product-grid">
            {recommendedProducts.map((product, index) => (
              <div className="ai-ranked-product-card" key={product.id}>
                <div className="ai-rank-badge">
                  👑 {product.recommendation_rank || index + 1}位
                </div>

                <ProductCard product={product} />

                {product.recommendation_reason && (
                  <div className="ai-recommend-reason">
                    <p className="ai-recommend-reason-title">
                      AIのおすすめ理由
                    </p>
                    <p>{product.recommendation_reason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {!isLoading && aiMessage && recommendedProducts.length === 0 && (
        <div className="empty-state">
          <p>条件に合う商品が見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}

export default AiRecommendPage;
