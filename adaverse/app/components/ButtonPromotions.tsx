"use client"
import { useRouter } from "next/navigation"

export default function ButtonPromotions() {
  const router = useRouter()

  return (
    <select
      onChange={(e) => router.push(e.target.value)}
      defaultValue=""
      className="bg-(--bg-gray) p-4 rounded-2xl text-white font-black uppercase border-solid border-2 border-(--color-logo)"
    >
      <option value="" disabled>Projets</option>
      <option value="/paths/adapage">Adapage</option>
      <option value="/paths/adataviz">Adataviz</option>
      <option value="/paths/adaquiz">Adaquiz</option>
    </select>
  )

}