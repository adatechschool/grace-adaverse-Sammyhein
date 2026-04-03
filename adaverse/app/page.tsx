import { db } from "@/src/data/drizzle";
import { adaProjects, promotionsAda, studentProjects } from "@/src/data/schema";
import { eq } from "drizzle-orm";

export default async function Home() {

  const dataResult = await db.query.studentProjects.findMany({
  with: {
    adaProject: true,
    promotion: true,
  }
})

  console.log(dataResult)

  return (
    <h1>Hello World</h1>
  );
}
