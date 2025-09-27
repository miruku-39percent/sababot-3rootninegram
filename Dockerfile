# 使用するNode.jsのバージョンを指定
FROM node:18

# 作業ディレクトリを/appに設定
WORKDIR /app

# appフォルダ内の内容をコンテナの/appにコピー
COPY app/ .

# gcloud CLIをインストール
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    lsb-release \
    ca-certificates \
    && curl -sSL https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - \
    && echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list \
    && apt-get update && apt-get install -y google-cloud-sdk \
    && apt-get clean

# 依存関係をインストール
RUN npm install

# サービスアカウントのキーをコンテナにマウントするための環境変数設定（認証用）
# ENV GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/service-account-key.json"

# ポート3000を開ける（Koyeb用など）
EXPOSE 3000

# Discord Botの起動コマンドを指定
CMD ["node", "main.mjs"]
