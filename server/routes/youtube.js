const express = require('express');
const { searchVideo } = require('../youtube_api/youtube');

const router = express.Router();

router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const results = await searchVideo(q);
        const response = results.filter(result => result.id.kind === 'youtube#video').map((result) => ({
            id: result.id.videoId,
            name: result.snippet.title,
            description: result.snippet.description,
            coverImage: result.snippet.thumbnails.default.url,
        }));
        res.send(response);
    } catch (err) {
        res.status(500).send(err);
    }
});


module.exports = router;
