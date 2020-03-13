const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const cors = require('cors');
const helmet = require('helmet');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { API_KEY } = process.env;

app.post('/updateTags', async (req, res) => {
  const { email, language } = req.body;

  // TODO: Get contact ID by email
  const response = JSON.parse(
    await request({
      method: 'GET',
      url: 'https://api.omnisend.com/v3/contacts',
      qs: {
        status: 'subscribed',
        email,
        limit: '1',
        offset: '0',
      },
      headers: {
        'x-api-key': API_KEY,
      },
      body: '{}',
    }),
  );

  let contactID;

  try {
    const [data] = response.contacts;
    ({ contactID } = data);
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }

  // TODO: Update the contact tag to the specified language
  const updateResponse = await request({
    method: 'PATCH',
    url: `https://api.omnisend.com/v3/contacts/${contactID}`,
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: { tags: [language] },
    json: true,
  });

  res.json(updateResponse);
});

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
