"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Camera, Upload, Download, RotateCcw, ZoomIn, ZoomOut, Move, Video } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/hooks/use-analytics"
import Image from "next/image"

interface VirtualTryOnProps {
  product: {
    id: string
    name: string
    price: number
    image: string
    category: string
  }
  trigger?: React.ReactNode
}

export function VirtualTryOn({ product, trigger }: VirtualTryOnProps) {
  const { toast } = useToast()
  const { trackUserAction } = useAnalytics()
  const [isOpen, setIsOpen] = useState(false)
  const [userImage, setUserImage] = useState<string | null>(null)
  const [dressImage, setDressImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [brightness, setBrightness] = useState(1)
  const [contrast, setContrast] = useState(1)
  const [showCamera, setShowCamera] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [cameraLoading, setCameraLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file (JPEG, PNG, etc.)",
        variant: "destructive"
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setUserImage(e.target?.result as string)
      trackUserAction('virtual_try_on_upload', { product_id: product.id, product_name: product.name })
    }
    reader.readAsDataURL(file)
  }, [product, toast, trackUserAction])

  const startCamera = async () => {
    setCameraLoading(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      setCameraStream(stream)
      setShowCamera(true)
      
      // Wait for the next render cycle to ensure the video element exists
      setTimeout(() => {
        if (cameraRef.current) {
          cameraRef.current.srcObject = stream
          cameraRef.current.onloadedmetadata = () => {
            cameraRef.current?.play()
            setCameraLoading(false)
          }
        }
      }, 100)
    } catch (error) {
      console.error('Error accessing camera:', error)
      setCameraLoading(false)
      toast({
        title: "Camera Access Error",
        description: "Please allow camera access or upload a photo instead",
        variant: "destructive"
      })
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop())
      setCameraStream(null)
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (!cameraRef.current) return

    const canvas = document.createElement('canvas')
    const video = cameraRef.current
    
    // Wait for video to be ready
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      toast({
        title: "Camera Not Ready",
        description: "Please wait a moment for the camera to initialize",
        variant: "destructive"
      })
      return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    if (ctx) {
      // Mirror the captured image to match the preview
      ctx.scale(-1, 1)
      ctx.translate(-canvas.width, 0)
      ctx.drawImage(video, 0, 0)
      
      const imageData = canvas.toDataURL('image/jpeg', 0.9)
      setUserImage(imageData)
      trackUserAction('virtual_try_on_camera_capture', { product_id: product.id, product_name: product.name })
      stopCamera()
      
      toast({
        title: "Photo Captured!",
        description: "Your photo has been captured successfully",
      })
    }
  }

  const handleCameraCapture = () => {
    startCamera()
  }

  const processVirtualTryOn = async () => {
    if (!userImage || !product.image) return

    setIsProcessing(true)
    trackUserAction('virtual_try_on_process', { product_id: product.id, product_name: product.name })

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For demo purposes, we'll create a simple overlay effect
      // In a real implementation, you'd use AI/ML services for proper virtual try-on
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

             // Load user image
       const userImg = new window.Image()
       userImg.onload = () => {
         // Set canvas size
         canvas.width = userImg.width
         canvas.height = userImg.height

         // Draw user image
         ctx.drawImage(userImg, 0, 0)

         // Load dress image
         const dressImg = new window.Image()
        dressImg.onload = () => {
          // Calculate dress position and size
          const dressWidth = userImg.width * 0.6
          const dressHeight = (dressImg.height / dressImg.width) * dressWidth
          const dressX = (userImg.width - dressWidth) / 2
          const dressY = userImg.height * 0.3

          // Apply filters
          ctx.filter = `brightness(${brightness}) contrast(${contrast})`
          
          // Draw dress with transformations
          ctx.save()
          ctx.translate(dressX + dressWidth/2, dressY + dressHeight/2)
          ctx.rotate((rotation * Math.PI) / 180)
          ctx.scale(scale, scale)
          ctx.drawImage(dressImg, -dressWidth/2, -dressHeight/2, dressWidth, dressHeight)
          ctx.restore()

          // Get the result
          const resultImage = canvas.toDataURL('image/jpeg', 0.9)
          setDressImage(resultImage)
          setIsProcessing(false)

          toast({
            title: "Virtual Try-On Complete!",
            description: "See how you look in this beautiful dress!",
          })
        }
        dressImg.src = product.image
      }
      userImg.src = userImage

    } catch (error) {
      console.error('Error processing virtual try-on:', error)
      setIsProcessing(false)
      toast({
        title: "Error",
        description: "Failed to process virtual try-on. Please try again.",
        variant: "destructive"
      })
    }
  }

  const resetAdjustments = () => {
    setPosition({ x: 50, y: 50 })
    setScale(1)
    setRotation(0)
    setBrightness(1)
    setContrast(1)
  }

  const downloadImage = () => {
    if (!dressImage) return

    const link = document.createElement('a')
    link.download = `virtual-try-on-${product.name.replace(/\s+/g, '-').toLowerCase()}.jpg`
    link.href = dressImage
    link.click()

    trackUserAction('virtual_try_on_download', { product_id: product.id, product_name: product.name })
  }

  const handleOpen = () => {
    setIsOpen(true)
    trackUserAction('virtual_try_on_open', { product_id: product.id, product_name: product.name })
  }

  // Cleanup camera when dialog closes
  useEffect(() => {
    if (!isOpen) {
      stopCamera()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" onClick={handleOpen}>
            <Camera className="h-4 w-4 mr-2" />
            Try On Virtually
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Virtual Try-On: {product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Upload Section */}
          {!userImage && !showCamera && (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Photo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Upload a clear photo of yourself to see how this dress looks on you!
                </p>
                
                <div className="flex gap-4">
                  <Button onClick={handleCameraCapture} className="flex-1">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Photo
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                <div className="text-xs text-gray-500">
                  <p>• Use a clear, well-lit photo</p>
                  <p>• Face the camera directly</p>
                  <p>• Maximum file size: 5MB</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Camera Section */}
          {showCamera && (
            <Card>
              <CardHeader>
                <CardTitle>Take Your Photo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  {cameraLoading ? (
                    <div className="w-full h-64 bg-gray-100 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Initializing camera...</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={cameraRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                        style={{ transform: 'scaleX(-1)' }} // Mirror the video for selfie effect
                      />
                      <div className="absolute inset-0 border-4 border-blue-500 border-dashed rounded-lg pointer-events-none"></div>
                    </>
                  )}
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={capturePhoto} 
                    className="flex-1"
                    disabled={cameraLoading}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    {cameraLoading ? "Initializing..." : "Capture Photo"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={stopCamera} 
                    className="flex-1"
                    disabled={cameraLoading}
                  >
                    Cancel
                  </Button>
                </div>

                <div className="text-xs text-gray-500">
                  <p>• Position yourself in the center</p>
                  <p>• Ensure good lighting</p>
                  <p>• Look directly at the camera</p>
                  {cameraLoading && <p className="text-blue-600">• Please wait for camera to initialize</p>}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing Section */}
          {userImage && !dressImage && (
            <Card>
              <CardHeader>
                <CardTitle>Adjust Your Photo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2">Brightness</h4>
                    <Slider
                      value={[brightness]}
                      onValueChange={(value) => setBrightness(value[0])}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium mb-2">Contrast</h4>
                    <Slider
                      value={[contrast]}
                      onValueChange={(value) => setContrast(value[0])}
                      min={0.5}
                      max={1.5}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={processVirtualTryOn} disabled={isProcessing}>
                    {isProcessing ? "Processing..." : "Try On Dress"}
                  </Button>
                  <Button variant="outline" onClick={resetAdjustments}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {isProcessing && (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Processing your virtual try-on...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Result Section */}
          {dressImage && (
            <Card>
              <CardHeader>
                <CardTitle>Your Virtual Try-On Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Image
                    src={dressImage}
                    alt={`Virtual try-on of ${product.name}`}
                    width={400}
                    height={600}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    AI Generated
                  </Badge>
                </div>

                <div className="flex gap-4">
                  <Button onClick={downloadImage} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Image
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setUserImage(null)
                      setDressImage(null)
                    }}
                  >
                    Try Another Photo
                  </Button>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">How does it work?</h4>
                  <p className="text-sm text-blue-800">
                    Our AI analyzes your photo and overlays the dress to show you how it would look. 
                    The result is a realistic preview of you wearing this beautiful dress!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Hidden canvas for processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </DialogContent>
    </Dialog>
  )
} 