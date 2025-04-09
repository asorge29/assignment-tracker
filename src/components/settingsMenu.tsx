'use client'

import { Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSettingsContext } from "@/app/(main)/assignments/context";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";


const SettingsMenu = () => {
  const {settings, setSettings} = useSettingsContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center h-10 w-10 p-0">
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <pre>{JSON.stringify(settings, null, 2)}</pre>
        <div className="flex flex-col">
          <Label htmlFor="color">Accent Color</Label>
          <div className="flex flex-row gap-2">
            <div className="w-10 h-10 rounded-full bg-white cursor-pointer overflow-hidden -rotate-[35deg]" onClick={() => setSettings({...settings, accentColor: undefined})}>
              <div className="w-1/2 h-full bg-black"></div>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "red"})}></div>
            <div className="w-10 h-10 rounded-full bg-orange-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "orange"})}></div>
            <div className="w-10 h-10 rounded-full bg-lime-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "lime"})}></div>
            <div className="w-10 h-10 rounded-full bg-emerald-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "emerald"})}></div>
            <div className="w-10 h-10 rounded-full bg-cyan-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "cyan"})}></div>
            <div className="w-10 h-10 rounded-full bg-blue-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "blue"})}></div>
            <div className="w-10 h-10 rounded-full bg-violet-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "violet"})}></div>
            <div className="w-10 h-10 rounded-full bg-fuchsia-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "fuchsia"})}></div>
            <div className="w-10 h-10 rounded-full bg-rose-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "rose"})}></div>          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="overdueHighlight">Highlight Overdue Assignments</Label>
          <Checkbox id="overdueHighlight" checked={settings?.overdueHighlight} onCheckedChange={(checked) => setSettings({...settings, overdueHighlight: checked as boolean})}/> 
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;