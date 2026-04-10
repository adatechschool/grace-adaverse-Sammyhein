import ProjectBigImage from "@/app/components/ProjectBigImage"
import { db } from "@/src/data/drizzle"
import { adaProjects, studentProjects } from "@/src/data/schema"
import { studentWithElse } from "@/src/interfaces/types"
import { eq } from "drizzle-orm"
import Link from "next/link"

export default async function Adapage(){

    const [projects] = await db.select().from(adaProjects).where(eq(adaProjects.title, "Adapage"))

    const dataResult = await db.query.studentProjects.findMany({
      with: {
        adaProject: true,
        promotion: true,
      },
      where: eq(studentProjects.adaProjectsId, projects.id),
      orderBy: (studentProjects, {desc})=>[desc(studentProjects.datePublish)]
    }) as studentWithElse[]

    console.log(dataResult)
    return(
        <>
        <h1 className="uppercase text-2xl font-black place-self-center-safe
        mb-5">Projet<span className="ml-2 text-(--color-logo)">Pokedex</span></h1>
        <ul className="flex flex-wrap gap-5 justify-evenly">
        {dataResult.map((student) => {
            if(student.datePublish){
                return(
                    <Link key={student.slug} href={`/paths/project/${student.slug}`}>
                    <li key={student.id} className="min-w-50">
                        <section className="relative max-w-100 ">
                        <p className="absolute right-2 top-3 bg-(--bg-gray) p-2 rounded-2xl ">{student.promotion.name}</p>
                        <ProjectBigImage urlGitHub={student.image} alt={student.title} height={40}/>
                        </section>

                        <h2 className="font-bold">{student.title}</h2>
                        <p>{student.datePublish.split("-").reverse().join("/")}</p>
                    </li>
                    </Link>
                )
            }
        })}
        </ul>
        </>
    )
}