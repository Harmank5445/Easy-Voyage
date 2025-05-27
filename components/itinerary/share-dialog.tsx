"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";
import axios from "axios";

export function ShareDialog({ itineraryId, onShare }) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      await axios.post("/api/itinerary/share", {
        itineraryId,
        email
      });
      onShare?.();
      setIsOpen(false);
    } catch (error) {
      console.error("Error sharing itinerary:", error);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} variant="outline" size="sm">
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Itinerary</DialogTitle>
            <DialogDescription>
              Share your itinerary with others via email
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button 
              onClick={handleShare} 
              disabled={!email || isSharing}
              className="w-full"
            >
              {isSharing ? "Sharing..." : "Share Itinerary"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}