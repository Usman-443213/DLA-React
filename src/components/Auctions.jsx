import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';



// Regions metadata
const REGIONS = {
  usa: {
    flag: "🇺🇸",
    name: "United States",
    tag: "Primary Market",
    desc: "The largest dealer-only auction network in the country. Bid in person at physical locations or remotely from your smartphone — thousands of vehicles every week.",
    lat: 38,
    lng: -97
  },
  canada: {
    flag: "🇨🇦",
    name: "Canada",
    tag: "North American Network",
    desc: "Access Canadian wholesale auctions for additional inventory diversity, seasonal vehicles, and cross-border pricing advantages.",
    lat: 56,
    lng: -96
  },
  mexico: {
    flag: "🇲🇽",
    name: "Mexico",
    tag: "Cross-Border Access",
    desc: "Source quality inventory from one of the most active used-vehicle markets in the hemisphere at competitive wholesale rates.",
    lat: 23,
    lng: -102
  },
  europe: {
    flag: "🇪🇺",
    name: "Europe",
    tag: "International Access",
    desc: "Import premium, luxury, and specialty vehicles from European wholesale auctions — exclusively available to licensed dealers.",
    lat: 50,
    lng: 10
  }
};

// Country numeric codes for map highlighting
const HC = {
  usa: ["840"],
  canada: ["124"],
  mexico: ["484"],
  europe: [
    "276", "250", "380", "724", "826", "528", "756", "40", "56", "752", "578", 
    "208", "246", "372", "620", "703", "705", "191", "348", "300", "203"
  ]
};

