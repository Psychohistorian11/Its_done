"use client";
import { Button } from "../ui/button";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Textarea } from "../ui/textarea";
import DateTime_Picker from "./date-time-picker";
import { useState } from "react";
import { Dayjs } from "dayjs";
import { RadioGroupDemo } from "../radio-group-demo";
import { SelectCategory } from "../categories/select-category";
import Category from "@/interfaces/category";
import Loading from "../common/loading";
import { useRouter } from "next/navigation";

export function TaskForm() {
  //Tab one
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  //Tab two
  const [createdAt, setCreatedAt] = useState<Dayjs | null>(null);
  const [dueTime, setDueTime] = useState<Dayjs | null>(null);

  //Tab three
  const [category, setCategory] = useState<Category | null>(null);

  const isFormValid = title.trim() !== "" && dueTime !== null;

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleNewTask = async () => {
    if (!isFormValid) return;
    setIsLoading(true);
    const taskData = {
      title,
      description,
      priority,
      createdAt: createdAt ? createdAt.toISOString() : null,
      dueTime: dueTime ? dueTime.toISOString() : null,
      category: category ? category : null,
    };

    console.log("Task Data:", taskData);
    try {
      const response = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Category created successfully");
        router.push("/task");
      }
    } catch (error) {
      console.error("Error creating new task:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="pb-28">
      <Loading isLoading={isLoading} />

      <Tabs defaultValue="task" className="w-[450px] h-[500px]">
        <TabsList className="grid w-full grid-cols-4 bg-primary">
          <TabsTrigger value="task">Task</TabsTrigger>
          <TabsTrigger value="time">Time</TabsTrigger>
          <TabsTrigger value="category">Category</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="task">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-start text-white">
                Task
              </CardTitle>
              <CardDescription className="flex justify-start">
                The title is required. Make sure you complete all fields before
                saving.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label
                  htmlFor="title"
                  className="flex justify-start mb-2 text-white"
                >
                  Title
                </Label>
                <Input
                  className="text-white"
                  required
                  id="title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="description"
                  className="flex justify-start mb-2 text-white"
                >
                  Description
                </Label>
                <Textarea
                  className="text-white"
                  placeholder="Type the description of task here."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-start text-white">
                Priority
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <RadioGroupDemo priority={priority} setPriority={setPriority} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-start mb-2 mt-4 text-white">
                Time
              </CardTitle>
              <CardDescription>
                Dates are important to determine the estimated duration of the
                task, take your time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label
                htmlFor="start-date"
                className="flex justify-start mb-2 text-white"
              >
                Start date
              </Label>
              <div>
                <DateTime_Picker date={createdAt} setDate={setCreatedAt} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardContent className="space-y-2">
              <div className="space-y-2 pt-2">
                <Label
                  htmlFor="end-date"
                  className="flex justify-start mb-2 text-white"
                >
                  End date
                </Label>
                <div>
                  <DateTime_Picker date={dueTime} setDate={setDueTime} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-start mb-2 mt-4 text-white">
                Select the category
              </CardTitle>
              <CardDescription>
                Select only the category you want the task to belong to. The
                category is not required to continue.{" "}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SelectCategory
                categoryToSend={category}
                setCategory={setCategory}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>
                Check the information of task before to save
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm font-semibold leading-none tracking-tight">
                  Title
                </Label>
                <p className="text-white flex justify-start border border-primary rounded-sm p-2">
                  {title ? (
                    title
                  ) : (
                    <span className="text-muted-foreground">
                      Title not entered
                    </span>
                  )}
                </p>
                {!title && (
                  <span className="text-red-600">Title is required</span>
                )}
              </div>
              {!title && <span>Title is required</span>}
              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm font-semibold leading-none tracking-tight">
                  Description
                </Label>
                <p className="text-white flex justify-start border border-primary rounded-sm p-2">
                  {description ? (
                    description
                  ) : (
                    <span className="text-muted-foreground">
                      description not entered
                    </span>
                  )}
                </p>
              </div>

              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm font-semibold leading-none tracking-tight">
                  Priority
                </Label>
                <p className="text-white flex justify-start border border-primary rounded-sm p-2">
                  {priority}
                </p>
              </div>
              <div className="gap-2 flex justify-between mt-2">
                <div className=" rounded-sm border border-primary p-2 w-full">
                  <Label className="text-white font-semibold leading-none tracking-tight">
                    Start date
                  </Label>
                  <p className="text-white">
                    {createdAt ? (
                      createdAt.format("DD/MM/YYYY HH:mm")
                    ) : (
                      <span className="text-muted-foreground">
                        start date not entered
                      </span>
                    )}
                  </p>
                </div>

                <div className=" rounded-sm border border-ItsDone p-2 w-full">
                  <Label className="text-white font-semibold leading-none tracking-tight">
                    End date
                  </Label>
                  <p className="text-white">
                    {dueTime ? (
                      dueTime.format("DD/MM/YYYY HH:mm")
                    ) : (
                      <span className="text-red-600">End date is required</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm">
                  Category
                </Label>
                {category ? (
                  <div className="flex items-center gap-2 text-white mt-1 p-1 w-full rounded-lg bg-primary">
                    {category.icon && (
                      <span
                        className="p-1.5 rounded-md"
                        style={{
                          backgroundColor: category.color,
                          fontSize: "1.2rem",
                        }}
                      >
                        {category.icon}
                      </span>
                    )}

                    <span className="text-sm">{category.name}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    category not entered
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleNewTask}
                disabled={!isFormValid}
                className={`font-semibold ${
                  isFormValid
                    ? "bg-ItsDone text-black hover:text-white"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                Save Task
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}