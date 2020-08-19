echo ""
echo "Setting up \"Similar Games\" Component for Steam FEC"
echo ""

echo ""
echo "  Working on correct/up-to-date branch"
git checkout master
git pull origin master

echo ""
echo "  Installing Dependancies"
npm i

echo ""
echo "  Building Webpack"
npm run-script build

echo ""
echo "  Configuring database"
sqlExecute=$(<./server/schema.sql)
echo "  Enter Database Info"
read -p "Enter database username: " username
read -p "Enter database password: " password
# echo "mysql -u $username -p $password -e $sqlExecute"
mysql --user=$username --password=$password --execute="$sqlExecute"
echo "
  module.exports = {
    connectionLimit: 10,
    user: '$username',
    password: '$password',
    database: 'similarGames',
    host: 'localhost',
  }
" > ./server/config.js

npm run seed
echo "Configuration Complete!"
