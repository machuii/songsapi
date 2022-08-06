

function getTitles(req,res){
    const titles= req.songs.map(song => song.title)
    res.json(titles)
}

function getArtists(req,res){
    const artists= req.songs.map(song => song.artist)
    const uniqeArtists = new Set(artists)
    const misc =[...uniqeArtists]
    res.json(misc)
}

module.exports ={ getTitles , getArtists }

