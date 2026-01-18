'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useSearchParams ,useRouter} from "next/navigation";
import EventForm from "./event-form";


const CreateEventsDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const create = searchParams.get("create");
        if (create === "true") {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
    },[searchParams])

    const handleClose = () => {
        setIsOpen(false);
        if(searchParams.get("create") === "true"){
          router.replace(window.location.pathname);
        }
    }

  return (
    <Drawer open={isOpen} >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm onSubmitForm={() => { handleClose() }} />
            {/* drawer body */}
          <DrawerFooter>
            
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateEventsDrawer;
