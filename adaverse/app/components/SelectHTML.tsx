"use client"

import { db } from "@/src/data/drizzle"
import { List } from "@/src/interfaces/types"

export default async function SelectHTML({list} : any){
    const data = await db.select().from(list)
    console.log(data)

    return (
        <>
        <option value="hello">hello</option>
        {/* {data.map((option)=>{
            return(
                <option value={option.id}></option>
            )
        })} */}
        
        </>
    )


}