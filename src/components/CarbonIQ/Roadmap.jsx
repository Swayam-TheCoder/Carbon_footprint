import { useApp } from '../../context/AppContext';

const ROADMAP_ITEMS = [
  {
    id: 'led',
    icon: 'ri-lightbulb-flash-line',
    title: 'LED Retrofit',
    desc: 'Switch to high-efficiency LEDs.',
    investUsd: 500,
    saveId: 'save-elec',
    roiId: 'roi-elec',
  },
  {
    id: 'route',
    icon: 'ri-road-map-line',
    title: 'Route Optimization',
    desc: 'AI software to reduce mileage.',
    investUsd: 120,
    investSuffix: '/m',
    saveId: 'save-fuel',
    roiId: 'roi-fuel',
  },
  {
    id: 'virtual',
    icon: 'ri-vidicon-line',
    title: 'Virtual Policy',
    desc: 'Replace travel with Zoom/Teams.',
    investUsd: 0,
    saveId: 'save-travel',
    roiImmediate: true,
  },
];

export default function Roadmap({ roadmapData = {} }) {
  const { isINR } = useApp();
  const currSymbol = isINR ? '₹' : '$';
  const investMultiplier = isINR ? 80 : 1;

  const saveElec = roadmapData.saveElec ?? 0;
  const roiElec = roadmapData.roiElec ?? '--';
  const saveFuel = roadmapData.saveFuel ?? 0;
  const roiFuel = roadmapData.roiFuel ?? '--';
  const saveTravel = roadmapData.saveTravel ?? 0;

  const displayInvest = (usd, suffix = '') => {
    if (usd === 0) return `${currSymbol}0${suffix}`;
    return `${currSymbol}${(usd * investMultiplier).toLocaleString()}${suffix}`;
  };

  return (
    <section id="roadmap" className="section-padding py-[100px]" style={{ background: 'var(--color-bg-alt)' }}>
      <div className="container max-w-[1200px] w-[90%] mx-auto reveal">
        <div className="section-header mb-10">
          <h2 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-main)' }}>
            Reduction Roadmap
          </h2>
          <p style={{ color: 'var(--color-text-muted)' }}>
            ROI-driven steps to reduce footprint.
          </p>
        </div>
        <div className="roadmap-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            className="roadmap-card p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: 'var(--color-bg-panel)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-main)',
            }}
          >
            <div
              className="card-icon w-12 h-12 grid place-items-center rounded-xl text-2xl mb-5"
              style={{
                background: 'var(--color-bg-input)',
                color: 'var(--color-text-main)',
              }}
            >
              <i className="ri-lightbulb-flash-line" />
            </div>
            <div className="card-body">
              <h4 className="text-lg font-semibold mb-1">LED Retrofit</h4>
              <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>
                Switch to high-efficiency LEDs.
              </p>
              <div
                className="roi-data flex justify-between p-4 rounded-lg border mb-5"
                style={{
                  background: 'var(--color-bg-input)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Invest</span>
                  <strong className="cost-val block" data-usd="500">
                    {displayInvest(500)}
                  </strong>
                </div>
                <div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Save</span>
                  <strong id="save-elec" className="save-val block">
                    {currSymbol}{saveElec.toFixed(0)}/m
                  </strong>
                </div>
              </div>
              <div
                className="roi-badge text-center py-2 rounded-md text-xs font-bold"
                style={{
                  background: 'var(--color-bg-input)',
                  color: 'var(--color-text-muted)',
                }}
              >
                ROI: <span id="roi-elec">{roiElec}</span> Mo
              </div>
            </div>
          </div>

          <div
            className="roadmap-card p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: 'var(--color-bg-panel)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-main)',
            }}
          >
            <div
              className="card-icon w-12 h-12 grid place-items-center rounded-xl text-2xl mb-5"
              style={{
                background: 'var(--color-bg-input)',
                color: 'var(--color-text-main)',
              }}
            >
              <i className="ri-road-map-line" />
            </div>
            <div className="card-body">
              <h4 className="text-lg font-semibold mb-1">Route Optimization</h4>
              <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>
                AI software to reduce mileage.
              </p>
              <div
                className="roi-data flex justify-between p-4 rounded-lg border mb-5"
                style={{
                  background: 'var(--color-bg-input)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Invest</span>
                  <strong className="cost-val block" data-usd="120">
                    {displayInvest(120)}/m
                  </strong>
                </div>
                <div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Save</span>
                  <strong id="save-fuel" className="save-val block">
                    {currSymbol}{saveFuel.toFixed(0)}/m
                  </strong>
                </div>
              </div>
              <div
                className="roi-badge text-center py-2 rounded-md text-xs font-bold"
                style={{
                  background: 'var(--color-bg-input)',
                  color: 'var(--color-text-muted)',
                }}
              >
                ROI: <span id="roi-fuel">{roiFuel}</span> Mo
              </div>
            </div>
          </div>

          <div
            className="roadmap-card p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            style={{
              background: 'var(--color-bg-panel)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text-main)',
            }}
          >
            <div
              className="card-icon w-12 h-12 grid place-items-center rounded-xl text-2xl mb-5"
              style={{
                background: 'var(--color-bg-input)',
                color: 'var(--color-text-main)',
              }}
            >
              <i className="ri-vidicon-line" />
            </div>
            <div className="card-body">
              <h4 className="text-lg font-semibold mb-1">Virtual Policy</h4>
              <p className="text-sm mb-5" style={{ color: 'var(--color-text-muted)' }}>
                Replace travel with Zoom/Teams.
              </p>
              <div
                className="roi-data flex justify-between p-4 rounded-lg border mb-5"
                style={{
                  background: 'var(--color-bg-input)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Invest</span>
                  <strong className="cost-val block" data-usd="0">
                    {currSymbol}0
                  </strong>
                </div>
                <div>
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>Save</span>
                  <strong id="save-travel" className="save-val block">
                    {currSymbol}{saveTravel.toFixed(0)}
                  </strong>
                </div>
              </div>
              <div
                className="roi-badge highlight text-center py-2 rounded-md text-xs font-bold"
                style={{
                  background: 'rgba(46, 213, 115, 0.1)',
                  color: 'var(--color-primary)',
                }}
              >
                ROI: Immediate
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
