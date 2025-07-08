const axios = require('axios');

module.exports = function (app) {
  async function fetchContent(content) {
    try {
      const response = await axios.post('https://luminai.my.id/', { content });
      return response.data;
    } catch (error) {
      console.error('Error fetching content from LuminAI:', error?.response?.data || error.message);
      throw error;
    }
  }

  app.get('/ai/luminai', async (req, res) => {
    const { text } = req.query;
    if (typeof text !== 'string' || text.trim() === '') {
      return res.status(400).json({ status: false, error: 'Text is required' });
    }

    try {
      const response = await fetchContent(text);
      const result = response.result || response;
      res.json({ status: true, result });
    } catch (error) {
      res.status(500).json({ status: false, error: error?.message || 'Internal Server Error' });
    }
  });
};
