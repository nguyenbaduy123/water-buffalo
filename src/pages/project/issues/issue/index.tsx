import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

const Issue: NextPage = () => {
  const router = useRouter()

  const { issue_id } = router.query

  return <div>Issue</div>
}

export default Issue
