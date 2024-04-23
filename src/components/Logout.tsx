'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'

type Props = {
  text: string
}

const Logout = (props: Props) => {
  return (
    <Button onClick={() => signOut().catch(console.error)}>
      {props.text}
    </Button>
  )
}

export default Logout