import { useParams } from "react-router-dom"

function ArtPage() {
  
  return (
    <div>
        Current Art: {useParams().artId}    
    </div>
  )
}

export default ArtPage