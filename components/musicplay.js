Hashmap = {key:id , value: MusicObject}

@MusicObject example:
music1 = {
    id: 'avaritia', // Must be a string, required
    url: 'http://example.com/avaritia.mp3', // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402, // Duration in seconds
    bpm: 110,
    rate: 1,
};

@hashmap Object
all = {
    hashmap,
    size,
    [0,1,2, 4,5,]
}

Playlist:
All
    1
    2
    3
    4
    5
90bpm
    2
    3
    5

reader = nth

Select(Hashmap) => reader = Hashmap



normalplay => play from start of Playlist
    state [track, setTrack] = useState([])

    current_id = 0
    current_played = 0

    playfunction(id_val) {
        current_music_object = reader.get(current_id)
    setTrack( [current_music_object] )
    track.reset()
    track.add(track)
    track.play()
    track.getstate()

    play Pause
    end => nextbutton
    }
    

    nextbutton => {
        current_id +1
        if (reader.get(current_id) == null) {
            nextbutton
        } else {
            playfunction(current_id)
        }

        
    }

    play()
    .getcurrentplay => returns music Object


