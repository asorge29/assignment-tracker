"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const UpdateNotes = () => {
  const [showNotes, setShowNotes] = useState(true);

  useEffect(() => {
    const show = localStorage.getItem("showPr19");
    if (show === null) {
      localStorage.setItem("showPr19", "true");
      setShowNotes(true);
      console.log("rahhh");
    } else {
      setShowNotes(show === "true");
    }
  }, []);

  const hideForever = () => {
    localStorage.setItem("showPr19", "false");
    setShowNotes(false)
  };

  return (
    <Dialog open={showNotes}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Notes{" "}
            <a
              href="https://github.com/asorge29/assignment-tracker/pull/19"
              target="_blank"
              className="underline"
            >
              PR#19
            </a>
          </DialogTitle>
        </DialogHeader>
        <ul className="list-disc list-inside">
          <li>
            The link column in the assignments table has been removed to reduce
            clutter and save space on mobile
          </li>
          <li>
            Links can still be added and changed when creating and editing an
            assignment as usual
          </li>
          <li>To access links, simply click on the title of the assignment</li>
        </ul>
        <DialogFooter className="sm:justify-center justify-center gap-2 sm:space-x-0">
          <Button onClick={() => setShowNotes(false)}>Remind me later</Button>
          <Button onClick={hideForever}>Never show me this again</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNotes;
