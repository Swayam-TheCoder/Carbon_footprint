const PHASES = [
  {
    phase: 1,
    badge: 'Phase 1',
    title: 'Quick Wins',
    badgeColor: 'var(--color-primary)',
    cards: [
      { icon: 'ri-computer-line', title: 'Digital Hygiene', desc: 'Enforce "Sleep Mode" policies.', impact: 'low' },
      { icon: 'ri-recycle-line', title: 'Waste Audit', desc: 'Remove single-use plastics.', impact: 'med' },
    ],
  },
  {
    phase: 2,
    badge: 'Phase 2',
    title: 'Process',
    badgeColor: 'var(--color-accent)',
    cards: [
      { icon: 'ri-shopping-bag-3-line', title: 'Green Procurement', desc: 'Switch 30% supply chain.', impact: 'med' },
      { icon: 'ri-timer-flash-line', title: 'Shift Scheduling', desc: 'Optimize work weeks.', impact: 'high' },
    ],
  },
  {
    phase: 3,
    badge: 'Phase 3',
    title: 'Transform',
    badgeColor: '#a55eea',
    cards: [
      { icon: 'ri-sun-foggy-line', title: 'Solar Install', desc: 'On-site energy generation.', impact: 'high' },
      { icon: 'ri-truck-line', title: 'EV Fleet', desc: 'Replace ICE logistics.', impact: 'max' },
    ],
  },
];

export default function Planning() {
  return (
    <section id="planning" className="section-padding py-[100px]">
      <div className="container max-w-[1200px] w-[90%] mx-auto reveal">
        <div className="section-header mb-10">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-main)' }}>
            Practical Planning
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            Real-world operational shifts.
          </p>
        </div>
        <div className="plan-wrapper grid grid-cols-1 md:grid-cols-3 gap-8">
          {PHASES.map(({ phase, badge, title, badgeColor, cards }) => (
            <div key={phase} className="plan-column">
              <div
                className="plan-header mb-6 pb-4 border-b-2"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span
                  className="phase-badge block text-xs font-extrabold uppercase tracking-wider mb-1"
                  style={{ color: badgeColor }}
                >
                  {badge}
                </span>
                <h3 className="text-xl font-semibold" style={{ color: 'var(--color-text-main)' }}>
                  {title}
                </h3>
              </div>
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="plan-card p-5 rounded-xl border mb-5 flex flex-col gap-4 transition-colors hover:border-[var(--color-text-muted)]"
                  style={{
                    background: 'var(--color-bg-panel)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text-main)',
                  }}
                >
                  <div className="flex gap-4">
                    <div
                      className="p-icon w-10 h-10 grid place-items-center rounded-lg text-lg shrink-0"
                      style={{
                        background: 'var(--color-bg-input)',
                        color: 'var(--color-text-main)',
                      }}
                    >
                      <i className={card.icon} />
                    </div>
                    <div className="p-content flex-1">
                      <h4 className="text-base font-semibold mb-1">{card.title}</h4>
                      <p className="text-sm leading-snug" style={{ color: 'var(--color-text-muted)' }}>
                        {card.desc}
                      </p>
                      <div className="impact-meter flex items-center gap-2.5 mt-3 text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>
                        <div
                          className="fill h-1.5 flex-1 rounded-sm overflow-hidden"
                          style={{ background: 'var(--color-bg-input)' }}
                        >
                          <div
                            className={`fill h-full rounded-sm ${card.impact === 'low' ? 'low' : card.impact === 'med' ? 'med' : card.impact === 'high' ? 'high' : 'max'}`}
                            style={{
                              width: card.impact === 'low' ? '30%' : card.impact === 'med' ? '60%' : card.impact === 'high' ? '85%' : '100%',
                              background: card.impact === 'low' ? 'var(--color-primary)' : card.impact === 'med' ? 'var(--color-accent)' : card.impact === 'high' ? '#a55eea' : '#fc5c65',
                            }}
                          />
                        </div>
                        <span className="capitalize">{card.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
