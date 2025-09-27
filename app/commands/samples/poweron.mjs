import { Client, GatewayIntentBits } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import { exec } from 'child_process';

// GCPインスタンスの設定
const INSTANCE = process.env.INSTANCE;  // あなたのGCEインスタンスの名前
const ZONE = process.env.ZONE;  // あなたのインスタンスがあるゾーン

// 環境変数からDiscord Botのトークンを取得
const TOKEN = process.env.TOKEN;  // サーバーの環境変数からトークンを取得

// スラッシュコマンド設定
export const data = new SlashCommandBuilder()
  .setName("poweron")
  .setDescription("サーバーを起動するよ～");

// コマンド実行関数
async function execCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(`error: ${error.message}`);
      }
      if (stderr) {
        reject(`stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
}

// サーバー起動処理
export async function execute(interaction) {
  await interaction.reply("サーバーを起動中...");

  const cmd = `gcloud compute instances start ${INSTANCE} --zone ${ZONE}`;

  try {
    const result = await execCommand(cmd);
    console.log(result);
    await interaction.editReply("サーバーを起動しました！");
  } catch (error) {
    console.error(error);
    await interaction.editReply("サーバーの起動に失敗しました。");
  }
}
