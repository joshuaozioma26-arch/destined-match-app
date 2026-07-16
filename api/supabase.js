// api/supabase.js
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  )

  try {
    const { action, data } = req.body

    if (action === 'register') {
      const { error } = await supabase.from('profiles').insert([data])
      if (error) return res.status(400).json({ error: error.message })
      return res.status(200).json({ success: true, data })
    }

    if (action === 'login') {
      const { destId } = data
      const { data: user, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('dest_id', destId)
        .single()
      
      if (error || !user) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.status(200).json({ success: true, user })
    }

    if (action === 'getProfile') {
      const { destId } = data
      const { data: user, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('dest_id', destId)
        .single()
      
      if (error || !user) {
        return res.status(404).json({ error: 'User not found' })
      }
      return res.status(200).json({ success: true, user })
    }

    return res.status(400).json({ error: 'Invalid action' })

  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
