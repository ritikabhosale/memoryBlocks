read -p "Enter players name: " playerName

node ./resources/setUp.js $playerName

gameStatus=$( grep "isGameOver" ./resources/data.json | grep "false" )

while [[ $gameStatus ]]
do
    read -p "Enter your pick: " pickOfPlayer
    node ./library/webpageGeneration.js $pickOfPlayer
    open index.html
    
    gameStatus=$( cat resources/data.json | grep "isGameOver" | grep "false" )
done

open index.html
rm -r resources/data.json