const Discord = require('discord.js');
const axios = require('axios');
const fs = require('fs');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const { Client, GatewayIntentBits, EmbedBuilder, WebhookClient } = require('discord.js');
const { join } = require('path');

const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const terminalSize = process.stdout.columns;

function centerText(text, width, char = ' ') {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return char.repeat(padding) + text + char.repeat(padding);
}

const border = "━".repeat(terminalSize);
console.log(centerText(border, terminalSize));
console.log(centerText("____                 _____     _                 _   ", terminalSize))
console.log(centerText("|    \\ ___ ___ _ _   |   | |___| |_ _ _ _ ___ ___| |_ ", terminalSize))
console.log(centerText("|  |  |  _| -_|_'_|  | | | | -_|  _| | | | . |  _| '_|", terminalSize))
console.log(centerText("|____/|_| |___|_,_|  |_|___|___|_| |_____|___|_| |_,_|", terminalSize))
console.log("\n")
console.log(centerText(border, terminalSize));

const discord = "This bot is powered by discord.gg/nC7PtBzE23"
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}`);
});

const FILEPATH = __dirname+'/Auths.json';
const AUTHLIST = JSON.parse(fs.readFileSync(FILEPATH, 'utf8'));

function getRandomProxy() {
    const proxies = fs.readFileSync('proxy.txt', 'utf8').split('\n');
    return proxies[Math.floor(Math.random() * proxies.length)];
}

bot.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith('-say')) {
        const args = message.content.slice('-say'.length).trim();
        bot.commands.get('say').execute(message, args);
    }

    if (message.content.startsWith('-join')) {
        const args = message.content.slice('-join'.length).trim();
        bot.commands.get('join').execute(message, args);
    }
});

bot.commands = new Discord.Collection();

bot.commands.set('say', {
    execute: async (message, args) => {
        await message.channel.send(args);
    },
});

bot.commands.set('join', {
    execute: async (message, args) => {
        if (AUTHLIST === "{}") {
            const embed = new EmbedBuilder()
            .setTitle('Error')
            .setColor(0xa93cbe)
            .setDescription(`The bot is out of auths please wait till restock`)
            .setFooter({ text: discord, iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
        const sentMessage = await message.channel.send({ embeds: [embed] });
        }

        const guildId = args;
        const guild = bot.guilds.cache.get(guildId);

        if (!guild) {
            const embed = new EmbedBuilder()
                .setTitle('Error')
                .setColor(0xa93cbe)
                .setDescription('The guild id you have entered is wrong. Please make sure you have looked in #bot-add-template-by-obaq!')
                .setFooter({ text: discord, iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
            const sentMessage = await message.channel.send({ embeds: [embed] });
            return;
        }

        const roleInviteMapping = {
            '1193238781030039632': 5,
            '1193286261776076901': 10,
        };

        const defaultAmount = 1;
        let amount = defaultAmount;

        for (const [roleId, invites] of Object.entries(roleInviteMapping)) {
            if (message.member.roles.cache.has(roleId)) {
                amount = invites;
            }
        }

        const embed = new EmbedBuilder()
            .setTitle('[+] Joining Server')
            .setColor(0xa93cbe)
            .setDescription(`0/${amount}`)
            .setFooter({ text: discord, iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
        const sentMessage = await message.channel.send({ embeds: [embed] });
        const joinedCount = 0;

        for (let i = 0; i < amount; i++) {
            if (AUTHLIST.length === 0) {
            const embed = new EmbedBuilder()
            .setTitle('Error')
            .setColor(0xa93cbe)
            .setDescription(`The bot is out of auths please wait till restock`)
            .setFooter({ text: discord, iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
            const sentMessage = await message.channel.send({ embeds: [embed] });
            }

            await authJoiner(message, guildId);
            const joinned = 0
            const joinned2 = joinned + 1

            const embed = new EmbedBuilder()
                .setTitle('[+] Joining Server')
                .setColor(0xa93cbe)
                .setDescription(`${joinned2}/${amount}`)
                .setFooter({ text: discord, iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
            const sentMessage = await message.channel.edit({ embeds: [embed] });
        }
    },
});

async function authJoiner(message, auth, guildId) {
    try {
        const response = await axios.put(
            `https://discord.com/api/guilds/${guildId}/members/${auth.id}`,
            {
                access_token: auth.access_token,
            },
            {
                headers: {
                    Authorization: `Bot ${TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.status === 400) {
            if (response.data.message === 'This account is currently quarantined.') {
                console.log('a');
            }
        } else if (response.status === 429) {
            const embed = new EmbedBuilder()
                .setTitle('Error')
                .setColor(0xa93cbe)
                .setDescription('The Bot is being rate-limited. This could be a proxy issue... Retrying in '+response.data.retry_after)
                .setFooter({ text: 'This bot is powered by discord.gg/9Bh2RftUuz', iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
            const sentMessage = await message.edit({ embeds: [embed] });

            await new Promise((resolve) => setTimeout(resolve, response.data.retry_after));
            await authJoiner(message, auth, guildId);
        } else if (response.status === 201 && response.data !== '') {

        } else if (response.data === '') {

        } else {

        }
    } catch (e) {
        const webhook = new WebhookClient({id: "WEBHOOK ID", token: "WEBHOOK TOKEN"});
        const embed = new EmbedBuilder()
            .setTitle('Error')
            .setColor(0xa93cbe)
            .setDescription(`A account was banned while joining `)
            .setFooter({ text: 'This bot is powered by discord.gg/9Bh2RftUuz', iconURL: 'https://cdn.discordapp.com/attachments/1197674199301505146/1198744692871934106/0246af440a06c487c68ce1a381b9f3c2.jpg?ex=65c004fe&is=65ad8ffe&hm=f22c96dfc3a9ff3f3362306131b351542b1ca8eb5bbbb4c380e2c3b54a507a32&' });
        await webhook.send({ embeds: [embed] });
    }
}

bot.login("BOT TOKEN");
