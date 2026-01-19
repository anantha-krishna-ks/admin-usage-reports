import { useState } from "react";
import { Download, FileText, FileSpreadsheet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  onExport?: (format: "pdf" | "csv") => void;
}

export function ExportButton({ onExport }: ExportButtonProps) {
  const [exporting, setExporting] = useState<"pdf" | "csv" | null>(null);

  const handleExport = async (format: "pdf" | "csv") => {
    setExporting(format);
    
    // Simulate export delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    onExport?.(format);
    
    toast({
      title: "Export Complete",
      description: `Your ${format.toUpperCase()} report has been downloaded.`,
    });
    
    setExporting(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 shadow-sm hover:shadow-md transition-shadow">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 shadow-lg">
        <DropdownMenuItem 
          onClick={() => handleExport("pdf")}
          disabled={exporting !== null}
          className="gap-3 cursor-pointer"
        >
          {exporting === "pdf" ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <FileText className="h-4 w-4 text-destructive" />
          )}
          <span>Export as PDF</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleExport("csv")}
          disabled={exporting !== null}
          className="gap-3 cursor-pointer"
        >
          {exporting === "csv" ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          ) : (
            <FileSpreadsheet className="h-4 w-4 text-chart-2" />
          )}
          <span>Export as CSV</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
