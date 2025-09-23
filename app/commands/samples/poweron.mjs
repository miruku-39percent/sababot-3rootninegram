import { SlashCommandBuilder } from "discord.js";
import axios from 'axios';
import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';

export const data = new SlashCommandBuilder()
  .setName("poweron")
  .setDescription("サーバーを起動するよ～");

export async function execute(interaction) {
  const jar = new CookieJar();
  const client = wrapper(axios.create({ jar, withCredentials: true }));

  const loginUrl = 'https://aternos.org/go/';
  const loginData = {
    username: 'raputa_is_15',
    password: 'openserver'
  };

  try {
    // 1. ログイン処理
    const loginResponse = await client.post(loginUrl, loginData, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
        'Referer': 'https://aternos.org/:ja/', // 参照元を明示的に指定
      },
      maxRedirects: 5
    });

    console.log('ログイン成功');
  } catch (error) {
    console.error('ログイン失敗:', error.message);
    await interaction.reply('ログインに失敗しました。');
    return;
  }

  // 2. サーバー起動処理
  const serverStartUrl = 'https://aternos.org/ajax/server/start?access-credits=false&TOKEN=2sXYsREN40nA9CS4hEtQ&SEC=BFwbVpI2yO9KLBgq%3AMCsU2Ji2m2iUVMHs&SERVER=BOZSUsrBrqqpD5sP';

  try {
    const startResponse = await client.get(serverStartUrl, {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Referer': 'https://aternos.org/server/', // 実際の参照元ページに合わせる必要あり
      }
    });

    if (startResponse.status === 200) {
      console.log('サーバーが起動しました:', startResponse.data);
      if (!interaction.replied) {
        await interaction.reply("サーバーを起動しました！");
      }
    } else {
      console.log('サーバー起動失敗:', startResponse.status);
      if (!interaction.replied) {
        await interaction.reply("サーバーの起動に失敗しました。コード: " + startResponse.status);
      }
    }
  } catch (error) {
    console.error('サーバー起動エラー:', error.message);
    if (!interaction.replied) {
      await interaction.reply("サーバー起動時にエラーが発生しました。");
    }
  }
}
