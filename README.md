# omnisend-tag-manager
Shopify -> Omnisend "proxy" - managing contact tags based on current Shopify user language

- The frontend code should be injected to theme.liquid Shopify file
- The Express server expects "API_KEY" variable in environment (process.env.API_KEY)
- An "omnisend-form" HTML id needs to be added to all Omnisend forms that need to use this approach
- The application uses Weglot.getCurrentLang() to determined the currently selected language
