"use client"

import { useSession } from "next-auth/react"

export function SessionDebug() {
  const { data: session, status } = useSession()

  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <div className="font-bold mb-2">Session Debug</div>
      <div>Status: {status}</div>
      <div>Session: {session ? 'Yes' : 'No'}</div>
      {session?.user && (
        <>
          <div>User ID: {session.user.id}</div>
          <div>Email: {session.user.email}</div>
          <div>Name: {session.user.name}</div>
          <div>Admin: {session.user.isAdmin ? 'Yes' : 'No'}</div>
        </>
      )}
    </div>
  )
} 