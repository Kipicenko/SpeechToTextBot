import {SlashCommandBuilder} from "discord.js"
import {failedEmbed} from "../../../embeds.js"
import {recognize} from "../../../utils/recognize.js";

export const speechToTextCommandBuilder = {
    data: new SlashCommandBuilder()
        .setName('stt')
        .setDescriptionLocalizations({
            ru: 'преобразование речи в текст',
        })
        .setDescription('speech to text')
        .addStringOption(option =>
            option.setName('message-id')
                .setDescriptionLocalizations({
                    ru: 'Введите id сообщения, в котором находится голосовое сообщение',
                })
                .setDescription('Enter the id of the message where the voice message is located')
                .setRequired(true)
                .setAutocomplete(true)
        )
        .addBooleanOption(option =>
            option.setName('visible-only-for-me')
                .setDescriptionLocalizations({
                    ru: 'Определяет, будет ли расшифровка голосового сообщения отображаться только для вас',
                })
                .setDescription('Determines whether the transcript of the voice message will be displayed only for you')
                .setRequired(true)
        ),
    async execute(interaction) {
        const messageId = interaction.options.get('message-id').value;
        const isVisibleOnlyForMe = interaction.options.get('visible-only-for-me').value;

        try {
            const message = await interaction.channel.messages.fetch(messageId)
            await recognize({ interaction, message, isVisibleOnlyForMe })
        } catch (err) {
            console.log(err)

            const locales = {
                ru: 'Сообщение не найдено'
            }

            console.log(interaction.user.username, locales.ru)
            failedEmbed.setDescription(locales[interaction.locale] ?? 'Message not found')
            interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
        }
    }
}