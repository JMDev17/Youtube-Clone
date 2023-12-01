const videoCardContainer = document.querySelector('.container-videos')

let api_key = 'AIzaSyDmChakW_KIHrVUegmcP86Mrxc0e8Gkaz8';
let video = "https://www.googleapis.com/youtube/v3/videos?";
let channel = 'https://www.googleapis.com/youtube/v3/channels?';

fetch(video + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 40,
    regionCode: 'BR'
}))

.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})

.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
}))
 
.then(res => res.json())
.then(data => {
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);
})
}



const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" alt="MrBeast" class="thumb">
        <div class="content">
            <img src="${data.channelThumbnail}" alt="logo" class="channel-icon">
            <div class="info">
                <h4 class="video-title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
       </div>
    `
    ;
    
}

