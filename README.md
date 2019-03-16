# bullet_fe

## Bullet Journal
Tasks, Notes, or Events in a kanban board style on top of a Calendar.

Built with Node.js, Vuejs / Vue CLI, and deployment with Heroku.


### Project setup
```
yarn install
```

```
heroku git:remote -a bulletjournalapp
```


### Development
##### Local Server with Hot Reload
```
npm run serve
```

##### Local Server with Express (For testing production server)
```
npm run start
```


### Deploy to Production
```
heroku git:remote -a bulletjournalapp
```
```
heroku login
```
```
git push heroku master
```

##### Production Address
```
https://bulletjournalapp.herokuapp.com/
```



<!-- ### Run your tests
```
yarn run test
``` -->

### Lints and fixes files
```
yarn run lint
```