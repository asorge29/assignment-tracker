'use client'

import { Check, Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSettingsContext } from "@/app/(main)/assignments/context";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center h-10 w-10 p-0">
          <Settings2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-2">
        <DialogTitle className="w-full max-w-full">Settings</DialogTitle>
        <div className="flex flex-col gap-1 w-full max-w-full">
          <Label htmlFor="color">Accent Color</Label>
          <div className="flex flex-row gap-1 overflow-x-auto overflow-y-hidden" style={{msOverflowStyle: "none", scrollbarWidth: "none"}}>
            <div className="relative w-10 h-10 rounded-full border bg-white cursor-pointer overflow-hidden -rotate-[35deg] flex items-center flex-shrink-0 justify-center" onClick={() => refetchSettings({...settings, accentColor: undefined})}>
              <div className="w-1/2 h-full bg-black absolute left-0"></div>
              {settings?.accentColor === undefined && <Check className="rotate-[35deg] text-gray-500" />}
            </div>
            <div className="w-10 h-10 rounded-full border bg-red-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "red"})}>{settings?.accentColor === "red" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-orange-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "orange"})}>{settings?.accentColor === "orange" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-lime-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "lime"})}>{settings?.accentColor === "lime" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-emerald-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "emerald"})}>{settings?.accentColor === "emerald" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-cyan-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "cyan"})}>{settings?.accentColor === "cyan" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-blue-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "blue"})}>{settings?.accentColor === "blue" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-violet-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "violet"})}>{settings?.accentColor === "violet" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-fuchsia-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "fuchsia"})}>{settings?.accentColor === "fuchsia" && <Check/>}</div>
            <div className="w-10 h-10 rounded-full border bg-rose-500 cursor-pointer flex justify-center items-center flex-shrink-0" onClick={() => refetchSettings({...settings, accentColor: "rose"})}>{settings?.accentColor === "rose" && <Check/>}</div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center w-full max-w-full">
          <Label htmlFor="overdueHighlight">Highlight Overdue Assignments</Label>
          <Checkbox name="overdueHighlight" checked={settings?.overdueHighlight} onCheckedChange={(checked) => refetchSettings({...settings, overdueHighlight: checked as boolean})}/> 
        </div>
        <div className="flex flex-row gap-2 items-center w-full max-w-full">
          <Label htmlFor="balloons">Show Balloons Animation</Label>
          <Checkbox name="balloons" checked={settings?.balloons} onCheckedChange={(checked) => refetchSettings({...settings, balloons: checked as boolean})}/> 
        </div>
        <div className="flex flex-col gap-1 w-full max-w-full">
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