import {helpCommandBuilder} from "./slash-commands/help/index.js"
import {showMeTextBuilder, showEveryoneTextBuilder} from "./context-menu-commands/speech-to-text/index.js";
import {commandsCollection} from "../collections.js"

const commands = [
    showMeTextBuilder,
    showEveryoneTextBuilder,
    helpCommandBuilder
]

export function initializeCollectionsCommand() {
    commands.forEach(command => {
        commandsCollection.set(command.data.name, command)
    })
}

export function getDeployCommands() {
    return commands.map(command => command.data.toJSON())
}