import { db } from "@/src/data/drizzle"
import { studentProjects } from "@/src/data/schema"
import { studentWithElse } from "@/src/interfaces/types"
import { eq } from "drizzle-orm"

export default async function Slug({params}: {params: Promise<{slug: string}>}){
    const { slug } = await params

    const dataResult = await db.query.studentProjects.findFirst({
      with: {
        adaProject: true,
        promotion: true,
      },
      where: eq(studentProjects.slug, slug)
    }) as studentWithElse

    console.log(dataResult)
}