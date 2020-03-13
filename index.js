const express = require('express');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/klow', async (req, res) => {
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
        'x-api-key':
          '5e6a23ca8a48f751fdd6a184-UxzNbzBp5r3Wcix48DVKqjKs89Z51tJWVzvB6B2TIsQi6tnLs0',
      },
      body: '{}',
    }),
  );

  const { contactID } = response.contacts[0];

  // TODO: Update the contact tag to the specified language
  const updateResponse = request({
    method: 'PATCH',
    url: `https://api.omnisend.com/v3/contacts/${contactID}`,
    headers: {
      'content-type': 'application/json',
      'x-api-key':
        '5e6a23ca8a48f751fdd6a184-UxzNbzBp5r3Wcix48DVKqjKs89Z51tJWVzvB6B2TIsQi6tnLs0',
    },
    body: { tags: [language] },
    json: true,
  });

  console.log(updateResponse);
  res.json(updateResponse);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
