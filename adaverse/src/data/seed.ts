import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { adaProjects, promotionsAda, studentProjects } from "./schema";

async function projects(){
    //await db.delete(adaProjects)

    const schoolProjects: typeof adaProjects.$inferInsert[] = [{
        title: "Adapage",
    },{
        title: "Adataviz",
    },{
        title: "Adaquiz"
    }];

    await db.insert(adaProjects).values(schoolProjects);
    console.log("New projects created!")

}

// Arreter de commenter pour actriver la fonction
// projects();

async function promotions(){
    //await db.delete(promotionsAda)

    const classes : typeof promotionsAda.$inferInsert[] = [{
        name: "Frida",
        date: "2025-05-01"
    },{
        name: "Grace Hopper",
        date: "2025-10-01"
    },{
        name: "Gisèlle",
        date: "2026-01-01"
    }]

    await db.insert(promotionsAda).values(classes)
    console.log("New classes created")
}

//promotions()

async function students(){
    //await db.delete(studentProjects)

    const students : typeof studentProjects.$inferInsert[] = [{
        title: "Adapage",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug: "test1",
        github: "https://github.com/adatechschool/grace-adapage-gabriel-emilie",
        demo: "https://github.com/adatechschool/grace-adapage-gabriel-emilie",
        dateCreation: "2026-01-15",
        adaProjectsId: 4,
        promotionAdaId: 2
    },{
        title: "Adataviz",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug: "test2",
        github:"https://github.com/gab-hono/PiscinesParis-Frontend",
        demo: "https://github.com/gab-hono/PiscinesParis-Frontend",
        dateCreation: "2025-11-01",
        adaProjectsId: 5,
        promotionAdaId : 2
    },{
        title: "Adaquiz",
        image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        slug:"test3",
        github: "https://github.com/gab-hono/Quiz-Ghibli",
        demo: "https://github.com/gab-hono/Quiz-Ghibli",
        dateCreation: "2025-10-01",
        adaProjectsId: 6,
        promotionAdaId: 2
    }]

    await db.insert(studentProjects).values(students)

    console.log("New student projects created")
}

// students()