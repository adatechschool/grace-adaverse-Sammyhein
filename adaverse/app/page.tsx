import { db } from "@/src/data/drizzle";
import { adaProjects, studentProjects, promotionsAda } from "@/src/data/schema";
import { studentWithElse } from "@/src/interfaces/types";
import Link from "next/link";
import ProjectImage from "./components/ProjectImage";


export default async function Home() {

  const listProjects = await db.select().from(adaProjects)

  const dataResult = await db.query.studentProjects.findMany({
  with: {
    adaProject: true,
    promotion: true,
  },
  orderBy: (studentProjects, {desc})=>[desc(studentProjects.datePublish)]
}) as studentWithElse[]

  console.log(dataResult)
  console.log(listProjects)

  return (
    <article>
      {listProjects.map((project)=>{
        return(
          <section key={project.id} className="mb-5">
            <h1 className="font-black text-2xl">{project.title}</h1>
            <ul className="flex flex-row gap-5 overflow-y-auto">
              {
                dataResult.map((student)=>{
                  if(student.adaProject.title === project.title && student.datePublish){
                    return(
                      <Link key={student.slug} href={`/paths/project/${student.slug}`}>
                      <li key={student.id}>
                        <section className="relative max-w-80">
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
  );
}
