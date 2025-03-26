const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted">
      <div className="h-full bg-primary animate-[loading_1s_ease-in-out_infinite] w-1/3" />
    </div>
  )
}

export default Loading