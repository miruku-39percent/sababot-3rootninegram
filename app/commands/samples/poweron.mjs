import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("poweron")
  .setDescription("サーバーを起動するよ～");

export async function execute(interaction) {
 // 1. ログイン処理
  const loginUrl = 'https://aternos.org/go/';
  const loginData = {
    username: 'raputa_is_15',  // あなたのユーザー名
    password: 'openserver'   // あなたのパスワード
  };

  const loginHeaders = {
    'Content-Type': 'application/json',
  };

  let cookies = '';  // ログイン後のクッキーを格納する変数

  try {
    // ログインリクエストを送信
    const loginResponse = await fetch(loginUrl, {
      method: 'POST',
      headers: loginHeaders,
      body: JSON.stringify(loginData),
      credentials: 'include', // クッキーを保持する
    });

    if (!loginResponse.ok) {
      console.log('ログイン失敗:', loginResponse.status);
      await interaction.reply("ログインに失敗しました。");
      return;
    }

    // クッキーを取得（ログイン後のセッション情報）
    cookies = loginResponse.headers.get('set-cookie');
    console.log('ログイン成功');
  } catch (error) {
    console.log('ログインエラー:', error);
    await interaction.reply("ログインに失敗しました。");
    return;
  }

  // 2. サーバー起動処理（特定のURLにGETリクエストを送る）
  const serverStartUrl = 'https://aternos.org/ajax/server/start?access-credits=false&TOKEN=2sXYsREN40nA9CS4hEtQ&SEC=BFwbVpI2yO9KLBgq%3AMCsU2Ji2m2iUVMHs&SERVER=BOZSUsrBrqqpD5sP';  // サーバー起動用のURL

  const serverStartHeaders = {
    'Content-Type': 'application/json',
    'Cookie': cookies,  // ログイン時に得たクッキーを使って認証
  };

  try {
    // サーバー起動リクエストを送信
    const startResponse = await fetch(serverStartUrl, {
      method: 'GET',
      headers: serverStartHeaders,
      credentials: 'include',  // クッキーを送信
    });

    if (startResponse.ok) {
      const data = await startResponse.json();
      console.log('サーバーが起動しました:', data);
      if (!interaction.replied) {
        await interaction.reply("サーバーを起動しました！");
      }
    } else {
      console.log('サーバー起動失敗:', startResponse.status);
      if (!interaction.replied) {
        await interaction.reply("サーバーの起動に失敗しました。");
      }
    }
  } catch (error) {
    console.log('サーバー起動エラー:', error);
    if (!interaction.replied) {
      await interaction.reply("サーバー起動時にエラーが発生しました。");
    }
  }
