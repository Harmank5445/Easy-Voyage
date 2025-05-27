"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download } from "lucide-react";
import axios from "axios";

export function ExportDialog({ itineraryId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axios.get(`/api/itinerary/export?id=${itineraryId}&format=${format}`);
      
      // Create and download file
      const blob = new Blob([JSON.stringify(response.data)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `itinerary-${itineraryId}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      
      setIsOpen(false);
    } catch (error) {
      console.error("Error exporting itinerary:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Itinerary</DialogTitle>
            <DialogDescription>
              Choose a format to export your itinerary
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Document</SelectItem>
                <SelectItem value="json">JSON File</SelectItem>
                <SelectItem value="csv">CSV Spreadsheet</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              onClick={handleExport} 
              disabled={isExporting}
              className="w-full"
            >
              {isExporting ? "Exporting..." : "Export Itinerary"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}