const aiService = require('../services/aiService');

async function postChat(req, res, next) {
  try {
    const { message } = req.body ?? {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'message is required' });
    }

    const reply = await aiService.generateReply(message);
    return res.json({ reply });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  postChat,
};

