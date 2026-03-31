"use client"

import { useState, useRef } from "react"


export default function ButtonProject(){
    const [isOpen, setIsOpen] = useState(false)
    const dialogRef = useRef<HTMLDialogElement>(null)
    return(
        <>
        <button onClick={() => dialogRef.current?.showModal()} className="bg-(--color-logo) p-4 rounded-2xl text-(--bg-gray) font-black uppercase">Proposer un projet</button>

        <dialog ref={dialogRef} className="rounded-[10px] place-self-center-safe text-(--bg-gray)">
            <button onClick={() => dialogRef.current?.close()} className="float-right font-black m-2 p-2 border-2 rounded-full">X</button>
            <article className="p-8">
                <h1>Hello</h1>
            </article>
        </dialog>
        </>
    )
}