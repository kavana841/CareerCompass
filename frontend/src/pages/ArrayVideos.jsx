function ArrayVideos() {
    const videos = [
        {
            title:"Striver - Arrays Playlist",
            channel: "Take U Forward",
            link: "https://www.youtube.com/results?search_query=striver+arrays"
        },
        {
            title: "Apna College - Arrays",
            channel: "Apna College",
            link: "https://www.youtube.com/results?search_query=apna+college+arrays"
        },
        {
            title:"CodeWithHarry - Arrays",
            channel:"CodeWithHarry",
            link:"https://www.youtube.com/results?search_query=codewithharry+arrays"
        },
        {
            title:"Jenny's Lectures - Arrays",
            channel:"Jenny's Lectures",
            link:"https://www.youtube.com/results?search_query=jenny+arrays"
        },
        {
            title:"Love Babbar - Arrays",
            channel:"CpdeHelp",
            link:"https://www.youtube.com/results?search_query=love+babbar+arrays"
        }
    ];
    return(
        <div className="Videos-Page">
            <h1>🎥 Arrays Video Tutorials</h1>
            <p>Learn Array from India's Best Educators.</p>
            <div className="video-grid">
                {videos.map((video) => (
                    <div className="video-card" key={video.title}>
                        <h2>{video.title}</h2>
                        <p>{video.channel}</p>
                        <a
                        href={video.link}
                        target="_blank"
                        rel="noreferrer"
                        className="video-btn"
                        > Watch on YouTube →</a>
                        </div>
                ))}
            </div>
        </div>
    );
}
export default ArrayVideos;