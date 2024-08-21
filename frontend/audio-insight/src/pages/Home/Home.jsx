import React from 'react'
import Navbar from '../../components/landingPage/navbar'
import { ProjectName } from '../../components/landingPage/projectName'
import { MovingCard } from '../../components/landingPage/movingCard'
import Footer from '../../components/footer'
import { ThreeDCard } from '../../components/landingPage/card'
import { Box } from '@chakra-ui/react'

function Home() {
  return (
    <Box bg={"rgb(17,21,24)"}>
      <Navbar/>
      <ProjectName/>
      <ThreeDCard/>
      <MovingCard/>
      <Footer/>
    </Box>
  )
}

export default Home
Home