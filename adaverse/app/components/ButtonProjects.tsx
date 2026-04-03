"use client"

import { useRef, useState } from "react"
import type { Project, Promotion } from "@/src/interfaces/types"
import { postProject } from "../actions/postProject"

export default function ButtonProject({promotions, projects} : { promotions: Promotion[], projects : Project[]}){
    const dialogRef = useRef<HTMLDialogElement>(null)
    const formRef= useRef<HTMLFormElement>(null)
    const [error, setError] = useState<string | null>(null)

    //voici une fonction qui permet de vérifier si les informations inscript dans les input url sont bien des urls
    function validateUrls(formData : FormData): string | null {
        const github = formData.get('github') as string
        const demo = formData.get('demo') as string

        //pour l'url démo principalement
        const isUrl = (url:string) => {
            try { new URL(url); return true}
            catch{ return false }
        }

        //on verifie pour l'url github
        if(!github.startsWith('https://github.com/')){
            return "L'URL GitHub doit commencer par https://github.com/, donc il doit être véritablement un lien GitHub"
        }

        //comment on vérifie la démo
        if(demo && !isUrl(demo)){
            return "L'URL de démo n'est pas une URL valide. Si vous n'avez pas de démo, effacez ce que vous avez mis pour la partie 'URL de démo'. Dans le cas contraire, mettez une lien de votre démo."
        }

        return null
    }

    //on fait une async function pour fermer le formulaire et le remettre à 0 après avoir posté un projet , c'est pour cela que dans form action ont met handleSubmit et pas postProject directement 
    //on s'en sert également pour gérer les erreur que l'on a définit dans le fonction validate Urls
    async function handleSubmit(formData: FormData) {
        //on réinitialise l'erreur
        setError(null)

        //on vérifie si il y a une erreur ou non
        const validationError = validateUrls(formData)

        if(validationError){
            setError(validationError)
            return // cela empêche à envoyer à la base de donnée s'il y a une erreur
        }

        await postProject(formData)
        dialogRef.current?.close()
        formRef.current?.reset() // remet le formulaire à zéro
    }

    return(
        <>
        <button onClick={() => dialogRef.current?.showModal()} className="bg-(--color-logo) p-4 rounded-2xl text-(--bg-gray) font-black uppercase">Proposer un projet</button> 

        <dialog ref={dialogRef} className="rounded-[10px] place-self-center-safe text-(--bg-gray) w-2xl">

            <button onClick={() => dialogRef.current?.close()} className="float-right font-black m-2 p-2 border-2 rounded-full">X</button>

            <form action={handleSubmit} className="relative p-8 flex flex-col">
                <h1 className="text-(--color-logo) uppercase font-black mt-8 mb-8">Proposer un projet</h1>

                {/* Message d'erreur */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-xl mb-4">{error}</div>
                )}

                <label htmlFor="title">Titre <span className="text-(--color-logo) font-black">*</span></label>
                <input type="text" name="title" id="title" placeholder="ex: Dashboard ..." className="border border-gray-400 rounded-2xl p-2 mb-4" required/>

                <label htmlFor="github">URL GitHub <span className="text-(--color-logo) font-black">*</span></label>
                <input type="text" name="github" id="github" placeholder="https://github.com/..." className="border border-gray-400 rounded-2xl p-2 mb-4" required/>

                <label htmlFor="demo">URL de démo </label>
                <input type="text" name="demo" id="demo" placeholder="https://..." className="border border-gray-400 rounded-2xl p-2 mb-4"/>

                <label htmlFor="promo">Promo ADA <span className="text-(--color-logo) font-black">*</span></label>
                {/* ici j'ai récupéré ma donnée sur layout.tsx */}
                <select name="promo" id="promo" className="border border-gray-400 rounded-xl p-2 mb-4 bg-(--bg-gray) text-white">
                    {promotions.map((promotion) => {
                        return(
                            <option value={promotion.name} key={promotion.id}>{promotion.name}</option>
                        )
                    })}
                </select>

                <label htmlFor="project">Projet ADA <span className="text-(--color-logo) font-black">*</span></label>
                <select name="project" id="project" className="border border-gray-400 rounded-xl p-2 mb-4 bg-(--bg-gray) text-white">
                    {projects.map((project) => {
                        return(
                            <option value={project.title} key={project.id}>{project.title}</option>
                        )
                    })}
                </select>

                <button type="submit" className="  bg-(--color-logo) w-30 p-2 rounded-2xl self-end mb-4 text-white font-black uppercase" >Valider</button>

                <p className="absolute font-black right-0 bottom-3 text-(--color-logo)">* : Champ Obligatoire</p>

            </form>
        </dialog>
        </>
    )
}