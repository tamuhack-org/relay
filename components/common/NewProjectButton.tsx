/* eslint-disable no-unused-vars */

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormLabel, FormControl, FormItem } from '@/components/ui/form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NewProjectSchema = z.object({
  projectName: z.string().min(1, { message: "Name is required" }).max(255, { message: "Name is too long" }),
});

interface NewProjectButtonProps {
  createProject: (projectName: string) => void;
}

const NewProjectButton = ({ createProject }: NewProjectButtonProps) => {
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof NewProjectSchema>>({
    resolver: zodResolver(NewProjectSchema),
    defaultValues: {
      projectName: "New Project",
    },
  });

  function onSubmit(values: z.infer<typeof NewProjectSchema>) {
    createProject(values.projectName);
    setNewProjectDialogOpen(false);
  }

  return (
    <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
      <DialogTrigger asChild>
        <Button>New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Project</DialogTitle>
          <DialogDescription>
            Enter the name of your new project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 pb-6">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewProjectButton;