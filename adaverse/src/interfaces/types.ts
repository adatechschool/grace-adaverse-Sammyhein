import { InferSelectModel } from "drizzle-orm";
import { adaProjects, promotionsAda, studentProjects } from "../data/schema";


export type Promotion = { 
    id: number; 
    name: string; 
    date: string 
}

export type Project = { 
    id: number; 
    title: string; 
}

//pour assembler les datas et les afficher
export type studentWithElse = InferSelectModel<typeof studentProjects> & {
  adaProject: InferSelectModel<typeof adaProjects>,
  promotion: InferSelectModel<typeof promotionsAda>
}