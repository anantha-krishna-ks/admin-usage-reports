import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface DrillDownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type: "precheck" | "during" | "post";
}

// Mock detailed data for each section
const preCheckDetailData = [
  { id: "ASM-001", candidate: "John Smith", eula: "32s", photoId: "1m 45s", roomScan: "1m 12s", proctorApproval: "2m 30s", total: "5m 59s", status: "completed" },
  { id: "ASM-002", candidate: "Emily Davis", eula: "28s", photoId: "2m 10s", roomScan: "1m 45s", proctorApproval: "3m 15s", total: "7m 38s", status: "completed" },
  { id: "ASM-003", candidate: "Michael Brown", eula: "45s", photoId: "3m 20s", roomScan: "2m 30s", proctorApproval: "5m 00s", total: "11m 35s", status: "delayed" },
  { id: "ASM-004", candidate: "Sarah Wilson", eula: "22s", photoId: "1m 30s", roomScan: "55s", proctorApproval: "1m 45s", total: "4m 32s", status: "completed" },
  { id: "ASM-005", candidate: "David Lee", eula: "38s", photoId: "4m 15s", roomScan: "3m 20s", proctorApproval: "6m 30s", total: "14m 43s", status: "flagged" },
  { id: "ASM-006", candidate: "Jessica Taylor", eula: "25s", photoId: "1m 55s", roomScan: "1m 20s", proctorApproval: "2m 45s", total: "6m 25s", status: "completed" },
  { id: "ASM-007", candidate: "Robert Martinez", eula: "40s", photoId: "2m 30s", roomScan: "1m 50s", proctorApproval: "3m 30s", total: "8m 30s", status: "completed" },
  { id: "ASM-008", candidate: "Amanda White", eula: "35s", photoId: "1m 40s", roomScan: "1m 15s", proctorApproval: "2m 20s", total: "5m 50s", status: "completed" },
];

const duringDetailData = [
  { id: "ASM-001", candidate: "John Smith", highFlags: 1, mediumFlags: 3, autoPauses: 0, proctorPauses: 0, roomScans: 1, terminated: false },
  { id: "ASM-002", candidate: "Emily Davis", highFlags: 0, mediumFlags: 2, autoPauses: 1, proctorPauses: 0, roomScans: 2, terminated: false },
  { id: "ASM-003", candidate: "Michael Brown", highFlags: 4, mediumFlags: 8, autoPauses: 3, proctorPauses: 2, roomScans: 4, terminated: false },
  { id: "ASM-004", candidate: "Sarah Wilson", highFlags: 0, mediumFlags: 1, autoPauses: 0, proctorPauses: 0, roomScans: 1, terminated: false },
  { id: "ASM-005", candidate: "David Lee", highFlags: 6, mediumFlags: 12, autoPauses: 4, proctorPauses: 3, roomScans: 5, terminated: true },
  { id: "ASM-006", candidate: "Jessica Taylor", highFlags: 2, mediumFlags: 4, autoPauses: 1, proctorPauses: 1, roomScans: 2, terminated: false },
  { id: "ASM-007", candidate: "Robert Martinez", highFlags: 1, mediumFlags: 2, autoPauses: 0, proctorPauses: 0, roomScans: 1, terminated: false },
  { id: "ASM-008", candidate: "Amanda White", highFlags: 0, mediumFlags: 3, autoPauses: 1, proctorPauses: 0, roomScans: 2, terminated: false },
];

