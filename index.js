const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Simpan daftar produk (bisa kamu edit sesuai kebutuhan)
const produk = [
    { id: 1, nama: "Akun Mobile Legends Rank Mythic", harga: 150000 },
    { id: 2, nama: "Akun Free Fire Bundle Lengkap", harga: 100000 },
    { id: 3, nama: "Akun PUBG Global Rare Skin", harga: 200000 }
];

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
    console.log("✅ Bot sudah online!");
});

client.on("message", msg => {
    const text = msg.body.toLowerCase();

    // Menu utama
    if (text === "menu") {
        msg.reply(
            "🤖 *Bot Interaktif + Jual Beli*\n\n" +
            "1️⃣ halo → sapaan\n" +
            "2️⃣ tebak angka → main tebak angka\n" +
            "3️⃣ suit → main suit (batu/gunting/kertas)\n" +
            "4️⃣ quiz → kuis pengetahuan\n" +
            "5️⃣ produk → lihat daftar akun game\n" +
            "6️⃣ beli <id produk> → order akun\n"
        );
    }

    // Sapaan
    else if (text === "halo") {
        msg.reply("Hai juga! 👋 Senang ngobrol sama kamu.");
    }

    // Game: Tebak Angka
    else if (text.startsWith("tebak angka")) {
        let random = Math.floor(Math.random() * 10) + 1;
        msg.reply(`🎲 Aku sudah pilih angka 1-10. Tebak dong!`);
        setTimeout(() => {
            msg.reply(`Jawabannya adalah: *${random}* 😁`);
        }, 8000);
    }

    // Game: Suit
    else if (text.startsWith("suit")) {
        const pilihan = ["batu", "gunting", "kertas"];
        let botChoice = pilihan[Math.floor(Math.random() * 3)];
        msg.reply(`Aku pilih: *${botChoice}* ✊✌️🖐️`);
    }

    // Game: Quiz
    else if (text === "quiz") {
        msg.reply("❓ Pertanyaan: Ibukota Indonesia apa?");
        setTimeout(() => {
            msg.reply("Jawaban: *Jakarta* 🏙️");
        }, 10000);
    }

    // Daftar Produk
    else if (text === "produk") {
        let daftar = "📦 *Daftar Akun Game*\n\n";
        produk.forEach(p => {
            daftar += `${p.id}. ${p.nama} - Rp${p.harga}\n`;
        });
        daftar += "\n👉 Untuk beli, ketik: *beli <id>*\nContoh: beli 1";
        msg.reply(daftar);
    }

    // Beli Produk
    else if (text.startsWith("beli")) {
        const args = text.split(" ");
        if (args.length < 2) {
            msg.reply("⚠️ Format salah. Ketik: *beli <id produk>*");
            return;
        }
        const idProduk = parseInt(args[1]);
        const item = produk.find(p => p.id === idProduk);

        if (!item) {
            msg.reply("❌ Produk tidak ditemukan!");
        } else {
            msg.reply(
                `🛒 *Detail Pesanan*\n\n` +
                `Produk: ${item.nama}\n` +
                `Harga: Rp${item.harga}\n\n` +
                `👉 Untuk melanjutkan order, silakan transfer ke rekening/ewallet berikut:\n` +
                `Dana: 08xxxxxxxxxx\n` +
                `Setelah transfer, kirim bukti pembayaran ke admin.\n\n` +
                `Terima kasih! 🙏`
            );
        }
    }
});

client.initialize();
