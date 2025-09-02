currentBranch=$(git branch --show-current);
echo "Current Branch: $currentBranch";

if [ $currentBranch != "main" ]
then
    echo "Invalid branch checked out for this deployment"
    exit 2;
fi
git fetch
local=$(git rev-parse $currentBranch);
remote=$(git rev-parse origin/$currentBranch);
echo "Local: $local";
echo "Remote: $remote";
if [ $local != $remote ]
then
    echo "Make sure your local branch that has been selected for deployment is the same as the remote branch."
    exit 2;
fi
cp envs/.env.prod .env
npm install
npm run build
aws s3 sync  --profile mojo-app ./out s3://mojo-frontend-app
aws cloudfront create-invalidation --profile mojo-app --distribution-id E2QQH2CT4EYCFD --paths "/*"
# cp envs/.env.local .env