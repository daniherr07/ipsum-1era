"use client"

import React, { createContext, useContext } from 'react'

const ProtectedContext = createContext(undefined)

export const useProtectedContext = () => {
  const context = useContext(ProtectedContext)
  if (context === undefined) {
    throw new Error('useProtectedContext must be used within a ProtectedProvider')
  }
  return context
}

export const ProtectedProvider = ({ children, user }) => {
  return (
    <ProtectedContext.Provider value={ user }>
      {children}
    </ProtectedContext.Provider>
  )
}
