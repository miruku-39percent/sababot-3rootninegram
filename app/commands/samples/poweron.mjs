import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("poweron")
  .setDescription("サーバーを起動するよ～");

export async function execute(interaction) {
  const open = new XMLHttpRequest();
  open.open("GET", "https://aternos.org/ajax/server/start?access-credits=false&TOKEN=2sXYsREN40nA9CS4hEtQ&SEC=BFwbVpI2yO9KLBgq%3AMCsU2Ji2m2iUVMHs&SERVER=BOZSUsrBrqqpD5sP");
  open.send();
  open.responseType = "json";
  open.onload = () => {
    if (open.readyState == 4 && open.status == 200) {
      const data = open.response;
      console.log(data);
    } else {
      console.log(`Error: ${open.status}`);
    }
  };
  await interaction.reply("サーバーを起動しました！");
}

