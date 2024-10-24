"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/app/providers"
import dynamic from 'next/dynamic'

const Button = dynamic(() => import("@/components/ui/button").then(mod => mod.Button))
const Input = dynamic(() => import("@/components/ui/input").then(mod => mod.Input))
const Label = dynamic(() => import("@/components/ui/label").then(mod => mod.Label))
const Card = dynamic(() => import("@/components/ui/card").then(mod => mod.Card))
const CardContent = dynamic(() => import("@/components/ui/card").then(mod => mod.CardContent))
const CardDescription = dynamic(() => import("@/components/ui/card").then(mod => mod.CardDescription))
const CardFooter = dynamic(() => import("@/components/ui/card").then(mod => mod.CardFooter))
const CardHeader = dynamic(() => import("@/components/ui/card").then(mod => mod.CardHeader))
const CardTitle = dynamic(() => import("@/components/ui/card").then(mod => mod.CardTitle))
const Select = dynamic(() => import("@/components/ui/select").then(mod => mod.Select))
const SelectContent = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectContent))
const SelectItem = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectItem))
const SelectTrigger = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectTrigger))
const SelectValue = dynamic(() => import("@/components/ui/select").then(mod => mod.SelectValue))

import { motion } from "framer-motion"
import { Droplet } from "lucide-react"
import Login from "./login.tsx"
import { tiers, calculateBill, TierBreakdown, Meter } from "./utils"

export default function WaterBillCalculator() {
  const { session } = useAuth()
  const [meters, setMeters] = useState<Meter[]>([])
  const [selectedMeter, setSelectedMeter] = useState("")
  const [closingReading, setClosingReading] = useState("")
  const [bill, setBill] = useState<number | null>(null)
  const [previousReading, setPreviousReading] = useState<number | null>(null)
  const [tierBreakdown, setTierBreakdown] = useState<TierBreakdown[]>([])
  const [totalUsage, setTotalUsage] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      fetchMeters()
    }
  }, [session])

  useEffect(() => {
    if (selectedMeter) {
      fetchPreviousReading(selectedMeter)
    }
  }, [selectedMeter])

  const fetchMeters = async () => {
    try {
      const response = await fetch('/api/meters')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setMeters(data)
      setError(null)
    } catch (error) {
      console.error('Error fetching meters:', error)
      setMeters([])
      setError('Failed to fetch meters. Please try again later.')
    }
  }

  const fetchPreviousReading = async (meterId: string) => {
    try {
      const response = await fetch(`/api/meters/${meterId}/previous-reading`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setPreviousReading(data.previousReading)
      setError(null)
    } catch (error) {
      console.error('Error fetching previous reading:', error)
      setPreviousReading(null)
      setError('Failed to fetch previous reading. Please try again later.')
    }
  }

  const handleMeterChange = (value: string) => {
    setSelectedMeter(value)
    setClosingReading("")
    setBill(null)
    setTierBreakdown([])
    setTotalUsage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const meter = meters.find(m => m.id === selectedMeter)
    if (meter) {
      const usage = parseInt(closingReading) - meter.currentReading
      const { totalCost, breakdown } = calculateBill(usage)
      setBill(totalCost)
      setTierBreakdown(breakdown)
      setTotalUsage(usage)

      // Save the new reading and bill to the database
      await fetch('/api/readings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meterId: selectedMeter,
          reading: parseInt(closingReading),
          amount: totalCost,
          usage: usage
        })
      })

      // Update the meter's current reading
      await fetch(`/api/meters/${selectedMeter}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentReading: parseInt(closingReading) })
      })

      // Refresh the meters list
      fetchMeters()
    }
  }

  if (!session) {
    return <Login />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="bg-blue-500 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold">Water Bill Calculator</CardTitle>
          <CardDescription className="text-blue-100">Calculate your water bill easily</CardDescription>
        </CardHeader>
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="meterSelect" className="text-lg font-medium text-gray-700">
                Select Meter
              </Label>
              <Select value={selectedMeter} onValueChange={handleMeterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a meter" />
                </SelectTrigger>
                <SelectContent>
                  {meters.map((meter) => (
                    <SelectItem key={meter.id} value={meter.id}>
                      {meter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {previousReading !== null && (
              <div className="mt-4">
                <Label>Previous Reading</Label>
                <Input value={previousReading.toString()} disabled />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="closingReading" className="text-lg font-medium text-gray-700">
                Closing Meter Reading
              </Label>
              <Input
                id="closingReading"
                type="number"
                placeholder="Enter closing reading"
                value={closingReading}
                onChange={(e) => setClosingReading(e.target.value)}
                className="text-lg p-6"
                required
              />
            </div>
            <Button type="submit" className="w-full text-lg py-6 bg-blue-500 hover:bg-blue-600 transition-colors">
              Calculate Bill
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {bill !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center w-full bg-green-100 rounded-lg p-4 mt-4"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-800">Your Water Bill</h3>
              <p className="text-3xl font-bold text-green-600">R{bill.toFixed(2)}</p>
              {totalUsage !== null && (
                <p className="text-lg text-green-700 mt-2">Total Usage: {totalUsage} kL</p>
              )}
            </motion.div>
          )}
          {tierBreakdown.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full mt-4 bg-white rounded-lg p-4 shadow"
            >
              <h4 className="text-lg font-semibold mb-2 text-gray-700">Tier Levels and Breakdown</h4>
              {tiers.map((tier, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center">
                      <Droplet className={`mr-2 ${index === 0 ? 'text-blue-500' : index === 1 ? 'text-blue-600' : 'text-blue-700'}`} />
                      <span className="text-gray-700 font-medium">Tier {tier.level}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">
                        {index === 0 ? `0 - ${tier.limit}` : index === tiers.length - 1 ? `${tiers[index-1].limit + 1}+` : `${tiers[index-1].limit + 1} - ${tier.limit}`} kL
                      </p>
                      <p className="font-medium text-gray-800">R{(tier.rate / 100).toFixed(2)}/kL</p>
                    </div>
                  </div>
                  {tierBreakdown[index] && tierBreakdown[index].usage > 0 && (
                    <div className="mt-2 pl-6 text-sm text-gray-600">
                      <p>Usage: {tierBreakdown[index].usage} kL</p>
                      <p>Cost: R{tierBreakdown[index].cost.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </CardFooter>
      </Card>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  )
}
