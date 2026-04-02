"use server"
import { db } from "@/src/data/drizzle"
import { studentProjects } from "@/src/data/schema"

//s'inspirer de next-better-auth
export const postProject = async(formData: FormData) => {
    const title = formData.get('title') as string
    const urlGitHub = formData.get('github') as string
    const urlDemo = formData.get('demo') as string
    const pormoAda = formData.get('promo') as string
    const projectAda = formData.get('project') as string
    //pour la date de création cela restera vide car il faudrait la valider dans la version 2 
}