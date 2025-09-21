import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("poweron")
  .setDescription("サーバーを起動するよ～");

export async function execute(interaction) {
  try {
    const response = await fetch("https://aternos.org/ajax/server/start?access-credits=false&TOKEN=2sXYsREN40nA9CS4hEtQ&SEC=BFwbVpI2yO9KLBgq%3AMCsU2Ji2m2iUVMHs&SERVER=BOZSUsrBrqqpD5sP", {
      method: 'GET', // HTTPメソッド（GET）
    });

    if (response.ok) { // ステータスコード200のチェック
      const data = await response.json();
      console.log(data);
    } else {
      console.log(`Error: ${response.status}`);
    }
  } catch (error) {
    console.log("Fetch Error:", error);
  }

  await interaction.reply("サーバーを起動しました！");
}
