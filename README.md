<div align="center"><img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=32&pause=1000&color=A855F7&center=true&vCenter=true&width=650&lines=%40noverojava%2Fbaileys;Created+by+ItsNovero;WhatsApp+Baileys+%2B+Node.js" alt="noverojava typing banner" /><br/><img src="https://files.catbox.moe/q319ab.png" width="150" alt="ItsNovero Logo" />

# noverojava

A powerful WebSockets library for interacting with WhatsApp Web — maintained by ItsNovero.

Built on top of Baileys and enhanced with additional utilities, helpers, safety controls, and modern WhatsApp Web features.

[![npm version](https://img.shields.io/npm/v/%40noverojava%2Fbaileys?color=a855f7&label=npm)](https://www.npmjs.com/package/noverojava)
[![npm downloads](https://img.shields.io/npm/dt/%40noverojava%2Fbaileys?color=blue)](https://www.npmjs.com/package/noverojava)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)](package.json)
[![Made with](https://img.shields.io/badge/made%20with-%E2%9D%A4-red)](#credits)

<br/>Fast • Modern • Powerful • Extensible

</div>

---

> 📖 **New here?** Check [LITERACY.md](LITERACY.md) for a deeper explanation of the architecture and modules.

[Installation](#getting-started) • [Documentation](#sendmessage-documentation) • [Features](#main-features) • [Telegram Owner](https://t.me/ItsNovero) • [Channel](https://t.me/mekslosu)

<a name="main-features"></a>

## ✨ Features

- 🔗 WhatsApp Multi-Device support
- 📱 QR Code & Pairing Code login
- 🏢 WhatsApp & WhatsApp Business support
- 📢 Channel / Newsletter utilities
- 🛡️ Optional send safety controls
- 📊 ACK monitoring
- 🤖 AI watermark support
- 🧩 Extended socket utilities
- 📦 SQLite authentication state
- 🖼️ Sticker & media helpers
- ⚡ Performance optimizations
- 💾 Memory and cache controls

---

<a name="getting-started"></a>

## 📦 Installation

Install using npm:

    npm install noverojava

Or using Yarn:

    yarn add noverojava

Or pnpm:

    pnpm add noverojava

---

## 🚀 Quick Start

    import makeWASocket from 'noverojava';

    const sock = makeWASocket({
        printQRInTerminal: true
    });

    sock.ev.on('connection.update', (update) => {
        console.log('Connection Update:', update);
    });

    sock.ev.on('messages.upsert', ({ messages }) => {
        const message = messages[0];

        console.log('New Message:', message);
    });

---

## 🔐 Connecting to WhatsApp

### 📱 QR Code

    import makeWASocket, {
        Browsers
    } from 'noverojava';

    const sock = makeWASocket({
        browser: Browsers.itsnovero('Chrome'),
        printQRInTerminal: true
    });

---

### 🔢 Pairing Code

    import makeWASocket, {
        fetchLatestWAWebVersion,
        Browsers
    } from 'noverojava';

    const sock = makeWASocket({
        browser: Browsers.itsnovero('Chrome'),
        printQRInTerminal: false,
        version: (await fetchLatestWAWebVersion()).version
    });

    const number = '628XXXXXXXXXX';

    const code = await sock.requestPairingCode(
        number.trim()
    );

    console.log('Your Pairing Code:', code);

---

## 📢 WhatsApp Channels

Get a channel JID from an invite link:

    import {
        extractNewsletterInviteCode
    } from 'noverojava';

    const link =
        'https://whatsapp.com/channel/0029VaXXXXXXXXXXXXXXXX';

    const code =
        extractNewsletterInviteCode(link);

    const metadata =
        await sock.newsletterMetadata(
            'invite',
            code
        );

    console.log(metadata.id);

    // Example:
    // 120363012345678901@newsletter

---

## 🛡️ Channel Follow Protection

`noverojava` can help protect against unexpected channel-follow calls from third-party scripts.

    const sock = makeWASocket({
        blockAutoFollowChannels: true
    });

Check blocked attempts:

    console.log(
        sock.getBlockedChannelFollows()
    );

Allow trusted channels:

    const sock = makeWASocket({
        allowedFollowChannels: [
            '123456789012345@newsletter'
        ]
    });

Disable the protection:

    const sock = makeWASocket({
        blockAutoFollowChannels: false
    });

---

## 👥 Group Join Protection

Prevent unexpected scripts from automatically joining groups.

    const sock = makeWASocket({
        blockAutoJoinGroups: true,

        allowedAutoJoinGroups: [
            'ABCDEF123456'
        ]
    });

Check blocked joins:

    console.log(
        sock.getBlockedGroupJoins()
    );

---

## 💬 Unknown Recipient Protection

Flag messages sent to new recipients:

    const sock = makeWASocket({
        blockUnknownRecipients: false
    });

Check flagged recipients:

    console.log(
        sock.getFlaggedRecipients()
    );

Block unknown recipients completely:

    const sock = makeWASocket({
        blockUnknownRecipients: true,

        allowedRecipients: [
            '6281234567890@s.whatsapp.net'
        ]
    });

---

## 🛡️ AntiBanned

Optional send throttling for new accounts.

    const sock = makeWASocket({
        antiBanned: {
            enabled: true,

            warmUpDays: 7,

            day1Limit: 20,

            growthFactor: 1.8,

            action: 'delay'
        }
    });

Check status:

    console.log(
        sock.getAntiBannedStatus()
    );

Save the state:

    const state =
        sock.exportAntiBannedState();

---

## ⚡ AntiBan

Advanced optional safety controls for message sending.

    const sock = makeWASocket({
        antiban: 'moderate'
    });

Available presets:

| Preset | Speed | Recommended |
|---|---|---|
| `conservative` | Slow | New accounts |
| `moderate` | Balanced | Most bots |
| `aggressive` | Fast | High traffic |

Check statistics:

    console.log(
        sock.antiban.getStats()
    );

Disable:

    const sock = makeWASocket({
        antiban: false
    });

---

## 🤖 AI Watermark

Enable an AI label for supported button messages.

    const sock = makeWASocket({
        aiWatermark: true
    });

    await sock.sendMessage(
        jid,
        {
            text: 'Choose an option',

            footer:
                'Powered by noverojava',

            buttons: [
                {
                    buttonId: 'option1',

                    buttonText: {
                        displayText:
                            'Option 1'
                    },

                    type: 1
                }
            ]
        }
    );

---

## 📊 ACK Monitor

Monitor WhatsApp message acknowledgements.

    const sock = makeWASocket({
        ackMonitor: true,

        ackMonitorCooldownMs:
            60000
    });

Example output:

    [noverojava-baileys] ACK Monitor:
    Rate-limited / Limit

    Recipient:
    6281234567890@s.whatsapp.net

---

## ⚙️ Performance

The library includes performance improvements such as:

- Limited cache sizes
- Message retry cache limits
- Memory protection
- Guard log limits
- Lazy-loaded optional dependencies
- Optimized media processing
- Reduced unnecessary resource usage

---

## 🔥 optiMazer

Enable tighter cache limits and resource monitoring.

    const sock = makeWASocket({
        optiMazer: true
    });

Check optimizer statistics:

    console.log(
        sock.getOptimizerStats()
    );

Custom configuration:

    const sock = makeWASocket({
        optiMazer: {
            userDevicesCacheMaxKeys: 500,

            tickIntervalMs: 30000
        }
    });

---

## 📱 WhatsApp Status

Send a WhatsApp Status with mentions.

    await sock.sendStatusWhatsApp(
        {
            text:
                'Big announcement! 🎉',

            backgroundColor:
                '#00A884'
        },

        [
            '6281234567890@s.whatsapp.net'
        ]
    );

---

## 💾 SQLite Auth State

Store authentication data in a SQLite database.

    import makeWASocket, {
        useSqliteAuthState
    } from 'noverojava';

    const {
        state,
        saveCreds
    } =
    await useSqliteAuthState(
        './auth'
    );

    const sock =
        makeWASocket({
            auth: state
        });

    sock.ev.on(
        'creds.update',
        saveCreds
    );

---

## 🗂️ In-Memory Store

    import makeWASocket, {
        makeInMemoryStore
    } from 'noverojava';

    import pino from 'pino';

    const store =
        makeInMemoryStore({
            logger:
                pino().child({
                    level:
                        'silent'
                })
        });

    const sock =
        makeWASocket({
            printQRInTerminal:
                true
        });

    store.bind(
        sock.ev
    );

---

<a name="sendmessage-documentation"></a>

## 💬 Sending Messages

### Send Text

    await sock.sendMessage(
        jid,
        {
            text:
                'Hello World!'
        }
    );

### Send Image

    await sock.sendMessage(
        jid,
        {
            image: {
                url:
                    './image.jpg'
            },

            caption:
                'Hello!'
        }
    );

### Send Video

    await sock.sendMessage(
        jid,
        {
            video: {
                url:
                    './video.mp4'
            },

            caption:
                'Video Message'
        }
    );

### Send Audio

    await sock.sendMessage(
        jid,
        {
            audio: {
                url:
                    './audio.mp3'
            },

            mimetype:
                'audio/mpeg'
        }
    );

---

## 🧩 Utilities

`noverojava` provides additional utilities:

    import {
        createSessionPool,
        autoCacheViewOnceMedia,
        createCommandHandler,
        imageToWebpSticker,
        videoToWebpSticker,
        AdaptiveDelayManager
    } from 'noverojava';

Example command handler:

    sock.command(
        'ping',

        async (msg) => {
            await sock.sendMessage(
                msg.key.remoteJid,
                {
                    text:
                        'pong 🏓'
                }
            );
        }
    );

---

## 🖼️ Sticker Support

    import {
        imageToWebpSticker
    } from 'noverojava';

    const sticker =
        await imageToWebpSticker(
            './image.jpg'
        );

---

## 🔧 Requirements

| Requirement | Version |
|---|---|
| Node.js | `>=20` |
| npm | Latest |
| WhatsApp | Multi-Device |

For SQLite authentication:

    Node.js >=22.5

---

<a name="credits"></a>

## 📚 Credits

### Original Project

- Baileys
- WhiskeySockets Community
- Original protocol contributors

### Maintained & Modified By

**ItsNovero**

All credit for the original WhatsApp Web protocol implementation belongs to the original Baileys developers and contributors.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Test the project
5. Submit a Pull Request

Please read:

[CONTRIBUTING.md](CONTRIBUTING.md)

before submitting major changes.

---

## 📦 Publishing

Install dependencies:

    npm install

Build the project:

    npm run build

Publish:

    npm publish

---

## ⚠️ Disclaimer

`noverojava` is not an official WhatsApp product.

Using automated WhatsApp clients, bulk messaging, spam, or unsolicited messages may violate WhatsApp's Terms of Service and could result in account restrictions or bans.

Use this library responsibly.

---

<div align="center">

<img src="https://files.catbox.moe/q319ab.png" width="90" alt="ItsNovero Logo" />

**Made with ❤️ by ItsNovero**

**noverojava**

⭐ Star the repository if you find it useful.

</div>