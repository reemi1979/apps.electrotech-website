

changer le homepage folder si requis dans package.json
  "homepage": "/testNewApp/"

cd client

npm run build

aws s3 sync build/ s3://electrotech.ca-website/testNewApp --delete

aws cloudfront create-invalidation --distribution-id E37B7WK0QXYY20 --paths "/testNewApp/*"
