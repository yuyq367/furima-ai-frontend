# Furima AI

AI機能を搭載した次世代フリマアプリ

## 概要

Furima AI は、商品の出品・購入・管理ができるフリマアプリです。
通常のフリマ機能に加えて、OpenAI APIを活用し、商品情報から自然な商品説明文を自動生成できる機能を実装しています。

出品者は商品名・カテゴリ・状態・価格などを入力するだけで、AIが販売文を作成してくれるため、出品作業の負担を軽減できます。

## 公開URL

* Frontend: https://furima-ai-frontend.vercel.app
* Backend: https://furima-ai-backend-796764136746.us-central1.run.app

## 主な機能

### ユーザー認証

* Firebase Authentication を用いたメールアドレス / パスワード認証
* 新規登録
* ログイン
* ログアウト
* ログイン状態に応じた画面表示の切り替え

### 商品一覧

* 出品されている商品の一覧表示
* 商品カード表示
* 販売中 / 売り切れステータスの表示
* 商品詳細ページへの遷移

### 商品検索・フィルタ

* キーワード検索
* カテゴリによる絞り込み
* 販売状況による絞り込み
* 検索条件のリセット
* 検索結果件数の表示

### 商品詳細

* 商品名
* 価格
* 商品説明
* カテゴリ
* 商品状態
* 販売状況
* 出品者
* 作成日

を表示します。

### 出品

* ログインユーザーのみ出品可能
* 商品名、説明文、価格、カテゴリ、状態、画像URLを入力して出品
* 出品前の確認モーダル表示
* 出品後、商品一覧に反映

### AI商品説明文生成

* 商品名、カテゴリ、状態、価格などをもとに、AIが商品説明文を生成
* OpenAI APIを利用
* 出品文を考える手間を軽減

### 購入

* ログインユーザーのみ購入可能
* 自分が出品した商品は購入不可
* 購入済みの商品は売り切れとして表示
* 購入前の確認モーダル表示

### マイページ

* ログイン中のユーザー情報を表示
* 自分が出品した商品一覧を表示
* 自分が購入した商品一覧を表示
* 出品した商品の詳細ページへ遷移可能

### 商品編集

* 自分が出品した商品のみ編集可能
* 商品名、説明文、価格、カテゴリ、状態、画像URLを編集可能
* 編集前の確認モーダル表示
* 更新後、商品詳細と商品一覧に反映

## 使用技術

### Frontend

* React
* React Router
* Firebase Authentication
* CSS
* Vercel

### Backend

* Python
* FastAPI
* SQLAlchemy
* PyMySQL
* Firebase Admin SDK
* OpenAI API
* Cloud Run

### Database

* Cloud SQL
* MySQL 8.0

### Infrastructure

* Vercel
* Google Cloud Run
* Google Cloud SQL
* Google Cloud Build
* Firebase Authentication

## アーキテクチャ

```text
User
↓
Vercel
React Frontend
↓
Cloud Run
FastAPI Backend
↓
Cloud SQL
MySQL Database

FastAPI Backend
↓
OpenAI API
```

## 画面一覧

* 商品一覧画面
* 商品詳細画面
* 出品画面
* マイページ
* ログイン画面
* 新規登録画面

## ローカル環境での起動方法

### Frontend

```bash
cd furima-ai-frontend
nvm use 20
npm install
npm start
```

ローカルでは以下のURLで起動します。

```text
http://localhost:3000
```

### Backend

```bash
cd furima-ai-backend
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app.main:app
```

ローカルでは以下のURLで起動します。

```text
http://127.0.0.1:8000
```

## 環境変数

### Frontend

`.env` に以下を設定します。

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000

REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
```

Vercelでは以下を設定します。

```env
REACT_APP_API_BASE_URL=Cloud Run のURL
REACT_APP_API_KEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
CI=false
```

### Backend

`.env` に以下を設定します。

```env
DB_HOST=
DB_PORT=3306
DB_NAME=furima_ai
DB_USER=
DB_PASSWORD=

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

FIREBASE_PROJECT_ID=
```

Cloud Runでは以下を設定します。

```env
DB_NAME=furima_ai
DB_USER=
DB_PASSWORD=
INSTANCE_CONNECTION_NAME=

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini

FIREBASE_PROJECT_ID=
```

## デプロイ

### Frontend

FrontendはVercelにデプロイしています。
GitHubのmainブランチに変更が反映されると、Vercelによって自動的に再デプロイされます。

### Backend

BackendはCloud Runにデプロイしています。
GitHubのmainブランチに変更が反映されると、Cloud BuildによってDockerイメージがビルドされ、Cloud Runに自動的に再デプロイされます。

## 工夫した点

### AIによる出品支援

フリマアプリでは、商品説明文を書くことが出品のハードルになりやすいと考えました。
そこで、商品名・カテゴリ・状態・価格などの情報をもとに、AIが自然な説明文を生成する機能を実装しました。

### 出品後の管理機能

出品後に価格や説明文を変更したいケースを想定し、自分の商品だけを編集できる機能を追加しました。

### フリマアプリらしい検索体験

商品数が増えた場合でも目的の商品を探しやすくするため、キーワード検索、カテゴリフィルタ、販売状況フィルタを実装しました。

### 本番環境へのデプロイ

FrontendをVercel、BackendをCloud Run、DatabaseをCloud SQLに分けてデプロイし、実際にインターネット上で利用できる構成にしました。

## 今後の展望

* 商品画像アップロード機能
* 商品削除機能
* お気に入り機能
* コメント・問い合わせ機能
* 価格帯フィルタ
* 並び替え機能
* AIによるカテゴリ自動推定
* AIによる適正価格提案
* レコメンド機能

## 開発者

* yuyq367
