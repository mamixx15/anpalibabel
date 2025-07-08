const axios = require("axios");

module.exports = (app) => {
  async function bluearchive() {
    try {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/rynxzyy/blue-archive-r-img/refs/heads/main/links.json"
      );
      const imageUrl = data[Math.floor(data.length * Math.random())];
      const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
      return Buffer.from(response.data);
    } catch (error) {
      throw error;
    }
  }

  app.get("/random/ba", async (req, res) => {
    try {
      const imageBuffer = await bluearchive();
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": imageBuffer.length,
      });
      res.end(imageBuffer);
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message || "Failed to fetch Blue Archive image",
      });
    }
  });
};
