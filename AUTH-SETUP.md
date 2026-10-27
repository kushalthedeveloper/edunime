# Enable real Edunime email verification

The account page now contains a Firebase Authentication integration. It will **not send verification or password-reset emails until you connect a Firebase project**. Do not put service-account keys or private credentials in this repository.

## Setup

1. Open https://console.firebase.google.com/ and create a Firebase project (or select one you own).
2. In **Project settings → General → Your apps**, add a Web app and copy its Firebase web configuration.
3. Edit `firebase-config.js` and replace each `YOUR_...` placeholder with the matching value from that web configuration. The web config is intended to be public; never paste a service-account private key here.
4. In **Build → Authentication → Get started → Sign-in method**, enable **Email/Password**.
5. In **Authentication → Settings → Authorized domains**, add `kushalthedeveloper.github.io` if it is not already listed.
6. In **Authentication → Templates**, review the email verification and password reset templates and sender settings.
7. Commit the updated `firebase-config.js` to the `main` branch and wait for GitHub Pages to deploy.
8. Open https://kushalthedeveloper.github.io/edunime/account.html and test account creation using an email address you control. Open the verification link from your inbox, then sign in.

## What the account page does after configuration

- Creates accounts through Firebase Authentication and sends the email-verification link.
- Blocks normal sign-in until the email is verified.
- Resends verification links for the signed-in account (the form asks you to sign in if needed).
- Requests password-reset email using the entered address.

If you want me to finish the project-specific configuration, provide the **Firebase web app config** (the public config object only, not any private key). Until then, the page deliberately shows setup-required messages instead of pretending verification emails are being sent.
