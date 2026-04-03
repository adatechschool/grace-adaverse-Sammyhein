import { db } from "@/src/data/drizzle";
import { adaProjects, studentProjects, promotionsAda } from "@/src/data/schema";
import { InferSelectModel } from "drizzle-orm";
import { studentWithElse } from "@/src/interfaces/types";

export default async function Home() {

  const listProjects = await db.select().from(adaProjects)

  const dataResult = await db.query.studentProjects.findMany({
  with: {
    adaProject: true,
    promotion: true,
  },
  orderBy: (studentProjects, {asc})=>[asc(studentProjects.id)]
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
                  if(student.adaProject.title === project.title){
                    return(
                      <li key={student.id}>
                        <section className="relative max-w-80">
                          <p className="absolute right-2 top-3 bg-(--bg-gray) p-2 rounded-2xl ">{student.promotion.name}</p>
                          <img src={student.image ?? "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt={student.title} className="w-full h-40 object-cover"/>
                        </section>

                        <h2>{student.title}</h2>
                        <p>{student.datePublish.split("-").reverse().join("/")}</p>
                      </li>
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
