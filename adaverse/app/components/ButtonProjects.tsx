"use client"

import { useRef } from "react"


export default function ButtonProject(){
    const dialogRef = useRef<HTMLDialogElement>(null)
    return(
        <>
        <button onClick={() => dialogRef.current?.showModal()} className="bg-(--color-logo) p-4 rounded-2xl text-(--bg-gray) font-black uppercase">Proposer un projet</button>

        <dialog ref={dialogRef} className="rounded-[10px] place-self-center-safe text-(--bg-gray) w-2xl">

            <button onClick={() => dialogRef.current?.close()} className="float-right font-black m-2 p-2 border-2 rounded-full">X</button>

            <article className="p-8 flex flex-col">
                <h1 className="text-(--color-logo) uppercase font-black mt-8 mb-8">Proposer un projet</h1>

                <label htmlFor="title">Titre</label>
                <input type="text" placeholder="ex: Dashboard ..." className="border border-gray-400 rounded-2xl p-2 mb-4"/>

                <label htmlFor="github">URL GitHub</label>
                <input type="text" placeholder="https://github.com/..." className="border border-gray-400 rounded-2xl p-2 mb-4"/>

                <label htmlFor="demo">URL de démo</label>
                <input type="text" placeholder="Titre..." className="border border-gray-400 rounded-2xl p-2 mb-4"/>

            </article>
        </dialog>
        </>
    )
}