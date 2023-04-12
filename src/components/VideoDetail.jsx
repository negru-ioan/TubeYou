import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Box, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


function VideoDetail() {
  const { id } = useParams()
  const [videoDeteil, setVideoDeteil] = useState(null)
  const [videos, setVideos] = useState([])
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [subscribe, setSubscribe] = useState(false)

  function handleSubscribe(){
    setSubscribe(prev => !prev)
  }

  function handleLike(){
    setLiked(prev => !prev)
    setDisliked(false)
  }

  function handleDislike(){
    setDisliked(prev => !prev)
    setLiked(false)
  }

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then(data => setVideoDeteil(data.items[0]))

    fetchFromAPI(`search?part=snippet&relatedToVideo=${id}&type=video`)
    .then(data => setVideos(data.items))
  },[id])

  if(!videoDeteil?.snippet) return 'Loading...'

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDeteil

  return (
    <Box minHeight='95vh'>
      <Stack direction={{xs: 'column', md: 'row'}}>
        <Box flex={1}>
          <Box sx={{width: '100%', position: 'sticky', top: '86px'}}>
            <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`}className='react-player' controls />
            <Typography color="#fff" variant='h6'fontWeight='bold' sx={{padding: '5px 0 5px 16px'}} >
              { title }
            </Typography>

            <Stack direction={{xs: 'column', md: 'row'}} justifyContent='space-between' sx={{color: '#fff'}} py={1} px={2} alignItems='center'>
              
              <Stack direction='row' justifyContent='space-between'  py={1} px={2} alignItems='center' className='subTitleStack' >
                <Link to={`/channel/${channelId}`}>
                <Typography variant={ {sm: 'subtitle', md: 'h6' }} color='#fff'>
                    { channelTitle }
                    <CheckCircle sx={{ fontSize: '12px', color: 'grey', ml: '5px'}}/>
                  </Typography>
                </Link>
                <Box sx={{ marginLeft: "15px", padding: '10px', borderRadius: '999px', border: '1px solid #707070'}}
                     onClick={handleSubscribe}
                     style={{background: subscribe ? '#707070': 'rgb(0,0,0)'}}
                >
                  {subscribe ? "Unsubscribe" : "Subscribe"}
                </Box>
              </Stack>

              <Stack direction='row' gap="20px" alignItems="center"  className='subTitleStack' >
                <Stack direction="row" alignItems='center' spacing={2} fontSize='15px'
                  sx={{background: 'black', borderRadius: '999px', justifyContent: 'center', padding: '1px 5px', border: '1.4px solid #707070'}}>
                  <Stack direction='row' gap="5px" alignItems="center" sx={{padding: '2px 10px 2px 5px', borderRight: '1px solid #707070'}}
                     onClick={handleLike}>
                    {liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon  /> }
                    <Typography variant="body1" sx={{ opacity: 0.7}}>
                      {numConverter(likeCount)}
                    </Typography>
                  </Stack>
                  <Box sx={{width: '50%', height: 'auto', padding:'1px 5px 1px 5px', ml: '2px !important'}} 
                    onClick={handleDislike}>
                  { disliked ? <ThumbDownAltIcon  /> : <ThumbDownOffAltIcon  /> }
                  </Box>
                </Stack>

                <Typography variant="body1" sx={{ opacity: 0.7}}>
                  {numConverter(viewCount)} views
                </Typography>
              </Stack>

            </Stack>
          </Box>
        </Box>

        <Box px={2} py={{md: 1, xs: 5}} justifyContent='center' alignItems='center'>
          <Videos videos={videos} direction='column'/>
        </Box>
      </Stack>
    </Box>
  )
}

function numConverter(s){
  let mil = 1000000
  if(s < 10000){
      return s.toLocaleString()
  } else if (s < 999999){
      return (s + '').replace(/.{3}$/gi, 'K')
  } else if(s < 999999999){
      return (s / mil).toPrecision(2) + 'mil.'
  } else {
      return (s / mil * (1000 * 100)).toPrecision(2) + 'mld.'
  }
}

export default VideoDetail