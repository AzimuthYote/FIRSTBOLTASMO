import React, { useState } from 'react'
import { Settings, Plus } from 'lucide-react'

function App() {
  const [workspaces, setWorkspaces] = useState<Array<{ id: string, name: string, threads: string[] }>>([])

  const createWorkspace = () => {
    const newWorkspace = {
      id: crypto.randomUUID(),
      name: 'New Workspace',
      threads: []
    }
    setWorkspaces([...workspaces, newWorkspace])
  }

  const createThread = (workspaceId: string) => {
    setWorkspaces(workspaces.map(ws => 
      ws.id === workspaceId ? { ...ws, threads: [...ws.threads, `Thread ${ws.threads.length + 1}`] } : ws
    ))
  }

  return (
    <div className="flex h-screen bg-[#2E0249] text-white">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r border-[#00FFFF]">
        <button
          onClick={createWorkspace}
          className="w-full p-2 mb-4 bg-[#00FF00] text-[#2E0249] rounded hover:bg-[#00FFFF] transition-colors"
        >
          New Workspace
        </button>

        {workspaces.map(workspace => (
          <div key={workspace.id} className="mb-4 p-2 rounded bg-[#2E0249]/50">
            <div className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={workspace.name}
                onChange={(e) => setWorkspaces(workspaces.map(ws => 
                  ws.id === workspace.id ? { ...ws, name: e.target.value } : ws
                ))}
                className="bg-transparent focus:outline-none flex-1"
              />
              <button aria-label="Workspace settings">
                <Settings className="w-4 h-4 text-[#FF00FF] hover:text-[#00FFFF]" />
              </button>
            </div>
            <button
              onClick={() => createThread(workspace.id)}
              className="w-full p-1 text-sm bg-[#2E0249] text-[#00FF00] rounded hover:bg-[#00FFFF] transition-colors"
            >
              <Plus className="inline-block w-3 h-3 mr-1" />
              New Thread
            </button>
            <div className="mt-2 space-y-1">
              {workspace.threads.map((thread, i) => (
                <div key={i} className="p-1 text-sm text-[#00FFFF] hover:bg-[#2E0249]/70 rounded cursor-pointer">
                  {thread}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-4">
        <div className="h-full flex flex-col">
          <div className="flex-1 bg-[#2E0249]/50 rounded-lg p-4">
            {/* Chat messages will go here */}
          </div>
          <div className="mt-4">
            <textarea
              className="w-full p-2 bg-[#2E0249] text-white border border-[#00FFFF] rounded focus:outline-none focus:border-[#00FF00]"
              rows={3}
              placeholder="Type your message..."
            />
            <button className="mt-2 px-4 py-2 bg-[#00FF00] text-[#2E0249] rounded hover:bg-[#00FFFF] transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
