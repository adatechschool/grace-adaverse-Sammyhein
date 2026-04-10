import { db } from "@/src/data/drizzle"
import { studentProjects } from "@/src/data/schema"
import { studentWithElse } from "@/src/interfaces/types"
import { eq } from "drizzle-orm"
import logoGithub from "@/src/images/githubLogo.png"
import ProjectImage from "@/app/components/ProjectImage"
import ProjectBigImage from "@/app/components/ProjectBigImage"

export default async function Slug({params}: {params: Promise<{slug: string}>}){
    const { slug } = await params

    const dataResult = await db.query.studentProjects.findFirst({
      with: {
        adaProject: true,
        promotion: true,
      },
      where: eq(studentProjects.slug, slug)
    }) as studentWithElse

    // console.log(dataResult)

    return(
        <article className="place-self-center-safe">
            <section className="relative max-w-200">
            <p className="absolute right-2 top-3 bg-(--bg-gray) p-2 rounded-2xl border-solid border-2 border-white">{dataResult.promotion.name}</p>
            {/* <img src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={dataResult.title} className="w-full object-cover"/> */}
            <ProjectBigImage urlGitHub={dataResult.image} alt={dataResult.title} height={48}/>
            </section>
            <h1 className="text-4xl font-black text-(--color-logo)">{dataResult.title}</h1>
            <p className="text-xl">{dataResult.datePublish?.split("-").reverse().join("/")}</p>

            <section className="flex flex-wrap gap-5 mt-4 place-self-center-safe">
                <a href={dataResult.github} target="_blank" className="flex flex-wrap gap-2 bg-white p-4 text-2xl rounded-4xl text-(--bg-gray)">
                    
                        <img src="/githubLogo.png" alt="LogoGitHub" className="max-w-10"/>

                    
                    GitHub
                    </a>
                {dataResult.demo && (<a href={dataResult.demo} target="_blank" className="bg-[#6109e5] p-4 text-2xl rounded-4xl">▶️ Démo</a>)}
            </section>
        </article>
    )
}