const postDetailData = [
  { id: "ASM-001", candidate: "John Smith", reviewTime: "3m 15s", approvalTime: "8m 20s", status: "approved", method: "auto" },
  { id: "ASM-002", candidate: "Emily Davis", reviewTime: "4m 30s", approvalTime: "12m 45s", status: "approved", method: "manual" },
  { id: "ASM-003", candidate: "Michael Brown", reviewTime: "8m 15s", approvalTime: "25m 30s", status: "analysis", method: "pending" },
  { id: "ASM-004", candidate: "Sarah Wilson", reviewTime: "2m 45s", approvalTime: "6m 10s", status: "approved", method: "auto" },
  { id: "ASM-005", candidate: "David Lee", reviewTime: "12m 30s", approvalTime: "-", status: "rejected", method: "manual" },
  { id: "ASM-006", candidate: "Jessica Taylor", reviewTime: "5m 20s", approvalTime: "15m 40s", status: "approved", method: "manual" },
  { id: "ASM-007", candidate: "Robert Martinez", reviewTime: "3m 50s", approvalTime: "9m 30s", status: "approved", method: "auto" },
  { id: "ASM-008", candidate: "Amanda White", reviewTime: "4m 10s", approvalTime: "11m 15s", status: "approved", method: "auto" },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; label: string }> = {
    completed: { variant: "default", label: "Completed" },
    delayed: { variant: "secondary", label: "Delayed" },
    flagged: { variant: "destructive", label: "Flagged" },
    approved: { variant: "default", label: "Approved" },
    rejected: { variant: "destructive", label: "Rejected" },
    analysis: { variant: "secondary", label: "Analysis Required" },
    auto: { variant: "outline", label: "Auto" },
    manual: { variant: "secondary", label: "Manual" },
    pending: { variant: "outline", label: "Pending" },
  };
  const config = variants[status] || { variant: "outline" as const, label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
};

export function DrillDownModal({ open, onOpenChange, title, description, type }: DrillDownModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          {type === "precheck" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Assessment ID</TableHead>
                  <TableHead className="font-semibold">Candidate</TableHead>
                  <TableHead className="font-semibold">EULA</TableHead>
                  <TableHead className="font-semibold">Photo ID</TableHead>
                  <TableHead className="font-semibold">Room Scan</TableHead>
                  <TableHead className="font-semibold">Proctor Approval</TableHead>
                  <TableHead className="font-semibold">Total Time</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {preCheckDetailData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.candidate}</TableCell>
                    <TableCell>{row.eula}</TableCell>
                    <TableCell>{row.photoId}</TableCell>
                    <TableCell>{row.roomScan}</TableCell>
                    <TableCell>{row.proctorApproval}</TableCell>
                    <TableCell className="font-medium">{row.total}</TableCell>
                    <TableCell>{getStatusBadge(row.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {type === "during" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Assessment ID</TableHead>
                  <TableHead className="font-semibold">Candidate</TableHead>
                  <TableHead className="font-semibold text-center">High Flags</TableHead>
                  <TableHead className="font-semibold text-center">Medium Flags</TableHead>
                  <TableHead className="font-semibold text-center">Auto Pauses</TableHead>
                  <TableHead className="font-semibold text-center">Proctor Pauses</TableHead>
                  <TableHead className="font-semibold text-center">Room Scans</TableHead>
                  <TableHead className="font-semibold">Terminated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {duringDetailData.map((row) => (
                  <TableRow key={row.id} className={cn("hover:bg-muted/30", row.terminated && "bg-destructive/5")}>
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.candidate}</TableCell>
                    <TableCell className={cn("text-center", row.highFlags > 3 && "text-destructive font-semibold")}>{row.highFlags}</TableCell>
                    <TableCell className={cn("text-center", row.mediumFlags > 6 && "text-chart-3 font-semibold")}>{row.mediumFlags}</TableCell>
                    <TableCell className="text-center">{row.autoPauses}</TableCell>
                    <TableCell className="text-center">{row.proctorPauses}</TableCell>
                    <TableCell className="text-center">{row.roomScans}</TableCell>
                    <TableCell>
                      {row.terminated ? (
                        <Badge variant="destructive">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {type === "post" && (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">Assessment ID</TableHead>
                  <TableHead className="font-semibold">Candidate</TableHead>
                  <TableHead className="font-semibold">Review Time</TableHead>
                  <TableHead className="font-semibold">Approval Time</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Method</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {postDetailData.map((row) => (
                  <TableRow key={row.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{row.id}</TableCell>
                    <TableCell>{row.candidate}</TableCell>
                    <TableCell>{row.reviewTime}</TableCell>
                    <TableCell>{row.approvalTime}</TableCell>
                    <TableCell>{getStatusBadge(row.status)}</TableCell>
                    <TableCell>{getStatusBadge(row.method)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
