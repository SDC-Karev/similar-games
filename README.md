# similar-games
Similar/Related Games component
## API 
### CREATE
* Use app.post('/api/relatedGames') to post a new game. Make sue the req body follows the naming conventions in the schema
### READ
* Use app.get('/api/getGameByID/:gameID') to return a game with a given ID
* Use app.get('/api/getGamesBySeries/:seriesID') to return games within a given series
* Use app.get('/api/getGamesByTags/:gameID/:tagString') to return games with a given tag
### UPDATE
* Use app.put('/api/relatedGames') to update a game. The request should have 2 items, an ID to update, and a "games" obj with the proper fields.
### DELETE
* Use app.delete('/api/relatedGames') to delete a game with the requested ID.
