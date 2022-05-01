const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dailyrole")
    .setDescription("Returns the bot's ping status")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("roleid")
        .setDescription("Set the role that will be given each day.")
        .addStringOption((option) =>
          option
            .setName("content")
            .setDescription(
              "The ID of the role to set"
            )
            .setRequired(true)
        )
    ),
  async execute(interaction, client) {
    switch (interaction.options.getSubcommand()) {
      case "roleid": {
    const pingembed = new MessageEmbed()

      .setColor("#5865f4")
      .setTitle(":ping_pong:  Pong!")
      .addFields(
        {
          name: "**Api** latency",
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: false,
        }
      )
      .setTimestamp();

    await interaction.reply({
      embeds: [pingembed]
    });
      }
    }
  },
};
