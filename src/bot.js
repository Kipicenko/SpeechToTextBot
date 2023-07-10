import 'dotenv/config'
import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
import {initializeCollectionsCommand} from "./commands/index.js"
import {isTimeoutPassed} from "./utils/is-timeout-passed.js"
import {accessServers} from "./accesses.js"
import {failedEmbed} from "./embeds.js"

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();
client.cooldowns = new Collection();
initializeCollectionsCommand(client)
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});
// client.on(Events.MessageCreate, (message) => {
//     if (message.author.bot) return
//     if (message.content[0] === '!') message.channel.send('Ready')
// })

client.on(Events.InteractionCreate, async interaction => {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    if (!interaction.isChatInputCommand()) return;

    if (!interaction.guildId && interaction.commandName === "stt") {
        const locales = {
            ru: 'Команда работает только на серверах'
        }
        failedEmbed.setDescription(locales[interaction.locale] ?? 'The command only works on servers')
        return interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
    }

    if (!accessServers.includes(interaction.guildId) && interaction.commandName === "stt") {

        const locales = {
            ru: 'Нет доступа'
        }

        failedEmbed.setDescription(locales[interaction.locale] ?? 'No access')
        return interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
    }

    const checkTimeout = isTimeoutPassed(client, interaction)
    if (checkTimeout) {

        const locales = {
            ru: `Тайм-аут команды - ${Math.round(checkTimeout / 1000)}s`
        }

        failedEmbed.setDescription(locales[interaction.locale] ?? `Command timeout - ${Math.round(checkTimeout / 1000)}s`)
        return interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        const locales = {
            ru: 'При выполнении этой команды произошла ошибка!'
        }

        failedEmbed.setDescription(locales[interaction.locale] ?? 'There was an error while executing this command!')
        if (interaction.replied || interaction.deferred) {
            interaction.followUp({ ephemeral: true, embeds: [failedEmbed] });
        } else {
            interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
        }
    }
});

client.login(process.env.BOT_TOKEN)
