import { db } from "@/src/data/drizzle";
import { adaProjects, studentProjects, promotionsAda } from "@/src/data/schema";
import { studentWithElse } from "@/src/interfaces/types";
import Link from "next/link";
import ProjectImage from "./components/ProjectImage";
import HomePage from "./components/HomePage";



export default async function Home() {

  const listProjects = await db.select().from(adaProjects)

  const dataResult = await db.query.studentProjects.findMany({
  with: {
    adaProject: true,
    promotion: true,
  },
  orderBy: (studentProjects, {desc})=>[desc(studentProjects.datePublish)]
}) as studentWithElse[]

  // console.log(dataResult)
  // console.log(listProjects)

  const listPromotions = await db.select().from(promotionsAda)
  console.log(listPromotions)

  return (
    <HomePage listProjects={listProjects} listPromotions={listPromotions} dataResult={dataResult} />
  );
}
