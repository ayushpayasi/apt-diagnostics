import React from "react"


const data = [
    {
        
    }
    
]

export const getStaticPaths = async ()=>{
    let paths = []
    return {
        paths,
        fallback:false,
    }
}

export const getStaticProps = async ()=>{

}


export default function Display(){

    return(
        <div>
            enjoy
        </div>
    )
}