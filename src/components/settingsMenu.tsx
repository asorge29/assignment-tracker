'use client'

import { Settings2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { useSettingsContext } from "@/app/(main)/assignments/context";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";


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

  // useEffect(() => {
  //   const body = document.body;
  //   if (settings.accentColor) {
  //     body.className = body.className.replace(/bg-\w+-50/, "");
  //     body.className += ` bg-${settings.accentColor}-50`;
  //   } else {
  //     body.className = body.className.replace(/bg-\w+-50/, "");
  //   }
  // }, [settings.accentColor]);

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
        <span className="bg-red-50 bg-orange-50 bg-lime-50 bg-emerald-50 bg-cyan-50 bg-blue-50 bg-violet-50 bg-fuchsia-50 bg-rose-50 hidden"></span>
        <span className="bg-red-950 bg-orange-950 bg-lime-950 bg-emerald-950 bg-cyan-950 bg-blue-950 bg-violet-950 bg-fuchsia-950 bg-rose-950 hidden"></span>
        <div className="flex flex-col gap-1">
          <Label htmlFor="color">Accent Color</Label>
          <div className="flex flex-row gap-1 w-full justify-center">
            <div className="w-10 h-10 rounded-full border bg-white cursor-pointer overflow-hidden -rotate-[35deg]" onClick={() => setSettings({...settings, accentColor: undefined})}>
              <div className="w-1/2 h-full bg-black"></div>
            </div>
            <div className="w-10 h-10 rounded-full border bg-red-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "red"})}></div>
            <div className="w-10 h-10 rounded-full border bg-orange-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "orange"})}></div>
            <div className="w-10 h-10 rounded-full border bg-lime-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "lime"})}></div>
            <div className="w-10 h-10 rounded-full border bg-emerald-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "emerald"})}></div>
            <div className="w-10 h-10 rounded-full border bg-cyan-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "cyan"})}></div>
            <div className="w-10 h-10 rounded-full border bg-blue-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "blue"})}></div>
            <div className="w-10 h-10 rounded-full border bg-violet-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "violet"})}></div>
            <div className="w-10 h-10 rounded-full border bg-fuchsia-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "fuchsia"})}></div>
            <div className="w-10 h-10 rounded-full border bg-rose-500 cursor-pointer" onClick={() => setSettings({...settings, accentColor: "rose"})}></div>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="overdueHighlight">Highlight Overdue Assignments</Label>
          <Checkbox name="overdueHighlight" checked={settings?.overdueHighlight} onCheckedChange={(checked) => setSettings({...settings, overdueHighlight: checked as boolean})}/> 
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Label htmlFor="balloons">Show Balloons Animation</Label>
          <Checkbox name="balloons" checked={settings?.balloons} onCheckedChange={(checked) => setSettings({...settings, balloons: checked as boolean})}/> 
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="font">Font</Label>
          <Select name="font" onValueChange={(value) => setSettings({...settings, font: value})} defaultValue={settings?.font}>
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