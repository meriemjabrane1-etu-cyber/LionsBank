import { useState, useEffect, useRef } from "react";
 
const cards = [
  {
    id: 1,
    type: "Visa Classic",
    last4: "3456",
    holder: "Karim El Amrani",
    expiry: "06/26",
    network: "VISA",
    color: "teal",
    isPrimary: true,
    account: "Compte courant (•••• 3456)",
    limits: { paiement: [10000, 20000], retrait: [3000, 5000], online: [5000, 10000] },
  },
  {
    id: 2,
    type: "Mastercard Gold",
    last4: "7890",
    holder: "Karim El Amrani",
    expiry: "09/25",
    network: "MC",
    color: "gold",
    isPrimary: false,
    account: "Compte épargne (•••• 7890)",
    limits: { paiement: [15000, 30000], retrait: [5000, 10000], online: [8000, 15000] },
  },
  {
    id: 3,
    type: "Visa Platinum",
    last4: "1122",
    holder: "Compte joint",
    expiry: "02/27",
    network: "VISA",
    color: "navy",
    isPrimary: false,
    account: "Compte joint (•••• 1122)",
    limits: { paiement: [20000, 40000], retrait: [8000, 15000], online: [10000, 20000] },
  },
];
 
const transactions = [
  { icon: "🛒", label: "Achat en ligne - Amazon", date: "Hier, 16:45", amount: -450, color: "#f97316" },
  { icon: "👗", label: "Zara - Morocco Mall", date: "Hier, 14:20", amount: -320, color: "#ec4899" },
  { icon: "⛽", label: "Station Afriquia", date: "07 Mai 2024, 18:30", amount: -200, color: "#3b82f6" },
  { icon: "🍽️", label: "Restaurant La Table", date: "06 Mai 2024, 21:15", amount: -280, color: "#10b981" },
];
 
const actions = [
  { icon: "🔒", label: "Verrouiller\nla carte", danger: false },
  { icon: "👁️", label: "Voir le code\nPIN", danger: false },
  { icon: "⚙️", label: "Gérer les\nplafonds", danger: false },
  { icon: "🔔", label: "Activer les\nnotifications", danger: false },
  { icon: "🔄", label: "Remplacer\nla carte", danger: false },
  { icon: "🚫", label: "Bloquer\nla carte", danger: true },
];
 
function LionLogo() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" opacity="0.18">
      <ellipse cx="27" cy="30" rx="13" ry="15" fill="white"/>
      <circle cx="27" cy="16" r="10" fill="white"/>
      <ellipse cx="14" cy="22" rx="6" ry="9" fill="white" transform="rotate(-20 14 22)"/>
      <ellipse cx="40" cy="22" rx="6" ry="9" fill="white" transform="rotate(20 40 22)"/>
      <circle cx="23" cy="15" r="3" fill="white" opacity="0.5"/>
      <circle cx="31" cy="15" r="3" fill="white" opacity="0.5"/>
    </svg>
  );
}
 
function CardVisual({ card, size = "lg", selected = false }: any) {
  const gradients: Record<string, string> = {
    teal: "linear-gradient(135deg, #0d4f4a 0%, #1a7a6e 50%, #0f5e55 100%)",
    gold: "linear-gradient(135deg, #b8860b 0%, #daa520 40%, #c8961c 70%, #a07010 100%)",
    navy: "linear-gradient(135deg, #1a2a6c 0%, #2541a8 50%, #1e3799 100%)",
  };
 
  const isLg = size === "lg";
 
  return (
    <div
      style={{
        background: gradients[card.color],
        borderRadius: isLg ? 16 : 14,
        padding: isLg ? "22px 24px" : "16px 18px",
        width: isLg ? 220 : 168,
        height: isLg ? 140 : 106,
        position: "relative",
        overflow: "hidden",
        boxShadow: selected
          ? "0 0 0 2.5px #22c55e, 0 8px 32px rgba(0,0,0,0.22)"
          : "0 4px 16px rgba(0,0,0,0.18)",
        transition: "box-shadow 0.3s, transform 0.3s",
        cursor: "pointer",
        flexShrink: 0,
        transform: selected ? "translateY(-4px) scale(1.02)" : "none",
      }}
    >
      <div style={{ position: "absolute", bottom: isLg ? -8 : -6, right: isLg ? -6 : -4 }}>
        <LionLogo />
      </div>
      {card.isPrimary && size === "lg" && (
        <div style={{
          position: "absolute", top: 10, left: 10,
          background: "#22c55e", color: "#fff",
          fontSize: 10, fontWeight: 600, borderRadius: 6,
          padding: "2px 8px", letterSpacing: 0.3,
        }}>Principale</div>
      )}
      <div style={{
        position: "absolute", top: isLg ? 12 : 8, right: isLg ? 16 : 12,
        color: "white", fontWeight: 800,
        fontSize: card.network === "VISA" ? (isLg ? 18 : 14) : (isLg ? 14 : 11),
        letterSpacing: card.network === "VISA" ? 1 : 0,
        fontStyle: card.network === "VISA" ? "italic" : "normal",
      }}>
        {card.network === "VISA" ? "VISA" : (
          <div style={{ display: "flex", gap: -4 }}>
            <div style={{ width: isLg ? 22 : 16, height: isLg ? 22 : 16, borderRadius: "50%", background: "#eb001b", opacity: 0.9 }}/>
            <div style={{ width: isLg ? 22 : 16, height: isLg ? 22 : 16, borderRadius: "50%", background: "#f79e1b", opacity: 0.9, marginLeft: isLg ? -8 : -6 }}/>
          </div>
        )}
      </div>
      <div style={{ marginTop: isLg ? 36 : 24 }}>
        <div style={{ color: "rgba(255,255,255,0.85)", fontSize: isLg ? 15 : 12, letterSpacing: 2, marginBottom: isLg ? 12 : 8 }}>
          •••• {card.last4}
        </div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: isLg ? 11 : 9.5 }}>{card.holder}</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: isLg ? 11 : 9.5 }}>{card.expiry}</div>
      </div>
    </div>
  );
}
 
