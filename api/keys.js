import dotEnv from 'dotenv'
dotEnv.config()
export const keys={
    "type": process.env.GOOGLE_ACCOUNT_TYPE ,
    "project_id": process.env.GOOGLE_PROJECT_ID,
    "private_key_id": process.env.GOOGLE_PRIVATE_KEY_ID,
    "private_key": process.env.GOOGLE_PRIVATE_KEY,
    "client_email": process.env.GOOGLE_CLIENT_EMAIL_ID,
    "client_id": process.env.GOOGLE_CLIENT_ID ,
    "auth_uri": process.env.GOOGLE_AUTH_URI ,
    "token_uri": process.env.TOKEN_URI ,
    "auth_provider_x509_cert_url":process.env.AUTH_PROVIDER_URL ,
    "client_x509_cert_url": process.env.CLIENT_URL ,
    "universe_domain": process.env.UNIVERSE_DOMAIN
  }









