

changer le homepage folder si requis dans package.json
  "homepage": "/testNewApp/"


npm run build

npm run obfuscate

aws s3 sync build/ s3://electrotech.ca-website/testNewApp --delete --exclude "news/*"

aws cloudfront create-invalidation --distribution-id E37B7WK0QXYY20 --paths "/testNewApp/*"