function LimitBar({ label, used, total }: { label: string; used: number; total: number }) {
  const pct = Math.round((used / total) * 100);
  const [animPct, setAnimPct] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setAnimPct(pct), 120);
    return () => clearTimeout(t);
  }, [pct]);
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div>
          <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a2e" }}>{label}</div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>
            {used.toLocaleString("fr-FR")} MAD / {total.toLocaleString("fr-FR")} MAD
          </div>
        </div>
        <div style={{ fontWeight: 700, fontSize: 13, color: "#1a7a6e" }}>{pct}%</div>
      </div>
      <div style={{ height: 6, background: "#e8f5f3", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", background: "linear-gradient(90deg, #1a7a6e, #22c55e)",
          borderRadius: 99, width: `${animPct}%`,
          transition: "width 0.9s cubic-bezier(.4,0,.2,1)",
        }}/>
      </div>
    </div>
  );
}
 
export default function CartesDashboard() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [showCVV, setShowCVV] = useState(false);
  const [showCardNum, setShowCardNum] = useState(false);
  const [mounted, setMounted] = useState(false);
  const card = cards[selectedCard];
 
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setShowCVV(false); setShowCardNum(false); }, [selectedCard]);
 
  return (
    <div style={{
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      background: "#f7f8fc",
      minHeight: "100vh",
      padding: "0",
    }}>
      {/* Top bar */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #eee",
        padding: "14px 32px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "sticky", top: 0, zIndex: 10,
        boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
      }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", flex: 1 }}>Cartes</div>
        <div style={{
          flex: 2, maxWidth: 340,
          background: "#f4f5f8", borderRadius: 10, padding: "8px 16px",
          display: "flex", alignItems: "center", gap: 8, color: "#aaa", fontSize: 14,
        }}>
          <span>🔍</span> Rechercher...
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: 22 }}>🔔</span>
          <div style={{
            position: "absolute", top: -2, right: -4,
            background: "#22c55e", color: "#fff", fontSize: 9,
            fontWeight: 700, borderRadius: "50%", width: 16, height: 16,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>2</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #1a7a6e, #22c55e)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontWeight: 700, fontSize: 14,
          }}>K</div>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Karim</span>
          <span style={{ color: "#aaa" }}>▾</span>
        </div>
      </div>
 
      <div style={{ padding: "24px 32px", maxWidth: 1140, margin: "0 auto" }}>
 
        {/* Mes cartes */}
        <div style={{
          background: "#fff", borderRadius: 16, padding: "24px 28px",
          marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s, transform 0.5s",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a2e" }}>Mes cartes</div>
            <div style={{ color: "#1a7a6e", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              Gérer mes cartes ⚙️
            </div>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "stretch", flexWrap: "wrap" }}>
            {cards.map((c, i) => (
              <div key={c.id}
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.5s ${0.1 + i * 0.1}s, transform 0.5s ${0.1 + i * 0.1}s`,
                }}
                onClick={() => setSelectedCard(i)}
              >
                <CardVisual card={c} size="lg" selected={selectedCard === i} />
              </div>
            ))}
            {/* Add card */}
            <div style={{
              width: 168, height: 106, borderRadius: 14,
              border: "2px dashed #d0e8e4", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", cursor: "pointer",
              color: "#1a7a6e", gap: 6, transition: "background 0.2s",
              marginTop: 4,
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f0faf8")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontSize: 28, lineHeight: 1 }}>+</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Ajouter une carte</div>
            </div>
          </div>
          {/* Dots indicator */}
          <div style={{ display: "flex", gap: 6, marginTop: 18, justifyContent: "flex-start" }}>
            {cards.map((_, i) => (
              <div key={i} onClick={() => setSelectedCard(i)} style={{
                width: i === selectedCard ? 22 : 8, height: 8, borderRadius: 99,
                background: i === selectedCard ? "#1a7a6e" : "#d4e8e4",
                cursor: "pointer", transition: "all 0.3s",
              }}/>
            ))}
          </div>
        </div>
 
        {/* Bottom 2 cols */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
 
          {/* Left col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
 
            {/* Card details */}
            <div style={{
              background: "#fff", borderRadius: 16, padding: "24px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.55s 0.2s, transform 0.55s 0.2s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>Détails de la carte</div>
                  <div style={{
                    background: "#d1fae5", color: "#065f46", fontSize: 11,
                    fontWeight: 700, borderRadius: 20, padding: "2px 10px",
                  }}>Active</div>
                </div>
                <div style={{ color: "#aaa", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>⋮</div>
              </div>
              <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <CardVisual card={card} size="sm" selected={false} />
                </div>
                <div style={{ flex: 1, fontSize: 13 }}>
                  {[
                    ["Type de carte", card.type],
                    ["Numéro de carte", showCardNum ? `4243 5678 9012 ${card.last4}` : `•••• •••• •••• ${card.last4}`, true, () => setShowCardNum(!showCardNum)],
                    ["Titulaire", card.holder],
                    ["Compte associé", card.account],
                    ["Date d'expiration", card.expiry],
                    ["CVV", showCVV ? "742" : "•••", true, () => setShowCVV(!showCVV)],
                  ].map(([label, value, hasToggle, toggle]: any) => (
                    <div key={label} style={{
                      display: "flex", gap: 12, padding: "7px 0",
                      borderBottom: "1px solid #f2f2f4", alignItems: "center",
                    }}>
                      <div style={{ color: "#999", width: 130, fontSize: 12, flexShrink: 0 }}>{label}</div>
                      <div style={{ color: "#1a1a2e", fontWeight: 500, flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                        {value}
                        {hasToggle && (
                          <span
                            onClick={toggle}
                            style={{ cursor: "pointer", color: "#1a7a6e", fontSize: 16, marginLeft: 4 }}
                          >{showCVV && label === "CVV" ? "🙈" : "👁️"}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Quick actions */}
            <div style={{
              background: "#fff", borderRadius: 16, padding: "24px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.55s 0.35s, transform 0.55s 0.35s",
            }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 20 }}>Actions rapides</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {actions.map((a, i) => (
                  <ActionBtn key={i} {...a} />
                ))}
              </div>
            </div>
          </div>
 
          {/* Right col */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
 
            {/* Limits */}
            <div style={{
              background: "#fff", borderRadius: 16, padding: "24px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.55s 0.25s, transform 0.55s 0.25s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>Plafonds de la carte</div>
                <div style={{ color: "#1a7a6e", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Modifier</div>
              </div>
              <LimitBar label="Paiement" used={card.limits.paiement[0]} total={card.limits.paiement[1]} />
              <LimitBar label="Retrait" used={card.limits.retrait[0]} total={card.limits.retrait[1]} />
              <LimitBar label="Paiement en ligne" used={card.limits.online[0]} total={card.limits.online[1]} />
            </div>
 
            {/* Transactions */}
            <div style={{
              background: "#fff", borderRadius: 16, padding: "24px 28px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.55s 0.4s, transform 0.55s 0.4s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e" }}>Dernières transactions</div>
                <div style={{ color: "#1a7a6e", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Voir tout</div>
              </div>
              {transactions.map((tx, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "11px 0",
                  borderBottom: i < transactions.length - 1 ? "1px solid #f5f5f7" : "none",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(20px)",
                  transition: `opacity 0.5s ${0.5 + i * 0.08}s, transform 0.5s ${0.5 + i * 0.08}s`,
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: tx.color + "18",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>{tx.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a2e" }}>{tx.label}</div>
                    <div style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{tx.date}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "#e53e3e" }}>
                    {tx.amount.toLocaleString("fr-FR")} MAD
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
function ActionBtn({ icon, label, danger }: { icon: string; label: string; danger: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        cursor: "pointer", width: 76, textAlign: "center",
      }}
    >
      <div style={{
        width: 50, height: 50, borderRadius: 14,
        border: `2px solid ${danger ? (hovered ? "#e53e3e" : "#fde8e8") : (hovered ? "#1a7a6e" : "#e8f5f3")}`,
        background: danger ? (hovered ? "#fde8e8" : "#fff") : (hovered ? "#e8f5f3" : "#fff"),
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20,
        transition: "all 0.2s",
        transform: hovered ? "scale(1.1)" : "scale(1)",
      }}>{icon}</div>
      <div style={{
        fontSize: 11, color: danger ? "#e53e3e" : "#444",
        whiteSpace: "pre-line", lineHeight: 1.3, fontWeight: 500,
      }}>{label}</div>
    </div>
  );
}