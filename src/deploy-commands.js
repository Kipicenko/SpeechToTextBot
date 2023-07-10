import 'dotenv/config'
import {REST, Routes} from "discord.js"
import {getDeployCommands} from "./commands/index.js"

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
async function deploy() {
    try {
        console.log(`Started refreshing application (/) commands.`);

        const data = await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: getDeployCommands() },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}

deploy()