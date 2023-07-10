
export function isTimeoutPassed(client, interaction) {
    const now = Date.now()
    const getTimeUser = client.cooldowns.get(`${interaction.commandName}_${interaction.user.id}`) || 0
    if (now - getTimeUser < 0) return getTimeUser - now
    else client.cooldowns.set(`${interaction.commandName}_${interaction.user.id}`, now + 15000)
    setTimeout(() => client.cooldowns.delete(`${interaction.commandName}_${interaction.user.id}`),15000)
    return 0
}