const express = require('express');
const { Telegraf } = require('telegraf');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bot = new Telegraf('YOUR_BOT_TOKEN'); // Замени на свой токен

// Подключение к MongoDB
mongoose.connect('mongodb://localhost/storygame', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Модель для сохранения прогресса
const progressSchema = new mongoose.Schema({
    userId: String,
    storyId: String,
    sceneId: String,
    dialogueIndexInScene: Number,
    energy: Number
});
const Progress = mongoose.model('Progress', progressSchema);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Папка с игрой (index.html, GameScene.js, и т.д.)

// Сохранение прогресса
app.post('/save', async (req, res) => {
    try {
        const { userId, storyId, sceneId, dialogueIndexInScene, energy } = req.body;
        await Progress.findOneAndUpdate(
            { userId, storyId },
            { sceneId, dialogueIndexInScene, energy },
            { upsert: true }
        );
        res.status(200).send('Progress saved');
    } catch (error) {
        res.status(500).send('Error saving progress');
    }
});

// Загрузка прогресса
app.get('/load', async (req, res) => {
    try {
        const { userId } = req.query;
        const progress = await Progress.findOne({ userId });
        if (!progress) {
            return res.json({ sceneId: 'scene1', dialogueIndexInScene: 0, energy: 100 });
        }
        res.json(progress);
    } catch (error) {
        res.status(500).send('Error loading progress');
    }
});

// Настройка бота
bot.start((ctx) => {
    ctx.reply('Welcome to Story Game!', {
        reply_markup: {
            inline_keyboard: [[
                { text: 'Play Game', web_app: { url: 'https://your-game-host.com' } }
            ]]
        }
    });
});

// Обработка callback-запросов
bot.on('callback_query', (ctx) => {
    ctx.answerCbQuery();
    ctx.replyWithGame('StoryGame');
});

// Запуск бота
bot.launch().then(() => console.log('Bot started'));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));