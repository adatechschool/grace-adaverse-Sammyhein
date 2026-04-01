"use client"

import { useRef } from "react"


export default function ButtonProject(){
    const dialogRef = useRef<HTMLDialogElement>(null)
    return(
        <>
        <button onClick={() => dialogRef.current?.showModal()} className="bg-(--color-logo) p-4 rounded-2xl text-(--bg-gray) font-black uppercase">Proposer un projet</button>

        <dialog ref={dialogRef} className="rounded-[10px] place-self-center-safe text-(--bg-gray) w-2xl">

            <button onClick={() => dialogRef.current?.close()} className="float-right font-black m-2 p-2 border-2 rounded-full">X</button>

            <form className="relative p-8 flex flex-col">
                <h1 className="text-(--color-logo) uppercase font-black mt-8 mb-8">Proposer un projet</h1>

                <label htmlFor="title">Titre *</label>
                <input type="text" name="title" placeholder="ex: Dashboard ..." className="border border-gray-400 rounded-2xl p-2 mb-4" required/>

                <label htmlFor="github">URL GitHub *</label>
                <input type="text" name="github" placeholder="https://github.com/..." className="border border-gray-400 rounded-2xl p-2 mb-4" required/>

                <label htmlFor="demo">URL de démo *</label>
                <input type="text" name="demo" placeholder="https://..." className="border border-gray-400 rounded-2xl p-2 mb-4"/>

                <label htmlFor="promo">Promo ADA</label>
                <select name="promo" id="promo">
                    
                </select>

                <p className="absolute font-black right-0 bottom-3">* : Champ Obligatoire</p>

            </form>
        </dialog>
        </>
    )
}