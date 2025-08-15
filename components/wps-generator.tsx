"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  FileText, 
  Download, 
  Upload, 
  AlertCircle,
  CheckCircle,
  Clock,
  FileDown
} from "lucide-react"

interface WPSGeneratorProps {
  companyId: string
}

export function WPSGenerator({ companyId }: WPSGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGenerated, setLastGenerated] = useState<{
    fileName: string
    timestamp: string
    status: string
  } | null>(null)

  const handleGenerateSIF = async () => {
    setIsGenerating(true)
    
    try {
      // Mock API call - in real implementation, this would call the SIF generation API
      setTimeout(() => {
        const now = new Date()
        const timestamp = now.toISOString()
        const fileName = `SIF_10007230_CBQ_${now.toISOString().slice(0, 10).replace(/-/g, '')}_${now.toTimeString().slice(0, 5).replace(/:/g, '')}.csv`
        
        setLastGenerated({
          fileName,
          timestamp,
          status: "COMPLETED"
        })
        
        setIsGenerating(false)
        
        // In real implementation, this would download the file
        console.log("SIF file generated:", fileName)
      }, 2000)
    } catch (error) {
      console.error("Error generating SIF file:", error)
      setIsGenerating(false)
    }
  }

  const handleDownloadSIF = () => {
    if (lastGenerated) {
      // In real implementation, this would download the actual file
      const blob = new Blob([
        "Employer EID,File Date,File Time,Payer EID,Payer QID,Payer Bank,Payer IBAN,Salary Month,Total Salaries,Records,SIF Ver.\n" +
        "10007230,20240119,0952,44332211,,CBQ,QA87CBQA...93123456,202412,180775,9,1\n" +
        "Record QID,Visa ID,Worker Name,Worker Bank,Worker Account,Frequency,Work Days,Net Salary,Basic Salary,Overtime Hours,Extra Income,Deductions,Payment Type,Notes\n" +
        "000001,27822001001,Mustapha Abdullah,DBQ,QA26DOHB...123456,M,30,15000,15000,0,0,0,,\n" +
        "000002,28040000056,Jalal Oelberg,DBQ,QA26DOHB...123456,M,20,16000,24000,0,0,8000,,Deductions due to sick leave\n"
      ], { type: 'text/csv' })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = lastGenerated.fileName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "bg-green-100 text-green-800"
      case "PENDING": return "bg-yellow-100 text-yellow-800"
      case "FAILED": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED": return <CheckCircle className="h-4 w-4 text-green-600" />
      case "PENDING": return <Clock className="h-4 w-4 text-yellow-600" />
      case "FAILED": return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SIF File Generator</CardTitle>
            <CardDescription>
              Generate Standard Interchange Format (SIF) files for bank submissions
            </CardDescription>
          </div>
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* SIF Information */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            SIF files are used for bank submissions according to Qatar Central Bank specifications. 
            These files contain detailed payroll information for direct bank transfers.
          </AlertDescription>
        </Alert>

        {/* Generation Controls */}
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleGenerateSIF}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <Clock className="h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Generate SIF File
              </>
            )}
          </Button>
          
          {lastGenerated && (
            <Button 
              variant="outline"
              onClick={handleDownloadSIF}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download SIF
            </Button>
          )}
        </div>

        {/* Last Generated Status */}
        {lastGenerated && (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Last Generated File</h4>
              <div className="flex items-center gap-2">
                {getStatusIcon(lastGenerated.status)}
                <Badge className={getStatusColor(lastGenerated.status)}>
                  {lastGenerated.status}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">File Name:</span>
                <span className="font-medium">{lastGenerated.fileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Generated:</span>
                <span className="font-medium">
                  {new Date(lastGenerated.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SIF Format Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">SIF File Format</h4>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Header Section:</strong> Contains employer and payment information</p>
            <p><strong>Record Section:</strong> Contains individual employee payroll data</p>
            <p><strong>Format:</strong> CSV (Comma-Separated Values) with UTF-8 encoding</p>
            <p><strong>Compliance:</strong> Meets Qatar Central Bank SIF specifications</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="h-16 flex-col gap-2">
            <FileDown className="h-5 w-5" />
            <span className="text-sm">Download Template</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2">
            <FileText className="h-5 w-5" />
            <span className="text-sm">View Specifications</span>
          </Button>
          <Button variant="outline" className="h-16 flex-col gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">Validate File</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}