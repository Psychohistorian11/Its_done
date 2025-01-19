import React from "react"

interface LoadingOverlayProps {
  isLoading: boolean
}

const Loading: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-75"></div>
      </div>
    </div>
  )
}

export default Loading
