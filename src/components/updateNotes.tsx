"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Settings2 } from "lucide-react";

const UpdateNotes = () => {
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    const show = localStorage.getItem("showPr23");
    if (show === null) {
      localStorage.setItem("showPr23", "true");
      setShowNotes(true);
      console.log("rahhh");
    } else {
      setShowNotes(show === "true");
    }
  }, []);

  const hideForever = () => {
    localStorage.setItem("showPr23", "false");
    setShowNotes(false)
  };

  return (
    <Dialog open={showNotes} onOpenChange={setShowNotes}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Notes{" "}
            <a
              href="https://github.com/asorge29/assignment-tracker/pull/23"
              target="_blank"
              className="underline"
            >
              PR#23
            </a>
          </DialogTitle>
        </DialogHeader>
        <div className="px-5">
          <ul className="list-disc mr-5">
          <li>
            Added a balloons effect that plays whenever an assignment is completed. This can be
            disbaled in the settings menu.
          </li>
          <li>
            Added a settings menu. Users can configure font, accent color, and more. Settings are saved across all sessions.
          </li>
          <li>
            Settings menu is located near new assignment button, and looks like this:
            <Button variant="outline" className="ml-2"><Settings2/></Button>
          </li>
        </ul>
        </div>
        <DialogFooter className="sm:justify-center justify-center gap-2 sm:space-x-0">
          <Button onClick={() => setShowNotes(false)}>Remind me later</Button>
          <Button onClick={hideForever}>Never show me this again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNotes;
