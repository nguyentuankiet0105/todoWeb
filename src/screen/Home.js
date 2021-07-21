import * as React from 'react'
import Header from "../layout/Header"
import Footer from "../layout/Footer"
import Body from "../layout/Body"

import '../Style/Home.css'

const Home = () => {

    return (
        <div className='container' >
            <Header />
            <Body />
            <Footer />
        </div>
    )
}
export default Home