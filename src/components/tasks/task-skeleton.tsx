import { Skeleton } from "../ui/skeleton";

export default function TaskSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <div className="flex items-center space-x-4" key={index}>
            <Skeleton
              key={index}
              className="w-[312px] h-[312px] aspect-square rounded-xl bg-primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
