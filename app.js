console.log("Hello World")

const express = require('express')

var axios = require('axios');



const app = express()

app.get('/data',async function(req, res) {
    const da = await axios.get('https://workshop-backend-t22.herokuapp.com/')
    console.log(da.data)
    res.json(da.data)
})



const songs = [
    {
        id: 1,
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
    },
    {
        id: 2,
        title: 'First Times',
        artist: 'Ed Sheeran',
    },
    {
        id: 3,
        title: 'Into The Unknown',
        artist: 'Unknown',
    },
    {
        id: 4,
        title: 'Perfect',
        artist: 'Ed Sheeran',
    },
    {
        id: 5,
        title: 'Pay Phone',
        artist: 'Maroon 5',
    },
]


//MIDDLEWARE
app.use((req,res,next) => {
    console.log(new Date().toJSON())
    req.songs=songs
    next()
})


app.use(express.json())


//STARTUP
app.listen(3000,()=>{
    console.log('listening on port 3000')
})

//Controllers

//gets
const {getTitles,getArtists}= require('./controllers/titles');
const { Router } = require('express');

app.get('/titles',getTitles)

app.get('/artists',getArtists)


app.get('/songs',(req,res)=>{
    const hello= songs.filter(song => song.artist==req.query.artist)
    res.json(hello)
})


app.get('/songs/:id',(req,res)=>{
    const reply=songs.filter(song => song.id==req.params.id)
    res.json(reply)
})

app.get('/',(req,res)=>{
    res.json(songs)
})

//posts

app.post('/songs',(req,res)=>{
    console.log(req.body)
    songs.push(req.body)
    res.sendStatus(201)}
)



//patch

app.patch('/songs/:id',(req,res)=>{
    for (let s of songs){
        if (s.id == req.params.id){
            s.artist = req.body.artist
            break
        }
    }
    res.sendStatus(200)
})

//delete

app.delete('/songs/:id',(req,res)=>{
    for (let s in songs){
        if (songs[s].id ==req.params.id){
            songs.splice(s)
            break
        }
    }

    res.sendStatus(200)
})