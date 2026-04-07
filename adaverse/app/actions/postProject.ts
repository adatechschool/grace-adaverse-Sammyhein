"use server"
import { db } from "@/src/data/drizzle"
import { promotionsAda, studentProjects, adaProjects } from "@/src/data/schema"
import { eq } from "drizzle-orm"
import { refresh } from "next/cache"

//s'inspirer de next-better-auth
export const postProject = async(formData: FormData) => {
    const title = formData.get('title') as string
    const urlGitHub = formData.get('github') as string
    const urlDemo = formData.get('demo') as string
    const promoAda = formData.get('promo') as string
    const projectAda = formData.get('project') as string
    //pour la date de création cela restera vide car il faudrait la valider dans la version 2 

    //on va récupérer l'id à partir du nom de la promo
    //voici la première manière de faire
    const [promoAdaMatch] = await db.select().from(promotionsAda).where(eq(promotionsAda.name, promoAda))
    // l'id se récupère avec : 
    // promoAdaMatch.id

    //voici la deuxième manière de faire, mais avec les projets Ada

    const projectAdaMatch = await db.query.adaProjects.findFirst({
        where: eq(adaProjects.title, projectAda)
    })
    //et donc de la même manière , on récupère l'id avec :
    // projectAdaMatch.id

    //Si jamais la promo ou le projet sont introuvables même si ils devraient exister n'importe quand
    if (!promoAdaMatch || !projectAdaMatch) {
        throw new Error("Promo ou projet introuvable")
    }

    //on fait des testing avant d'envoyer directement à la base de donnée



    await db.insert(studentProjects).values({
        title: title,
        slug: title.replaceAll(" ", "_")+promoAda.replaceAll(" ", "_")+projectAda.replaceAll(" ", "_") + crypto.randomUUID(),
        image: urlGitHub + "/blob/main/thumbnail.png?raw=true",
        github: urlGitHub,
        demo: urlDemo,
        adaProjectsId: projectAdaMatch.id,
        promotionAdaId: promoAdaMatch.id
    })
    refresh() 
}