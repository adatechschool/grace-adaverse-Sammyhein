"use client"
import ProjectImage from "./ProjectImage"
import Link from "next/link"
import type { studentWithElse } from "@/src/interfaces/types"
import { InferSelectModel } from "drizzle-orm"
import { adaProjects, promotionsAda } from "@/src/data/schema"
import { useState } from "react"

type Props = {
  dataResult: studentWithElse[]
  listPromotions: InferSelectModel<typeof promotionsAda>[]
  listProjects: InferSelectModel<typeof adaProjects>[]
}

export default function HomePage({listPromotions, listProjects, dataResult} : Props){
    const [selectValue, setSelectValue] = useState("")

    const dataFiltered = selectValue ? dataResult.filter((student) => student.promotion.name === selectValue) : dataResult

    return(
    <>
      <select defaultValue="" onChange={(e) => setSelectValue(e.target.value)} className="w-full p-3 border-solid border-2  border-(--color-logo) rounded-2xl mb-4 font-black">
          <option value="">Cherchez-vous une promotion en particulier ?</option>
        {listPromotions.map((promo) => {
          return (
            <option key={promo.id} value={promo.name}>{promo.name}</option>
          )
        })

        }
      </select>

      <article>
        {listProjects.map((project)=>{
          return(
            <section key={project.id} className="mb-5">
              <h1 className="font-black text-2xl">{project.title}</h1>
              <ul className="flex flex-row flex-nowrap gap-5 overflow-x-auto">
                {
                  dataFiltered.map((student)=>{
                    if(student.adaProject.title === project.title && student.datePublish){
                      return(
                        <Link key={student.slug} href={`/paths/project/${student.slug}`}>
                        <li key={student.id} className="shrink-0 min-w-50">
                          <section className="relative max-w-80 ">
                            <p className="absolute right-2 top-3 bg-(--bg-gray) p-2 rounded-2xl ">{student.promotion.name}</p>
                            <ProjectImage urlGitHub={student.image} alt={student.title} />
                          </section>

                          <h2 className="font-bold">{student.title}</h2>
                          <p>{student.datePublish.split("-").reverse().join("/")}</p>
                        </li>
                        </Link>
                      )
                    }
                  })
                }
              </ul>
            </section>
          )
        })}
      </article>
    </>
    )
}