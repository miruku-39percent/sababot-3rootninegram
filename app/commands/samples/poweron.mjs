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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        'Referer': 'https://aternos.org/:ja/', // 参照元を明示的に指定
        'Cookie': '_ga=GA1.1.737222294.1758594560; _ga_70M94GH0FD=GS2.1.s1758594560$o1$g1$t1758594567$j53$l0$h0',
        'Sec-Ch-Ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'upgrade-insecure-requests': '1'
      },
      maxRedirects: 5
    });

    console.log('ログイン成功');
  } catch (error) {
    if (error.response) {
      console.error('レスポンスエラー:', error.response.status, error.response.data);
    } else {
      console.error('ログイン失敗:', error.message);
    }
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
        'Referer': 'https://aternos.org/server/', 
        'Cookie': 'uid=6615131858693277632',
        'Sec-Ch-Ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'cross-site',
        'Sec-Fetch-Storage-Access': 'active'// 実際の参照元ページに合わせる必要あり
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
