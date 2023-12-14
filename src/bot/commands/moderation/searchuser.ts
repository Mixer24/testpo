import { AutocompleteInteraction, ChatInputCommandInteraction, Colors, EmbedBuilder, PermissionFlagsBits, SlashCommandStringOption } from "discord.js";
import { Guardsman } from "index";
import { AxiosResponse } from "axios";

export default class SearchUserCommand implements ICommand 
{
    name: Lowercase<string> = "searchuser";
    description: string = "Allows guild moderators to search for a user's Guardsman data";
    guardsman: Guardsman;

    options = [
        new SlashCommandStringOption()
            .setName("query")
            .setDescription("The field to search for (Roblox ID, Discord ID)")
            .setRequired(true)
            .setAutocomplete(true)
    ]

    constructor(guardsman: Guardsman) 
    {
        this.guardsman = guardsman;
    }

    async execute(interaction: ChatInputCommandInteraction<"cached">): Promise<void>
    {
        await interaction.deferReply();

        const canGlobalBan = await this.guardsman.bot.checkGuardsmanPermissionNode(interaction.user, "moderate:search");

        if (!canGlobalBan) {
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Guardsman API")
                        .setDescription("You do not have permission to `moderate:search`")
                        .setColor(Colors.Red)
                        .setFooter({ text: "Guardsman API" })
                        .setTimestamp()
                ]
            });

            return;
        };

        const query = interaction.options.getString("query", true);
        let userData: AxiosResponse<IUser>
        // const userData: AxiosResponse<IUser> = await this.guardsman.bot.guardsmanAPI.get(`api/discord/user/${query}`);

        try {
            userData = await this.guardsman.bot.guardsmanAPI.get(`discord/user/by-username/${query}`);
        } catch (error) {
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Guardsman API Error")
                        .setDescription(`An error occurred whilst communicating with the Guardsman API. ${error}`)
                        .setColor(Colors.Red)
                        .setFooter({ text: "Guardsman API" })
                        .setTimestamp()
                ]
            })
            
            return;
        }

        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(userData.data.username)
                    .setColor(Colors.Green)
                    .setFooter({ text: "Guardsman Database" })
                    .setTimestamp()
                    .addFields(
                        {
                            name: "Guardsman ID",
                            value: userData.data.id?.toString() || "Unknown",
                            inline: true
                        },

                        {
                            name: "Username",
                            value: userData.data.username,
                            inline: true
                        },

                        {
                            name: "ROBLOX ID",
                            value: userData.data.roblox_id,
                            inline: true
                        },

                        {
                            name: "Discord ID",
                            value: userData.data.discord_id,
                            inline: true
                        },

                        {
                            name: "Roles",
                            value: `${userData.data.roles}`,
                            inline: true
                        },

                        {
                            name: "Verified At",
                            value: userData.data.created_at?.toString() || "Unknown",
                            inline: true
                        }
                    )
            ]
        })
    }

    async autocomplete(interaction: AutocompleteInteraction<"cached">): Promise<void> {
        const query = interaction.options.getString("query", true);
        if (query == "") return;
        
        this.guardsman.bot.guardsmanAPI.get(`discord/search/${query}`)
            .then(response => {
                interaction.respond(response.data);
            })
            .catch(error => {})
    }
}