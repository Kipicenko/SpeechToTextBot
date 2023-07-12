import 'dotenv/config'
import { Client, Events, GatewayIntentBits } from 'discord.js';
import {privateCommands, initializeCollectionsCommand} from "./commands/index.js"
import {accessServers} from "./accesses.js"
import {failedEmbed} from "./embeds.js"
import {commandsCollection} from "./collections.js";
import {deploy} from "./deploy-commands.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

initializeCollectionsCommand()

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// client.on(Events.MessageCreate, (message) => {
//     if (message.author.bot) return
//     if (message.content[0] === '!') message.channel.send('Ready')
// })

client.on(Events.GuildCreate,async guild => {
    await deploy(guild.id)
})

client.on(Events.InteractionCreate, async interaction => {
    const command = commandsCollection.get(interaction.commandName);

    if (!command) return;

    if (!interaction.isChatInputCommand() && !interaction.isMessageContextMenuCommand()) return;

    if (!accessServers.includes(interaction.guildId) && privateCommands.includes(interaction.commandName)) {

        const locales = {
            ru: 'Нет доступа'
        }

        console.log(interaction.user.username, locales.ru)
        failedEmbed.setDescription(locales[interaction.locale] ?? 'No access')
        return interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);

        const locales = {
            ru: 'При выполнении этой команды произошла ошибка!'
        }

        console.log(interaction.user.username, locales.ru)
        failedEmbed.setDescription(locales[interaction.locale] ?? 'There was an error while executing this command!')
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ ephemeral: true, embeds: [failedEmbed] });
        } else {
            await interaction.reply({ ephemeral: true, embeds: [failedEmbed] });
        }
    }
});

client.login(process.env.BOT_TOKEN)
