export function DataFlowDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <marker
          id="arrow"
          markerWidth="6"
          markerHeight="6"
          refX="5"
          refY="2.5"
          orient="auto"
        >
          <path d="M0 0L6 2.5L0 5V0Z" fill="white" fillOpacity="0.85" />
        </marker>
      </defs>

      {/* faint grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={28 + i * 48}
          y1="12"
          x2={28 + i * 48}
          y2="188"
          stroke="white"
          strokeOpacity="0.05"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="16"
          y1={20 + i * 40}
          x2="424"
          y2={20 + i * 40}
          stroke="white"
          strokeOpacity="0.05"
        />
      ))}

      {/* nodes — slim boxes */}
      <g stroke="white" strokeWidth="1.15">
        <rect x="22" y="78" width="72" height="40" rx="1.5" fill="white" fillOpacity="0.04" />
        <rect x="128" y="32" width="72" height="40" rx="1.5" fill="white" fillOpacity="0.04" />
        <rect x="128" y="124" width="72" height="40" rx="1.5" fill="white" fillOpacity="0.04" />
        <rect x="234" y="78" width="72" height="40" rx="1.5" fill="white" fillOpacity="0.06" />
        <rect x="340" y="32" width="78" height="40" rx="1.5" fill="white" fillOpacity="0.04" />
        <rect x="340" y="124" width="78" height="40" rx="1.5" fill="white" fillOpacity="0.04" />
      </g>

      {/* node labels */}
      <g fill="white" fontFamily="var(--font-instrument), sans-serif" fontSize="11">
        <text x="58" y="96" textAnchor="middle" fillOpacity="0.92">
          Client
        </text>
        <text x="58" y="109" textAnchor="middle" fillOpacity="0.45" fontSize="9">
          Web / App
        </text>

        <text x="164" y="50" textAnchor="middle" fillOpacity="0.92">
          Edge
        </text>
        <text x="164" y="63" textAnchor="middle" fillOpacity="0.45" fontSize="9">
          CDN
        </text>

        <text x="164" y="142" textAnchor="middle" fillOpacity="0.92">
          Auth
        </text>
        <text x="164" y="155" textAnchor="middle" fillOpacity="0.45" fontSize="9">
          Session
        </text>

        <text x="270" y="96" textAnchor="middle" fillOpacity="0.95">
          API
        </text>
        <text x="270" y="109" textAnchor="middle" fillOpacity="0.45" fontSize="9">
          Services
        </text>

        <text x="379" y="50" textAnchor="middle" fillOpacity="0.92">
          Cache
        </text>
        <text x="379" y="63" textAnchor="middle" fillOpacity="0.45" fontSize="9">
          Redis
        </text>

        <text x="379" y="142" textAnchor="middle" fillOpacity="0.92">
          Database
        </text>
        <text x="379" y="155" textAnchor="middle" fillOpacity="0.45" fontSize="9">
          Postgres
        </text>
      </g>

      {/* flow lines */}
      <g
        stroke="white"
        strokeOpacity="0.7"
        strokeWidth="1.1"
        markerEnd="url(#arrow)"
      >
        <path d="M94 90C108 90 116 52 128 52" className="flow-line" />
        <path d="M94 108C108 108 116 144 128 144" className="flow-line flow-line-delay" />
        <path d="M200 52C214 52 222 90 234 90" className="flow-line" />
        <path d="M200 144C214 144 222 108 234 108" className="flow-line flow-line-delay" />
        <path d="M306 90C320 90 328 52 340 52" className="flow-line" />
        <path d="M306 108C320 108 328 144 340 144" className="flow-line flow-line-delay" />
      </g>

      {/* moving data packets */}
      <g fill="white">
        <circle r="2.6" className="packet packet-1">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M94 90C108 90 116 52 128 52"
          />
        </circle>
        <circle r="2.6" className="packet packet-2">
          <animateMotion
            dur="3.1s"
            repeatCount="indefinite"
            path="M94 108C108 108 116 144 128 144"
          />
        </circle>
        <circle r="2.6" className="packet packet-3">
          <animateMotion
            dur="2.6s"
            repeatCount="indefinite"
            path="M200 52C214 52 222 90 234 90"
          />
        </circle>
        <circle r="2.6" className="packet packet-4">
          <animateMotion
            dur="2.9s"
            repeatCount="indefinite"
            path="M200 144C214 144 222 108 234 108"
          />
        </circle>
        <circle r="2.6" className="packet packet-5">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M306 90C320 90 328 52 340 52"
          />
        </circle>
        <circle r="2.6" className="packet packet-6">
          <animateMotion
            dur="3s"
            repeatCount="indefinite"
            path="M306 108C320 108 328 144 340 144"
          />
        </circle>
      </g>
    </svg>
  );
}
