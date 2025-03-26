import Header from "@/components/Header"

export default function EditorLayout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}
