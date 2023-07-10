import {speechToTextCommandBuilder} from "./speech-to-text/index.js"
import {helpCommandBuilder} from "./help/index.js"

const commands = [
    speechToTextCommandBuilder,
    helpCommandBuilder
]

export function initializeCollectionsCommand(client) {
    commands.forEach(command => {
        client.commands.set(command.data.name, command)
    })
}

export function getDeployCommands() {
    return commands.map(command => command.data.toJSON())
}