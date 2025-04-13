'use client'

import { Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSettingsContext } from "@/app/(main)/assignments/context";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";
import { updateSettings } from "@/lib/updateSettings";
import { getUser } from "@/lib/getUser";
import { Settings } from "@/types/settings";


const SettingsMenu = () => {
  const {settings, setSettings} = useSettingsContext();

  const fontFamilies = [
    { name: "Poppins", var: "--font-poppins" },
    { name: "Inter", var: "--font-inter" },
    { name: "Kalam", var: "--font-kalam" },
    { name: "Lora", var: "--font-lora" },
    { name: "Orelega One", var: "--font-orelega" },
    { name: "Bebas Neue", var: "--font-bebas" },
    { name: "JetBrains Mono", var: "--font-jetbrains" },
  ];
  
  const refetchSettings = async (newSettings: Settings) => {
    await updateSettings({settings: newSettings})
    const fetchedUser = await getUser();
    if (fetchedUser) {
      setSettings(fetchedUser.settings);
    }
  }

  useEffect(() => {
    const body = document.body;
    body.style.fontFamily = `var(${settings.font})`;
  }, [settings.font]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center h-10 w-10 p-0">
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Settings</DialogTitle>
        <div className="flex flex-col gap-1">
          <Label htmlFor="color">Accent Color</Label>
          <div className="flex flex-row gap-1 w-full justify-center">
            <div className="w-10 h-10 rounded-full border bg-white cursor-pointer overflow-hidden -rotate-[35deg]" onClick={() => refetchSettings({...settings, accentColor: undefined})}>
              <div className="w-1/2 h-full bg-black"></div>
            </div>
            <div className="w-10 h-10 rounded-full border bg-red-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "red"})}></div>
            <div className="w-10 h-10 rounded-full border bg-orange-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "orange"})}></div>
            <div className="w-10 h-10 rounded-full border bg-lime-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "lime"})}></div>
            <div className="w-10 h-10 rounded-full border bg-emerald-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "emerald"})}></div>
            <div className="w-10 h-10 rounded-full border bg-cyan-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "cyan"})}></div>
            <div className="w-10 h-10 rounded-full border bg-blue-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "blue"})}></div>
            <div className="w-10 h-10 rounded-full border bg-violet-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "violet"})}></div>
            <div className="w-10 h-10 rounded-full border bg-fuchsia-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "fuchsia"})}></div>
            <div className="w-10 h-10 rounded-full border bg-rose-500 cursor-pointer" onClick={() => refetchSettings({...settings, accentColor: "rose"})}></div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="overdueHighlight">Highlight Overdue Assignments</Label>
          <Checkbox name="overdueHighlight" checked={settings?.overdueHighlight} onCheckedChange={(checked) => refetchSettings({...settings, overdueHighlight: checked as boolean})}/> 
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="balloons">Show Balloons Animation</Label>
          <Checkbox name="balloons" checked={settings?.balloons} onCheckedChange={(checked) => refetchSettings({...settings, balloons: checked as boolean})}/> 
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="font">Font</Label>
          <Select name="font" onValueChange={(value) => refetchSettings({...settings, font: value})} defaultValue={settings?.font}>
            <SelectTrigger>
              <SelectValue placeholder="Select a font."/>
            </SelectTrigger>
            <SelectContent>
              {fontFamilies.map((font, index) => (
                <SelectItem key={index} value={font.var}><span style={{fontFamily: `var(${font.var})`}}>{font.name}</span></SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsMenu;