"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, GripVertical, Image as ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface HeroSlide {
  _id: string
  title: string
  subtitle: string
  description: string
  image: string
  buttonText: string
  buttonLink: string
  secondaryButtonText: string
  secondaryButtonLink: string
  badge: string
  features: Array<{ icon: string; text: string }>
  isActive: boolean
  order: number
}

export default function HeroSlidesAdmin() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    buttonText: "",
    buttonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    badge: "",
    features: [
      { icon: "Shield", text: "Secure Payments" },
      { icon: "Truck", text: "Fast Delivery" },
      { icon: "CheckCircle", text: "Quality Guaranteed" }
    ]
  })

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/hero-slides')
      const data = await response.json()
      if (data.success) {
        setSlides(data.slides)
      }
    } catch (error) {
      console.error('Error fetching slides:', error)
      toast({
        title: "Error",
        description: "Failed to fetch hero slides",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingSlide 
        ? `/api/hero-slides/${editingSlide._id}`
        : '/api/hero-slides'
      
      const method = editingSlide ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: editingSlide ? "Slide updated successfully" : "Slide created successfully",
        })
        setIsDialogOpen(false)
        setEditingSlide(null)
        resetForm()
        fetchSlides()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error saving slide:', error)
      toast({
        title: "Error",
        description: "Failed to save slide",
        variant: "destructive"
      })
    }
  }

  const handleDelete = async (slideId: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return
    
    try {
      const response = await fetch(`/api/hero-slides/${slideId}`, {
        method: 'DELETE',
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: "Slide deleted successfully",
        })
        fetchSlides()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error deleting slide:', error)
      toast({
        title: "Error",
        description: "Failed to delete slide",
        variant: "destructive"
      })
    }
  }

  const handleEdit = (slide: HeroSlide) => {
    setEditingSlide(slide)
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      secondaryButtonText: slide.secondaryButtonText,
      secondaryButtonLink: slide.secondaryButtonLink,
      badge: slide.badge,
      features: slide.features
    })
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      buttonText: "",
      buttonLink: "",
      secondaryButtonText: "",
      secondaryButtonLink: "",
      badge: "",
      features: [
        { icon: "Shield", text: "Secure Payments" },
        { icon: "Truck", text: "Fast Delivery" },
        { icon: "CheckCircle", text: "Quality Guaranteed" }
      ]
    })
  }

  const openCreateDialog = () => {
    setEditingSlide(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const handleSeedSlides = async () => {
    if (!confirm('This will create default hero slides. Continue?')) return
    
    try {
      const response = await fetch('/api/hero-slides/seed', {
        method: 'POST',
      })

      const data = await response.json()
      
      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        })
        fetchSlides()
      } else {
        throw new Error(data.message || data.error)
      }
    } catch (error) {
      console.error('Error seeding slides:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to seed slides",
        variant: "destructive"
      })
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Hero Slides Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSeedSlides}>
            Seed Default Slides
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Add New Slide
              </Button>
            </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? 'Edit Hero Slide' : 'Create New Hero Slide'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="buttonText">Primary Button Text</Label>
                  <Input
                    id="buttonText"
                    value={formData.buttonText}
                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="buttonLink">Primary Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={formData.buttonLink}
                    onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="secondaryButtonText">Secondary Button Text</Label>
                  <Input
                    id="secondaryButtonText"
                    value={formData.secondaryButtonText}
                    onChange={(e) => setFormData({ ...formData, secondaryButtonText: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryButtonLink">Secondary Button Link</Label>
                  <Input
                    id="secondaryButtonLink"
                    value={formData.secondaryButtonLink}
                    onChange={(e) => setFormData({ ...formData, secondaryButtonLink: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="badge">Badge Text</Label>
                <Input
                  id="badge"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  required
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {editingSlide ? 'Update Slide' : 'Create Slide'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        </div>
      </div>

      <div className="grid gap-6">
        {slides.map((slide, index) => (
          <Card key={slide._id} className="relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <GripVertical className="h-5 w-5 text-gray-400" />
                  <Badge variant="secondary">Order: {slide.order}</Badge>
                  <Badge variant={slide.isActive ? "default" : "secondary"}>
                    {slide.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(slide)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(slide._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{slide.title}</h3>
                    <p className="text-lg text-gray-600">{slide.subtitle}</p>
                  </div>
                  <p className="text-gray-700">{slide.description}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline">{slide.badge}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Primary Button:</strong> {slide.buttonText} → {slide.buttonLink}
                    </div>
                    <div>
                      <strong>Secondary Button:</strong> {slide.secondaryButtonText} → {slide.secondaryButtonLink}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {slide.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">
                        {feature.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
} 