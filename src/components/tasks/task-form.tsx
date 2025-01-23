import { Calendar, List, ListChecks, Plus, Scroll } from "lucide-react";
import Loading from "../common/loading";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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

export function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-transparent border border-primary text-white"
          >
            <Plus />
            New Task
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Task Form</DialogTitle>
            <DialogDescription>
              Use the tabs below to manage your new task.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="task">
                <Scroll className="pr-3" />
                task
              </TabsTrigger>
              <TabsTrigger value="time">
                <Calendar className="pr-3" />
                time
              </TabsTrigger>
              <TabsTrigger value="category">
                <List className="pr-2" />
                category
              </TabsTrigger>
              <TabsTrigger className="gap-1" value="summary">
                <ListChecks className="size-4" />
                summary
              </TabsTrigger>
            </TabsList>

            <TabsContent value="task">
              <Card>
                <CardHeader>
                  <CardTitle>Task</CardTitle>
                  <CardDescription>
                    The title is required. Make sure you complete all fields
                    before saving.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      className="text-black"
                      required
                      id="title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
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

            <TabsContent value="time">
              <Card>
                <CardHeader>
                  <CardTitle>Time</CardTitle>
                  <CardDescription>
                    Dates are important to determine the estimated duration of
                    the task, take your time
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Label htmlFor="start-date">Start date</Label>
                  <div>
                    <DateTime_Picker />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="time">
              <Card>
                <CardContent className="space-y-2">
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="end-date">End date</Label>
                    <div>
                      <DateTime_Picker />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="category">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="summary">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you'll be logged
                    out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="current">Current password</Label>
                    <Input id="current" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new">New password</Label>
                    <Input id="new" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
