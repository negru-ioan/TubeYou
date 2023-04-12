import { Link } from "react-router-dom"
import { Typography, Card, CardContent, CardMedia } from "@mui/material"
import { CheckCircle } from "@mui/icons-material"
import {decode} from 'html-entities';

import { demoThumbnailUrl, demoVideoUrl, demoVideoTitle, demoChannelUrl, demoChannelTitle } from "../utils/constants"

const VideoCard = ({video: {id: videoId, snippet }}) => {

    return (
    <Card sx={{ width: { xs: '100%', sm: '358px', md: '320px' }, boxShadow: 'none', height: '100%' }}>
        <Link to={videoId ? `/video/${videoId.videoId}` : demoVideoUrl}>
        <CardMedia 
            image={snippet?.thumbnails?.high?.url}
            alt={snippet?.title}
            sx={{width: {
                xs: '100%', sm: '358px', md: '320px'
            }, height: 200}}
        />

        </Link>
        <CardContent sx={{backgroundColor: '#000', height: '60px', padding: '5px 10px 25px 10px !important'}}>
            <Link to={videoId ? `/video/${videoId.videoId}` : demoVideoUrl}>
                <Typography variant="subtitle1" fontWeight='bold' color='#FFF'>
                    {decode(snippet?.title.slice(0, 60) || demoVideoTitle.slice(0, 60))}
                </Typography>
            </Link>
            <Link to={snippet?.channelId ? `/channel/${snippet?.channelId}` : demoChannelUrl}>
                <Typography variant="subtitle2" fontWeight='bold' color='grey'>
                    {decode(snippet?.channelTitle || demoChannelTitle)}
                    <CheckCircle sx={{ fontSize: 12, color: 'gray', ml: '5px' }} />
                </Typography>
            </Link>
        </CardContent>
    </Card>
  )
}

export default VideoCard