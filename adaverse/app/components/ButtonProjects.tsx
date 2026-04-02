"use client"

import { useRef } from "react"
import type { Project, Promotion } from "@/src/types"

export default  function ButtonProject({promotions, projects} : { promotions: Promotion[], projects : Project[]}){
    const dialogRef = useRef<HTMLDialogElement>(null)

    return(
        <>
        <button onClick={() => dialogRef.current?.showModal()} className="bg-(--color-logo) p-4 rounded-2xl text-(--bg-gray) font-black uppercase">Proposer un projet</button>

        <dialog ref={dialogRef} className="rounded-[10px] place-self-center-safe text-(--bg-gray) w-2xl">

            <button onClick={() => dialogRef.current?.close()} className="float-right font-black m-2 p-2 border-2 rounded-full">X</button>

            <form className="relative p-8 flex flex-col">
                <h1 className="text-(--color-logo) uppercase font-black mt-8 mb-8">Proposer un projet</h1>

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
                            <option value={promotion.name.toLowerCase()} key={promotion.id}>{promotion.name}</option>
                        )
                    })}
                </select>

                <label htmlFor="project">Projet ADA <span className="text-(--color-logo) font-black">*</span></label>
                <select name="project" id="project" className="border border-gray-400 rounded-xl p-2 mb-4 bg-(--bg-gray) text-white">
                    {projects.map((project) => {
                        return(
                            <option value={project.title.toLowerCase()} key={project.id}>{project.title}</option>
                        )
                    })}
                </select>

                <button type="submit" className="  bg-(--color-logo) w-30 p-2 rounded-2xl self-end mb-4 text-white font-black uppercase">Valider</button>

                <p className="absolute font-black right-0 bottom-3 text-(--color-logo)">* : Champ Obligatoire</p>

            </form>
        </dialog>
        </>
    )
}