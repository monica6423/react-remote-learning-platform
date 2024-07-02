import express from 'express';
import weaviate, {  ApiKey } from 'weaviate-ts-client';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    let headers = {};
    if (process.env.OPENAI_API_KEY) {
      headers['X-OpenAI-Api-Key'] = process.env.OPENAI_API_KEY;
    }

    const client = weaviate.client({
      scheme: 'https',
      host: 'learnings-5eccyh8l.weaviate.network',
      apiKey: new ApiKey(process.env.WEAVIATE_API_KEY), //READONLY API Key, ensure the environment variable is an Admin key to support writing
      headers: headers,
    });


    const nearText = {
      concepts: query || [],
      certainty: 0.6,
    };
  
    let recDataBuilder = client.graphql
      .get()
      .withClassName('Book')
      .withFields(
        'title isbn10 isbn13 categories thumbnail description num_pages average_rating published_year authors'
      )
      .withNearText(nearText)
      .withLimit(20);

    const recData = await recDataBuilder.do();
    console.log("test", JSON.stringify(recData, null, 2))
    res.status(200).json(recData);

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});

export default router;
