import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <h1>Hello! Welcome to Prox!</h1>
      <UserButton />
    </>
  )
}
