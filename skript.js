document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const songParam = urlParams.get('song');
    let songPath = '/music/song.txt';
    let imagePath = '/music/image.png'; 

    try {
        if (songParam && songParam.trim() !== '') {
            songPath = `/music/songs/${songParam}/song.txt`;
            imagePath = `/music/songs/${songParam}/image.png`;
        }

        const songResponse = await fetch(songPath);
        if (!songResponse.ok) {
            throw new Error('Song not found or invalid');
        }
        const songData = await songResponse.text();
        const lines = songData.split('\n');
        if (lines.length < 2) {
            throw new Error('Invalid song file format: Insufficient lines');
        }
        const title = lines.find(line => line.startsWith('title:')).split(':')[1].trim();
        const author = lines.find(line => line.startsWith('author:')).split(':')[1].trim();

        document.querySelector('.title h3').innerText = title;
        document.querySelector('.author p').innerText = author;
        document.querySelector('.image img').src = imagePath;
        document.querySelector('body').style.backgroundImage = `url('${imagePath}')`;
        document.querySelector('.background').style.backgroundImage = `url('${imagePath}')`;

        const configResponse = await fetch('/config.txt');
        if (!configResponse.ok) {
            throw new Error('Config file not found');
        }
        const configData = await configResponse.text();
        const configLines = configData.split('\n');
        if (configLines.length < 1) {
            throw new Error('Invalid config file format');
        }
        const configTitle = configLines[0].split(':')[1].trim();
        document.querySelector('.titl').textContent = configTitle;
    } catch (error) {
        console.error('Error:', error);
    }
});
