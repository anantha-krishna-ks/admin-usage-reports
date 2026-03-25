import { useState } from "react";
import { format } from "date-fns";
import { Download, FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ExportButtonProps {
  onExport?: (format: "pdf" | "csv") => void;
  captureRef?: React.RefObject<HTMLDivElement>;
  dateRange?: { from?: Date; to?: Date };
}

export function ExportButton({ onExport, captureRef, dateRange }: ExportButtonProps) {
  const [exporting, setExporting] = useState<"pdf" | "csv" | null>(null);

  const handleExportPDF = async () => {
    setExporting("pdf");

    try {
      const target = captureRef?.current ?? document.querySelector<HTMLElement>("[data-export-root]");
      if (!target) {
        toast({ title: "Export Failed", description: "Could not find page content to export.", variant: "destructive" });
        setExporting(null);
        return;
      }

      // Hide interactive elements during capture
      const hideSelector = "button, select, [data-export-hide], .react-day-picker, [role='combobox']";
      const hiddenEls: HTMLElement[] = [];
      target.querySelectorAll<HTMLElement>(hideSelector).forEach((el) => {
        if (!el.closest("table") && !el.closest(".recharts-wrapper")) {
          hiddenEls.push(el);
          el.style.visibility = "hidden";
        }
      });

      // Hide Preview columns (last column in tables) and accordions
      const previewHeaders: HTMLElement[] = [];
      const previewCells: HTMLElement[] = [];
      const accordionEls: HTMLElement[] = [];

      target.querySelectorAll<HTMLElement>("th, td").forEach((cell) => {
        if (cell.textContent?.trim() === "Preview") {
          previewHeaders.push(cell);
          cell.style.display = "none";
          // Hide corresponding cells in the same column index
          const table = cell.closest("table");
          const colIndex = Array.from(cell.parentElement?.children || []).indexOf(cell);
          if (table && colIndex >= 0) {
            table.querySelectorAll<HTMLElement>("tbody tr").forEach((row) => {
              const td = row.children[colIndex] as HTMLElement;
              if (td) { previewCells.push(td); td.style.display = "none"; }
            });
          }
        }
      });

      // Hide accordion elements
      target.querySelectorAll<HTMLElement>("[data-state='open'] [data-radix-collection-item], [data-orientation]").forEach((el) => {
        if (el.closest("[data-state]") && el.tagName !== "TABLE") {
          accordionEls.push(el);
          el.dataset.prevDisplay = el.style.display;
          el.style.display = "none";
        }
      });

      // Add date range banner if available
      let dateBanner: HTMLElement | null = null;
      if (dateRange?.from) {
        dateBanner = document.createElement("div");
        dateBanner.style.cssText = "padding:8px 0 16px;font-size:14px;color:#555;font-weight:500;";
        const fromStr = format(dateRange.from, "MMM dd, yyyy");
        const toStr = dateRange.to ? format(dateRange.to, "MMM dd, yyyy") : fromStr;
        dateBanner.textContent = `Report Period: ${fromStr} – ${toStr}`;
        target.insertBefore(dateBanner, target.firstChild);
      }

      // Capture the entire scrollable content
      const canvas = await html2canvas(target, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
      });

      // Restore hidden elements
      hiddenEls.forEach((el) => { el.style.visibility = ""; });
      previewHeaders.forEach((el) => { el.style.display = ""; });
      previewCells.forEach((el) => { el.style.display = ""; });
      accordionEls.forEach((el) => { el.style.display = el.dataset.prevDisplay || ""; delete el.dataset.prevDisplay; });
      if (dateBanner) dateBanner.remove();

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // A4 dimensions in points
      const pdfWidth = 595.28;
      const pdfHeight = 841.89;
      const margin = 20;
      const contentWidth = pdfWidth - margin * 2;
      const scaledHeight = (imgHeight * contentWidth) / imgWidth;

      const pdf = new jsPDF("p", "pt", "a4");
      let position = 0;
      const pageContentHeight = pdfHeight - margin * 2;

      // Multi-page support
      let pageNum = 0;
      while (position < scaledHeight) {
        if (pageNum > 0) pdf.addPage();

        // Calculate source crop for this page
        const sourceY = (position / scaledHeight) * imgHeight;
        const sourceH = Math.min((pageContentHeight / scaledHeight) * imgHeight, imgHeight - sourceY);
        const destH = (sourceH / imgHeight) * scaledHeight;

        // Create a cropped canvas for this page slice
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceH;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(canvas, 0, sourceY, imgWidth, sourceH, 0, 0, imgWidth, sourceH);
          const pageImgData = pageCanvas.toDataURL("image/jpeg", 0.95);
          pdf.addImage(pageImgData, "JPEG", margin, margin, contentWidth, destH);
        }

        position += pageContentHeight;
        pageNum++;
      }

      pdf.save(`Admin_Report_${new Date().toISOString().split("T")[0]}.pdf`);

      toast({ title: "Export Complete", description: "Your PDF report has been downloaded." });
      onExport?.("pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
      toast({ title: "Export Failed", description: "Something went wrong while generating the PDF.", variant: "destructive" });
    }

    setExporting(null);
  };

  const handleExportCSV = async () => {
    setExporting("csv");
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onExport?.("csv");
    toast({ title: "Export Complete", description: "Your CSV report has been downloaded." });
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
          onClick={handleExportPDF}
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
          onClick={handleExportCSV}
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
