"use client";
import { Calendar, List, ListChecks, Scroll } from "lucide-react";
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
import dayjs, { Dayjs } from "dayjs";
import { RadioGroupDemo } from "../radio-group-demo";
import { SelectCategory } from "../categories/select-category";
import Category from "@/interfaces/category";

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

  // Función de envío del formulario
  const handleSubmit = () => {
    const taskData = {
      title,
      description,
      priority,
      createdAt: createdAt ? createdAt.toISOString() : null,
      dueTime: dueTime ? dueTime.toISOString() : null,
      category: category ? category.name : null,
    };

    // Aquí puedes enviar los datos a un backend o hacer lo que necesites
    console.log("Task Data:", taskData);
  };

  return (
    <div>
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
                <RadioGroupDemo setPriority={setPriority} />
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
                Select only the category you want the task to belong to.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <SelectCategory setCategory={setCategory} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>Check the information of task</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm">
                  Title
                </Label>
                <p className="text-white flex justify-start border border-primary rounded-sm p-2">
                  {title}
                </p>
              </div>
              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm">
                  Description
                </Label>
                <p className="text-white flex justify-start border border-primary rounded-sm p-2">
                  {description}
                </p>
              </div>

              <div className="space-y-1">
                <Label className="flex justify-start mb-2 text-white text-sm">
                  Priority
                </Label>
                <p className="text-white flex justify-start border border-primary rounded-sm p-2">
                  {priority}
                </p>
              </div>
              <div className="gap-2 flex justify-around mt-2">
                <div className=" rounded-sm border border-primary p-2">
                  <Label className="text-white">Start date</Label>
                  <p className="text-white">
                    {createdAt?.format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>

                <div className=" rounded-sm border border-ItsDone p-2">
                  <Label className="text-white">End date</Label>
                  <p className="text-white">
                    {dueTime?.format("DD/MM/YYYY HH:mm")}
                  </p>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-white">Category</Label>
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
                  "No category selected"
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="bg-green-500">
                Confirm Task
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
