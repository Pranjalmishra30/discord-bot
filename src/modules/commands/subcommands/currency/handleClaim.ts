import { MessageEmbed } from "discord.js";
import { CurrencyHandler } from "../../../../interfaces/commands/CurrencyHandler";
import { beccaErrorHandler } from "../../../../utils/beccaErrorHandler";
import { errorEmbedGenerator } from "../../errorEmbedGenerator";

export const handleClaim: CurrencyHandler = async (
  Becca,
  interaction,
  data
) => {
  try {
    const reward = interaction.options.getString("reward");
    const claimEmbed = new MessageEmbed();
    claimEmbed.setTitle("Reward Claimed!");
    claimEmbed.setDescription(
      "Congratulations on claiming a reward! Please note that you will need to join our [support server](https://chat.nhcarrigan.com) and ping `nhcarrigan` so we can work with you to get your prize."
    );

    switch (reward) {
      case "monarch":
        if (data.currencyTotal < 500) {
          await interaction.editReply(
            `This reward costs 500 BeccaCoin. You only have ${data.currencyTotal}.`
          );
          return;
        }
        data.currencyTotal -= 500;
        await data.save();
        claimEmbed.addField(
          "Reward Details",
          "You will take the monarch role from whomever has it in our server, and you will keep the role until someone else takes it from you."
        );
        break;
      case "emote":
        if (data.currencyTotal < 1000) {
          await interaction.editReply(
            `This reward costs 1000 BeccaCoin. You only have ${data.currencyTotal}.`
          );
          return;
        }
        data.currencyTotal -= 1000;
        await data.save();
        claimEmbed.addField(
          "Reward Details",
          "You will be able to work with nhcarrigan to determine the next pose for a Becca emote. The emote will be available in the support server. nhcarrigan will retain all rights to the art and the character, but we will make an announcement in the support server thanking you for the emote idea."
        );
        break;
      case "feature":
        if (data.currencyTotal < 3000) {
          await interaction.editReply(
            `This reward costs 3000 BeccaCoin. You only have ${data.currencyTotal}.`
          );
          return;
        }
        data.currencyTotal -= 3000;
        await data.save();
        claimEmbed.addField(
          "Reward Details",
          "You will be able to work with nhcarrigan and the development team to suggest a new feature for Becca. We reserve the right to refuse features that are not in line with Becca's primary purpose, but will work with you until you we reach a feature proposal everyone is happy with."
        );
        break;
      case "wealthy":
        if (data.currencyTotal < 5000) {
          await interaction.editReply(
            `This reward costs 5000 BeccaCoin. You only have ${data.currencyTotal}.`
          );
          return;
        }
        data.currencyTotal -= 5000;
        await data.save();
        claimEmbed.addField(
          "Reward Details",
          "You will be given the Wealthy role in our server. You will keep this role."
        );
        break;
      case "nitro":
        if (data.currencyTotal < 10000) {
          await interaction.editReply(
            `This reward costs 10000 BeccaCoin. You only have ${data.currencyTotal}.`
          );
          return;
        }
        data.currencyTotal -= 10000;
        await data.save();
        claimEmbed.addField(
          "Reward Details",
          "nhcarrigan will provide you with a one-month nitro gift code. You can redeem this on your own account or pass it to a friend, but we will only send the code directly to you."
        );
        break;
      case "default":
        await interaction.editReply(
          "This somehow appears to be an invalid reward. Please check with the developer team."
        );
        return;
    }

    await interaction.editReply({ embeds: [claimEmbed] });

    await Becca.debugHook.send(
      `Hey <@!${Becca.configs.ownerId}>! A reward has been claimed!\n**Reward**: ${reward}\n**Username**: ${interaction.user.username}\n**UserID**: ${interaction.user.id}\nUser in Server? <@!${interaction.user.id}>`
    );
  } catch (err) {
    const errorId = await beccaErrorHandler(
      Becca,
      "claim command",
      err,
      interaction.guild?.name
    );
    await interaction
      .reply({
        embeds: [errorEmbedGenerator(Becca, "claim", errorId)],
        ephemeral: true,
      })
      .catch(async () =>
        interaction.editReply({
          embeds: [errorEmbedGenerator(Becca, "claim", errorId)],
        })
      );
  }
};