export default function Auctions() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // React state for DOM UI rendering
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  // Mutable refs to prevent state re-renders from lagging the 60fps canvas loop
  const activeIdRef = useRef(null);
  const hoveredIdRef = useRef(null);
  const rotLngRef = useRef(-60);
  const rotLatRef = useRef(15);
  const autoSpinRef = useRef(true);
  const draggingRef = useRef(false);

  // Track active/hovered IDs in both state and refs
  const updateActive = (id) => {
    activeIdRef.current = id;
    setActiveId(id);
  };

  const updateHovered = (id) => {
    hoveredIdRef.current = id;
    setHoveredId(id);
  };



  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let W = canvas.width;
    let H = canvas.height;
    let worldData = null;
    let animT = 0;
    let animationFrameId = null;

    // Helper to find region of a country ID
    const regionOf = (id) => {
      for (const [r, ids] of Object.entries(HC)) {
        if (ids.includes(String(id))) return r;
      }
      return null;
    };

    // Projection calculation
    const getProjection = () => {
      return d3.geoOrthographic()
        .scale((W / 2) * 0.92)
        .translate([W / 2, H / 2])
        .clipAngle(90)
        .rotate([-rotLngRef.current, -rotLatRef.current, 0]);
    };

    // Custom roundRect polyfill for canvas context in case of browser variations
    if (!ctx.roundRect) {
      ctx.roundRect = function (x, y, width, height, radius) {
        if (typeof radius === 'number') {
          radius = {tl: radius, tr: radius, br: radius, bl: radius};
        }
        this.beginPath();
        this.moveTo(x + radius.tl, y);
        this.lineTo(x + width - radius.tr, y);
        this.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        this.lineTo(x + width, y + height - radius.br);
        this.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        this.lineTo(x + radius.bl, y + height);
        this.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        this.lineTo(x, y + radius.tl);
        this.quadraticCurveTo(x, y, x + radius.tl, y);
        this.closePath();
        return this;
      };
    }

    // Main draw function
    const draw = () => {
      if (!worldData) return;

      ctx.clearRect(0, 0, W, H);
      const p = getProjection();
      const path = d3.geoPath().projection(p).context(ctx);
      const countries = topojson.feature(worldData, worldData.objects.countries);

      // 1. Draw outer radial glow shadow behind globe
      const g = ctx.createRadialGradient(W / 2, H / 2, W * 0.42, W / 2, H / 2, W * 0.54);
      g.addColorStop(0, "rgba(34, 80, 180, 0.18)");
      g.addColorStop(1, "rgba(10, 22, 40, 0)");
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, W * 0.54, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // 2. Draw base globe color
      ctx.beginPath();
      path({ type: "Sphere" });
      const oc = ctx.createRadialGradient(W * 0.42, H * 0.36, 0, W / 2, H / 2, W * 0.46);
      oc.addColorStop(0, "#0e2144");
      oc.addColorStop(1, "#071020");
      ctx.fillStyle = oc;
      ctx.fill();

      // 3. Draw graticules (lat/long grid lines)
      ctx.beginPath();
      path(d3.geoGraticule()());
      ctx.strokeStyle = "rgba(201, 168, 76, 0.07)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // 4. Draw countries with regional styling
      countries.features.forEach(f => {
        const rid = regionOf(f.id ? String(f.id) : "");
        const isAct = rid && activeIdRef.current === rid;
        const isHov = rid && hoveredIdRef.current === rid;
        const isHi = rid !== null;

        ctx.beginPath();
        path(f);

        if (isAct) {
          ctx.fillStyle = "rgba(201, 168, 76, 0.85)";
          ctx.strokeStyle = "rgba(255, 220, 120, 0.9)";
          ctx.lineWidth = 0.8;
        } else if (isHov) {
          ctx.fillStyle = "rgba(201, 168, 76, 0.55)";
          ctx.strokeStyle = "rgba(201, 168, 76, 0.7)";
          ctx.lineWidth = 0.6;
        } else if (isHi) {
          ctx.fillStyle = "rgba(201, 168, 76, 0.22)";
          ctx.strokeStyle = "rgba(201, 168, 76, 0.4)";
          ctx.lineWidth = 0.5;
        } else {
          ctx.fillStyle = "rgba(30, 58, 100, 0.85)";
          ctx.strokeStyle = "rgba(201, 168, 76, 0.12)";
          ctx.lineWidth = 0.3;
        }

        ctx.fill();
        ctx.stroke();
      });

      // 5. Draw globe boundary border
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.strokeStyle = "rgba(201, 168, 76, 0.28)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 6. Draw regional pins (markers)
      Object.entries(REGIONS).forEach(([id, r]) => {
        const pos = p([r.lng, r.lat]);
        if (!pos) return;

        // Check if marker is on the visible side of the globe
        const dist = d3.geoDistance([r.lng, r.lat], [-rotLngRef.current, -rotLatRef.current]);
        if (dist > Math.PI / 2) return;

        const isAct = activeIdRef.current === id;
        const isHov = hoveredIdRef.current === id;
        const hi = isAct || isHov;

        // Pulse logic based on animation frame time
        const pulse = hi 
          ? 18 + Math.sin(animT * 2) * 5 
          : 12 + Math.sin(animT * 1.5 + Object.keys(REGIONS).indexOf(id)) * 3;

        // Draw pulsing outer rings
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], pulse, 0, Math.PI * 2);
        ctx.strokeStyle = hi ? "rgba(201, 168, 76, 0.55)" : "rgba(201, 168, 76, 0.2)";
        ctx.lineWidth = hi ? 1.5 : 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(pos[0], pos[1], pulse * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = hi ? "rgba(255, 220, 120, 0.35)" : "rgba(201, 168, 76, 0.12)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw center pin dot
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], hi ? 7 : 5, 0, Math.PI * 2);
        ctx.fillStyle = hi ? "#FFD966" : "#C9A84C";
        if (hi) {
          ctx.shadowColor = "#FFD966";
          ctx.shadowBlur = 14;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow

        // Draw visual country name label above pin
        ctx.font = `${hi ? 600 : 500} ${hi ? 12 : 11}px "DM Sans", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        const lbl = r.name;
        const tw = ctx.measureText(lbl).width;
        const lx = pos[0];
        const ly = pos[1] - (hi ? 12 : 10);

        // Label box background
        ctx.fillStyle = "rgba(10, 22, 40, 0.7)";
        ctx.beginPath();
        ctx.roundRect(lx - tw / 2 - 5, ly - 14, tw + 10, 16, 4);
        ctx.fill();

        // Label text
        ctx.fillStyle = hi ? "#FFD966" : "#C9A84C";
        ctx.fillText(lbl, lx, ly);
        ctx.textBaseline = "alphabetic";
      });

      // 7. Light atmospheric layer reflection
      const sh = ctx.createRadialGradient(W * 0.38, H * 0.3, 0, W * 0.38, H * 0.3, W * 0.38);
      sh.addColorStop(0, "rgba(255, 255, 255, 0.06)");
      sh.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.beginPath();
      path({ type: "Sphere" });
      ctx.fillStyle = sh;
      ctx.fill();
    };

    // Sizing canvas to wrapper dynamically
    const handleResize = () => {
      const wrap = containerRef.current;
      if (!wrap) return;
      const sz = Math.min(wrap.clientWidth, 520);
      canvas.width = sz;
      canvas.height = sz;
      W = sz;
      H = sz;
      draw();
    };

    // 60FPS loop
    const loop = () => {
      animT += 0.025;
      if (autoSpinRef.current) {
        rotLngRef.current += 0.18;
        if (rotLngRef.current > 180) rotLngRef.current -= 360;
      }
      draw();
      animationFrameId = requestAnimationFrame(loop);
    };

    // Fetch geometry and initialize
    fetch("/countries-110m.json")
      .then(res => res.json())
      .then(data => {
        worldData = data;
        handleResize();
        loop();
      })
      .catch(err => console.error("Error loading world data:", err));

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Canvas Drag/Interaction Handlers
  const handleMouseDown = (e) => {
    draggingRef.current = true;
    autoSpinRef.current = false;
    canvasRef.current.style.cursor = "grabbing";
    
    // Store drag initial coordinates
    canvasRef.current.lastX = e.clientX;
    canvasRef.current.lastY = e.clientY;
  };

  const handleMouseMoveGlobal = (e) => {
    if (!draggingRef.current) return;
    
    const dx = e.clientX - canvasRef.current.lastX;
    const dy = e.clientY - canvasRef.current.lastY;

    rotLngRef.current += dx * 0.4;
    rotLatRef.current -= dy * 0.4;
    rotLatRef.current = Math.max(-60, Math.min(60, rotLatRef.current));

    canvasRef.current.lastX = e.clientX;
    canvasRef.current.lastY = e.clientY;
  };

  const handleMouseUpGlobal = () => {
    if (draggingRef.current) {
      draggingRef.current = false;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    }
  };

  // Bind mouseup/mousemove globally so drag doesn't break when leaving canvas boundaries
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMoveGlobal);
    window.addEventListener('mouseup', handleMouseUpGlobal);
    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, []);

  // Mobile Touch Handlers
  const handleTouchStart = (e) => {
    autoSpinRef.current = false;
    canvasRef.current.lastX = e.touches[0].clientX;
    canvasRef.current.lastY = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    const dx = e.touches[0].clientX - canvasRef.current.lastX;
    const dy = e.touches[0].clientY - canvasRef.current.lastY;

    rotLngRef.current += dx * 0.4;
    rotLatRef.current -= dy * 0.4;
    rotLatRef.current = Math.max(-60, Math.min(60, rotLatRef.current));

    canvasRef.current.lastX = e.touches[0].clientX;
    canvasRef.current.lastY = e.touches[0].clientY;
  };

  // Canvas Hover/Click Handler
  const getMouseRegionId = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const mx = (clientX - rect.left) * (canvas.width / rect.width);
    const my = (clientY - rect.top) * (canvas.height / rect.height);

    // Get current projection
    const scale = (canvas.width / 2) * 0.92;
    const p = d3.geoOrthographic()
      .scale(scale)
      .translate([canvas.width / 2, canvas.height / 2])
      .clipAngle(90)
      .rotate([-rotLngRef.current, -rotLatRef.current, 0]);

    let hitId = null;
    Object.entries(REGIONS).forEach(([id, r]) => {
      const pos = p([r.lng, r.lat]);
      if (!pos) return;

      const dist = d3.geoDistance([r.lng, r.lat], [-rotLngRef.current, -rotLatRef.current]);
      if (dist > Math.PI / 2) return;

      // Check click distance (within 22px)
      if (Math.hypot(pos[0] - mx, pos[1] - my) < 22) {
        hitId = id;
      }
    });

    return hitId;
  };

  const handleMouseMove = (e) => {
    if (draggingRef.current) return;
    const hitId = getMouseRegionId(e.clientX, e.clientY);
    updateHovered(hitId);
    canvasRef.current.style.cursor = hitId ? "pointer" : "grab";
  };

  const handleMouseLeave = () => {
    updateHovered(null);
  };

  const handleClick = (e) => {
    const hitId = getMouseRegionId(e.clientX, e.clientY);
    if (hitId) {
      handleCardSelection(hitId);
    }
  };

  // Region Card click Focus logic
  const handleCardSelection = (id) => {
    if (id === activeIdRef.current) {
      updateActive(null);
    } else {
      updateActive(id);
      
      // Auto-focus rotate globe to center target coordinates
      const r = REGIONS[id];
      rotLngRef.current = -r.lng + 20;
      rotLatRef.current = r.lat * 0.6;
      autoSpinRef.current = false; // Stop auto-spin when focusing
    }
  };

  return (
    <section id="auctions">
      <div id="globe-section-inner">
        
        {/* Globe Header */}
        <div id="globe-header">
          <span className="s-label">Auction Access</span>
          <h2 className="s-title">
            Beyond Borders.
            <br />
            <em style={{ fontStyle: 'normal', color: 'var(--gold)' }}>
              Your License Works Everywhere.
            </em>
          </h2>
          <p className="s-desc" style={{ textAlign: 'center', margin: '0 auto' }}>
            Retail or wholesale to any buyer in the USA. Export vehicles globally. Bid in person or from your smartphone — four major markets, one license.
          </p>
        </div>

        {/* Globe Section Layout */}
        <div id="globe-layout">
          
          {/* Globe Canvas wrapper */}
          <div id="globe-canvas-wrap" ref={containerRef}>
            <canvas 
              id="globeCanvas" 
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              style={{ display: 'block', cursor: 'grab', touchAction: 'none' }}
            ></canvas>
            <span id="globe-drag-hint">Drag to rotate · Click a marker to explore</span>
          </div>

          {/* Info and Selection Panels */}
          <div id="globe-right">
            
            {/* Hover/Click Detailed panel */}
            <div id="globe-info" className={activeId ? 'lit' : ''}>
              {!activeId ? (
                <p id="globe-info-empty">← Click a glowing marker on the globe or select a region card to explore</p>
              ) : (
                <div id="globe-info-content">
                  <div id="globe-info-top">
                    <span id="globe-info-flag">{REGIONS[activeId].flag}</span>
                    <div>
                      <h3 id="globe-info-name">{REGIONS[activeId].name}</h3>
                      <span id="globe-info-tag">{REGIONS[activeId].tag}</span>
                    </div>
                  </div>
                  <p id="globe-info-desc">{REGIONS[activeId].desc}</p>
                </div>
              )}
            </div>

            {/* Regional cards grid */}
            <div id="globe-cards">
              {Object.entries(REGIONS).map(([id, r]) => (
                <div 
                  key={id}
                  className={`g-card ${activeId === id ? 'g-active' : ''}`}
                  onClick={() => handleCardSelection(id)}
                  onMouseEnter={() => updateHovered(id)}
                  onMouseLeave={() => updateHovered(null)}
                  style={{
                    borderColor: hoveredId === id ? 'rgba(201,168,76,0.35)' : ''
                  }}
                >
                  <span className="g-card-flag">{r.flag}</span>
                  <div className="g-card-body">
                    <span className="g-card-name">{r.name}</span>
                    <span className="g-card-sub">{r.tag}</span>
                  </div>
                  <span className="g-card-arrow">›</span>
                </div>
              ))}
            </div>

          </div>
        </div>


      </div>
    </section>
  );
}
