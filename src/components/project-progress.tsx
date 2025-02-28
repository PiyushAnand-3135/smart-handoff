import { Progress } from "@/components/ui/progress"

export default function ProjectProgress({ progress }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <h2 className="text-sm font-medium">Project Progress</h2>
        <span className="text-sm font-medium">{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

