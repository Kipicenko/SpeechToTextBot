import {SlashCommandBuilder} from "discord.js";
import {helpEmbed} from "../../embeds.js"

export const helpCommandBuilder = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescriptionLocalizations({
            ru: 'Инструкция о том, как начать пользоваться ботом',
        })
        .setDescription('Instruction on how to start using the bot'),
    async execute(interaction) {
        const localesTitle = {
            ru: 'Инструкция'
        }
        const localesDescription = {
            ru: `
             Для начала, чтобы использовать бота, необходимо включить режим разработчика в Discord. 
Это позволит вам копировать id сообщений. Чтобы включить режим разработчика, выполните следующие шаги:

1. Зайти в **"Настройки пользователя"**.
2. Перейти на вкладку **"Расширенные"**.
3. Включите **"Режим разработчика"**.

После того, как вы включили **"Режим разработчика"**, теперь вы можете использовать бота.
Введите команду \`/stt message-id visible-only-for-me\`, где:

- \`message-id\` - это id конкретного сообщения.
- \`visible-only-for-me\` - это настройка определяет, будет ли расшифровка голосового сообщения отображаться только для вас.
            `
        }
        helpEmbed.setTitle(localesTitle[interaction.locale] ?? 'Instruction')
        helpEmbed.setDescription(localesDescription[interaction.locale] ?? `
        To begin using the bot, you need to enable developer mode in Discord. This will allow you to copy message id. Follow these steps to enable developer mode:

1. Go to **"User Settings"**.
2. Navigate to the **"Advanced"** tab.
3. Enable **"Developer Mode"**.

Once you have enabled **"Developer Mode"**, you can now use the bot. Enter the command \`/stt message-id visible-only-for-me\`, where:

- \`message-id\` - is the ID of a specific message.
- \`visible-only-for-me\` - is a setting that determines whether the transcription of a voice message will be visible only to you.
        `)
        console.log(interaction.user.username, "using help")
        interaction.reply({ ephemeral: true, embeds: [helpEmbed] })
    }
}