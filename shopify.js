window.addEventListener('load', () => {
  console.log('to');
  const subscribeForms = document.querySelectorAll('#omnisend-form');

  function handleSubmit(event) {
    console.log('hs');
    const emailInput = event.target.querySelector('input[type="email"]');
    const { value: email } = emailInput;
    const language = Weglot.getCurrentLang();
    fetch('https://969f77dd.ngrok.io/updateTags', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        language,
      }),
    })
      .then((data) => data.json())
      .then(console.log);
  }

  subscribeForms.forEach((form) => {
    form.addEventListener('submit', handleSubmit);
  });
});
