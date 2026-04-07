"use client"

type Props = {
    urlGitHub: string,
    alt: string
}

export default function ProjectImage({urlGitHub, alt} : Props){
    return(
        <img 
            src={`${urlGitHub}`} 
            alt={alt} 
            className="w-full h-40 object-cover"
            //permet de gérer les images si jamais y'a pas de thumbnail sur le repo du projet en question
            onError={(e) => {
            e.currentTarget.src = '/default-thumbnail.png'
            }}
        />
    )
}