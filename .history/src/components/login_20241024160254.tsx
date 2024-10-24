"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { LogIn, LogOut } from "lucide-react"

export default function Login() {
  const { data: session } = useSession()

  if (session) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <p className="mb-4 text-lg">Signed in as {session.user?.email}</p>
        <Button onClick={() => signOut()} className="bg-red-500 hover:bg-red-600">
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </motion.div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
        <CardDescription>Sign in to access the Water Bill Calculator</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button onClick={() => signIn("google")} className="w-full bg-blue-500 hover:bg-blue-600">
            <LogIn className="mr-2 h-4 w-4" /> Sign in with Google
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}